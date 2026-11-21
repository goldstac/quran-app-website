# Task Board

Living list of what the site needs. Add new items at the top of the matching section. The app side of this lives in the app repo's own `task-board.md`, so anything that affects both is written in both.

The app and the site each get their own chat session: the app session owns `nasheed-app`, the website session owns this repo. Anything that crosses over (a shipped feature to advertise, a claim that changed) gets written into both task boards.

## High priority

- [ ] Pick the hosting. GitHub Pages is the obvious fit since the repo is already here and the app's releases are on GitHub, with Cloudflare Pages as the alternative. Needs a decision on a custom domain now or later, and HTTPS either way. The build already uses `base: './'`, so it works from a project path like `goldstac.github.io/quran-app-website/` or from a domain root.

- [ ] Decide the pages the site has beyond the landing page: a downloads page with the per platform installers, and a links page pointing at the app repo, Discussions, Privacy, and Terms. The landing page already carries hero, features, mission, and downloads as sections.

## Medium priority

- [ ] Advertise the new app beta: the app repo cut the `v1.2.1-beta` tag on
  2026-11-21 and its Release workflow is running (the app repo's task board
  tracks it). When the beta lands, mention it in the site copy (landing page
  version/claim, downloads page).

- [ ] Claim changed on the app side (2026-11-20): the optional "Discord bot"
  feature (`su!track` / `su!fm`, linking your own bot) was removed entirely
  from the app on `development` (appends a Done entry there). Discord
  presence still exists and is still worth advertising if the site lists it.
  This site has no bot copy today, so there is nothing to fix; do not add a
  bot feature to any page.

- [ ] Security hardening to mention when v1.2.1 ships (landed on the app's
  `development`, not yet in a tagged release): a full security audit of the
  app was followed by 12 fixes in separate commits. The headline ones for
  copy: the app now listens on 127.0.0.1 only and refuses any cross-origin
  request (it used to be reachable from other devices on your network and
  from any website), it serves a strict content security policy, the
  self-updater checks GitHub's published checksum before running a
  download, and the release CI pins every third-party action to an exact
  commit. No UI or feature changed, so the feature list stays as is; this
  is release-notes material, and it also backs up the site's "nothing
  phones home" line harder (the app now talks to nobody on your network).
  Full details live in the app repo's task-board.md, Done entry dated
  Oct 26.

- [ ] App release note for copy: `v1.2.1-pre-alpha.2` shipped Oct 25 as a
  pre-release (latest stable is still v1.2.0; the site now picks the newest
  release including prereleases, so it follows alpha builds too). Worth taking
  for the feature list once it is in the README: imported local nasheeds
  now show their embedded cover art (track rows, player bar, media
  session), and local import failures show a real reason instead of a
  generic one. Android also crossed from "planned" to "shipped": pre-alpha
  releases now carry a universal APK, sideload-only, with an open install
  issue on at least one device (see the app repo board). The site now has
  an Android card that downloads the APK directly.

- [ ] Screenshots of the real app, taken from a real run, not mockups. Need at least the player with the search results, the library, and the Quran reading view, at a consistent window size, plus the logo at the sizes a browser tab and a share card want.

- [ ] Copy has to match the shipped app. The feature list gets taken from the app README rather than rewritten, and anything only planned (Android build, signed Windows installer) stays off the site until it exists.

- [ ] Mobile polish. The landing page is responsive already (checked down to 390px: hero stacks, feature grid collapses, mission quote stacks, nav hides), but the download buttons still need a phone-first pass, and any future pages are mobile first from the start.

## Low priority / notes

- [x] Search engine basics for the landing page: title, description, Open Graph tags, and a favicon from `app_logo.png` are in `index.html`. Still open for any future pages, plus a proper icon set.
- [ ] A link to the app's Discussions for questions, so the site does not become the support channel.
- [x] Keep the site's palette in step with the design: cream `#f4f1e8`, navy `#00163d` headlines, teal `#0d6970` buttons, gold `#c6a15b` Quran accents. Held in the `@theme` tokens in `src/index.css` and the `MESH_COLORS` array in `src/App.tsx`.
- [ ] No tracking, no analytics, no cookies. The app's whole pitch is that nothing phones home, and the site should not be the exception. Nothing has been added so far: no analytics scripts, no cookie banner, no third party scripts beyond Google Fonts and the app logo pulled from the app repo.
- [ ] Google Fonts is the one third party request. Worth deciding whether to self host Geist, Newsreader, Noto Naskh Arabic, and Noto Sans Tamil in `public/` so the site talks to nobody.

## Done

- [x] Download buttons now start a direct download of the newest release's installer asset from GitHub, instead of opening the releases page. Implemented in `src/App.tsx`: the page fetches GitHub's release list on load, filters to releases with assets, sorts by publish date and picks the newest (prereleases included, so `v1.2.1-alpha.2` shows up), then each platform card matches an asset by extension and uses its `browser_download_url`. Added an Android card for a direct APK download. Falls back to the releases page if the lookup fails. Verified: the site builds, the matching logic resolved all four URLs for `v1.2.1-alpha.2` and each returned a redirect then 200 with `Content-Disposition: attachment` (APK included), and a stale unused icon import that was breaking the build was removed. Buttons were not clicked in a live browser. Committed and pushed as `c166424`.

- [x] Landing page rebuilt in the warm editorial style, modeled on [quran.org](https://quran.org) as the craft bar: cream canvas, Newsreader serif display type with Geist body, gold and teal accents, hairline rules. Sections: header, hero with the Al-Fatihah 1:5 ayah card (Arabic, Tamil, English) plus stats, a 3 by 2 feature grid, a dark mission band with the Al-Alaq 96:1 quote in Arabic and English, three download cards, and a footer. The gradients.sh `MeshGradient` is mounted behind the hero only, masked so it fades out by the end of the section. Verified with headless screenshots at 1440 and 390. Committed and pushed as `b400880`.

- [x] Repo, `README.md`, `AGENTS.md`, and this task board created, repo public as [goldstac/quran-app-website](https://github.com/goldstac/quran-app-website), and the app repo points here from its own `AGENTS.md` and `task-board.md`.
- [x] First pass at the landing page (Vite + React 19 + TypeScript, Tailwind v4, gradients.sh `MeshGradient` via the shadcn registry), later rebuilt in the editorial style above.
