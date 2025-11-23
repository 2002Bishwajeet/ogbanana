import { memo } from "react";
import { Helmet } from "react-helmet-async";
import { FileText } from "lucide-react";
import { NeoCard } from "../components/ui/NeoCard";

export const LicensePage = memo(() => (
  <div className="max-w-4xl mx-auto px-4 py-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <Helmet>
      <title>License - OG:BANANA</title>
      <meta name="description" content="Read our license information." />
    </Helmet>
    <div className="flex items-center gap-4 mb-8 border-b-4 border-black pb-4">
      <div className="p-3 bg-accent border-2 border-main shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-white">
        <FileText size={40} />
      </div>
      <h1 className="text-5xl font-black uppercase">License</h1>
    </div>

    <NeoCard className="mb-8 font-mono bg-card">
      <div className="border-b-2 border-black pb-4 mb-4">
        <h2 className="text-2xl font-bold">Dual Licensing Model</h2>
        <p className="text-gray-500">Copyright (c) 2025 Bishwajeet Parhi.</p>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold mb-2">
            1. Open Source License (AGPLv3)
          </h3>
          <p className="text-sm leading-relaxed mb-2">
            This software is available under the GNU Affero General Public
            License v3.0 (AGPLv3). This license is designed for software that is
            run over a network.
          </p>
          <ul className="list-disc list-inside text-sm space-y-1 ml-2">
            <li>Free to use for open source projects.</li>
            <li>Modifications must be released under the same license.</li>
            <li>Source code must be made available to network users.</li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-2">2. Commercial License</h3>
          <p className="text-sm leading-relaxed mb-2">
            For proprietary use, closed-source projects, or if you cannot comply
            with the AGPLv3 requirements, a commercial license is available.
          </p>
          <ul className="list-disc list-inside text-sm space-y-1 ml-2">
            <li>No copyleft requirements.</li>
            <li>Keep your source code private.</li>
            <li>Dedicated support and warranty.</li>
          </ul>
        </div>

        <div className="bg-primary p-4 border-2 border-main shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mt-6">
          <p className="text-sm font-bold">
            To purchase a commercial license or for any licensing queries,
            please contact us directly.
          </p>
        </div>
      </div>
    </NeoCard>
  </div>
));
