import { useEffect, useState } from "react";
import API from "../services/api";

function Attendance() {

  const [members, setMembers] = useState([]);
  const [todayAttendance, setTodayAttendance] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {

      setLoading(true);

      const [membersRes, attendanceRes] = await Promise.all([
        API.get("/members"),
        API.get("/attendance/today"),
      ]);

      setMembers(
        Array.isArray(membersRes.data)
          ? membersRes.data
          : []
      );

      setTodayAttendance(
        Array.isArray(attendanceRes.data)
          ? attendanceRes.data
          : []
      );

    } catch (error) {
      console.error(error);
      alert("Failed to load attendance");

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const alreadyMarked = (memberId) => {
    return todayAttendance.some(
      (a) => a.memberId?._id === memberId
    );
  };

  const markAttendance = async (memberId) => {
    try {

      await API.post("/attendance/mark", {
        memberId,
        status: "present",
      });

      alert("Attendance marked ✅");

      fetchData();

    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
        "Failed to mark attendance"
      );
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        Loading Attendance...
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 space-y-6">

      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">
          Attendance
        </h1>

        <div className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold">
          Present Today: {todayAttendance.length}
        </div>
      </div>

      <div className="grid gap-4">

        {members.map((member) => {

          const marked = alreadyMarked(member._id);

          return (
            <div
              key={member._id}
              className="bg-white rounded-2xl shadow p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            >

              <div>
                <h2 className="text-xl font-bold">
                  {member.name}
                </h2>

                <p className="text-gray-500">
                  {member.phone}
                </p>
              </div>

              <div className="flex items-center gap-3">

                {marked ? (
                  <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold">
                    Present ✅
                  </span>
                ) : (
                  <button
                    onClick={() =>
                      markAttendance(member._id)
                    }
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-semibold"
                  >
                    Mark Present
                  </button>
                )}

              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Attendance;