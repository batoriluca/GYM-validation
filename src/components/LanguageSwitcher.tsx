'use client'

import { useLanguage } from '@/i18n/LanguageContext'
import { LANGUAGES, type Language } from '@/i18n/translations'
import styles from './LanguageSwitcher.module.css'

const LABELS: Record<Language, string> = { en: 'EN', ro: 'RO', it: 'IT' }

export default function LanguageSwitcher() {
  const { lang, setLang } = useLanguage()

  return (
    <div className={styles.switcher}>
      <select
        className={styles.select}
        value={lang}
        onChange={(e) => setLang(e.target.value as Language)}
        aria-label="Language"
      >
        {LANGUAGES.map((code) => (
          <option key={code} value={code}>
            {LABELS[code]}
          </option>
        ))}
      </select>
      <svg className={styles.chevron} viewBox="0 0 10 6" aria-hidden="true">
        <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  )
}
