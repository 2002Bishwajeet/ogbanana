import { execSync } from 'child_process';

export const GEMINI_LIMIT_MESSAGE =
  'Limits Exceed, Contact Developer to fix it';

const normalizeString = (value) =>
  typeof value === 'string' ? value.toLowerCase() : undefined;

const hasQuotaKeywords = (text) =>
  typeof text === 'string' &&
  (text.includes('resource_exhausted') || text.includes('quota exceeded'));

export const isGeminiQuotaError = (err) => {
  if (!err) return false;

  if (typeof err === 'string') {
    return hasQuotaKeywords(err.toLowerCase());
  }

  const numericCandidates = [
    err.code,
    err.statusCode,
    err?.response?.status,
    err?.response?.data?.code,
    err?.response?.data?.error?.code,
    err?.error?.code,
  ]
    .map((value) => Number(value))
    .filter((value) => !Number.isNaN(value));

  if (numericCandidates.some((code) => code === 429)) {
    return true;
  }

  const stringCandidates = [
    err.status,
    err?.error?.status,
    err?.response?.data?.error?.status,
    err.message,
    err?.response?.data?.error?.message,
  ]
    .map((value) => normalizeString(value))
    .filter(Boolean);

  if (stringCandidates.some(hasQuotaKeywords)) {
    return true;
  }

  if (typeof err.message === 'string') {
    const jsonStart = err.message.indexOf('{');
    if (jsonStart !== -1) {
      try {
        const parsed = JSON.parse(err.message.slice(jsonStart));
        return isGeminiQuotaError(parsed);
      } catch {
        // Ignore parse errors from non-JSON messages
      }
    }
  }

  return false;
};

export function stripHtml(html = '') {
  return html
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export const ensureChromiumAvailable = (log) => {
  try {
    log('Verifying Chromium installation...');
    execSync('chromium-browser --version', { stdio: 'ignore' });
    log('Chromium is already installed.');
  } catch {
    log('Installing Chromium and dependencies...');
    try {
      execSync(
        'apk update && apk add --no-cache chromium nss freetype harfbuzz ca-certificates ttf-freefont',
        { stdio: 'inherit' }
      );
      log('Chromium installed successfully.');
    } catch (installError) {
      const message =
        installError instanceof Error
          ? installError.message
          : String(installError);
      throw new Error(`Chromium installation failed: ${message}`);
    }
  }
};

export function truncate(content = '', limit = 6000) {
  if (content.length <= limit) return content;
  return `${content.slice(0, limit)}...`;
}

export function buildInlineImagePart(dataUrl = '') {
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

export function extractSection(html, tagName) {
  if (!html) return '';
  const regex = new RegExp(`<${tagName}[^>]*>([\\s\\S]*?)<\\/${tagName}>`, 'i');
  const match = html.match(regex);
  return match ? match[1] : '';
}

export function sanitizeHtml(html = '') {
  const SCRIPT_TAG_REGEX =
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
  const EVENT_HANDLER_ATTR_REGEX = /\son[a-z]+\s*=\s*("[^"]*"|'[^']*')/gi;
  const JS_URL_ATTR_REGEX =
    /(href|src)\s*=\s*("javascript:[^"]*"|'javascript:[^']*')/gi;

  return html
    .replace(SCRIPT_TAG_REGEX, '')
    .replace(EVENT_HANDLER_ATTR_REGEX, '')
    .replace(JS_URL_ATTR_REGEX, (match, attr) => `${attr}="#"`)
    .trim();
}

export function bodyLooksEmpty(html, extractSection) {
  const body = extractSection(html, 'body');
  if (!body) return true;
  const textOnly = body
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/gi, '')
    .trim();
  return textOnly.length === 0;
}

export function needsBrowserRender(html, bodyLooksEmpty, extractSection) {
  const NOSCRIPT_WARNING_REGEX =
    /<noscript[^>]*>[\s\S]*?javascript[\s\S]*?<\/noscript>/i;
  const JS_HINT_PATTERNS = [
    /needs\s+javascript/i,
    /requires\s+javascript/i,
    /enable\s+javascript/i,
    /please\s+turn\s+on\s+javascript/i,
  ];

  if (!html) return true;
  if (NOSCRIPT_WARNING_REGEX.test(html)) return true;
  const lowered = html.toLowerCase();
  if (JS_HINT_PATTERNS.some((pattern) => pattern.test(lowered))) return true;
  return bodyLooksEmpty(html, extractSection);
}

export function bytesToBase64(bytes) {
  return Buffer.from(bytes).toString('base64');
}
