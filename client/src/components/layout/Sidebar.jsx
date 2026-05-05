import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const { pathname } = useLocation();

  const menu = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Payments", path: "/payments" },
    { name: "Add Member", path: "/add-member" },
  ];

  return (
    <div className="w-64 bg-slate-900 text-white p-5 min-h-screen">
      <h2 className="text-2xl mb-8">🏋 Gym CRM</h2>

      {menu.map((item) => (
        <Link
          key={item.name}
          to={item.path}
          className={`block p-3 rounded ${
            pathname === item.path ? "bg-blue-600" : "hover:bg-slate-700"
          }`}
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
}

export default Sidebar;