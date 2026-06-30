import React from "react";
import { FolderOpen } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description: string;
  action?: React.ReactNode;
}

export default function EmptyState({
  title,
  description,
  action
}: EmptyStateProps) {
  return (
    <div className="rounded-2xl border border-dashed border-[#DCE7EE] bg-[#F8FBFD] p-10 text-center flex flex-col items-center justify-center space-y-4">
      <div className="p-3.5 bg-white rounded-full border border-[#DCE7EE] text-[#52667A]/60 shadow-xs">
        <FolderOpen size={22} className="stroke-[1.5]" />
      </div>
      <div className="space-y-1 max-w-sm">
        <h3 className="font-display font-medium text-base text-[#102A43] tracking-tight">
          {title}
        </h3>
        <p className="font-sans text-xs text-[#52667A] leading-relaxed">
          {description}
        </p>
      </div>
      {action && (
        <div className="pt-2">
          {action}
        </div>
      )}
    </div>
  );
}
