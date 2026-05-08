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
      const res = await API.get(`/members/${id}?t=${new Date().getTime()}`);
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
    return (h > 0) ? (w / (h * h)).toFixed(1) : "-";
  }, [member]);

  const getStatusStyle = (status) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-700";
      case "paused": return "bg-yellow-100 text-yellow-700";
      default: return "bg-red-100 text-red-700";
    }
  };

  if (loading) return <div className="p-6 text-center text-gray-500">Loading...</div>;
  if (!member) return <div className="p-6 text-center text-red-500">Member not found</div>;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        
        <div className="flex flex-wrap gap-3 justify-between items-center">
          <Button
            onClick={() => navigate(-1)}
            className="bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-white hover:bg-gray-300"
          >
            ← Back
          </Button>
          
          <Button
            onClick={() => navigate(`/member/edit/${id}`)}
          >
            Edit Member
          </Button>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{member.name}</h1>
              <p className="text-gray-500 dark:text-gray-300 mt-1">{member.email || "No Email Provided"}</p>
            </div>
            <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusStyle(member.status)}`}>
              {member.status?.toUpperCase() || "ACTIVE"}
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white border-b pb-2">Personal Details</h2>
            <div className="space-y-3 text-gray-700 dark:text-gray-200">
              <p><b>Phone:</b> {member.phone || "N/A"}</p>
              <p><b>Gender:</b> {member.gender || "N/A"}</p>
              <p><b>DOB:</b> {member.dob?.slice(0, 10) || "N/A"}</p>
              <p><b>Address:</b> {member.address || "N/A"}</p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white border-b pb-2">Fitness Stats</h2>
            <div className="space-y-3 text-gray-700 dark:text-gray-200">
              <p><b>Height:</b> {member.height} cm</p>
              <p><b>Weight:</b> {member.weight} kg</p>
              <p><b>BMI:</b> <span className="text-blue-600 font-bold">{bmi}</span></p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white border-b pb-2">Membership</h2>
            <div className="space-y-3 text-gray-700 dark:text-gray-200">
              <p><b>Plan:</b> {member.plan}</p>
              <p><b>Fees:</b> ₹{member.fee}</p>
              <p><b>Expiry:</b> <span className="text-red-500 font-bold">{member.expiryDate?.slice(0, 10)}</span></p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Payment History</h2>
          {member.payments?.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b dark:border-gray-700">
                    <th className="py-3 px-2">Month</th>
                    <th className="py-3 px-2">Amount</th>
                    <th className="py-3 px-2">Paid On</th>
                  </tr>
                </thead>
                <tbody>
                  {member.payments.map((item, index) => (
                    <tr key={index} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900">
                      <td className="py-3 px-2">{item.month}</td>
                      <td className="py-3 px-2 font-medium text-green-600">₹{item.amount}</td>
                      <td className="py-3 px-2">{item.paidOn?.slice(0, 10)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500 italic">No payments recorded.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewMember;