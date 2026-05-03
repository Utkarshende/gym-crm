// src/pages/EditMember.jsx

import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";

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
    dob: "",
    address: "",
    height: "",
    weight: "",
    goalWeight: "",
    fee: "",
    plan: "monthly",
    status: "active",

    joinDate: "",
    expiryDate: "",

    emergencyName: "",
    emergencyPhone: "",
    emergencyRelation: "",

    breakReason: "",
    breakFrom: "",
    breakTo: "",

    payments: [],
  });

  // =========================
  // Fetch Member
  // =========================
  const fetchMember = async () => {
    try {
      setLoading(true);

      const res = await API.get(`/members/${id}`);

      setMember({
        ...member,
        ...res.data,
      });
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

  // =========================
  // BMI
  // =========================
  const bmi = useMemo(() => {
    const h = Number(member.height) / 100;
    const w = Number(member.weight);

    if (!h || !w) return "-";

    return (w / (h * h)).toFixed(1);
  }, [member.height, member.weight]);

  // =========================
  // Generic Change
  // =========================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setMember((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================
  // Validations
  // =========================
  const validate = () => {
    if (!/^[A-Za-z ]+$/.test(member.name.trim())) {
      alert("Name should contain only letters");
      return false;
    }

    if (!/^\d{10}$/.test(member.phone)) {
      alert("Phone must be exactly 10 digits");
      return false;
    }

    if (
      member.email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(member.email)
    ) {
      alert("Invalid email");
      return false;
    }

    if (Number(member.fee) < 0) {
      alert("Fee cannot be negative");
      return false;
    }

    if (
      member.emergencyName &&
      !/^[A-Za-z ]+$/.test(member.emergencyName)
    ) {
      alert("Emergency name only letters allowed");
      return false;
    }

    if (
      member.emergencyPhone &&
      !/^\d{10}$/.test(member.emergencyPhone)
    ) {
      alert("Emergency phone must be 10 digits");
      return false;
    }

    return true;
  };

  // =========================
  // Save
  // =========================
  const handleSave = async () => {
    if (!validate()) return;

    try {
      setSaving(true);

      await API.put(`/members/${id}`, member);

      alert("Updated Successfully ✅");

      navigate(`/member/view/${id}`);
    } catch (error) {
      console.error(error);
      alert("Update failed ❌");
    } finally {
      setSaving(false);
    }
  };

  // =========================
  // Payment Row Change
  // =========================
  const updatePayment = (index, key, value) => {
    const updated = [...member.payments];

    updated[index][key] = value;

    setMember((prev) => ({
      ...prev,
      payments: updated,
    }));
  };

  const addPaymentRow = () => {
    setMember((prev) => ({
      ...prev,
      payments: [
        ...prev.payments,
        {
          month: "",
          amount: "",
          paidOn: "",
        },
      ],
    }));
  };

  const removePayment = (index) => {
    const updated = [...member.payments];
    updated.splice(index, 1);

    setMember((prev) => ({
      ...prev,
      payments: updated,
    }));
  };

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* Top */}
        <div className="flex justify-between items-center">
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 dark:text-white"
          >
            ← Back
          </button>

          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Edit Member
          </h1>
        </div>

        {/* Personal */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow grid md:grid-cols-2 gap-4">
          <Input label="Full Name" name="name" value={member.name} onChange={handleChange} />
          <Input label="Email" name="email" value={member.email} onChange={handleChange} />
          <Input
            label="Phone"
            name="phone"
            value={member.phone}
            onChange={(e) =>
              setMember({
                ...member,
                phone: e.target.value.replace(/\D/g, "").slice(0, 10),
              })
            }
          />

          <Input label="Date of Birth" type="date" name="dob" value={member.dob?.slice(0,10)} onChange={handleChange} />

          <Select
            label="Gender"
            name="gender"
            value={member.gender}
            onChange={handleChange}
            options={["male", "female", "other"]}
          />

          <Input label="Address" name="address" value={member.address} onChange={handleChange} />
        </div>

        {/* Fitness */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow grid md:grid-cols-2 gap-4">
          <Input label="Height (cm)" type="number" name="height" value={member.height} onChange={handleChange} />
          <Input label="Weight (kg)" type="number" name="weight" value={member.weight} onChange={handleChange} />
          <Input label="Goal Weight" type="number" name="goalWeight" value={member.goalWeight} onChange={handleChange} />

          <div>
            <label className="text-sm text-gray-500">BMI</label>
            <div className="border rounded px-3 py-2 bg-gray-50 dark:bg-gray-700 dark:text-white">
              {bmi}
            </div>
          </div>
        </div>

        {/* Membership */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow grid md:grid-cols-2 gap-4">
          <Select
            label="Plan"
            name="plan"
            value={member.plan}
            onChange={handleChange}
            options={["monthly", "quarterly"]}
          />

          <Input
            label="Fee"
            type="number"
            name="fee"
            value={member.fee}
            onChange={(e) =>
              setMember({
                ...member,
                fee: Math.max(0, Number(e.target.value)),
              })
            }
          />

          <Input
            label="Joined Date"
            type="date"
            name="joinDate"
            value={member.joinDate?.slice(0,10)}
            onChange={handleChange}
          />

          <Input
            label="Expiry Date"
            type="date"
            name="expiryDate"
            value={member.expiryDate?.slice(0,10)}
            onChange={handleChange}
          />

          <Select
            label="Status"
            name="status"
            value={member.status}
            onChange={handleChange}
            options={["active", "paused", "expired"]}
          />
        </div>

        {/* Break Section */}
        {member.status === "paused" && (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow grid md:grid-cols-3 gap-4">
            <Input label="Break Reason" name="breakReason" value={member.breakReason} onChange={handleChange} />
            <Input label="Break From" type="date" name="breakFrom" value={member.breakFrom?.slice(0,10)} onChange={handleChange} />
            <Input label="Break To" type="date" name="breakTo" value={member.breakTo?.slice(0,10)} onChange={handleChange} />
          </div>
        )}

        {/* Emergency */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow grid md:grid-cols-3 gap-4">
          <Input label="Emergency Name" name="emergencyName" value={member.emergencyName} onChange={handleChange} />
          <Input
            label="Emergency Phone"
            name="emergencyPhone"
            value={member.emergencyPhone}
            onChange={(e) =>
              setMember({
                ...member,
                emergencyPhone: e.target.value.replace(/\D/g, "").slice(0, 10),
              })
            }
          />
          <Input label="Relation" name="emergencyRelation" value={member.emergencyRelation} onChange={handleChange} />
        </div>

        {/* Payments */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Payment History
            </h2>

            <button
              onClick={addPaymentRow}
              className="px-4 py-2 bg-green-600 text-white rounded"
            >
              + Add Payment
            </button>
          </div>

          {member.payments?.map((pay, index) => (
            <div key={index} className="grid md:grid-cols-4 gap-3">
              <Input
                label="Month"
                value={pay.month}
                onChange={(e) =>
                  updatePayment(index, "month", e.target.value)
                }
              />

              <Input
                label="Amount"
                type="number"
                value={pay.amount}
                onChange={(e) =>
                  updatePayment(index, "amount", e.target.value)
                }
              />

              <Input
                label="Paid On"
                type="date"
                value={pay.paidOn?.slice(0,10)}
                onChange={(e) =>
                  updatePayment(index, "paidOn", e.target.value)
                }
              />

              <button
                onClick={() => removePayment(index)}
                className="mt-7 px-3 py-2 bg-red-500 text-white rounded"
              >
                Delete
              </button>
            </div>
          ))}
        </div>

        {/* Save */}
        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full py-3 bg-blue-600 text-white rounded-xl text-lg font-semibold"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>

      </div>
    </div>
  );
}

export default EditMember;

// ===================================
// Reusable Components
// ===================================

function Input({
  label,
  type = "text",
  name,
  value,
  onChange,
}) {
  return (
    <div>
      <label className="block mb-1 text-sm text-gray-600 dark:text-gray-300">
        {label}
      </label>

      <input
        type={type}
        name={name}
        value={value || ""}
        onChange={onChange}
        className="w-full border rounded-lg px-3 py-2 bg-white dark:bg-gray-700 dark:text-white"
      />
    </div>
  );
}

function Select({
  label,
  name,
  value,
  onChange,
  options,
}) {
  return (
    <div>
      <label className="block mb-1 text-sm text-gray-600 dark:text-gray-300">
        {label}
      </label>

      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border rounded-lg px-3 py-2 bg-white dark:bg-gray-700 dark:text-white"
      >
        {options.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
}