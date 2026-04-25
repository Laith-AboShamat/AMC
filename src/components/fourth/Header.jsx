import { useEffect, useState } from 'react'
import { MoonStar, SunMedium } from 'lucide-react'
import { AppIcon } from './AppIcon.jsx'
import { AppLogo } from './AppLogo.jsx'
import { getAdvisoryCopy } from './copy.js'

export function FourthHeader({ content, locale, theme, onLocaleChange, onThemeChange }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const copy = getAdvisoryCopy(locale)
  const navLinks = [
    { label: copy.header.nav.services, href: '#services' },
    { label: copy.header.nav.about, href: '#about' },
    { label: copy.header.nav.results, href: '#results' },
    { label: copy.header.nav.contact, href: '#contact' },
  ]

  const toggleLocale = () => onLocaleChange(locale === 'ar' ? 'en' : 'ar')
  const toggleTheme = () => onThemeChange(theme === 'dark' ? 'light' : 'dark')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
      if (menuOpen && window.scrollY > 100) {
        setMenuOpen(false)
      }
    }

    const sectionIds = ['hero', 'services', 'about', 'results', 'contact']
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((left, right) => right.intersectionRatio - left.intersectionRatio)[0]

        if (visibleEntry?.target?.id) {
          setActiveSection(visibleEntry.target.id)
        }
      },
      { threshold: [0.2, 0.45, 0.7], rootMargin: '-20% 0px -45% 0px' },
    )

    sectionIds.forEach((id) => {
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    })

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [menuOpen])

  const handleNavClick = (href) => {
    setMenuOpen(false)
    const id = href.replace('#', '')
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <nav
      className={`advisory-nav fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled ? 'advisory-nav-scrolled py-0' : 'bg-transparent py-2'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-3 sm:gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <button className="flex items-center gap-3 group min-w-0" onClick={() => handleNavClick('#hero')} type="button">
            <AppLogo
              src="/amc1.png"
              size={36}
              className="advisory-brand-chip group-hover:scale-105 transition-transform duration-300 rounded-lg overflow-hidden p-1.5 backdrop-blur-sm"
            />
            <div className="flex flex-col justify-center min-w-0 text-left">
              <span className={`advisory-brand-title transition-colors duration-300 ${scrolled ? 'text-[var(--navy-dark)]' : 'advisory-nav-hero-text'}`}>
                AMC
              </span>
              <span className={`advisory-brand-subtitle hidden sm:block transition-colors duration-300 ${scrolled ? 'text-[var(--gold)]' : 'text-[var(--gold-light)]'}`}>
                {copy.header.brandLine}
              </span>
            </div>
          </button>
        </div>

        <div className="advisory-nav-links hidden md:flex items-center gap-1 px-2 py-1.5 rounded-full shadow-sm">
          {navLinks.map((link) => (
            <button
              key={link.href}
              type="button"
              onClick={() => handleNavClick(link.href)}
              className={`advisory-nav-link px-5 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 ${
                activeSection === link.href.replace('#', '')
                  ? 'bg-[var(--blue-accent)] text-white shadow-sm'
                  : 'text-[var(--text-secondary)] hover:text-[var(--navy-dark)]'
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <div className="advisory-icon-actions">
            <button
              type="button"
              title={copy.header.toggleLanguage}
              aria-label={copy.header.toggleLanguage}
              onClick={toggleLocale}
              className="advisory-icon-button advisory-locale-toggle px-3 w-auto min-w-[4.5rem]"
            >
              <span className={`advisory-locale-token ${locale === 'en' ? 'is-active' : ''}`}>EN</span>
              <span className="advisory-locale-divider" aria-hidden="true">|</span>
              <span className={`advisory-locale-token ${locale === 'ar' ? 'is-active' : ''}`}>AR</span>
            </button>
            <button
              type="button"
              title={copy.header.toggleTheme}
              aria-label={copy.header.toggleTheme}
              onClick={toggleTheme}
              className="advisory-icon-button"
            >
              {theme === 'dark' ? <SunMedium size={16} /> : <MoonStar size={16} />}
            </button>
          </div>
          <button
            onClick={() => handleNavClick('#contact')}
            className="advisory-btn-primary advisory-header-cta px-6 py-2.5 rounded-full text-xs font-semibold tracking-wide flex items-center gap-2"
            type="button"
          >
            {content?.header?.cta ?? 'Get Consultation'}
            <AppIcon name="ArrowRightIcon" size={14} />
          </button>
        </div>

        <button
          className={`md:hidden p-2 rounded-lg transition-colors ${scrolled ? 'text-[var(--navy)]' : 'advisory-nav-hero-text'}`}
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          type="button"
        >
          <AppIcon name={menuOpen ? 'XMarkIcon' : 'Bars3Icon'} size={24} />
        </button>
      </div>

      <div
        className={`advisory-mobile-menu md:hidden absolute top-full left-0 w-full bg-[var(--bg-white)] border-b border-[var(--border-light)] shadow-lg ${
          menuOpen ? 'open' : 'closed'
        }`}
      >
        <div className="px-5 py-4 flex flex-col gap-1">
          <div className="advisory-icon-actions mb-3 self-start">
            <button
              type="button"
              title={copy.header.toggleLanguage}
              aria-label={copy.header.toggleLanguage}
              onClick={toggleLocale}
              className="advisory-icon-button advisory-locale-toggle px-3 w-auto min-w-[4.5rem]"
            >
              <span className={`advisory-locale-token ${locale === 'en' ? 'is-active' : ''}`}>EN</span>
              <span className="advisory-locale-divider" aria-hidden="true">|</span>
              <span className={`advisory-locale-token ${locale === 'ar' ? 'is-active' : ''}`}>AR</span>
            </button>
            <button
              type="button"
              title={copy.header.toggleTheme}
              aria-label={copy.header.toggleTheme}
              onClick={toggleTheme}
              className="advisory-icon-button"
            >
              {theme === 'dark' ? <SunMedium size={16} /> : <MoonStar size={16} />}
            </button>
          </div>

          {navLinks.map((link) => (
            <button
              key={link.href}
              type="button"
              onClick={() => handleNavClick(link.href)}
              className="text-left px-4 py-3 rounded-xl text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--navy)] hover:bg-[var(--bg-cool)] transition-colors min-h-[44px]"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => handleNavClick('#contact')}
            className="advisory-btn-primary mt-2 px-6 py-3 rounded-full text-sm font-semibold text-center min-h-[44px]"
            type="button"
          >
            {content?.header?.cta ?? 'Get Consultation'}
          </button>
        </div>
      </div>
    </nav>
  )
}