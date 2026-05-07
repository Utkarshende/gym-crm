import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    /* 
       Reduced padding on mobile (px-4) vs desktop (px-8).
       Added a sticky top so the user can always access navigation.
    */
    <nav className="bg-white shadow-sm px-4 md:px-8 py-3 flex justify-between items-center sticky top-0 z-50">
      
      {/* Brand Name - Responsive text size */}
      <h1 
        onClick={() => navigate("/dashboard")} 
        className="font-bold text-lg md:text-xl cursor-pointer hover:text-blue-600 transition-colors"
      >
        Gym CRM
      </h1>

      <div className="flex gap-2 sm:gap-3">
        {/* 
           "+ Add" Button: 
           Shows only "+" on very small screens to save space, 
           full text on 'sm' (640px) and up.
        */}
        <button 
          onClick={() => navigate("/add-member")} 
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-4 py-2 rounded text-sm font-medium transition-all"
        >
          <span className="sm:hidden">+</span>
          <span className="hidden sm:inline">+ Add Member</span>
        </button>

        {/* 
           Logout Button:
           Fixed the 'bg-red-50d0' typo to 'bg-red-500'.
        */}
        <button 
          onClick={logout} 
          className="bg-red-500 hover:bg-red-600 text-white px-3 sm:px-4 py-2 rounded text-sm font-medium transition-all"
        >
          Logout
        </button>
      </div>
      
    </nav>
  );
}

export default Navbar;