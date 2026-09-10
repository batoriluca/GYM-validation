---
name: GrowYourMusic — Waitlist Landing (Premium SaaS System)
description: A bold, rounded, gradient-accented waitlist landing page inspired by revocalize.ai — dark premium SaaS, whose navbar and hero are their own DAW-session devices.
colors:
  bg-black: "#0b0a14"
  bg-black-soft: "#120f22"
  bg-panel: "#16132a"
  card-fill-top: "rgba(46, 41, 84, 0.4)"
  card-fill-bottom: "rgba(19, 17, 36, 0.4)"
  card-border: "rgba(255, 255, 255, 0.1)"
  card-border-strong: "rgba(255, 255, 255, 0.18)"
  purple-1: "#6657da"
  purple-2: "#7743db"
  gold: "#ffd218"
  gold-soft: "#efd28e"
  pink: "#ed9ed6"
  text-primary: "#ffffff"
  text-secondary: "#b4aed1"
  text-tertiary: "#7d759e"
  success: "#7fe0a8"
  danger: "#ff8f8f"
typography:
  display:
    fontFamily: "Poppins, sans-serif"
    fontSize: "clamp(36px, 6vw, 66px)"
    fontWeight: 800
    lineHeight: 1.14
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Poppins, sans-serif"
    fontSize: "clamp(28px, 3.6vw, 42px)"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Poppins, sans-serif"
    fontSize: "14-17px"
    fontWeight: 400
    lineHeight: 1.7
    letterSpacing: "normal"
  label:
    fontFamily: "Poppins, sans-serif"
    fontSize: "12-14px"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "normal"
  clip-word:
    fontFamily: "Playfair Display, Space Grotesk, serif"
    fontStyle: italic
    fontSize: "clamp(15px, 1.9vw, 22px) / clamp(17px, 2.2vw, 26px) on MASTER"
    fontWeight: "600 (700 on MASTER)"
    lineHeight: 1.1
  hero-headline:
    fontFamily: "Space Grotesk, Poppins, sans-serif"
    fontSize: "clamp(36px, 5.6vw, 64px)"
    fontWeight: 700
    lineHeight: 1.08
    letterSpacing: "-0.02em"
spacing:
  radius-lg: "24px"
  radius-md: "16px"
  radius-sm: "10px"
  radius-pill: "999px"
  card-padding: "28-44px"
  section-padding-desktop: "108px 6%"
  section-padding-mobile: "64px 5%"
components:
  button-cut-in:
    backgroundColor: "{colors.bg-black}"
    textColor: "#ffffff"
    rounded: "{spacing.radius-pill}"
    padding: "10-16px 18-22px"
  button-cut-in-hover:
    backgroundColor: "{colors.purple-1}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.text-secondary}"
    rounded: "{spacing.radius-pill}"
    padding: "8-15px 16-18px"
  button-on-band:
    backgroundColor: "#ffffff"
    textColor: "{colors.purple-1}"
    rounded: "{spacing.radius-md}"
    padding: "16px 18px 16px 32px"
  input-field:
    backgroundColor: "rgba(255, 255, 255, 0.05)"
    textColor: "{colors.text-primary}"
    rounded: "{spacing.radius-sm}"
    padding: "13px 16px"
  card-panel:
    backgroundColor: "linear-gradient(180deg, {colors.card-fill-top}, {colors.card-fill-bottom})"
    textColor: "{colors.text-primary}"
    rounded: "{spacing.radius-lg}"
    padding: "28-44px"
---

# Design System: GrowYourMusic — Waitlist Landing (Premium SaaS System)

## Overview

**Creative North Star: "Premium dark SaaS," with a navbar and hero that are the product's own studio instruments**

Below the fold this remains the "premium dark SaaS" restructure documented previously: one Poppins family, rounded pill/rounded-rect geometry, decorative gradient-blur "blobs," glass-tinted panels. That layer is unchanged by this round.

The navbar and first viewport are a different register: a continuous generated waveform standing in for the navbar, and a DAW arrangement window standing in for the hero. This third round is a refinement/correction pass on that build, not a rebuild: it densified the arrangement's waveforms on three of the four clips, added a play/pause status icon that mirrors real scroll activity, unified the page's three primary CTAs (hero, navbar sign-up, preregister submit) onto one "cut into the page" visual treatment, and replaced the video lane's PNG-screenshot grid — a prior round's device the user explicitly rejected ("you did not do what I wanted... I wanted to use the sections from the images you have used, not the images") — with a bento grid built from the site's own live mockup components. This round also caught and fixed two pre-existing defects: kicker/eyebrow labels above two below-fold headings (now removed outright, per the craft floor's unconditional ban on the device) and a mobile bento-grid bug where two differently-tall cells shared a row and neither got the height its name implied.

