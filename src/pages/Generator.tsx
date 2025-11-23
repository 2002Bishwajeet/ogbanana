import { useState, useCallback, memo } from "react";
import { Helmet } from "react-helmet-async";
import { Sparkles, Flame, ImageIcon, Copy } from "lucide-react";
import { NeoButton } from "../components/ui/NeoButton";
import { NeoCard } from "../components/ui/NeoCard";

import { generateOgpTags, roastMyVibe } from "../lib/api"; // Updated import
import { useAuth } from "../context/AuthContext";

// --- Interfaces ---
interface OGData {
  title: string;
  description: string;
  image: string;
  url: string;
}

export const Generator = memo(() => {
  const { user } = useAuth();
  // Generator State
  const [urlInput, setUrlInput] = useState("");
  const [contextInput, setContextInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [generatedResult, setGeneratedResult] = useState<OGData | null>(null);
  const [roast, setRoast] = useState<string | null>(null);

  // --- Gemini Logic ---

  const handleGenerateAI = useCallback(async () => {
    if ((!urlInput && !contextInput) || !user) return;
    setIsProcessing(true);
    setGeneratedResult(null);
    setRoast(null);

    try {
      const data = await generateOgpTags(urlInput, contextInput);

      setGeneratedResult({
        title: data.title,
        description: data.description,
        image: data.image,
        url: urlInput || "https://example.com",
      });

      // Update user credits logic would go here if implemented in AuthContext or similar
      // if (user) setUser(prev => prev ? ({ ...prev, credits: prev.credits - 1 }) : null);
    } catch (e: any) {
      console.error("AI Generation failed", e);
      setGeneratedResult({
        title: "AI Generation Failed",
        description:
          e.message || "We couldn't reach the Nano Banana brain. Try again.",
        image: "https://via.placeholder.com/1200x630/000000/FFFFFF?text=ERROR",
        url: urlInput,
      });
    } finally {
      setIsProcessing(false);
    }
  }, [urlInput, contextInput, user]);

  const handleRoast = useCallback(async () => {
    if (!contextInput) return;
    setIsProcessing(true);
    setRoast(null);

    try {
      const text = await roastMyVibe(contextInput);
      setRoast(text);
      // Update user credits logic would go here if implemented in AuthContext or similar
      // if (user) setUser(prev => prev ? ({ ...prev, credits: prev.credits - 1 }) : null);
    } catch (e: any) {
      setRoast(e.message || "I'm too tired to roast you right now. Try again.");
    } finally {
      setIsProcessing(false);
    }
  }, [contextInput]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 animate-in slide-in-from-bottom-4 duration-500">
      {generatedResult && (
        <Helmet>
          <title>{generatedResult.title}</title>
          <meta name="description" content={generatedResult.description} />
          <meta property="og:title" content={generatedResult.title} />
          <meta
            property="og:description"
            content={generatedResult.description}
          />
          <meta property="og:image" content={generatedResult.image} />
          <meta property="og:url" content={generatedResult.url} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={generatedResult.title} />
          <meta
            name="twitter:description"
            content={generatedResult.description}
          />
          <meta name="twitter:image" content={generatedResult.image} />
        </Helmet>
      )}
      <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4 border-b-4 border-black pb-4">
        <div>
          <h2 className="text-5xl font-black mb-2 tracking-tight">GENERATOR</h2>
          <p className="font-mono bg-primary inline-block px-2 border border-main font-bold text-sm">
            MODEL: GEMINI-2.5-FLASH
          </p>
        </div>
        <div className="text-right font-mono text-sm leading-loose">
          REMAINING CREDITS:{" "}
          <span className="bg-black text-white px-1">{user?.credits || 0}</span>
          <br />
          API STATUS:{" "}
          <span className="text-accent font-black bg-accent/10 px-1">
            CONNECTED
          </span>
        </div>
      </div>

      <NeoCard className="mb-12 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
        <div className="flex flex-col gap-8">
          {/* URL Input */}
          <div className="flex flex-col gap-2">
            <label className="font-black text-xl uppercase">Target URL</label>
            <input
              type="text"
              placeholder="https://your-website.com"
              className="border-2 border-main p-5 font-mono text-lg outline-none focus:bg-primary transition-colors placeholder:text-gray-400 w-full shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
            />
          </div>

          {/* Context Input (Crucial for AI) */}
          <div className="flex flex-col gap-2">
            <label className="font-black text-xl uppercase flex items-center gap-2">
              Context / Keywords
              <span className="bg-secondary text-xs px-2 py-1 border border-main transform rotate-2">
                REQUIRED
              </span>
            </label>
            <textarea
              placeholder="Paste your hero text, blog summary, or loose thoughts here. The AI will distill this into OGP Gold."
              className="border-2 border-main p-5 font-mono text-lg outline-none focus:bg-primary transition-colors placeholder:text-gray-400 w-full h-40 resize-none shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              value={contextInput}
              onChange={(e) => setContextInput(e.target.value)}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col md:flex-row gap-6 pt-4 border-t-2 border-black border-dashed">
            <NeoButton
              onClick={handleGenerateAI}
              disabled={isProcessing || !contextInput}
              className="flex-1 text-xl py-6 hover:scale-[1.02]"
            >
              {isProcessing ? "PROCESSING..." : "✨ GENERATE MAGIC TAGS"}
            </NeoButton>

            <NeoButton
              onClick={handleRoast}
              disabled={isProcessing || !contextInput}
              variant="black"
              className="flex-1 md:flex-none py-6 hover:scale-[1.02]"
            >
              {isProcessing ? "THINKING..." : "🔥 ROAST MY VIBE"}
            </NeoButton>
          </div>
        </div>
      </NeoCard>

      {/* Processing State */}
      {isProcessing && (
        <div className="text-center py-20">
          <div className="inline-block animate-spin mb-4">
            <Sparkles size={80} fill="#FFDE00" strokeWidth={1.5} />
          </div>
          <h3 className="text-3xl font-black uppercase">
            Consulting the Oracle...
          </h3>
          <p className="font-mono text-gray-500 mt-2">
            Gemini is rewriting your destiny.
          </p>
        </div>
      )}

      {/* Roast Result */}
      {roast && !isProcessing && (
        <div className="mb-12 animate-in zoom-in duration-300">
          <NeoCard
            color="bg-[#FF90E8]"
            className="relative overflow-hidden border-4"
          >
            <div className="absolute -right-10 -top-10 opacity-20 rotate-12">
              <Flame size={250} />
            </div>
            <h3 className="font-black text-3xl mb-4 flex items-center gap-3 border-b-4 border-black pb-2">
              <Flame className="text-black fill-white" size={32} /> THE ROAST
            </h3>
            <p className="font-mono text-xl font-bold leading-relaxed">
              "{roast}"
            </p>
          </NeoCard>
        </div>
      )}

      {/* OGP Results */}
      {generatedResult && !isProcessing && (
        <div className="grid md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-8 duration-500">
          {/* Preview Column */}
          <div className="flex flex-col gap-4">
            <div className="bg-black text-white p-3 font-bold border-2 border-black flex justify-between tracking-wider">
              <span>VISUAL PREVIEW</span>
              <span className="text-[#FFDE00]">1200x630</span>
            </div>
            <div className="border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden relative group bg-gray-100">
              <img
                src={generatedResult.image}
                alt="OG Preview"
                className="w-full h-auto object-cover aspect-[1.91/1]"
              />
              <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer">
                <span className="bg-white border-2 border-black px-6 py-3 font-bold shadow-[6px_6px_0px_0px_rgba(255,222,0,1)] hover:scale-105 transition-transform flex items-center gap-2">
                  <ImageIcon size={20} /> DOWNLOAD PNG
                </span>
              </div>
            </div>
            <div className="border-2 border-black p-6 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]">
              <h4 className="font-bold text-xl truncate text-[#0000EE] underline decoration-4 decoration-[#FFDE00]">
                {generatedResult.title}
              </h4>
              <p className="text-black text-base mt-2 line-clamp-2 leading-relaxed">
                {generatedResult.description}
              </p>
              <p className="text-gray-400 text-xs mt-4 font-mono uppercase tracking-widest border-t border-gray-200 pt-2">
                {new URL(generatedResult.url).hostname}
              </p>
            </div>
          </div>

          {/* Code Column */}
          <div className="flex flex-col gap-4 h-full">
            <div className="bg-[#23A094] text-white p-3 font-bold border-2 border-black flex justify-between items-center tracking-wider">
              <span>GENERATED HTML</span>
              <button
                className="p-1 hover:bg-black border border-transparent hover:border-white transition-colors"
                onClick={() => navigator.clipboard.writeText("<code>")}
              >
                <Copy size={18} />
              </button>
            </div>
            <div className="border-2 border-black bg-[#1a1a1a] p-6 overflow-x-auto h-full shadow-[8px_8px_0px_0px_rgba(120,120,120,1)] relative group">
              <div className="absolute top-2 right-2 text-xs text-gray-500 font-mono border border-gray-700 px-2 py-1 rounded">
                READ-ONLY
              </div>
              <pre className="font-mono text-sm text-[#FFDE00] whitespace-pre-wrap leading-relaxed selection:bg-[#23A094] selection:text-white">
                {`<!-- AI Generated Tags by MetaBanana -->

<title>${generatedResult.title}</title>
<meta name="description" content="${generatedResult.description}" />

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website" />
<meta property="og:url" content="${generatedResult.url}" />
<meta property="og:title" content="${generatedResult.title}" />
<meta property="og:description" content="${generatedResult.description}" />
<meta property="og:image" content="${generatedResult.image}" />

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image" />
<meta property="twitter:url" content="${generatedResult.url}" />
<meta property="twitter:title" content="${generatedResult.title}" />
<meta property="twitter:description" content="${generatedResult.description}" />
<meta property="twitter:image" content="${generatedResult.image}" />`}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});
