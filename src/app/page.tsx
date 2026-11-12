'use client'

import { Fragment } from 'react'
import Image from 'next/image'
import styles from './home.module.css'
import PreregisterForm from '@/components/PreregisterForm'
import Reveal from '@/components/Reveal'
import Transport from '@/components/Transport'
import Arrangement from '@/components/Arrangement'
import { track } from '@vercel/analytics'
import { useLanguage } from '@/i18n/LanguageContext'
import { PARTNERS } from '@/data/partners'
import { IconArrowRight, IconInstagram, IconYoutube, IconTiktok } from '@/components/Icons'
import { MockupThemeContext } from '@/components/PlatformMockups'
import FeatureStack from '@/components/FeatureStack'
import ScrollRail from '@/components/ScrollRail'

const SOCIAL_LINKS = [
  { href: 'https://www.instagram.com/growyourmusic.app/', label: 'Instagram', Icon: IconInstagram },
  { href: 'https://www.youtube.com/channel/UC7WCSzZMpwCOn4BLiNf1aGQ', label: 'YouTube', Icon: IconYoutube },
  { href: 'https://www.tiktok.com/@growyourmusic.app', label: 'TikTok', Icon: IconTiktok },
]

// One run of role pills per row, alternating direction at staggered speeds
// so neighbouring rows never line up.
const MARQUEE_ROWS = [
  { key: 0, duration: 40, reverse: false },
  { key: 1, duration: 60, reverse: true },
  { key: 2, duration: 44, reverse: false },
  { key: 3, duration: 64, reverse: true },
  { key: 4, duration: 48, reverse: false },
  { key: 5, duration: 68, reverse: true },
  { key: 6, duration: 52, reverse: false },
]

