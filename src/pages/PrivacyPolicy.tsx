import { memo } from "react";
import { Helmet } from "react-helmet-async";
import { Shield } from "lucide-react";
import { NeoCard } from "../components/ui/NeoCard";

export const PrivacyPolicy = memo(() => (
  <div className="max-w-4xl mx-auto px-4 py-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <Helmet>
      <title>Privacy Policy - OGP:BANANA</title>
      <meta name="description" content="Read our privacy policy." />
    </Helmet>
    <div className="flex items-center gap-4 mb-8 border-b-4 border-black pb-4">
      <div className="p-3 bg-secondary border-2 border-main shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <Shield size={40} />
      </div>
      <h1 className="text-5xl font-black uppercase">Privacy Policy</h1>
    </div>

    <NeoCard className="mb-8">
      <div className="prose prose-lg font-mono max-w-none">
        <h3 className="font-black text-2xl uppercase bg-black text-white p-2 inline-block mb-4">
          1. Data Collection
        </h3>
        <p className="mb-6">We collect almost nothing.</p>
        <ul className="list-disc pl-6 mt-2">
            <li>
              <strong>HTML Content:</strong> We temporarily process the URL you
              provide to generate tags. It is discarded immediately after
              processing.
            </li>
            <li>
              <strong>Auth Data:</strong> Handled securely by Appwrite. We don't
              see your password.
            </li>
            <li>
              <strong>Generations:</strong> We might store your generated images
              temporarily for caching, but we don't claim ownership.
            </li>
          </ul>
        </p>

        <h3 className="font-black text-2xl uppercase bg-black text-white p-2 inline-block mb-4">
          2. Cookies
        </h3>
        <p className="mb-6">
          We use strictly necessary cookies to keep you logged in. That's it. We
          don't have Google Analytics, Facebook Pixels, or creepy trackers
          watching you sleep.
        </p>

        <h3 className="font-black text-2xl uppercase bg-black text-white p-2 inline-block mb-4">
          3. Third Parties
        </h3>
        <p className="mb-6">
          We use <strong>Google Gemini</strong> for LLM processing. Your prompts
          are sent to Google's API. By using this tool, you are subject to
          Google's data processing terms for their API.
        </p>
      </div>
    </NeoCard>
  </div>
));
