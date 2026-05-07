import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";

import Input from "../components/ui/Input";
import Select from "../components/ui/Select";
import PaymentSection from "../components/members/PaymentSection";

function EditMember() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [member, setMember] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    height: "",
    weight: "",
    goalWeight: "",
    fee: "",
    plan: "monthly",
    status: "active",
    payments: [],
  });

  useEffect(() => {
    API.get(`/members/${id}`)
      .then((res) => setMember(res.data))
      .catch(() => alert("Failed to load member"))
      .finally(() => setLoading(false));
  }, [id]);

  const bmi = useMemo(() => {
    const h = Number(member.height) / 100;
    const w = Number(member.weight);
    return h && w ? (w / (h * h)).toFixed(1) : "-";
  }, [member]);

  const handleChange = (e) => {
    setMember({ ...member, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      await API.put(`/members/${id}`, member);
      navigate(`/member/view/${id}`);
    } catch {
      alert("Update failed");
    } finally {
      setSaving(false);
    }
  };

  const updatePayment = (i, key, value) => {
    const updated = [...member.payments];
    updated[i][key] = value;
    setMember({ ...member, payments: updated });
  };

  const addPaymentRow = () => {
    setMember({
      ...member,
      payments: [...member.payments, { month: "", amount: "", paidOn: "" }],
    });
  };

  const removePayment = (i) => {
    const updated = [...member.payments];
    updated.splice(i, 1);
    setMember({ ...member, payments: updated });
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 space-y-6">

      <h1 className="text-3xl font-bold">Edit Member</h1>

      <div className="grid md:grid-cols-2 gap-4 bg-white p-6 rounded-xl shadow">
        <Input label="Name" name="name" value={member.name} onChange={handleChange} />
        <Input label="Email" name="email" value={member.email} onChange={handleChange} />
        <Input label="Phone" name="phone" value={member.phone} onChange={handleChange} />

        <Select
          label="Gender"
          name="gender"
          value={member.gender}
          onChange={handleChange}
          options={["male", "female"]}
        />

        <Input label="Height" name="height" value={member.height} onChange={handleChange} />
        <Input label="Weight" name="weight" value={member.weight} onChange={handleChange} />

        <div>
          <label>BMI</label>
          <div className="p-2 bg-gray-100 rounded">{bmi}</div>
        </div>

        <Input label="Fee" name="fee" value={member.fee} onChange={handleChange} />

        <Select
          label="Status"
          name="status"
          value={member.status}
          onChange={handleChange}
          options={["active", "paused", "expired"]}
        />
      </div>

      <PaymentSection
        payments={member.payments}
        updatePayment={updatePayment}
        addPaymentRow={addPaymentRow}
        removePayment={removePayment}
      />

      <button
        onClick={handleSave}
        className="w-full bg-blue-600 text-white py-3 rounded"
      >
        {saving ? "Saving..." : "Save"}
      </button>
    </div>
  );
}

export default EditMember;