import { memo } from "react";
import { Helmet } from "react-helmet-async";
import { Scale } from "lucide-react";
import { NeoCard } from "../components/ui/NeoCard";

export const TermsOfService = memo(() => (
  <div className="max-w-4xl mx-auto px-4 py-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <Helmet>
      <title>Terms of Service - OG:BANANA</title>
      <meta name="description" content="Read our terms of service." />
    </Helmet>
    <div className="flex items-center gap-4 mb-8 border-b-4 border-black pb-4">
      <div className="p-3 bg-primary border-2 border-main shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <Scale size={40} />
      </div>
      <h1 className="text-5xl font-black uppercase">Terms of Service</h1>
    </div>

    <NeoCard className="mb-8">
      <div className="prose prose-lg font-mono max-w-none">
        <h3 className="font-black text-2xl uppercase bg-black text-white p-2 inline-block mb-4">
          1. The Agreement
        </h3>
        <p className="mb-6">
          By accessing OG:BANANA, you agree to these terms. If you disagree,
          please close this tab immediately and go back to writing meta tags
          manually like a peasant.
        </p>

        <h3 className="font-black text-2xl uppercase bg-black text-white p-2 inline-block mb-4">
          2. Usage Rights
        </h3>
        <p className="mb-6">
          You are granted a limited, non-exclusive right to use our AI generator
          to create OGP tags and images.
        </p>
        <p>
          <strong>Do not:</strong>
        </p>
        <ul className="list-disc pl-6 mt-2">
          <li>Use bots to scrape our generator.</li>
          <li>Generate illegal, hateful, or just plain boring content.</li>
          <li>
            Try to reverse engineer the Nano Banana model (it's just Gemini in a
            trench coat).
          </li>
        </ul>

        <h3 className="font-black text-2xl uppercase bg-black text-white p-2 inline-block mb-4">
          3. Liability
        </h3>
        <p className="mb-6">
          We are not responsible if the AI hallucinates and claims your bakery
          sells "weapons grade plutonium". Always check the output before
          pasting it into your production code.
        </p>

        <h3 className="font-black text-2xl uppercase bg-black text-white p-2 inline-block mb-4">
          4. Termination
        </h3>
        <p>
          We reserve the right to ban your IP address if you abuse the free
          tier. Play nice.
        </p>
      </div>
    </NeoCard>
    <div className="text-center font-bold text-gray-500">
      LAST UPDATED: THE DAWN OF TIME
    </div>
  </div>
));
