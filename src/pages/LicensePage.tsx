import { memo } from "react";
import { Helmet } from "react-helmet-async";
import { FileText } from "lucide-react";
import { NeoCard } from "../components/ui/NeoCard";

export const LicensePage = memo(() => (
  <div className="max-w-4xl mx-auto px-4 py-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <Helmet>
      <title>License - OGP:BANANA</title>
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
        <h2 className="text-2xl font-bold">MIT License</h2>
        <p className="text-gray-500">Copyright (c) 2025 Bishwajeet Parhi.</p>
      </div>

      <p className="mb-4 text-sm leading-relaxed">
        Permission is hereby granted, free of charge, to any person obtaining a
        copy of this software and associated documentation files (the
        "Software"), to deal in the Software without restriction, including
        without limitation the rights to use, copy, modify, merge, publish,
        distribute, sublicense, and/or sell copies of the Software, and to
        permit persons to whom the Software is furnished to do so, subject to
        the following conditions:
      </p>

      <p className="mb-4 text-sm leading-relaxed">
        The above copyright notice and this permission notice shall be included
        in all copies or substantial portions of the Software.
      </p>

      <p className="mb-4 text-sm leading-relaxed font-bold bg-primary p-4 border-2 border-main shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
        OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
        MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
        IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
        CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
        TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
        SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
      </p>
    </NeoCard>
  </div>
));
