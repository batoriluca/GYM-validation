'use client'

import { useLanguage } from '@/i18n/LanguageContext'
import { LANGUAGES } from '@/i18n/translations'
import styles from './LanguageSwitcher.module.css'

const LABELS = { en: 'EN', ro: 'RO' }

export default function LanguageSwitcher() {
  const { lang, setLang } = useLanguage()

  return (
    <div className={styles.switcher} role="group" aria-label="Language">
      {LANGUAGES.map((code) => (
        <button
          key={code}
          type="button"
          className={`${styles.langButton} ${lang === code ? styles.active : ''}`}
          onClick={() => setLang(code)}
          aria-pressed={lang === code}
        >
          {LABELS[code]}
        </button>
      ))}
    </div>
  )
}
