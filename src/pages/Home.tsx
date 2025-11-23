import { memo } from "react";
import { Helmet } from "react-helmet-async";
import { Code, Image as ImageIcon, Cpu } from "lucide-react";
import { NeoButton } from "../components/ui/NeoButton";

import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";

const Hero = memo(() => {
  const { user, openAuthModal } = useAuth();
  const navigate = useNavigate();

  return (
    <section className="flex flex-col items-center pt-20 pb-28 px-4 text-center bg-bg overflow-hidden relative">
      {/* Decorative Elements */}
      <div
        className="absolute top-20 left-10 w-12 h-12 bg-primary border-2 border-main hidden lg:block animate-bounce"
        style={{ animationDuration: "3s" }}
      ></div>
      <div className="absolute bottom-20 right-10 w-16 h-16 bg-accent border-2 border-main rounded-full hidden lg:block animate-pulse"></div>

      <div className="inline-block bg-secondary border-2 border-main px-4 py-1 font-bold mb-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform -rotate-2 hover:rotate-2 transition-transform cursor-default">
        NOW WITH GEMINI LLM POWER ✨
      </div>
      <h1 className="text-6xl md:text-9xl font-black mb-8 leading-[0.85] tracking-tighter">
        FEED THE <br />
        <span className="bg-primary px-2 border-main border-b-8">
          ALGORITHM
        </span>
      </h1>
      <p className="text-xl font-mono max-w-2xl mb-12 border-l-4 border-black pl-4 text-left md:text-center md:border-none bg-white p-4 shadow-sm">
        Stop posting broken, boring links. We analyze your site's DNA using
        Gemini AI to auto-generate high-converting OGP tags and custom preview
        images that demand attention.
      </p>
      <div className="flex flex-col md:flex-row gap-6 relative z-10">
        <NeoButton
          onClick={user ? () => navigate("/generator") : openAuthModal}
          className="text-xl px-10 py-5 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
        >
          TRY NOW (5 FREE)
        </NeoButton>
        <NeoButton
          onClick={() => navigate("/pricing")}
          variant="white"
          className="text-xl px-10 py-5 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
        >
          VIEW PLANS
        </NeoButton>
      </div>
    </section>
  );
});

const HowItWorks = memo(() => (
  <section
    id="how-it-works"
    className="bg-black text-bg py-24 px-4 border-t-4 border-main relative overflow-hidden"
  >
    <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
    <div className="max-w-6xl mx-auto relative z-10">
      <h2 className="text-4xl md:text-7xl font-black mb-20 text-center text-white tracking-tight">
        THE{" "}
        <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary">
          PIPELINE
        </span>
      </h2>

      <div className="grid md:grid-cols-3 gap-12">
        {[
          {
            icon: <Code size={40} />,
            title: "1. INGESTION",
            desc: "We download your HTML (SSR or CSR friendly), analyzing content structure to extract the true context.",
            color: "bg-secondary",
          },
          {
            icon: <Cpu size={40} />,
            title: "2. NANO BANANA",
            desc: "Our AI engine generates descriptive OGP tags and hallucinates a perfect custom image for SEO.",
            color: "bg-primary",
          },
          {
            icon: <ImageIcon size={40} />,
            title: "3. VISIBILITY",
            desc: "Optimized for search engines. Boosted click-through rates. Your link becomes unignorable.",
            color: "bg-accent",
          },
        ].map((step, i) => (
          <div
            key={i}
            className="relative group hover:-translate-y-2 transition-transform duration-300"
          >
            <div
              className={`absolute inset-0 ${step.color} translate-x-3 translate-y-3 border-2 border-white group-hover:translate-x-5 group-hover:translate-y-5 transition-transform`}
            ></div>
            <div className="relative bg-card text-main border-2 border-main p-8 h-full">
              <div className="mb-6 border-2 border-black w-20 h-20 flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white group-hover:scale-110 transition-transform">
                {step.icon}
              </div>
              <h3 className="text-3xl font-black mb-4">{step.title}</h3>
              <p className="font-mono text-sm leading-relaxed border-t-2 border-black pt-4">
                {step.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
));

export const Home = () => (
  <>
    <Helmet>
      <title>OG:BANANA - Feed the Algorithm</title>
      <meta
        name="description"
        content="Generate perfect Open Graph tags and images for your website using AI."
      />
    </Helmet>
    <Hero />
    <HowItWorks />
    <div className="bg-primary border-y-4 border-main py-6 overflow-hidden whitespace-nowrap relative">
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] opacity-20"></div>
      <div className="animate-marquee inline-block font-black text-3xl tracking-widest relative z-10">
        AUTO-GENERATE TAGS +++ AI IMAGE GENERATION +++ BOOST CTR +++ NO MORE
        BORING LINKS +++ AUTO-GENERATE TAGS +++ AI IMAGE GENERATION +++ BOOST
        CTR +++ NO MORE BORING LINKS +++
      </div>
    </div>
  </>
);
