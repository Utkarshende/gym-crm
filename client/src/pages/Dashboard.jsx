import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem(
      "token"
    );

    navigate("/");
  };

  return (
    <div className="p-8">

      <div className="flex justify-between">

        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>

        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>

      </div>
    </div>
  );
}

export default Dashboard;