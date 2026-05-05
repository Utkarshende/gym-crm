import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

import MemberTable from "../components/members/MemberTable";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import DashboardFilters from "../components/dashboard/DashboardFilters";

import { exportToCSV } from "../utils/exportCSV";

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

  const filtered = members.filter((m) => {
    const matchName = m.name?.toLowerCase().includes(search.toLowerCase());
    const matchStatus = status === "all" ? true : m.status === status;
    return matchName && matchStatus;
  });

  return (
    <div className={`min-h-screen p-6 ${dark ? "bg-slate-900 text-white" : "bg-slate-100 text-black"}`}>

      <DashboardHeader
        dark={dark}
        setDark={setDark}
        onAdd={() => navigate("/add-member")}
      />

      <DashboardFilters
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
        total={filtered.length}
        onExport={() => exportToCSV(filtered, "members.csv")}
      />

      <MemberTable
        members={filtered}
        onView={(m) => navigate(`/member/view/${m._id}`)}
        onEdit={(m) => navigate(`/member/edit/${m._id}`)}
        onDelete={async (m) => {
          if (!confirm(`Delete ${m.name}?`)) return;
          try {
            await API.delete(`/members/${m._id}`);
            fetchMembers();
          } catch {
            alert("Delete failed");
          }
        }}
      />
    </div>
  );
}

export default Dashboard;