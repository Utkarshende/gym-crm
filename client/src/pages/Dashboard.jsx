import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";
import MemberTable from "../components/members/MemberTable";
import Input from "../components/ui/Input";
import API from "../services/api";

function Dashboard() {
  const navigate = useNavigate();

  const [members, setMembers] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [status, setStatus] =
    useState("all");

  const fetchMembers =
    async () => {
      const res =
        await API.get(
          "/members"
        );
      setMembers(
        res.data
      );
    };

  useEffect(() => {
    fetchMembers();
  }, []);

  const filtered =
    members.filter(
      (m) =>
        m.name
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) &&
        (status === "all"
          ? true
          : m.status ===
            status)
    );

  return (
    <div className="flex">

      <Sidebar />

      <div className="flex-1 bg-gray-100 min-h-screen">

        <Navbar />

        <div className="p-6">

          <div className="flex gap-4 mb-5">

            <Input
              placeholder="Search by name..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
            />

            <select
              className="border p-2 rounded-lg"
              value={status}
              onChange={(e) =>
                setStatus(
                  e.target.value
                )
              }
            >
              <option value="all">
                All
              </option>

              <option value="active">
                Active
              </option>

              <option value="expired">
                Not Active
              </option>

              <option value="paused">
                On Break
              </option>

            </select>

          </div>

          <MemberTable
            members={filtered}
            onEdit={(m) =>
              navigate(
                `/member/edit/${m._id}`
              )
            }
          />

        </div>
      </div>
    </div>
  );
}

export default Dashboard;