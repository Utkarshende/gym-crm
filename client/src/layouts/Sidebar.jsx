import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="w-64 bg-gray-900 text-white min-h-screen p-5">

      <h1 className="text-2xl font-bold mb-8">
        Gym CRM
      </h1>

      <nav className="space-y-4">

        <Link
          to="/dashboard"
          className="block hover:text-blue-400"
        >
          Dashboard
        </Link>

        <Link
          to="/add-member"
          className="block hover:text-blue-400"
        >
          Add Member
        </Link>

      </nav>
    </div>
  );
}

export default Sidebar;