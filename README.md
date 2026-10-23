# Portfolio

My personal developer portfolio: a fast, static site that shows the projects I've built, what each one solved, and what I learned building it.

> **Status:** in development. See [`PLAN.md`](./PLAN.md) for the roadmap and current progress.
> **Live:** _add the Vercel link after Phase 6_

---

## Featured projects

| Project | What it shows |
|---|---|
| **Mini Jira** | Full-stack app: OAuth (GitHub + Google), per-project roles, drag-and-drop Kanban, server-side authorization, signed webhooks |
| **n8n Automations** | LINE → Google Drive file bot; Mini Jira → LINE alerts with HMAC-verified webhooks |
| **Pomodoro** | Capstone project: PWA with service-worker caching, deployed on Firebase |

## Tech stack

- **Framework:** Next.js 16 (App Router, static rendering), TypeScript
- **Styling:** Tailwind CSS
- **Animation:** Motion (respects `prefers-reduced-motion`)
- **Content:** plain TypeScript data files, with no CMS or database
- **Deploy:** Vercel

## Design decisions

- **Content lives in two files.** `src/data/profile.ts` and `src/data/projects.ts` hold all the text and links. Adding a project means adding one object, not touching components.
- **Fully static.** No database, no API routes. Every page is prerendered at build time, so it's fast and costs nothing to host.
- **One page plus detail pages.** The home page scrolls through Hero → Projects → Skills → About → Contact. Each project has its own `/projects/[slug]` page with the problem, solution, highlights, and lessons learned.
- **Dark, minimal, one accent color.** Readable first; animation is subtle and turns off for users who prefer reduced motion.

## Getting started

```bash
git clone <repo-url> portfolio
cd portfolio
npm install
npm run dev
```

Open http://localhost:3000. No environment variables are needed.

## Editing content

| What | Where |
|---|---|
| Name, role, bio, links, skills | `src/data/profile.ts` |
| Projects (text, stack, links) | `src/data/projects.ts` |
| Project images / GIFs | `public/projects/<slug>/` |
| Resume | `public/resume.pdf` |

## Project structure

```
src/
├─ app/
│  ├─ layout.tsx               # fonts, metadata, nav, footer
│  ├─ page.tsx                 # home: all sections
│  ├─ projects/[slug]/page.tsx # project detail (static params)
│  ├─ opengraph-image.tsx      # social preview image
│  ├─ sitemap.ts
│  └─ robots.ts
├─ components/
│  ├─ sections/                # Hero, Projects, Skills, About, Contact
│  └─ ui/                      # ProjectCard, Tag, Button, Section, Nav
└─ data/
   ├─ profile.ts
   └─ projects.ts
public/
├─ projects/<slug>/            # cover.png, demo.gif, ...
└─ resume.pdf
```

## License

MIT for the code. Text and images are © the author.
