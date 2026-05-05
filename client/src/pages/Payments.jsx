import { useEffect, useState } from "react";
import API from "../services/api";

import PaymentTable from "../components/payments/PaymentTable";
import PaymentHistory from "../components/payments/PaymentHistory";
import PaymentCard from "../components/payments/PaymentCard";

function Payments() {
  const [members, setMembers] = useState([]);
  const [pendingMembers, setPendingMembers] = useState([]);
  const [revenue, setRevenue] = useState(0);
  const [selectedMember, setSelectedMember] = useState(null);
  const [loading, setLoading] = useState(true);

  const currentMonth = new Date().toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  // 🔥 Fetch all payment-related data
  const fetchPaymentsData = async () => {
    try {
      setLoading(true);

      const [membersRes, pendingRes, revenueRes] = await Promise.all([
        API.get("/members"),
        API.get("/payments/pending/list"),
        API.get("/payments/revenue/month"),
      ]);

      setMembers(membersRes.data || []);
      setPendingMembers(pendingRes.data || []);
      setRevenue(revenueRes.data?.revenue || 0);

    } catch (error) {
      console.error("Payment fetch error:", error);
      alert("Failed to load payment data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPaymentsData();
  }, []);

  const markPaid = async (member) => {
    try {
      await API.post(`/payments/${member._id}/pay`, {
        amount: member.fee,
      });

      alert("Payment marked successfully ✅");
      fetchPaymentsData();

    } catch (error) {
      console.error(error);
      alert("Failed to mark payment ❌");
    }
  };

  if (loading) {
    return <div className="p-6 text-gray-500">Loading Payments...</div>;
  }

  return (
    <div className="p-6 space-y-6">

      <h1 className="text-3xl font-bold">Payments Dashboard</h1>

      <div className="grid md:grid-cols-3 gap-4">
        <PaymentCard
          title="Revenue This Month"
          value={`₹${revenue}`}
          color="bg-green-600"
        />

        <PaymentCard
          title="Pending Members"
          value={pendingMembers.length}
          color="bg-yellow-500"
        />

        <PaymentCard
          title="Current Month"
          value={currentMonth}
          color="bg-blue-600"
        />
      </div>

      <div className="bg-white rounded-xl shadow p-5">
        <h2 className="text-xl font-semibold mb-4">
          Pending Payments
        </h2>

        {pendingMembers.length === 0 ? (
          <p className="text-green-600 font-medium">
            All members paid this month ✅
          </p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-3">Name</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Fee</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>

            <tbody>
              {pendingMembers.map((member) => (
                <tr key={member._id} className="border-b">
                  <td className="p-3">{member.name}</td>
                  <td className="p-3">{member.phone}</td>
                  <td className="p-3">₹{member.fee}</td>

                  <td className="p-3">
                    <button
                      onClick={() => markPaid(member)}
                      className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                    >
                      Mark Paid
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <PaymentTable
        members={members}
        onViewHistory={(member) => setSelectedMember(member)}
      />

      {selectedMember && (
        <PaymentHistory
          payments={selectedMember.payments}
          onClose={() => setSelectedMember(null)}
        />
      )}
    </div>
  );
}

export default Payments;