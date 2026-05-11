import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="max-w-4xl">
      <h2 className="text-5xl font-black tracking-tight text-slate-900 mb-4">
        Welcome back, <span className="text-blue-600 capitalize">
          {user?.username || "Admin"}
        </span>.
      </h2>
      <p className="text-lg text-slate-500 font-medium mb-12">
        Your workspace is synchronized across all devices.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-200/60">
           <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-2">Database</p>
           <p className="text-2xl font-black">PostgreSQL <span className="text-green-500 text-xs ml-2 animate-pulse">● Online</span></p>
        </div>
        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-200/60">
           <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-2">Security</p>
           <p className="text-2xl font-black">JWT Enabled</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;