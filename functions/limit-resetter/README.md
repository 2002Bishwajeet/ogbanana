# Limit Resetter

Automated Appwrite function that resets API usage limits for all users based on their subscription plan.

## 🎯 Purpose

This function is designed to run on a schedule (e.g., daily or monthly) to reset user API limits:

- **Free Plan**: Resets limit to 5 requests
- **Pro Plan**: Resets limit to 50 requests

The function fetches all users from the Appwrite Users service, checks their plan preference, and updates their usage limit accordingly.

## 🧰 Usage

This function is meant to be triggered automatically via Appwrite's scheduled execution or manually via API call with admin privileges.

### POST /

Processes all users and resets their limits based on their plan.

**Response**

Sample `200` Response:

```json
{
  "success": true,
  "usersProcessed": 42,
  "message": "Limits reset successfully"
}
```

Sample `500` Error Response:

```json
{
  "success": false,
  "error": "Could not process users: [error details]"
}
```

## ⚙️ Configuration

| Setting           | Value                          |
| ----------------- | ------------------------------ |
| Runtime           | Bun (1.0)                      |
| Entrypoint        | `src/main.ts`                  |
| Build Commands    | `bun install`                  |
| Permissions       | `any`                          |
| Timeout (Seconds) | 60                             |
| Scopes            | `users.read`, `users.write`    |
| Execute Access    | Admins only (requires API key) |

## 🔒 Environment Variables

No additional environment variables required. The function uses the built-in Appwrite environment variables:

- `APPWRITE_FUNCTION_API_ENDPOINT`
- `APPWRITE_FUNCTION_PROJECT_ID`

## 🔐 Security

This function requires an API key to be passed in the request headers (`x-appwrite-key`) for authentication. Only admin users with proper API keys should be able to trigger this function.

## 📝 User Preferences Structure

The function expects users to have the following preference structure:

```json
{
  "plan": "free" | "pro",
  "limit": 5 | 50
}
```

If a user doesn't have a `plan` preference set, they default to the free plan with a limit of 5.
