'use client'

import Link from 'next/link'
import styles from './privacy.module.css'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import { useLanguage } from '@/i18n/LanguageContext'
import { PRIVACY, PRIVACY_UPDATED } from '@/i18n/privacy'

export default function PrivacyPage() {
  const { lang, t } = useLanguage()
  const content = PRIVACY[lang]
  const updated = new Date(PRIVACY_UPDATED).toLocaleDateString(lang, { day: 'numeric', month: 'long', year: 'numeric' })

  return (
    <main className={styles.page}>
      <header className={styles.bar}>
        <Link href="/" className={styles.back}>
          ← {t.landing.privacyBack}
        </Link>
        <LanguageSwitcher />
      </header>

      <article className={styles.article}>
        <h1 className={`${styles.title} glass-text`}>{content.title}</h1>
        <p className={styles.updated}>
          {content.updatedLabel}: <time dateTime={PRIVACY_UPDATED}>{updated}</time>
        </p>
        <p className={styles.intro}>{content.intro}</p>

        {content.sections.map((section) => (
          <section key={section.title} className={styles.section}>
            <h2 className={styles.heading}>{section.title}</h2>
            {section.items ? (
              <ul className={styles.list}>
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}
            {section.paragraphs?.map((p) => (
              <p key={p} className={styles.text}>
                {p}
              </p>
            ))}
          </section>
        ))}
      </article>
    </main>
  )
}
