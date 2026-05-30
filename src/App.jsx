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

const DEFAULT_SEO_KEYWORDS =
  'AMC, AMCCO, amcco, amcco.ps, operational excellence, operational excellence consulting, business transformation, business transformation consulting, operational performance improvement, process optimization, process improvement, process efficiency consulting, reduce inefficiencies, institutional systems strengthening, institutional development consulting, scalable growth strategy, implementation-oriented consulting, measurable business solutions, organizational performance, performance improvement consulting, continuous improvement consulting, management consulting, operations consulting, strategy and execution consulting'

const DEFAULT_SEO_KEYWORDS_AR =
  'AMC, التميز التشغيلي, التحول المؤسسي, تحسين الأداء التشغيلي, تقليل الهدر, تطوير العمليات, تعزيز الأنظمة المؤسسية, النمو القابل للتوسع, حلول قابلة للقياس, استشارات تنفيذية'

const ROUTE_SEO = {
  '/': {
    title: 'AMC | Premium Operational Excellence & Business Transformation',
    description:
      'AMC is a premium operational excellence and business transformation firm that helps organizations improve operational performance, reduce inefficiencies, strengthen institutional systems, and achieve scalable growth through customized, measurable, and implementation-oriented solutions.',
    keywords: DEFAULT_SEO_KEYWORDS,
  },
}

const ROUTE_SEO_AR = {
  '/': {
    title: 'AMC | شركة رائدة في التميز التشغيلي والتحول المؤسسي',
    description:
      'AMC شركة رائدة في التميز التشغيلي والتحول المؤسسي، تساعد المؤسسات على رفع الأداء التشغيلي وتقليل الهدر وتعزيز الأنظمة المؤسسية وتحقيق نمو قابل للتوسع عبر حلول مخصصة وقابلة للقياس ومرتكزة على التنفيذ.',
    keywords: DEFAULT_SEO_KEYWORDS_AR,
  },
}

function resolveRouteSeo(pathname, locale, content) {
  if (locale === 'ar') {
    const arSeo = ROUTE_SEO_AR[pathname] ?? ROUTE_SEO_AR['/']
    return {
      title: arSeo?.title ?? content.meta.title,
      description: arSeo?.description ?? content.meta.description,
      keywords: arSeo?.keywords ?? DEFAULT_SEO_KEYWORDS_AR,
    }
  }

  const seo = ROUTE_SEO[pathname] ?? ROUTE_SEO['/']
  if (seo) {
    return seo
  }

  return {
    title: content.meta.title,
    description: content.meta.description,
    keywords: DEFAULT_SEO_KEYWORDS,
  }
}

function upsertMeta(selector, attributeName, attributeValue, content) {
  let tag = document.querySelector(selector)
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute(attributeName, attributeValue)
    document.head.appendChild(tag)
  }
  tag.setAttribute('content', content)
}

function upsertCanonical(url) {
  let canonical = document.querySelector('link[rel="canonical"]')
  if (!canonical) {
    canonical = document.createElement('link')
    canonical.setAttribute('rel', 'canonical')
    document.head.appendChild(canonical)
  }
  canonical.setAttribute('href', url)
}

function upsertJsonLdScript(scriptId, payload) {
  let script = document.getElementById(scriptId)
  if (!script) {
    script = document.createElement('script')
    script.id = scriptId
    script.type = 'application/ld+json'
    document.head.appendChild(script)
  }
  script.textContent = JSON.stringify(payload)
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

    const routeSeo = resolveRouteSeo(location.pathname, effectiveLocale, content)

    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', routeSeo.description)
    }

    upsertMeta('meta[name="keywords"]', 'name', 'keywords', routeSeo.keywords)
    upsertMeta(
      'meta[name="robots"]',
      'name',
      'robots',
      isSixthRoute ? 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1' : 'noindex, nofollow'
    )
    upsertMeta('meta[property="og:type"]', 'property', 'og:type', 'website')
    upsertMeta('meta[property="og:site_name"]', 'property', 'og:site_name', 'AMC')
    upsertMeta('meta[property="og:description"]', 'property', 'og:description', routeSeo.description)
    upsertMeta('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image')
    upsertMeta('meta[name="twitter:description"]', 'name', 'twitter:description', routeSeo.description)

    const resolveTitle = routeTitles[location.pathname]
    const title = routeSeo.title ?? (resolveTitle ? resolveTitle(content) : content.meta.title)
    document.title = title

    upsertMeta('meta[property="og:title"]', 'property', 'og:title', title)
    upsertMeta('meta[name="twitter:title"]', 'name', 'twitter:title', title)

    const canonicalPath = isSixthRoute ? location.pathname : '/'
    const canonicalUrl = new URL(canonicalPath, window.location.origin).toString()
    upsertCanonical(canonicalUrl)
    upsertMeta('meta[property="og:url"]', 'property', 'og:url', canonicalUrl)

    upsertJsonLdScript('amc-route-seo-schema', {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: title,
      description: routeSeo.description,
      url: canonicalUrl,
      inLanguage: effectiveLocale,
      keywords: routeSeo.keywords,
      about: {
        '@type': 'Organization',
        name: 'AMC',
        url: window.location.origin,
      },
    })
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