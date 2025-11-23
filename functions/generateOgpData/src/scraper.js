import puppeteer from 'puppeteer';

const USER_AGENT =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36';
const JS_HINT_PATTERNS = [
  /needs\s+javascript/i,
  /requires\s+javascript/i,
  /enable\s+javascript/i,
  /please\s+turn\s+on\s+javascript/i,
];
const NOSCRIPT_WARNING_REGEX =
  /<noscript[^>]*>[\s\S]*?javascript[\s\S]*?<\/noscript>/i;
const SCRIPT_TAG_REGEX = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
const EVENT_HANDLER_ATTR_REGEX = /\son[a-z]+\s*=\s*("[^"]*"|'[^']*')/gi;
const JS_URL_ATTR_REGEX =
  /(href|src)\s*=\s*("javascript:[^"]*"|'javascript:[^']*')/gi;
const VIEWPORT = { width: 1280, height: 720 };

const PUPPETEER_ARGS = [
  '--no-sandbox',
  '--headless',
  '--disable-setuid-sandbox',
  '--disable-dev-shm-usage',
  '--disable-gpu',
];

async function fetchRawHtml(url) {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'User-Agent': USER_AGENT,
      Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    },
    redirect: 'follow',
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch ${url}: ${response.status} ${response.statusText}`
    );
  }

  const html = await response.text();
  return { html, finalUrl: response.url };
}

function extractSection(html, tagName) {
  if (!html) return '';
  const regex = new RegExp(`<${tagName}[^>]*>([\\s\\S]*?)<\\/${tagName}>`, 'i');
  const match = html.match(regex);
  return match ? match[1] : '';
}

function sanitizeHtml(html = '') {
  return html
    .replace(SCRIPT_TAG_REGEX, '')
    .replace(EVENT_HANDLER_ATTR_REGEX, '')
    .replace(JS_URL_ATTR_REGEX, (match, attr) => `${attr}="#"`)
    .trim();
}

function bodyLooksEmpty(html) {
  const body = extractSection(html, 'body');
  if (!body) return true;
  const textOnly = body
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/gi, '')
    .trim();
  return textOnly.length === 0;
}

function needsBrowserRender(html) {
  if (!html) return true;
  if (NOSCRIPT_WARNING_REGEX.test(html)) return true;
  const lowered = html.toLowerCase();
  if (JS_HINT_PATTERNS.some((pattern) => pattern.test(lowered))) return true;
  return bodyLooksEmpty(html);
}

async function browseWithPuppeteer(
  url,
  { captureHtml = true, takeScreenshot = true } = {}
) {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: '/usr/bin/chromium-browser', // path for running in appwrite functions
    args: PUPPETEER_ARGS,
  });

  try {
    const page = await browser.newPage();
    await page.setUserAgent({ userAgent: USER_AGENT });
    await page.setViewport(VIEWPORT);
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });

    const html = captureHtml ? await page.content() : undefined;
    let screenshotBase64;
    if (takeScreenshot) {
      const buffer = await page.screenshot({
        type: 'jpeg',
        quality: 60,
        fullPage: true,
        encoding: 'base64',
      });
      screenshotBase64 = buffer;
    }

    return {
      html,
      screenshot: screenshotBase64,
      finalUrl: page.url(),
    };
  } finally {
    await browser.close();
  }
}

async function captureScreenshotOnly(url) {
  const { screenshot, finalUrl } = await browseWithPuppeteer(url, {
    captureHtml: false,
    takeScreenshot: true,
  });
  return { screenshot, finalUrl };
}

export async function scrapeWebsite(url) {
  if (!url) {
    throw new Error('scrapeWebsite requires a URL');
  }

  const { html: initialHtml, finalUrl: fetchedUrl } = await fetchRawHtml(url);
  let workingHtml = initialHtml;
  let finalUrl = fetchedUrl || url;
  let screenshotBase64;

  if (needsBrowserRender(workingHtml)) {
    const {
      html: renderedHtml,
      screenshot,
      finalUrl: browserUrl,
    } = await browseWithPuppeteer(finalUrl, {
      captureHtml: true,
      takeScreenshot: true,
    });
    workingHtml = renderedHtml;
    finalUrl = browserUrl || finalUrl;
    screenshotBase64 = screenshot;
  } else {
    const { screenshot, finalUrl: screenshotUrl } =
      await captureScreenshotOnly(finalUrl);
    screenshotBase64 = screenshot;
    finalUrl = screenshotUrl || finalUrl;
  }

  const headHtml = sanitizeHtml(extractSection(workingHtml, 'head'));
  const bodyHtml = sanitizeHtml(extractSection(workingHtml, 'body'));

  return {
    url: finalUrl,
    content: {
      head: headHtml,
      body: bodyHtml,
    },
    screenshot: screenshotBase64
      ? `data:image/jpeg;base64,${screenshotBase64}`
      : null,
  };
}
