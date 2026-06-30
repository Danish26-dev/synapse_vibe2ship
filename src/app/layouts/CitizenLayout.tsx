import React from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Logo from "../../components/Logo";
import { LayoutDashboard, FilePlus2, ListChecks, LogOut, UserCircle } from "lucide-react";

export default function CitizenLayout() {
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
    { label: "Overview", path: "/dashboard", icon: <LayoutDashboard size={16} /> },
    { label: "File Report", path: "/report", icon: <FilePlus2 size={16} /> },
    { label: "My Cases", path: "/cases", icon: <ListChecks size={16} /> },
  ];

  return (
    <div className="min-h-screen bg-[#F8FBFD] flex font-sans selection:bg-[#22C97E]/10">
      {/* Sidebar navigation */}
      <aside className="w-64 border-r border-[#E6EEF3] bg-white hidden md:flex flex-col shrink-0">
        {/* Sidebar Header with Logo */}
        <div className="p-6 border-b border-[#F1F7FA] flex items-center gap-3">
          <Logo size={32} animate={false} />
          <div className="flex flex-col">
            <span className="font-display font-bold text-sm text-[#102A43] tracking-tight leading-none">Synapse</span>
            <span className="text-[9px] font-mono uppercase tracking-wider text-[#22C97E] mt-1 font-bold">Resident Portal</span>
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
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-150 ${
                  isActive
                    ? "bg-[#F1F7FA] text-[#22C97E]"
                    : "text-[#52667A] hover:bg-[#F8FBFD] hover:text-[#102A43]"
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer with Profile & Logout */}
        <div className="p-4 border-t border-[#F1F7FA] space-y-3">
          <div className="flex items-center gap-3 px-3">
            <div className="text-[#102A43] shrink-0">
              <UserCircle size={28} className="stroke-[1.5]" />
            </div>
            <div className="min-w-0">
              <p className="font-sans font-bold text-xs text-[#102A43] truncate leading-none">
                {profile?.displayName || "Resident User"}
              </p>
              <p className="font-mono text-[9px] uppercase text-[#6B7C93] mt-0.5 tracking-wider truncate">
                Role: {profile?.role}
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-rose-500 hover:bg-rose-50/50 transition-colors cursor-pointer"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main workspace container */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile top navigation header */}
        <header className="h-16 border-b border-[#E6EEF3] bg-white flex md:hidden items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-2">
            <Logo size={24} animate={false} />
            <span className="font-display font-bold text-xs text-[#102A43] tracking-tight uppercase">Synapse</span>
          </div>

          <button
            onClick={handleLogout}
            className="p-1.5 rounded-full hover:bg-rose-50 text-rose-500 transition-colors cursor-pointer"
          >
            <LogOut size={16} />
          </button>
        </header>

        {/* Content canvas */}
        <main className="flex-1 overflow-y-auto p-6 md:p-10 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
