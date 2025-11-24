import { useState, memo } from "react";
import { ImageIcon, Copy } from "lucide-react";
import { NeoButton } from "../components/ui/NeoButton";
import { NeoCard } from "../components/ui/NeoCard";

import { useAuth } from "../context/AuthContext";
import { useGetOGP } from "../hooks/useGetOGP";
import { SocialPreviews } from "../components/socialPreview/SocialPreview";
import { ErrorToast } from "../components/toast/ErrorToast";
import { InteractiveLoader } from "../components/loader/InteractiveLoader";

export const Generator = memo(() => {
  const { user } = useAuth();
  const {
    mutate: generate,
    data: generatedResult,
    isPending: isProcessing,
    error,
  } = useGetOGP();

  // Generator State
  const [urlInput, setUrlInput] = useState("");
  const [contextInput, setContextInput] = useState("");

  const handleGenerateAI = () => {
    generate({ urlInput, contextInput });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4 border-b-4 border-black pb-4">
        <div>
          <h2 className="text-5xl font-black mb-2 tracking-tight">GENERATOR</h2>
          <p className="font-mono bg-primary inline-block px-2 border border-main font-bold text-sm">
            MODEL: GEMINI-2.5-FLASH
          </p>
        </div>
        <div className="text-right font-mono text-sm leading-loose">
          REMAINING CREDITS:{" "}
          <span className="bg-black text-white px-1">{user?.credits ?? 0}</span>
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
            <label className="font-black text-xl uppercase flex items-center gap-2">
              Target URL
              <span className="bg-secondary text-xs px-2 py-1 border border-main transform rotate-2">
                REQUIRED
              </span>
            </label>
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
            <label className="font-black text-xl uppercase ">
              Context / Keywords
            </label>
            <textarea
              placeholder="Paste your optional hero text, blog summary, or loose thoughts here. The AI will distill this into OGP Gold."
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
          </div>
        </div>
      </NeoCard>

      <InteractiveLoader isVisible={isProcessing} isLoading={isProcessing} />

      {/* OGP Results */}
      {error && <ErrorToast error={error} />}

      {generatedResult && !isProcessing && (
        <>
          <div className="mb-12">
            <SocialPreviews data={generatedResult} />
          </div>
          <div className="grid md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-8 duration-500">
            {/* Preview Column */}
            <div className="flex flex-col gap-4">
              <div className="bg-black text-white p-3 font-bold border-2 border-black flex justify-between tracking-wider">
                <span>VISUAL PREVIEW</span>
                <span className="text-[#FFDE00]">1200x630</span>
              </div>
              <div className="border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden relative group bg-gray-100">
                <img
                  src={generatedResult.ogpImage ?? ""}
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
                  {generatedResult.meta.social.title}
                </h4>
                <p className="text-black text-base mt-2 line-clamp-2 leading-relaxed">
                  {generatedResult.meta.social.description}
                </p>
                <p className="text-gray-400 text-xs mt-4 font-mono uppercase tracking-widest border-t border-gray-200 pt-2">
                  {new URL(generatedResult.url).hostname}
                </p>
              </div>
            </div>

            {/* Code Column */}
            <div className="flex flex-col gap-4 h-full">
              <div className="bg-accent text-white p-3 font-bold border-2 border-black flex justify-between items-center tracking-wider">
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
                <pre className="font-mono text-sm text-primary whitespace-pre-wrap leading-relaxed selection:bg-accent selection:text-white">
                  {`<!-- AI Generated Tags by MetaBanana -->

<title>${generatedResult.meta.standard.title}</title>
<meta name="description" content="${generatedResult.meta.standard.description}" />

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website" />
<meta property="og:url" content="${generatedResult.url}" />
<meta property="og:title" content="${generatedResult.meta.social.title}" />
<meta property="og:description" content="${generatedResult.meta.social.description}" />
<meta property="og:image" content="${generatedResult.ogpImage}" />

<!-- Twitter -->
<meta property="twitter:card" content="${generatedResult.meta.social.twitter_card}" />
<meta property="twitter:url" content="${generatedResult.url}" />
<meta property="twitter:title" content="${generatedResult.meta.social.title}" />
<meta property="twitter:description" content="${generatedResult.meta.social.description}" />
<meta property="twitter:image" content="${generatedResult.ogpImage}" />`}
                </pre>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
});
