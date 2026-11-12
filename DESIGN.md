---
name: GrowYourMusic — Landing (Product-led dark system)
description: A dark, restrained, product-led landing page at the craft level of BandLab, Linear/Stripe and DistroKid. Credibility comes from precise type, real product UI, restraint, and copy that names the visitor's problem and its fix.
colors:
  bg: "#0b0a14"
  bg-2: "#120f22"
  bg-3: "#16132a"
  fg: "#f2f0fa"
  fg-2: "#b4aed1"
  fg-3: "#8a83ab"
  on-fg: "#0b0a14"
  fg-hover: "#dcd8ee"
  line: "#221f38"
  line-strong: "#312c4f"
  brand: "#6657da"
  brand-hover: "#7568e3"
  brand-ink: "#a99ff5"
  brand-wash: "rgba(102,87,218,0.16)"
  gold-spark: "#ffd218"
  gold-wash: "rgba(255,210,24,0.12)"
  ok: "#45bd80"
  err: "#f0695d"
typography:
  display:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "clamp(42px, 5.4vw, 72px)"
    fontWeight: 600
    lineHeight: 1.02
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "clamp(32px, 3.8vw, 48px)"
    fontWeight: 600
    lineHeight: 1.08
    letterSpacing: "-0.035em"
  body:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "15-18px"
    fontWeight: 400
    lineHeight: 1.6
  numeric:
    fontFamily: "Geist, system-ui, sans-serif"
    fontVariantNumeric: tabular-nums
    note: "Time readouts, bar numbers, BPM, quiz step counter and prices use Geist with tabular figures. No second face."
spacing:
  container: "1200px max, 24px gutter (16px under 640px)"
  section: "clamp(80px, 10vw, 136px) vertical"
  radius-control: "8px"
  radius-panel: "12px"
  radius-stage: "16px"
components:
  button-primary: { background: "{colors.brand}", text: "#ffffff", hover: "{colors.brand-hover}", radius: "8px", height: "48px (36px in nav)" }
  link-secondary: { text: "{colors.fg}", icon: "arrow, nudges 3px on hover" }
  input: { background: "{colors.bg}", border: "{colors.line-strong}", radius: "8px", height: "44px", focus: "brand border + 3px brand ring at 25%" }
  panel: { background: "{colors.bg-3}", border: "{colors.line}", radius: "12px", shadow: "0 24px 48px -24px rgba(0,0,0,.8)" }
---

# Design System: GrowYourMusic Landing

## Overview

Replaced (Nov 2026) the earlier "premium SaaS" world: near-black ground, purple/gold/pink glows, gradient blobs, spinning conic borders, pill buttons, Poppins plus three accent faces. The user rejected it as reading like AI slop and like "a guy with a dream". The goal now is to look like a team running a real business. They chose the category standard on purpose, benchmarked against **BandLab, Linear/Stripe and DistroKid / Spotify for Artists**.

Scope: `src/app/page.tsx` + `home.module.css`, `Transport`, `Arrangement`, the landing mockup set, `PreregisterForm`, `ValidationQuiz`, `LanguageSwitcher`. The social render routes (`/carousel`, `/story`, `/story-card`) deliberately keep the old dark system: `page.module.css`, `FounderBenefit`, `SocialCards`, `BentoBackdrop` and `PlatformMockups.module.css` are now theirs only.

## Colors

Dark ink-violet ground, the original brand ground restored at the user's request (Nov 2026, "don't keep the background black, make it similar to how it was before"). Still restrained: no glows, blobs or gradients.
- **Surfaces** step lighter as they rise: page `#0b0a14`, sections and the feature stage `#120f22`, panels and mockup frames `#16132a`. Hairlines are violet-tinted: `#221f38` / `#312c4f`.
- **Text** `#f2f0fa`, secondary `#b4aed1`, tertiary `#8a83ab` (≥4.5:1 on the ground).
- **The spark: two brand colours, each with one job.**
  - **Purple `#6657da`** (the logo purple) fills every primary action: nav Sign up, form submit, closing CTA. The one exception is the hero CTA, a glass button: the feature-glyph tile body (`#4b3880→#1d1538`, top highlight, inset edge, drop shadow, lilac glow), with a 1px white hairline edge and no animated border (user removed it). It also marks brand moments: the scrubber playhead, focus rings, selection, the form progress bar and the AI-suggestion wash. It never fills a section.
  - **Gold `#ffd218`** means money and reward, as it did in the original brand: the hero's second line "Get paid for it.", "Get paid." in the closing line, prices, the wallet balance, the #1 leaderboard trophy and the 60-day tag. Nothing else is gold.

