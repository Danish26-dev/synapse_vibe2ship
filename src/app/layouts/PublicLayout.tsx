import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-[#F8FBFD] flex flex-col font-sans selection:bg-[#22C97E]/15">
      {/* Dynamic Navigation Bar */}
      <Navbar onLaunchDemo={() => {}} activeSection="home" />

      {/* Main Public Content area */}
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>

      {/* Corporate/Civic Footer */}
      <Footer />
    </div>
  );
}
