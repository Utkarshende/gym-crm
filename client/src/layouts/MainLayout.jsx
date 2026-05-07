import { useState } from "react";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";

function MainLayout({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-100">

      <div
        className={`
          fixed z-40 inset-y-0 left-0 w-64 bg-white shadow
          transform ${open ? "translate-x-0" : "-translate-x-full"}
          transition-transform duration-300
          md:static md:translate-x-0
        `}
      >
        <Sidebar close={() => setOpen(false)} />
      </div>

      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <div className="flex-1 flex flex-col">
        <Navbar toggleSidebar={() => setOpen(!open)} />
        <div className="p-4 md:p-6">{children}</div>
      </div>
    </div>
  );
}

export default MainLayout;