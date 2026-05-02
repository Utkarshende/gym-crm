import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";
import PaymentHistory from "../components/payments/PaymentHistory";

function ViewMode() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMember = async () => {
    try {
      const res = await API.get(`/members/${id}`);
      setMember(res.data);
    } catch (error) {
      console.error(error);
      alert("Failed to load member");
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMember();
  }, [id]);

  const getStatusColor = (status) => {
    if (status === "active") return "bg-green-100 text-green-700";
    if (status === "paused") return "bg-yellow-100 text-yellow-700";
    return "bg-red-100 text-red-700";
  };

  const bmi =
    member?.height && member?.weight
      ? (
          member.weight /
          ((member.height / 100) * (member.height / 100))
        ).toFixed(1)
      : "-";

  if (loading) {
    return (
      <div className="p-10 text-center text-lg">
        Loading Profile...
      </div>
    );
  }

  if (!member) return null;

  return (
    <div className="bg-slate-100 min-h-screen p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Top */}
        <div className="flex justify-between items-center">
          <button
            onClick={() => navigate(-1)}
            className="text-blue-600 font-medium"
          >
            ← Back
          </button>

          <button
            onClick={() => navigate(`/member/edit/${id}`)}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg"
          >
            Edit Member
          </button>
        </div>

        {/* Header Card */}
        <div className="bg-white rounded-2xl shadow p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">
              {member.name}
            </h1>

            <p className="text-gray-500 mt-1">
              {member.email || "No email"}
            </p>

            <p className="text-gray-500">
              {member.phone}
            </p>
          </div>

          <span
            className={`px-4 py-2 rounded-full font-semibold ${getStatusColor(
              member.status
            )}`}
          >
            {member.status}
          </span>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Personal */}
          <div className="bg-white rounded-2xl shadow p-6 space-y-3">
            <h2 className="text-xl font-semibold">
              Personal Information
            </h2>

            <p>
              <b>Gender:</b> {member.gender || "-"}
            </p>

            <p>
              <b>DOB:</b> {member.dob || "-"}
            </p>

            <p>
              <b>Address:</b> {member.address || "-"}
            </p>
          </div>

          {/* Membership */}
          <div className="bg-white rounded-2xl shadow p-6 space-y-3">
            <h2 className="text-xl font-semibold">
              Membership
            </h2>

            <p>
              <b>Plan:</b> {member.plan}
            </p>

            <p>
              <b>Fee:</b> ₹{member.fee}
            </p>

            <p>
              <b>Joined:</b>{" "}
              {member.startDate
                ? new Date(member.startDate).toDateString()
                : "-"}
            </p>

            <p>
              <b>Expiry:</b>{" "}
              {member.endDate
                ? new Date(member.endDate).toDateString()
                : "-"}
            </p>
          </div>

          {/* Fitness */}
          <div className="bg-white rounded-2xl shadow p-6 space-y-3">
            <h2 className="text-xl font-semibold">
              Fitness Details
            </h2>

            <p>
              <b>Height:</b> {member.height || "-"} cm
            </p>

            <p>
              <b>Weight:</b> {member.weight || "-"} kg
            </p>

            <p>
              <b>Goal Weight:</b>{" "}
              {member.goalWeight || "-"} kg
            </p>

            <p>
              <b>BMI:</b> {bmi}
            </p>
          </div>

          {/* Emergency */}
          <div className="bg-white rounded-2xl shadow p-6 space-y-3">
            <h2 className="text-xl font-semibold">
              Emergency Contact
            </h2>

            <p>
              <b>Name:</b>{" "}
              {member.emergencyName || "-"}
            </p>

            <p>
              <b>Phone:</b>{" "}
              {member.emergencyPhone || "-"}
            </p>
          </div>
        </div>

        {/* Break Details */}
        {member.status === "paused" && (
          <div className="bg-white rounded-2xl shadow p-6 space-y-3">
            <h2 className="text-xl font-semibold">
              Break Information
            </h2>

            <p>
              <b>Reason:</b>{" "}
              {member.pause?.reason || "-"}
            </p>

            <p>
              <b>From:</b>{" "}
              {member.pause?.startDate
                ? new Date(
                    member.pause.startDate
                  ).toDateString()
                : "-"}
            </p>

            <p>
              <b>To:</b>{" "}
              {member.pause?.endDate
                ? new Date(
                    member.pause.endDate
                  ).toDateString()
                : "-"}
            </p>
          </div>
        )}

        {/* Payment History */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">
            Payment History
          </h2>

          {member.payments?.length ? (
            <div className="space-y-3">
              {member.payments.map((p, i) => (
                <div
                  key={i}
                  className="flex justify-between border-b pb-2"
                >
                  <span>₹{p.amount}</span>
                  <span>
                    {new Date(p.date).toDateString()}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">
              No payment records
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={() =>
              window.open(
                `https://wa.me/91${member.phone}`
              )
            }
            className="bg-green-600 text-white px-5 py-2 rounded-lg"
          >
            WhatsApp
          </button>

          <button
            onClick={() => navigate("/")}
            className="bg-slate-800 text-white px-5 py-2 rounded-lg"
          >
            Dashboard
          </button>
          <PaymentHistory payments={member.payments} />
        </div>
      </div>
    </div>
  );
}

export default ViewMode;