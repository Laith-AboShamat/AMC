import { useEffect, useMemo, useState } from 'react'
import { MantineProvider } from '@mantine/core'
import { translations } from './i18n.js'
import { AdvisoryPortfolio } from './portfolio/AdvisoryPortfolio.jsx'

const STORAGE_KEYS = {
  locale: 'amc-locale',
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

function App() {
  const [locale, setLocale] = useState(getInitialLocale)

  const content = useMemo(() => translations[locale] ?? translations.en, [locale])
  const direction = locale === 'ar' ? 'rtl' : 'ltr'

  useEffect(() => {
    const root = document.documentElement
    root.lang = locale
    root.dir = direction
    root.setAttribute('data-theme', 'amcDark')
    root.style.colorScheme = 'dark'

    window.localStorage.setItem(STORAGE_KEYS.locale, locale)

    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', content.meta.description)
    }

    document.title = content.meta.title
  }, [content.meta.description, content.meta.title, direction, locale])

  return (
    <MantineProvider defaultColorScheme="dark">
      <div
        dir={direction}
        className={`app-shell min-h-screen bg-surface text-onSurface selection:bg-primary/15 ${
          locale === 'ar' ? 'locale-ar' : 'locale-en'
        }`}
      >
        <AdvisoryPortfolio
          content={content}
          locale={locale}
          onLocaleChange={setLocale}
        />
      </div>
    </MantineProvider>
  )
}

export default App