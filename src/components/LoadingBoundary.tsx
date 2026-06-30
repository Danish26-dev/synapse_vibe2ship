import React, { Suspense } from "react";

interface LoadingBoundaryProps {
  children: React.ReactNode;
}

export default function LoadingBoundary({ children }: LoadingBoundaryProps) {
  return (
    <Suspense fallback={<DefaultLoader />}>
      {children}
    </Suspense>
  );
}

function DefaultLoader() {
  return (
    <div className="w-full h-full min-h-[300px] flex flex-col items-center justify-center p-8 space-y-3">
      <div className="w-6 h-6 rounded-full border-2 border-[#DCE7EE] border-t-[#22C97E] animate-spin" />
      <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#52667A]/70">Resolving Data Stream...</span>
    </div>
  );
}
