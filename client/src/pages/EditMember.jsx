import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";
import MemberForm from "../components/members/MemberForm";

function EditMember() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  // Fetch member data
  const fetchMember = async () => {
    try {
      const res = await API.get(`/members/${id}`);
      setMember(res.data);
    } catch (error) {
      console.error(error);
      alert("Failed to load member");
      navigate("/");
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    fetchMember();
  }, [id]);

  // Update member
  const handleSubmit = async (data) => {
    try {
      setLoading(true);

      await API.put(`/members/${id}`, data);

      alert("Member Updated Successfully ✅");

      navigate(`/member/view/${id}`);
    } catch (error) {
      console.error(error);
      alert("Update failed");
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
    return (
      <div className="p-10 text-center text-lg">
        Loading member...
      </div>
    );
  }

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
          Edit Member
        </h1>

        <MemberForm
          initialData={member}
          onSubmit={handleSubmit}
          loading={loading}
        />
      </div>
    </div>
  );
}

export default EditMember;