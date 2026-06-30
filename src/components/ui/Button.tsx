import React from "react";
import { motion } from "motion/react";

export interface ButtonProps {
  children?: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  className?: string;
  disabled?: boolean;
  onClick?: (e: any) => void | Promise<void>;
  type?: "button" | "submit" | "reset";
  [key: string]: any;
}

export default function Button({
  children,
  className = "",
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  onClick,
  type = "button",
  ...props
}: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center font-sans font-bold uppercase tracking-wider transition-all duration-200 rounded-full cursor-pointer select-none border";
  
  const variants = {
    primary: "bg-[#102A43] hover:bg-[#102A43]/90 text-white border-transparent shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0",
    secondary: "bg-[#22C97E] hover:bg-[#22C97E]/90 text-white border-transparent shadow-sm active:scale-95",
    outline: "bg-white hover:bg-[#F1F7FA] text-[#52667A] hover:text-[#102A43] border-[#DCE7EE] shadow-xs",
    ghost: "bg-transparent hover:bg-[#F1F7FA] text-[#52667A] hover:text-[#102A43] border-transparent",
    danger: "bg-rose-500 hover:bg-rose-600 text-white border-transparent shadow-sm"
  };

  const sizes = {
    sm: "px-4 py-2 text-[9px] gap-1.5",
    md: "px-6 py-3 text-[10px] gap-2",
    lg: "px-8 py-4 text-xs gap-2.5"
  };

  return (
    <motion.button
      whileTap={disabled || loading ? {} : { scale: 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${disabled || loading ? "opacity-50 cursor-not-allowed pointer-events-none" : ""} ${className}`}
      disabled={disabled || loading}
      onClick={onClick}
      type={type}
      {...props}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-3.5 w-3.5 text-current" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}
      {children}
    </motion.button>
  );
}