## Typography

**One typeface on the website: Geist** (variable weight, self-hosted from `public/fonts/` via `@font-face` in `globals.css`: Latin + Latin Extended subsets, covering ă î ș ț; never load it from Google Fonts, which sends every visitor's IP to Google and is a GDPR problem). This is a hard user rule (Nov 2026): no second font anywhere on the site, not even a mono for numbers. Measurements (time readouts, counters, prices) use Geist with `font-variant-numeric: tabular-nums`. Display is 600 with tight tracking (-0.045em), up to 92px in the hero. Headings use `text-wrap: balance`. Buttons, inputs and headings inherit the family rather than naming one.

The social render routes (`/carousel`, `/story`, `/story-card`) are Instagram asset generators, not site pages. They load the previous brand fonts (Poppins etc.) themselves, through `src/components/SocialFonts.tsx` in their route layouts.

## Layout

- Container 1200px. Two-column splits are 5fr/7fr (audience) or 5fr/6fr (join, feature cards). All collapse to one column at 1024px.
- Section rhythm: generous vertical padding, more space above headings than below. Heading blocks are left-aligned with no eyebrow/kicker labels (banned).
- Features: the scroll-driven Feature Stack (see Signature components). It replaced the earlier showcase rows, the 3-column grid and a rejected pinned-stage tour.
- Audience is a typeset list of roles with hairline dividers, not chips or marquees.
- The closing band is a `#111114` strip between hairlines, with the tagline ("Get paid." in gold) and a purple primary button.

## Signature components

**Wave scrubber nav** (`Transport.tsx`): sticky, page ground at 80% with a functional 12px backdrop blur and a bottom hairline. Logo tile (`/logo.png`, 32px, 8px radius) plus wordmark; a 160-bar waveform whose played portion turns bright up to a brand-coloured playhead at the true scroll position; a mono mm:ss readout; language select; black Sign up. Under 640px the wave drops to its own row.

**Hero** (`Arrangement.tsx`, name kept from earlier rounds): a launch-page layout in the Apple manner (user request, Nov 2026, after the left/right split was rejected). Everything is centred, with generous air:
- Hero label: a mini-player capsule (Nov 2026; a tinted announcement pill, a logo lockup and a two-segment label pill were all rejected as AI-looking). `--bg-3` capsule with a `--line-strong` hairline and a soft drop shadow: a 38px feature-glyph tile made round (`border-radius: 50%`; `GlyphTile` + `drawPlay` from `FeatureGlyphs.tsx`: a solid rounded play triangle with a translucent echo behind it), then on one line "GrowYourMusic" (15px/600 `--fg`), a 1px `--line-strong` rule, and "Early access" (`landing.heroBadge`, 15px/500 `--fg-2`). No logo, not interactive. A spark runs round the edge every 4s: a conic sweep (transparent → `--brand-ink` → white) masked to a 1.5px ring, rotated via the `@property --spark` angle; hidden under reduced motion. This is the one sanctioned exception to the no-animated-border rule (explicit user request); do not spread it to other elements.
- The headline at up to 88px, weight 600, -0.045em, with the heading gradients: `.glass-text` (white to lavender) for the first sentence, `.glass-text-blue` (light blue) for the second. No glow.
- One short line (`heroLine`, up to 26px, `--fg-2`).
- A glass pill CTA (999px radius, 50px tall) and a text link in `--brand-ink` with a chevron (`heroLink`, pointing to #features).
- Below that, all ten feature glyph tiles (`size="xl"`, edge set by `--tile`) sit on a 1000×300 stage scaled by `--k`. The order is `ROW` in `Arrangement.tsx`, with messages and marketplace in the middle. Tiles shrink 9px per step out from the centre (108px down to 67px). A soft violet pool of light sits underneath. The tiles rise in on load, staggered from the centre out. With scroll (`--p`, 0→1 over the first 35% of the hero's height), they go from a loose fanned stack (32px apart, tilted 5° per step) to a gently curved row, upright, with the outer tiles lower; always fully opaque (the load-in only slides). The row sits on the seam between the hero and the signup section (user request, Nov 2026: one row only, "help fade between the hero and the preregister section"; a 38-tile honeycomb wall was tried and dropped as too busy and laggy): the hero has no bottom hairline, its ground fades from `--bg` to the signup section's `--bg-2` over its last ~40%, it clips sideways only (`overflow-x: clip`) and sits above the next section (`z-index: 2`), and the row's centre line is the hero's bottom edge, so the tiles hang half into the signup section, whose top padding is enlarged to make room. The row grew from three tiles to all ten at the user's request. On phones (≤640px), once the row has fully spread (`--p` = 1), it becomes a swipeable carousel (user request, Nov 2026): a native horizontal scroller (`.rail`, bleeding to the screen edges, no scrollbar, vertical swipes still scroll the page) draws the same ten tiles at their exact spread positions, starting centred, so the swap is invisible (checked: within 0.04px). Scrolling back up hands the row back to the animation; if it was swiped, the animated row starts where the swipe left it (`--sx`, a registered `@property`) and glides back to centre in 0.6s. On phones all ten tiles are also the same size (`UNIFORM` = 90 stage units, about 67px on a 390px screen) and evenly spaced, in the stacked fan, the spread row and the carousel alike. Desktop and tablet are unchanged. Note: the hero is no longer a stacking context; the `.stage` carries `z-index: 5` so the row stays above the signup section's ribbon.
- Under 640px the row is drawn at 2.1× and bleeds off both edges, so the middle tiles stay readable. Under reduced motion `--p` is fixed at 1 and nothing animates.

**Feature glyphs** (`FeatureGlyphs.tsx`): each feature card opens with an abstract mark in the language of the Instagram highlight covers (`Social media/highlights`): a raised violet glass tile (`#4b3880→#1d1538`, top highlight, inset edge, deep drop shadow), 60px with a 17px radius (48px on mobile, `size="lg"` gives 84px), holding a white→lilac (`#fff→#e4e0ff→#a99dff`) gradient glyph with a soft lilac glow. Each glyph has one solid hero shape plus translucent supporting shapes, and cut-outs in `#2a1f55`; keep new marks to that recipe. The thin line icons (`FEATURE_ICONS`) stay only inside the mockups and the social routes.

**Feature Stack** (`FeatureStack.tsx`, under "Stop running your music from DMs, notes and group chats"): the 10 problem→solution steps are full-width cards (400px tall on desktop, 2vh gap between slots, so the whole stack scrolls in about 4,700px; the user asked for it to move faster) (`--bg-2`, `--line` border, 20px radius, 5fr copy / 6fr mockup). Each card's slot is `position: sticky` at `top: 96px + i×12px`, so as you scroll the next card slides up and stacks over the last, leaving a 12px ledge of every earlier card visible like a pile of session sheets. A rAF scroll loop writes `--cover` (0→1, how far the next card has covered this one); the covered card scales down to 94% from its top edge and a `--bg` veil fades over it to 55%. Reduced motion: cards still stack (sticky is layout, not animation) but never scale or dim. Under 900px the ledge is 8px, cards go single-column with a 240px mockup and cap at the viewport height.

**Mockups** (`PlatformMockups.tsx`): one set of components, two stylesheets with identical class names (`PlatformMockups.module.css` for the social routes, `PlatformMockups.landing.module.css` for this page). `MockupThemeContext` (default `dark`) is set to `landing` by the landing page.

## Motion

One authored moment: the Feature Stack, where cards slide up and pile onto each other as you scroll while the covered card recedes (scale to 94%, dim to 55%), driven continuously by scroll position. The nav scrubber tracks scroll continuously. Everything else is utility: 150–300ms colour transitions and a 14px settle-in on section entry (`Reveal`). Content is always visible (no opacity-from-zero fades).

## Do / Don't

- Don't add a second typeface (including a monospace) to the website.
- Do keep the spark scarce: purple only on primary actions and brand moments, gold only on money/reward. No purple or gold section fills, gradients or glows.
- Do add new UI strings to all three languages in `translations.ts`. Landing copy lives under `landing.*`; the older `hero`/`founder`/`features` keys are kept for the carousel export.
- Do write copy as problem → solution in the visitor's words ("Book a studio without calling around"), not category labels ("An interactive studio map").
- Do add real partners only via `src/data/partners.ts`. The strip is hidden while that list is empty; never ship placeholder names or logos.
- Don't reintroduce gradients, glows, blurred blobs, glass, conic borders, pill buttons, gradient text or eyebrow labels on the landing page.
- Don't edit `page.module.css` / `PlatformMockups.module.css` for landing changes; they belong to the social render routes.


## Brand assets

- Logo: `public/img/gym-logo-glass.png`, the glass logo from `Social media/logo/profile-glass.html` (frost, tint, specular bevel and contact shadow over logo3.png), re-rendered on a transparent background instead of the purple slab. Do not use the flat logo3.png on the site. Used at 56px tall in the nav (44px on mobile) and 84px in the footer, never with a separate wordmark beside it. The favicon is still `/logo.png`.
- `public/img/cerc.png`: ribbon loop wrapped around the signup form panel (135% of the panel column, rotated -12°, 55% opacity, static, cropped by the section). Not in the hero (user rejected it there).
- `public/img/el1.png`: wave line-art behind the closing CTA band, 190% wide, 32% opacity, cropped by the band.

## Glass system (buttons and type)

Shared tokens in `globals.css`: `--glass-fill`, `--glass-shadow`, `--glass-shadow-hover` (primary, raised violet glass, same as the feature glyph tiles), `--glass-fill-clear` / `--glass-shadow-clear` (secondary: the same glass, clear), and `--glass-text` / `--glass-text-gold` / `--glass-text-blue`.

- Every primary button uses the glass fill: hero CTA, nav Sign up, form submit, quiz Continue, closing CTA. White 600 label with a faint lilac text-shadow; hover lifts 1–2px and deepens the glow. No solid purple fills and no animated borders.
- Secondary buttons (quiz Back, retry) use the clear glass; Skip is text-only until hover.
- Headings use the `.glass-text` global class: section titles, founder title, feature card titles, audience roles, closing title, quiz questions, success title. It is the hero's lettering without the glow, with the gradient repeating every line (`background-size: 100% 1lh`). Accent words inside a heading (hero second line, closing title's last phrase) use `.glass-text-blue`; `.glass-text-gold` remains for gold money moments. Body copy stays flat `--fg-2` for readability.

## Feature card visuals

Each feature card shows one real component from the GrowYourMusic app, not a screenshot or a drawn mockup: shop product card, chat thread with a contract offer, studio booking panel, management calendar, a Projects shelf with a single, an EP and an album, leaderboard podium, promoted feed post, lyrics panel, deposit summary, contract progress and price. They live in `src/components/platform/`: `PlatformPieces.tsx` reproduces the app's JSX (markup and class names), and the `*.module.css` files are **restyled to this landing system** (user request, Nov 2026; they were previously verbatim app CSS):

- Panels: flat `--bg-3` on a `--line-strong` hairline, 12px radius, one soft drop shadow. Insets (rows, fields, bubbles, podium steps, totals): `--bg-2` on `--line`, 8px radius. Chips and tags: 6px radius hairline, never pills. No glass panels, backdrop blur, glows, inner highlights, conic borders or gradient fills.
- Buttons inside pieces use the site's glass recipe: `--glass-fill` for the primary (Book, Accept, the shop arrow), `--glass-fill-clear` for secondary (Message owner, Edit).
- Colour in the pieces: purple for brand moments only (your own chat bubble, the selected calendar day, done/current contract steps). No yellow anywhere in the pieces (user request, Nov 2026): what was gold (prices, contract total, wallet balance after deposit, the #1 podium spot and crown, calendar dots for paid work) is white. The contract offer in the chat is marked by the contract glyph tile from `FeatureGlyphs` (index 9, `size="xl"`, `--tile: 40px`), the same raised violet tile as the hero icons. The wallet fee is 6%. The app's pink and teal are gone; calendar dots use brand ink, white and `--ok`; the library uses the product cover for every release.
- Type: Geist, 600 max, tight tracking on numbers, tabular figures; text in `--fg` / `--fg-2` / `--fg-3`.

`platform.module.css` `.scope` maps the app's token names onto the landing tokens and defines the shared recipes (`--piece-panel`, `--piece-inset`, `--piece-edge`, `--piece-shadow`, `--piece-radius`, `--piece-radius-sm`). The outer panel of each piece uses the platform's glowy glass card from web_frontend's shop `.card` (user request, Nov 2026): a white sheen top-left, violet glows top-right and bottom-right and a lavender wash over deep violet, with a `rgba(214,204,255,.26)` edge and an inset top highlight. This is the only glow in the pieces. Everything inside the panel stays flat. The app's responsive rules were dropped: each piece renders at its app width (`.piece[data-kind]`) and `FeatureStack`'s `Fit` scales it down to the visual column, with a 0.72 floor for legibility (phones, ≤640px: chat, library and leaderboard switch to their own 286px phone layouts so they render near 1:1 instead of shrinking; chat drops the day label, times and last reply and puts the contract button on its own row, the library becomes rows with a 56px cover, the leaderboard drops the gap notes and stacks the progress bar; the stage inset is 20px on phones and the stage height is `clamp(230px, 38vh, 310px)` below 900px); anything still taller is anchored to the top and fades out at the bottom. The stage behind a piece (`FeatureStack .visual`/`.fit`, remade twice in Nov 2026 on user request; a flat dotted canvas and then a bloom-and-rings stage were both rejected) is the brand wave line-art `el1.png`, the same asset as the join and closing sections, rendered with `next/image` (`.stageWave`, object-fit cover, full opacity) over a deep violet gradient. Each card shows a different horizontal crop (`WAVE_CROPS`) and odd cards are mirrored. The piece sits straight on the wave (no dark pool), and covered cards are not dimmed (user request: cards and wave at 100% visibility); only cards buried deeper than the two peeking ones fade out. 16px radius, soft lavender hairline edge, inset top highlight. The landing pieces show no people: no names, @handles or profile pictures (user decision, Nov 2026; drawn avatars were tried and rejected as cheap). The shop card has no seller row, the studio panel no owner row, the leaderboard (remade Nov 2026) is an Artists/Producers switch, a Prize pill, a podium of raised violet glass blocks (glyph-tile recipe) with white→lilac gradient numerals and a glowing white crown tile on #1, and a "Your position" row (#7, +3 places this week, a brand progress bar to the next place); no names, no yellow; the library (remade Nov 2026) is a "Projects" shelf of a Single (one flat cover), an EP (one sleeve stacked behind) and an Album (two sleeves), all using the product cover `IMGcover-violet.jpg`, each with a type pill, title, track count and a progress bar with its stage (Released with a white check, Mixing, Recording), and the feed post has no author row and no Promoted tag (image, text, likes only). The social routes still use the made-up creators in `src/data/sampleCreators.ts`, each web-checked against real artists/brands; never use a real person's name, photo or likeness, and never present sample creators as real users or reviews. Icons are inline Tabler paths (`icons.tsx`), sample art (`public/platform/`) comes from the app's mock data, and copy goes through `t.pieces` (en/ro/it). The pieces are `inert` + `aria-hidden`, and the card text carries the meaning. `PlatformMockups` is now used only by the social render routes.
