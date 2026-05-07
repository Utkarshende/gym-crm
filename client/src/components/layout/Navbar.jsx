import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
   
    <nav className="bg-white shadow-sm px-4 md:px-8 py-3 flex justify-between items-center sticky top-0 z-50">
      
      <h1 
        onClick={() => navigate("/dashboard")} 
        className="font-bold text-lg md:text-xl cursor-pointer hover:text-blue-600 transition-colors"
      >
        Gym CRM
      </h1>

      <div className="flex gap-2 sm:gap-3">
       
        <button 
          onClick={() => navigate("/add-member")} 
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-4 py-2 rounded text-sm font-medium transition-all"
        >
          <span className="sm:hidden">+</span>
          <span className="hidden sm:inline">+ Add Member</span>
        </button>

        
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