# Task Board

Living list of what the site needs. Add new items at the top of the matching section. The app side of this lives in the app repo's own `task-board.md`, so anything that affects both is written in both.

## High priority

- [ ] Pick the stack. The site is small (a landing page plus a few sub pages), so the honest options are plain HTML/CSS/JS with no build step, or a lightweight static generator. Whatever is chosen has to be boring to host and easy to edit, and the choice gets written into AGENTS.md Commands before any page code lands.

- [ ] Pick the hosting. GitHub Pages is the obvious fit since the repo is already here and the app's releases are on GitHub, with Cloudflare Pages as the alternative. Needs a decision on a custom domain now or later, and HTTPS either way.

- [ ] Decide the pages the site has at launch: home (hero, features, screenshots, downloads), a downloads page with the per platform installers, and a links page pointing at the app repo, Discussions, Privacy, and Terms.

## Medium priority

- [ ] Download buttons that read the app's real releases instead of hardcoding them. The app publishes Linux AppImage, macOS, and Windows installers on [goldstac/quran/releases](https://github.com/goldstac/quran/releases), tagged `v1.2.x`, so the site should link the newest non prerelease tag and fall back to a plain releases link if that lookup fails. No version numbers baked into the markup.

- [ ] Screenshots of the real app, taken from a real run, not mockups. Need at least the player with the search results, the library, and the Quran reading view, at a consistent window size, plus the logo at the sizes a browser tab and a share card want.

- [ ] Copy has to match the shipped app. The feature list gets taken from the app README rather than rewritten, and anything only planned (Android build, signed Windows installer) stays off the site until it exists.

- [ ] Mobile layout. The app is a desktop app, so the site is the thing people will actually open on a phone. Mobile first, and the download buttons have to make sense on a phone with no keyboard.

## Low priority / notes

- [ ] Search engine basics: title, description, and Open Graph tags per page, an icon set, and a favicon from `app_logo.png`.
- [ ] A link to the app's Discussions for questions, so the site does not become the support channel.
- [ ] Keep the site's palette in step with the app: dark, green `#1db954` for nasheeds, gold `#c9a86c` for Quran.
- [ ] No tracking, no analytics, no cookies. The app's whole pitch is that nothing phones home, and the site should not be the exception.

## Done

- [x] Repo, `README.md`, `AGENTS.md`, and this task board created, repo public as [goldstac/quran-app-website](https://github.com/goldstac/quran-app-website), and the app repo points here from its own `AGENTS.md` and `task-board.md`. No site code yet, on purpose.
