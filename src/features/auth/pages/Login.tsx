import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import Logo from "../../../components/Logo";
import Button from "../../../components/ui/Button";
import { showToast } from "../../../components/ui/Toast";
import { LogIn } from "lucide-react";

export default function Login() {
  const { loginWithGoogle, user, profile, loginAsDemo, logout } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      await loginWithGoogle();
      showToast.success("Dynamic control session initiated.");
      navigate("/dashboard");
    } catch (err) {
      showToast.error("Failed to authenticate session.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 bg-[#F8FBFD]">
      <div className="w-full max-w-md p-8 md:p-10 rounded-[28px] bg-white border border-[#E6EEF3] shadow-[0_20px_50px_rgba(16,42,67,0.03)] flex flex-col items-center text-center">
        <Logo size={48} animate={true} className="mb-6" />
        
        <h2 className="font-display font-medium text-2xl text-[#102A43] tracking-tight leading-none mb-2">
          Access Synapse OS
        </h2>
        <p className="font-sans text-xs text-[#52667A] max-w-xs leading-relaxed mb-8">
          Provide sovereign authority credentials or authenticate your civic identity ledger.
        </p>

        {user ? (
          <div className="space-y-4 w-full">
            <p className="text-xs font-mono text-emerald-600 font-bold uppercase tracking-widest">
              ● Connection Authorized
            </p>
            <div className="text-sm font-sans text-slate-600">
              Logged in as <strong className="text-[#102A43]">{profile?.displayName || "Demo User"}</strong> ({profile?.role})
            </div>
            <Button className="w-full" onClick={() => navigate(profile?.role === "authority" ? "/authority/cases" : "/dashboard")}>
              Enter {profile?.role === "authority" ? "Authority OS" : "Resident Portal"}
            </Button>
            <button 
              onClick={() => {
                logout();
              }}
              className="text-[10px] font-mono uppercase tracking-wider text-rose-500 hover:underline mt-2 cursor-pointer"
            >
              Sign out / Change Account
            </button>
          </div>
        ) : (
          <div className="space-y-4 w-full">
            <Button
              className="w-full"
              variant="primary"
              loading={loading}
              onClick={handleLogin}
            >
              <LogIn size={14} className="stroke-[2.5]" />
              Authenticate with Google
            </Button>

            <div className="relative py-4 flex items-center justify-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#E6EEF3]"></div>
              </div>
              <span className="relative px-3 bg-white text-[10px] font-mono text-[#52667A] uppercase tracking-widest">
                OR TEST DEMO IN SECURE SHIELD
              </span>
            </div>

            <div className="grid grid-cols-1 gap-3">
              <button
                type="button"
                onClick={async () => {
                  setLoading(true);
                  try {
                    await loginAsDemo("citizen");
                    showToast.success("Citizen Ledger Session Handshake Successful!");
                    navigate("/dashboard");
                  } catch (e) {
                    showToast.error("Handshake failure.");
                  } finally {
                    setLoading(false);
                  }
                }}
                className="w-full px-5 py-3.5 rounded-xl border border-emerald-200 bg-emerald-50/20 hover:bg-emerald-50 text-emerald-800 hover:text-emerald-900 transition-all font-sans font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-98"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Demo Citizen Access
              </button>

              <button
                type="button"
                onClick={async () => {
                  setLoading(true);
                  try {
                    await loginAsDemo("authority");
                    showToast.success("Authority Ledger Session Handshake Successful!");
                    navigate("/authority/cases");
                  } catch (e) {
                    showToast.error("Handshake failure.");
                  } finally {
                    setLoading(false);
                  }
                }}
                className="w-full px-5 py-3.5 rounded-xl border border-blue-200 bg-blue-50/20 hover:bg-blue-50 text-blue-800 hover:text-blue-900 transition-all font-sans font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-98"
              >
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                Demo Authority Access
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
