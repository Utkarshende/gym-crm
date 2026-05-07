import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

import Input from "../components/ui/Input";
import Select from "../components/ui/Select";
import Button from "../components/ui/Button";

function AddMember() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    gender: "",
    age: "",
    address: "",
    fee: "",
    plan: "monthly",
    status: "active",
    weight: "",
    height: "",
    goal: "",
  });

  const update = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.name.length < 3) return alert("Name must be minimum 3 letters");
    if (!/^\d{10}$/.test(form.phone)) return alert("Phone must be 10 digits");
    if (Number(form.fee) < 0) return alert("Fee cannot be negative");

    try {
      await API.post("/members", form);
      alert("Member Added Successfully ✅");
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Failed to add member");
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">

      <Button onClick={() => navigate(-1)} className="mb-5">
        ← Back
      </Button>

      <h1 className="text-3xl font-bold mb-6">Add New Member</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow rounded-xl p-6 grid md:grid-cols-2 gap-5"
      >
        <Input label="Full Name" value={form.name} onChange={(e) => update("name", e.target.value)} />
        <Input label="Phone" value={form.phone} onChange={(e) => update("phone", e.target.value.replace(/\D/g, "").slice(0, 10))} />
        <Input label="Email" value={form.email} onChange={(e) => update("email", e.target.value)} />

        <Select label="Gender" value={form.gender} onChange={(e) => update("gender", e.target.value)} options={["male", "female"]} />

        <Input label="Age" type="number" value={form.age} onChange={(e) => update("age", e.target.value)} />
        <Input label="Address" value={form.address} onChange={(e) => update("address", e.target.value)} />

        <Input label="Monthly Fee" type="number" value={form.fee} onChange={(e) => update("fee", e.target.value)} />

        <Select label="Plan" value={form.plan} onChange={(e) => update("plan", e.target.value)} options={["monthly", "quarterly"]} />

        <Input label="Weight" value={form.weight} onChange={(e) => update("weight", e.target.value)} />
        <Input label="Height" value={form.height} onChange={(e) => update("height", e.target.value)} />

        <Input label="Fitness Goal" value={form.goal} onChange={(e) => update("goal", e.target.value)} />

        <Select label="Status" value={form.status} onChange={(e) => update("status", e.target.value)} options={["active", "paused", "expired"]} />

        <Button type="submit" className="md:col-span-2">
          Add Member
        </Button>
      </form>
    </div>
  );
}

export default AddMember;