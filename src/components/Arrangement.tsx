'use client'

import Image from 'next/image'
import { useLanguage } from '@/i18n/LanguageContext'
import styles from './Arrangement.module.css'

export default function Arrangement() {
  const { t } = useLanguage()

  return (
    <section className={styles.arrangement} id="top">
      <div className={styles.heroContent}>
        <Image
          src="/img/cerc.png"
          alt=""
          aria-hidden="true"
          width={900}
          height={895}
          className={styles.heroCirc}
          priority
        />

        {/* Four words, four fonts — same treatment as validation-gym's own
            hero title (page.module.css .titleCreate/.titleCollaborate/
            .titleGetPaid/.heroAccent): Space Grotesk, Playfair Display
            italic, JetBrains Mono, and a Poppins gradient, each carrying
            its own track color. */}
        <h1 className={styles.heroTitle}>
          <span className={styles.titleRow}>
            <span className={styles.titleCreate}>{t.hero.titleCreate}</span>{' '}
            <span className={styles.titleCollaborate}>{t.hero.titleCollaborate}</span>{' '}
            <span className={styles.titleGetPaid}>{t.hero.titleGetPaid}</span>
          </span>
          <span className={styles.heroAccent}>{t.hero.titleAccent}</span>
        </h1>

        <p className={styles.heroSubtitle}>{t.hero.subtitle}</p>

        <a className={styles.cta} href="#preregister-form">
          <span className={styles.ctaLabel}>{t.cta.button}</span>
        </a>
      </div>
    </section>
  )
}
