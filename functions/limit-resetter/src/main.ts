import { Client, Users } from "node-appwrite";

interface UserPrefs {
  plan?: string;
  limit?: number;
  [key: string]: unknown;
}


// This Appwrite function will be executed every time your function is triggered
export default async ({ req, res, log, error }: any) => {
  // You can use the Appwrite SDK to interact with other services
  // For this example, we're using the Users service
  const client = new Client()
    .setEndpoint(Bun.env["APPWRITE_FUNCTION_API_ENDPOINT"])
    .setProject(Bun.env["APPWRITE_FUNCTION_PROJECT_ID"])
    .setKey(req.headers['x-appwrite-key'] ?? '');
  const users = new Users(client);

  try {
    let usersProcessed = 0;
    let hasMore = true;

    while (hasMore) {
      const response = await users.list();
      log(`Fetched ${response.users.length} users`);

      for (const user of response.users) {
        try {
          // Get user preferences to check the plan
          const prefs = user.prefs as UserPrefs || {};
          const plan = prefs.plan || 'free'; // Default to free if not set

          // Determine the limit based on plan
          let newLimit = 5; // Default for free plan
          if (plan === 'pro') {
            newLimit = 50;
          }

          // Update user preferences with the new limit
          await users.updatePrefs(user.$id, {
            ...prefs,
            limit: newLimit
          });

          usersProcessed++;
          log(`Reset limit for user ${user.$id} (plan: ${plan}) to ${newLimit}`);
        } catch (userError: unknown) {
          const errorMsg = userError instanceof Error ? userError.message : String(userError);
          error(`Failed to update user ${user.$id}: ${errorMsg}`);
        }
      }

      // Process all users in single batch
      hasMore = false;
    }

    log(`Successfully processed ${usersProcessed} users`);

    return res.json({
      success: true,
      usersProcessed,
      message: "Limits reset successfully"
    });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    error("Could not process users: " + errorMessage);
    return res.json({
      success: false,
      error: errorMessage
    }, 500);
  }
};
