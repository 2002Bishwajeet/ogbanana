import puppeteer from 'puppeteer';
import {
  extractSection,
  sanitizeHtml,
  bodyLooksEmpty,
  needsBrowserRender,
} from './utils.js';

const USER_AGENT =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36';
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

  if (needsBrowserRender(workingHtml, bodyLooksEmpty, extractSection)) {
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
