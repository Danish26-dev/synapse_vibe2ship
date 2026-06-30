import React from "react";

export interface CardProps {
  children?: React.ReactNode;
  hoverable?: boolean;
  className?: string;
  [key: string]: any;
}

export default function Card({
  children,
  hoverable = false,
  className = "",
  ...props
}: CardProps) {
  return (
    <div
      className={`p-6 rounded-[24px] bg-white border border-[#E6EEF3] shadow-[0_12px_40px_rgba(16,42,67,0.03)] transition-all duration-300 ${
        hoverable ? "hover:shadow-[0_20px_50px_rgba(16,42,67,0.06)] hover:-translate-y-0.5 hover:border-[#22C97E]/30" : ""
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
