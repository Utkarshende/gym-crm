import { useMemo } from "react";

function MemberForm({ form, setForm, onSubmit, buttonText }) {
  const bmi = useMemo(() => {
    const h = Number(form.height) / 100;
    const w = Number(form.weight);

    if (!h || !w) return "";

    return (w / (h * h)).toFixed(1);
  }, [form.height, form.weight]);

  const update = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const updateNested = (parent, key, value) => {
    setForm({
      ...form,
      [parent]: {
        ...form[parent],
        [key]: value,
      },
    });
  };

  return (
    <div className="space-y-6">

      {/* PERSONAL */}
      <div className="bg-white p-5 rounded-xl shadow space-y-4">
        <h2 className="font-bold text-lg">Personal Info</h2>

        <div>
          <label>Name</label>
          <input
            className="input"
            value={form.name}
            onChange={(e) =>
              update("name", e.target.value.replace(/[^a-zA-Z ]/g, ""))
            }
          />
        </div>

        <div>
          <label>Email</label>
          <input
            className="input"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
          />
        </div>

        <div>
          <label>Phone</label>
          <input
            className="input"
            value={form.phone}
            maxLength={10}
            onChange={(e) =>
              update(
                "phone",
                e.target.value.replace(/\D/g, "").slice(0, 10)
              )
            }
          />
        </div>

        <div>
          <label>Gender</label>
          <select
            className="input"
            value={form.gender}
            onChange={(e) => update("gender", e.target.value)}
          >
            <option value="">Select</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>
      </div>

      {/* FITNESS */}
      <div className="bg-white p-5 rounded-xl shadow space-y-4">
        <h2 className="font-bold text-lg">Fitness</h2>

        <div>
          <label>Height (cm)</label>
          <input
            className="input"
            type="number"
            value={form.height}
            onChange={(e) => update("height", e.target.value)}
          />
        </div>

        <div>
          <label>Weight (kg)</label>
          <input
            className="input"
            type="number"
            value={form.weight}
            onChange={(e) => update("weight", e.target.value)}
          />
        </div>

        <div>
          <label>Goal Weight</label>
          <input
            className="input"
            type="number"
            value={form.goalWeight}
            onChange={(e) => update("goalWeight", e.target.value)}
          />
        </div>

        <div>
          <label>BMI</label>
          <input className="input bg-gray-100" value={bmi} readOnly />
        </div>
      </div>

      {/* EMERGENCY */}
      <div className="bg-white p-5 rounded-xl shadow space-y-4">
        <h2 className="font-bold text-lg">Emergency Contact</h2>

        <div>
          <label>Name</label>
          <input
            className="input"
            value={form.emergency?.name || ""}
            onChange={(e) =>
              updateNested("emergency", "name", e.target.value)
            }
          />
        </div>

        <div>
          <label>Phone</label>
          <input
            className="input"
            maxLength={10}
            value={form.emergency?.phone || ""}
            onChange={(e) =>
              updateNested(
                "emergency",
                "phone",
                e.target.value.replace(/\D/g, "").slice(0, 10)
              )
            }
          />
        </div>

        <div>
          <label>Relation</label>
          <input
            className="input"
            value={form.emergency?.relation || ""}
            onChange={(e) =>
              updateNested("emergency", "relation", e.target.value)
            }
          />
        </div>
      </div>

      {/* MEMBERSHIP */}
      <div className="bg-white p-5 rounded-xl shadow space-y-4">
        <h2 className="font-bold text-lg">Membership</h2>

        <label>Fee</label>
        <input
          className="input"
          type="number"
          min="0"
          value={form.fee}
          onChange={(e) => update("fee", e.target.value)}
        />

        <label>Status</label>
        <select
          className="input"
          value={form.status}
          onChange={(e) => update("status", e.target.value)}
        >
          <option value="active">Active</option>
          <option value="expired">Not Active</option>
          <option value="paused">Break</option>
        </select>
      </div>

      {/* BREAK */}
      {form.status === "paused" && (
        <div className="bg-white p-5 rounded-xl shadow space-y-4">
          <h2 className="font-bold text-lg">Break Details</h2>

          <label>Reason</label>
          <input
            className="input"
            value={form.pause?.reason || ""}
            onChange={(e) =>
              updateNested("pause", "reason", e.target.value)
            }
          />

          <label>From</label>
          <input
            className="input"
            type="date"
            value={form.pause?.from || ""}
            onChange={(e) =>
              updateNested("pause", "from", e.target.value)
            }
          />

          <label>To</label>
          <input
            className="input"
            type="date"
            value={form.pause?.to || ""}
            onChange={(e) =>
              updateNested("pause", "to", e.target.value)
            }
          />
        </div>
      )}

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