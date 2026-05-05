import { useMemo } from "react";

function MemberForm({ form, setForm, onSubmit, buttonText }) {
  const bmi = useMemo(() => {
    const h = Number(form.height) / 100;
    const w = Number(form.weight);
    return h && w ? (w / (h * h)).toFixed(1) : "";
  }, [form.height, form.weight]);

  const update = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const updateNested = (parent, key, value) => {
    setForm((prev) => ({
      ...prev,
      [parent]: {
        ...(prev[parent] || {}),
        [key]: value,
      },
    }));
  };

  return (
    <div className="space-y-6">

      <div className="bg-white p-5 rounded-xl shadow space-y-4">
        <h2 className="font-bold text-lg">Personal Info</h2>

        <input
          className="input"
          placeholder="Name"
          value={form.name || ""}
          onChange={(e) =>
            update("name", e.target.value.replace(/[^a-zA-Z ]/g, ""))
          }
        />

        <input
          className="input"
          placeholder="Email"
          value={form.email || ""}
          onChange={(e) => update("email", e.target.value)}
        />

        <input
          className="input"
          placeholder="Phone"
          maxLength={10}
          value={form.phone || ""}
          onChange={(e) =>
            update("phone", e.target.value.replace(/\D/g, "").slice(0, 10))
          }
        />

        <select
          className="input"
          value={form.gender || ""}
          onChange={(e) => update("gender", e.target.value)}
        >
          <option value="">Gender</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>
      </div>

      <div className="bg-white p-5 rounded-xl shadow space-y-4">
        <h2 className="font-bold text-lg">Fitness</h2>

        <input
          className="input"
          type="number"
          placeholder="Height (cm)"
          value={form.height || ""}
          onChange={(e) => update("height", e.target.value)}
        />

        <input
          className="input"
          type="number"
          placeholder="Weight (kg)"
          value={form.weight || ""}
          onChange={(e) => update("weight", e.target.value)}
        />

        <input
          className="input"
          type="number"
          placeholder="Goal Weight"
          value={form.goalWeight || ""}
          onChange={(e) => update("goalWeight", e.target.value)}
        />

        <input className="input bg-gray-100" value={bmi} readOnly />
      </div>

      <div className="bg-white p-5 rounded-xl shadow space-y-4">
        <h2 className="font-bold text-lg">Membership</h2>

        <input
          className="input"
          type="number"
          placeholder="Fee"
          value={form.fee || ""}
          onChange={(e) => update("fee", e.target.value)}
        />

        <select
          className="input"
          value={form.status || "active"}
          onChange={(e) => update("status", e.target.value)}
        >
          <option value="active">Active</option>
          <option value="paused">Break</option>
          <option value="expired">Inactive</option>
        </select>
      </div>

      <button
        onClick={onSubmit}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg"
      >
        {buttonText}
      </button>
    </div>
  );
}

export default MemberForm;