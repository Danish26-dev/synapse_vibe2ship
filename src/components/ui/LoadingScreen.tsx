import React from "react";
import Logo from "../Logo";

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 bg-[#F8FBFD] flex flex-col items-center justify-center p-6 text-center">
      <div className="relative mb-6">
        {/* Soft rotating outer loading glow */}
        <div className="absolute -inset-4 w-[100px] h-[100px] rounded-full border border-dashed border-[#22C97E]/30 animate-spin" />
        <Logo size={64} animate={true} />
      </div>
      <div className="space-y-1.5">
        <h3 className="font-display font-medium text-lg text-[#102A43] tracking-tight">
          Synapse Core Loading
        </h3>
        <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#52667A]/60 font-bold">
          Validating distributed civic ledger
        </p>
      </div>
    </div>
  );
}
