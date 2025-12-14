import {
  Facebook,
  Linkedin,
  MessageSquare,
  Smartphone,
  Twitter,
} from "lucide-react";
import { useState } from "react";
import { type OGPData } from "../../lib/types";
import { Discord } from "../ui/icons/Discord"; // Updated import
import { TwitterPreview } from "./previews/TwitterPreview";
import { FacebookPreview } from "./previews/FacebookPreview";
import { WhatsAppPreview } from "./previews/WhatsAppPreview";
import { LinkedInPreview } from "./previews/LinkedInPreview";
import { DiscordPreview } from "./previews/DiscordPreview";

export const SocialPreviews = ({ data }: { data: OGPData }) => {
  const [activeTab, setActiveTab] = useState<
    "twitter" | "facebook" | "whatsapp" | "linkedin" | "discord"
  >("twitter");

  const { title, description } = data.meta.social;
  const image = data.ogpImage;
  const url = data.url;
  const hostname = new URL(url).hostname;

  const platforms = [
    {
      id: "twitter",
      label: "X / TWITTER",
      icon: <Twitter size={16} />,
      component: <TwitterPreview url={url} hostname={hostname} title={title} description={description} image={image} />,
    },
    {
      id: "facebook",
      label: "FACEBOOK",
      icon: <Facebook size={16} />,
      component: <FacebookPreview url={url} hostname={hostname} title={title} description={description} image={image} />,
    },
    {
      id: "whatsapp",
      label: "WHATSAPP",
      icon: <MessageSquare size={16} />,
      component: <WhatsAppPreview url={url} hostname={hostname} title={title} description={description} image={image} />,
    },
    {
      id: "linkedin",
      label: "LINKEDIN",
      icon: <Linkedin size={16} />,
      component: <LinkedInPreview url={url} hostname={hostname} title={title} description={description} image={image} />,
    },
    {
      id: "discord",
      label: "DISCORD",
      icon: <Discord size={16} />, // Updated to use Discord component with size prop
      component: <DiscordPreview url={url} hostname={hostname} title={title} description={description} image={image} />,
    },
  ] as const;

  return (
    <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-8 duration-500 delay-100">
      <div className="bg-black text-white p-3 font-bold border-2 border-black flex justify-between tracking-wider">
        <span>PLATFORM SIMULATION</span>
        <span className="text-primary flex items-center gap-2">
          <Smartphone size={16} /> LIVE PREVIEW
        </span>
      </div>

      <div className="border-2 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-4 md:p-6 overflow-hidden">
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

          {platforms.find((p) => p.id === activeTab)?.component}
        </div>
      </div>
    </div>
  );
};
