import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="bg-white shadow px-6 py-4 flex justify-between">
      <h1 onClick={() => navigate("/dashboard")} className="font-bold cursor-pointer">
        Gym CRM
      </h1>

      <div className="flex gap-3">
        <button onClick={() => navigate("/add-member")} className="bg-blue-600 text-white px-4 py-2 rounded">
          + Add
        </button>

        <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded">
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;