'use client'

import { useId, type ReactNode } from 'react'
import styles from './FeatureGlyphs.module.css'

// Abstract feature marks in the language of the Instagram highlight covers
// (Social media/highlights): a raised violet glass tile with a white→lilac
// gradient glyph and a soft lilac glow. Glyphs are drawn on a 100×100 grid,
// one solid "hero" shape per mark plus translucent supporting shapes, so
// they read as a family rather than as literal pictograms.
// Order matches t.landing.items.

type Paint = { g: string } // url(#gradient) for this instance

const GLYPHS: ((p: Paint) => ReactNode)[] = [
  // 0 Marketplace: a price tag with a second tag behind it
  ({ g }) => (
    <>
      <path d="M38 10 H72 Q80 10 80 18 V52 L44 88 L4 48 Z" fill={g} opacity="0.28" transform="translate(14 0)" />
      <path d="M30 18 H62 Q70 18 70 26 V58 L36 92 L0 56 Z" fill={g} transform="translate(8 0)" />
      <circle cx="62" cy="34" r="7" fill="#2a1f55" />
    </>
  ),
  // 1 Messages: two overlapping bubbles, the front one solid
  ({ g }) => (
    <>
      <path d="M40 30 H84 Q94 30 94 40 V64 Q94 74 84 74 H80 V88 L64 74 H50 Q40 74 40 64 Z" fill={g} opacity="0.3" />
      <path d="M14 14 H58 Q68 14 68 24 V48 Q68 58 58 58 H34 L18 72 V58 H14 Q4 58 4 48 V24 Q4 14 14 14 Z" fill={g} />
      <circle cx="22" cy="36" r="4.5" fill="#2a1f55" />
      <circle cx="36" cy="36" r="4.5" fill="#2a1f55" />
      <circle cx="50" cy="36" r="4.5" fill="#2a1f55" />
    </>
  ),
  // 2 Studio map: a drop-shaped pin over ripple rings
  ({ g }) => (
    <>
      <ellipse cx="50" cy="82" rx="42" ry="12" fill="none" stroke={g} strokeWidth="5" opacity="0.28" />
      <ellipse cx="50" cy="82" rx="22" ry="6" fill={g} opacity="0.45" />
      <path d="M50 80 C40 66 24 52 24 34 A26 26 0 0 1 76 34 C76 52 60 66 50 80 Z" fill={g} />
      <circle cx="50" cy="34" r="9" fill="#2a1f55" />
    </>
  ),
  // 3 Calendar with managers: a grid of days, one lit
  ({ g }) => (
    <>
      {[0, 1, 2].map((row) =>
        [0, 1, 2].map((col) => {
          const lit = row === 1 && col === 2
          return (
            <rect
              key={`${row}-${col}`}
              x={8 + col * 30}
              y={8 + row * 30}
              width="24"
              height="24"
              rx="7"
              fill={g}
              opacity={lit ? 1 : row === 0 ? 0.55 : 0.25}
            />
          )
        }),
      )}
    </>
  ),
  // 4 Library: three stacked layers (single, EP, album)
  ({ g }) => (
    <>
      <path d="M50 58 L92 72 L50 88 L8 72 Z" fill={g} opacity="0.25" strokeLinejoin="round" />
      <path d="M50 38 L92 52 L50 68 L8 52 Z" fill={g} opacity="0.5" />
      <path d="M50 14 L92 30 L50 46 L8 30 Z" fill={g} />
    </>
  ),
  // 5 Leaderboard: a podium with a spark over the top step
  ({ g }) => (
    <>
      <rect x="6" y="60" width="26" height="32" rx="6" fill={g} opacity="0.35" />
      <rect x="68" y="68" width="26" height="24" rx="6" fill={g} opacity="0.22" />
      <rect x="37" y="44" width="26" height="48" rx="6" fill={g} />
      <path d="M50 4 L54.5 17.5 L68 22 L54.5 26.5 L50 40 L45.5 26.5 L32 22 L45.5 17.5 Z" fill={g} />
    </>
  ),
  // 6 Posting: a frame with a sun and a hill, a play mark breaking out
  ({ g }) => (
    <>
      <rect x="4" y="14" width="72" height="64" rx="14" fill={g} opacity="0.28" />
      <path d="M4 66 L28 44 L46 60 L58 50 L76 64 V64 Q76 78 62 78 H18 Q4 78 4 64 Z" fill={g} opacity="0.55" />
      <circle cx="26" cy="34" r="7" fill={g} />
      <circle cx="72" cy="66" r="24" fill={g} />
      <path d="M66 55 L82 66 L66 77 Z" fill="#2a1f55" />
    </>
  ),
  // 7 AI lyrics: lines of text resolving into a spark
  ({ g }) => (
    <>
      <rect x="6" y="20" width="56" height="10" rx="5" fill={g} opacity="0.35" />
      <rect x="6" y="42" width="44" height="10" rx="5" fill={g} opacity="0.55" />
      <rect x="6" y="64" width="30" height="10" rx="5" fill={g} />
      <path d="M72 38 L77.5 55 L94 60 L77.5 65.5 L72 82 L66.5 65.5 L50 60 L66.5 55 Z" fill={g} />
      <path d="M86 10 L88.5 17.5 L96 20 L88.5 22.5 L86 30 L83.5 22.5 L76 20 L83.5 17.5 Z" fill={g} opacity="0.6" />
    </>
  ),
  // 8 Wallet: a card with a coin breaking over its edge
  ({ g }) => (
    <>
      <rect x="4" y="20" width="70" height="50" rx="12" fill={g} opacity="0.3" />
      <rect x="4" y="32" width="70" height="9" fill={g} opacity="0.5" />
      <circle cx="68" cy="66" r="26" fill={g} />
      <circle cx="68" cy="66" r="14" fill="none" stroke="#2a1f55" strokeWidth="5" />
    </>
  ),
  // 9 Contracts: two pages meeting at a seal
  ({ g }) => (
    <>
      <path d="M30 6 H64 L80 22 V78 Q80 84 74 84 H30 Q24 84 24 78 V12 Q24 6 30 6 Z" fill={g} opacity="0.28" />
      <path d="M12 16 H46 L62 32 V88 Q62 94 56 94 H12 Q6 94 6 88 V22 Q6 16 12 16 Z" fill={g} opacity="0.55" />
      <path d="M16 70 C24 58 30 80 38 66 S48 64 52 70" fill="none" stroke="#2a1f55" strokeWidth="5" strokeLinecap="round" />
      <circle cx="72" cy="70" r="20" fill={g} />
      <path d="M63 70 L69.5 76.5 L81 64" fill="none" stroke="#2a1f55" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
]

export const FEATURE_GLYPH_COUNT = GLYPHS.length

type TileSize = 'md' | 'lg' | 'xl'

// The raised glass tile + gradient glyph, for any mark drawn to the recipe
// above (feature marks here, and one-off marks such as the hero play disc).
export function GlyphTile({ draw, size = 'md' }: { draw: (p: Paint) => ReactNode; size?: TileSize }) {
  const id = useId().replace(/:/g, '')
  return (
    <span className={`${styles.tile} ${size === 'lg' ? styles.lg : size === 'xl' ? styles.xl : ''}`} aria-hidden="true">
      <svg className={styles.glyph} viewBox="0 0 100 100">
        <defs>
          <linearGradient id={`fg${id}`} gradientUnits="userSpaceOnUse" x1="20" y1="0" x2="60" y2="100">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="0.55" stopColor="#e4e0ff" />
            <stop offset="1" stopColor="#a99dff" />
          </linearGradient>
        </defs>
        {draw({ g: `url(#fg${id})` })}
      </svg>
    </span>
  )
}

// Play: a solid rounded triangle with a translucent echo trailing behind it.
export const drawPlay = ({ g }: Paint) => (
  <>
    <path d="M14 22 Q14 13 22 18 L62 44 Q69 50 62 56 L22 82 Q14 87 14 78 Z" fill={g} opacity="0.3" />
    <path d="M32 18 Q32 9 40 14 L84 44 Q91 50 84 56 L40 86 Q32 91 32 82 Z" fill={g} />
  </>
)

export default function FeatureGlyph({ index, size = 'md' }: { index: number; size?: TileSize }) {
  return <GlyphTile draw={GLYPHS[index % GLYPHS.length]} size={size} />
}
