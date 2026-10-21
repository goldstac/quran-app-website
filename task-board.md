# Task Board

Living list of what the site needs. Add new items at the top of the matching section. The app side of this lives in the app repo's own `task-board.md`, so anything that affects both is written in both.

## High priority

- [ ] Pick the hosting. GitHub Pages is the obvious fit since the repo is already here and the app's releases are on GitHub, with Cloudflare Pages as the alternative. Needs a decision on a custom domain now or later, and HTTPS either way. The build already uses `base: './'`, so it works from a project path like `goldstac.github.io/quran-app-website/` or from a domain root.

- [ ] Decide the pages the site has beyond the landing page: a downloads page with the per platform installers, and a links page pointing at the app repo, Discussions, Privacy, and Terms. The landing page already carries hero, features, mission, and downloads as sections.

## Medium priority

- [ ] Download buttons that read the app's real releases instead of hardcoding them. The app publishes Linux AppImage, macOS, and Windows installers on [goldstac/quran/releases](https://github.com/goldstac/quran/releases), tagged `v1.2.x`, so the site should link the newest non prerelease tag and fall back to a plain releases link if that lookup fails. No version numbers baked into the markup.

- [ ] Screenshots of the real app, taken from a real run, not mockups. Need at least the player with the search results, the library, and the Quran reading view, at a consistent window size, plus the logo at the sizes a browser tab and a share card want.

- [ ] Copy has to match the shipped app. The feature list gets taken from the app README rather than rewritten, and anything only planned (Android build, signed Windows installer) stays off the site until it exists.

- [ ] Mobile layout. The app is a desktop app, so the site is the thing people will actually open on a phone. Mobile first, and the download buttons have to make sense on a phone with no keyboard.

## Low priority / notes

- [x] Search engine basics for the landing page: title, description, Open Graph tags, and a favicon from `app_logo.png` are in `index.html`. Still open for any future pages, plus a proper icon set.
- [ ] A link to the app's Discussions for questions, so the site does not become the support channel.
- [ ] Keep the site's palette in step with the app: dark, green `#1db954` for nasheeds, gold `#c9a86c` for Quran. Now held in the `@theme` tokens in `src/index.css` and the `MESH_COLORS` array in `src/App.tsx`.
- [ ] No tracking, no analytics, no cookies. The app's whole pitch is that nothing phones home, and the site should not be the exception. Nothing has been added so far: no analytics scripts, no cookie banner, no third party scripts beyond Google Fonts and the app logo pulled from the app repo.
- [ ] Google Fonts is the one third party request. Worth deciding whether to self host Inter, Noto Naskh Arabic, and Noto Sans Tamil in `public/` so the site talks to nobody.

## Done

- [x] Stack chosen and the landing page built on it: Vite + React 19 + TypeScript, Tailwind v4 with the app's palette as `@theme` tokens, and the `MeshGradient` component from gradients.sh (WebGL canvas, brand colours, reduced motion respected) as the page background, pulled in through the shadcn registry so more of their components can be added with `npx shadcn@latest add`. Sections: header, hero with an Al-Fatihah 1:5 ayah card in Arabic, Tamil, and English, six feature cards from the app's real feature list, a mission section, three download cards, an open source section, and a footer.

- [x] Repo, `README.md`, `AGENTS.md`, and this task board created, repo public as [goldstac/quran-app-website](https://github.com/goldstac/quran-app-website), and the app repo points here from its own `AGENTS.md` and `task-board.md`. No site code yet, on purpose.
