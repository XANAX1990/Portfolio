# Portfolio: Implementation Plan

## Working agreement (for Claude Code)

- Do **one phase at a time**. Stop at the end of each phase, show what to verify, and wait for "ok" before the next one.
- **Commit after each phase** (`feat(phase-N): ...`).
- This is **Next.js 16**. Read the relevant guide in `node_modules/next/dist/docs/` before writing code that touches routing, metadata, images, or caching. Don't rely on memory of older versions.
- Run these checks at the end of every phase, and the phase isn't done until all pass:
  `npx tsc --noEmit` · `npm run lint` · `npm run build`
- **Scope is fixed.** No CMS, no database, no blog, no contact form backend, no i18n, no light/dark toggle. If something seems needed, ask first.
- **Never invent facts about me.** Where content is unknown, write `TODO:` in the data file and list every TODO at the end of the phase.
- When a bug takes more than one try to fix, add an entry to `LESSONS.md` (symptom / root cause / fix / rule).

## Conventions

- All content comes from `src/data/profile.ts` and `src/data/projects.ts`; components never hard-code text about me or projects.
- Server Components by default; `"use client"` only for components that need it (animation, mobile menu).
- `next/image` for every image, with real `alt` text and explicit sizes.
- Accessibility: semantic landmarks (`header`, `main`, `section`, `footer`), one `h1` per page, visible focus states, color contrast ≥ 4.5:1.
- Mobile first: works at 360px wide with no horizontal scroll.

## Data shapes

```ts
// src/data/projects.ts
export type Project = {
  slug: string;            // "mini-jira"
  title: string;
  tagline: string;         // one line for the card
  featured: boolean;       // featured → main grid, else → "Other projects"
  stack: string[];
  cover: string;           // "/projects/mini-jira/cover.png"
  links: { live?: string; repo?: string };
  problem: string;         // why it exists
  solution: string;        // what I built
  highlights: string[];    // 3–5 technical points worth reading
  lessons: string[];       // 2–4 things I learned / bugs I fixed
  gallery?: { src: string; alt: string }[];
};

// src/data/profile.ts
export const profile = {
  name, role, bio, location,
  email, github, linkedin,
  resume: "/resume.pdf",
  skills: { Frontend: [...], Backend: [...], Database: [...], Tools: [...] },
};
```

---

## Phase 1: Scaffold + data

- [ ] `create-next-app` with TypeScript, Tailwind, App Router, ESLint, `src/` dir
- [ ] Theme tokens in `globals.css`: dark background, one accent color, text/muted colors
- [ ] `src/data/profile.ts` and `src/data/projects.ts` with the types above
- [ ] Prefill **Mini Jira** and **n8n Automations** from the notes below; everything else `TODO:`
- [ ] Placeholder images in `public/projects/<slug>/`
- [ ] Add `CLAUDE.md` (`@AGENTS.md`, `@PLAN.md`, LESSONS rule) and an empty `LESSONS.md`

**Verify:** `npm run dev` shows the default page; data files compile; TODO list printed.

## Phase 2: Home page sections

- [ ] `Section` wrapper (id, heading, consistent spacing)
- [ ] **Hero**: name, role, one-line bio, buttons: Resume (PDF), GitHub, Contact
- [ ] **Projects**: grid of featured `ProjectCard`s (cover, title, tagline, stack tags, links) plus a smaller "Other projects" list
- [ ] **Skills**: grouped tags from `profile.skills`
- [ ] **About**: 3–4 lines
- [ ] **Contact**: email (mailto), GitHub, LinkedIn
- [ ] Sticky nav with anchor links; mobile menu

**Verify:** all sections render from data; anchors scroll; looks right at 360px and 1440px.

## Phase 3: Project detail pages

- [ ] `/projects/[slug]` with `generateStaticParams` from `projects.ts`
- [ ] Layout: title + tagline + links → cover → Problem → Solution → Highlights → Lessons → Gallery → Stack
- [ ] `notFound()` for unknown slugs; per-page `generateMetadata`
- [ ] "Next project" link at the bottom; back link to `/#projects`

**Verify:** every project page builds statically (check `npm run build` output); `/projects/nope` returns 404.

## Phase 4: Motion + polish

- [ ] Subtle fade/slide-in for sections and cards (Motion), disabled under `prefers-reduced-motion`
- [ ] Hover states on cards and buttons; focus-visible rings
- [ ] Favicon, consistent spacing/typography pass
- [ ] Footer: © year, "Built with Next.js", repo link

**Verify:** turning on Reduce Motion in the OS stops the animations; keyboard Tab goes through everything in order.

## Phase 5: SEO + sharing

- [ ] Root `metadata` (title template, description, `metadataBase`)
- [ ] `opengraph-image.tsx` (name + role on the theme background)
- [ ] `sitemap.ts` and `robots.ts`
- [ ] `public/resume.pdf` linked and opens in a new tab

**Verify:** `/sitemap.xml`, `/robots.txt`, `/opengraph-image` all load; link preview looks right.

## Phase 6: Deploy

- [ ] Push to GitHub; import into Vercel (framework preset **Next.js**)
- [ ] Lighthouse on the live URL: Performance, Accessibility, Best Practices, SEO all ≥ 90; fix what isn't
- [ ] README: live link + screenshot
- [ ] Update `metadataBase` to the real domain and redeploy

**Verify:** live site works on phone and desktop; all project links open; Lighthouse ≥ 90.

---

## Content notes (for prefilling Phase 1)

**Mini Jira**: live https://mini-jira-tan.vercel.app
- Stack: Next.js 16 (App Router, Server Actions, Cache Components), TypeScript, Tailwind, MongoDB Atlas + Mongoose, Auth.js v5 (GitHub + Google, JWT), dnd-kit, Zod, Vitest, Vercel
- Highlights: per-project Admin/Member roles checked on the server in every Server Action; Kanban drag & drop with float ordering (one document update per move); atomic issue numbers via `$inc` + unique index (`MJ-12`); account linking by email across GitHub/Google; HMAC-SHA256 signed webhooks to n8n → LINE alerts on issue create and priority change
- Lessons: Atlas SRV DNS failures → legacy connection string; stale auth cookies after rotating `AUTH_SECRET` cause redirect loops / PKCE errors; Cache Components prerender errors from non-deterministic values; Vercel env changes need a redeploy; separate dev/prod databases

**n8n Automations**: self-hosted n8n exposed via an ngrok static domain
- LINE → Google Drive bot: any image/video/audio/file sent to a LINE OA is downloaded from the LINE content API, uploaded to Drive with a timestamped name, and confirmed with a reply
- Mini Jira alerts: webhook → HMAC signature + 5-minute freshness check → LINE push to a separate "Mini Jira Alerts" OA, with priority color (🟢🟠🔴)
- Lessons: n8n 2.x Save ≠ Publish (production webhooks run the published version); Windows console QuickEdit freezes the process; LINE user IDs are per provider; each OA needs its own channel token; Google OAuth app must be published to avoid 7-day token expiry

**Pomodoro**: `TODO:` (capstone; Firebase Hosting, service-worker cache auto-bumped on deploy via a predeploy script)
