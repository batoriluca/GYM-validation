'use client'

import Image from 'next/image'
import { type ReactNode } from 'react'
import logo from '../carousel/_assets/logo.png'
import styles from './story.module.css'

// Instagram story (1080x1920), Romanian: six platform features as frosted
// glass tiles either side of a central GrowYourMusic window (glass language
// after Social media/story/imagini_ajutatoare). Exported by
// Social media/story/scripts/export.mjs. Everything below ~1420px is left
// empty on purpose for the link sticker added in Instagram.

// ---------- line icons (100x100, drawn to sit on glass) ----------

function Glyph({ children }: { children: ReactNode }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {children}
    </svg>
  )
}

const ICONS: Record<string, ReactNode> = {
  marketplace: (
    <Glyph>
      <path d="M14 36 H62 L66 82 H10 Z" fill="currentColor" fillOpacity="0.22" />
      <path d="M26 40 V30 A12 12 0 0 1 50 30 V40" />
      <rect x="46" y="54" width="42" height="28" rx="6" fill="#2a1f55" />
      <rect x="46" y="54" width="42" height="28" rx="6" fill="currentColor" fillOpacity="0.3" />
      <path d="M46 63 H88 M54 74 H64" />
    </Glyph>
  ),
  messages: (
    <Glyph>
      <path d="M12 20 H62 Q68 20 68 26 V50 Q68 56 62 56 H32 L20 66 V56 H12 Q6 56 6 50 V26 Q6 20 12 20 Z" fill="currentColor" fillOpacity="0.22" />
      <path d="M76 38 H88 Q94 38 94 44 V66 Q94 72 88 72 H82 V82 L70 72 H48 Q42 72 42 66 V62" />
      <path d="M22 38 H52" />
    </Glyph>
  ),
  studios: (
    <Glyph>
      <path d="M8 30 L34 20 L66 30 L92 20 V72 L66 82 L34 72 L8 82 Z" fill="currentColor" fillOpacity="0.14" />
      <path d="M34 20 V72 M66 30 V82" strokeOpacity="0.55" />
      <path d="M50 66 C44 58 36 50 36 40 A14 14 0 0 1 64 40 C64 50 56 58 50 66 Z" fill="#2a1f55" />
      <path d="M50 66 C44 58 36 50 36 40 A14 14 0 0 1 64 40 C64 50 56 58 50 66 Z" fill="currentColor" fillOpacity="0.4" />
      <circle cx="50" cy="40" r="4.5" fill="currentColor" stroke="none" />
    </Glyph>
  ),
  calendar: (
    <Glyph>
      <rect x="12" y="20" width="76" height="66" rx="10" fill="currentColor" fillOpacity="0.16" />
      <path d="M12 38 H88" />
      <path d="M32 12 V26 M68 12 V26" />
      <rect x="26" y="50" width="10" height="9" rx="2" fill="currentColor" stroke="none" fillOpacity="0.55" />
      <rect x="45" y="50" width="10" height="9" rx="2" fill="currentColor" stroke="none" fillOpacity="0.55" />
      <rect x="64" y="50" width="10" height="9" rx="2" fill="currentColor" stroke="none" />
      <rect x="26" y="66" width="10" height="9" rx="2" fill="currentColor" stroke="none" fillOpacity="0.55" />
      <rect x="45" y="66" width="10" height="9" rx="2" fill="currentColor" stroke="none" fillOpacity="0.55" />
    </Glyph>
  ),
  library: (
    <Glyph>
      <path d="M8 50 V50 M16 42 V58 M24 46 V54" strokeOpacity="0.7" />
      <path d="M76 46 V54 M84 40 V60 M92 48 V52" strokeOpacity="0.7" />
      <path d="M40 72 V24 L68 18 V64" />
      <ellipse cx="33" cy="72" rx="9" ry="7.5" fill="currentColor" />
      <ellipse cx="61" cy="65" rx="9" ry="7.5" fill="currentColor" />
      <path d="M40 34 L68 28" />
    </Glyph>
  ),
  charts: (
    <Glyph>
      <path d="M30 14 H70 V36 Q70 56 50 58 Q30 56 30 36 Z" fill="currentColor" fillOpacity="0.22" />
      <path d="M30 22 H18 Q14 22 14 28 Q16 42 31 44 M70 22 H82 Q86 22 86 28 Q84 42 69 44" />
      <path d="M50 58 V72 M34 86 H66 M38 86 V78 Q38 72 44 72 H56 Q62 72 62 78 V86" />
      <path d="M50 25 L53 31.5 L60 32.3 L54.8 37 L56.2 44 L50 40.4 L43.8 44 L45.2 37 L40 32.3 L47 31.5 Z" fill="currentColor" stroke="none" />
    </Glyph>
  ),
}