export default function Home() {
  const { t } = useLanguage()

  return (
    <MockupThemeContext.Provider value="landing">
      <main className={styles.page} data-theme="landing">
        <Transport />

        <Arrangement />

        {PARTNERS.length > 0 ? (
          <section className={styles.partners} aria-labelledby="partners-title">
            <div className={styles.container}>
              <h2 id="partners-title" className={styles.partnersTitle}>
                {t.landing.partnersTitle}
              </h2>
              <ul className={styles.partnerList}>
                {PARTNERS.map((partner) => (
                  <li key={partner.name} className={styles.partner}>
                    {partner.logo ? (
                      <Image src={partner.logo} alt={partner.name} width={140} height={40} className={styles.partnerLogo} />
                    ) : (
                      <span className={styles.partnerName}>{partner.name}</span>
                    )}
                    <span className={styles.partnerKind}>{partner.kind}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ) : null}

        <section className={styles.join} id="preregister-form" aria-labelledby="join-title">
          <Image src="/img/el1.png" alt="" aria-hidden="true" width={6750} height={1443} sizes="100vw" className={styles.joinWave} />
          <div className={`${styles.container} ${styles.joinGrid}`}>
            <div className={styles.joinCopy}>
              <h2 id="join-title" className={`${styles.sectionTitle} glass-text`}>
                {t.landing.joinTitle}
              </h2>
              <p className={styles.sectionLead}>{t.landing.joinSubtitle}</p>

              <div className={styles.founder}>
                <h3 className={`${styles.founderTitle} glass-text`}>{t.landing.founderTitle}</h3>
                <p className={styles.founderText}>
                  {t.landing.founderPre} <strong>{t.landing.founderAccent}</strong>
                  {t.landing.founderPost}
                </p>
              </div>
            </div>

            <div className={styles.formWrap}>
              <div className={styles.formPanel}>
                <PreregisterForm />
              </div>
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.features}`} id="features" aria-labelledby="features-title">
          <ScrollRail className={styles.featuresRail} startAfter="#features-header" />
          <div className={`${styles.container} ${styles.featuresInner}`}>
            <Reveal as="div" id="features-header" className={styles.sectionHeader}>
              <h2 id="features-title" className={`${styles.sectionTitle} glass-text`}>
                {t.landing.featuresTitle}
              </h2>
              <p className={styles.sectionLead}>{t.landing.featuresSubtitle}</p>
            </Reveal>

            <FeatureStack />
          </div>
        </section>

        <section className={`${styles.section} ${styles.audience}`} id="audience" aria-labelledby="audience-title">
          <div className={styles.audienceLayout}>
            {/* Decorative: the roles scroll in alternating rows underneath a
                floating header box. Hidden from assistive tech (the same list
                would otherwise be read once per row, twice per row); the list
                below the title carries the roles for screen readers. */}
            <div className={styles.audienceSphere} aria-hidden="true">
              {MARQUEE_ROWS.map((row) => (
                <div key={row.key} className={styles.marquee}>
                  <div
                    className={styles.marqueeTrack}
                    style={{ animationDuration: `${row.duration}s`, animationDirection: row.reverse ? 'reverse' : 'normal' }}
                  >
                    {[...t.audience.tags, ...t.audience.tags].map((role, i) => (
                      <Fragment key={`${role}-${i}`}>
                        <span className={`${styles.marqueeItem} ${i % 3 === 1 ? styles.marqueeItemTint : ''}`}>
                          {role}
                        </span>
                        <span className={styles.marqueeLogo} />
                      </Fragment>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.audienceHeaderBox}>
              <Reveal as="div" className={styles.audienceHeader}>
                <h2 id="audience-title" className={`${styles.audienceTitle} glass-text`}>
                  {t.landing.audienceTitle}
                </h2>
                <p className={styles.audienceLead}>{t.landing.audienceSubtitle}</p>
                <ul className="sr-only" aria-label={t.landing.roleListLabel}>
                  {t.audience.tags.map((role) => (
                    <li key={role}>{role}</li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </section>

        <section className={styles.ctaBand} aria-labelledby="cta-title">
          <Image src="/img/el1.png" alt="" aria-hidden="true" width={6750} height={1443} sizes="200vw" className={styles.ctaWave} />
          <div className={`${styles.container} ${styles.ctaInner}`}>
            <div>
              <h2 id="cta-title" className={`${styles.ctaTitle} glass-text`}>
                {t.hero.titleCreate} {t.hero.titleCollaborate}{' '}
                <span className="glass-text-blue">{t.hero.titleGetPaid}</span>
              </h2>
              <p className={styles.ctaSubtitle}>{t.landing.ctaSubtitle}</p>
            </div>
            <a
              className={styles.ctaButton}
              href="#preregister-form"
              onClick={() => track('cta_click', { location: 'cta_band' })}
            >
              {t.cta.button}
              <IconArrowRight className={styles.ctaButtonIcon} />
            </a>
          </div>
        </section>

        <footer className={styles.footer} id="contact">
          <div className={`${styles.container} ${styles.footerGrid}`}>
            <div className={styles.footerBrand}>
              <Image src="/img/gym-logo-glass.png" alt="GrowYourMusic" width={800} height={667} className={styles.footerLogo} />
              <p className={styles.footerBlurb}>{t.landing.heroSubtitle}</p>
            </div>

            <nav className={styles.footerCol} aria-label={t.landing.footerProduct}>
              <span className={styles.footerHeading}>{t.landing.footerProduct}</span>
              <a href="#features">{t.nav.features}</a>
              <a href="#audience">{t.nav.audience}</a>
              <a href="#preregister-form" onClick={() => track('cta_click', { location: 'footer_nav' })}>
                {t.nav.register}
              </a>
            </nav>

            <div className={styles.footerCol}>
              <span className={styles.footerHeading}>{t.landing.footerContact}</span>
              <a href="mailto:contact@growyourmusic.app">contact@growyourmusic.app</a>
              <div className={styles.footerSocial}>
                {SOCIAL_LINKS.map(({ href, label, Icon }) => (
                  <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}>
                    <Icon />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className={`${styles.container} ${styles.footerBottom}`}>
            <div className={styles.footerBottomInner}>
              <p>{t.footer.copyright}</p>
              <a href="/privacy">{t.landing.privacyLink}</a>
            </div>
          </div>
        </footer>
      </main>
    </MockupThemeContext.Provider>
  )
}
