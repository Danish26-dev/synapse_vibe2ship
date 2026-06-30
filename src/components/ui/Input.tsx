import React from "react";

export interface InputProps {
  label?: string;
  error?: string;
  className?: string;
  type?: string;
  id?: string;
  placeholder?: string;
  required?: boolean;
  defaultValue?: string | number;
  [key: string]: any;
}

export default function Input({
  label,
  error,
  className = "",
  type = "text",
  id,
  placeholder,
  required,
  defaultValue,
  ...props
}: InputProps) {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="flex flex-col space-y-1.5 w-full">
      {label && (
        <label 
          htmlFor={inputId}
          className="text-[10px] font-mono uppercase tracking-widest text-[#52667A] font-bold"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        type={type}
        placeholder={placeholder}
        required={required}
        defaultValue={defaultValue}
        className={`w-full px-4 py-3 rounded-xl bg-white border border-[#DCE7EE] text-sm text-[#102A43] placeholder-[#6B7C93]/50 focus:outline-hidden focus:border-[#22C97E] focus:ring-3 focus:ring-[#22C97E]/10 transition-all ${
          error ? "border-rose-400 focus:border-rose-500 focus:ring-rose-500/10" : ""
        } ${className}`}
        {...props}
      />
      {error && (
        <span className="text-[10px] font-mono text-rose-500 font-semibold uppercase tracking-wider">
          {error}
        </span>
      )}
    </div>
  );
}
