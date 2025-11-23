import { useEffect } from "react";
import { X, Check, AlertTriangle, Info, Zap } from "lucide-react";
import type { Toast } from "../../context/ToastContext";

const TOAST_STYLES = {
  success: {
    bg: "bg-[#23A094]", // Teal
    text: "text-white",
    icon: (
      <Check
        size={24}
        className="border-2 border-black bg-white text-black p-0.5"
      />
    ),
    title: "SUCCESS",
  },
  error: {
    bg: "bg-[#FF90E8]", // Hot Pink
    text: "text-black",
    icon: (
      <X
        size={24}
        className="border-2 border-white bg-black text-white p-0.5"
      />
    ),
    title: "ERROR",
  },
  warning: {
    bg: "bg-[#FFDE00]", // Safety Yellow
    text: "text-black",
    icon: (
      <AlertTriangle
        size={24}
        className="border-2 border-black bg-white text-black p-0.5"
      />
    ),
    title: "WARNING",
  },
  info: {
    bg: "bg-white",
    text: "text-black",
    icon: (
      <Info
        size={24}
        className="border-2 border-black bg-[#FFDE00] text-black p-0.5"
      />
    ),
    title: "INFO",
  },
  brutal: {
    bg: "bg-black",
    text: "text-[#FFDE00]",
    icon: <Zap size={24} fill="#FFDE00" className="animate-pulse" />,
    title: "SYSTEM",
  },
};

// --- Individual Toast Component ---

export const ToastItem = ({
  toast,
  onRemove,
}: {
  toast: Toast;
  onRemove: (id: string) => void;
}) => {
  const style = TOAST_STYLES[toast.type];

  // Auto-dismiss logic
  useEffect(() => {
    const timer = setTimeout(() => {
      onRemove(toast.id);
    }, toast.duration || 4000);

    return () => clearTimeout(timer);
  }, [toast.id, toast.duration, onRemove]);

  return (
    <div
      className={`
        ${style.bg} ${style.text}
        border-2 border-black 
        shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] 
        p-4 min-w-[300px] max-w-md
        flex items-start gap-4
        animate-in slide-in-from-right-full duration-300
        hover:-translate-x-1 hover:-translate-y-1 
        hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] 
        transition-all cursor-pointer
        relative overflow-hidden
      `}
      onClick={() => onRemove(toast.id)}
    >
      {/* Brutal Stripe Decor */}
      {toast.type === "brutal" && (
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,#FFDE00_10px,#FFDE00_20px)]"></div>
      )}

      <div className="shrink-0 mt-1 relative z-10">{style.icon}</div>

      <div className="flex-1 relative z-10">
        <h4 className="font-black text-sm uppercase tracking-wider mb-1 border-b-2 border-current inline-block leading-none pb-1">
          {style.title}
        </h4>
        <p className="font-mono text-sm font-bold leading-tight">
          {toast.message}
        </p>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onRemove(toast.id);
        }}
        className="shrink-0 hover:scale-110 transition-transform relative z-10"
      >
        <X size={16} />
      </button>
    </div>
  );
};
