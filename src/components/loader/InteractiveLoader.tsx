import React, { useState, useEffect, useCallback, useRef } from "react";
import { Bug, Terminal, X, Trophy } from "lucide-react";

const LOADING_MESSAGES = [
  "INITIALIZING_SWAG_ENGINE...",
  "DE-PIXELATING_THE_BANANA...",
  "BULLYING_THE_ALGORITHM...",
  "GENERATING_CLOUT_TOKENS...",
  "FIXING_YOUR_TERRIBLE_SEO...",
  "ASKING_GEMINI_NICELY...",
  "COMPILING_BRUTALIST_CSS...",
  "INJECTING_META_TAGS...",
  "OPTIMIZING_FOR_DOOMSCROLLING...",
  "REROLLING_RNG_SEEDS...",
  "CONVERTING_COFFEE_TO_CODE...",
];

interface InteractiveLoaderProps {
  isLoading: boolean;
  isVisible?: boolean;
  showResultsReady?: boolean;
  onShowResults?: () => void;
  onCancel?: () => void;
}

export const InteractiveLoader = ({
  isLoading,
  isVisible = isLoading,
  showResultsReady = false,
  onShowResults,
  onCancel,
}: InteractiveLoaderProps) => {
  // --- Message Logic ---
  const [msgIndex, setMsgIndex] = useState(0);
  const [cpuUsage, setCpuUsage] = useState(42); // Stable initial state

  useEffect(() => {
    if (!isLoading) return;
    const interval = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
      // Update CPU usage periodically instead of on every render
      setCpuUsage(Math.floor(Math.random() * 30 + 40));
    }, 2500);
    return () => clearInterval(interval);
  }, [isLoading]);

  // --- Game Logic (Bug Smasher) ---
  const [score, setScore] = useState(0);
  const [bugPos, setBugPos] = useState({ top: "50%", left: "50%" });
  const [lastSmashed, setLastSmashed] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const moveBug = useCallback(() => {
    if (!containerRef.current) return;
    // Keep within 10% - 90% to avoid edges
    const top = Math.floor(Math.random() * 80 + 10) + "%";
    const left = Math.floor(Math.random() * 80 + 10) + "%";
    setBugPos({ top, left });
  }, []);

  const handleSmash = (e: React.MouseEvent) => {
    e.stopPropagation();
    setScore((s) => s + 1);

    // Visual feedback position
    const containerRect = containerRef.current?.getBoundingClientRect();

    if (containerRect) {
      setLastSmashed({
        x: e.clientX - containerRect.left,
        y: e.clientY - containerRect.top,
      });
    }

    // Move instantly
    moveBug();
  };

  // Auto-move bug occasionally if player is slow
  useEffect(() => {
    if (!isLoading) return;
    const interval = setInterval(moveBug, 2000);
    return () => clearInterval(interval);
  }, [isLoading, moveBug]);

  const canShowResultsCta =
    showResultsReady && !isLoading && typeof onShowResults === "function";

  if (!isVisible) return null;

  return (
    <div className="w-full flex items-center justify-center p-4 animate-in fade-in duration-300 my-8">
      <div className="w-full max-w-2xl bg-[#F0F0F0] border-4 border-black shadow-[16px_16px_0px_0px_rgba(255,222,0,1)] relative overflow-hidden flex flex-col">
        {/* Header Bar */}
        <div className="bg-[#FFDE00] border-b-4 border-black p-3 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-2 font-black font-mono text-lg">
            <Terminal size={24} />
            <span>SYSTEM_PROCESSING...</span>
          </div>
          {onCancel && (
            <button
              onClick={onCancel}
              className="hover:bg-black hover:text-white p-1 border-2 border-transparent hover:border-white transition-colors"
            >
              <X size={24} />
            </button>
          )}
        </div>

        {/* Loading Bar & Message */}
        <div className="bg-black text-[#23A094] p-4 border-b-4 border-black font-mono text-sm md:text-base shrink-0">
          <div className="mb-2 flex justify-between">
            <span className="animate-pulse">
              _
              {isLoading
                ? ` ${LOADING_MESSAGES[msgIndex]}`
                : " PROCESS_COMPLETE"}
            </span>
            <span>
              {score > 0
                ? `BUGS_SMASHED: ${score}`
                : isLoading
                ? "WAITING..."
                : "DONE"}
            </span>
          </div>
          {/* Progress Bar Animation */}
          <div className="h-4 w-full border-2 border-[#23A094] p-0.5 relative overflow-hidden">
            <div
              className={`h-full bg-[#23A094] origin-left ${
                isLoading
                  ? "animate-[loading_3s_ease-in-out_infinite] w-full"
                  : "w-full"
              }`}
            ></div>
          </div>
        </div>

        {/* Game Area */}
        <div
          ref={containerRef}
          className="relative bg-[url('https://www.transparenttextures.com/patterns/graphy.png')] bg-white flex-1 min-h-[300px] cursor-crosshair overflow-hidden group"
          onClick={() => {
            /* Missed click logic could go here */
          }}
        >
          {!canShowResultsCta && (
            <>
              {/* Instructions Overlay (Fades out on first interaction) */}
              {score === 0 && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-50">
                  <h3 className="font-black text-4xl text-gray-300 uppercase text-center">
                    Smash the Bugs
                    <br />
                    While You Wait
                  </h3>
                </div>
              )}

              {/* The Bug */}
              <button
                onClick={handleSmash}
                style={{ top: bugPos.top, left: bugPos.left }}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-75 active:scale-90 hover:scale-110 group-hover:animate-bounce"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-[#FF90E8] blur-sm animate-pulse rounded-full"></div>
                  <div className="bg-black text-white p-3 border-2 border-[#FF90E8] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-sm relative z-10">
                    <Bug size={32} />
                  </div>
                </div>
              </button>

              {/* Score Popup Effect */}
              {lastSmashed && (
                <div
                  key={score} // Re-render on score change
                  style={{ top: lastSmashed.y, left: lastSmashed.x }}
                  className="absolute pointer-events-none text-[#23A094] font-black text-2xl animate-[ping_0.5s_ease-out_forwards]"
                >
                  +1
                </div>
              )}
            </>
          )}

          {canShowResultsCta && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 bg-white/90 text-center px-6">
              <p className="text-3xl md:text-4xl font-black uppercase tracking-tight">
                Transmission Complete.
              </p>
              <button
                onClick={onShowResults}
                className="bg-[#FFDE00] border-4 border-black text-black font-black text-xl uppercase px-10 py-4 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:-translate-x-1 transition-transform"
              >
                Show Results
              </button>
            </div>
          )}

          {/* Floating Bits */}
          <div className="absolute bottom-4 left-4 text-xs font-mono opacity-40 pointer-events-none">
            CPU_USAGE: {cpuUsage}%<br />
            MEMORY: LEAKING
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#F0F0F0] p-2 text-center border-t-4 border-black font-bold text-xs uppercase tracking-widest flex justify-center items-center gap-2">
          {score > 5 ? (
            <span className="text-[#FF90E8] flex items-center gap-1">
              <Trophy size={14} /> High Score Logic Not Found
            </span>
          ) : (
            <span>DO NOT TURN OFF YOUR CONSOLE</span>
          )}
        </div>
      </div>

      <style>{`
        @keyframes loading {
          0% { transform: scaleX(0); }
          50% { transform: scaleX(0.7); }
          100% { transform: scaleX(1); }
        }
      `}</style>
    </div>
  );
};
