import React from "react";
import toast, { Toaster as HotToaster } from "react-hot-toast";
import { CheckCircle2, ShieldAlert, Info } from "lucide-react";

export const Toaster = HotToaster;

export const showToast = {
  success: (message: string) => {
    toast.custom(
      (t) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } max-w-md w-full bg-white shadow-lg rounded-2xl border border-emerald-100 p-4 flex items-center gap-3`}
        >
          <div className="p-1.5 rounded-full bg-emerald-50 text-emerald-500 shrink-0">
            <CheckCircle2 size={16} />
          </div>
          <div className="flex-1">
            <p className="text-xs font-sans font-bold text-[#102A43] leading-none uppercase tracking-wider mb-0.5">Success</p>
            <p className="text-[11px] font-sans text-[#52667A]">{message}</p>
          </div>
        </div>
      ),
      { duration: 4000 }
    );
  },
  error: (message: string) => {
    toast.custom(
      (t) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } max-w-md w-full bg-white shadow-lg rounded-2xl border border-rose-100 p-4 flex items-center gap-3`}
        >
          <div className="p-1.5 rounded-full bg-rose-50 text-rose-500 shrink-0">
            <ShieldAlert size={16} />
          </div>
          <div className="flex-1">
            <p className="text-xs font-sans font-bold text-rose-600 leading-none uppercase tracking-wider mb-0.5">Error</p>
            <p className="text-[11px] font-sans text-[#52667A]">{message}</p>
          </div>
        </div>
      ),
      { duration: 5000 }
    );
  },
  info: (message: string) => {
    toast.custom(
      (t) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } max-w-md w-full bg-white shadow-lg rounded-2xl border border-blue-100 p-4 flex items-center gap-3`}
        >
          <div className="p-1.5 rounded-full bg-blue-50 text-blue-500 shrink-0">
            <Info size={16} />
          </div>
          <div className="flex-1">
            <p className="text-xs font-sans font-bold text-blue-600 leading-none uppercase tracking-wider mb-0.5">Notification</p>
            <p className="text-[11px] font-sans text-[#52667A]">{message}</p>
          </div>
        </div>
      ),
      { duration: 4000 }
    );
  }
};
