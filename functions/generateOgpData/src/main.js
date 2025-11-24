import { Client, Users } from 'node-appwrite';
import { scrapeWebsite } from './scraper.js';
import { generateMetaTagsFromHtml, generateOgpImage } from './genai.js';
import { compressOgpImage } from './compressor.js';
import { ensureChromiumAvailable } from './utils.js';

// This Appwrite function will be executed every time your function is triggered
export default async ({ req, res, log, error }) => {
  const client = new Client()
    .setEndpoint(process.env.APPWRITE_FUNCTION_API_ENDPOINT)
    .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
    .setKey(req.headers['x-appwrite-key'] ?? '');

  const users = new Users(client);

  // Handle /ping path (GET)
  if (req.path === '/ping') {
    return res.text('Pong');
  }

  // Handle /meta path (POST only)
  if (req.path === '/meta') {
    if (req.method !== 'POST') {
      return res.json({ error: 'Method not allowed. Use POST.' }, 405);
    }

    // Get user ID from request
    const userId = req.headers['x-appwrite-user-id'];
    if (!userId) {
      return res.json({ error: 'Unauthorized. User ID is required.' }, 401);
    }

    let targetUrl, contextText;
    try {
      const body = JSON.parse(req.bodyText);
      targetUrl = body.targetUrl;
      contextText = body.contextText || '';
    } catch (err) {
      return res.json({ error: 'Invalid JSON body' }, 400);
    }

    if (!targetUrl) {
      return res.json({ error: 'Missing "targetUrl" field' }, 400);
    }

    try {
      // Check user credits before processing
      log(`Checking credits for user: ${userId}`);
      const userPrefs = await users.getPrefs(userId);
      const currentCredits = userPrefs.credits ?? 0;

      if (currentCredits <= 0) {
        return res.json(
          {
            error: 'You are out of credits. Please purchase more to continue.',
            credits: 0,
          },
          402
        );
      }

      log(`User has ${currentCredits} credits. Processing request...`);
      log(`Processing URL: ${targetUrl}`);

      try {
        ensureChromiumAvailable(log);
      } catch (chromiumError) {
        const message =
          chromiumError instanceof Error
            ? chromiumError.message
            : String(chromiumError);
        error(message);
        return res.json({ error: message }, 500);
      }

      // 1. Scrape the website
      log('Scraping website...');
      const scrapeResult = await scrapeWebsite(targetUrl);
      const { content, screenshot } = scrapeResult;

      // 2 & 3. Parallelize Meta Tags generation and OGP Image generation
      log('Generating meta tags and OGP image in parallel...');
      const [metaTags, rawOgpImage] = await Promise.all([
        generateMetaTagsFromHtml(content, { url: targetUrl, contextText }),
        screenshot ? generateOgpImage(screenshot) : Promise.resolve(null),
      ]);

      // 4. Compress the generated image (if exists)
      let ogpImage = null;
      if (rawOgpImage) {
        log('Compressing OGP image...');
        ogpImage = await compressOgpImage(rawOgpImage);
      }

      // 5. Deduct credit after successful processing
      const newCredits = Math.max(0, currentCredits - 1);
      log(`Deducting 1 credit. New balance: ${newCredits}`);
      await users.updatePrefs(userId, {
        ...userPrefs,
        credits: newCredits,
      });

      log('Success!');
      return res.json(
        {
          url: targetUrl,
          meta: metaTags,
          ogpImage,
          creditsRemaining: newCredits,
        },
        200
      );
    } catch (err) {
      error(`Error processing ${targetUrl}: ${err.message}`);
      return res.json({ error: err.message }, 500);
    }
  }

  // Default response
  return res.json({
    message: 'OGP Generator API',
    endpoints: {
      '/ping': 'GET - Health check',
      '/meta': 'POST - Generate OGP meta tags and image',
    },
  });
};
