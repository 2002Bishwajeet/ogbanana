import { memo } from "react";
import { Zap, Github, Twitter, Cookie } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = memo(() => (
  <footer className="border-t-4 border-black bg-white text-black">
    {/* Main Footer Block */}
    <div className="grid md:grid-cols-2 lg:grid-cols-4 border-b-4 border-black">
      {/* Brand Column */}
      <div className="p-10 border-r-4 border-black flex flex-col justify-between bg-[#FFDE00]">
        <div>
          <div className="w-16 h-16 bg-black text-[#FFDE00] flex items-center justify-center border-2 border-black mb-6">
            <Zap size={32} fill="#FFDE00" />
          </div>
          <h2 className="font-black text-4xl leading-none mb-4">
            OGP:
            <br />
            BANANA
          </h2>
        </div>
        <p className="font-mono text-sm font-bold mt-8">EST. 2025</p>
      </div>

      {/* Links Column */}
      <div className="p-10 border-r-4 border-black flex flex-col gap-4 bg-white">
        <h3 className="font-black text-xl mb-4 uppercase underline decoration-4 decoration-[#FF90E8]">
          Socials
        </h3>
        <a
          href="#"
          className="flex items-center gap-2 font-bold hover:bg-black hover:text-white p-2 border-2 border-transparent hover:border-black transition-all"
        >
          <Github size={20} /> GITHUB
        </a>
        <a
          href="#"
          className="flex items-center gap-2 font-bold hover:bg-[#1DA1F2] hover:text-white p-2 border-2 border-transparent hover:border-black transition-all"
        >
          <Twitter size={20} /> TWITTER / X
        </a>
      </div>

      {/* Legal Column */}
      <div className="p-10 border-r-4 border-black flex flex-col gap-4 bg-white">
        <h3 className="font-black text-xl mb-4 uppercase underline decoration-4 decoration-[#23A094]">
          Legal
        </h3>
        <Link to="/tos" className="font-mono hover:underline text-left">
          TERMS OF SERVICE
        </Link>
        <Link to="/privacy" className="font-mono hover:underline text-left">
          PRIVACY POLICY
        </Link>
        <Link to="/license" className="font-mono hover:underline text-left">
          LICENSE
        </Link>
      </div>

      {/* Cookie Notice Column */}
      <div className="p-10 bg-[#F0F0F0] flex flex-col justify-center relative overflow-hidden group">
        <Cookie
          size={120}
          className="absolute -right-6 -bottom-6 text-gray-200 group-hover:rotate-12 transition-transform duration-500"
        />
        <div className="relative z-10 border-2 border-black bg-white p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <h4 className="font-black text-lg mb-2 flex items-center gap-2">
            <span className="w-3 h-3 bg-green-500 rounded-full border border-black"></span>
            NO TRACKING
          </h4>
          <p className="font-mono text-xs leading-tight">
            We strictly use necessary cookies only. We don't want your data.
            It's boring.
          </p>
        </div>
      </div>
    </div>

    {/* Bottom Bar */}
    <div className="bg-black text-white p-4 text-center font-mono text-sm flex flex-col md:flex-row justify-between items-center px-8">
      <span>© 2025 Furr Byte Inc</span>
      <span className="text-[#FF90E8]">
        Made with ♥ by{" "}
        <a
          className="underline hover:text-primary transition-colors"
          href="https://bishwajeetparhi.dev"
        >
          Bishwajeet Parhi
        </a>{" "}
        using Gemini 3.0
      </span>
    </div>
  </footer>
));
