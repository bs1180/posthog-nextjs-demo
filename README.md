This is a simple demo of a Next.js application using PostHog.

## Getting started

### 1. Install dependencies

```bash
npm install
# or
pnpm install
```

### 2. Configure environment variables

Create a `.env.local` file in the root directory:

```bash
NEXT_PUBLIC_POSTHOG_KEY=your_posthog_project_api_key
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
```

Get your PostHog API key from your [PostHog project settings](https://app.posthog.com/project/settings).

### 3. Run the development server

```bash
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the app.

## Key integration points

### Client-side initialization (instrumentation-client.ts)

```typescript
import posthog from "posthog-js"

posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
  api_host: "/ingest",
  ui_host: "https://us.posthog.com",
  defaults: '2025-05-24',
  capture_exceptions: true,
  debug: process.env.NODE_ENV === "development",
});
```

### User identification (AuthContext.tsx)

```typescript
posthog.identify(username, {
  username: username,
});
```

### Server-side tracking (app/api/auth/login/route.ts)

```typescript
const posthog = getPostHogClient();
posthog.capture({
  distinctId: username,
  event: 'server_login',
  properties: { ... }
});
```

## Learn more

- [PostHog Documentation](https://posthog.com/docs)
- [Next.js App Router Documentation](https://nextjs.org/docs/app)
- [PostHog Next.js Integration Guide](https://posthog.com/docs/libraries/next-js)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
