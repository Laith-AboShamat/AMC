import { Suspense, lazy, useEffect, useMemo, useState } from 'react'
import { MantineProvider } from '@mantine/core'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { translations } from './i18n.js'
import { DesignSelectorPage } from './pages/DesignSelectorPage.jsx'

const EditorialPortfolio = lazy(() => import('./portfolio/EditorialPortfolio.jsx').then((module) => ({ default: module.EditorialPortfolio })))
const MantinePortfolio = lazy(() => import('./portfolio/MantinePortfolio.jsx').then((module) => ({ default: module.MantinePortfolio })))
const AntdPortfolio = lazy(() => import('./portfolio/AntdPortfolio.jsx').then((module) => ({ default: module.AntdPortfolio })))
const AdvisoryPortfolio = lazy(() => import('./portfolio/AdvisoryPortfolio.jsx').then((module) => ({ default: module.AdvisoryPortfolio })))
const FifthPortfolio = lazy(() => import('./portfolio/FifthPortfolio.jsx').then((module) => ({ default: module.FifthPortfolio })))

const darkRoutes = new Set(['/design/mantine', '/design/executive', '/design/advisory'])

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

const routeTitles = {
  '/': (content) => content.selector.pageTitle,
  '/design/editorial': (content) => `${content.brand.name} | ${content.selector.designs[0].title}`,
  '/design/mantine': (content) => `${content.brand.name} | ${content.selector.designs[1].title}`,
  '/design/executive': (content) => `${content.brand.name} | ${content.selector.designs[2].title}`,
  '/design/advisory': (content) => `${content.brand.name} | ${content.selector.designs[3].title}`,
  '/design/fifth': (content) => `${content.brand.name} | ${content.selector.designs[4].title}`,
}

function App() {
  const [locale, setLocale] = useState(getInitialLocale)
  const location = useLocation()

  const content = useMemo(() => translations[locale] ?? translations.en, [locale])
  const direction = locale === 'ar' ? 'rtl' : 'ltr'
  const isDarkRoute = darkRoutes.has(location.pathname)

  useEffect(() => {
    const root = document.documentElement
    root.lang = locale
    root.dir = direction
    root.setAttribute('data-theme', isDarkRoute ? 'amcDark' : 'amc')
    root.style.colorScheme = isDarkRoute ? 'dark' : 'light'

    window.localStorage.setItem(STORAGE_KEYS.locale, locale)

    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', content.meta.description)
    }

    const resolveTitle = routeTitles[location.pathname]
    document.title = resolveTitle ? resolveTitle(content) : content.meta.title
  }, [content, direction, isDarkRoute, locale, location.pathname])

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [location.pathname])

  return (
    <MantineProvider defaultColorScheme="dark">
      <div
        dir={direction}
        className={`app-shell min-h-screen bg-surface text-onSurface selection:bg-primary/15 ${
          locale === 'ar' ? 'locale-ar' : 'locale-en'
        }`}
      >
        <Suspense fallback={<div className="min-h-screen bg-surface" aria-hidden="true" />}>
          <Routes>
            <Route
              path="/"
              element={(
                <DesignSelectorPage
                  content={content}
                  locale={locale}
                  onLocaleChange={setLocale}
                />
              )}
            />
            <Route
              path="/design/editorial"
              element={(
                <EditorialPortfolio
                  content={content}
                  locale={locale}
                  onLocaleChange={setLocale}
                  direction={direction}
                />
              )}
            />
            <Route
              path="/design/mantine"
              element={(
                <MantinePortfolio
                  content={content}
                  locale={locale}
                  onLocaleChange={setLocale}
                />
              )}
            />
            <Route
              path="/design/executive"
              element={(
                <AntdPortfolio
                  content={content}
                  locale={locale}
                  onLocaleChange={setLocale}
                />
              )}
            />
            <Route
              path="/design/advisory"
              element={(
                <AdvisoryPortfolio
                  content={content}
                  locale={locale}
                  onLocaleChange={setLocale}
                />
              )}
            />
            <Route
              path="/design/fifth"
              element={(
                <FifthPortfolio
                  content={content}
                  locale={locale}
                  onLocaleChange={setLocale}
                />
              )}
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </div>
    </MantineProvider>
  )
}

export default App