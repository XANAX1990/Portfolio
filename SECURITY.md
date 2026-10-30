# Security: Portfolio

Security rules and audit checklist for the portfolio (static Next.js 16 on Vercel, no database, no API). Claude Code: follow these rules while writing code, and follow **Audit procedure** at the bottom when asked to "run the security audit".

## What we protect

| Asset | Where it lives | Why it matters |
|---|---|---|
| My personal details | `src/data/profile.ts`, `public/resume.pdf` | Only what I chose to publish should be public |
| Project screenshots | `public/projects/` | Can accidentally show emails, tokens, tabs, notifications |

## Entry points

The site is fully static, so there is no user input. The risks are what I publish and what the page loads.

## Project rules

- [ ] No environment variables or secrets are needed. If one appears, ask why.
- [ ] `resume.pdf` contains only what I want public (check phone number, home address, ID numbers) and its metadata (author, file paths) is clean.
- [ ] Every screenshot and GIF is checked for: emails, tokens, URLs with secrets, LINE chats, browser tabs, desktop notifications. Blur when in doubt.
- [ ] All images have EXIF stripped (phone photos carry GPS).
- [ ] External links with `target="_blank"` use `rel="noopener noreferrer"`.
- [ ] No third-party scripts or trackers unless I ask for them.
- [ ] Security headers in `next.config`: `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `frame-ancestors 'none'` (or `X-Frame-Options: DENY`).
- [ ] Links to project repos only point to repos that already passed their own security audit.

### Files that must never be tracked
`.env*`, `.vercel/`, original (unblurred) screenshots.

## Rules that apply to every project

### Secrets
- [ ] No secret in source code, tests, fixtures, docs, screenshots or commit messages. Secrets come from `.env` / the host's env settings (Vercel, Firebase) / n8n credentials.
- [ ] `.env*` files (except `.env.example`) are in `.gitignore`; `.env.example` lists names only, no values.
- [ ] Different secrets for dev and prod.
- [ ] If a secret was ever committed: **rotate it first**, then clean history. Deleting the file is not enough.

### Private data
- [ ] Logs never contain secrets, tokens, full emails or other personal data.
- [ ] Error messages sent to a browser or chat don't include stack traces, file paths, internal URLs or DB details.
- [ ] Images committed to the repo (README screenshots, assets) are checked for personal data and have EXIF stripped.

### Dependencies
- [ ] Versions locked (`package-lock.json` / pinned `requirements.txt`).
- [ ] `npm audit --omit=dev` / `pip-audit` show no high or critical issues, or each one is noted with why it doesn't apply.
- [ ] No packages added "just in case"; unused packages removed.

### Least privilege
- [ ] Every key, token and DB user has only the access this project needs (one database, read/write only where needed, narrowest OAuth scopes).

---

## Audit procedure (for Claude Code)

Run this when I say "run the security audit", before making a repo public, and before a big deploy.

1. List every tracked file with `git ls-files` and check **each one** against the rules in this file. Also check untracked files that aren't ignored: `git status --porcelain`.
2. Search for secrets in the current tree **and in history**:
   ```bash
   git grep -nIiE "(secret|token|password|passwd|api[_-]?key|bearer|mongodb(\+srv)?://)"
   git grep -nIE "[A-Za-z0-9+/_-]{60,}={0,2}"     # long tokens
   git grep -nIE "\b[0-9a-f]{32}\b"               # 32-hex secrets
   git log -p --all | grep -nIiE "(secret|token|password|bearer|mongodb(\+srv)?://)"
   ```
3. Check `.gitignore` against the private files listed for this project; confirm none of them is tracked.
4. Read every place that handles untrusted input (listed under **Entry points**) and check it against the project rules.
5. Run the dependency audit (`npm audit --omit=dev` and/or `pip-audit`).
6. **Report first, don't fix yet.** Output one table:

   | File | Line | Rule broken | Severity (High / Medium / Low) | Suggested fix |
   |---|---|---|---|---|

   Then a short list of rules that passed. Wait for my "ok" before changing anything. Fix High items first, one commit per fix.
7. If a real secret is found in the tree or history, **stop** and tell me which one, so I can rotate it before anything else.
