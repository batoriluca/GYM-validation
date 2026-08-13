'use client'

import Image from 'next/image'
import styles from './page.module.css'
import PreregisterForm from '@/components/PreregisterForm'
import Reveal from '@/components/Reveal'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import { useLanguage } from '@/i18n/LanguageContext'
import {
  MarketplaceMockup,
  MessagingMockup,
  StudioBookingCard,
  ManagementMockup,
  LibraryMockup,
  ChartsMockup,
  LyricsMockup,
  PostCreationMockup,
  WalletMockup,
  ContractMockup,
} from '@/components/PlatformMockups'

const FEATURE_VISUALS = [
  { visual: <MarketplaceMockup /> },
  { visual: <MessagingMockup /> },
  {
    visual: (
      <>
        <Image src="/screenshots/studios_final.png" alt="GrowYourMusic studio map" fill />
        <StudioBookingCard />
      </>
    ),
  },
  { visual: <ManagementMockup /> },
  { visual: <LibraryMockup /> },
  { visual: <ChartsMockup /> },
  { visual: <PostCreationMockup /> },
  { visual: <LyricsMockup /> },
  { visual: <WalletMockup /> },
  { visual: <ContractMockup /> },
]

const FEATURE_NUMBERS = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10']

export default function Home() {
  const { t } = useLanguage()

  return (
    <main className={styles.page}>
      <span className={`${styles.glow} ${styles.glow1}`} />
      <span className={`${styles.glow} ${styles.glow2}`} />

      <header className={styles.header}>
        <div className={styles.logoGroup}>
          <Image src="/img/gym-logo-mark.png" alt="GrowYourMusic" width={50} height={40} className={styles.logoMark} />
        </div>
        <nav className={styles.nav}>
          <a className={`${styles.navLink} ${styles.navSecondary}`} href="#top">{t.nav.home}</a>
          <a className={styles.navLink} href="#features">{t.nav.features}</a>
          <a className={styles.navLink} href="#audience">{t.nav.audience}</a>
          <a className={styles.navLink} href="#preregister-form">{t.nav.register}</a>
          <a className={`${styles.navLink} ${styles.navSecondary}`} href="#contact">{t.nav.contact}</a>
        </nav>
        <div className={styles.headerActions}>
          <LanguageSwitcher />
          <a className={styles.headerLink} href="https://www.instagram.com/growyourmusic.ro/" target="_blank" rel="noreferrer">
            {t.nav.followUs}
          </a>
        </div>
      </header>

      <section className={styles.hero} id="top">
        <span className={`${styles.glow} ${styles.glow7}`} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/img/cerc.png" alt="" className={styles.cercImg} />
        <Reveal className={styles.heroIntro}>
          <span className={styles.badge}>{t.hero.badge}</span>
          <h1 className={styles.heroTitle}>
            <span className={styles.titleCreate}>{t.hero.titleCreate}</span>{' '}
            <span className={styles.titleCollaborate}>{t.hero.titleCollaborate}</span>{' '}
            <span className={styles.titleGetPaid}>{t.hero.titleGetPaid}</span>{' '}
            <span className={styles.heroAccent}>{t.hero.titleAccent}</span>
          </h1>
          <p className={styles.heroSubtitle}>{t.hero.subtitle}</p>
        </Reveal>

        <Reveal className={styles.heroVisual} delay={120}>
          <div className={styles.heroFrame}>
            <Image
              src="/img/ss_final.png"
              alt={t.hero.screenshotAlt}
              width={2880}
              height={1618}
              priority
            />
          </div>
          <p className={styles.heroCaption}>{t.hero.screenshotCaption}</p>
        </Reveal>

        <div className={styles.preregisterSection} id="preregister-form">
          <Reveal className={styles.preregisterInner} delay={240}>
            <div className={styles.founderCard}>
              <div className={styles.founderVisual}>
                <span className={styles.founderBar} style={{ height: '35%' }} />
                <span className={styles.founderBar} style={{ height: '55%' }} />
                <span className={styles.founderBar} style={{ height: '75%' }} />
                <span className={styles.founderBar} style={{ height: '100%' }} />
                <span className={styles.founderBadge}>{t.founder.badge}</span>
              </div>
              <div className={styles.founderBody}>
                <h3 className={styles.founderTitle}>{t.founder.title}</h3>
                <p className={styles.founderText}>
                  {t.founder.textPre}{' '}
                  <span className={styles.preregisterAccent}>{t.founder.textAccent}</span>{' '}
                  {t.founder.textPost}
                </p>
              </div>
            </div>

            <PreregisterForm />
          </Reveal>
        </div>
      </section>

      <section className={styles.section} id="features">
        <span className={`${styles.glow} ${styles.glow3}`} />
        <span className={`${styles.glow} ${styles.glow8}`} />
        <Reveal as="div" className={styles.sectionHeader}>
          <span className={styles.sectionLabel}>{t.features.label}</span>
          <h2 className={styles.sectionTitle}>{t.features.title}</h2>
          <p className={styles.sectionSubtitle}>{t.features.subtitle}</p>
        </Reveal>

        <div className={styles.featureGrid}>
          <span className={`${styles.glow} ${styles.glow9}`} />
          <span className={`${styles.glow} ${styles.glow10}`} />
          {t.features.items.map((feature, index) => (
            <Reveal
              key={FEATURE_NUMBERS[index]}
              as="article"
              className={styles.featureCard}
              delay={(index % 2) * 100}
            >
              <div className={styles.featureVisual}>
                {FEATURE_VISUALS[index].visual}
              </div>
              <div className={styles.featureBody}>
                <span className={styles.featureNumber}>{FEATURE_NUMBERS[index]}</span>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureText}>{feature.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className={styles.section} id="audience">
        <span className={`${styles.glow} ${styles.glow4}`} />
        <Reveal as="div" className={styles.sectionHeader}>
          <span className={styles.sectionLabel}>{t.audience.label}</span>
          <h2 className={styles.sectionTitle}>{t.audience.title}</h2>
          <p className={styles.sectionSubtitle}>{t.audience.subtitle}</p>
        </Reveal>

        <Reveal as="div" className={styles.audienceGrid} delay={120}>
          {t.audience.tags.map((role) => (
            <span key={role} className={styles.audienceTag}>
              {role}
            </span>
          ))}
        </Reveal>
      </section>

      <section className={styles.ctaSection}>
        <span className={`${styles.glow} ${styles.glow5}`} />
        <span className={`${styles.glow} ${styles.glow8}`} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/img/el1.png" alt="" className={styles.el1Img} />
        <Reveal as="div" className={styles.ctaCard}>
          <h2 className={styles.ctaTitle}>{t.cta.title}</h2>
          <p className={styles.ctaSubtitle}>{t.cta.subtitle}</p>
          <a className={styles.ctaButton} href="#preregister-form">
            {t.cta.button}
          </a>
        </Reveal>
      </section>

      <footer className={styles.footer} id="contact">
        <span className={`${styles.glow} ${styles.glow6}`} />
        <Reveal as="div" className={styles.footerReveal}>
          <div className={styles.footerLogoRow}>
            <Image src="/logo.png" alt="GrowYourMusic" width={28} height={28} className={styles.logoImg} />
            <span className={styles.logoText}>GrowYourMusic</span>
          </div>
          <p className={styles.footerText}>{t.footer.copyright}</p>
          <div className={styles.footerLinks}>
            <a href="https://www.instagram.com/growyourmusic.ro/" target="_blank" rel="noreferrer">
              Instagram
            </a>
            <a href="https://www.youtube.com/channel/UC7WCSzZMpwCOn4BLiNf1aGQ" target="_blank" rel="noreferrer">
              YouTube
            </a>
            <a href="https://www.tiktok.com/@growyourmusic.ro" target="_blank" rel="noreferrer">
              TikTok
            </a>
            <a href="mailto:contact@growyourmusic.ro">contact@growyourmusic.ro</a>
          </div>
        </Reveal>
      </footer>
    </main>
  )
}
