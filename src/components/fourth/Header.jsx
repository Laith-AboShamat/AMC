import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AppIcon } from './AppIcon.jsx'
import { AppLogo } from './AppLogo.jsx'
import { getAdvisoryCopy } from './copy.js'

export function FourthHeader({ content, locale, onLocaleChange }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const copy = getAdvisoryCopy(locale)
  const navLinks = [
    { id: 'hero', label: copy.header.nav.home, href: '#hero' },
    { id: 'services', label: copy.header.nav.services, href: '#services' },
    { id: 'about', label: copy.header.nav.about, href: '#about' },
    { id: 'results', label: copy.header.nav.results, href: '#results' },
    { id: 'contact', label: copy.header.nav.contact, href: '#contact' },
  ]

  const toggleLocale = () => onLocaleChange(locale === 'ar' ? 'en' : 'ar')

  useEffect(() => {
    const sectionIds = ['hero', 'services', 'about', 'results', 'contact']
    const headerOffset = 150

    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
      if (menuOpen && window.scrollY > 100) {
        setMenuOpen(false)
      }

      const scrollMarker = window.scrollY + headerOffset
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
  }, [menuOpen])

  const handleNavClick = (href) => {
    setMenuOpen(false)
    const id = href.replace('#', '')
    const element = document.getElementById(id)
    if (element) {
      const headerOffset = 110
      const top = element.getBoundingClientRect().top + window.scrollY - headerOffset
      window.scrollTo({ top, behavior: 'smooth' })
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
          <Link to="/" className="hidden sm:inline-flex rounded-full border border-[var(--border-light)] bg-[rgba(255,255,255,0.72)] px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--text-secondary)] backdrop-blur-sm transition hover:text-[var(--navy)]">
            {content.selector.backToChoices}
          </Link>
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
                activeSection === link.id
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
              dir="ltr"
              className="advisory-icon-button advisory-locale-toggle px-3 w-auto min-w-[4.5rem]"
            >
              <span className={`advisory-locale-token ${locale === 'en' ? 'is-active' : ''}`}>EN</span>
              <span className="advisory-locale-divider" aria-hidden="true">|</span>
              <span className={`advisory-locale-token ${locale === 'ar' ? 'is-active' : ''}`}>AR</span>
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
              dir="ltr"
              className="advisory-icon-button advisory-locale-toggle px-3 w-auto min-w-[4.5rem]"
            >
              <span className={`advisory-locale-token ${locale === 'en' ? 'is-active' : ''}`}>EN</span>
              <span className="advisory-locale-divider" aria-hidden="true">|</span>
              <span className={`advisory-locale-token ${locale === 'ar' ? 'is-active' : ''}`}>AR</span>
            </button>
          </div>

          {navLinks.map((link) => (
            <button
              key={link.href}
              type="button"
              onClick={() => handleNavClick(link.href)}
              className={`text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors min-h-[44px] ${
                activeSection === link.id
                  ? 'bg-[var(--blue-accent)] text-white'
                  : 'text-[var(--text-secondary)] hover:text-[var(--navy)] hover:bg-[var(--bg-cool)]'
              }`}
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