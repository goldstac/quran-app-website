# Quran app website

The public website for the **Quran** app: what it does, and download buttons that point at the app's releases.

The app itself lives in [goldstac/quran](https://github.com/goldstac/quran). This repo is only the site, nothing more.

## Status

The landing page is built and runs locally with `npm run dev`. It is not deployed anywhere yet, and hosting is still an open decision on the task board. See [task-board.md](task-board.md) for what is planned and what is open.

## What is on the site

- A hero with the app logo, the title, and the mission: spread the Quran and Sunnah in Tamil and English
- An ayah card showing Arabic with the Tamil and English meaning of Al-Fatihah 1:5, as a taste of the reading view
- A features section taken from the app's real feature list, not invented marketing
- A mission section and a download section for Linux, macOS, and Windows, pointing at the app's GitHub releases
- Links to the app repo, Discussions for questions, and the app's privacy and terms pages

Still to come, per the task board: screenshots of the actual app, download buttons that read the real latest release instead of linking the releases page, and the pages beyond the landing page.

## Building it

```bash
npm install     # once
npm run dev     # dev server on http://localhost:5173
npm run build   # type check, then a static build into dist/
npm run preview # serve the built dist/ on port 4173
```

The stack is Vite + React 19 + TypeScript, styled with Tailwind v4 and a few hand written component classes in `src/site.css`. The background is the `MeshGradient` component from [gradients.sh](https://gradients.sh), a live WebGL canvas pulled in through the shadcn registry (`npx shadcn@latest add <url>` for more of them). The build output is plain static files, so any host that serves files will do.

## Repo notes

- Sibling of the app repo at `~/Documents/GitHub/quran-app-website`
- The app repo's `AGENTS.md` and `task-board.md` point here, so work on both is driven from one place
- [AGENTS.md](AGENTS.md) has the conventions, [task-board.md](task-board.md) has the state of things

## Licence

Same as the app: the code and docs belong to the maintainer. See the app repo for terms.
