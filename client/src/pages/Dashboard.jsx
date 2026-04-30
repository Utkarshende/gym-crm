import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import StatsCards from "../components/dashboard/StatsCards";
import MemberTable from "../components/members/MemberTable";

import API from "../services/api";

function Dashboard() {
  const navigate = useNavigate();

  const [members, setMembers] = useState([]);
  const [search, setSearch] = useState("");

  const fetchMembers = async () => {
    try {
      const res = await API.get("/members");
      setMembers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const filtered = members.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex bg-slate-100 min-h-screen">
      <Sidebar />

      <div className="flex-1 p-6 space-y-6">
        <Header />

        <StatsCards members={members} />

        <div className="flex justify-between items-center">
          <input
            type="text"
            placeholder="Search member..."
            className="border px-4 py-2 rounded-lg w-72"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

          <button
            onClick={() =>
              navigate("/add-member")
            }
            className="bg-blue-600 text-white px-5 py-2 rounded-lg"
          >
            + Add Member
          </button>
        </div>

        <MemberTable
          members={filtered}
          onView={(m) =>
            navigate(`/member/view/${m._id}`)
          }
          onEdit={(m) =>
            navigate(`/member/edit/${m._id}`)
          }
        />
      </div>
    </div>
  );
}

export default Dashboard;