import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";
import Button from "../components/ui/Button";

function ViewMember() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMember = async () => {
    try {
      setLoading(true);

      const res = await API.get(
        `/members/${id}?t=${new Date().getTime()}`
      );

      setMember(res.data);

    } catch (error) {
      console.error("Fetch Error:", error);
      alert("Failed to load member");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMember();
  }, [id]);

  const bmi = useMemo(() => {
    if (!member?.height || !member?.weight) return "-";

    const h = Number(member.height) / 100;
    const w = Number(member.weight);

    return h > 0
      ? (w / (h * h)).toFixed(1)
      : "-";
  }, [member]);

  const getStatusStyle = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-700";

      case "paused":
        return "bg-yellow-100 text-yellow-700";

      default:
        return "bg-red-100 text-red-700";
    }
  };

  const sendWhatsAppReminder = () => {
    const phone = `91${member.phone}`;

    const message =
      `Hello ${member.name}, your gym membership fee is pending. Please pay your fees.`;

    const url =
      `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank");
  };

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-500">
        Loading...
      </div>
    );
  }

  if (!member) {
    return (
      <div className="p-6 text-center text-red-500">
        Member not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-6">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* TOP ACTIONS */}
        <div className="flex flex-col sm:flex-row gap-3 justify-between">
          <Button
            onClick={() => navigate(-1)}
            className="bg-gray-200 text-black hover:bg-gray-300"
          >
            ← Back
          </Button>

          <div className="flex flex-wrap gap-3">
            <Button
              onClick={() => navigate(`/member/edit/${id}`)}
            >
              Edit Member
            </Button>

            <button
              onClick={sendWhatsAppReminder}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold"
            >
              WhatsApp Reminder
            </button>
          </div>
        </div>

        {/* MEMBER HEADER */}
        <div className="bg-white rounded-2xl shadow p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

            <div>
              <h1 className="text-3xl font-bold text-slate-800">
                {member.name}
              </h1>

              <p className="text-gray-500 mt-1">
                {member.email || "No Email Provided"}
              </p>
            </div>

            <span
              className={`px-4 py-2 rounded-full text-sm font-bold w-fit ${getStatusStyle(
                member.status
              )}`}
            >
              {member.status?.toUpperCase()}
            </span>
          </div>
        </div>

        {/* INFO CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* PERSONAL DETAILS */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-xl font-bold mb-5 border-b pb-2">
              Personal Details
            </h2>

            <div className="space-y-4 text-gray-700">

              <div className="flex justify-between gap-4">
                <span className="font-semibold">
                  Phone
                </span>

                <span>{member.phone || "N/A"}</span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="font-semibold">
                  Gender
                </span>

                <span>{member.gender || "N/A"}</span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="font-semibold">
                  Age
                </span>

                <span>{member.age || "N/A"}</span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="font-semibold">
                  Address
                </span>

                <span className="text-right">
                  {member.address || "N/A"}
                </span>
              </div>
            </div>
          </div>

          {/* FITNESS */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-xl font-bold mb-5 border-b pb-2">
              Fitness Details
            </h2>

            <div className="space-y-4 text-gray-700">

              <div className="flex justify-between">
                <span className="font-semibold">
                  Height
                </span>

                <span>
                  {member.height || "0"} cm
                </span>
              </div>

              <div className="flex justify-between">
                <span className="font-semibold">
                  Weight
                </span>

                <span>
                  {member.weight || "0"} kg
                </span>
              </div>

              <div className="flex justify-between">
                <span className="font-semibold">
                  BMI
                </span>

                <span className="font-bold text-blue-600">
                  {bmi}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="font-semibold">
                  Goal
                </span>

                <span>
                  {member.goal || "N/A"}
                </span>
              </div>
            </div>
          </div>

          {/* MEMBERSHIP */}
          <div className="bg-white rounded-2xl shadow p-6 md:col-span-2">
            <h2 className="text-xl font-bold mb-5 border-b pb-2">
              Membership Details
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">

              <div className="bg-slate-50 rounded-xl p-4">
                <p className="text-sm text-gray-500">
                  Plan
                </p>

                <h3 className="text-lg font-bold capitalize mt-1">
                  {member.plan}
                </h3>
              </div>

              <div className="bg-slate-50 rounded-xl p-4">
                <p className="text-sm text-gray-500">
                  Fees
                </p>

                <h3 className="text-lg font-bold mt-1">
                  ₹{member.fee}
                </h3>
              </div>

              <div className="bg-slate-50 rounded-xl p-4">
                <p className="text-sm text-gray-500">
                  Status
                </p>

                <h3 className="text-lg font-bold capitalize mt-1">
                  {member.status}
                </h3>
              </div>
            </div>
          </div>
        </div>

        {/* PAYMENT HISTORY */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-bold mb-5">
            Payment History
          </h2>

          {member.payments?.length > 0 ? (
            <div className="overflow-x-auto">

              <table className="w-full min-w-[500px]">
                <thead>
                  <tr className="border-b bg-slate-50">
                    <th className="text-left p-4">
                      Month
                    </th>

                    <th className="text-left p-4">
                      Amount
                    </th>

                    <th className="text-left p-4">
                      Paid On
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {member.payments.map((item, index) => (
                    <tr
                      key={index}
                      className="border-b hover:bg-slate-50"
                    >
                      <td className="p-4">
                        {item.month}
                      </td>

                      <td className="p-4 font-semibold text-green-600">
                        ₹{item.amount}
                      </td>

                      <td className="p-4">
                        {item.paidOn?.slice(0, 10)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No payment history found
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default ViewMember;