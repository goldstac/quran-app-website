# AGENTS.md

This file helps AI agents work efficiently in this repo. Read it before making changes.

## Project Overview

The public website for the **Quran** app (a Quran and nasheeds player for Linux, macOS, and Windows). The app lives in the sibling repo `~/Documents/GitHub/nasheed-app` (repo slug `quran`, [github.com/goldstac/quran](https://github.com/goldstac/quran)), and this repo at `~/Documents/GitHub/quran-app-website` holds only the site.

The site is a **Vite + React 19 + TypeScript** single page, styled with **Tailwind v4** plus a few hand written component classes, and its background is the `MeshGradient` component from [gradients.sh](https://gradients.sh), pulled in through the shadcn registry. `npm run build` produces a static `dist/`, so any host that serves plain files works.

The content is one landing page: hero with an ayah card, features, mission, downloads, and an open source section. Sub pages, dynamic release links, and screenshots are still open on the task board.

Rules that come straight from the app and apply here too:

- Display name is **Quran**, repo slug `quran`, site repo slug `quran-app-website`.
- Say **"nasheeds"**, never "songs", in anything user-facing.
- No em dashes in any user-facing text (UI, docs, release notes). Use commas, periods, semicolons, or " - ".
- Docs tone: plain and casual. Keep heavy legal/rule language out.
- Anything the site claims about the app must be true of the shipped app. Check the app's `AGENTS.md`, `README.md`, and `task-board.md` before writing feature text, so nothing lands on the site that does not exist yet.
- `PRIVACY.md` and `TERMS.md` on the app side stay the source of truth for legal text. The site can link to them; it should not invent its own version.

## Commands

- Install deps: `npm install` (once; `node_modules/` is gitignored)
- Dev server: `npm run dev` (Vite, http://localhost:5173). Never port 5000, the app uses it.
- Build: `npm run build` (runs `tsc -b` for a type check, then `vite build` into `dist/`). This is the check; there is no test suite or linter config yet.
- Preview a build: `npm run preview` (serves `dist/` on port 4173)
- Add a shadcn or gradients.sh component: `npx shadcn@latest add <registry url>`. It writes files into `src/components` / `src/lib` from `components.json`, so run it from the repo root.

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
4. **Do not start servers on port 5000.** The app uses it. The Vite dev server uses 5173 and `preview` uses 4173, so the default commands are already safe.
5. **Tailwind v4, not v3.** Gradient utilities are `bg-linear-to-r`, since v3's `bg-gradient-to-r` was renamed. Colors and fonts come from `@theme` tokens in `src/index.css` (`--color-brand`, `--color-ink-soft`, `--font-tamil`, and so on), which is what makes `text-ink-soft` or `from-brand` work. `shadcn init` appends its own `@theme inline`, `:root`, `.dark`, and `@layer base` blocks to the same file below ours, so it also sets `--font-sans`. Keep Inter there when touching it, since a shadcn default (Geist) will otherwise win the cascade and the page quietly renders in the wrong font.
6. **`class="dark"` on `<html>` is load bearing.** shadcn's token blocks are split into light `:root` values and `.dark` overrides. Without that class the whole site picks up the light theme for anything using `bg-background` or `text-foreground`.
6. **The background is a live WebGL canvas.** `MeshGradient` is mounted fixed at `inset-0 z-0` in `src/App.tsx`, and all page content sits in the `relative z-10` wrapper next to it. Put content outside that wrapper and the fixed canvas paints over it. It renders one still frame for anyone with reduced motion on, and falls back to a static CSS gradient without WebGL.
7. **Do not hand edit the gradient engine.** `src/lib/gradient-engine/`, `src/components/gradient-surface.tsx`, and `src/components/mesh-gradient.tsx` are the gradients.sh registry files, copied in by the shadcn CLI. Change colours, speed, blur, and grain through the props in `src/App.tsx`; re-add the component from the registry if the upstream one changes.
8. **Keep the palette in step with the app.** Dark surface `#070b09`, green `#1db954` for nasheeds, gold `#c9a86c` for Quran. The mesh uses the same four colours, so a palette change goes through the `@theme` tokens and the `MESH_COLORS` array together.
9. **The root `tsconfig.json` carries the `@` alias on purpose.** It is a solution file (empty `files`, only project references), and it also holds `compilerOptions.paths` because the shadcn CLI resolves aliases from the root tsconfig. Without it, `npx shadcn add` silently writes files into a literal `@/` directory at the repo root. If you ever see a folder named `@`, delete it and re-run the add.
10. **The gradient engine is code split on purpose.** Each gradient kind is its own chunk in `dist/`, so only the kinds a page uses get downloaded. Do not import the engine barrel from a hot path just to read a type; import types with `import type`.

## File Map

- `README.md` — what this repo is, what is on the site, and the commands. Keep it in sync with reality.
- `AGENTS.md` — this file.
- `task-board.md` — planned, open, and shipped work for the site.
- `index.html` — the Vite entry: title, description, Open Graph tags, the Google Fonts link (Inter, Noto Naskh Arabic, Noto Sans Tamil), and the `#root` div.
- `vite.config.ts` — React and Tailwind plugins, `base: './'` so the build works from any path (GitHub Pages project sites included), and the `@` alias to `src/`.
- `components.json` — written by `npx shadcn@latest init` (style `base-nova`). Do not hand roll it; the schema is version specific and a hand written one gets rejected.
- `package.json` / `tsconfig.json` / `tsconfig.app.json` / `tsconfig.node.json` — tooling. `npm run build` type-checks before it bundles. The root `tsconfig.json` is a solution file that also carries the `@/*` path alias for the shadcn CLI.
- `src/main.tsx` — mounts `App` into `#root`.
- `src/App.tsx` — the whole landing page: header, hero with the ayah card, features, mission, download, open source, footer, plus the `MeshGradient` mount and its palette.
- `src/index.css` — Tailwind import, our `@theme` tokens, body, selection, and scroll styles, then the shadcn blocks the CLI appended (its `@theme inline`, `:root`, `.dark`, `@layer base`).
- `src/site.css` — the hand written component classes: `.badge`, `.btn-primary`, `.btn-outline`, `.feature-card`, `.download-card`, `.icon-wrap`, `.ayah-card`, `.mission-card`, `.open-card`, `.site-header`, `.site-footer`, `.link-soft`.
- `src/components/icons.tsx` — the inline SVG icons the feature and download cards use, so no icon package is needed.
- `src/components/mesh-gradient.tsx`, `src/components/gradient-surface.tsx`, `src/lib/gradient-engine/` — the gradients.sh component and its engine, as the registry wrote them. Leave them alone.

## Frontend Conventions

- **Tokens live in `src/index.css` under `@theme`**: `surface` `#070b09`, `ink` `#fafaf9`, `ink-soft` `#a3aca6`, `brand` `#1db954` (nasheeds), `brand-gold` `#c9a86c` (Quran), plus `font-sans` (Inter), `font-arabic` (Noto Naskh Arabic), `font-tamil` (Noto Sans Tamil). Tailwind utilities are generated from them, so `text-ink-soft`, `text-brand`, `from-brand to-brand-gold` all work.
- **Layout is Tailwind; skinned pieces are plain CSS.** Cards, buttons, the badge, and the header/footer chrome are classes in `src/site.css`, so their look is tuned in one place instead of repeated in utility strings.
- **The page background is `MeshGradient`**, brand colours `#1db954`, `#c9a86c`, `#0d4a30`, `#123c56` over `#070b09`. Tune it through props in `src/App.tsx`; the canvas itself is fixed behind a `z-10` content wrapper.
- **Arabic and Tamil text carries its language**: `lang="ar" dir="rtl"` with `font-arabic` for Arabic, `lang="ta"` with `font-tamil` for Tamil. Never set Arabic font on Tamil text.
- **Icons are inline SVG** in `src/components/icons.tsx`, lucide style (24 viewBox, stroke, currentColor). Add to that file rather than pulling in an icon package for one glyph.
- **Copy rules**: no code comments, no em dashes, "nasheeds" never "songs", plain casual tone, and every claim true of the shipped app.