**Key characteristics:**
- One typeface, Poppins, at weights 400/500/600/700/800, used for display, body, and labels alike below the fold — no serif, no monospace anywhere on the page.
- Two deliberate, scoped typeface breaks, both brand assets PRODUCT.md already pins for expressive headline accents: `.heroTitle` (the foreground headline) is set in Space Grotesk; each arrangement clip's own word (`Create.` / `Collaborate.` / `Get paid.` / `GrowYourMusic.`) is set in Playfair Display italic, in normal flow *beside* its own waveform (a labeled divider between them) rather than layered on top of it — a caption next to the signal, not stencilled across it. Neither typeface appears anywhere else on the page.
- Large soft-edged radial-gradient "blob" decorations (purple/gold/pink at low opacity, heavily blurred) positioned behind the preregister card and the closing CTA — not behind the first viewport, which uses console chrome instead.
- Rounded geometry below the fold: `--radius-pill` (999px) for every marketing button/badge/chip, `--radius-lg`/`--radius-md` for panels and mockup frames; the navbar's and arrangement's own buttons use the smaller `--radius-sm` (10px) console radius instead.
- Every feature mockup, including the "Interactive studio map," is wrapped in a shared "app window" frame (three dots + a title bar) so all mockups read as one consistent product-screenshot family.
- The navbar's own wave scrubber no longer carries section-colored peak flags (removed in an earlier round) — the wave is purely a scroll-position scrubber now, not a section map. It no longer has a mobile-specific collapsed state either: the same continuous wave renders at every width, just laid out on its own row below the session/controls row below 980px rather than squeezed into a three-column grid.
- No kicker/eyebrow labels anywhere on the page — a craft-floor prohibition, not a device this system ever offered as an option (see Do's and Don'ts).

## Colors

Purple remains the primary interactive/brand color; gold and pink are secondary accents used, in the first viewport, as literal **track colors** the way a session assigns them — purple = Create/Master, pink = Collaborate, gold = Get paid, gold carrying money being the product's own semantics. Below the fold color washes across large soft blur shapes and gradient fills; in the first viewport it is restricted to track-colored accents against a mostly white/gray console palette.

### Primary
- **Purple** (`#6657da` → `#7743db`): feature icon badges (first four "showcase" features), primary mockup accents, and the border/hover-fill color shared by all three primary CTAs (see Named Rules below). In the first viewport it is also the Create/Master track color — the `Create.` word and the full-width `MASTER` clip.

### Secondary
- **Gold** (`#ffd218`, soft `#efd28e`): prices, ratings, wallet balance, gold-tinted benefit cards, the founder-benefit badge/chip. In the first viewport it is the Get-paid track color — the `Get paid.` word.
- **Pink** (`#ed9ed6`): one of three audience-chip avatar gradients below the fold. In the first viewport it is the Collaborate track color — the `Collaborate.` word.

### Neutral
- **Ground** (`#0b0a14` page background, `#120f22` hero/soft variant, `#16132a` mockup window background). `#0b0a14` (`--bg-black`) now also doubles as the fill color of every primary CTA at rest — see Named Rules.
- **Panel fill** (`rgba(46,41,84,0.4)` → `rgba(19,17,36,0.4)`, translucent glass-tinted cards, often with `backdrop-filter: blur()`).
- **Borders** (`rgba(255,255,255,0.1)` rest / `rgba(255,255,255,0.18)` strong) — soft white hairlines, not tinted purple, except the primary-CTA border, which is purple by design (see Named Rules).
- **Text** — primary `#ffffff`, secondary `#b4aed1`, tertiary `#7d759e`.
- **The scrub handle is always white** (`#ffffff`), never a track color — console chrome that has to read as "the mechanism," not as any one track's signal. (The arrangement's own per-lane sweep/playhead line was this same device in the hero; it's gone along with the rest of the lane chrome it swept across — see Arrangement under Components.)

### Named Rules
**The Cut-In Button Rule.** Every primary action that sits on the dark page ground — the arrangement's hero CTA, the navbar's sign-up pill, the preregister form's submit button — reads as a control cut into the page rather than a filled object sitting on it: `var(--bg-black)` fill, `1.5px solid var(--purple-1)` border, filling solid `--purple-1` only on hover. The one stated exception is the closing CTA band's own button, which stays white-on-purple (`#ffffff` fill, `--purple-1` text) because it sits on the CTA band's own solid-purple section background, not the dark page ground the other three share — a dark fill there would fail contrast against a purple field. Do not apply the cut-in treatment to a button sitting on a colored section background; the rule is scoped to the dark ground.

**The Blob Rule.** Large (400–700px) heavily-blurred (60–90px) radial-gradient circles at low opacity are the system's ambient decoration, placed behind the preregister card seam and the closing CTA. The navbar still doesn't use this device — its depth stays console chrome: a generated waveform, hairline dividers, a functional scroll-blur. The hero is the one exception now: its own lanes, an inert ambient layer behind the headline (see Layout), carry a fixed low opacity and a radial `mask-image` rather than blur — not the blob shape or radius, but the same underlying instinct (dim, soften, push behind real foreground content) applied to real product texture instead of an abstract gradient circle. Do not read this as an opening to add an actual blob behind the arrangement; the device that changed is "the hero has *a* soft, receded background layer," not "the hero now uses blobs."

