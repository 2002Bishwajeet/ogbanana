# GEMINI.md - OGPBanana Project

## Project Overview

OGPBanana is a full-stack web application designed to generate Open Graph Protocol (OGP) meta tags for any given URL. The application provides a user-friendly interface to input a URL and optional context, and then uses AI to generate optimized OGP title, description, and a preview image.

The project is built with a modern tech stack:

- **Frontend:**

  - **Framework:** React with TypeScript, built with Vite.
  - **Styling:** Tailwind CSS with a custom "Neobrutalism" theme.
  - **State Management:** TanStack Query (React Query) for server state management.
  - **Routing:** React Router.
  - **UI Components:** A mix of custom components and `lucide-react` for icons.

- **Backend:**

  - **Platform:** Appwrite Cloud.
  - **Serverless Function:** A Node.js function (`generateOgpData`) handles the core logic of scraping, AI generation, and image processing.
  - **Authentication:** Appwrite is used for user authentication and to manage user credits.

- **AI Integration:**
  - The backend function leverages a generative AI model (likely via a library in `genai.js`) to produce the OGP meta tags and a preview image based on the scraped content of the provided URL.

## Building and Running

### Prerequisites

- Node.js and a package manager (like `pnpm` or `npm`).
- An Appwrite Cloud project.

### Environment Setup

Create a `.env` file in the root of the project and add the following variables with your Appwrite project details:

```
VITE_APPWRITE_ENDPOINT="<YOUR_APPWRITE_ENDPOINT>"
VITE_APPWRITE_PROJECT="<YOUR_APPWRITE_PROJECT_ID>"
VITE_APPWRITE_FUNCTION_ID_OGP="<YOUR_OGP_FUNCTION_ID>"
```

### Running the Development Server

1.  Install dependencies:
    ```bash
    pnpm install
    ```
2.  Start the Vite development server:
    ```bash
    pnpm run dev
    ```
    The application will be available at `http://localhost:5173`.

### Building for Production

To create a production build of the frontend:

```bash
pnpm run build
```

The output will be in the `dist/` directory.

### Linting

To check the code for any linting errors:

```bash
pnpm run lint
```

## Development Conventions

- **Component-Based Architecture:** The frontend is organized into pages, components, and providers, promoting reusability and separation of concerns.
- **Strict TypeScript:** The project uses TypeScript, and all new code should be strictly typed. Avoid using `any` and define clear interfaces for props, API responses, and other data structures.
- **API Calls with React Query:** All asynchronous API calls must be managed through TanStack Query (React Query). This ensures efficient caching, optimistic updates, and a consistent approach to data fetching and server state management.
- **Performance Optimization:**
  - **`useTransition`:** For updates that might cause a noticeable lag in the UI (e.g., filtering a large list), use the `useTransition` hook to keep the interface responsive.
  - **Lazy Loading:** For large pages or components that are not required for the initial render, use `React.lazy` and Suspense to code-split and load them on demand. This improves initial page load performance.
- **When to Use `useEffect`:** Effects are for synchronizing with external systems. Avoid using `useEffect` for logic that can be handled during rendering or in response to user events. According to the official React documentation, you might not need an Effect if you are:
    - **Transforming data for rendering:** Calculations and filtering should be done directly in your component's rendering logic. Use `useMemo` to cache expensive calculations.
    - **Handling user events:** Logic that runs in response to a user action (like a button click) should be placed in the corresponding event handler.
    - **Updating state based on props or other state (Derived State):** If a value can be computed from existing props or state, calculate it during rendering instead of storing it in a separate state variable.
- **Styling:** The project uses Tailwind CSS with a custom "Neobrutalism" theme, configured directly within CSS files. UI components like `NeoButton` and `NeoCard` provide a consistent look and feel.
- **Error Handling:** The application uses a custom `ErrorBoundary` component to catch and handle rendering errors, and `ErrorToast` to display errors to the user.
- **Serverless Backend:** The backend logic is encapsulated in Appwrite serverless functions, which are independently deployable and scalable.
- **Modularity:** If a piece of UI or logic can be made into a separate, reusable component, it should be. This promotes maintainability and reusability.

## Reporting Issues

If you encounter any bugs or have suggestions for improvements, please report them on the project's [GitHub Issues page](https://github.com/ogpbanana/ogpbanana/issues).


