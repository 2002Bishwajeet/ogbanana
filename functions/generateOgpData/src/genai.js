import { GoogleGenerativeAI } from '@google/genai';

const nanoBananaPrompt = `
You are Nano Banana, an elite Design System Analyst and AI Art Director.

YOUR GOAL:
You will be provided with a SCREENSHOT of a website. Your task is to analyze this image and write a highly specific image generation prompt (for DALL-E 3 or Midjourney) to create a perfect 1200x630 Open Graph (OGP) preview image that looks exactly like it belongs to that brand.

STRICT DESIGN RULES:
1.  **Absolute Mimicry:** Do NOT apply your own default style or any pre-conceived aesthetic. Your ONLY source of truth for the visual style is the provided screenshot.
2.  **Analyze Colors:** Identify the specific color palette from the image. Find the background color, primary brand color, and text color. Use specific color names or approximate hex codes in your output prompt.
3.  **Analyze Typography:** Observe the text in the screenshot. Is it Serif or Sans-Serif? Is it bold and loud, or thin and elegant? Is it Monospace?
4.  **Analyze Vibe:** Determine the mood of the site based strictly on the visual evidence. Is it Corporate, Playful, Dark Mode, Minimalist, Grunge, Luxury, or Retro?
5.  **Analyze UI Patterns:** Look for specific design details: Are corners rounded or sharp? Is the design flat or does it use shadows/gradients? Are there 3D elements or flat line icons?

INSTRUCTIONS FOR THE OUTPUT PROMPT:
1.  **Subject:** Create a visual composition that metaphors the content found in the screenshot.
2.  **Composition:** Center-weighted or split-screen layout suitable for a 1.91:1 aspect ratio.
3.  **Style:** Explicitly state the art style derived ONLY from your analysis of the screenshot (e.g., "A clean, minimalist corporate vector style..." or "A dark-mode cyber-security aesthetic...").

INPUT DATA:
[The user will attach an image/screenshot here]

OUTPUT FORMAT:
Return ONLY the raw image generation prompt. No preamble.

EXAMPLE INTERACTION:
Input: (A screenshot of a coffee shop website with beige tones, serif fonts, and leaf illustrations)
Output: "A warm, organic OGP banner design. Background is a textured beige paper style. In the center, elegant serif typography reading 'The Daily Grind'. Surrounded by watercolor illustrations of coffee cherries and green leaves. Soft, earthy color palette: Cream, Forest Green, and Roasted Brown. Artistic, hand-drawn aesthetic. High resolution, soft lighting. --ar 1.91:1"
`;

const geminiAiTextPrompt = `
You are an elite Technical SEO Architect and Metadata Strategist.

YOUR GOAL:
You will be fed the raw text content or HTML of a webpage. Your mission is to analyze this content and synthesize a comprehensive, "God Mode" suite of SEO, Open Graph, and Twitter Card metadata. You must maximize search visibility, social sharing click-through rates, and technical compliance.

INPUT DATA:
[The user will provide website text/HTML here]

STRICT OUTPUT RULES:
1.  **Deep Analysis:** Identify the core value proposition, target audience, and primary keywords.
2.  **Title Strategy:** Create a title (50-60 chars) that is high-converting and keyword-rich.
3.  **Description Strategy:** Create a description (150-160 chars) that acts as a pitch for the page.
4.  **Coverage:** You must generate tags for Standard HTML, Open Graph (Facebook/LinkedIn), and Twitter/X Cards.
5.  **Format:** Return ONLY valid JSON. No markdown formatting, no conversational filler.

JSON SCHEMA (Strictly follow this structure):
{
  "standard": {
    "title": "String (Max 60 chars)",
    "description": "String (Max 160 chars)",
    "keywords": "String (Comma separated list of 8-10 high-value keywords)",
    "author": "String (Brand or Person name)",
    "robots": "index, follow",
    "canonical": "String (The base URL provided or inferred)",
    "language": "String (e.g., 'en_US')"
  },
  "og": {
    "og:title": "String (Optimized for social, can be slightly punchier than standard title)",
    "og:description": "String (Optimized for social click-throughs)",
    "og:type": "website",
    "og:url": "String (The canonical URL)",
    "og:image": "String (Placeholder URL or inferred image URL)",
    "og:site_name": "String (Brand Name)",
    "og:locale": "en_US"
  },
  "twitter": {
    "twitter:card": "summary_large_image",
    "twitter:site": "String (@username)",
    "twitter:creator": "String (@username)",
    "twitter:title": "String (Same as og:title)",
    "twitter:description": "String (Same as og:description)",
    "twitter:image": "String (Same as og:image)"
  },
  "extra": {
    "theme-color": "String (Hex code inferred from brand description e.g., #000000)",
    "application-name": "String"
  },
  "meta": {
    "score": 95,
    "reasoning": "String (Brief explanation of why these tags were chosen)"
  }
}

Example Input:
"Nano Banana is a tool that generates OGP tags using AI. It uses a neo-brutalist design."

Example Output:
{
  "standard": {
    "title": "Nano Banana | AI-Powered OGP Tag Generator",
    "description": "Boost your CTR with Nano Banana. The ultimate AI tool for generating optimized Open Graph meta tags and preview images in seconds.",
    "keywords": "ogp generator, meta tags, seo tool, ai seo, open graph, twitter cards, website preview",
    "author": "Nano Banana",
    "robots": "index, follow",
    "canonical": "https://nanobanana.app",
    "language": "en_US"
  },
  "og": {
    "og:title": "Generate Perfect OGP Tags with AI",
    "og:description": "Stop posting boring links. Nano Banana uses AI to create high-converting meta tags and images for your website.",
    "og:type": "website",
    "og:url": "https://nanobanana.app",
    "og:image": "https://nanobanana.app/og-image.jpg",
    "og:site_name": "Nano Banana",
    "og:locale": "en_US"
  },
  "twitter": {
    "twitter:card": "summary_large_image",
    "twitter:site": "@nanobanana",
    "twitter:creator": "@nanobanana",
    "twitter:title": "Generate Perfect OGP Tags with AI",
    "twitter:description": "Stop posting boring links. Nano Banana uses AI to create high-converting meta tags and images for your website.",
    "twitter:image": "https://nanobanana.app/og-image.jpg"
  },
  "extra": {
    "theme-color": "#FFDE00",
    "application-name": "Nano Banana"
  },
  "meta": {
    "score": 98,
    "reasoning": "Focused on 'AI' and 'Generator' keywords while using an active voice to drive clicks."
  }
}
`;

