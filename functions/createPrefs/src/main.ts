import { Client, Users } from "node-appwrite";

declare const Bun: {
  env: Record<string, string | undefined>;
};

type AppwriteFunctionContext = {
  req: {
    path?: string;
    method?: string;
    bodyText?: string;
    headers: Record<string, string | undefined>;
  };
  res: {
    text: (body: string, status?: number) => unknown;
    json: (body: unknown, status?: number) => unknown;
  };
  log: (message: string) => void;
  error: (message: string) => void;
};

type UserCreateEvent = {
  events?: string[];
  payload?: {
    $id?: string;
    prefs?: Record<string, unknown>;
  };
  userId?: string;
};

const DEFAULT_PREFS = {
  plan: "free" as const,
  credits: 5,
};

// This Appwrite function is triggered from the users.*.create event to seed default prefs
export default async ({ req, res, log, error }: AppwriteFunctionContext) => {
  const client = new Client()
    .setEndpoint(Bun.env["APPWRITE_FUNCTION_API_ENDPOINT"] ?? "")
    .setProject(Bun.env["APPWRITE_FUNCTION_PROJECT_ID"] ?? "")
    .setKey(req.headers["x-appwrite-key"] ?? "");
  const users = new Users(client);

  if (req.path === "/ping") {
    return res.text("Pong");
  }

  const eventName = (req.headers["x-appwrite-event"] as string | undefined) ?? "";

  if (!eventName) {
    log("Missing Appwrite event header. No preferences updated.");
    return res.json({ success: false, message: "Missing Appwrite event header" }, 400);
  }

  if (!eventName.startsWith("users.") || !eventName.endsWith(".create")) {
    log(`Ignoring unrelated event: ${eventName}`);
    return res.json({ success: true, message: `Ignored event ${eventName}` });
  }

  let parsedBody: UserCreateEvent | null = null;

  try {
    parsedBody = req.bodyText ? (JSON.parse(req.bodyText) as UserCreateEvent) : null;
  } catch (parseError) {
    const message = parseError instanceof Error ? parseError.message : String(parseError);
    error(`Invalid JSON body: ${message}`);
    return res.json({ success: false, message: "Invalid JSON body" }, 400);
  }

  const userId = parsedBody?.payload?.$id ?? parsedBody?.userId;

  if (!userId) {
    log("User ID missing from event payload.");
    return res.json({ success: false, message: "User ID missing from payload" }, 400);
  }

  const existingPrefs =
    parsedBody?.payload?.prefs && typeof parsedBody.payload.prefs === "object"
      ? parsedBody.payload.prefs
      : {};

  try {
    await users.updatePrefs(userId, {
      ...existingPrefs,
      ...DEFAULT_PREFS,
    });
    log(`Default preferences set for user ${userId}`);
    return res.json({ success: true, userId, prefs: DEFAULT_PREFS });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    error(`Could not update prefs for user ${userId}: ${message}`);
    return res.json({ success: false, message }, 500);
  }
};
