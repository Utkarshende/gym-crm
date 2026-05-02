import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import MemberTable from "../components/members/MemberTable";

function Dashboard() {
  const navigate = useNavigate();

  const [members, setMembers] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [dark, setDark] = useState(false);

  const fetchMembers = async () => {
    try {
      const res = await API.get("/members");
      setMembers(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  // Filter members
  const filtered = members.filter((m) => {
    const matchName = m.name
      ?.toLowerCase()
      .includes(search.toLowerCase());

    const matchStatus =
      status === "all" ? true : m.status === status;

    return matchName && matchStatus;
  });

  // Export CSV
  const exportCSV = () => {
    const headers = [
      "Name",
      "Phone",
      "Plan",
      "Fee",
      "Status",
    ];

    const rows = filtered.map((m) => [
      m.name,
      m.phone,
      m.plan,
      m.fee,
      m.status,
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((r) => r.join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv",
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "members.csv";
    a.click();
  };

  return (
    <div
      className={`min-h-screen p-6 ${
        dark
          ? "bg-slate-900 text-white"
          : "bg-slate-100 text-black"
      }`}
    >
      {/* Top */}
      <div className="flex flex-wrap gap-3 justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Members Dashboard
        </h1>

        <div className="flex gap-3 flex-wrap">
          <button
            onClick={() => setDark(!dark)}
            className="px-4 py-2 rounded bg-slate-700 text-white"
          >
            {dark ? "Light" : "Dark"}
          </button>

          <button
            onClick={() => navigate("/add-member")}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg"
          >
            + Add Member
          </button>
        </div>
      </div>

      {/* Search Filters */}
      <div className="grid md:grid-cols-4 gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name..."
          className="border p-3 rounded-lg text-black"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <select
          className="border p-3 rounded-lg text-black"
          value={status}
          onChange={(e) =>
            setStatus(e.target.value)
          }
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="paused">On Break</option>
          <option value="expired">Inactive</option>
        </select>

        <button
          onClick={exportCSV}
          className="bg-green-600 text-white rounded-lg px-4"
        >
          Export CSV
        </button>

        <div className="font-semibold flex items-center">
          Total: {filtered.length}
        </div>
      </div>

      {/* Table */}
      <MemberTable
        members={filtered}
        onView={(m) =>
          navigate(`/member/view/${m._id}`)
        }
        onEdit={(m) =>
          navigate(`/member/edit/${m._id}`)
        }
        onDelete={async (m) => {
          const ok = confirm(
            `Delete ${m.name}?`
          );
          if (!ok) return;

          try {
            await API.delete(`/members/${m._id}`);
            fetchMembers();
          } catch (error) {
            alert("Delete failed");
          }
        }}
      />
    </div>
  );
}

export default Dashboard;