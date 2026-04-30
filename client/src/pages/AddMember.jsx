import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";
import MemberForm from "../components/members/MemberForm";
import API from "../services/api";

function AddMember() {
  const navigate = useNavigate();

  const [member, setMember] =
    useState({
      name: "",
      phone: "",
      fee: "",
      plan: "monthly",
      status: "active",
    });

  const submit =
    async () => {
      await API.post(
        "/members",
        member
      );

      alert(
        "Member Added"
      );

      navigate(
        "/dashboard"
      );
    };

  return (
    <div className="flex">

      <Sidebar />

      <div className="flex-1 bg-gray-100 min-h-screen">

        <Navbar />

        <div className="p-6">

          <MemberForm
            member={member}
            setMember={setMember}
            onSubmit={submit}
            title="Add New Member"
          />

        </div>
      </div>
    </div>
  );
}

export default AddMember;