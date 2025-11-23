import React, { memo, useState, useEffect } from "react";
import { X, Chrome } from "lucide-react";
import { NeoButton } from "../ui/NeoButton";
import { NeoCard } from "../ui/NeoCard";
import { AppwriteException, OAuthProvider } from "appwrite";
import { account } from "../../lib/appwrite";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal = memo(({ isOpen, onClose }: AuthModalProps) => {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [loading, setLoading] = useState(false);
  const { login, signup } = useAuth();
  const toast = useToast();

  // Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (isOpen) {
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleGoogleLogin = async () => {
    try {
      account.createOAuth2Session({
        provider: OAuthProvider.Google,
        success: window.location.href, // success
        failure: `${window.location.origin}/error`, // failure
      });
    } catch (e) {
      console.error("Google login error:", e);
      toast.addToast("Google login failed. Please try again.", "error");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (mode === "signup") {
      if (password !== confirmPassword) {
        toast.addToast("Passwords do not match.", "error");
        return;
      }
      if (password.length < 8) {
        toast.addToast("Password must be at least 8 characters.", "error");
        return;
      }
    }

    setLoading(true);

    try {
      if (mode === "signup") {
        await signup(name, email, password);
        toast.addToast("Signup successful! Welcome aboard.", "success");
      } else {
        await login(email, password);
        toast.addToast("Login successful! Welcome back.", "success");
      }
      onClose();
    } catch (err) {
      if (err instanceof AppwriteException) {
        toast.addToast(err.message, "error");
      } else {
        toast.addToast(
          "An unexpected error occurred. Please try again.",
          "error"
        );
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="fixed inset-0 bg-black/80 z-100 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md relative animate-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute -right-2 -top-2 bg-secondary border-2 border-main p-1 hover:scale-110 transition-transform z-10 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
        >
          <X size={24} />
        </button>

        <NeoCard className="bg-white">
          <h2 className="text-3xl font-black mb-6 text-center uppercase tracking-tighter">
            {mode === "login" ? "Access Terminal" : "Join The Cult"}
          </h2>

          <div className="flex border-2 border-main mb-6">
            <button
              onClick={() => {
                setMode("login");
              }}
              className={`flex-1 py-3 font-bold text-center transition-colors ${
                mode === "login" ? "bg-primary" : "hover:bg-gray-100"
              }`}
            >
              LOGIN
            </button>
            <div className="w-0.5 bg-main"></div>
            <button
              onClick={() => {
                setMode("signup");
              }}
              className={`flex-1 py-3 font-bold text-center transition-colors ${
                mode === "signup" ? "bg-primary" : "hover:bg-gray-100"
              }`}
            >
              SIGN UP
            </button>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {mode === "signup" && (
              <div className="flex flex-col gap-1">
                <label className="font-bold text-sm">CODENAME (NAME)</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border-2 border-main p-3 font-mono focus:bg-primary focus:outline-none transition-colors"
                  placeholder="Neo"
                  autoComplete="name"
                />
              </div>
            )}

            <div className="flex flex-col gap-1">
              <label className="font-bold text-sm">DIGITAL ID (EMAIL)</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-2 border-main p-3 font-mono focus:bg-primary focus:outline-none transition-colors"
                placeholder="neo@matrix.com"
                autoComplete="email"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-bold text-sm">PASSPHRASE</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-2 border-main p-3 font-mono focus:bg-primary focus:outline-none transition-colors"
                placeholder="••••••••"
                autoComplete="current-password"
              />{" "}
            </div>

            {mode === "signup" && (
              <div className="flex flex-col gap-1">
                <label className="font-bold text-sm">CONFIRM PASSPHRASE</label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="border-2 border-main p-3 font-mono focus:bg-primary focus:outline-none transition-colors"
                  placeholder="••••••••"
                  autoComplete="new-password"
                />
              </div>
            )}

            <NeoButton type="submit" disabled={loading} className="mt-2 w-full">
              {loading
                ? "AUTHENTICATING..."
                : mode === "login"
                ? "ENTER SYSTEM"
                : "INITIATE ACCOUNT"}
            </NeoButton>

            <div className="flex items-center gap-4 my-2">
              <div className="h-0.5 bg-black flex-1"></div>
              <span className="font-mono text-sm font-bold">OR</span>
              <div className="h-0.5 bg-black flex-1"></div>
            </div>

            <NeoButton
              type="button"
              variant="google"
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-3"
            >
              <Chrome size={20} /> CONTINUE WITH GOOGLE
            </NeoButton>
          </form>
        </NeoCard>
      </div>
    </div>
  );
});