**The Track Color Rule.** Purple/Create, pink/Collaborate, gold/Get paid is the one color-to-meaning mapping the first viewport uses. It used to hold across two components — the wave scrubber's peak flags and the arrangement's lanes assigning the same color to the same section — but the navbar's peak flags are gone (an earlier round retired them; the wave is a plain scroll scrubber now), so the mapping lives in the hero alone at this point.

**The One-Gradient-Text Rule — retired.** Governed the earlier centered hero, where the wordmark alone used gradient-filled text. No element in the navbar or arrangement uses gradient text; the brand name reads as a solid-white word on the `MASTER` clip. (The closing CTA band's watermark text *is* a gradient fill — see Shapes/Components below — but it is a below-the-fold background device, not a revival of the retired hero rule.)

## Typography

**Only body/UI font:** Poppins (400/500/600/700/800), loaded via Google Fonts, applied to `html`, `body`, `button`, and `h1–h4`.

**Two scoped second voices, both inside the arrangement/hero only:** Space Grotesk (700), loaded via Google Fonts (`globals.css`), is scoped to exactly `.heroTitle` — the foreground headline, which carries its own copy (`t.hero.headline`) rather than restating the four track words. Playfair Display italic (600/700), replacing an intermediate JetBrains Mono attempt (explicit user feedback rejected it outright — "change it again, i dont like it at all"), is scoped to exactly the arrangement's four clip words (`Create.` / `Collaborate.` / `Get paid.` / `GrowYourMusic.`) — a standalone caption above its own clip now (see the clip word redesign), not layered over the waveform or sharing its box. Neither typeface appears in the navbar, in any button/label, or anywhere below the fold. Both are confirmed brand assets from PRODUCT.md, not new typefaces introduced for this build.

### Hierarchy
- **Hero display** (700, `clamp(36px, 5.6vw, 64px)`, Space Grotesk, line-height 1.08, letter-spacing -0.02em, centered): `.heroTitle`, the arrangement's real `<h1>` now — its own headline copy (`t.hero.headline`), `t.hero.headlineAccent` beneath as a `--purple-1` accent line.
- **Backdrop clip word** (600/700 on MASTER, `clamp(15px, 1.9vw, 22px)` / `clamp(17px, 2.2vw, 26px)` on MASTER, Playfair Display italic, line-height 1.1, a `border-bottom` underline beneath it): the same four words, now a standalone caption above each clip rather than sharing its box — see Layout.
- **Headline** (700, `clamp(28px, 3.6vw, 42px)`, Poppins): section `<h2>` titles below the fold — set with no kicker/eyebrow label above them (see Do's and Don'ts).
- **Showcase title** (700, 27px) and **benefit-card title** (700, 17px): the two below-fold feature-presentation scales.
- **Body** (400, 14–17px, line-height 1.7–1.8, Poppins): paragraph copy, including `.heroSubtitle` (16px) — the hero's now-foreground restatement of `t.hero.subtitle`.
- **Label** (500–600, 12–14px, Poppins): buttons, pill badges, form labels, the navbar's elapsed-time readout and peak-flag labels — distinguished by weight and size, never by typeface, except the two clip-tag/headline breaks above. (The arrangement's own lane-number labels are gone along with the rest of the lane chrome.)

### Named Rules
**The Two Scoped Voices Rule.** Space Grotesk is scoped to exactly `.heroTitle`, system-wide; Playfair Display italic is scoped to exactly the arrangement's four clip words, system-wide. Adding either to a new label, button, or heading anywhere else breaks the rule — each is a single deliberate accent for its one element, not a second general-purpose typeface.

## Layout

**Navbar — the wave scrubber** (`Transport.tsx`, mobile pass this round — explicit request: "make everything look good responsive (on mobile)... remove from the navbar on mobile the growyourmusic and early access texts and also the transport_lanestoggle button"). The bar is one continuous SVG waveform (160 bars, generated once from fixed sine harmonics — never `Math.random`, so server and client render an identical wave and never hydration-mismatch) spanning the bar's center, between a wordmark + "EARLY ACCESS" status line at the left and, at the right, an elapsed mm:ss readout, the EN/RO switcher, and the navbar's sign-up pill — deliberately outside the wave shape, so the wave itself stays the one continuous form. A play/pause status icon (`IconPlay`/`IconPause`) sits at the wave's left edge, reflecting real scroll activity — pause during an actual `scroll` event, back to play once `SCROLL_IDLE_MS` (220ms) passes with none, deliberately decoupled from the `ResizeObserver` that re-reads scroll progress on content reflow so a font/image load landing never falsely flips the icon to playing. A round white scrub handle sits at the true scroll fraction; the waveform's "played" portion is revealed to full white via a `clip-path: inset()` wipe on a duplicate bright layer. The wave no longer carries peak flags or a mobile-specific collapsed state (both retired in earlier rounds) — below 980px `.bar` switches from a three-column grid to two rows (session + controls on top, the same full wave on its own row below) rather than the wave itself changing form. This round removed the last two mobile-only devices: the wordmark + "EARLY ACCESS" badge (`.sessionMeta`) now `display: none` below 980px — the logo mark alone carries identity at that width, with `GrowYourMusic` staying in the accessible name via the mark image's own `alt` text — and `.lanesToggle` (the hamburger that revealed `#transport-lanes`, a menu of Home/Features/Who it's for/Sign up links styled as "lane" items) is deleted outright, JSX and CSS both, along with that menu and all the now-dead state driving it (`lanesOpen`, `activeIndex`, `positions`, the `LOCATORS`-based `measure()` pass). That menu was the *only* in-page section navigation anywhere on the site — desktop never had a visible nav list either, only the always-present sign-up pill — so removing it doesn't create a new asymmetry between breakpoints, it makes mobile match the zero-nav-chrome, scroll-to-discover shape desktop already shipped. The elapsed readout drops entirely below 1180px.

