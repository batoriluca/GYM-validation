'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import styles from './page.module.css'
import PreregisterForm from '@/components/PreregisterForm'
import Reveal from '@/components/Reveal'
import Transport from '@/components/Transport'
import Arrangement from '@/components/Arrangement'
import BentoBackdrop from '@/components/BentoBackdrop'
import { useLanguage } from '@/i18n/LanguageContext'
import { IconArrowRight, IconUser, IconSpark, IconInstagram, IconYoutube, IconTiktok, IconMail } from '@/components/Icons'
import {
  MarketplaceMockup,
  MessagingMockup,
  StudioMapMockup,
  ManagementMockup,
  LibraryMockup,
  ChartsMockup,
  LyricsMockup,
  PostCreationMockup,
  WalletMockup,
  ContractMockup,
  FEATURE_ICONS,
} from '@/components/PlatformMockups'

const FEATURE_VISUALS = [
  { visual: <MarketplaceMockup /> },
  { visual: <MessagingMockup /> },
  { visual: <StudioMapMockup /> },
  { visual: <ManagementMockup /> },
  { visual: <LibraryMockup /> },
  { visual: <ChartsMockup /> },
  { visual: <PostCreationMockup /> },
  { visual: <LyricsMockup /> },
  { visual: <WalletMockup /> },
  { visual: <ContractMockup /> },
]

const SHOWCASE_INDEXES = [0, 1, 2, 3]
const GRID_INDEXES = [4, 5, 6, 7, 8, 9]

// Seven full-width ticking rows, each with its own duration/direction
// applied inline so every row's timing is explicit rather than relying on
// CSS :nth-child position.
const SPHERE_ROWS = [
  { key: 0, duration: 20, reverse: false },
  { key: 1, duration: 30, reverse: true },
  { key: 2, duration: 22, reverse: false },
  { key: 3, duration: 32, reverse: true },
  { key: 4, duration: 24, reverse: false },
  { key: 5, duration: 34, reverse: true },
  { key: 6, duration: 26, reverse: false },
]

const SOCIAL_LINKS = [
  { href: 'https://www.instagram.com/growyourmusic.app/', label: 'Instagram', Icon: IconInstagram },
  { href: 'https://www.youtube.com/channel/UC7WCSzZMpwCOn4BLiNf1aGQ', label: 'YouTube', Icon: IconYoutube },
  { href: 'https://www.tiktok.com/@growyourmusic.app', label: 'TikTok', Icon: IconTiktok },
]

