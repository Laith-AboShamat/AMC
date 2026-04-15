import { Suspense, lazy, useEffect, useMemo, useState } from 'react'
import { MantineProvider } from '@mantine/core'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { translations } from './i18n.js'

const DesignSelectorPage = lazy(() =>
  import('./pages/DesignSelectorPage.jsx').then((module) => ({
    default: module.DesignSelectorPage,
  })),
)

const EditorialPortfolio = lazy(() =>
  import('./portfolio/EditorialPortfolio.jsx').then((module) => ({
    default: module.EditorialPortfolio,
  })),
)

const MantinePortfolio = lazy(() =>
  import('./portfolio/MantinePortfolio.jsx').then((module) => ({
    default: module.MantinePortfolio,
  })),
)

const AntdPortfolio = lazy(() =>
  import('./portfolio/AntdPortfolio.jsx').then((module) => ({
    default: module.AntdPortfolio,
  })),
)

const AdvisoryPortfolio = lazy(() =>
  import('./portfolio/AdvisoryPortfolio.jsx').then((module) => ({
    default: module.AdvisoryPortfolio,
  })),
)

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

function AppRoutes({ content, locale, theme, setLocale, setTheme, direction }) {
  const location = useLocation()

  useEffect(() => {
    const titleMap = {
      '/': content.selector.pageTitle,
      '/design/editorial': `${content.selector.designs[0].title} | ${content.brand.name}`,
      '/design/mantine': `${content.selector.designs[1].title} | ${content.brand.name}`,
      '/design/executive': `${content.selector.designs[2].title} | ${content.brand.name}`,
      '/design/advisory': `${content.selector.designs[3].title} | ${content.brand.name}`,
    }

    document.title = titleMap[location.pathname] ?? content.meta.title
  }, [content, location.pathname])

  return (
    <Suspense fallback={<div className="mx-auto max-w-7xl px-4 py-16 text-sm font-semibold text-secondary sm:px-6 lg:px-10">Loading design...</div>}>
      <Routes>
        <Route
          path="/"
          element={
            <DesignSelectorPage
              content={content}
              locale={locale}
              theme={theme}
              onLocaleChange={setLocale}
              onThemeChange={setTheme}
            />
          }
        />
        <Route
          path="/design/editorial"
          element={
            <EditorialPortfolio
              content={content}
              locale={locale}
              theme={theme}
              onLocaleChange={setLocale}
              onThemeChange={setTheme}
              direction={direction}
            />
          }
        />
        <Route
          path="/design/mantine"
          element={
            <MantinePortfolio
              content={content}
              locale={locale}
              theme={theme}
              onLocaleChange={setLocale}
              onThemeChange={setTheme}
            />
          }
        />
        <Route
          path="/design/executive"
          element={
            <AntdPortfolio
              content={content}
              locale={locale}
              theme={theme}
              onLocaleChange={setLocale}
              onThemeChange={setTheme}
            />
          }
        />
        <Route
          path="/design/advisory"
          element={
            <AdvisoryPortfolio
              content={content}
              locale={locale}
              theme={theme}
              onLocaleChange={setLocale}
              onThemeChange={setTheme}
              direction={direction}
            />
          }
        />
      </Routes>
    </Suspense>
  )
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
  }, [content.meta.description, direction, locale, theme, themeName])

  return (
    <MantineProvider defaultColorScheme={theme}>
      <BrowserRouter>
        <div
          dir={direction}
          className={`app-shell min-h-screen bg-surface text-onSurface selection:bg-primary/15 ${
            locale === 'ar' ? 'locale-ar' : 'locale-en'
          }`}
        >
          <AppRoutes
            content={content}
            locale={locale}
            theme={theme}
            setLocale={setLocale}
            setTheme={setTheme}
            direction={direction}
          />
        </div>
      </BrowserRouter>
    </MantineProvider>
  )
}

export default App