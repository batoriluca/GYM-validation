'use client'

import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from 'react'
import { track } from '@vercel/analytics'
import { useLanguage } from '@/i18n/LanguageContext'
import FeatureGlyph, { GlyphTile, drawPlay } from '@/components/FeatureGlyphs'
import styles from './Arrangement.module.css'

// "Your whole music career. One place to grow it." -> two lines, so the
// break always falls between the sentences instead of mid-phrase.
function splitSentences(text: string): string[] {
  const at = text.indexOf('. ')
  return at === -1 ? [text] : [text.slice(0, at + 1), text.slice(at + 2)]
}

// The hero, in the manner of a product launch page. A mini-player capsule
// (a play mark in the feature-glyph tile, "GrowYourMusic | Early access" on
// one line, a spark running round its edge) sits
// over one large headline, then one short line, one button and one text
// link, all centred with a lot of air. Below them, all ten feature icons.
// At the top of the page they're gathered in a tight fanned stack; as the
// page scrolls they deal out into one gently curved row, largest in the
// middle. The row sits on the seam between the hero and the signup section:
// the hero fades into the next section's colour and the tiles hang across
// the join, half in each.
// One row of all ten feature icons, Messages and the marketplace in the
// middle. Spread positions on the 1000px stage: tiles shrink 9px per step out
// from the middle (108 - 9·distance) and keep a 12px gap, so each tile's
// centre is the running sum of half-widths and gaps.
const ROW = [7, 3, 9, 2, 1, 0, 8, 4, 5, 6]
const GAP = 12
const sizeAt = (distance: number) => 108 - 9 * distance
const SPREAD_X = ROW.map((_, i) => {
  const offset = i - (ROW.length - 1) / 2
  let x = sizeAt(0.5) / 2 + GAP / 2
  for (let d = 1.5; d <= Math.abs(offset); d += 1) x += sizeAt(d - 1) / 2 + GAP + sizeAt(d) / 2
  return Math.sign(offset) * x
})
// Half the row's span on the 1000px stage: the outermost centre plus half the outermost tile.
const HALF_SPAN = Math.abs(SPREAD_X[0]) + sizeAt((ROW.length - 1) / 2) / 2
// Phones: every tile the same size (UNIFORM on the 1000px stage), evenly spaced.
const UNIFORM = 90
const UNIFORM_X = ROW.map((_, i) => (i - (ROW.length - 1) / 2) * (UNIFORM + GAP))
const UNIFORM_HALF_SPAN = Math.abs(UNIFORM_X[0]) + UNIFORM / 2
const CAROUSEL_QUERY = '(max-width: 640px)'

