import { useEffect, useMemo, useState } from 'react'
import { MantineProvider } from '@mantine/core'
import { translations } from './i18n.js'
import { AdvisoryPortfolio } from './portfolio/AdvisoryPortfolio.jsx'

const STORAGE_KEYS = {
  locale: 'amc-locale',
  theme: 'amc-theme',
}

function getInitialLocale() {
  if (typeof window === 'undefined') {
    return 'en'
  }

  const storedLocale = window.localStorage.getItem(STORAGE_KEYS.locale)
  if (storedLocale === 'en' || storedLocale === 'ar') {
    return storedLocale
  }

  return window.navigator.language?.toLowerCase().startsWith('ar') ? 'ar' : 'en'
}

function getInitialTheme() {
  if (typeof window === 'undefined') {
    return 'light'
  }

  const storedTheme = window.localStorage.getItem(STORAGE_KEYS.theme)
  if (storedTheme === 'light' || storedTheme === 'dark') {
    return storedTheme
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function App() {
  const [locale, setLocale] = useState(getInitialLocale)
  const [theme, setTheme] = useState(getInitialTheme)

  const content = useMemo(() => translations[locale] ?? translations.en, [locale])
  const direction = locale === 'ar' ? 'rtl' : 'ltr'
  const themeName = theme === 'dark' ? 'amcDark' : 'amc'

  useEffect(() => {
    const root = document.documentElement
    root.lang = locale
    root.dir = direction
    root.setAttribute('data-theme', themeName)
    root.style.colorScheme = theme

    window.localStorage.setItem(STORAGE_KEYS.locale, locale)
    window.localStorage.setItem(STORAGE_KEYS.theme, theme)

    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', content.meta.description)
    }

    document.title = content.meta.title
  }, [content.meta.description, content.meta.title, direction, locale, theme, themeName])

  return (
    <MantineProvider defaultColorScheme={theme}>
      <div
        dir={direction}
        className={`app-shell min-h-screen bg-surface text-onSurface selection:bg-primary/15 ${
          locale === 'ar' ? 'locale-ar' : 'locale-en'
        }`}
      >
        <AdvisoryPortfolio
          content={content}
          locale={locale}
          theme={theme}
          onLocaleChange={setLocale}
          onThemeChange={setTheme}
        />
      </div>
    </MantineProvider>
  )
}

export default App