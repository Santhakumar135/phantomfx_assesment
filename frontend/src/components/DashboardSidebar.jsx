import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react"; 
import { AuthContext } from "../context/AuthContext"; 
import { LayoutDashboard, FileText, LogOut } from "lucide-react";

const DashboardSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext); 

  const handleLogout = () => {
    logout();
    navigate("/"); 
  };

  return (
    <aside className="w-72 bg-slate-900 rounded-[2.5rem] p-8 flex flex-col shadow-2xl shrink-0">
      <div className="mb-12 px-2 flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
          <FileText size={22} className="text-white" />
        </div>
        <h1 className="text-2xl font-black text-white tracking-tighter">NotesFlow</h1>
      </div>

      <nav className="flex-1 space-y-2">
        {[
          { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
          { name: "My Notes", path: "/notes", icon: FileText },
        ].map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`flex items-center gap-3 p-4 rounded-2xl transition-all font-bold text-sm ${
              location.pathname === link.path
                ? "bg-blue-600 text-white shadow-xl shadow-blue-600/30"
                : "text-slate-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            <link.icon size={20} />
            {link.name}
          </Link>
        ))}
      </nav>

      <button 
        onClick={handleLogout}
        className="flex items-center gap-3 p-4 rounded-2xl text-slate-500 hover:text-red-400 transition-colors font-bold text-sm"
      >
        <LogOut size={20} />
        Logout
      </button>
    </aside>
  );
};

export default DashboardSidebar;