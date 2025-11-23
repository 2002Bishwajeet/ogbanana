export function stripHtml(html = '') {
  return html
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

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
