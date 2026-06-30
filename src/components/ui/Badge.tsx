import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "primary" | "success" | "warning" | "danger" | "neutral" | "info";
  className?: string;
}

export default function Badge({
  children,
  variant = "neutral",
  className = ""
}: BadgeProps) {
  const baseStyles = "inline-flex items-center px-2.5 py-0.5 rounded-full text-[9px] font-mono uppercase tracking-wider font-bold border shadow-xs";
  
  const variants = {
    primary: "bg-[#F1F7FA] border-[#DCE7EE] text-[#2563EB]",
    success: "bg-emerald-50 border-emerald-100 text-emerald-600",
    warning: "bg-amber-50 border-amber-100 text-amber-600",
    danger: "bg-rose-50 border-rose-100 text-rose-600",
    info: "bg-blue-50 border-blue-100 text-blue-600",
    neutral: "bg-slate-50 border-slate-100 text-slate-500"
  };

  return (
    <span className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