**Hero — the arrangement, word and clip split, clips framing the corners** (`Arrangement.tsx`, fourth restructure across four rounds; superseded devices noted below rather than re-documented in full). The section is a static composition — no scroll listener, no `--scroll-progress`, no pin, no crossfade (see the retired Pin-and-Crossfade Rule below); `.heroContent` (headline, subtitle, CTA, `.heroCirc`) is simply always fully visible, centered. Three intermediate devices for the lanes/clips were built and superseded across the last few rounds, none worth re-documenting in detail since none shipped: a full-bleed backdrop with a scroll-driven crossfade; a single `.lanesBackdrop` masked into an annulus around `.heroCirc`; and, last round, a bare clip (word + waveform sharing one box) scattered with a small random rotation/offset, split across two flex columns flanking `.heroContent` (`.lanesSide[data-side="left"]`: Create, Collaborate; `data-side="right"`: Get paid, Master — this column split is the one piece that *does* survive into the shipped state below). The shipped state, this round (explicit request: "remove the text from inside the clip, place it somewhere else next to the clip and also try to find some other positions for the clips. use taste skill and impeccable"): `.word` is no longer a child of `.clip` — it's a sibling caption in a new wrapping `.clipGroup`, sitting above the clip with a hairline `border-bottom` underline pointing down at it, rather than sharing the box with a `border-right` divider (see the clip word redesign below for the full lineage). `--track`/`--arm-delay` move up to `.clipGroup[data-track]`, the nearest ancestor common to both children now that word and clip aren't in a parent-child relationship any more. Repositioned: `.lanesSide` gets `align-self: stretch` (pulling it to `.arrangement`'s own full height) and `justify-content: space-between` (instead of a centered stack), pushing its two `.clipGroup`s toward the column's top and bottom — the four clips now frame the hero from its four corners (top-left/bottom-left/top-right/bottom-right) rather than clustering at the vertical center beside the text. The right column is mirrored (`.lanesSide[data-side="right"] .clipGroup { align-items: flex-end }`, `.word { text-align: right }`) so both wings read as framing the center symmetrically rather than both leaning the same direction. Below 1100px `.lanesSide` reverts to `justify-content: flex-start` with a normal gap (the space-between spread needs real height to read; a column stacked in normal flow has none) and the right column's mirroring resets to left-aligned, matching the left column, for a single readable top-to-bottom flow. The per-clip rotation/offset stagger (`CLIP_ROTATIONS`/`CLIP_OFFSETS`, keyed by index 0–3, not `:nth-child`, for the same two-container reason as before) carries over unchanged from last round.

**The clip word redesign** (three passes across two rounds on the same word, each an explicit request). Pass one moved `.word` from a large centered Space Grotesk display word to a small uppercase JetBrains Mono corner-tag pinned absolutely inside the clip; rejected outright ("change it again, i dont like it at all"), naming the direction wanted instead: "you may also place the text next to the wave not necessarily in the wave." Pass two put `.word` and the waveform side by side in one flex row inside `.clip` — a Playfair Display italic caption (`clamp(15px, 1.9vw, 22px)`, 600, 700/`clamp(17px, 2.2vw, 26px)` on MASTER) with a `border-right` divider before its own `.waveZone`. Pass three, this round (explicit request: "remove the text from inside the clip, place it somewhere else next to the clip"): the word leaves `.clip` entirely. `.clipGroup` (a new wrapping `<span>`) now holds `.word` and `.clip` as siblings, stacked vertically (`flex-direction: column`) — the word above, its own clip below. The divider rotates with it: `border-right` (a vertical rule, appropriate beside something) becomes `border-bottom` (a horizontal rule, appropriate above something) under the word's own `padding-bottom`, still pointing at the thing it labels. `width: fit-content` on `.word` keeps that underline sized to the text itself rather than stretching to the column's full width (`.clipGroup`'s default `align-items: stretch` would otherwise stretch it, since it's the only property giving the word an explicit cross-axis size to override stretch with). Same Playfair Display italic sizing and `armWord` color keyframe (arms to `var(--track)`) as pass two, unchanged — neither was part of any complaint. `.clip` itself sheds the sizing that used to share space with a word (`gap`, the flex row): it's just `.waveZone` now, height eased down from `min-height: clamp(58px, 8vw, 80px)` to `clamp(40px, 5vw, 56px)` since a wave-only pill reads fine thinner than a wave-plus-caption row did.

**Two real defects, caught and fixed in the rejected first pass, still relevant.** Taking `.word` out of `.clip`'s normal flow (that first pass's own device, since superseded twice over) removed the only thing giving `.clip` a real height for `.wave`'s percentage-based sizing to resolve against — fixed there with an explicit `min-height`, which `.clip` still carries for the same reason regardless of what's shared its box since (a word beside it, now nothing but the wave). Separately, dropping `.clip`'s `display: flex; align-items: center` without a replacement silently reverted the element (a bare `<span>`) to its default `display: inline`, where `width`/`min-height`/`height` all have **no effect** — the three non-master clips collapsed to a content-shrunk ~70px box instead of their intended 33%-of-lane-width thirds; only `.clipMaster` survived intact because it carried its own separate `display: flex`. Caught by `getBoundingClientRect()` measurement of `.clip` width against `.laneTrack` width, not by eye. Record: give any element whose children are all `position: absolute` (or, as here, a flex row) an explicit `display` that actually respects `width`/`height` — never leave a `<span>` to its inline default.

