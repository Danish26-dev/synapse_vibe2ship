import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import Logo from "../../../components/Logo";
import Button from "../../../components/ui/Button";
import { showToast } from "../../../components/ui/Toast";
import { LogIn } from "lucide-react";

export default function Login() {
  const { loginWithGoogle, user } = useAuth();
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
            <Button className="w-full" onClick={() => navigate("/dashboard")}>
              Enter System Shell
            </Button>
          </div>
        ) : (
          <Button
            className="w-full"
            variant="primary"
            loading={loading}
            onClick={handleLogin}
          >
            <LogIn size={14} className="stroke-[2.5]" />
            Authenticate with Google
          </Button>
        )}
      </div>
    </div>
  );
}
