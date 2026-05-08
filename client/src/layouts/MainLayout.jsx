import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";

function MainLayout({ children }) {

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-100">
    
      <Sidebar />

      <div className="flex-1 flex flex-col">
  
        <Navbar /> 
        
        <main className="p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

export default MainLayout;