**The Pin-and-Crossfade Rule — retired.** For two rounds the hero pinned (`position: sticky`) inside a taller `.heroStage` and crossfaded `.heroContent` out / `.lanesBackdrop` in as `--scroll-progress` moved from 0 to 1, all four dependent properties driven off that one CSS custom property via `calc()`. Explicit feedback this round asked to remove the scroll animation outright and keep only the "before the scroll" state — `.heroStage`, the scroll listener, `--scroll-progress`, and every `calc()` reading it are all deleted; `.arrangement` is a plain static section again (no `position: sticky`). Record why the mechanism existed at all, in case a future brief asks for scroll-linked motion somewhere else: progress was computed fresh every frame from `getBoundingClientRect()`, never accumulated or eased forward, specifically so scrolling back up reran the identical function in reverse with no separate "closing" case — and no `transition` was ever added to a scrubbed property, since a transition fighting a value that already updates every scroll frame produces lag/overshoot, not smoothing. Both were correct calls for that device; neither is relevant now that the device is gone.

**Video lane — retired as an in-flow section, reborn as the join banner's backdrop** (superseding the "Video lane — the bento grid" entry from the prior round; `BentoBackdrop.tsx`/`.module.css`, `page.tsx`/`page.module.css` `.joinBannerStage`). The bento grid no longer sits in its own full-width row below the arrangement — the arrangement (`Arrangement.tsx`) now ends at the inspector column. The grid moved intact (now 13 cards, most of them full cards lifted verbatim from the product's own "Social media" Instagram-carousel decks — a wallet balance card, a marketplace shop card, a leaderboard podium, a lyrics card, and more, plus one original card with no deck source of its own: a marketplace reviews list, extending the deck's own sell→detail→feature numbering with the review count that number never actually got — laid out as a natural masonry `columns` flow rather than a fixed grid-template, so each card keeps its own real height) to become ambient background texture for the join banner immediately below it: an absolutely-positioned layer (`.joinBannerBackdrop`, full width, extending `clamp(160px, 20vw, 260px)` past the banner's own top edge and `clamp(220px, 26vw, 340px)` past its bottom edge so the backdrop reads as visibly taller than the card sitting on it) behind the banner within a shared `position: relative` stage (`.joinBannerStage`), rather than nested inside the banner's own box. `.joinBannerStage` carries matching `margin-top`/`margin-bottom: clamp(180px, 22vw, 320px)` — deliberately sized to outrun the backdrop's own bleed on both sides, so the stage sits with real breathing room clear of the arrangement's own inspector content above and the features section below (verified by measurement, not by eye: `arrangementBottom` to `backdropTop` stays a positive gap — 36px at 390px wide, 71–74px from 1440px to 1920px — at every width checked). `BentoBackdrop.tsx` renders the card list **twice** (`BACKDROP_CARDS = [...BENTO_CARDS, ...BENTO_CARDS]`) specifically because of this: a `columns` masonry layout only ever grows as tall as its actual content, so a single pass filled the top of the expanded plane and left the bottom bleed empty — real symptom, not a styling bug, first caught after the bleed was made taller than one pass of cards could cover. The banner keeps its existing opaque background (the radial-highlight-over-`--bg-black-soft` fill, the spinning conic-gradient top/bottom border) and, once settled, reads exactly as it did before — the grid is never visible through it at rest. The grid itself is tilted in 3D (`perspective: 2600px` on a wrapping `.plane`, `rotateY(-40deg) rotateX(2deg)` on the grid, pivoting from its own left edge) and right-edge-masked (the same `mask-image: linear-gradient()` fade device the audience marquee rows already use), so it reads as a wide plane of real product cards glimpsed from the left, receding and fading toward the right — real product texture standing in for a decorative blob, the same instinct that put live components in the grid instead of screenshots to begin with. A second `mask-image` on `.stage` itself (the outer wrapper, `linear-gradient(to bottom, transparent 0%, #000 16%, #000 84%, transparent 100%)`) tapers the top and bottom edges to transparent — not to a solid color, since the page's own `--bg-black` (set on `body` in `globals.css`) is already exactly what shows through at zero alpha, so the fade *is* the blend rather than an approximation of one painted on top of it. Masks on nested elements multiply, so this combines with `.grid`'s own left-right fade to taper all four edges without either mask having to account for the other's shape. **The Staged Reveal Rule.** One `IntersectionObserver` on the stage (mirroring `Reveal.tsx`'s own pattern, including its `prefers-reduced-motion` bypass) sets a single `data-revealed` boolean; two children key off that one trigger with different transition-delays rather than observing independently, so "the backdrop settles in, then the banner arrives after it" can never drift out of sync with itself: the backdrop fades/scales in immediately (0.9s, no delay), the banner fades up (`translateY(28px)→0`, 0.8s) starting 0.45s later. Do not add a third element to this stage without keying it off the same shared boolean.

**The "Interactive studio map" mockup** (`PlatformMockups.tsx`) sits inside the same shared `MockupFrame` app-window chrome (three dots + title bar) every other mockup uses.

**The closing CTA band watermark** (`page.module.css` `.ctaBandWatermark`, `page.tsx` `FitWidthText`). The brand name sits as a full-bleed background word behind the CTA band's copy, sized by measuring the text span's true natural width at a reference font-size and solving for the font-size that makes it exactly fill the container — not a viewport-unit `clamp()`, which clipped the word at both viewports tested on the first attempt. Record this as the reason a measured-fit approach is the system's device for any future full-bleed watermark text, not a font-size clamp.

Section padding below the fold is `108px 6%` desktop, `64px 5%` mobile, as before.

## Elevation & Depth

Soft glowing shadows remain the below-fold vocabulary: `--shadow-soft` (`0 20px 60px -20px rgba(20,10,60,0.55)`) on panels/mockups/CTA cards/bento-cell hover, `--shadow-lift` (`0 30px 80px -24px rgba(102,87,218,0.35)`) on primary buttons/hover. The sticky navbar carries `backdrop-filter: blur(14px)` as functional scroll chrome, not glass over a decorative blob. The arrangement's clips carry a permanent track-tinted glow again as of this round (`box-shadow: 0 16px 36px -22px color-mix(in srgb, var(--track) 65%, transparent)`, each clip's own `--track` color) — reintroduced now that a bare clip floating beside the circle has nothing else (no lane rail, no border) giving it presence; a clip had carried no shadow at all in the two intervening rounds between the original MASTER-only glow and this one, which is now dead history not worth its own account. There is no hover state on the clips — they're `pointer-events: none`, purely decorative — so this glow is static, not a hover affordance. The hero CTA's own rest-state glow (`0 14px 32px -16px rgba(102, 87, 218, 0.55)`, intensifying to `0 22px 44px -18px rgba(102, 87, 218, 0.75)` on hover) is unrelated and stays. A hovered bento cell lifts (`translateY`) with its own ambient shadow, borrowing `--shadow-soft` rather than a bespoke value.

