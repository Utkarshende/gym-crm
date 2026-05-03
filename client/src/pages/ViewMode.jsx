
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";

function ViewMode() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);

  // fetch member
  const fetchMember = async () => {
    try {
      setLoading(true);
      const res = await API.get(`/members/${id}`);
      setMember(res.data);
    } catch (error) {
      console.error(error);
      alert("Failed to load member");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMember();
  }, [id]);

  // BMI
  const bmi = useMemo(() => {
    if (!member?.height || !member?.weight) return "-";

    const h = Number(member.height) / 100;
    const w = Number(member.weight);

    if (!h || !w) return "-";

    return (w / (h * h)).toFixed(1);
  }, [member]);

  // status badge
  const getStatusStyle = (status) => {
    if (status === "active") {
      return "bg-green-100 text-green-700";
    }

    if (status === "paused") {
      return "bg-yellow-100 text-yellow-700";
    }

    return "bg-red-100 text-red-700";
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
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* top */}
        <div className="flex flex-wrap gap-3 justify-between items-center">
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-800 dark:text-white"
          >
            ← Back
          </button>

          <div className="flex gap-3">
            <button
              onClick={() => navigate(`/member/edit/${id}`)}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white"
            >
              Edit Member
            </button>
          </div>
        </div>

        {/* profile card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {member.name}
              </h1>

              <p className="text-gray-500 dark:text-gray-300 mt-1">
                {member.email || "No Email"}
              </p>
            </div>

            <span
              className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusStyle(
                member.status
              )}`}
            >
              {member.status || "active"}
            </span>
          </div>
        </div>

        {/* grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* personal info */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
              Personal Information
            </h2>

            <div className="space-y-3 text-gray-700 dark:text-gray-200">
              <p><b>Phone:</b> {member.phone || "-"}</p>
              <p><b>Gender:</b> {member.gender || "-"}</p>
              <p><b>DOB:</b> {member.dob?.slice(0, 10) || "-"}</p>
              <p><b>Address:</b> {member.address || "-"}</p>
            </div>
          </div>

          {/* body info */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
              Fitness Information
            </h2>

            <div className="space-y-3 text-gray-700 dark:text-gray-200">
              <p><b>Height:</b> {member.height || "-"} cm</p>
              <p><b>Weight:</b> {member.weight || "-"} kg</p>
              <p><b>Goal Weight:</b> {member.goalWeight || "-"} kg</p>
              <p><b>BMI:</b> {bmi}</p>
            </div>
          </div>

          {/* membership */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
              Membership Details
            </h2>

            <div className="space-y-3 text-gray-700 dark:text-gray-200">
              <p><b>Plan:</b> {member.plan || "-"}</p>
              <p><b>Fees:</b> ₹{member.fee || 0}</p>
              <p>
                <b>Joined Date:</b>{" "}
                {member.joinDate?.slice(0, 10) ||
                  member.createdAt?.slice(0, 10) ||
                  "-"}
              </p>
              <p>
                <b>Expiry Date:</b>{" "}
                {member.expiryDate?.slice(0, 10) || "-"}
              </p>
            </div>
          </div>

          {/* emergency */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
              Emergency Contact
            </h2>

            <div className="space-y-3 text-gray-700 dark:text-gray-200">
              <p><b>Name:</b> {member.emergencyName || "-"}</p>
              <p><b>Phone:</b> {member.emergencyPhone || "-"}</p>
              <p><b>Relation:</b> {member.emergencyRelation || "-"}</p>
            </div>
          </div>
        </div>

        {/* break details */}
        {member.status === "paused" && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
              Break Information
            </h2>

            <div className="space-y-3 text-gray-700 dark:text-gray-200">
              <p><b>Reason:</b> {member.breakReason || "-"}</p>
              <p><b>From:</b> {member.breakFrom?.slice(0, 10) || "-"}</p>
              <p><b>To:</b> {member.breakTo?.slice(0, 10) || "-"}</p>
            </div>
          </div>
        )}

        {/* payment history */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            Payment History
          </h2>

          {member.payments?.length > 0 ? (
            <div className="overflow-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b dark:border-gray-700 text-left">
                    <th className="py-2">Month</th>
                    <th className="py-2">Amount</th>
                    <th className="py-2">Paid On</th>
                  </tr>
                </thead>

                <tbody>
                  {member.payments.map((item, index) => (
                    <tr
                      key={index}
                      className="border-b dark:border-gray-700"
                    >
                      <td className="py-2">{item.month}</td>
                      <td className="py-2">₹{item.amount}</td>
                      <td className="py-2">
                        {item.paidOn?.slice(0, 10)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500">
              No payment history available
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewMode;