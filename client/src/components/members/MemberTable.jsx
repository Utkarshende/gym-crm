import Button from "../ui/Button";

function MemberTable({
  members,
  onEdit,
}) {
  return (
    <div className="bg-white shadow rounded-xl p-4">

      <table className="w-full">

        <thead>
          <tr className="border-b">

            <th className="text-left py-3">
              Name
            </th>

            <th className="text-left">
              Phone
            </th>

            <th>Status</th>

            <th>Plan</th>

            <th>Action</th>

          </tr>
        </thead>

        <tbody>
          {members.map((member) => (
            <tr
              key={member._id}
              className="border-b"
            >
              <td className="py-3">
                {member.name}
              </td>

              <td>
                {member.phone}
              </td>

              <td>

                <span
                  className={`px-2 py-1 rounded text-white text-sm ${
                    member.status ===
                    "active"
                      ? "bg-green-500"
                      : member.status ===
                        "paused"
                      ? "bg-yellow-500"
                      : "bg-red-500"
                  }`}
                >
                  {member.status}
                </span>

              </td>

              <td>
                {member.plan}
              </td>

              <td>
                <Button
                  onClick={() =>
                    onEdit(member)
                  }
                >
                  Edit
                </Button>
              </td>

            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}

export default MemberTable;