// ---------- layout (slide px) ----------

const TILE = 152
const COL_LEFT = 76
const COL_RIGHT = 1080 - 76 - TILE
const ROWS = [600, 904, 1208] // tile tops
const ROW_INSET = [92, 0, 92] // top and bottom rows pulled in toward the window

const WIN = { x: 316, y: 852, w: 448, h: 266 }

type Feature = { key: string; label: string; side: 'left' | 'right'; row: number }

const FEATURES: Feature[] = [
  { key: 'marketplace', label: 'Marketplace', side: 'left', row: 0 },
  { key: 'messages', label: 'Mesaje și colaborări', side: 'right', row: 0 },
  { key: 'studios', label: 'Hartă de studiouri', side: 'left', row: 1 },
  { key: 'calendar', label: 'Calendar cu manager', side: 'right', row: 1 },
  { key: 'library', label: 'Biblioteca ta', side: 'left', row: 2 },
  { key: 'charts', label: 'Clasamente', side: 'right', row: 2 },
]

// ---------- central platform window ----------

const WAVE = [18, 34, 22, 48, 64, 40, 78, 56, 92, 70, 44, 86, 60, 100, 72, 50, 88, 58, 36, 74, 52, 30, 62, 42, 24, 46, 28, 16]
const NAV_WIDTHS = [44, 30, 38, 26, 34]

function PlatformWindow() {
  return (
    <div className={`${styles.glass} ${styles.window}`} style={{ left: WIN.x, top: WIN.y, width: WIN.w, height: WIN.h }}>
      <div className={styles.winBar}>
        <i /><i /><i />
      </div>
      <div className={styles.winBody}>
        <div className={styles.winSide}>
          {NAV_WIDTHS.map((w, n) => (
            <span key={n} className={styles.winNav}>
              <b />
              <em style={{ width: w }} />
            </span>
          ))}
        </div>
        <div className={styles.winMain}>
          <div className={styles.winWave}>
            {WAVE.map((h, i) => (
              <span key={i} style={{ height: `${h}%` }} />
            ))}
          </div>
          <div className={styles.winCards}>
            {[0, 1, 2, 3].map((n) => (
              <span key={n} className={styles.winCard}>
                <b />
                <em />
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ---------- tiles ----------

function Tile({ f }: { f: Feature }) {
  const left = f.side === 'left' ? COL_LEFT + ROW_INSET[f.row] : COL_RIGHT - ROW_INSET[f.row]
  return (
    <div className={styles.node} style={{ left: left - 34, top: ROWS[f.row], width: TILE + 68 }} data-feature={f.key}>
      <span className={styles.halo}>
        <i />
      </span>
      <div className={`${styles.glass} ${styles.tile} ${f.side === 'left' ? styles.tiltLeft : styles.tiltRight}`}>
        <span className={styles.glyph}>{ICONS[f.key]}</span>
      </div>
      <p className={styles.label}>{f.label}</p>
    </div>
  )
}

export default function StorySlide() {
  return (
    <div className={styles.story}>
      <span className={styles.glowMain} />
      <span className={styles.glowSecond} />
      <span className={styles.sweep} />
      <div className={styles.vignette} />
      <div className={styles.grain} />

      <header className={styles.head}>
        <Image src={logo} alt="GrowYourMusic" priority className={styles.logo} />
      </header>

      <h1 className={styles.headline}>
        Tot ce îți trebuie
        <br />
        ca să <em>crești.</em>
      </h1>

      <PlatformWindow />
      {FEATURES.map((f) => (
        <Tile key={f.key} f={f} />
      ))}
    </div>
  )
}
