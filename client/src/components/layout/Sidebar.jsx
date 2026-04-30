import { Users, LayoutDashboard, PlusCircle } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();

  const menus = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/" },
    { name: "Members", icon: Users, path: "/" },
    { name: "Add Member", icon: PlusCircle, path: "/add-member" },
  ];

  return (
    <div className="w-64 bg-slate-900 text-white min-h-screen p-5">
      <h1 className="text-2xl font-bold mb-10">🏋 Gym CRM</h1>

      <div className="space-y-2">
        {menus.map((item, i) => {
          const Icon = item.icon;

          return (
            <Link
              key={i}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                location.pathname === item.path
                  ? "bg-blue-600"
                  : "hover:bg-slate-800"
              }`}
            >
              <Icon size={18} />
              {item.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Sidebar;