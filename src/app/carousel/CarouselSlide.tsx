'use client'

import Image from 'next/image'
import { type CSSProperties, type ComponentType, type ReactNode } from 'react'
import pageStyles from '@/app/page.module.css'
import FounderBenefit from '@/components/FounderBenefit'
import { LanguageProvider } from '@/i18n/LanguageContext'
import {
  StudioBookingCard,
  ManagementMockup,
  LibraryMockup,
  ChartsMockup,
  ContractMockup,
  MessagingMockup,
} from '@/components/PlatformMockups'
import {
  MarketplaceSellCard,
  WalletBalanceCard,
  LeaderboardPodiumCard,
  VaultVocalsCard,
  VaultCollabCard,
} from '@/components/SocialCards'
import LocationPin3D from './LocationPin3D'
import ShopProductCard from './ShopProductCard'
import logo from './_assets/logo.png'
import styles from './carousel.module.css'
import extras from './extras.module.css'

// ---------- cards ----------

// How a landing component is mounted so it looks the way it does on the page:
//  - 'showcase': the MockupFrame inside the page's own .showcaseVisual box
//    (spinning-border card from the features section, spin paused here);
//  - 'benefit': the MockupFrame inside the page's own .benefitVisual box;
//  - 'social': a SocialCards card (translucent glass) over an opaque patch of
//    the page ground, exactly what sits behind it on the landing page, so
//    overlapping cards don't show through each other;
//  - 'booking': the studio card that normally floats over the map;
//  - 'founder': the founding-member block inside the page's own .joinBanner;
//  - 'plain': a carousel-only card that brings its own ground (ShopProductCard).
type Mount = 'showcase' | 'benefit' | 'social' | 'booking' | 'founder' | 'plain'

type Card = {
  key: string
  Component: ComponentType
  mount: Mount
  left: number // slide px, position of the unrotated card
  top: number
  width: number // web px, before scaling
  height?: number // web px, frames only (they fill a sized parent)
  scale: number
  rotate?: number
  z?: number
  padding?: string // founder banner only (web px)
}

function Mounted({ card }: { card: Card }) {
  const { Component, mount, width, height } = card
  let inner: ReactNode
  if (mount === 'showcase') {
    inner = <div className={pageStyles.showcaseVisual} style={{ width, height, flex: 'none' }}><Component /></div>
  } else if (mount === 'benefit') {
    inner = <div className={pageStyles.benefitVisual} style={{ width, height }}><Component /></div>
  } else if (mount === 'social') {
    inner = <div className={styles.ground} style={{ width }}><Component /></div>
  } else if (mount === 'booking') {
    inner = <div className={styles.bookingSlot} style={{ width }}><Component /></div>
  } else if (mount === 'plain') {
    inner = <div style={{ width }}><Component /></div>
  } else {
    inner = <div className={pageStyles.joinBanner} style={{ width, padding: card.padding }}><Component /></div>
  }
  const outer: CSSProperties = {
    left: card.left,
    top: card.top,
    zIndex: 10 + (card.z ?? 0),
    transform: card.rotate ? `rotate(${card.rotate}deg)` : undefined,
  }
  return (
    <div className={styles.card} style={outer} data-card={card.key}>
      <div style={{ zoom: card.scale }}>{inner}</div>
    </div>
  )
}

// Shop-grid product cards for slide 2 (blank media, no site images).
const ProductBeats = () => <ShopProductCard title="Pack di beat hip-hop" category="beats" label="Beats" seller="GYM_user1" price="45" />
const ProductMix = () => <ShopProductCard title="Mix & Master completo" category="mixmas" label="Mix Master" seller="GYM_user4" price="120" />

// ---------- 3D pins ----------

type Pin = { key: string; tone: 'purple' | 'gold'; left: number; top: number; size: number; rotate?: number; z?: number }

function Pins({ pins }: { pins: Pin[] }) {
  return (
    <>
      {pins.map((p) => (
        <div
          key={p.key}
          className={extras.pin}
          style={{ left: p.left, top: p.top, zIndex: 10 + (p.z ?? 0), transform: p.rotate ? `rotate(${p.rotate}deg)` : undefined }}
          data-pin={p.key}
        >
          <LocationPin3D tone={p.tone} size={p.size} />
        </div>
      ))}
    </>
  )
}

// ---------- background ----------

// CSS-only ground: a deep plum gradient (.slide), a large warm purple-magenta
// glow in the upper half, a smaller cool violet glow lower on the opposite
// side, a corner vignette and an SVG-noise grain (both in the stylesheet).
// Same palette on every slide; only the glows move.
type Ellipse = { x: number; y: number; w: number; h: number }
type Glows = { main: Ellipse; second: Ellipse }

function Glow({ e, className }: { e: Ellipse; className: string }) {
  return <span className={className} style={{ left: e.x - e.w / 2, top: e.y - e.h / 2, width: e.w, height: e.h }} />
}

function Background({ glows }: { glows: Glows }) {
  return (
    <>
      <Glow e={glows.main} className={styles.glowMain} />
      <Glow e={glows.second} className={styles.glowSecond} />
      <div className={styles.vignette} />
      <div className={styles.grain} />
      <div className={styles.textZone} />
    </>
  )
}

// ---------- slides ----------

type Slide = { glows: Glows; logo: 'small' | 'big'; cards: Card[]; pins?: Pin[] }

