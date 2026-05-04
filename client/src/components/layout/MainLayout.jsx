// layouts/MainLayout.jsx

import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";

function MainLayout({ children }) {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1">
        <Navbar />
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

export default MainLayout;