## Shapes

Rounded everywhere: `--radius-pill` (999px) for every marketing button/badge/chip below the fold, and for all three cut-in primary CTAs; `--radius-lg` (24px) for major panels; `--radius-md` (16px) for mockup app-window frames; `--radius-sm` (10px) for the arrangement's own clips, inspector panel, hero CTA, and bento cells — the smaller, squarer console-chrome radius, distinct from the marketing pill. Peak flags and the elapsed readout use a tighter 4px radius, console-label scale.

### Named Rules
**The Conic Spin Rule.** A rotating `conic-gradient(from var(--border-angle), purple, pink, gold, purple-2, purple)` border (animated via `@keyframes spinBorder` incrementing `--border-angle`) is this system's one CTA-emphasis device beyond color and weight. It appears on exactly two families of element: the six below-fold benefit cards' visual frames (softer, alpha-blended stop colors) and the hero CTA button (full-saturation stop colors, layered on top of the cut-in fill/border treatment — the CTA is both a cut-in button and a conic-spin button simultaneously). Do not add a third, unrelated use without deriving it from this same technique.

## Components

### Buttons
Below the fold: pill-shaped (`--radius-pill`), Poppins 600–700, translucent + hairline border for ghost/secondary actions. The page's three primary CTAs — the arrangement's hero CTA, the navbar's sign-up pill, and the preregister form's submit button — all use **The Cut-In Button Rule** (see Colors → Named Rules): `var(--bg-black)` fill, `1.5px solid var(--purple-1)` border, filling solid purple only on hover. The hero CTA additionally wears the spinning conic-gradient border (see Shapes) with a low-opacity (0.06) pixel-mosaic background in the three track colors behind the label — dimmed from 0.16 this round because the same mosaic alpha reads far more blocky against the new dark fill than it did against the button's old solid-purple fill. The closing CTA band's own button is the one deliberate exception to the cut-in rule: white fill, purple text, because it sits on the band's own purple section background rather than the dark page ground.

