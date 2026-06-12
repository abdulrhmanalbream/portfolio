import { createContext, useContext, useState, useCallback, useLayoutEffect } from 'react'

const STORAGE_KEY = 'portfolio_lang'

const LanguageContext = createContext({
  lang: 'en',
  dir: 'ltr',
  setLang: () => {},
  toggleLang: () => {},
})

function readInitialLang() {
  if (typeof window === 'undefined') return 'en'
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (saved === 'ar' || saved === 'en') return saved
  } catch {
    /* localStorage unavailable — fall through to default */
  }
  return 'en'
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(readInitialLang)
  const dir = lang === 'ar' ? 'rtl' : 'ltr'

  // Apply <html lang/dir> + persist. useLayoutEffect avoids a flash of the
  // wrong direction before paint.
  useLayoutEffect(() => {
    const root = document.documentElement
    root.lang = lang
    root.dir = dir
    try {
      window.localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      /* ignore persistence failures (private mode, etc.) */
    }
  }, [lang, dir])

  const setLang = useCallback((next) => {
    setLangState(next === 'ar' ? 'ar' : 'en')
  }, [])

  const toggleLang = useCallback(() => {
    setLangState((prev) => (prev === 'ar' ? 'en' : 'ar'))
  }, [])

  return (
    <LanguageContext.Provider value={{ lang, dir, setLang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
