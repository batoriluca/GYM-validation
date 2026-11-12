'use client'

import { useEffect, useId, useRef, type CSSProperties } from 'react'
import styles from './ScrollRail.module.css'

// Shape
const HALF_WAVE = 640 // px of height per bend (one sweep right or left)
const SWING_MAX = Infinity // px each side of the centre; Infinity = reach the screen edges
const EDGE_GAP = 6 // px kept clear of the screen edge at the widest point of a swing
const STEP = 6 // px between sampled points along the height
const SEED = 7 // change for a different (but still fixed) random shape
const BEND_LENGTH_JITTER = 0.45 // each bend is 55%–145% of HALF_WAVE tall
const BEND_REACH_MIN = 0.72 // each bend reaches 72%–96% of the way to the edge...
const BEND_REACH_MAX = 0.96
const WOBBLE = 0.025 // ...plus a slower secondary wave, as a share of the width
const BASE_RES = 4 // px between precomputed points of the resting curve
const TAIL = 90 // px of bright comet tail behind the spark

// Vibration around the spark (the "playhead")
const RIPPLE_IDLE = 2 // px, always-on shimmer
const RIPPLE_SCROLL_MAX = 11 // px, extra shimmer at fast scroll
const RIPPLE_FULL_SPEED = 1600 // px/s of scrolling that gives the full extra shimmer
const RIPPLE_SPREAD = 210 // px, how far the shimmer reaches up/down the line
const RIPPLE_WAVELENGTH = 150 // px
const RIPPLE_SPEED = 4.5 // radians per second
const RIPPLE_RISE = 0.25 // s, how quickly the shimmer builds when you scroll
const RIPPLE_FALL = 0.8 // s, how slowly it calms down when you stop
const TIP_EASE = 0.12 // s, the spark glides to the scroll position instead of stepping

// Rope (drag). The line is a soft rope: a chain of nodes every NODE px whose
// sideways offset is pulled by its neighbours (tension, so a pull spreads
// into a long smooth curve and travels along the rope as a wave), gently
// sprung back to the resting curve, and damped so it eases out rather than
// ringing. While dragging, the node under the pointer follows the pointer.
const NODE = 10 // px between rope nodes
const ROPE_TENSION = 2200 // higher = pulls spread further and waves travel faster
const ROPE_RETURN = 5 // spring back towards the resting curve
const ROPE_DAMPING = 2.2 // higher = settles sooner, fewer swings
const ROPE_PULL_MAX = 220 // px the rope can be pulled sideways
const ROPE_GRIP = 3 // nodes either side of the pointer that are held (soft grip)
const SIM_STEP = 1 / 240 // s, physics sub-step

// A curved line spanning its parent section top to bottom. It fills as the
// page scrolls and a spark rides the tip of the fill; the line shimmers
// around the spark, harder the faster you scroll. Grab it anywhere and drag:
// it moves like a loose rope, curving after your hand, and eases back.
// The fill tracks the middle of the viewport moving from the line's top to
// its bottom. The parent must be position: relative, and should set
// --rail-center (the x the curve swings around). `startAfter` is a selector
// for an element inside the parent (e.g. the section heading): the line then
// starts just below it instead of at the top of the parent.
const START_GAP = 8 // px between the startAfter element and the line's top

type ScrollRailProps = { className?: string; style?: CSSProperties; startAfter?: string }

