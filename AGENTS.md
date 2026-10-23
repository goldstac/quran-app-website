# AGENTS.md

This file helps AI agents work efficiently in this repo. Read it before making changes.

## Project Overview

The public website for the **Quran** app (a Quran and nasheeds player for Linux, macOS, and Windows). The app lives in the sibling repo `~/Documents/GitHub/nasheed-app` (repo slug `quran`, [github.com/goldstac/quran](https://github.com/goldstac/quran)), and this repo at `~/Documents/GitHub/quran-app-website` holds only the site.

The site is a **Vite + React 19 + TypeScript** single page, styled with **Tailwind v4** plus hand written component classes in `src/site.css`, and its hero background is the `MeshGradient` component from [gradients.sh](https://gradients.sh), pulled in through the shadcn registry. `npm run build` produces a static `dist/`, so any host that serves plain files works.

The design is **warm editorial, modeled on [quran.org](https://quran.org)**, which is the user's explicit quality bar. Cream canvas, navy serif display type (Newsreader), Geist for body text, gold and teal accents, hairline rules, generous whitespace, big `clamp()` type sizes. The one dark band is the mission section. It replaced an earlier dark Spotify-like look, which the user rejected as slop, so do not go back to dark surfaces for the main page.

The content is one landing page: header, hero with an Al-Fatihah ayah card (Arabic, Tamil, English), a six-item feature grid, a dark mission band with the Al-Alaq 96:1 quote, three download cards, and a footer. Sub pages, dynamic release links, and screenshots are still open on the task board.

### Where work happens

The app repo and this repo each have their own chat session: the app session owns `nasheed-app`, this session owns the website. Anything that crosses over (a shipped feature the site should advertise, a claim that changed, a release) gets written into both repos' `task-board.md` files, in plain words, in the same change on each side. Check the app's `AGENTS.md`, `README.md`, and `task-board.md` before writing feature text, so nothing lands on the site that does not exist yet.

Rules that come straight from the app and apply here too:

- Display name is **Quran**, repo slug `quran`, site repo slug `quran-app-website`.
- Say **"nasheeds"**, never "songs", in anything user-facing.
- No em dashes in any user-facing text (UI, docs, release notes). Use commas, periods, semicolons, or " - ".
- Docs tone: plain and casual. Keep heavy legal/rule language out.
- Anything the site claims about the app must be true of the shipped app, not just planned.
- `PRIVACY.md` and `TERMS.md` on the app side stay the source of truth for legal text. The site can link to them; it should not invent its own version.
- No code comments unless asked.

## Commands

- Install deps: `npm install` (once; `node_modules/` is gitignored)
- Dev server: `npm run dev` (Vite, http://localhost:5173). Never port 5000, the app uses it. This is what you start when the user asks to see the site: Vite compiles the TSX in memory and hot reloads.
- Build: `npm run build` (runs `tsc -b` for a type check, then `vite build` into `dist/`). This is the check; there is no test suite or linter config yet.
- Preview a build: `npm run preview` (serves `dist/` on port 4173)
- Static server, screenshots only: `cd dist && python3 -m http.server 8092 --bind 127.0.0.1`. The `cd dist` is not optional, see gotcha 14.
- Add a shadcn or gradients.sh component: `npx shadcn@latest add <registry url>`. It writes files into `src/components` / `src/lib` from `components.json`, so run it from the repo root.
- Look at your work: this machine can shoot headless screenshots and the `read` tool displays images, so iterate visually instead of guessing. Build, serve `dist/` with `python3 -m http.server 8092 --bind 127.0.0.1` from inside `dist/`, then `firefox --headless --no-remote -profile /tmp/ffprof --window-size=1440,4600 --screenshot out.png http://127.0.0.1:8092/`. Use a tall window for a full-page shot (about 4600px for the desktop page, 3400px at 390 wide for mobile), downscale with `magick`, and `read` the PNG. Crop mobile shots into slices, they are too tall to read whole.

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

1. **Two repos, one project, two sessions.** The app is the product, this repo is its site. A change here is usually paired with a fact from over there, so when a claim changes on the app side, the site copy and both task boards get updated.
2. **No invented features.** Before a feature goes on the site, confirm it exists in the shipped app, not only in the app's task board.
3. **Downloads come from GitHub releases.** Buttons must point at the real release assets on [goldstac/quran/releases](https://github.com/goldstac/quran/releases), never at files hosted here, and never at a version the site guessed.
4. **Do not start servers on port 5000.** The app uses it. The Vite dev server uses 5173 and `preview` uses 4173, so the default commands are already safe.
5. **Tailwind v4, not v3.** Gradient utilities are `bg-linear-to-r`, since v3's `bg-gradient-to-r` was renamed. Colors and fonts come from `@theme` tokens in `src/index.css`.
6. **`class="dark"` on `<html>` is load bearing.** shadcn's token blocks are split into light `:root` values and `.dark` overrides. Without that class the whole site picks up the light theme for anything using `bg-background` or `text-foreground`.
7. **The mesh lives only in the hero now.** It is wrapped in a `.hero-mesh` div (absolute, top 0, full width, 100vh tall, `z-index: -10`, masked with a top-to-bottom linear gradient so it fades to nothing by the end of the hero). The rest of the page is flat cream, like quran.org's hero ripple. The mesh cannot be positioned by passing a className: the component's own root div is `relative isolate`, which beats a passed `absolute` in the cascade, so wrap it in your own div instead.
8. **Do not hand edit the gradient engine.** `src/lib/gradient-engine/`, `src/components/gradient-surface.tsx`, and `src/components/mesh-gradient.tsx` are the gradients.sh registry files, copied in by the shadcn CLI. Change colours, speed, blur, and grain through the props in `src/App.tsx`; re-add the component from the registry if the upstream one changes.
9. **Palette: cream and navy, not dark green.** Canvas `#f4f1e8`, surface `#fffdf6`, ink `#12201a`, navy headlines `#00163d`, teal `#0d6970` (buttons), gold `#c6a15b` (Quran accents: eyebrow dashes, ayah numbers, Arabic quotes), hairlines `#ddd8c8`, dark band `#0c1512`. The mesh uses the same family (`#c6a15b`, `#0d6970`, `#8a7a52`, `#123028`) at 85% opacity over the cream background, so a palette change goes through the `@theme` tokens and the `MESH_COLORS` array together.
10. **shadcn's `@theme inline` can blank out your muted text.** When shadcn writes its blocks below ours in `src/index.css`, it appends `--color-muted: var(--muted)`, which shadows the real `--color-muted` token and makes every muted label nearly invisible on cream. The fix that is in place now: that line is deleted and `--color-muted-foreground` points at `var(--color-muted)`. If muted text goes invisible after adding a shadcn component, that is why.
11. **The feature grid has a breakpoint specificity trap.** `.feat-grid` is 1 column, 2 at 640px, 3 at 980px, and the `:nth-child` padding rules for the 2-column and 3-column layouts overlap. The 980px block resets `.feat:nth-child(odd)` padding on purpose. When touching the grid, check all three widths visually.
12. **The root `tsconfig.json` carries the `@` alias on purpose.** It is a solution file (empty `files`, only project references), and it also holds `compilerOptions.paths` because the shadcn CLI resolves aliases from the root tsconfig. Without it, `npx shadcn add` silently writes files into a literal `@/` directory at the repo root. If you ever see a folder named `@`, delete it and re-run the add.
13. **The gradient engine is code split on purpose.** Each gradient kind is its own chunk in `dist/`, so only the kinds a page uses get downloaded. Do not import the engine barrel from a hot path just to read a type; import types with `import type`.
14. **A blank page on a local port means you are serving the wrong thing.** The repo root `index.html` is a Vite source entry (`<script type="module" src="/src/main.tsx">`), not a runnable page: if you start `python3 -m http.server <port>` from the repo root, the browser receives raw uncompiled `.tsx`, refuses to execute it as a module, and renders an empty `<div id="root">`. This is exactly what a previous session did when the user asked to start the web server, and the user saw a blank page. The two real servers are `npm run dev` (port 5173, compiles in memory, hot reloads) and `npm run preview` (port 4173, serves `dist/`); a plain static server only works when started from inside `dist/`, and only shows what was built at that moment (run `npm run build` first if `src/` changed). **Before telling the user a URL, load it yourself** and confirm content renders, a screenshot is the cheapest check. If the user reports a blank page, check which process holds the port (`ss -tlnp | grep <port>`, then `readlink /proc/<pid>/cwd`) and kill it before restarting correctly.

## File Map

- `README.md` — what this repo is, what is on the site, and the commands. Keep it in sync with reality.
- `AGENTS.md` — this file.
- `task-board.md` — planned, open, and shipped work for the site.
- `index.html` — the Vite entry: title, description, Open Graph tags, one Google Fonts link (Geist, Newsreader, Noto Naskh Arabic, Noto Sans Tamil), and the `#root` div.
- `vite.config.ts` — React and Tailwind plugins, `base: './'` so the build works from any path (GitHub Pages project sites included), and the `@` alias to `src/`.
- `components.json` — written by `npx shadcn@latest init` (style `base-nova`). Do not hand roll it; the schema is version specific and a hand written one gets rejected.
- `package.json` / `tsconfig.json` / `tsconfig.app.json` / `tsconfig.node.json` — tooling. `npm run build` type-checks before it bundles. The root `tsconfig.json` is a solution file that also carries the `@/*` path alias for the shadcn CLI.
- `src/main.tsx` — mounts `App` into `#root`.
- `src/App.tsx` — the whole landing page: the `MeshGradient` mount and `MESH_COLORS`, header, hero with the ayah card and stats, feature grid, dark mission band, download cards, footer.
- `src/index.css` — Tailwind import, `./site.css`, then our `@theme` tokens (canvas, ink, teal, gold, navy, fonts), the `:root` shadcn aliases, and the blocks shadcn appended.
- `src/site.css` — the hand written layout and component classes. Main ones: `.shell` (page width), `.section` / `.section-hero` / `.section-mission` (vertical rhythm), `.rule` (hairline), `.eyebrow` / `.eyebrow-gold`, `.display` / `.display-sm` (navy serif headlines), `.lede`, `.measure` / `.measure-tight` (reading width), `.stack` / `.stack-lg`, `.hero-grid`, `.stat-row` / `.stat-num` / `.stat-label`, `.ayah-stage` and its inner bits (`.ayah-marker`, `.ayah-text`, `.gloss-row`, `.gloss-label`, `.gloss-tamil`, `.gloss-en`), `.player-strip` / `.play-dot` / `.track` / `.track-fill`, `.feat-grid` / `.feat` / `.feat-ico`, `.mission` / `.mission-grid` / `.mission-quote` / `.quote-ar`, `.dl-grid` / `.dl-card` / `.dl-meta`, `.topbar` / `.topnav` / `.brand`, `.site-footer` / `.footer-grid` / `.footer-nav` / `.footer-note`, `.btn` and variants, `.hero-mesh`.
- `src/components/icons.tsx` — the inline SVG icon set (Arrow, Book, Languages, Headphones, Library, Download, Keyboard, Play), lucide style. Trim it or extend it here, no icon package.
- `src/components/mesh-gradient.tsx`, `src/components/gradient-surface.tsx`, `src/lib/gradient-engine/` — the gradients.sh component and its engine, as the registry wrote them. Leave them alone.

## Frontend Conventions

- **Tokens live in `src/index.css` under `@theme`**: `--color-canvas` `#f4f1e8`, `--color-canvas-2` `#eeeade`, `--color-surface` `#fffdf6`, `--color-ink` `#12201a`, `--color-ink-soft` `#2b3f36`, `--color-muted` `#5c6a62`, `--color-line` `#ddd8c8`, `--color-teal` `#0d6970`, `--color-teal-deep` `#0a4f55`, `--color-gold` `#c6a15b`, `--color-gold-deep` `#a9823f`, `--color-navy` `#00163d`, `--color-night` `#0c1512`, plus `--font-sans` (Geist), `--font-display` (Newsreader), `--font-arabic` (Noto Naskh Arabic), `--font-tamil` (Noto Sans Tamil).
- **Layout and typography live in `src/site.css`**, not in long utility strings. New sections should compose the existing classes (`.shell`, `.section`, `.rule`, `.eyebrow`, `.display`, `.measure`, `.stack`) so the rhythm stays consistent.
- **Display headlines** are navy `#00163d`, Newsreader, sized with `clamp()`, with `text-wrap: balance`, and a word or two in italic for emphasis. Body copy is Geist in `--color-ink-soft`. Muted labels use `--color-muted`, which is the floor for contrast on cream.
- **The page background is `MeshGradient`**, colours `#c6a15b`, `#0d6970`, `#8a7a52`, `#123028` over `#f4f1e8`, tuned through props in `src/App.tsx` and masked into the hero by `.hero-mesh` in `src/site.css`.
- **Arabic and Tamil text carries its language**: `lang="ar" dir="rtl"` with the Arabic font for Arabic, `lang="ta"` for Tamil. Never set the Arabic font on Tamil text.
- **Icons are inline SVG** in `src/components/icons.tsx`, lucide style (24 viewBox, stroke, currentColor). Add to that file rather than pulling in an icon package for one glyph.
- **Copy rules**: no code comments, no em dashes, "nasheeds" never "songs", plain casual tone, and every claim true of the shipped app.