const SLIDES: Record<number, Slide> = {
  1: {
    logo: 'big',
    glows: { main: { x: 540, y: 330, w: 1100, h: 900 }, second: { x: 860, y: 900, w: 760, h: 620 } },
    cards: [],
  },
  2: {
    logo: 'small',
    glows: { main: { x: 640, y: 380, w: 1080, h: 860 }, second: { x: 180, y: 860, w: 720, h: 600 } },
    cards: [
      { key: 'sell', Component: MarketplaceSellCard, mount: 'social', left: 705, top: 130, width: 250, scale: 1.3, rotate: 4, z: 0 },
      { key: 'beats', Component: ProductBeats, mount: 'plain', left: 300, top: 110, width: 240, scale: 1.35, rotate: -4, z: 1 },
      { key: 'mix', Component: ProductMix, mount: 'plain', left: 560, top: 215, width: 240, scale: 1.35, rotate: 2, z: 3 },
      { key: 'wallet', Component: WalletBalanceCard, mount: 'social', left: 60, top: 560, width: 260, scale: 1.4, rotate: -4, z: 2 },
    ],
  },
  3: {
    logo: 'small',
    glows: { main: { x: 480, y: 480, w: 1040, h: 880 }, second: { x: 900, y: 940, w: 700, h: 560 } },
    cards: [
      { key: 'studio', Component: StudioBookingCard, mount: 'booking', left: 116, top: 420, width: 380, scale: 2.2, rotate: -3 },
    ],
    pins: [
      { key: 'big', tone: 'purple', left: 760, top: 170, size: 190, rotate: 8, z: 2 },
      { key: 'gold', tone: 'gold', left: 360, top: 250, size: 110, rotate: -10, z: 2 },
      { key: 'small', tone: 'purple', left: 190, top: 700, size: 90, rotate: -6, z: 2 },
      { key: 'low', tone: 'purple', left: 640, top: 690, size: 130, rotate: 5, z: 2 },
    ],
  },
  4: {
    logo: 'small',
    glows: { main: { x: 760, y: 340, w: 1000, h: 860 }, second: { x: 160, y: 880, w: 740, h: 600 } },
    cards: [
      { key: 'contracts', Component: ContractMockup, mount: 'benefit', left: 500, top: 190, width: 320, height: 250, scale: 1.6, rotate: 5, z: 0 },
      { key: 'messages', Component: MessagingMockup, mount: 'showcase', left: 60, top: 360, width: 420, height: 300, scale: 1.6, rotate: -2, z: 1 },
    ],
  },
  5: {
    logo: 'small',
    glows: { main: { x: 340, y: 420, w: 1060, h: 880 }, second: { x: 920, y: 860, w: 700, h: 600 } },
    cards: [
      { key: 'library', Component: LibraryMockup, mount: 'benefit', left: 70, top: 300, width: 340, height: 250, scale: 1.75, rotate: -2, z: 1 },
      { key: 'vocals', Component: VaultVocalsCard, mount: 'social', left: 600, top: 160, width: 290, scale: 1.5, rotate: 4, z: 2 },
      { key: 'collab', Component: VaultCollabCard, mount: 'social', left: 620, top: 495, width: 280, scale: 1.5, rotate: -3, z: 3 },
    ],
  },
  6: {
    logo: 'small',
    glows: { main: { x: 540, y: 460, w: 1120, h: 920 }, second: { x: 220, y: 960, w: 720, h: 560 } },
    cards: [
      { key: 'calendar', Component: ManagementMockup, mount: 'showcase', left: 160, top: 245, width: 420, height: 350, scale: 1.8 },
    ],
  },
  7: {
    logo: 'small',
    glows: { main: { x: 700, y: 360, w: 1040, h: 860 }, second: { x: 140, y: 900, w: 720, h: 600 } },
    cards: [
      { key: 'leaderboard', Component: ChartsMockup, mount: 'benefit', left: 70, top: 290, width: 340, height: 250, scale: 1.75, rotate: -2, z: 1 },
      { key: 'rankings', Component: LeaderboardPodiumCard, mount: 'social', left: 560, top: 140, width: 300, scale: 1.5, rotate: 4, z: 2 },
    ],
  },
  8: {
    logo: 'big',
    glows: { main: { x: 500, y: 300, w: 1100, h: 880 }, second: { x: 900, y: 880, w: 740, h: 620 } },
    cards: [
      { key: 'founder', Component: FounderBenefit, mount: 'founder', left: 0, top: 482, width: 1080 / 1.4, scale: 1.4, padding: '36px 5%' },
    ],
  },
}

export default function CarouselSlide({ n }: { n: number }) {
  const slide = SLIDES[n]
  const big = slide.logo === 'big'
  return (
    <LanguageProvider forceLang="it">
      <div className={styles.slide} data-slide={n}>
        <Background glows={slide.glows} />
        {slide.cards.map((card) => <Mounted key={card.key} card={card} />)}
        {slide.pins && <Pins pins={slide.pins} />}
        <Image
          src={logo}
          alt=""
          priority
          className={big ? styles.logoBig : styles.logoSmall}
          style={big && slide.cards.length ? { top: 38, left: 280, width: 520 } : undefined}
        />
        <span className={styles.urlPill}>growyourmusic.app</span>
      </div>
    </LanguageProvider>
  )
}
