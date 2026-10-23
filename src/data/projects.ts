export type Project = {
  slug: string;
  title: string;
  tagline: string;
  featured: boolean;
  stack: string[];
  cover: string;
  links: { live?: string; repo?: string };
  problem: string;
  solution: string;
  highlights: string[];
  lessons: string[];
  gallery?: { src: string; alt: string }[];
};

export const projects: Project[] = [
  {
    slug: "mini-jira",
    title: "Mini Jira",
    tagline:
      "Full-stack Kanban issue tracker with OAuth, per-project roles and signed webhooks",
    featured: true,
    stack: [
      "Next.js 16",
      "TypeScript",
      "Tailwind CSS",
      "MongoDB Atlas",
      "Mongoose",
      "Auth.js v5",
      "dnd-kit",
      "Zod",
      "Vitest",
      "Vercel",
    ],
    cover: "/projects/mini-jira/cover.png",
    links: {
      live: "https://mini-jira-tan.vercel.app",
      // TODO: repo URL
    },
    problem: "TODO: why Mini Jira exists (your own words)",
    solution:
      "A Jira-style project and issue tracker built on the Next.js 16 App Router with Server Actions and Cache Components. Users sign in with GitHub or Google (Auth.js v5, JWT sessions), create projects, and move issues across a Kanban board.",
    highlights: [
      "Per-project Admin/Member roles, checked on the server in every Server Action",
      "Kanban drag & drop with float ordering, so a move updates a single document",
      "Atomic issue numbers (MJ-12) via $inc plus a unique index",
      "Account linking by email across GitHub and Google",
      "HMAC-SHA256 signed webhooks to n8n, which sends LINE alerts when an issue is created or its priority changes",
    ],
    lessons: [
      "Atlas SRV DNS failures: switching to the legacy connection string fixed them",
      "Stale auth cookies after rotating AUTH_SECRET cause redirect loops and PKCE errors",
      "Cache Components prerender errors come from non-deterministic values such as crypto",
      "Vercel env var changes need a redeploy; keep separate dev and prod databases",
    ],
  },
  {
    slug: "n8n-automations",
    title: "n8n Automations",
    tagline: "LINE to Google Drive file bot and Mini Jira alert pipeline on self-hosted n8n",
    featured: true,
    stack: ["n8n", "LINE Messaging API", "Google Drive API", "ngrok", "HMAC-SHA256"],
    cover: "/projects/n8n-automations/cover.png",
    links: {
      // TODO: repo URL (if any)
    },
    problem: "TODO: why these automations exist (your own words)",
    solution:
      "Self-hosted n8n exposed through an ngrok static domain, running two workflows: a LINE bot that saves files to Google Drive, and a webhook receiver that turns Mini Jira events into LINE alerts.",
    highlights: [
      "LINE to Drive bot: any image, video, audio or file sent to a LINE OA is downloaded from the LINE content API, uploaded to Drive with a timestamped name, and confirmed with a reply",
      "Mini Jira alerts: webhook with HMAC signature and 5-minute freshness check, then a LINE push to a separate Mini Jira Alerts OA with priority colour (green, orange, red)",
    ],
    lessons: [
      "n8n 2.x: Save is not Publish; production webhooks run the published version",
      "A Windows console in QuickEdit mode can freeze the n8n process",
      "LINE user IDs are per provider, and each OA needs its own channel token",
      "Publish the Google OAuth app to avoid 7-day token expiry",
    ],
  },
  {
    slug: "pomodoro",
    title: "Pomodoro",
    tagline: "TODO: one-line description",
    featured: true,
    stack: ["Firebase Hosting", "Service Worker", "TODO: confirm rest of stack"],
    cover: "/projects/pomodoro/cover.png",
    links: {
      // TODO: live URL and repo URL
    },
    problem: "TODO",
    solution:
      "TODO: capstone project. Known: deployed on Firebase Hosting; the service-worker cache version is bumped automatically on deploy by a predeploy script.",
    highlights: ["TODO"],
    lessons: ["TODO"],
  },
];
