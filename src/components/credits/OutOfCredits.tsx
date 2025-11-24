import { AlertTriangle, Calendar, Zap } from "lucide-react";

interface OutOfCreditsProps {
  onUpgrade: () => void;
}

export const OutOfCredits = ({ onUpgrade }: OutOfCreditsProps) => {
  return (
    <div className="w-full bg-[#F0F0F0] border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 text-center relative overflow-hidden animate-in zoom-in-95 duration-300">
      {/* Background Warning Stripes */}
      <div className="absolute top-0 left-0 w-full h-4 bg-[repeating-linear-gradient(45deg,#FFDE00,#FFDE00_10px,#000_10px,#000_20px)]"></div>
      <div className="absolute bottom-0 left-0 w-full h-4 bg-[repeating-linear-gradient(45deg,#FFDE00,#FFDE00_10px,#000_10px,#000_20px)]"></div>

      <div className="max-w-md mx-auto relative z-10 py-6">
        <div className="inline-block bg-[#FF90E8] border-2 border-black p-4 rounded-full mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] animate-bounce">
          <AlertTriangle size={48} className="text-black" />
        </div>

        <h2 className="text-4xl md:text-5xl font-black uppercase mb-4 tracking-tighter leading-none">
          System Halted
        </h2>

        <div className="bg-black text-[#FFDE00] inline-block px-4 py-1 font-mono font-bold text-lg mb-6 border-2 border-transparent transform -rotate-2">
          CREDITS_REMAINING: 0
        </div>

        <p className="font-mono text-lg mb-8 font-bold border-l-4 border-black pl-4 text-left md:text-center md:border-none">
          You've incinerated your free allowance. The generator is cooling down
          until the cycle resets.
        </p>

        <div className="bg-white border-2 border-black p-4 mb-8 text-left shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]">
          <div className="flex items-center gap-3 mb-2 font-bold">
            <Calendar size={20} className="text-[#23A094]" />
            <span>RESETS AUTOMATICALLY:</span>
          </div>
          <p className="font-mono text-sm text-gray-600">
            Your 5 free credits will replenish at the{" "}
            <span className="bg-[#FFDE00] px-1 text-black font-bold border border-black">
              end of the current month
            </span>
            .
          </p>
        </div>

        <button
          onClick={onUpgrade}
          className="w-full bg-[#23A094] text-white border-2 border-black px-6 py-4 font-black text-xl flex items-center justify-center gap-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
        >
          <Zap size={24} className="fill-white" />
          UPGRADE TO PRO
        </button>

        <p className="mt-4 text-xs font-mono text-gray-500 uppercase">
          Or wait. Patience is a virtue. (Boring, but true).
        </p>
      </div>
    </div>
  );
};
