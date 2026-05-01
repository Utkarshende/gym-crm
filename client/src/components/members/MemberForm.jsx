import { useState } from "react";

function MemberForm({ onSubmit, loading = false, initialData = {} }) {
  const [form, setForm] = useState({
    name: initialData.name || "",
    email: initialData.email || "",
    phone: initialData.phone || "",
    gender: initialData.gender || "",
    dob: initialData.dob || "",
    address: initialData.address || "",
    height: initialData.height || "",
    weight: initialData.weight || "",
    goalWeight: initialData.goalWeight || "",
    emergencyName: initialData.emergencyName || "",
    emergencyPhone: initialData.emergencyPhone || "",
    medical: initialData.medical || "",
    plan: initialData.plan || "monthly",
    fee: initialData.fee || "",
    status: initialData.status || "active",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    let finalValue = value;

    if (name === "phone" || name === "emergencyPhone") {
      finalValue = value.replace(/\D/g, "").slice(0, 10);
    }

    if (name === "fee") {
      finalValue = Math.max(0, Number(value));
    }

    setForm({ ...form, [name]: finalValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.name.trim().length < 3) {
      return alert("Name must be at least 3 letters");
    }

    if (!/^\d{10}$/.test(form.phone)) {
      return alert("Phone must be 10 digits");
    }

    onSubmit(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {/* Personal Info */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">
          Personal Information
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          <input
            name="name"
            placeholder="Full Name"
            className="border p-3 rounded-lg"
            value={form.name}
            onChange={handleChange}
          />

          <input
            name="email"
            placeholder="Email"
            className="border p-3 rounded-lg"
            value={form.email}
            onChange={handleChange}
          />

          <input
            name="phone"
            placeholder="Phone Number"
            className="border p-3 rounded-lg"
            value={form.phone}
            onChange={handleChange}
          />

          <input
            type="date"
            name="dob"
            className="border p-3 rounded-lg"
            value={form.dob}
            onChange={handleChange}
          />

          <select
            name="gender"
            className="border p-3 rounded-lg"
            value={form.gender}
            onChange={handleChange}
          >
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
          </select>

          <input
            name="address"
            placeholder="Address"
            className="border p-3 rounded-lg"
            value={form.address}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Fitness */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">
          Fitness Details
        </h2>

        <div className="grid md:grid-cols-3 gap-4">
          <input
            name="height"
            type="number"
            placeholder="Height (cm)"
            className="border p-3 rounded-lg"
            value={form.height}
            onChange={handleChange}
          />

          <input
            name="weight"
            type="number"
            placeholder="Weight (kg)"
            className="border p-3 rounded-lg"
            value={form.weight}
            onChange={handleChange}
          />

          <input
            name="goalWeight"
            type="number"
            placeholder="Goal Weight"
            className="border p-3 rounded-lg"
            value={form.goalWeight}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Emergency */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">
          Emergency Contact
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          <input
            name="emergencyName"
            placeholder="Emergency Name"
            className="border p-3 rounded-lg"
            value={form.emergencyName}
            onChange={handleChange}
          />

          <input
            name="emergencyPhone"
            placeholder="Emergency Phone"
            className="border p-3 rounded-lg"
            value={form.emergencyPhone}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Membership */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">
          Membership
        </h2>

        <div className="grid md:grid-cols-3 gap-4">
          <select
            name="plan"
            className="border p-3 rounded-lg"
            value={form.plan}
            onChange={handleChange}
          >
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
          </select>

          <input
            name="fee"
            type="number"
            placeholder="Fees"
            className="border p-3 rounded-lg"
            value={form.fee}
            onChange={handleChange}
          />

          <select
            name="status"
            className="border p-3 rounded-lg"
            value={form.status}
            onChange={handleChange}
          >
            <option value="active">Active</option>
            <option value="paused">On Break</option>
            <option value="expired">Inactive</option>
          </select>
        </div>
      </div>

      {/* Medical */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">
          Medical Notes
        </h2>

        <textarea
          name="medical"
          rows="4"
          placeholder="Any medical issues or allergies..."
          className="border p-3 rounded-lg w-full"
          value={form.medical}
          onChange={handleChange}
        />
      </div>

      <button
        disabled={loading}
        className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold"
      >
        {loading ? "Saving..." : "Save Member"}
      </button>
    </form>
  );
}

export default MemberForm;