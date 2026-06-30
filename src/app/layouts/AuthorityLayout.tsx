import React from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Logo from "../../components/Logo";
import { ShieldCheck, BarChart3, Settings2, LogOut, FileSpreadsheet, UserCircle } from "lucide-react";

export default function AuthorityLayout() {
  const { profile, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const navItems = [
    { label: "Dispatch Hub", path: "/authority/cases", icon: <ShieldCheck size={16} /> },
    { label: "Analytics Desk", path: "/authority/analytics", icon: <BarChart3 size={16} /> },
    { label: "Ward Settings", path: "/authority/settings", icon: <Settings2 size={16} /> },
  ];

  return (
    <div className="min-h-screen bg-[#F1F7FA] flex font-sans selection:bg-[#2563EB]/10">
      {/* Sidebar Navigation */}
      <aside className="w-64 border-r border-[#DCE7EE] bg-[#102A43] text-white hidden md:flex flex-col shrink-0">
        {/* Sidebar Header with Logo */}
        <div className="p-6 border-b border-white/10 flex items-center gap-3">
          <Logo size={32} animate={false} />
          <div className="flex flex-col">
            <span className="font-display font-bold text-sm tracking-tight leading-none text-white">Synapse OS</span>
            <span className="text-[8px] font-mono uppercase tracking-widest text-[#22C97E] mt-1 font-bold">Government Ledger</span>
          </div>
        </div>

        {/* Navigation links */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all duration-150 ${
                  isActive
                    ? "bg-[#22C97E] text-white shadow-md shadow-[#22C97E]/10"
                    : "text-slate-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer with Authority Profile & Logout */}
        <div className="p-4 border-t border-white/10 space-y-3">
          <div className="flex items-center gap-3 px-3">
            <div className="text-slate-300 shrink-0">
              <UserCircle size={28} className="stroke-[1.5]" />
            </div>
            <div className="min-w-0">
              <p className="font-sans font-bold text-xs text-white truncate leading-none">
                {profile?.displayName || "Operations Lead"}
              </p>
              <p className="font-mono text-[8px] uppercase text-[#22C97E] mt-0.5 tracking-wider font-bold truncate">
                Ward: {profile?.ward || "SEC_LEADER"}
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[10px] font-bold uppercase tracking-wider text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition-colors cursor-pointer"
          >
            <LogOut size={16} />
            Exit System
          </button>
        </div>
      </aside>

      {/* Main Workspace Container */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile top navigation header */}
        <header className="h-16 border-b border-[#DCE7EE] bg-[#102A43] flex md:hidden items-center justify-between px-6 shrink-0 text-white">
          <div className="flex items-center gap-2">
            <Logo size={24} animate={false} />
            <span className="font-display font-bold text-xs tracking-tight uppercase">Synapse OS</span>
          </div>

          <button
            onClick={handleLogout}
            className="p-1.5 rounded-full hover:bg-rose-500/15 text-rose-400 transition-colors cursor-pointer"
          >
            <LogOut size={16} />
          </button>
        </header>

        {/* Content Canvas */}
        <main className="flex-1 overflow-y-auto p-6 md:p-10 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
