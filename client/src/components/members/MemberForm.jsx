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

  const Label = ({ children }) => (
    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 ml-1">
      {children}
    </label>
  );

  return (
    <div className="space-y-6 pb-20 md:pb-0">
      
      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
        <h2 className="font-bold text-lg text-gray-800 border-b pb-2">Personal Info</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <Label>Full Name</Label>
            <input
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              placeholder="e.g. John Doe"
              value={form.name || ""}
              onChange={(e) => update("name", e.target.value.replace(/[^a-zA-Z ]/g, ""))}
            />
          </div>
          <div>
            <Label>Email Address</Label>
            <input
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg"
              placeholder="email@example.com"
              type="email"
              value={form.email || ""}
              onChange={(e) => update("email", e.target.value)}
            />
          </div>
          <div>
            <Label>Phone Number</Label>
            <input
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg"
              placeholder="10-digit mobile"
              maxLength={10}
              value={form.phone || ""}
              onChange={(e) => update("phone", e.target.value.replace(/\D/g, "").slice(0, 10))}
            />
          </div>
          <div className="sm:col-span-2">
            <Label>Gender</Label>
            <select
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg"
              value={form.gender || ""}
              onChange={(e) => update("gender", e.target.value)}
            >
              <option value="">Select Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
        <h2 className="font-bold text-lg text-gray-800 border-b pb-2">Fitness Stats</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <Label>Height (cm)</Label>
            <input
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg"
              type="number"
              placeholder="175"
              value={form.height || ""}
              onChange={(e) => update("height", e.target.value)}
            />
          </div>
          <div>
            <Label>Weight (kg)</Label>
            <input
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg"
              type="number"
              placeholder="70"
              value={form.weight || ""}
              onChange={(e) => update("weight", e.target.value)}
            />
          </div>
          <div>
            <Label>Goal Weight</Label>
            <input
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg"
              type="number"
              placeholder="65"
              value={form.goalWeight || ""}
              onChange={(e) => update("goalWeight", e.target.value)}
            />
          </div>
          <div>
            <Label>Calculated BMI</Label>
            <div className={`w-full p-3 rounded-lg font-bold text-center ${bmi ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'bg-gray-100 text-gray-400'}`}>
              {bmi || "--"}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
        <h2 className="font-bold text-lg text-gray-800 border-b pb-2">Membership</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label>Membership Fee ($)</Label>
            <input
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg"
              type="number"
              placeholder="0.00"
              value={form.fee || ""}
              onChange={(e) => update("fee", e.target.value)}
            />
          </div>
          <div>
            <Label>Account Status</Label>
            <select
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg"
              value={form.status || "active"}
              onChange={(e) => update("status", e.target.value)}
            >
              <option value="active">Active</option>
              <option value="paused">On Break</option>
              <option value="expired">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      <button
        onClick={onSubmit}
        className="w-full md:w-auto md:min-w-[200px] bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-blue-200 transition-all text-lg"
      >
        {buttonText}
      </button>
    </div>
  );
}

export default MemberForm;