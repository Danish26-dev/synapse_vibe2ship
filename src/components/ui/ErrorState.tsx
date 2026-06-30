import React from "react";
import { AlertOctagon } from "lucide-react";
import Button from "./Button";

interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
}

export default function ErrorState({
  title = "Component Synapse Offline",
  description = "A sub-assembly module lost focus synchronization during thread communication.",
  onRetry
}: ErrorStateProps) {
  return (
    <div className="rounded-2xl border border-rose-100 bg-rose-50/20 p-8 text-center flex flex-col items-center justify-center space-y-4 max-w-lg mx-auto">
      <div className="p-3 bg-rose-50 rounded-full border border-rose-100 text-rose-500 shadow-xs">
        <AlertOctagon size={20} />
      </div>
      <div className="space-y-1">
        <h4 className="font-display font-medium text-sm text-[#102A43] tracking-tight">
          {title}
        </h4>
        <p className="font-sans text-[11px] text-[#52667A] leading-relaxed">
          {description}
        </p>
      </div>
      {onRetry && (
        <div className="pt-1">
          <Button variant="outline" size="sm" onClick={onRetry}>
            Refresh Module
          </Button>
        </div>
      )}
    </div>
  );
}
