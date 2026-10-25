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
    cover: "/projects/mini-jira/board.png",
    links: {
      live: "https://mini-jira-tan.vercel.app",
      repo: "https://github.com/XANAX1990/Mini-jira",
    },
    problem: "Im too Lazy to be in office while at works so i build this because HR and people in office can ticket and i can work from home . ",
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
    cover: "/projects/n8n-automations/workflow.png",
    links: {},
    problem: "im just LAZY to do boring works and YEE i get predeploy on pomodoro and mini jira and n8n . so i decide to make a line bot for me to do the boring works , and its works ",
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
    gallery: [
      {
        src: "/projects/n8n-automations/line-reply.png",
        alt: "LINE chat showing the bot's confirmation reply after a file was saved to Google Drive",
      },
    ],
  },
  {
    slug: "status-page",
    title: "Status Page",
    tagline: "Public uptime page with automatic incidents and LINE alerts for the apps I run",
    featured: true,
    stack: [
      "Next.js 16",
      "TypeScript",
      "Tailwind CSS",
      "MongoDB Atlas",
      "Mongoose",
      "Zod",
      "Vitest",
      "cron-job.org",
      "LINE Messaging API",
      "Vercel",
    ],
    cover: "/projects/status-page/status.png",
    links: {
      live: "https://status-page-xan.vercel.app",
      repo: "https://github.com/XANAX1990/status-page",
    },
    problem:
      "My n8n runs on my own PC behind ngrok, so it goes down every time I shut the computer off, and nothing told me. I wanted one page showing what is up and how fast it is, plus an alert when something changes.",
    solution:
      "An external cron calls a protected Next.js route every 5 minutes. It checks Mini Jira, my portfolio, Pomodoro and n8n in parallel, stores each result in MongoDB, runs a small state machine to open and resolve incidents, and pushes a LINE message when a service goes down or recovers. A server-rendered page shows uptime, latency and incidents.",
    highlights: [
      "Down only after 2 failed checks in a row, so one timeout does not page me; alerts fire on state changes only (one on down, one on recovery)",
      "State machine and stats (uptime %, p95, 90-day daily buckets in Asia/Bangkok days) are pure functions with no I/O, covered by Vitest",
      "Alerts go straight to the LINE Messaging API, not through n8n, because n8n is one of the things being monitored",
      "The cron endpoint needs a bearer secret (constant-time compare); the public page and API responses never include monitor URLs",
      "Status page is a cached Server Component revalidated every 60 seconds; checks expire after 90 days with a MongoDB TTL index",
    ],
    lessons: [
      "Vercel's free plan only runs cron once a day, so an external scheduler (cron-job.org) calls the endpoint every 5 minutes",
      "With Cache Components on, a route handler is prerendered unless it touches request-time data; calling connection() keeps the cron route dynamic",
      "Raw fetch error messages can contain the target URL, so errors are reduced to short labels like timeout before they are stored or returned",
      "Mongoose does not change a TTL index that already exists; extending retention from 30 to 90 days needed collMod on Atlas",
    ],
  },
  {
    slug: "pomodoro",
    title: "Pomodoro",
    tagline: "A webapp that can run offline and push notification and pomodoro timer with ADHD Supports",
    featured: true,
    stack: ["Firebase Hosting", "Service Worker", "HTML", "CSS", "JavaScript"],
    cover: "/projects/pomodoro/timer.png",
    links: {
      live: "https://pomodoro-webapp-870c6.web.app",
      repo: "https://github.com/XANAX1990/Pomodoro-Webapp",
    },
    problem: "Just make before graduated and i interest with ADHD Brain and i make all design in webapp",
    solution:
      "A Pomodoro timer web app with two modes: a General timer and an ADHD mode with a shorter Beginner preset, an hourglass visual and prompts for movement, rewards and milestones. It is an installable PWA hosted on Firebase.",
    highlights: [
      "Works offline: a service worker precaches the app shell (29 files); reloading with the network off still shows the timer and it keeps counting",
      "Four focus levels (Beginner 10/5/10, Standard 25/5/15, Medium 40/8/20, Expert 60/10/25 minutes) plus a custom preset, with alarm and auto-start settings",
      "Task list with done/clear actions that survives a page reload; dark mode choice is also remembered",
      "Remaining time shows in the browser tab title, and a Lofi background music player sits in the bottom bar",
      "Installable (web app manifest with a shortcut straight to ADHD mode) and usable at 375px with no horizontal scroll",
    ],
    lessons: [
      "just too low for features for graduate project",
      "Trying the live app in an automated Chrome run: Firebase App Check answered 403 on every page load, but the timer, tasks and offline mode were not affected",
      "The first press of Start opens a native confirm() asking about notifications, which blocks the page; a custom dialog would be gentler",
      "After Pause the button that brings the timer back is still labelled Start instead of Resume",
    ],
  },
];