export default function Arrangement() {
  const { t } = useLanguage()
  const heroRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const railRef = useRef<HTMLDivElement>(null)
  // Phones only: once the row has fully spread, it turns into a swipeable
  // carousel (a native horizontal scroller drawing the same tiles at the same
  // spread positions, so the swap is invisible). Scrolling back up hands the
  // row back to the scroll animation.
  const [carousel, setCarousel] = useState(false)

  // --k: the row is drawn on a 1000px stage and scaled to the stage width.
  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return
    const fit = () => stage.style.setProperty('--k', (stage.clientWidth / 1000).toFixed(4))
    fit()
    const observer = new ResizeObserver(fit)
    observer.observe(stage)
    return () => observer.disconnect()
  }, [])

  // --p: 0 at the top of the page, 1 once about a third of the hero has scrolled past.
  useEffect(() => {
    const hero = heroRef.current
    if (!hero) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      hero.style.setProperty('--p', '1')
      const mq = window.matchMedia(CAROUSEL_QUERY)
      const sync = () => setCarousel(mq.matches)
      sync()
      mq.addEventListener('change', sync)
      return () => mq.removeEventListener('change', sync)
    }
    let frame: number | null = null
    const read = () => {
      frame = null
      const rect = hero.getBoundingClientRect()
      const p = Math.min(1, Math.max(0, -rect.top / (rect.height * 0.35)))
      hero.style.setProperty('--p', p.toFixed(3))
      const next = p >= 1 && window.matchMedia(CAROUSEL_QUERY).matches
      const rail = railRef.current
      if (!next && rail) {
        // Leaving the carousel after a swipe: start the animated row where the
        // carousel left it (--sx), then let it glide back to centre.
        const shift = (rail.scrollWidth - rail.clientWidth) / 2 - rail.scrollLeft
        hero.style.setProperty('--sx', '0px')
        if (Math.abs(shift) > 1) {
          hero.dataset.sxReturn = 'false'
          hero.style.setProperty('--sx', `${shift.toFixed(1)}px`)
          requestAnimationFrame(() =>
            requestAnimationFrame(() => {
              hero.dataset.sxReturn = 'true'
              hero.style.setProperty('--sx', '0px')
            }),
          )
        }
      }
      setCarousel(next)
    }
    const onScroll = () => {
      if (frame === null) frame = requestAnimationFrame(read)
    }
    read()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame !== null) cancelAnimationFrame(frame)
    }
  }, [])

  // Entering carousel mode: start centred, exactly where the spread row is.
  useLayoutEffect(() => {
    const rail = railRef.current
    if (carousel && rail) rail.scrollLeft = (rail.scrollWidth - rail.clientWidth) / 2
  }, [carousel])

  return (
    <section className={styles.hero} id="top" ref={heroRef}>
      <div className={styles.head}>
        <div className={styles.player}>
          <span className={styles.playerDisc}>
            <GlyphTile draw={drawPlay} size="xl" />
          </span>
          <span className={styles.playerTitle}>GrowYourMusic</span>
          <span className={styles.playerRule} aria-hidden="true" />
          <span className={styles.playerSub}>{t.landing.heroBadge}</span>
        </div>

        <h1 className={styles.title}>
          {splitSentences(t.landing.heroTitle).map((sentence, i) => (
            <span key={i} className={i === 0 ? `${styles.titleLead} glass-text` : styles.titleFollow}>
              {i === 0 ? sentence : <span className="glass-text-blue">{sentence}</span>}
            </span>
          ))}
        </h1>
        <p className={styles.line}>{t.landing.heroLine}</p>

        <div className={styles.actions}>
          <a
            className={styles.primary}
            href="#preregister-form"
            onClick={() => track('cta_click', { location: 'arrangement' })}
          >
            {t.cta.button}
          </a>
          <a className={styles.link} href="#features">
            {t.landing.heroLink}
            <svg viewBox="0 0 12 12" width="12" height="12" aria-hidden="true">
              <path d="M4.5 2.5 8 6l-3.5 3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>

      <div
        className={styles.stage}
        ref={stageRef}
        aria-hidden="true"
        data-carousel={carousel ? 'true' : 'false'}
        style={{ '--half-span': HALF_SPAN, '--half-span-m': UNIFORM_HALF_SPAN, '--uniform': UNIFORM } as CSSProperties}
      >
        {ROW.map((glyph, i) => {
          const offset = i - (ROW.length - 1) / 2
          const distance = Math.abs(offset)
          return (
            <div
              key={glyph}
              className={styles.layer}
              style={
                {
                  '--o': offset,
                  '--a': distance,
                  '--x': SPREAD_X[i],
                  '--xm': UNIFORM_X[i],
                  zIndex: 10 - Math.floor(distance),
                  animationDelay: `${80 + distance * 70}ms`,
                } as CSSProperties
              }
            >
              <FeatureGlyph index={glyph} size="xl" />
            </div>
          )
        })}
        {carousel && (
          <div className={styles.rail} ref={railRef}>
            <div className={styles.railTrack}>
              {ROW.map((glyph, i) => {
                const distance = Math.abs(i - (ROW.length - 1) / 2)
                return (
                  <div
                    key={glyph}
                    className={styles.slide}
                    style={{ '--a': distance, '--x': SPREAD_X[i], '--xm': UNIFORM_X[i], zIndex: 10 - Math.floor(distance) } as CSSProperties}
                  >
                    <FeatureGlyph index={glyph} size="xl" />
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
