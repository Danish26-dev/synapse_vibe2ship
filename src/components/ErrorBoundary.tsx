import React, { ErrorInfo, ReactNode } from "react";
import { ShieldAlert } from "lucide-react";

export default class ErrorBoundary extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    (this as any).state = {
      hasError: false,
      error: null,
    };
  }

  public static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("⚠️ Synapse System Uncaught Exception:", error, errorInfo);
  }

  public render() {
    const self = this as any;
    if (self.state.hasError) {
      if (self.props.fallback) {
        return self.props.fallback;
      }

      return (
        <div className="min-h-screen bg-[#F8FBFD] flex flex-col items-center justify-center p-6 text-center">
          <div className="p-4 rounded-full bg-rose-50 border border-rose-100 text-rose-500 mb-6 animate-bounce">
            <ShieldAlert size={28} />
          </div>
          <h2 className="font-display font-medium text-2xl text-[#102A43] tracking-tight mb-2">
            Dynamic Control Handshake Failure
          </h2>
          <p className="font-sans text-xs text-[#52667A] max-w-md leading-relaxed mb-6">
            A sandbox thread threw an unhandled exception. This error has been logged. Please try restarting your session.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-5 py-2.5 rounded-full bg-[#102A43] text-white font-sans font-bold text-[10px] tracking-widest uppercase hover:bg-[#102A43]/95 transition-all shadow-md"
          >
            Reload Shell
          </button>
        </div>
      );
    }

    return self.props.children;
  }
}
