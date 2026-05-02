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
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[linear-gradient(180deg,rgba(2,16,45,0.98),rgba(7,24,62,0.94))] shadow-[0_18px_40px_rgba(2,12,32,0.18)] backdrop-blur-xl">
      <div
        className={`mx-auto flex max-w-[1380px] flex-wrap items-center gap-4 px-4 py-4 transition duration-300 sm:px-6 lg:px-10 ${
          scrolled
            ? 'text-white'
            : 'text-white'
        }`}
      >
        <div className="flex min-w-0 items-center gap-3">
          <Link to="/" className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/14 bg-white/8 text-white/78 transition hover:border-white/24 hover:bg-white/14 hover:text-white" aria-label={content.selector.backToChoices}>
            <ArrowLeft size={16} />
          </Link>

          <button type="button" onClick={() => handleNavClick('hero')} className="flex min-w-0 items-center gap-3 text-left">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/12 bg-white/10 p-1.5 shadow-[0_12px_24px_rgba(0,0,0,0.16)] backdrop-blur-md">
              <img src="/amc1.png" alt={content.brand.logoAlt} className="max-h-full max-w-full object-contain" />
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-bold uppercase tracking-[0.22em] text-white">{content.brand.name}</p>
              <p className="truncate text-xs font-medium uppercase tracking-[0.18em] text-white/56 max-sm:hidden">{copy.header.brandLine}</p>
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
                  ? 'bg-white text-[#081a42] shadow-[0_12px_24px_rgba(0,0,0,0.22)]'
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="ml-auto hidden items-center gap-3 lg:flex">
          <div className="inline-flex rounded-full border border-white/12 bg-white/8 p-1 backdrop-blur-md">
            <button
              type="button"
              onClick={() => onLocaleChange('en')}
              aria-pressed={locale === 'en'}
              className={`min-h-[44px] rounded-full px-4 text-xs font-bold uppercase tracking-[0.2em] transition ${
                locale === 'en' ? 'bg-white text-[#081a42] shadow-[0_8px_18px_rgba(0,0,0,0.16)]' : 'text-white/62 hover:text-white'
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => onLocaleChange('ar')}
              aria-pressed={locale === 'ar'}
              className={`min-h-[44px] rounded-full px-4 text-xs font-bold uppercase tracking-[0.2em] transition ${
                locale === 'ar' ? 'bg-white text-[#081a42] shadow-[0_8px_18px_rgba(0,0,0,0.16)]' : 'text-white/62 hover:text-white'
              }`}
            >
              AR
            </button>
          </div>

          <button
            type="button"
            onClick={() => handleNavClick('contact')}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-white/12 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/16"
          >
            {content.header.cta}
            <ArrowRight size={15} />
          </button>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? content.controls.closeMenu : content.controls.openMenu}
          className="ml-auto inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/8 text-white lg:hidden"
        >
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>

        {menuOpen ? (
          <div className="flex basis-full flex-col gap-3 rounded-[1.5rem] border border-white/12 bg-[#0b1d49]/94 p-4 text-white shadow-[0_18px_45px_rgba(0,0,0,0.18)] backdrop-blur-xl lg:hidden">
            <div className="inline-flex w-fit rounded-full border border-white/12 bg-white/8 p-1">
              <button
                type="button"
                onClick={() => onLocaleChange('en')}
                className={`min-h-[44px] rounded-full px-4 text-xs font-bold uppercase tracking-[0.2em] ${locale === 'en' ? 'bg-white text-[#081a42] shadow-[0_8px_18px_rgba(0,0,0,0.16)]' : 'text-white/70'}`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => onLocaleChange('ar')}
                className={`min-h-[44px] rounded-full px-4 text-xs font-bold uppercase tracking-[0.2em] ${locale === 'ar' ? 'bg-white text-[#081a42] shadow-[0_8px_18px_rgba(0,0,0,0.16)]' : 'text-white/70'}`}
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
                  activeSection === item.id ? 'bg-white text-[#081a42]' : 'bg-white/6 text-white/78'
                }`}
              >
                {item.label}
              </button>
            ))}

            <button
              type="button"
              onClick={() => handleNavClick('contact')}
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-2xl border border-white/12 bg-white/10 px-5 py-3 text-sm font-semibold text-white"
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