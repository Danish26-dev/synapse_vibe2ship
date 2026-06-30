import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: Array<"citizen" | "authority" | "admin">;
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { user, profile, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F1F7FA] flex flex-col items-center justify-center space-y-4">
        {/* Simple elegant modern loading ring */}
        <div className="w-8 h-8 rounded-full border-2 border-[#DCE7EE] border-t-[#22C97E] animate-spin" />
        <span className="font-mono text-[10px] uppercase tracking-widest text-[#52667A]">Authenticating Secure Ledger...</span>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check role restriction if provided
  if (allowedRoles && profile && !allowedRoles.includes(profile.role)) {
    // If not allowed, redirect to default authenticated path
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}
