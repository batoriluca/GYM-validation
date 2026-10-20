'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { LANGUAGES, TRANSLATIONS, type Language, type TranslationShape } from './translations'

const STORAGE_KEY = 'gym_lang'
const DEFAULT_LANGUAGE: Language = 'en'

type LanguageContextValue = {
  lang: Language
  setLang: (lang: Language) => void
  t: TranslationShape
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

// `forceLang` pins the language and ignores the stored preference (used by
// the internal carousel render route, which always renders in Italian).
export function LanguageProvider({ children, forceLang }: { children: ReactNode; forceLang?: Language }) {
  const [lang, setLangState] = useState<Language>(forceLang ?? DEFAULT_LANGUAGE)

  useEffect(() => {
    if (forceLang) return
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (LANGUAGES.includes(stored as Language)) {
      setLangState(stored as Language)
    }
  }, [forceLang])

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const setLang = (next: Language) => {
    setLangState(next)
    window.localStorage.setItem(STORAGE_KEY, next)
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: TRANSLATIONS[lang] }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return ctx
}
