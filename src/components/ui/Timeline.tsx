import React from "react";
import { Check, Clock, AlertCircle } from "lucide-react";

export interface TimelineItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  status: "completed" | "current" | "upcoming";
}

interface TimelineProps {
  items: TimelineItem[];
}

export default function Timeline({ items }: TimelineProps) {
  return (
    <div className="flow-root">
      <ul className="-mb-8">
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          
          const iconConfig = {
            completed: {
              bg: "bg-emerald-50 border-emerald-200 text-emerald-600",
              icon: <Check size={12} className="stroke-[3]" />
            },
            current: {
              bg: "bg-blue-50 border-blue-200 text-blue-600 animate-pulse",
              icon: <Clock size={12} className="stroke-[2.5]" />
            },
            upcoming: {
              bg: "bg-slate-50 border-slate-100 text-slate-400",
              icon: <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
            }
          };

          const currentIcon = iconConfig[item.status];

          return (
            <li key={item.id} className="relative pb-8">
              {!isLast && (
                <span 
                  className="absolute left-[13px] top-[14px] -ml-px h-full w-[1.5px] bg-[#DCE7EE]" 
                  aria-hidden="true" 
                />
              )}
              <div className="relative flex items-start space-x-4">
                <div className={`relative flex items-center justify-center w-7 h-7 rounded-full border-2 ${currentIcon.bg} shrink-0 z-10 shadow-xs`}>
                  {currentIcon.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-sans font-bold text-[#102A43] tracking-tight">
                    {item.title}
                  </div>
                  <div className="text-[11px] font-mono text-[#52667A]/60 uppercase tracking-widest mt-0.5">
                    {item.timestamp}
                  </div>
                  <div className="mt-1.5 text-xs font-sans text-[#52667A] leading-relaxed">
                    {item.description}
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