### Cards / Containers
Rounded (`--radius-lg`/`--radius-md`), translucent gradient panel fill, 1px soft-white border, soft ambient shadow, below the fold. The preregister card is a two-column glass panel with `backdrop-filter: blur(20px)`. Bento cells (see Join banner backdrop below) use the smaller `--radius-sm` and a flat `--bg-panel` fill instead — console scale, not marketing-card scale.

### Inputs / Fields
Translucent fill (`rgba(255,255,255,0.05)`), `--radius-sm` (10px), hairline border, purple glow ring on focus.

### Navigation — The Wave Scrubber (signature component)
The navbar (`Transport.tsx`) is a continuous generated waveform, not a link list or a tick ruler: a wordmark + "EARLY ACCESS" status line at the left (mark image only below 980px — see Layout); a play/pause status icon reflecting real scroll activity; a centered SVG wave whose played portion (left of a round white scrub handle riding true scroll position) is revealed to white via a `clip-path: inset()` wipe against the dim unplayed remainder; an elapsed mm:ss readout, the EN/RO switcher, and the cut-in sign-up pill at the right, outside the wave shape. No nav-link menu any more at any width (see Layout for why removing it on mobile doesn't create a new gap) — the sign-up pill is the one persistent action. Drops to a two-row layout (wave on its own full-width row) under 980px; the mm:ss readout drops under 1180px.

### Arrangement (signature component)
The hero (`Arrangement.tsx`) is four `.clipGroup`s now — `Create.` / `Collaborate.` / `Get paid.` / `GrowYourMusic.` — with nothing else left of the "arrangement" console metaphor the name still refers to: no lane numbers, no level meters, no bar-grid background, no sweeping playhead line, and, as of this round, no shared box between a clip's word and its waveform either. Each group is a Playfair Display italic word (a hairline `border-bottom` underline beneath it) stacked above its own bare `.clip` — just `.waveZone`'s waveform now (46 bars for Create, up to 104 for MASTER, each with a bright peak-cap rectangle per bar), no caption inside it any more. On load, a clip's tinted fill/waveform/word still arms in sequence across the four (`--arm-delay` staggered 0/260/520/780ms, set on `.clipGroup[data-track]` — the ancestor common to both children now that they're siblings, not parent/child) — ambient motion, not an interaction cue. Arming colors the word to `var(--track)`. The four groups still split across two flex columns flanking `.heroContent` (`.lanesSide[data-side="left"]`: Create, Collaborate; `data-side="right"`: Get paid, Master), but each column now spreads its two groups toward the top and bottom corners (`justify-content: space-between` on a column stretched to the arrangement's own full height) rather than clustering them at the vertical center — the four read as framing the hero from its corners. The right column mirrors: its words right-align and its groups hug the column's own right edge, rather than repeating the left column's own leftward lean. Each clip still carries the permanent track-tinted glow and per-clip rotation/offset introduced last round (see Layout). `.lanesSide` is `pointer-events: none` — a real defect (missing since the flanking-column layout replaced the old backdrop; caught and fixed last round) meant the clips could otherwise be hovered/selected despite being `aria-hidden` and purely decorative. `.heroContent` is the section's real foreground, always fully visible, centered: its own dedicated headline copy (`t.hero.headline`, Space Grotesk), the platform's existing subtitle copy, and the cut-in CTA. `prefers-reduced-motion` still arms every clip immediately.

### Join banner backdrop (signature component, supersedes "Video-lane bento grid")
No longer part of the arrangement. The bento grid (`BentoBackdrop.tsx`) now renders as a tilted, low-opacity, right-edge-masked background layer behind the join banner (`page.tsx` `.joinBannerStage` / `.joinBannerBackdrop`) — see Layout for the full device (masonry flow, 3D tilt, mask fade, staged reveal). It is `aria-hidden` and `pointer-events: none`: purely ambient texture, not a second interactive copy of the grid.

### Mockup window chrome (signature component)
Every feature mockup (`PlatformMockups.tsx`), including the "Interactive studio map" (`StudioMapMockup`), is wrapped in the shared `MockupFrame`: a rounded panel with a top bar (three dot lights + a short title) over the mockup's own content, so all mockups read as one consistent product-screenshot family.

### Feature presentation (two registers, by design)
- **Showcase** (first 4 features, including the studio map): full-width alternating row, big 360px-tall mockup one side, icon badge + 27px title + description the other, heading set with no kicker label above it.
- **Benefit card** (remaining 6): 3-column grid, smaller icon badge, 17px title, description, then a 250px-tall compact mockup — a spinning conic-gradient border frames the visual (see Shapes).

### Closing CTA band watermark
A background word ("GrowYourMusic") behind the CTA band's copy, sized by real measurement (see Layout) rather than a viewport clamp, rendered as a top-to-bottom gradient from the band's own `--purple-1` to `#4a3ba8` — an existing value already the third stop in `.ctaBand`'s own background gradient, reused rather than invented. The band's own CTA button stays white-on-purple; see The Cut-In Button Rule for why it's excluded from the other three CTAs' treatment.

## Do's and Don'ts

### Do:
- **Do** use Poppins for every text role except `.heroTitle` (Space Grotesk) and the arrangement's clip words (Playfair Display italic) — do not reintroduce a third general-purpose typeface.
- **Do** keep Space Grotesk scoped to `.heroTitle` only, and Playfair Display italic scoped to the arrangement's clip words only (see The Two Scoped Voices Rule).
- **Do** give `.clip` (or any element whose children are all `position: absolute`) an explicit `min-height`/`height` rather than letting one child's font size accidentally establish it, and keep its `display` a value that actually respects `width`/`height` (`block`/`flex`/`grid` — never the default `inline` a bare `<span>` starts with) — both were real defects this round, the second one silent (no visual break in the one lane, `.clipMaster`, that happened to carry its own separate `display: flex`).
- **Do** keep the actual blob shape (radial-gradient circle, 400–700px, 60–90px blur) restricted to the preregister-seam and closing CTA. The hero's own backdrop softening (arrangement lanes: fixed low opacity + an annulus `mask-image`, no blur) is a different, lighter device for a different job (an ambient layer that reads as emerging from `.heroCirc` without ever competing with the text) — don't graft a literal blob onto the arrangement, and don't push the hero's own opacity up to blob-strength.
- **Do** apply The Cut-In Button Rule (`var(--bg-black)` fill, `1.5px solid var(--purple-1)` border, solid-purple fill on hover) to any new primary CTA that sits on the dark page ground; use the white-on-purple exception only for a CTA sitting on a colored (e.g. purple) section background where a dark fill would fail contrast.
- **Do** wrap any new feature mockup in the shared window-chrome frame with real icons.
- **Do** ground the scrub handle's position, the play/pause status icon's state, and the arrangement's arm timing in real measurement or real events — never hardcode a position or infer play state from something other than an actual scroll event.
- **Do** assign the same track color (purple/Create, pink/Collaborate, gold/Get paid) to a section wherever it's referenced in the first viewport — reserve solid full-field purple for the Master/summary state only.
- **Do** keep hover-solo (arrangement lanes, bento cells) on `filter`/`opacity`/`transform` properties disjoint from whatever an authored load animation on the same element already drives, so the two never fight the cascade.
- **Do** render a bento/mockup card at its cell's real dimensions with `overflow: hidden` cropping the overflow, rather than a fixed-size-then-scale-transform hack — the latter was tried and discarded as a failure this round.
- **Do** give asymmetric grid cells of meaningfully different real content density their own explicit row height at a breakpoint, rather than trusting an implicit/shared row to size correctly — the mobile bento fix this round.
- **Do** measure a full-bleed watermark or fit-to-container text against its container's real pixel width rather than approximating with a viewport-unit clamp.

### Don't:
- **Don't** revert to square corners, hairline-only borders, or monospace labels — that was the discarded pre-transport direction. A JetBrains Mono treatment for the arrangement's clip words was tried and explicitly rejected this round ("change it again, i dont like it at all"); the font isn't loaded in the shipped build — don't reintroduce it.
- **Don't** reintroduce gradient-filled text on body copy or headlines — the CTA band watermark is a background device, not a precedent for gradient text on readable copy.
- **Don't** use a kicker/eyebrow label (a small all-caps line above a heading) anywhere on the page. This is a craft-floor prohibition, not a device this system ever legitimately offered; two pre-existing kickers ("WHY GROWYOURMUSIC", "WHO IT'S FOR") were found and removed this round, along with the CSS rule (`.pillLabel`) that styled them. Do not reintroduce the pattern for a future heading.
- **Don't** let a compact benefit-card mockup overflow its frame — verify `scrollHeight <= clientHeight` when adding content to `PlatformMockups.tsx`; the compact frame height is a shared constant (currently 250px in `page.module.css`).
- **Don't** extend the first-viewport devices (the wave scrubber, the arrangement's clip arm mechanism) past the navbar and hero — below the fold keeps the premium-SaaS card/blob system this file documents.
- **Don't** fade arrangement or navbar text in from invisible on load — the arm/sweep motion changes weight and color on text that is legible from frame one; it does not reveal hidden text.
- **Don't** rely on `flex: 1` alone to hold a fixed height across a row-to-column breakpoint switch — `flex-basis: 0%` silently overrides an explicit `height` on whichever axis is currently the flex main axis; pin `flex: none; height: <value>` at the breakpoint instead.
- **Don't** default a below-fold `next/image` used in a full-page capture flow to lazy-loading without checking it actually fires; use `loading="eager"` for images that must render off-screen-but-soon (reserve `priority` for genuinely above-the-fold images only, to avoid an unneeded preload hint).
- **Don't** couple "content reflowed" re-measurement with "the visitor is scrolling" state in the same callback — the play/pause icon's fix this round splits them so a font/image load never falsely shows the icon as playing.
