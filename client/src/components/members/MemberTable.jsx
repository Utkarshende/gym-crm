function MemberTable({ members, onView, onEdit, onDelete }) {
  const statusColor = (status) => {
    if (status === "active") return "bg-green-100 text-green-700";
    if (status === "paused") return "bg-yellow-100 text-yellow-700";
    return "bg-red-100 text-red-700";
  };

  return (
    <div className="bg-white md:rounded-2xl shadow overflow-hidden border border-gray-100">
      {/* DESKTOP TABLE VIEW (Visible on md and up) */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="p-4 font-semibold text-slate-600">Name</th>
              <th className="p-4 font-semibold text-slate-600">Phone</th>
              <th className="p-4 font-semibold text-slate-600">Plan</th>
              <th className="p-4 font-semibold text-slate-600">Status</th>
              <th className="p-4 font-semibold text-slate-600 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {members.map((m) => (
              <tr key={m._id} className="border-b hover:bg-slate-50 transition-colors">
                <td className="p-4 font-medium">{m.name}</td>
                <td className="p-4 text-slate-600">{m.phone}</td>
                <td className="p-4 capitalize text-slate-600">{m.plan}</td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${statusColor(m.status)}`}>
                    {m.status}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex justify-end gap-2">
                    <button onClick={() => onView(m)} className="p-2 text-blue-600 hover:bg-blue-50 rounded">View</button>
                    <button onClick={() => onEdit(m)} className="p-2 text-green-600 hover:bg-green-50 rounded">Edit</button>
                    <button onClick={() => onDelete(m)} className="p-2 text-red-600 hover:bg-red-50 rounded">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MOBILE CARD VIEW (Visible below md) */}
      <div className="md:hidden divide-y divide-gray-100">
        {members.map((m) => (
          <div key={m._id} className="p-4 space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-bold text-gray-900">{m.name}</p>
                <p className="text-sm text-gray-500">{m.phone}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${statusColor(m.status)}`}>
                {m.status}
              </span>
            </div>
            
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500">Plan: <span className="text-gray-900 capitalize font-medium">{m.plan}</span></span>
              <div className="flex gap-3">
                <button onClick={() => onView(m)} className="text-blue-600 font-semibold">View</button>
                <button onClick={() => onEdit(m)} className="text-green-600 font-semibold">Edit</button>
                <button onClick={() => onDelete(m)} className="text-red-600 font-semibold">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* EMPTY STATE */}
      {!members.length && (
        <div className="text-center p-10">
          <p className="text-gray-400 italic">No members found</p>
        </div>
      )}
    </div>
  );
}

export default MemberTable;