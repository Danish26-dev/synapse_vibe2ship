import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps {
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  className?: string;
}

export default function Dropdown({
  options,
  value,
  onChange,
  label,
  placeholder = "Select an option",
  className = ""
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`flex flex-col space-y-1.5 w-full relative ${className}`} ref={containerRef}>
      {label && (
        <span className="text-[10px] font-mono uppercase tracking-widest text-[#52667A] font-bold">
          {label}
        </span>
      )}
      
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 bg-white border border-[#DCE7EE] rounded-xl text-sm text-[#102A43] focus:outline-hidden focus:border-[#22C97E] transition-all cursor-pointer text-left shadow-xs"
      >
        <span className={selectedOption ? "text-[#102A43]" : "text-[#6B7C93]/50"}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown size={14} className={`text-[#52667A] transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 left-0 right-0 top-[calc(100%+6px)] bg-white border border-[#DCE7EE] rounded-xl shadow-lg max-h-60 overflow-y-auto py-1 focus:outline-hidden"
          >
            {options.map((option) => (
              <li key={option.value}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 text-sm transition-colors cursor-pointer ${
                    option.value === value
                      ? "bg-[#F1F7FA] text-[#22C97E] font-bold"
                      : "text-[#52667A] hover:bg-[#F1F7FA] hover:text-[#102A43]"
                  }`}
                >
                  {option.label}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
