import { memo } from "react";
import { Helmet } from "react-helmet-async";
import { Check, X, Zap, Database, Lock } from "lucide-react";
import { NeoButton } from "../components/ui/NeoButton";
import { NeoCard } from "../components/ui/NeoCard";
import { useNavigate } from "react-router";

export const Pricing = memo(() => {
  const navigate = useNavigate();

  return (
    <div className="max-w-6xl mx-auto px-4 py-20 animate-in zoom-in-95 duration-500">
      <Helmet>
        <title>Pricing - OG:BANANA</title>
        <meta name="description" content="Choose a plan that works for you." />
      </Helmet>
      <div className="text-center mb-16">
        <h2 className="text-6xl font-black mb-4 tracking-tighter">
          NO B.S. PRICING
        </h2>
        <p className="font-mono text-xl text-gray-600">
          Invest in your click-through rate.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
        {/* Free Plan */}
        <NeoCard className="relative hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all">
          <div className="bg-gray-200 w-full h-6 mb-8 border-2 border-black"></div>
          <h3 className="text-4xl font-black mb-2 uppercase">Starter</h3>
          <div className="text-6xl font-black mb-8">
            $0<span className="text-xl font-normal text-gray-500">/mo</span>
          </div>
          <p className="font-mono mb-8 min-h-12 text-gray-600">
            For the curious and the broke.
          </p>

          <ul className="space-y-4 mb-8 font-bold text-lg">
            <li className="flex gap-3 items-center">
              <Check size={24} className="text-accent" /> 5 Websites / Month
            </li>
            <li className="flex gap-3 items-center">
              <Check size={24} className="text-accent" /> Gemini Flash Access
            </li>
            <li className="flex gap-3 items-center">
              <Check size={24} className="text-accent" /> Standard Speed
            </li>
            <li className="flex gap-3 items-center text-gray-300 line-through">
              <X size={24} /> API Access
            </li>
          </ul>

          <NeoButton
            variant="white"
            className="w-full text-lg py-4"
            onClick={() => navigate("/")}
          >
            START FREE
          </NeoButton>
        </NeoCard>

        {/* Pro Plan */}
        <div className="relative group">
          <div className="hidden absolute -top-6 -right-6 bg-primary border-2 border-main px-6 py-3 font-black z-10 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rotate-3 group-hover:rotate-6 transition-transform">
            MOST POPULAR
          </div>
          <NeoCard
            color="bg-accent"
            className="text-white hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all border-white/20"
          >
            <div className="bg-black/20 w-full h-6 mb-8 border-2 border-black"></div>
            <h3 className="text-4xl font-black mb-2 uppercase">Pro Banana</h3>
            <div className="text-6xl font-black mb-8">
              $19<span className="text-xl font-normal text-white/80">/mo</span>
            </div>
            <p className="font-mono mb-8 min-h-12 text-white/90">
              For agencies and heavy shippers.
            </p>

            <ul className="space-y-4 mb-8 font-bold text-lg">
              <li className="flex gap-3 items-center">
                <Check size={24} className="text-primary" /> 50 Websites / Month
              </li>
              <li className="flex gap-3 items-center">
                <Check size={24} className="text-primary" /> Gemini Pro Access
              </li>
              <li className="flex gap-3 items-center">
                <Check size={24} className="text-primary" /> No Watermarks
              </li>
              <li className="flex gap-3 items-center">
                <Zap size={24} fill="#FFDE00" className="text-primary" />{" "}
                Priority GPU Access
              </li>
              <li className="flex gap-3 items-center">
                <Database size={24} className="text-primary" /> History
                Retention
              </li>
            </ul>

            <NeoButton
              variant="secondary"
              className="w-full border-white text-black text-lg py-4 opacity-70 cursor-not-allowed"
              disabled
            >
              COMING SOON
            </NeoButton>
          </NeoCard>
        </div>
      </div>

      <div className="mt-24 p-10 border-4 border-main bg-bg flex flex-col md:flex-row items-center justify-between gap-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <div className="flex items-center gap-6">
          <div className="bg-white p-5 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <img
              src="/appwrite.svg"
              alt="Appwrite logo"
              className="w-20 h-auto"
              loading="lazy"
            />
          </div>
          <div>
            <h4 className="font-black text-2xl uppercase">
              Hosted on Appwrite
            </h4>
            <p className="font-mono text-base text-gray-600">
              Secure backend, auth, and database.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 font-mono text-sm bg-black text-white px-4 py-2 rounded-full">
          <Lock size={16} />
          Encrypted & Private
        </div>
      </div>
    </div>
  );
});