export default function ScrollRail({ className, style, startAfter }: ScrollRailProps) {
  const uid = useId().replace(/:/g, '')
  const railRef = useRef<HTMLDivElement>(null)
  const anchorRef = useRef<HTMLSpanElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const trackRef = useRef<SVGPathElement>(null)
  const fillRef = useRef<SVGPathElement>(null)
  const tailRef = useRef<SVGPathElement>(null)
  const hitRef = useRef<SVGPathElement>(null)
  const tailGradRef = useRef<SVGLinearGradientElement>(null)
  const fillGradRef = useRef<SVGLinearGradientElement>(null)
  const sparkRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const rail = railRef.current
    const section = rail?.parentElement
    const anchor = anchorRef.current
    const svg = svgRef.current
    const track = trackRef.current
    const fill = fillRef.current
    const tail = tailRef.current
    const hit = hitRef.current
    const tailGrad = tailGradRef.current
    const fillGrad = fillGradRef.current
    const spark = sparkRef.current
    if (!rail || !section || !anchor || !svg || !track || !fill || !tail || !hit || !tailGrad || !fillGrad || !spark) return

    const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let w = 0
    let h = 0
    let center = 0
    let swingRight = 0
    let swingLeft = 0
    let base = new Float32Array(0)

    let visible = false
    let frame: number | null = null
    let lastScrollY = window.scrollY
    let scrollSpeed = 0 // smoothed, px/s
    let tipY: number | null = null // smoothed spark position

    // Rope state: sideways offset and velocity per node.
    let nodes = 0
    let u = new Float32Array(0)
    let v = new Float32Array(0)
    let grab: { y: number; x: number } | null = null
    let lastTime: number | null = null

    const startEl = startAfter ? section.querySelector<HTMLElement>(startAfter) : null

    const measure = () => {
      if (startEl) {
        // offsetTop chain up to the section, so the Reveal fade-in transform
        // on the heading doesn't shift the line.
        let top = startEl.offsetHeight
        for (let el: HTMLElement | null = startEl; el && el !== section; el = el.offsetParent as HTMLElement | null) {
          top += el.offsetTop
        }
        rail.style.top = `${Math.round(top + START_GAP)}px`
      }
      w = rail.clientWidth
      h = rail.clientHeight
      center = anchor.offsetLeft
      swingRight = Math.max(0, Math.min(SWING_MAX, w - center - EDGE_GAP))
      swingLeft = Math.max(0, Math.min(SWING_MAX, center - EDGE_GAP))
      base = buildBase()
      svg.setAttribute('viewBox', `0 0 ${w} ${h}`)
      fillGrad.setAttribute('y2', String(h))
      const n = Math.max(2, Math.floor(h / NODE) + 1)
      if (n !== nodes) {
        nodes = n
        u = new Float32Array(n)
        v = new Float32Array(n)
      }
    }

    // The resting curve, precomputed every BASE_RES px. Turning points
    // alternate right/left, starting far right at the top, but each one has
    // its own reach and spacing (from a fixed seed, so the shape is the same
    // on every visit). A Catmull-Rom spline through them skews each bend
    // instead of mirroring it, and a slower secondary wave runs over the top.
    function buildBase() {
      let seed = SEED >>> 0
      const rand = () => {
        seed = (seed + 0x6d2b79f5) >>> 0
        let t = seed
        t = Math.imul(t ^ (t >>> 15), t | 1)
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296
      }

      const ys: number[] = [0]
      while (ys[ys.length - 1] < h) {
        ys.push(ys[ys.length - 1] + HALF_WAVE * (1 + (rand() * 2 - 1) * BEND_LENGTH_JITTER))
      }
      const scale = h / ys[ys.length - 1]
      const pts = ys.map((y, i) => {
        const side = i % 2 === 0 ? 1 : -1
        const reach = i === 0 ? BEND_REACH_MAX : BEND_REACH_MIN + rand() * (BEND_REACH_MAX - BEND_REACH_MIN)
        return { y: y * scale, x: center + side * reach * (side > 0 ? swingRight : swingLeft) }
      })

      const phase = rand() * Math.PI * 2
      const wobbleLength = HALF_WAVE * 0.61
      const wobbleAmp = WOBBLE * w

      const count = Math.floor(h / BASE_RES) + 2
      const out = new Float32Array(count)
      let k = 0
      for (let i = 0; i < count; i += 1) {
        const y = Math.min(h, i * BASE_RES)
        while (k < pts.length - 2 && pts[k + 1].y < y) k += 1
        const p0 = pts[Math.max(0, k - 1)]
        const p1 = pts[k]
        const p2 = pts[k + 1]
        const p3 = pts[Math.min(pts.length - 1, k + 2)]
        const t = (y - p1.y) / (p2.y - p1.y || 1)
        const t2 = t * t
        const t3 = t2 * t
        let x =
          0.5 *
          (2 * p1.x +
            (-p0.x + p2.x) * t +
            (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * t2 +
            (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * t3)
        x += wobbleAmp * Math.sin((2 * Math.PI * y) / wobbleLength + phase)
        out[i] = Math.min(w - EDGE_GAP, Math.max(EDGE_GAP, x))
      }
      return out
    }

    const baseX = (y: number) => {
      const f = Math.min(base.length - 1, Math.max(0, y / BASE_RES))
      const i = Math.floor(f)
      const j = Math.min(base.length - 1, i + 1)
      return base[i] + (base[j] - base[i]) * (f - i)
    }

    const ropeAt = (y: number) => {
      const f = Math.min(nodes - 1, Math.max(0, y / NODE))
      const i = Math.floor(f)
      const j = Math.min(nodes - 1, i + 1)
      return u[i] + (u[j] - u[i]) * (f - i)
    }

    // Advance the rope by dt seconds. Returns how much it is still moving.
    const stepRope = (dt: number) => {
      const damping = calm ? 12 : ROPE_DAMPING
      let motion = 0
      for (let elapsed = 0; elapsed < dt; elapsed += SIM_STEP) {
        if (grab) {
          const c = grab.y / NODE
          const target = grab.x - baseX(grab.y)
          for (let k = -ROPE_GRIP; k <= ROPE_GRIP; k += 1) {
            const i = Math.round(c) + k
            if (i <= 0 || i >= nodes - 1) continue
            // Full grip at the pointer, softer towards the edges of the hand.
            const wgt = Math.exp(-((i - c) ** 2) / (ROPE_GRIP * 0.8))
            const next = u[i] + (target - u[i]) * wgt * 0.35
            // Capped so a fast flick swings the rope instead of whipping it.
            v[i] = Math.max(-1200, Math.min(1200, (next - u[i]) / SIM_STEP))
            u[i] = next
          }
        }
        for (let i = 1; i < nodes - 1; i += 1) {
          const a = ROPE_TENSION * (u[i - 1] - 2 * u[i] + u[i + 1]) - ROPE_RETURN * u[i] - damping * v[i]
          v[i] += a * SIM_STEP
        }
        for (let i = 1; i < nodes - 1; i += 1) u[i] += v[i] * SIM_STEP
      }
      for (let i = 1; i < nodes - 1; i += 1) motion = Math.max(motion, Math.abs(u[i]), Math.abs(v[i]) * 0.05)
      return motion
    }

    const draw = (now: number) => {
      frame = null
      if (!w || !h) return
      const t = now / 1000
      const dt = lastTime === null ? 0 : Math.min(1 / 30, t - lastTime)
      lastTime = t
      const ropeMotion = stepRope(dt)
      if (ropeMotion < 0.05 && !grab) {
        u.fill(0)
        v.fill(0)
      }

      const rect = rail.getBoundingClientRect()
      const p = Math.min(1, Math.max(0, (window.innerHeight / 2 - rect.top) / rect.height))

      // The spark eases towards the scroll position (frame-rate independent),
      // so mouse-wheel steps become a glide instead of jumps.
      const targetY = p * h
      if (tipY === null || calm || dt === 0) tipY = targetY
      else tipY += (targetY - tipY) * (1 - Math.exp(-dt / TIP_EASE))
      const tip = tipY

      // Scroll speed in px/s, smoothed: builds quickly, calms slowly.
      const dy = Math.abs(window.scrollY - lastScrollY)
      lastScrollY = window.scrollY
      if (calm) scrollSpeed = 0
      else if (dt > 0) {
        const raw = Math.min(dy / dt, RIPPLE_FULL_SPEED * 2)
        const tau = raw > scrollSpeed ? RIPPLE_RISE : RIPPLE_FALL
        scrollSpeed += (raw - scrollSpeed) * (1 - Math.exp(-dt / tau))
      }
      const ripple = calm ? 0 : RIPPLE_IDLE + RIPPLE_SCROLL_MAX * Math.min(1, scrollSpeed / RIPPLE_FULL_SPEED)

      // The wave is anchored to the line itself (phase from y, not from the
      // spark), so when the spark moves only the bright patch slides along
      // it; the waves don't jump.
      const xAt = (y: number) => {
        let x = baseX(y) + ropeAt(y)
        if (ripple) {
          const env = Math.exp(-(((y - tip) / RIPPLE_SPREAD) ** 2))
          x += ripple * env * Math.sin((2 * Math.PI * y) / RIPPLE_WAVELENGTH - RIPPLE_SPEED * t)
        }
        return x
      }

      let all = ''
      let filled = ''
      let tailD = ''
      for (let y = 0; ; y += STEP) {
        const yy = Math.min(y, h)
        const pt = `${xAt(yy).toFixed(1)} ${yy.toFixed(1)}`
        all += (all ? ' L ' : 'M ') + pt
        if (yy <= tip) filled += (filled ? ' L ' : 'M ') + pt
        if (yy >= tip - TAIL && yy <= tip) tailD += (tailD ? ' L ' : 'M ') + pt
        if (yy >= h) break
      }
      const tipX = xAt(tip)
      const tipPt = `${tipX.toFixed(1)} ${tip.toFixed(1)}`
      filled = filled ? `${filled} L ${tipPt}` : ''
      tailD = tailD ? `${tailD} L ${tipPt}` : ''

      track.setAttribute('d', all)
      hit.setAttribute('d', all)
      fill.setAttribute('d', filled)
      tail.setAttribute('d', tailD)
      tailGrad.setAttribute('y1', String(tip - TAIL))
      tailGrad.setAttribute('y2', String(tip))
      spark.style.transform = `translate(${tipX}px, ${tip}px)`
      rail.dataset.state = p <= 0 ? 'before' : p >= 1 ? 'after' : 'active'

      // Keep animating while on screen (the shimmer never fully stops) or
      // while the rope is still moving. Reduced motion: only on demand.
      const busy = grab !== null || ropeMotion >= 0.05 || Math.abs(targetY - tip) > 0.5 || (!calm && visible)
      if (busy) schedule()
      else lastTime = null
    }

    const schedule = () => {
      if (frame === null) frame = requestAnimationFrame(draw)
    }
    const relayout = () => {
      measure()
      schedule()
    }

    // ---- Drag: grab the rope and move it ----
    let pointerId: number | null = null
    const toLocal = (e: PointerEvent) => {
      const r = rail.getBoundingClientRect()
      return { x: e.clientX - r.left, y: Math.min(h, Math.max(0, e.clientY - r.top)) }
    }
    const onDown = (e: PointerEvent) => {
      pointerId = e.pointerId
      hit.setPointerCapture(e.pointerId)
      const p = toLocal(e)
      grab = { y: p.y, x: Math.max(-ROPE_PULL_MAX, Math.min(ROPE_PULL_MAX, p.x - baseX(p.y))) + baseX(p.y) }
      rail.dataset.dragging = 'true'
      e.preventDefault()
      schedule()
    }
    const onMove = (e: PointerEvent) => {
      if (pointerId !== e.pointerId || !grab) return
      const p = toLocal(e)
      const off = Math.max(-ROPE_PULL_MAX, Math.min(ROPE_PULL_MAX, p.x - baseX(p.y)))
      grab = { y: p.y, x: baseX(p.y) + off }
      schedule()
    }
    const onUp = (e: PointerEvent) => {
      if (pointerId !== e.pointerId) return
      pointerId = null
      grab = null
      delete rail.dataset.dragging
      schedule()
    }
    hit.addEventListener('pointerdown', onDown)
    hit.addEventListener('pointermove', onMove)
    hit.addEventListener('pointerup', onUp)
    hit.addEventListener('pointercancel', onUp)

    // Only animate while the section is on screen.
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) {
        lastScrollY = window.scrollY
        schedule()
      }
    })
    io.observe(section)

    relayout()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', relayout)
    const ro = new ResizeObserver(relayout)
    ro.observe(rail)
    ro.observe(section)
    if (startEl) ro.observe(startEl)

    return () => {
      hit.removeEventListener('pointerdown', onDown)
      hit.removeEventListener('pointermove', onMove)
      hit.removeEventListener('pointerup', onUp)
      hit.removeEventListener('pointercancel', onUp)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', relayout)
      io.disconnect()
      ro.disconnect()
      if (frame !== null) cancelAnimationFrame(frame)
    }
  }, [startAfter])

  return (
    <div ref={railRef} className={`${styles.rail} ${className ?? ''}`} style={style} aria-hidden="true" data-state="before">
      <span ref={anchorRef} className={styles.anchor} />
      <svg ref={svgRef} className={styles.svg}>
        <defs>
          <linearGradient id={`${uid}-fill`} ref={fillGradRef} gradientUnits="userSpaceOnUse" x1="0" x2="0" y1="0" y2="1000">
            {/* The validation site's signature sequence (its card borders):
                violet → pink → gold → purple → violet, down the section. */}
            <stop offset="0" style={{ stopColor: 'var(--purple-1)' }} />
            <stop offset="0.25" style={{ stopColor: 'var(--pink)' }} />
            <stop offset="0.5" style={{ stopColor: 'var(--gold)' }} />
            <stop offset="0.75" style={{ stopColor: 'var(--purple-2)' }} />
            <stop offset="1" style={{ stopColor: 'var(--purple-1)' }} />
          </linearGradient>
          <linearGradient id={`${uid}-tail`} ref={tailGradRef} gradientUnits="userSpaceOnUse" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="1" stopColor="#ffffff" stopOpacity="0.95" />
          </linearGradient>
        </defs>
        <path ref={trackRef} className={styles.track} />
        <path ref={fillRef} className={styles.fill} stroke={`url(#${uid}-fill)`} />
        <path ref={tailRef} className={styles.tail} stroke={`url(#${uid}-tail)`} />
        <path ref={hitRef} className={styles.hit} />
      </svg>
      <span ref={sparkRef} className={styles.sparkPos}>
        <span className={styles.spark} />
      </span>
    </div>
  )
}
