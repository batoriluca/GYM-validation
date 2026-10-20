import { useId } from 'react'

// A glossy, extruded map pin drawn in SVG (no image file): a back layer for
// thickness, a lit front face, a recessed hole, a specular highlight and a
// soft contact shadow. `tone` picks the brand purple or the price gold.

const TONES = {
  purple: { hi: '#c9bcff', mid: '#7d62f2', low: '#4a2cbc', deep: '#26136e', side: '#2b1878', holeTop: '#140b3a', holeBottom: '#3b2490' },
  gold: { hi: '#fff4c2', mid: '#ffd218', low: '#d79d00', deep: '#7c5600', side: '#8a6100', holeTop: '#4a3300', holeBottom: '#a77a00' },
}

const PIN = 'M50 118 C40 103 14 78 14 44 A36 36 0 0 1 86 44 C86 78 60 103 50 118 Z'

export default function LocationPin3D({ tone = 'purple', size }: { tone?: keyof typeof TONES; size: number }) {
  const id = useId().replace(/:/g, '')
  const c = TONES[tone]
  return (
    <svg width={size} height={size * 1.3} viewBox="0 0 100 130" aria-hidden="true" style={{ display: 'block', overflow: 'visible' }}>
      <defs>
        <radialGradient id={`${id}f`} cx="34%" cy="22%" r="85%">
          <stop offset="0%" stopColor={c.hi} />
          <stop offset="32%" stopColor={c.mid} />
          <stop offset="72%" stopColor={c.low} />
          <stop offset="100%" stopColor={c.deep} />
        </radialGradient>
        <linearGradient id={`${id}h`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={c.holeTop} />
          <stop offset="100%" stopColor={c.holeBottom} />
        </linearGradient>
        <linearGradient id={`${id}r`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#000" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0.55" />
        </linearGradient>
        <filter id={`${id}b`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
        <filter id={`${id}s`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.6" />
        </filter>
      </defs>

      {/* contact shadow */}
      <ellipse cx="53" cy="121" rx="24" ry="5.5" fill="#05030d" opacity="0.7" filter={`url(#${id}b)`} />
      {/* extrusion */}
      <path d={PIN} fill={c.side} transform="translate(4.5 3.5)" />
      {/* front face */}
      <path d={PIN} fill={`url(#${id}f)`} />
      {/* recessed hole with a lit lower bevel */}
      <circle cx="50" cy="43" r="15" fill={`url(#${id}h)`} />
      <circle cx="50" cy="43" r="15" fill="none" stroke={`url(#${id}r)`} strokeWidth="2" />
      {/* specular highlights */}
      <ellipse cx="33" cy="24" rx="11" ry="6" fill="#fff" opacity="0.75" transform="rotate(-38 33 24)" filter={`url(#${id}s)`} />
      <ellipse cx="27" cy="52" rx="2.6" ry="9" fill="#fff" opacity="0.25" filter={`url(#${id}s)`} />
      {/* rim light along the right edge */}
      <path d="M86 44 C86 78 60 103 50 118" fill="none" stroke="#fff" strokeOpacity="0.18" strokeWidth="1.2" />
    </svg>
  )
}
