import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";

import Input from "../components/ui/Input";
import Select from "../components/ui/Select";
import Button from "../components/ui/Button"; 
import PaymentSection from "../components/members/PaymentSection";

import { GENDER, STATUS } from "../utils/constants";
import { validateName, validatePhone, validateEmail } from "../utils/validator.js";

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
    status: "",
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
  }, [member.height, member.weight]); 

  const handleChange = (e) => {
    setMember({ ...member, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!validateName(member.name)) return alert("Invalid Name");
    if (!validatePhone(member.phone)) return alert("Phone must be 10 digits");
    if (member.email && !validateEmail(member.email)) return alert("Invalid Email");

    try {
      setSaving(true);
      await API.put(`/members/${id}`, member);
      alert("Profile Updated Successfully ✅");
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

  if (loading) return <div className="p-10 text-center font-bold">Loading Member Data...</div>;

  return (
    <div className="p-4 sm:p-6 max-w-5xl mx-auto space-y-6 pb-20">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Edit Member</h1>
        <Button 
          onClick={() => navigate(-1)} 
          className="bg-gray-100 text-gray-700 hover:bg-gray-200"
        >
          Cancel
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-5 sm:p-8 rounded-2xl shadow-sm border border-gray-100">
        <Input label="Name" name="name" value={member.name} onChange={handleChange} />
        <Input label="Email" name="email" value={member.email} onChange={handleChange} />
        <Input label="Phone" name="phone" value={member.phone} onChange={handleChange} />

        <Select
          label="Gender"
          name="gender"
          value={member.gender}
          onChange={handleChange}
          options={GENDER} // Using Constant
        />

        <Input label="Height (cm)" name="height" type="number" value={member.height} onChange={handleChange} />
        <Input label="Weight (kg)" name="weight" type="number" value={member.weight} onChange={handleChange} />

        <div className="flex flex-col justify-end">
          <label className="text-xs font-bold text-gray-500 uppercase mb-1 ml-1">Current BMI</label>
          <div className="p-3 bg-blue-50 text-blue-700 font-bold rounded-lg border border-blue-100">
            {bmi}
          </div>
        </div>

        <Input label="Fee" name="fee" type="number" value={member.fee} onChange={handleChange} />

        <Select
          label="Status"
          name="status"
          value={member.status}
          onChange={handleChange}
          options={STATUS} // Using Constant
        />
      </div>

      <PaymentSection
        payments={member.payments}
        updatePayment={updatePayment}
        addPaymentRow={addPaymentRow}
        removePayment={removePayment}
      />

      <Button
        onClick={handleSave}
        disabled={saving}
        className="w-full py-4 text-lg shadow-lg shadow-blue-100"
      >
        {saving ? "Saving Changes..." : "Save Member Profile"}
      </Button>
    </div>
  );
}

export default EditMember;