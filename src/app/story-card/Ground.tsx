import { type ReactNode } from 'react'
import styles from './card.module.css'

// The story's ground (glows, sweep, vignette, grain) on a 1080x1080 canvas.
export default function Ground({ children }: { children: ReactNode }) {
  return (
    <div className={styles.canvas}>
      <span className={styles.glowMain} />
      <span className={styles.glowSecond} />
      <span className={styles.sweep} />
      <div className={styles.vignette} />
      <div className={styles.grain} />
      {children}
    </div>
  )
}

export function Glyph({ children, strokeWidth = 5.5 }: { children: ReactNode; strokeWidth?: number }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {children}
    </svg>
  )
}
