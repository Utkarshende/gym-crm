import { Link, useLocation } from "react-router-dom";

function Sidebar() {

  const { pathname } = useLocation();

  const menu = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: "📊",
    },

    {
      name: "Payments",
      path: "/payments",
      icon: "💰",
    },

    {
      name: "Add Member",
      path: "/add-member",
      icon: "👤",
    },

    {
  name: "AI Workout",
  path: "/ai-workout",
  icon: "🤖"
}

  ];

  return (
    <>
      <div className="hidden md:flex flex-col w-64 bg-slate-900 text-white p-5 min-h-screen sticky top-0">

        <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
          <span>🏋</span> Gym CRM
        </h2>

        <nav className="space-y-2">

          {menu.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`block p-3 rounded-lg transition-all ${
                pathname === item.path
                  ? "bg-blue-600 shadow-lg"
                  : "hover:bg-slate-800 text-slate-300 hover:text-white"
              }`}
            >
              <span className="flex items-center gap-3">
                <span>{item.icon}</span>
                <span>{item.name}</span>
              </span>
            </Link>
          ))}

        </nav>
      </div>

      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-slate-900 text-white border-t border-slate-800 z-50">

        <div className="flex justify-around items-center">

          {menu.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex flex-col items-center justify-center py-3 px-2 w-full transition-all ${
                pathname === item.path
                  ? "text-blue-400 border-t-2 border-blue-400 bg-slate-800/50"
                  : "text-slate-400"
              }`}
            >
              <span className="text-xl mb-1">
                {item.icon}
              </span>

              <span className="text-[10px] uppercase font-bold tracking-wider">
                {item.name.split(" ")[0]}
              </span>
            </Link>
          ))}

        </div>
      </div>
    </>
  );
}

export default Sidebar;