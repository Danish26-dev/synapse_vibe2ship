import React from "react";

interface PageHeaderProps {
  title: string;
  description?: string;
  badge?: string;
  actions?: React.ReactNode;
}

export default function PageHeader({
  title,
  description,
  badge,
  actions
}: PageHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#DCE7EE] pb-8 mb-10">
      <div className="space-y-3 max-w-2xl">
        {badge && (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-[#DCE7EE] bg-white text-[8px] font-mono uppercase tracking-widest text-[#2563EB] font-bold shadow-xs">
            {badge}
          </span>
        )}
        <h1 className="font-display font-medium text-3xl md:text-4xl text-[#102A43] tracking-tight leading-[1.1]">
          {title}
        </h1>
        {description && (
          <p className="font-sans text-xs text-[#52667A] leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {actions && (
        <div className="flex flex-wrap gap-3 shrink-0">
          {actions}
        </div>
      )}
    </div>
  );
}
