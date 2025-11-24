import { Client, TablesDB, ID, Permission, Role, Users } from 'node-appwrite';
import { scrapeWebsite } from './scraper.js';
import {
  generateMetaTagsFromHtml,
  generateOgpPromptFromScreenshot,
  generateOgpImage,
} from './genai.js';
import { compressOgpImage, compressScreenshotForAi } from './compressor.js';
import {
  ensureChromiumAvailable,
  GEMINI_LIMIT_MESSAGE,
  isGeminiQuotaError,
} from './utils.js';

const OG_DATA_DATABASE_ID = process.env.OG_DATA_DATABASE_ID ?? 'og-data';
const OGP_COLLECTION_ID = process.env.OGP_COLLECTION_ID ?? 'ogp';

// This Appwrite function will be executed every time your function is triggered
export default async ({ req, res, log, error }) => {
  const client = new Client()
    .setEndpoint(process.env.APPWRITE_FUNCTION_API_ENDPOINT)
    .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
    .setKey(req.headers['x-appwrite-key'] ?? '');

  const users = new Users(client);
  const tablesDB = new TablesDB(client);

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
    const executionId = req.headers['x-appwrite-execution-id'];

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

      // 2. Generate meta tags in parallel with Nano Banana prompt derivation
      log('Generating meta tags and Nano Banana prompt...');
      const metaTags = await generateMetaTagsFromHtml(content, {
        url: targetUrl,
        contextText,
      });

      let ogpPrompt = null;
      if (screenshot) {
        log('Compressing screenshot for AI analysis...');
        const compressedScreenshot = await compressScreenshotForAi(screenshot);
        ogpPrompt = await generateOgpPromptFromScreenshot(compressedScreenshot);
      }

      // 3. Generate image if a prompt exists
      let rawOgpImage = null;
      if (ogpPrompt) {
        log('Generating OGP image from Nano Banana prompt...');
        rawOgpImage = await generateOgpImage(ogpPrompt);
      }

      // 4. Compress the generated image (if exists)
      let ogpImage = null;
      if (rawOgpImage) {
        log('Compressing OGP image...');
        ogpImage = await compressOgpImage(rawOgpImage);
      }

      if (OG_DATA_DATABASE_ID && OGP_COLLECTION_ID) {
        const encryptedContent = JSON.stringify({
          url: targetUrl,
          meta: metaTags,
          ogpImage,
        });

        const documentId = executionId ?? ID.unique();
        const permissions = [Permission.read(Role.user(userId))];

        try {
          log(`Persisting OGP payload in collection ${OGP_COLLECTION_ID}...`);
          await tablesDB.createRow({
            databaseId: OG_DATA_DATABASE_ID,
            tableId: OGP_COLLECTION_ID,
            rowId: documentId,
            data: {
              executionId: executionId ?? null,
              encryptedContent,
            },
            permissions: permissions,
          });
        } catch (dbError) {
          const dbMessage =
            dbError instanceof Error ? dbError.message : String(dbError);
          error(`Failed to save OGP payload: ${dbMessage}`);
        }
      }

      // 5. Deduct credit after successful processing
      const newCredits = Math.max(0, currentCredits - 1);
      log(`Deducting 1 credit. New balance: ${newCredits}`);
      await users.updatePrefs(userId, {
        ...userPrefs,
        credits: newCredits,
      });

      log('Success!');
      /// TODO(Biswa): Since this is not returned when the function is executed asynchronously, we have to store it in the database.
      /// Alternatively, make it E2E encrypted and then store in the future
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
      if (isGeminiQuotaError(err)) {
        error(GEMINI_LIMIT_MESSAGE);
        return res.json({ error: GEMINI_LIMIT_MESSAGE }, 429);
      }

      const message = err instanceof Error ? err.message : String(err);
      error(`Error processing ${targetUrl}: ${message}`);
      return res.json({ error: message }, 500);
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
