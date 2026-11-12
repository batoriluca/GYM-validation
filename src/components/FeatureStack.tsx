'use client'

import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react'
import Image from 'next/image'
import { useLanguage } from '@/i18n/LanguageContext'
import FeatureGlyph from '@/components/FeatureGlyphs'
import { PLATFORM_PIECES } from '@/components/platform/PlatformPieces'
import styles from './FeatureStack.module.css'

// Fits one real platform component into the card's visual column: it keeps
// its app size and is scaled down (never up) until it fits both ways.
function Fit({ children }: { children: ReactNode }) {
  const boxRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const box = boxRef.current
    const inner = innerRef.current
    if (!box || !inner) return
    const fit = () => {
      const w = inner.offsetWidth
      const h = inner.offsetHeight
      if (!w || !h) return
      // Fit the width; fit the height too, but never below 0.72 so text
      // stays legible. A piece still taller than the stage is anchored to
      // the top and fades out at the bottom edge, like a cropped panel.
      // Phones get a tighter inset so the phone-sized pieces render near 1:1.
      const pad = box.clientWidth < 480 ? 20 : 48
      const byWidth = (box.clientWidth - pad) / w
      const byHeight = (box.clientHeight - pad) / h
      const scale = Math.min(1, byWidth, Math.max(byHeight, Math.min(0.72, byWidth)))
      inner.style.setProperty('--fit', scale.toFixed(4))
      box.dataset.crop = h * scale > box.clientHeight - pad ? 'true' : 'false'
    }
    fit()
    const observer = new ResizeObserver(fit)
    observer.observe(box)
    observer.observe(inner)
    return () => observer.disconnect()
  }, [])
  return (
    <div className={styles.fit} ref={boxRef}>
      <div className={styles.fitInner} ref={innerRef}>
        {children}
      </div>
    </div>
  )
}

// Horizontal crop (object-position x, %) of the wave for each card.
const WAVE_CROPS = [8, 34, 62, 88, 20, 48, 76, 14, 56, 92]

const MAX_PEEKING = 2 // how many earlier cards may show their top edge above the current one

const smoothstep = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)))
  return t * t * (3 - 2 * t)
}

// A deck of feature cards. Every card pins (CSS sticky) at the same spot, so
// scrolling slides the next card up over the last. A covered card lifts a
// few px per card on top of it (so its top edge peeks out above), shrinks a
// touch (no dimming: cards stay fully visible), in proportion to how far the cards above have slid
// in. Only MAX_PEEKING earlier cards stay visible; deeper ones fade out, so
// the pile never grows. Reverse scroll replays it backwards, because the
// value is read fresh from layout each frame (from the untransformed slots).
export default function FeatureStack() {
  const { t } = useLanguage()
  const slotRefs = useRef<(HTMLLIElement | null)[]>([])
  const cardRefs = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let frame: number | null = null
    const read = () => {
      frame = null
      const slots = slotRefs.current
      const cards = cardRefs.current

      // slide[j]: how far card j has slid over card j-1 (0..1).
      const slide: number[] = []
      for (let j = 0; j < slots.length; j += 1) {
        const slot = slots[j]
        const prev = slots[j - 1]
        const prevCard = cards[j - 1]
        if (!slot || !prev || !prevCard) {
          slide[j] = 0
          continue
        }
        const gap = slot.getBoundingClientRect().top - prev.getBoundingClientRect().top
        slide[j] = Math.min(1, Math.max(0, 1 - gap / (prevCard.offsetHeight || 1)))
      }

      // depth: how many cards (fractionally) now lie on top of card i.
      let depth = 0
      for (let i = cards.length - 1; i >= 0; i -= 1) {
        const card = cards[i]
        if (card) {
          const lift = Math.min(depth, MAX_PEEKING)
          const opacity = 1 - smoothstep(MAX_PEEKING - 0.4, MAX_PEEKING + 0.6, depth)
          card.style.setProperty('--lift', lift.toFixed(3))
          card.style.setProperty('--o', opacity.toFixed(3))
          card.style.pointerEvents = opacity < 0.05 ? 'none' : ''
        }
        depth += slide[i] ?? 0
      }
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

  return (
    <ol className={styles.stack}>
      {t.landing.items.map((item, index) => (
        <li
          key={index}
          className={styles.slot}
          style={{ '--i': index } as CSSProperties}
          ref={(node) => {
            slotRefs.current[index] = node
          }}
        >
          <article
            className={styles.card}
            ref={(node) => {
              cardRefs.current[index] = node
            }}
          >
            <div className={styles.copy}>
              <span className={styles.icon}>
                <FeatureGlyph index={index} />
              </span>
              <h3 className={`${styles.title} glass-text`}>{item.title}</h3>
              <p className={styles.text}>{item.text}</p>
            </div>
            <div className={styles.visual}>
              {/* The brand wave line-art (el1.png, as in the join and closing
                  sections), a different crop per card and mirrored on every
                  other one, so the stages read as one continuous wave. */}
              <Image
                src="/img/el1.png"
                alt=""
                aria-hidden="true"
                fill
                sizes="(max-width: 900px) 260vw, 1400px"
                className={styles.stageWave}
                style={{ objectPosition: `${WAVE_CROPS[index % WAVE_CROPS.length]}% 50%` }}
                data-flip={index % 2 === 1 ? 'true' : 'false'}
              />
              {(() => {
                const Piece = PLATFORM_PIECES[index]
                return Piece ? (
                  <Fit>
                    <Piece />
                  </Fit>
                ) : null
              })()}
            </div>
          </article>
        </li>
      ))}
    </ol>
  )
}
