# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Music-industry creators and collaborators in Romania (bilingual RO/EN, RO canonical): artists, producers, beatmakers, audio engineers, visual creators, recording studios, and artist managers. They are evaluating whether to join a waitlist for a not-yet-launched platform, from a link shared via social (Instagram/YouTube/TikTok) or word of mouth.

## Product Purpose

This surface is the pre-launch waitlist / landing page for **GrowYourMusic**, an all-in-one platform for the music-creation industry ("Create. Collaborate. Get paid."). The page's job is to get visitors to preregister with email + role (+ optional city), then optionally complete a short idea-validation quiz. Success = preregistration submissions and validation-quiz answers captured (via a Google Apps Script webhook, out of scope for this redesign).

## Positioning

GrowYourMusic combines, on one platform, what creators currently juggle across separate tools/DMs/marketplaces: a marketplace for buying/selling music services (beats, mixing, mastering, visuals), direct messaging/collaboration, an interactive studio-booking map, management/calendar with manager access, a track library (singles/albums/EPs), artist/producer leaderboards, a social feed, an AI-assisted lyric editor, a wallet, and collaboration contracts — an inferred, unverified claim: no competing single tool is named or disproven, this is the product's own stated differentiator.

## Operating Context

- Founding-member incentive: the first signups get a visibility boost in listings (marketplace, studio map, feed) during the platform's first 60 days — a real, time-bound commitment shown on the page.
- Two-step funnel: (1) preregister form (email, role, optional city) → (2) optional multi-step validation quiz (current process, biggest pain, willingness to pay, price sensitivity, feature priority, concerns) → confirmation state.
- Bilingual: English/Romanian toggle, persisted in localStorage. Canonical stored values (role, feature, frequency, price options) stay in Romanian regardless of displayed language, to stay compatible with the existing spreadsheet backend — a constraint on data, not on this redesign's visual work.
- Real platform screenshots exist for the social feed (hero), marketplace, and messaging; studio map, management/calendar, library, leaderboard, lyric editor, wallet, and contracts currently have no real screenshots and are represented as stylized in-page mockups.

## Capabilities and Constraints

- Next.js 14 App Router, CSS Modules + Tailwind installed, TypeScript. No test framework.
- Form submission logic (validation, loading/error/retry states, webhook POST as `text/plain` to dodge CORS preflight) lives in `PreregisterForm.tsx` / `ValidationQuiz.tsx` and is out of scope to rebuild — this redesign only restyles those flows, it does not touch their submit mechanics or the Google Apps Script backend (`Code.gs`, intentionally not carried into this copy).
- Must stay fully responsive (mobile through desktop).
- Must reuse the existing color palette as a hard constraint (explicit user instruction, binding): background `#0b0a14`, purple `#6657da` / `#7743db`, accent gold `#ffd218`, accent pink `#ed9ed6`, secondary text `#b6b6b6`, white text.

## Brand Commitments

- Name: **GrowYourMusic**. Tagline pattern: "Create. Collaborate. Get paid."
- Existing social presence: Instagram (@growyourmusic.ro), YouTube, TikTok (@growyourmusic.ro), contact@growyourmusic.ro.
- Existing type pairing used for expressive headline words (kept as a brand asset, not mandated verbatim for the new layout): Poppins (body/UI), Space Grotesk, Playfair Display italic, JetBrains Mono, as accents on different words of the hero headline.
- All visible UI copy is Romanian-first with an English translation layer; do not alter copy meaning during redesign.

## Evidence on Hand

- Real screenshots: `public/screenshots/feed.png` (hero), `shop.png` (marketplace feature), `chat.png` (messaging feature), reused from `../platform-screenshots/`.
- Stylized CSS mockups (no real screenshots yet) for: studio map/booking, management/calendar, library, leaderboard/charts, feed post-creation, lyric editor, wallet, contracts — in `PlatformMockups.tsx`.
- Logo/marks: `public/img/gym-logo-mark.png`, `public/logo.png`, plus decorative art (`cerc.png`, `el1.png`, `logo_in_hand.png`).

## Product Principles

1. Trust and momentum first: an unlaunched product's landing page has to substitute real screenshots and a concrete, time-boxed founder incentive for the credibility a live product would otherwise carry.
2. One clear action: every section should point back at preregistering; the validation quiz is a secondary, skippable ask that must never block or compete with the primary signup.
3. Content is fixed, form is not: role/feature/frequency/price vocabulary and all copy are contractually stable (spreadsheet + i18n); only presentation is open for this redesign.
4. Multi-role legibility: artists, producers, engineers, studios, and managers all need to see themselves in the page within seconds — avoid a single-persona visual narrative.

## Accessibility & Inclusion

No product-specific accessibility requirement was established beyond standard web practice (semantic form labels, focus states, contrast) already present in the incumbent implementation.
