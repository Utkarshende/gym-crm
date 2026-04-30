import Button from "../ui/Button";

function MemberTable({ members, onView, onEdit }) {
  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <table className="w-full">
        <thead className="bg-slate-100">
          <tr>
            <th className="p-4 text-left">Name</th>
            <th className="p-4 text-left">Phone</th>
            <th className="p-4 text-left">Plan</th>
            <th className="p-4 text-left">Status</th>
            <th className="p-4 text-left">Actions</th>
          </tr>
        </thead>

        <tbody>
          {members.map((m) => (
            <tr key={m._id} className="border-t">
              <td className="p-4">{m.name}</td>
              <td className="p-4">{m.phone}</td>
              <td className="p-4 capitalize">{m.plan}</td>

              <td className="p-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    m.status === "active"
                      ? "bg-green-100 text-green-700"
                      : m.status === "paused"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {m.status}
                </span>
              </td>

              <td className="p-4 space-x-2">
                <button
                  onClick={() => onView(m)}
                  className="px-3 py-1 bg-blue-500 text-white rounded"
                >
                  View
                </button>

                <button
                  onClick={() => onEdit(m)}
                  className="px-3 py-1 bg-green-500 text-white rounded"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MemberTable;