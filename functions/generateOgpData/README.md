# Generate OGP Data

AI-powered Open Graph Protocol (OGP) metadata and social preview image generator for any website.

## 🎯 Purpose

This Appwrite function uses AI to automatically generate:

- **SEO-optimized meta tags** (title, description, keywords)
- **Open Graph tags** for social media sharing
- **Twitter Card metadata**
- **AI-generated OGP preview images** (1200x630) that match the website's visual identity

The function scrapes any URL, analyzes its content and design using Google Gemini AI, and returns comprehensive metadata plus a brand-matched social preview image.

## 🧰 Usage

### GET /ping

Health check endpoint.

**Response**

Sample `200` Response:

```text
Pong
```

### POST /meta

Generate OGP metadata and preview image for a given URL.

**Request Headers**

- `x-appwrite-user-id` (required): User ID for credit tracking
- `x-appwrite-key` (required): API key for authentication

**Request Body**

```json
{
  "targetUrl": "https://example.com",
  "contextText": "Optional context to guide AI generation"
}
```

**Response**

Sample `200` Response:

```json
{
  "url": "https://example.com",
  "meta": {
    "title": "Example Domain",
    "description": "This domain is for use in illustrative examples...",
    "keywords": ["example", "domain", "documentation"],
    "ogTitle": "Example Domain - Learn More",
    "ogDescription": "Comprehensive example domain for documentation...",
    "ogType": "website",
    "twitterCard": "summary_large_image",
    "twitterTitle": "Example Domain",
    "twitterDescription": "Example domain for illustrative purposes..."
  },
  "ogpImage": "base64-encoded-image-data",
  "creditsRemaining": 4
}
```

Sample `402` Response (Insufficient Credits):

```json
{
  "error": "You are out of credits. Please purchase more to continue.",
  "credits": 0
}
```

Sample `400` Response (Invalid Request):

```json
{
  "error": "Missing 'targetUrl' field"
}
```

### GET / (Default)

Returns API information and available endpoints.

**Response**

```json
{
  "message": "OGP Generator API",
  "endpoints": {
    "/ping": "GET - Health check",
    "/meta": "POST - Generate OGP meta tags and image"
  }
}
```

## 🔄 Processing Pipeline

1. **User Validation**: Checks user credits before processing
2. **Web Scraping**: Uses Puppeteer to fetch HTML content and capture screenshot
3. **Parallel AI Generation**:
   - Google Gemini analyzes HTML to generate comprehensive meta tags
   - Google Gemini analyzes screenshot to generate brand-matched OGP image
4. **Image Compression**: Uses Sharp to compress the generated image
5. **Credit Deduction**: Deducts 1 credit from user's balance
6. **Response**: Returns metadata + compressed image + remaining credits

## ⚙️ Configuration

| Setting           | Value                             |
| ----------------- | --------------------------------- |
| Runtime           | Node (18.0)                       |
| Entrypoint        | `src/main.js`                     |
| Build Commands    | `npm install`                     |
| Permissions       | `any`                             |
| Timeout (Seconds) | 300 (5 minutes for AI processing) |
| Scopes            | `users.read`, `users.write`       |

## 🔒 Environment Variables

| Variable Name                    | Description                             | Required |
| -------------------------------- | --------------------------------------- | -------- |
| `APPWRITE_FUNCTION_API_ENDPOINT` | Appwrite API endpoint (auto-provided)   | Yes      |
| `APPWRITE_FUNCTION_PROJECT_ID`   | Appwrite project ID (auto-provided)     | Yes      |
| `GEMINI_API_KEY`                 | Google Gemini API key for AI generation | Yes      |

## 💳 Credit System

Each successful generation costs **1 credit**. The function:

- Checks user's credit balance before processing
- Returns `402` error if credits are insufficient
- Deducts 1 credit only after successful generation
- Returns remaining credits in the response

## 🧩 Module Structure

- **`main.js`**: Main entry point, handles routing and orchestration
- **`scraper.js`**: Puppeteer-based web scraping and screenshot capture
- **`genai.js`**: Google Gemini AI integration for meta tag and image generation
- **`compressor.js`**: Sharp-based image compression for optimized delivery
- **`utils.js`**: Shared utility functions for HTML parsing and data formatting

## 🤖 AI Capabilities

### Nano Banana (Image Generation)

AI agent that analyzes website screenshots to:

- Extract color palettes, typography, and UI patterns
- Generate 1200x630 OGP images that match the brand identity
- Ensure visual consistency with the source website

### Technical SEO Architect (Meta Generation)

AI agent that analyzes webpage content to:

- Generate SEO-optimized titles and descriptions
- Create comprehensive Open Graph metadata
- Generate Twitter Card tags
- Extract relevant keywords and entities
