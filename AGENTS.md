# AGENTS.md

This file helps AI agents work efficiently in this repo. Read it before making changes.

## Project Overview

The public website for the **Quran** app (a Quran and nasheeds player for Linux, macOS, and Windows). The app lives in the sibling repo `~/Documents/GitHub/nasheed-app` (repo slug `quran`, [github.com/goldstac/quran](https://github.com/goldstac/quran)), and this repo at `~/Documents/GitHub/quran-app-website` holds only the site.

Right now there is no site code, just the repo, these docs, and the task board. The site is not built yet, so the first job is deciding the stack, then the page itself.

Rules that come straight from the app and apply here too:

- Display name is **Quran**, repo slug `quran`, site repo slug `quran-app-website`.
- Say **"nasheeds"**, never "songs", in anything user-facing.
- No em dashes in any user-facing text (UI, docs, release notes). Use commas, periods, semicolons, or " - ".
- Docs tone: plain and casual. Keep heavy legal/rule language out.
- Anything the site claims about the app must be true of the shipped app. Check the app's `AGENTS.md`, `README.md`, and `task-board.md` before writing feature text, so nothing lands on the site that does not exist yet.
- `PRIVACY.md` and `TERMS.md` on the app side stay the source of truth for legal text. The site can link to them; it should not invent its own version.

## Commands

Nothing to build or run yet. When a stack lands, the build/preview/serve commands go here, and this line disappears.

## Task board

`task-board.md` is the living list of what is planned, in flight, and shipped. Update it in the same change as the work it describes: new items at the top of the matching section (High / Medium / Low / Done), and anything unfinished or uncommitted gets said out loud.

The app repo's task board has a matching entry, so changes that affect both (new releases, features that should be advertised) get written in both places.

## Git & Conventional Commits

- Remote: `origin` at `git@github.com:goldstac/quran-app-website.git`, default branch `main`.
- ALWAYS use Conventional Commits. Format: `<type>(<scope>): <description>`
- Types: `feat` (new feature), `fix` (bug fix), `refactor`, `docs` (docs/AGENTS), `style` (CSS only, no logic), `perf`, `chore`.
- Scope examples: `site`, `ui`, `docs`, `build`. Use lowercase.
- Examples:
  - `feat(site): add the download section with per platform buttons`
  - `style(ui): match the app's dark green and gold palette`
  - `docs: point the feature list at the app README`
- Only commit when the user explicitly asks. Stage only intended files, never secrets. Inspect `git status` / `git diff` before committing. Do not update git config or force-push.

## Critical Gotchas

1. **Two repos, one project.** The app is the product, this repo is its site. A change here is usually paired with a fact from over there, so when a claim changes on the app side, the site copy and the task board get updated too.
2. **No invented features.** Before a feature goes on the site, confirm it exists in the shipped app, not only in the app's task board.
3. **Downloads come from GitHub releases.** Buttons must point at the real release assets on [goldstac/quran/releases](https://github.com/goldstac/quran/releases), never at files hosted here, and never at a version the site guessed.
4. **Do not start servers on port 5000.** The app uses it. Any local preview server for the site uses a different port, and never runs in the background holding it.

## File Map

- `README.md` — what this repo is, what the site will contain, and repo notes. Keep it in sync with reality.
- `AGENTS.md` — this file.
- `task-board.md` — planned, open, and shipped work for the site.

Site files land here once the stack is chosen; add them to this map as they appear.

## Frontend Conventions

Set once the stack is chosen. Expect it to follow the app: dark theme with green `#1db954` for nasheeds and gold `#c9a86c` for Quran, Inter for interface text, Noto Naskh Arabic for Arabic names, no stock browser widgets where the app hand-built its own, and mobile first.
