import { useEffect, useState } from 'react'
import { ArrowLeft, ArrowRight, Menu, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { getAdvisoryCopy } from '../fourth/copy.js'

const sectionIds = ['hero', 'services', 'about', 'results', 'contact']

export function FifthHeader({ content, locale, onLocaleChange }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const copy = getAdvisoryCopy(locale)
  const navItems = [
    { id: 'hero', label: copy.header.nav.home },
    { id: 'services', label: copy.header.nav.services },
    { id: 'about', label: copy.header.nav.about },
    { id: 'results', label: copy.header.nav.results },
    { id: 'contact', label: copy.header.nav.contact },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 18)

      const scrollMarker = window.scrollY + 160
      let nextActiveSection = 'hero'

      sectionIds.forEach((id) => {
        const element = document.getElementById(id)
        if (element && scrollMarker >= element.offsetTop) {
          nextActiveSection = id
        }
      })

      setActiveSection(nextActiveSection)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  const handleNavClick = (id) => {
    setMenuOpen(false)

    const element = document.getElementById(id)
    if (!element) {
      return
    }

    const top = element.getBoundingClientRect().top + window.scrollY - 108
    window.scrollTo({ top, behavior: 'smooth' })
  }

  return (
    <header className="sticky top-0 z-50 px-4 py-4 sm:px-6 lg:px-10">
      <div
        className={`mx-auto flex max-w-[1380px] flex-wrap items-center gap-4 rounded-[1.75rem] border px-4 py-3 transition duration-300 sm:px-6 ${
          scrolled
            ? 'border-slate-200/90 bg-white/94 shadow-[0_20px_50px_rgba(15,23,42,0.08)] backdrop-blur-xl'
            : 'border-white/70 bg-white/82 shadow-[0_10px_30px_rgba(15,23,42,0.05)] backdrop-blur-lg'
        }`}
      >
        <div className="flex min-w-0 items-center gap-3">
          <Link to="/" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-600 transition hover:border-[#2d6cdf] hover:bg-white hover:text-[#2d6cdf]" aria-label={content.selector.backToChoices}>
            <ArrowLeft size={16} />
          </Link>

          <button type="button" onClick={() => handleNavClick('hero')} className="flex min-w-0 items-center gap-3 text-left">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white p-1.5 shadow-[0_12px_24px_rgba(15,23,42,0.06)]">
              <img src="/amc1.png" alt={content.brand.logoAlt} className="max-h-full max-w-full object-contain" />
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-bold uppercase tracking-[0.22em] text-slate-900">{content.brand.name}</p>
              <p className="truncate text-xs font-medium uppercase tracking-[0.18em] text-slate-500 max-sm:hidden">{copy.header.brandLine}</p>
            </div>
          </button>
        </div>

        <nav className="hidden flex-1 items-center justify-center gap-2 lg:flex">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleNavClick(item.id)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                activeSection === item.id
                  ? 'bg-slate-900 text-white shadow-[0_12px_24px_rgba(15,23,42,0.16)]'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="ml-auto hidden items-center gap-3 lg:flex">
          <div className="inline-flex rounded-full border border-slate-200 bg-slate-50 p-1">
            <button
              type="button"
              onClick={() => onLocaleChange('en')}
              aria-pressed={locale === 'en'}
              className={`min-h-[44px] rounded-full px-4 text-xs font-bold uppercase tracking-[0.2em] transition ${
                locale === 'en' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => onLocaleChange('ar')}
              aria-pressed={locale === 'ar'}
              className={`min-h-[44px] rounded-full px-4 text-xs font-bold uppercase tracking-[0.2em] transition ${
                locale === 'ar' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              AR
            </button>
          </div>

          <button
            type="button"
            onClick={() => handleNavClick('contact')}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-[#2d6cdf] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1d57bf]"
          >
            {content.header.cta}
            <ArrowRight size={15} />
          </button>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? content.controls.closeMenu : content.controls.openMenu}
          className="ml-auto inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-700 lg:hidden"
        >
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>

        {menuOpen ? (
          <div className="flex basis-full flex-col gap-3 rounded-[1.5rem] border border-slate-200 bg-white p-4 lg:hidden">
            <div className="inline-flex w-fit rounded-full border border-slate-200 bg-slate-50 p-1">
              <button
                type="button"
                onClick={() => onLocaleChange('en')}
                className={`min-h-[44px] rounded-full px-4 text-xs font-bold uppercase tracking-[0.2em] ${locale === 'en' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'}`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => onLocaleChange('ar')}
                className={`min-h-[44px] rounded-full px-4 text-xs font-bold uppercase tracking-[0.2em] ${locale === 'ar' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'}`}
              >
                AR
              </button>
            </div>

            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className={`min-h-[44px] rounded-2xl px-4 py-3 text-left text-sm font-semibold ${
                  activeSection === item.id ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-700'
                }`}
              >
                {item.label}
              </button>
            ))}

            <button
              type="button"
              onClick={() => handleNavClick('contact')}
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-2xl bg-[#2d6cdf] px-5 py-3 text-sm font-semibold text-white"
            >
              {content.header.cta}
              <ArrowRight size={15} />
            </button>
          </div>
        ) : null}
      </div>
    </header>
  )
}