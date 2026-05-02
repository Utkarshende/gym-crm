function MemberTable({
  members,
  onView,
  onEdit,
  onDelete,
}) {
  const statusColor = (status) => {
    if (status === "active")
      return "bg-green-100 text-green-700";

    if (status === "paused")
      return "bg-yellow-100 text-yellow-700";

    return "bg-red-100 text-red-700";
  };

  return (
    <div className="bg-white rounded-2xl shadow overflow-hidden">
      <table className="w-full">
        <thead className="bg-slate-200">
          <tr>
            <th className="p-4 text-left">
              Name
            </th>
            <th className="p-4 text-left">
              Phone
            </th>
            <th className="p-4 text-left">
              Plan
            </th>
            <th className="p-4 text-left">
              Status
            </th>
            <th className="p-4 text-left">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {members.map((m) => (
            <tr
              key={m._id}
              className="border-t"
            >
              <td className="p-4">
                {m.name}
              </td>

              <td className="p-4">
                {m.phone}
              </td>

              <td className="p-4 capitalize">
                {m.plan}
              </td>

              <td className="p-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColor(
                    m.status
                  )}`}
                >
                  {m.status}
                </span>
              </td>

              <td className="p-4 flex gap-2">
                <button
                  onClick={() =>
                    onView(m)
                  }
                  className="bg-blue-600 text-white px-3 py-1 rounded"
                >
                  View
                </button>

                <button
                  onClick={() =>
                    onEdit(m)
                  }
                  className="bg-green-600 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    onDelete(m)
                  }
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}

          {!members.length && (
            <tr>
              <td
                colSpan="5"
                className="text-center p-6 text-gray-500"
              >
                No members found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default MemberTable;