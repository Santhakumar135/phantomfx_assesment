import DashboardSidebar from "./DashboardSidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="min-h-screen bg-[#f0f2f5] flex p-4 font-sans text-slate-900">
      <DashboardSidebar />
      <main className="flex-1 px-12 py-8 overflow-y-auto">
        <Outlet /> 
      </main>
    </div>
  );
};

export default Layout;