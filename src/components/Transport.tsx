'use client'

import Image from 'next/image'
import { useEffect, useMemo, useRef, useState } from 'react'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import { track } from '@vercel/analytics'
import { useLanguage } from '@/i18n/LanguageContext'
import { IconPause, IconPlay } from '@/components/Icons'
import styles from './Transport.module.css'

// A nominal "track length" the scrub handle counts up against, mm:ss —
// this is a scrubber, not a DAW ruler, so elapsed time fits its own material
// better than a bar/beat count would.
const TRACK_SECONDS = 258

// How long to wait after the last real scroll event before flipping the
// status icon back to "paused" — decoupled from the ResizeObserver-driven
// progress reads below, so a font/image load landing mid-page never falsely
// flips the icon to "playing".
const SCROLL_IDLE_MS = 220

// Bars generated once from fixed harmonics (never Math.random — server and
// client must render the identical wave, or hydration mismatches).
const WAVE_BAR_COUNT = 480

// Integer hash → 0..1. Pure integer math, so every JS engine produces the
// same jitter (unlike a Math.sin-based hash).
function hash01(i: number): number {
  let x = Math.imul(i ^ 0x9e3779b9, 0x85ebca6b)
  x = Math.imul(x ^ (x >>> 13), 0xc2b2ae35)
  x ^= x >>> 16
  return (x >>> 0) / 4294967295
}

function generateWave(count: number): number[] {
  const bars: number[] = []
  for (let i = 0; i < count; i += 1) {
    const t = i / count
    const v =
      Math.sin(t * Math.PI * 5.2 + 0.6) * 20 +
      Math.sin(t * Math.PI * 13 + 1.9) * 13 +
      Math.sin(t * Math.PI * 31 + 0.3) * 10 +
      Math.sin(t * Math.PI * 73 + 2.2) * 8 +
      (hash01(i) - 0.5) * 34
    bars.push(Math.max(8, Math.min(100, Math.round(46 + v))))
  }
  return bars
}

const WAVE_BARS = generateWave(WAVE_BAR_COUNT)

function WaveBars({ bright }: { bright?: boolean }) {
  const step = 100 / WAVE_BARS.length
  return (
    <>
      {WAVE_BARS.map((height, index) => (
        <rect
          key={index}
          className={bright ? styles.waveBarBright : styles.waveBarDim}
          x={index * step + step * 0.2}
          y={50 - height / 2}
          width={step * 0.6}
          height={height}
          rx={step * 0.3}
        />
      ))}
    </>
  )
}

export default function Transport() {
  const { t } = useLanguage()
  const [progress, setProgress] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)
  const frame = useRef<number | null>(null)
  const trackRef = useRef<HTMLDivElement | null>(null)
  const scrollIdleTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const read = () => {
      frame.current = null
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      setProgress(scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0)
    }

    const onScroll = () => {
      if (frame.current === null) frame.current = window.requestAnimationFrame(read)

      setIsScrolling(true)
      if (scrollIdleTimer.current !== null) window.clearTimeout(scrollIdleTimer.current)
      scrollIdleTimer.current = setTimeout(() => {
        scrollIdleTimer.current = null
        setIsScrolling(false)
      }, SCROLL_IDLE_MS)
    }

    read()

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', read)

    // The page's total scrollable height shifts as fonts and images land;
    // re-read progress against the up-to-date height when it does. Deliberately
    // does not touch isScrolling — only real 'scroll' events should flip the
    // play/pause icon.
    const observer = new ResizeObserver(read)
    observer.observe(document.body)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', read)
      observer.disconnect()
      if (frame.current !== null) window.cancelAnimationFrame(frame.current)
      if (scrollIdleTimer.current !== null) window.clearTimeout(scrollIdleTimer.current)
    }
  }, [])

  const elapsed = Math.round(progress * TRACK_SECONDS)
  const readout = useMemo(() => {
    const mm = Math.floor(elapsed / 60)
    const ss = String(elapsed % 60).padStart(2, '0')
    return `${mm}:${ss}`
  }, [elapsed])

  return (
    <header className={styles.transport}>
      <div className={styles.bar}>
        <a className={styles.session} href="#top" aria-label="GrowYourMusic">
          <Image
            src="/img/gym-logo-glass.png"
            alt=""
            width={800}
            height={667}
            className={styles.mark}
            priority
          />
        </a>

        <div className={styles.waveWrap} aria-hidden="true">
          <div className={styles.waveTrack} ref={trackRef}>
            <svg className={styles.waveSvg} viewBox="0 0 100 100" preserveAspectRatio="none" focusable="false">
              <defs>
                <linearGradient id="transportWaveFill" x1="0" y1="0" x2="100" y2="0" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="var(--brand)" />
                  <stop offset="100%" stopColor="var(--brand-ink)" />
                </linearGradient>
              </defs>
              <g>
                <WaveBars />
              </g>
              <g style={{ clipPath: `inset(0 ${100 - progress * 100}% 0 0)` }}>
                <WaveBars bright />
              </g>
            </svg>
            <span className={styles.scrubHandle} style={{ left: `${progress * 100}%` }} />
          </div>

          <div className={styles.timecode}>
            <span className={styles.playState}>
              {isScrolling ? <IconPause /> : <IconPlay />}
            </span>
            <span className={styles.readout}>{readout}</span>
          </div>
        </div>

        <div className={styles.controls}>
          <LanguageSwitcher />
          <a
            className={styles.record}
            href="#preregister-form"
            onClick={() => track('cta_click', { location: 'transport_record' })}
          >
            {t.nav.register}
          </a>
        </div>
      </div>
    </header>
  )
}
