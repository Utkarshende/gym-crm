import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

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

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.name.length < 3) {
      return alert("Name must be minimum 3 letters");
    }

    if (!/^\d{10}$/.test(form.phone)) {
      return alert("Phone must be 10 digits");
    }

    if (Number(form.fee) < 0) {
      return alert("Fee cannot be negative");
    }

    try {
      await API.post("/members", form);
      alert("Member Added Successfully ✅");
      navigate("/");
    } catch (error) {
      console.log(error);
      alert("Failed to add member");
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="mb-5 text-blue-600 font-semibold"
      >
        ← Back
      </button>

      <h1 className="text-3xl font-bold mb-6">Add New Member</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow rounded-xl p-6 grid md:grid-cols-2 gap-5"
      >
        <input
          name="name"
          placeholder="Full Name"
          className="border p-3 rounded"
          onChange={handleChange}
        />

        <input
          name="phone"
          placeholder="Phone Number"
          className="border p-3 rounded"
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Email Address"
          className="border p-3 rounded"
          onChange={handleChange}
        />

        <select
          name="gender"
          className="border p-3 rounded"
          onChange={handleChange}
        >
          <option value="">Select Gender</option>
          <option>Male</option>
          <option>Female</option>
        </select>

        <input
          name="age"
          type="number"
          placeholder="Age"
          className="border p-3 rounded"
          onChange={handleChange}
        />

        <input
          name="address"
          placeholder="Address"
          className="border p-3 rounded"
          onChange={handleChange}
        />

        <input
          name="fee"
          type="number"
          placeholder="Monthly Fees"
          className="border p-3 rounded"
          onChange={handleChange}
        />

        <select
          name="plan"
          className="border p-3 rounded"
          onChange={handleChange}
        >
          <option value="monthly">Monthly</option>
          <option value="quarterly">Quarterly</option>
        </select>

        <input
          name="weight"
          placeholder="Current Weight"
          className="border p-3 rounded"
          onChange={handleChange}
        />

        <input
          name="height"
          placeholder="Height"
          className="border p-3 rounded"
          onChange={handleChange}
        />

        <input
          name="goal"
          placeholder="Fitness Goal"
          className="border p-3 rounded"
          onChange={handleChange}
        />

        <select
          name="status"
          className="border p-3 rounded"
          onChange={handleChange}
        >
          <option value="active">Active</option>
          <option value="paused">On Break</option>
          <option value="expired">Inactive</option>
        </select>

        <button
          type="submit"
          className="md:col-span-2 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
        >
          Add Member
        </button>
      </form>
    </div>
  );
}

export default AddMember;