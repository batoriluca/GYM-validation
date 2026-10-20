'use client'

import styles from '@/app/page.module.css'
import { useLanguage } from '@/i18n/LanguageContext'
import { IconSpark } from '@/components/Icons'

// The founding-member benefit block from the join banner, lifted out of
// page.tsx unchanged (same markup, same page.module.css classes) so the
// carousel render route can reuse it.
export default function FounderBenefit() {
  const { t } = useLanguage()

  return (
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
  )
}
