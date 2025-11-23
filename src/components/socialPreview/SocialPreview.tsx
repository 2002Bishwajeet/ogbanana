import {
  Facebook,
  Linkedin,
  MessageSquare,
  Smartphone,
  Twitter,
} from "lucide-react";
import { useState } from "react";

export interface OGData {
  title: string;
  description: string;
  image: string;
  url: string;
}

export const SocialPreviews = ({ data }: { data: OGData }) => {
  const [activeTab, setActiveTab] = useState<
    "twitter" | "facebook" | "whatsapp" | "linkedin"
  >("twitter");

  const hostname = new URL(data.url).hostname;
  const platforms = [
    {
      id: "twitter",
      label: "X / TWITTER",
      icon: <Twitter size={16} />,
    },
    { id: "facebook", label: "FACEBOOK", icon: <Facebook size={16} /> },
    {
      id: "whatsapp",
      label: "WHATSAPP",
      icon: <MessageSquare size={16} />,
    },
    { id: "linkedin", label: "LINKEDIN", icon: <Linkedin size={16} /> },
  ] as const;

  return (
    <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-8 duration-500 delay-100">
      <div className="bg-black text-white p-3 font-bold border-2 border-black flex justify-between tracking-wider">
        <span>PLATFORM SIMULATION</span>
        <span className="text-[#FFDE00] flex items-center gap-2">
          <Smartphone size={16} /> LIVE PREVIEW
        </span>
      </div>

      <div className="border-2 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6">
        {/* Brutalist Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 border-b-2 border-black pb-6">
          {platforms.map((platform) => (
            <button
              key={platform.id}
              onClick={() => setActiveTab(platform.id)}
              className={`
                flex items-center gap-2 px-4 py-2 font-bold border-2 border-black transition-all
                ${
                  activeTab === platform.id
                    ? "bg-primary shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] -translate-x-px -translate-y-px"
                    : "bg-white hover:bg-gray-100"
                }
              `}
            >
              {platform.icon} {platform.label}
            </button>
          ))}
        </div>

        {/* Preview Container */}
        <div className="flex justify-center bg-[#F0F0F0] border-2 border-black p-4 md:p-8 min-h-[300px] items-center relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-5 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle, #000 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          ></div>

          {/* X / Twitter Card */}
          {activeTab === "twitter" && (
            <div className="w-full max-w-[500px] bg-black text-white rounded-2xl overflow-hidden border border-gray-800 font-sans shadow-xl">
              <div className="relative aspect-[1.91/1] w-full overflow-hidden bg-gray-900">
                <img
                  src={data.image}
                  alt="OG"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded text-xs font-bold text-white">
                  {hostname}
                </div>
              </div>
              <div className="p-3">
                <div className="text-[#e7e9ea] text-sm mb-0.5 truncate">
                  {data.url}
                </div>
                <div className="text-[#e7e9ea] font-normal leading-tight">
                  {data.title}
                </div>
              </div>
            </div>
          )}

          {/* Facebook Card */}
          {activeTab === "facebook" && (
            <div className="w-full max-w-[500px] bg-white rounded-lg overflow-hidden border border-gray-300 font-sans shadow-md">
              <div className="aspect-[1.91/1] w-full overflow-hidden bg-gray-100">
                <img
                  src={data.image}
                  alt="OG"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-3 bg-[#F0F2F5]">
                <div className="uppercase text-[11px] text-[#65676B] mb-1 font-semibold tracking-wide truncate">
                  {hostname}
                </div>
                <div className="text-[#050505] font-bold text-[16px] leading-tight mb-1">
                  {data.title}
                </div>
                <div className="text-[#65676B] text-[14px] line-clamp-1">
                  {data.description}
                </div>
              </div>
            </div>
          )}

          {/* WhatsApp Card */}
          {activeTab === "whatsapp" && (
            <div className="w-full max-w-[400px] bg-[#DCF8C6] p-2 rounded-lg shadow-sm border border-[#C6E6B0] relative">
              {/* Message Bubble Tail (Fake) */}
              <div className="absolute -right-2 top-0 w-4 h-4 bg-[#DCF8C6] border-b border-l border-[#C6E6B0] rotate-45 transform skew-x-12"></div>

              <div className="bg-[#F0F0F0] rounded overflow-hidden mb-1 border-l-4 border-gray-400">
                <div className="bg-gray-200 text-black px-2 py-1 text-xs truncate opacity-70">
                  {data.url}
                </div>
                <div className="flex bg-[#F7F7F7]">
                  <div className="w-20 h-20 shrink-0 bg-gray-300">
                    <img
                      src={data.image}
                      alt="thumb"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-2 flex flex-col justify-center min-w-0">
                    <div className="font-bold text-sm leading-tight text-black line-clamp-2">
                      {data.title}
                    </div>
                    <div className="text-xs text-gray-500 leading-tight mt-1 line-clamp-1">
                      {data.description}
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-sm text-black px-1 font-sans">
                Check this out! 👇
              </div>
              <div className="text-[10px] text-gray-500 text-right mt-1">
                12:42 PM
              </div>
            </div>
          )}

          {/* LinkedIn Card */}
          {activeTab === "linkedin" && (
            <div className="w-full max-w-[500px] bg-white rounded-lg overflow-hidden border border-gray-300 font-sans shadow-sm">
              <div className="aspect-[1.91/1] w-full overflow-hidden bg-gray-100">
                <img
                  src={data.image}
                  alt="OG"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-3 bg-white">
                <div className="text-[#000000E6] font-semibold text-[16px] leading-tight mb-1">
                  {data.title}
                </div>
                <div className="text-[#00000099] text-[12px] truncate">
                  {hostname}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
