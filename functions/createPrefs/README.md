# createPrefs

Serverless helper that stamps every newly created Appwrite user with default preferences:

```ts
{
  plan: "free",
  credits: 5
}
```

## 🧰 Usage

### Automatic trigger — `users.*.create`

1. Configure the function in Appwrite to subscribe to the `users.*.create` event.
2. Appwrite forwards the event payload (including the new user `$id`) and an `x-appwrite-event` header to this function.
3. The function calls `users.updatePrefs` for that user, merging any existing preferences with the defaults above.

**Sample event body**

```json
{
  "events": ["users.*.create"],
  "payload": {
    "$id": "USER_ID",
    "prefs": {}
  }
}
```

The caller (Appwrite) must also provide an admin API key via the `x-appwrite-key` header so the function can update user prefs.

### GET /ping

Simple health-check endpoint that returns `Pong` for uptime probes.

## ⚙️ Configuration

| Setting           | Value         |
| ----------------- | ------------- |
| Runtime           | Bun (1.0)     |
| Entrypoint        | `src/main.ts` |
| Build Commands    | `bun install` |
| Permissions       | `any`         |
| Timeout (Seconds) | 15            |
| Scopes            | `users.write` |

## 🔒 Environment Variables

| Name                               | Description                              |
| ---------------------------------- | ---------------------------------------- |
| `APPWRITE_FUNCTION_API_ENDPOINT`   | Appwrite endpoint used by the SDK client |
| `APPWRITE_FUNCTION_PROJECT_ID`     | Project ID hosting the users collection  |

> These are injected automatically when running inside the Appwrite Functions runtime.
