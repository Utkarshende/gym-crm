// src/pages/Payments.jsx

import { useEffect, useState } from "react";
import API from "../services/api";
import PaymentTable from "../components/payments/PaymentTable";
import PaymentHistory from "../components/payments/PaymentHistory";

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

  const fetchPaymentsData = async () => {
    try {
      setLoading(true);

      const membersRes = await API.get("/members");
      const pendingRes = await API.get("/payments/pending/list");
      const revenueRes = await API.get("/payments/revenue/month");

      setMembers(membersRes.data || []);
      setPendingMembers(pendingRes.data || []);
      setRevenue(revenueRes.data.revenue || 0);
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
      alert("Failed to mark payment");
    }
  };

  if (loading) {
    return <div className="p-6">Loading Payments...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      {/* Top */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Payments Dashboard</h1>
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-green-600 text-white p-5 rounded-xl shadow">
          <p className="text-sm opacity-80">Revenue This Month</p>
          <h2 className="text-2xl font-bold">₹{revenue}</h2>
        </div>

        <div className="bg-yellow-500 text-white p-5 rounded-xl shadow">
          <p className="text-sm opacity-80">Pending Members</p>
          <h2 className="text-2xl font-bold">
            {pendingMembers.length}
          </h2>
        </div>

        <div className="bg-blue-600 text-white p-5 rounded-xl shadow">
          <p className="text-sm opacity-80">Current Month</p>
          <h2 className="text-xl font-bold">{currentMonth}</h2>
        </div>
      </div>

      {/* Pending Members */}
      <div className="bg-white rounded-xl shadow p-5">
        <h2 className="text-xl font-semibold mb-4">
          Pending Payments
        </h2>

        {pendingMembers.length === 0 ? (
          <p>All members paid this month ✅</p>
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
                      className="bg-green-600 text-white px-3 py-1 rounded"
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

      {/* All Payment Table */}
      <PaymentTable
        members={members}
        onViewHistory={(member) =>
          setSelectedMember(member)
        }
      />

      {/* Payment History */}
      {selectedMember && (
        <PaymentHistory
          member={selectedMember}
          onClose={() => setSelectedMember(null)}
        />
      )}
    </div>
  );
}

export default Payments;