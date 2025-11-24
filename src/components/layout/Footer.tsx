import { memo } from "react";
import { Zap, Github, Twitter, Cookie, LifeBuoy } from "lucide-react";
import { Link } from "react-router-dom";
import {
  GITHUB_URL,
  TWITTER_URL,
  REPORT_ISSUES_URL,
} from "../../lib/constants";

export const Footer = memo(() => (
  <footer className="border-t-4 border-black bg-white text-black font-sans relative z-10">
    {/* Main Footer Grid */}
    <div className="grid grid-cols-1 lg:grid-cols-4">
      {/* 1. Brand Column */}
      <div className="p-8 lg:p-10 border-b-4 lg:border-b-0 lg:border-r-4 border-black flex flex-col justify-between bg-[#FFDE00]">
        <div>
          <div className="w-16 h-16 bg-black text-[#FFDE00] flex items-center justify-center border-2 border-black mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:rotate-3 transition-transform">
            <Zap size={32} fill="#FFDE00" />
          </div>
          <h2 className="font-black text-4xl leading-none mb-4 tracking-tighter">
            OGP:
            <br />
            BANANA
          </h2>
        </div>
        <p className="font-mono text-sm font-bold mt-8 uppercase border-t-2 border-black pt-4 inline-block">
          Est. 2025 // Furr Byte Inc
        </p>
      </div>

      {/* 2. Community Column (Merged Socials + Help) */}
      <div className="p-8 lg:p-10 border-b-4 lg:border-b-0 lg:border-r-4 border-black flex flex-col gap-6 bg-white">
        <h3 className="font-black text-xl uppercase underline decoration-4 decoration-[#FF90E8] underline-offset-4">
          Community
        </h3>

        <div className="flex flex-col gap-3">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 font-bold hover:bg-black hover:text-white p-3 border-2 border-transparent hover:border-black transition-all group"
          >
            <Github
              size={20}
              className="group-hover:scale-110 transition-transform"
            />
            <span>GITHUB</span>
          </a>
          <a
            href={TWITTER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 font-bold hover:bg-[#1DA1F2] hover:text-white p-3 border-2 border-transparent hover:border-black transition-all group"
          >
            <Twitter
              size={20}
              className="group-hover:scale-110 transition-transform"
            />
            <span>TWITTER / X</span>
          </a>
          <a
            href={REPORT_ISSUES_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 font-bold hover:bg-red-500 hover:text-white p-3 border-2 border-transparent hover:border-black transition-all group"
          >
            <LifeBuoy
              size={20}
              className="group-hover:rotate-12 transition-transform"
            />
            <span>REPORT ISSUE</span>
          </a>
        </div>
      </div>

      {/* 3. Legal Column */}
      <div className="p-8 lg:p-10 border-b-4 lg:border-b-0 lg:border-r-4 border-black flex flex-col gap-6 bg-white">
        <h3 className="font-black text-xl uppercase underline decoration-4 decoration-[#23A094] underline-offset-4">
          Legal
        </h3>
        <div className="flex flex-col gap-2 font-mono text-sm">
          <Link
            to="/tos"
            className="hover:underline hover:text-[#23A094] hover:translate-x-1 transition-transform w-fit"
          >
            TERMS OF SERVICE
          </Link>
          <Link
            to="/privacy"
            className="hover:underline hover:text-[#23A094] hover:translate-x-1 transition-transform w-fit"
          >
            PRIVACY POLICY
          </Link>
          <Link
            to="/license"
            className="hover:underline hover:text-[#23A094] hover:translate-x-1 transition-transform w-fit"
          >
            LICENSE
          </Link>
        </div>
      </div>

      {/* 4. Cookie Notice Column */}
      <div className="p-8 lg:p-10 bg-[#F0F0F0] flex flex-col justify-center relative overflow-hidden group border-b-4 lg:border-b-0 border-black">
        <Cookie
          size={140}
          className="absolute -right-8 -bottom-8 text-gray-300 group-hover:rotate-12 transition-transform duration-500 pointer-events-none"
        />
        <div className="relative z-10 border-2 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all">
          <h4 className="font-black text-lg mb-3 flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500 border border-black"></span>
            </span>
            NO TRACKING
          </h4>
          <p className="font-mono text-xs leading-relaxed font-medium text-gray-600">
            We strictly use necessary cookies only. <br />
            We don't want your data. It's boring.
          </p>
        </div>
      </div>
    </div>

    {/* Bottom Bar */}
    <div className="bg-black text-white py-6 px-8 text-center font-mono text-xs flex flex-col md:flex-row justify-between items-center gap-4">
      <span className="font-bold">© 2025 FURR BYTE INC</span>
      <span className="text-gray-400 flex flex-wrap justify-center gap-1">
        Made with <span className="text-[#FF90E8] animate-pulse">♥</span> by{" "}
        <a
          className="underline text-white hover:text-[#FFDE00] transition-colors decoration-2"
          href="https://bishwajeetparhi.dev"
          target="_blank"
          rel="noopener noreferrer"
        >
          Bishwajeet Parhi
        </a>{" "}
        using Gemini 3.0
      </span>
    </div>
  </footer>
));