export default function Home() {
  const { t } = useLanguage()
  const joinStageRef = useRef<HTMLDivElement | null>(null)
  const [joinStageRevealed, setJoinStageRevealed] = useState(false)

  // The bento backdrop and the join banner share one trigger — the stage
  // entering view — rather than each observing independently; "backdrop
  // first, banner after" is then just two transition-delays off that one
  // boolean (see .joinBannerStage[data-revealed] in page.module.css),
  // instead of two moments that could drift out of sync with each other.
  useEffect(() => {
    const node = joinStageRef.current
    if (!node) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setJoinStageRevealed(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setJoinStageRevealed(true)
          observer.unobserve(node)
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -10% 0px' }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <main className={styles.page}>
      <Transport />

      <Arrangement />

      <div className={styles.joinBannerStage} ref={joinStageRef} data-revealed={joinStageRevealed}>
        <div className={styles.joinBannerBackdrop}>
          <BentoBackdrop />
        </div>

        <section className={styles.joinBanner} id="preregister-form">
          <span className={`${styles.blob} ${styles.blobBanner}`} />
          <Reveal className={styles.joinBannerInner}>
            <div className={styles.joinBannerText}>
              <span className={styles.founderIcon}>
                <IconSpark />
              </span>
              <span className={styles.founderBadge}>{t.founder.badge}</span>
              <h3 className={styles.founderTitle}>{t.founder.title}</h3>
              <p className={styles.founderText}>
                {t.founder.textPre}{' '}
                <span className={styles.preregisterAccent}>{t.founder.textAccent}</span>{' '}
                {t.founder.textPost}
              </p>
            </div>

            <div className={styles.joinBannerForm}>
              <PreregisterForm />
            </div>
          </Reveal>
        </section>
      </div>

      <section className={styles.section} id="features">
        <Reveal as="div" className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>{t.features.title}</h2>
          <p className={styles.sectionSubtitle}>{t.features.subtitle}</p>
        </Reveal>

        <div className={styles.showcaseList}>
          {SHOWCASE_INDEXES.map((index, i) => (
            <Reveal
              key={index}
              as="article"
              className={`${styles.showcaseRow} ${i % 2 === 1 ? styles.showcaseRowReverse : ''}`}
            >
              <div className={styles.showcaseVisual}>{FEATURE_VISUALS[index].visual}</div>
              <div className={styles.showcaseBody}>
                <span className={styles.featureIconBadge}>{FEATURE_ICONS[index]}</span>
                <h3 className={styles.showcaseTitle}>{t.features.items[index].title}</h3>
                <p className={styles.showcaseText}>{t.features.items[index].text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className={styles.benefitGrid}>
          {GRID_INDEXES.map((index, i) => (
            <Reveal key={index} as="article" className={styles.benefitCard} delay={(i % 3) * 90}>
              <span className={styles.featureIconBadge}>{FEATURE_ICONS[index]}</span>
              <h3 className={styles.benefitTitle}>{t.features.items[index].title}</h3>
              <p className={styles.benefitText}>{t.features.items[index].text}</p>
              <div className={styles.benefitVisual}>{FEATURE_VISUALS[index].visual}</div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className={styles.section} id="audience">
        <div className={styles.audienceLayout}>
          {/* Decorative only — the same roles are already exposed to
              screen readers via the audience tags list itself being read
              once per marquee's own duplicated content is redundant, so
              this stack of rows is hidden from the a11y tree rather than
              read out five times over. The header box floats above the
              stack (absolutely positioned, centered) so the marquees run
              underneath it rather than being split around it. */}
          <div className={styles.audienceSphere} aria-hidden="true">
            {SPHERE_ROWS.map((row) => (
              <div key={row.key} className={styles.marquee}>
                <div
                  className={styles.marqueeTrack}
                  style={{ animationDuration: `${row.duration}s`, animationDirection: row.reverse ? 'reverse' : 'normal' }}
                >
                  {[...t.audience.tags, ...t.audience.tags].map((role, i) => (
                    <span key={`${role}-${i}`} className={styles.marqueeItem}>
                      <IconUser className={styles.marqueeIcon} />
                      {role}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className={styles.audienceHeaderBox}>
            <Reveal as="div" className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>{t.audience.title}</h2>
              <p className={styles.sectionSubtitle}>{t.audience.subtitle}</p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className={styles.ctaBand}>
        <Image
          src="/img/el1.png"
          alt=""
          aria-hidden="true"
          width={6750}
          height={1443}
          className={styles.ctaBandEl1}
        />
        <Reveal as="div" className={styles.ctaBandInner}>
          <h2 className={styles.ctaTitle}>{t.cta.title}</h2>
          <p className={styles.ctaSubtitle}>{t.cta.subtitle}</p>
          <a className={styles.ctaButton} href="#preregister-form">
            {t.cta.button}
            <IconArrowRight className={styles.ctaButtonIcon} />
          </a>
        </Reveal>
      </section>

      <footer className={styles.footer} id="contact">
        <div className={styles.footerGrid}>
          <div className={styles.footerBrand}>
            <div className={styles.footerLogoRow}>
              <Image src="/logo.png" alt="GrowYourMusic" width={28} height={28} className={styles.logoImg} />
              <span className={styles.logoText}>GrowYourMusic</span>
            </div>
            <p className={styles.footerBlurb}>{t.hero.subtitle}</p>
            <div className={styles.footerSocial}>
              {SOCIAL_LINKS.map(({ href, label, Icon }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}>
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          <div className={styles.footerNavCol}>
            <a href="#top">{t.nav.home}</a>
            <a href="#features">{t.nav.features}</a>
            <a href="#audience">{t.nav.audience}</a>
            <a href="#preregister-form">{t.nav.register}</a>
          </div>

          <div className={styles.footerContactCol}>
            <a href="mailto:contact@growyourmusic.app">
              <IconMail className={styles.footerLinkIcon} />
              contact@growyourmusic.app
            </a>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p className={styles.footerText}>{t.footer.copyright}</p>
        </div>
      </footer>
    </main>
  )
}
