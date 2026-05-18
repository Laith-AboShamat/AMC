import { Suspense, lazy, useEffect, useMemo, useState } from 'react'
import { MantineProvider } from '@mantine/core'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { translations } from './i18n.js'
import { ScrollToTopButton } from './components/ScrollToTopButton.jsx'

const EditorialPortfolio = lazy(() => import('./portfolio/EditorialPortfolio.jsx').then((module) => ({ default: module.EditorialPortfolio })))
const MantinePortfolio = lazy(() => import('./portfolio/MantinePortfolio.jsx').then((module) => ({ default: module.MantinePortfolio })))
const AntdPortfolio = lazy(() => import('./portfolio/AntdPortfolio.jsx').then((module) => ({ default: module.AntdPortfolio })))
const AdvisoryPortfolio = lazy(() => import('./portfolio/AdvisoryPortfolio.jsx').then((module) => ({ default: module.AdvisoryPortfolio })))
const FifthPortfolio = lazy(() => import('./portfolio/FifthPortfolio.jsx').then((module) => ({ default: module.FifthPortfolio })))
const SixthPortfolio = lazy(() => import('./portfolio/SixthPortfolio.jsx').then((module) => ({ default: module.SixthPortfolio })))

const darkRoutes = new Set(['/design/mantine', '/design/executive', '/design/advisory'])

const STORAGE_KEYS = {
  locale: 'amc-locale',
}

function isSixthRoutePathname(pathname) {
  return pathname === '/' || pathname === '/design/sixth'
}

function getInitialLocale() {
  if (typeof window === 'undefined') {
    return 'en'
  }

  if (isSixthRoutePathname(window.location?.pathname)) {
    return 'en'
  }

  const storedLocale = window.localStorage.getItem(STORAGE_KEYS.locale)
  if (storedLocale === 'en' || storedLocale === 'ar') {
    return storedLocale
  }

  return window.navigator.language?.toLowerCase().startsWith('ar') ? 'ar' : 'en'
}

const routeTitles = {
  '/': (content) => content.brand.name,
  '/design/editorial': (content) => `${content.brand.name} | ${content.selector.designs[0].title}`,
  '/design/mantine': (content) => `${content.brand.name} | ${content.selector.designs[1].title}`,
  '/design/executive': (content) => `${content.brand.name} | ${content.selector.designs[2].title}`,
  '/design/advisory': (content) => `${content.brand.name} | ${content.selector.designs[3].title}`,
  '/design/fifth': (content) => `${content.brand.name} | ${content.selector.designs[4].title}`,
  '/design/sixth': (content) => content.brand.name,
}

function App() {
  const [locale, setLocale] = useState(getInitialLocale)
  const location = useLocation()
  const isSixthRoute = isSixthRoutePathname(location.pathname)
  const effectiveLocale = isSixthRoute ? 'en' : locale

  useEffect(() => {
    if (isSixthRoute && locale !== 'en') {
      setLocale('en')
    }
  }, [isSixthRoute, locale])

  const content = useMemo(() => translations[effectiveLocale] ?? translations.en, [effectiveLocale])
  const direction = effectiveLocale === 'ar' ? 'rtl' : 'ltr'
  const isDarkRoute = darkRoutes.has(location.pathname)
  const showGlobalScrollTop = location.pathname !== '/design/advisory'

  useEffect(() => {
    const root = document.documentElement
    root.lang = effectiveLocale
    root.dir = direction
    root.setAttribute('data-theme', isDarkRoute ? 'amcDark' : 'amc')
    root.style.colorScheme = isDarkRoute ? 'dark' : 'light'

    if (!isSixthRoute) {
      window.localStorage.setItem(STORAGE_KEYS.locale, locale)
    }

    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', content.meta.description)
    }

    const resolveTitle = routeTitles[location.pathname]
    document.title = resolveTitle ? resolveTitle(content) : content.meta.title
  }, [content, direction, effectiveLocale, isDarkRoute, isSixthRoute, locale, location.pathname])

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
                <SixthPortfolio
                  content={content}
                  locale={effectiveLocale}
                  onLocaleChange={setLocale}
                />
              )}
            />
            <Route
              path="/design/editorial"
              element={(
                <EditorialPortfolio
                  content={content}
                  locale={effectiveLocale}
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
                  locale={effectiveLocale}
                  onLocaleChange={setLocale}
                />
              )}
            />
            <Route
              path="/design/executive"
              element={(
                <AntdPortfolio
                  content={content}
                  locale={effectiveLocale}
                  onLocaleChange={setLocale}
                />
              )}
            />
            <Route
              path="/design/advisory"
              element={(
                <AdvisoryPortfolio
                  content={content}
                  locale={effectiveLocale}
                  onLocaleChange={setLocale}
                />
              )}
            />
            <Route
              path="/design/fifth"
              element={(
                <FifthPortfolio
                  content={content}
                  locale={effectiveLocale}
                  onLocaleChange={setLocale}
                />
              )}
            />
            <Route
              path="/design/sixth"
              element={<Navigate to="/" replace />}
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>

        {showGlobalScrollTop ? (
          <ScrollToTopButton
            locale={effectiveLocale}
            label={effectiveLocale === 'ar' ? 'العودة إلى الأعلى' : 'Back to top'}
          />
        ) : null}
      </div>
    </MantineProvider>
  )
}

export default App