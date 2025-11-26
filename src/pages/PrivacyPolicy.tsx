import { memo } from "react";
import { Shield } from "lucide-react";
import { NeoCard } from "../components/ui/NeoCard";

export const PrivacyPolicy = memo(() => (
  <>
    <title>Privacy Policy - OG:BANANA</title>
    <meta name="description" content="Read our privacy policy." />
    <div className="max-w-4xl mx-auto px-4 py-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
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
          <p className="mb-6">
            We only gather the information required to run the generator and
            keep your account functional.
          </p>
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
            <li>
              <strong>Google User Data:</strong> When you choose Google Sign-In,
              we request read-only access to your Google profile's basic fields
              (display name and email address). We do not access calendars,
              files, contacts, or any other Google data scopes.
            </li>
          </ul>

          <div className="bg-primary/40 border-2 border-black p-4 my-6">
            <h4 className="font-black text-xl mb-2">How we use Google data</h4>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Account creation & sign-in:</strong> Name and email are
                used to create your OG:BANANA account and display who is logged
                in.
              </li>
              <li>
                <strong>Credits & plan status:</strong> The email acts as your
                unique identifier for tracking free credits and optional plan
                upgrades.
              </li>
              <li>
                <strong>Storage & deletion:</strong> Name and email are stored
                in Appwrite and can be deleted at any time by removing your
                account or opening an issue in the OG:BANANA GitHub repository
                so our team can erase the data manually. We never sell or share
                this data and we do not transfer it outside the services needed
                to run OG:BANANA.
              </li>
            </ul>
          </div>

          <h3 className="font-black text-2xl uppercase bg-black text-white p-2 inline-block mb-4">
            2. Cookies
          </h3>
          <p className="mb-6">
            We use strictly necessary cookies to keep you logged in. That's it.
            We don't have Google Analytics, Facebook Pixels, or creepy trackers
            watching you sleep.
          </p>

          <h3 className="font-black text-2xl uppercase bg-black text-white p-2 inline-block mb-4">
            3. Third Parties
          </h3>
          <p className="mb-6">
            We use <strong>Google Gemini</strong> for LLM processing. Your
            prompts are sent to Google's API. By using this tool, you are
            subject to Google's data processing terms for their API. Google
            Sign-In is only used for authentication; we do not allow employees
            or third parties to manually read or export your Google data.
          </p>
        </div>
      </NeoCard>
    </div>
  </>
));
