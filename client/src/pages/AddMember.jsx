import { useNavigate } from "react-router-dom";
import { useState } from "react";
import API from "../services/api";
import MemberForm from "../components/members/MemberForm";

function AddMember() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data) => {
    try {
      setLoading(true);

      await API.post("/members", data);

      alert("Member Added Successfully ✅");

      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Failed to add member");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-100 min-h-screen p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <button
          onClick={() => navigate(-1)}
          className="text-blue-600 font-medium"
        >
          ← Back
        </button>

        <h1 className="text-3xl font-bold">
          Add New Member
        </h1>

        <MemberForm
          onSubmit={handleSubmit}
          loading={loading}
        />
      </div>
    </div>
  );
}

export default AddMember;