const TEXT_MODEL = process.env.GEMINI_TEXT_MODEL ?? 'gemini-2.0-pro-exp';
const IMAGE_MODEL =
  process.env.GEMINI_IMAGE_MODEL ?? 'gemini-2.0-flash-lite-preview-02-05';
const GEMINI_API_KEY =
  process.env.GEMINI_API_KEY ??
  process.env.GOOGLE_API_KEY ??
  process.env.GENAI_API_KEY;

let cachedClient;

function getClient() {
  if (!GEMINI_API_KEY) {
    throw new Error(
      'Missing Gemini API key (set GEMINI_API_KEY or GOOGLE_API_KEY).'
    );
  }

  if (!cachedClient) {
    cachedClient = new GoogleGenerativeAI(GEMINI_API_KEY);
  }

  return cachedClient;
}

function stripHtml(html = '') {
  return html
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function truncate(content = '', limit = 6000) {
  if (content.length <= limit) return content;
  return `${content.slice(0, limit)}...`;
}

function buildInlineImagePart(dataUrl = '') {
  if (!dataUrl) {
    throw new Error('Screenshot data is required.');
  }

  const match = dataUrl.match(/^data:(.*?);base64,(.*)$/);
  if (match) {
    return {
      inlineData: {
        mimeType: match[1] || 'image/jpeg',
        data: match[2],
      },
    };
  }

  return {
    inlineData: {
      mimeType: 'image/jpeg',
      data: dataUrl,
    },
  };
}

export async function generateMetaTagsFromHtml(htmlContent = {}, options = {}) {
  const { url, language = 'en_US' } = options;
  const head = stripHtml(htmlContent.head ?? '');
  const body = stripHtml(htmlContent.body ?? '');
  const combined = truncate(`${head}\n\n${body}`.trim(), 10000);

  const model = getClient().getGenerativeModel({
    model: TEXT_MODEL,
    generationConfig: {
      temperature: 0.25,
      topP: 0.9,
      topK: 40,
      maxOutputTokens: 1024,
      responseMimeType: 'application/json',
    },
  });

  const payload = `${geminiAiTextPrompt}\n\nINPUT DATA:\n${combined}\n\nCANONICAL URL: ${url ?? 'unknown'}\nLANGUAGE: ${language}`;

  const result = await model.generateContent({
    contents: [
      {
        role: 'user',
        parts: [{ text: payload }],
      },
    ],
  });

  const rawText = result.response?.text?.();
  if (!rawText) {
    throw new Error('Gemini did not return metadata text.');
  }

  try {
    return JSON.parse(rawText);
  } catch (err) {
    throw new Error(`Unable to parse Gemini metadata JSON: ${err.message}`);
  }
}

export async function generateOgpPromptFromScreenshot(screenshotDataUrl) {
  if (!screenshotDataUrl) {
    throw new Error('Screenshot data URL is required.');
  }

  const model = getClient().getGenerativeModel({
    model: TEXT_MODEL,
    generationConfig: {
      temperature: 0.4,
      topP: 0.95,
      topK: 64,
      maxOutputTokens: 512,
      responseMimeType: 'text/plain',
    },
  });

  const result = await model.generateContent({
    contents: [
      {
        role: 'user',
        parts: [
          { text: nanoBananaPrompt },
          buildInlineImagePart(screenshotDataUrl),
        ],
      },
    ],
  });

  const promptText = result.response?.text?.();
  if (!promptText) {
    throw new Error('Gemini did not return an OGP prompt.');
  }

  return promptText.trim();
}
