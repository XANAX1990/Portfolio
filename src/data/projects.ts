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
      "Moved priority into the create dialog, which cut LINE alerts per new issue from two (created, then priority changed) to one: a UX change and the backend alert rule have to be designed together",
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
    tagline: "Offline-ready Pomodoro PWA with push notifications and ADHD-friendly features.",
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
  {
    slug: "mini-jarvis",
    title: "Jarvis",
    tagline: "Fully local Thai voice launcher: tap a key, say a phrase, and it opens my apps, with a local web page to run and edit it",
    featured: true,
    stack: [
      "Python 3.12",
      "faster-whisper",
      "Piper TTS",
      "rapidfuzz",
      "sounddevice",
      "FastAPI",
      "Next.js 16",
      "TypeScript",
      "Tailwind CSS",
      "pytest",
    ],
    cover: "/projects/mini-jarvis/terminal.png",
    links: {
      repo: "https://github.com/XANAX1990/Mini-Jarvis-Local",
    },
    problem:
      "I was already launching my game and work setups from .bat files. I wanted to just say it, without sending my microphone to anyone's server.",
    solution:
      "Tap Caps Lock (or click the mic on a page the app serves itself) and speak a Thai command; it stops listening by itself after about a second of silence. A local Whisper model turns it into text, fuzzy matching picks one of my presets by name, the preset opens Discord, Chrome tabs and other apps, and a local Piper voice confirms it. A small web page on 127.0.0.1 shows what it heard and lets me edit presets, read the log, turn a misheard line into a new phrase and change settings without touching JSON. Everything runs on my own PC.",
    highlights: [
      "Runs entirely on my machine: no cloud, no account, and no audio leaves the PC",
      "Speech can only select a preset by name from presets.json; it can never build or run another command on the machine",
      "Fuzzy matching (rapidfuzz) instead of an LLM keeps it light enough for a PC with a GTX 1060 3 GB; Whisper runs on the CPU in int8, with an optional GPU mode that falls back to CPU",
      "Starts at login from a Startup-folder shortcut (a Windows Service cannot open apps on the desktop), with a single-instance guard",
      "Preset validation and the matcher are pure functions covered by pytest",
      "Ask \"how much did I spend this month?\" and it answers from Slip Tracker's local API: read only, loopback only, the token stays in a git-ignored .env, and the amounts are spoken as Thai words",
      "Tap to talk instead of hold to talk: an energy-based end-of-speech detector (a pure function with its own tests) stops after a second of quiet, gives up after 5 s with no speech and caps a clip at 15 s; the master switch releases the hotkey so Caps Lock types capitals again",
      "A web UI (a Next.js static export) is served by the same Python process on 127.0.0.1:3003, so there is no Node at runtime and nothing else to start: mic button, on/off switch, a preset editor, a per-day log and settings with a 3-second mic test",
      "The web API can start programs, so it is locked down: loopback only, Host and Origin checks, and no CORS. Programs run only from an allow-list with fixed arguments, and a preset can only name one. Adding one from the web needs a Yes on a desktop confirmation dialog, so a malicious web page can't launch anything new",
    ],
    lessons: [
      "On silence or noise Whisper recites its initial_prompt (for example \"โหมดทำงาน โหมด\"), which launched a preset by itself; filtering non-speech with VAD fixed it",
      "rapidfuzz partial_ratio scores any fragment of a phrase as 100, so a very short transcript must not be allowed to match a long phrase",
      "faster-whisper's own file decoding broke on the newest PyAV, so the app decodes WAV files itself and passes arrays",
      "With no console window (pythonw) it is easy to start the app twice; a Windows named mutex keeps one listener and output goes to a log file",
      "Three questions that differ by one word (วันนี้ / อาทิตย์นี้ / เดือนนี้) scored 90+ against each other, so a bare \"จ่ายไปเท่าไร\" answered for today; the matcher now refuses fragments shared by several presets and near ties",
      "Tapping again while Jarvis was still speaking made it transcribe its own reply (\"ไม่ได้ยิน\"); the engine now waits for the reply to finish before the microphone opens",
      "A phrase added from the log could break the commands it was meant to help, because the matcher refuses to guess when a phrase holds another preset's phrase; saves now run the real matcher before and after and refuse any change that would stop a working command",
      "Next.js prefetches menu links with HEAD requests and a browser may retry a 408, so the API allows HEAD for pages and answers \"no key was pressed\" with a 200",
    ],
    gallery: [
      {
        src: "/projects/mini-jarvis/web-home.png",
        alt: "Jarvis web page with a green mic button, the on/off switch, the last command and today's log (sample data)",
      },
      {
        src: "/projects/mini-jarvis/web-presets.png",
        alt: "Editing a preset in the browser: phrases as tags and an ordered list of steps (sample data)",
      },
    ],
  },
  {
    slug: "slip-tracker",
    title: "Slip Tracker",
    tagline: "Local expense tracker that reads Thai bank transfer slips with an on-device OCR model",
    featured: true,
    stack: [
      "Python 3.12",
      "FastAPI",
      "SQLite",
      "Ollama",
      "Typhoon OCR",
      "OpenCV",
      "Next.js 16",
      "TypeScript",
      "Tailwind CSS",
      "pytest",
    ],
    cover: "/projects/slip-tracker/slips.png",
    links: {},
    problem:
      "Most of what I pay for in Thailand is a bank transfer, so my slips are my receipts. They piled up as images with no totals, and I did not want to send them to a cloud OCR service.",
    solution:
      "Drop a pile of slip images into a web page on my own PC. A FastAPI service reads the QR code for the transaction reference, runs a local Typhoon OCR model through Ollama on a GTX 1060 3 GB, and plain per-bank parsers (K+, SCB, Krungthai) pull out the amount, date and recipient. Everything lands in SQLite, where I can search, fix what OCR got wrong and see each month by category. It only runs on localhost and is not deployed.",
    highlights: [
      "QR for the reference, OCR for the rest: OCR misread the same transaction reference (zero versus letter O, a dropped capital I), while the QR code on the slip carries it exactly, so duplicate detection uses the QR value",
      "No second LLM: each bank has a fixed layout, so regex parsers fit a single model in 3 GB of VRAM, and adding a bank means adding one file",
      "Bulk upload runs through one background worker (one GPU) with a status per file; the same image or the same QR reference is rejected as a duplicate in milliseconds, before any OCR",
      "An eval command scores every field against hand-checked slips: 17 of 17 correct on each field at 31.5 s per slip, on a small set I describe honestly in the README",
      "Locked down for a localhost app: loopback-only binding, a token between the web app and the API, Host and Origin checks against other pages in my browser, validated values before saving, and stored images re-encoded to strip EXIF",
    ],
    lessons: [
      "The first K+ parser scored 63.6% on the recipient: PromptPay slips have no bank line under the name. Only the eval harness showed it, which is why it exists",
      "Test images built from nearly equal solid colours encoded to identical JPEG bytes and tripped the image-hash duplicate check, twice; distinct test images now come from random bytes",
      "A second upload hid the first batch because the page asked for the latest batch only; the API now returns every unfinished batch",
      "Python on Windows has no time zone database: zoneinfo needs the tzdata package, and the failure only appeared when a request left out the month",
      "next start listens on all interfaces by default, which would have exposed the API proxy to my LAN; it is pinned to 127.0.0.1",
    ],
  },
];
