import { useEffect, useState } from 'react'
import { AppIcon } from './AppIcon.jsx'
import { AppLogo } from './AppLogo.jsx'
import { getAdvisoryCopy } from './copy.js'

export function FourthFooter({ locale = 'en' }) {
  const [showScrollTop, setShowScrollTop] = useState(false)
  const copy = getAdvisoryCopy(locale).footer

  useEffect(() => {
    const updateScrollTopVisibility = () => {
      setShowScrollTop(window.scrollY > window.innerHeight * 0.5)
    }

    updateScrollTopVisibility()
    window.addEventListener('scroll', updateScrollTopVisibility, { passive: true })
    window.addEventListener('resize', updateScrollTopVisibility)

    return () => {
      window.removeEventListener('scroll', updateScrollTopVisibility)
      window.removeEventListener('resize', updateScrollTopVisibility)
    }
  }, [])

  const handleNav = (href) => {
    const id = href.replace('#', '')
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <footer className="border-t border-[var(--border-light)] bg-[var(--bg-cool)] relative">
      <button
        type="button"
        onClick={() => handleNav('#hero')}
        aria-label={copy.backToTop}
        className={`advisory-scroll-top-button fixed bottom-5 right-5 z-50 inline-flex h-12 w-12 items-center justify-center rounded-full border backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 ${showScrollTop ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-3 pointer-events-none'}`}
      >
        <AppIcon name="ArrowUpRightIcon" size={18} className="-rotate-45" />
      </button>

      <div className="max-w-7xl mx-auto px-5 sm:px-6 py-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:items-center">
          <div className="advisory-footer-left flex flex-col items-center gap-4 text-center sm:flex-row sm:flex-wrap sm:items-center sm:justify-start sm:text-left lg:justify-self-start">
            <button type="button" onClick={() => handleNav('#hero')} className="advisory-footer-brand flex items-center gap-2 rounded-full px-2 py-1.5 transition-all duration-200">
              <AppLogo src="/amc1.png" size={32} className="rounded-lg overflow-hidden bg-[var(--navy-dark)] p-1" />
              <span className="advisory-display font-semibold text-base text-[var(--navy-dark)]">AMC</span>
            </button>
            <div className="advisory-footer-nav flex items-center gap-2 sm:gap-3 flex-wrap justify-center sm:justify-start">
              {copy.nav.map((link) => (
                <button
                  key={link.href}
                  type="button"
                  onClick={() => handleNav(link.href)}
                  className="advisory-footer-nav-link min-h-[44px] rounded-full px-3 py-2 text-sm font-medium transition-all duration-200"
                >
                  {link.label}
                </button>
              ))}
            </div>
            <span className="advisory-footer-copyright w-full text-sm text-[var(--text-muted)] font-medium sm:text-left">
              <span dir="ltr" className="advisory-mixed-ltr">© {new Date().getFullYear()} AMC</span>
            </span>
          </div>

          <div className="advisory-footer-socials flex items-center justify-center gap-4 lg:justify-self-center">
            {copy.socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={social.label}
                className="advisory-footer-social w-11 h-11 rounded-full border flex items-center justify-center transition-all"
              >
                <AppIcon name={social.icon} size={16} />
              </a>
            ))}
          </div>

          <div className="advisory-footer-contact flex flex-col items-center gap-1.5 text-center lg:items-end lg:justify-self-end lg:text-right">
            <a href="mailto:a.mahameed@amcco.ps" className="advisory-footer-contact-line advisory-footer-contact-link text-sm font-medium">
              <span dir="ltr" className="advisory-mixed-ltr">a.mahameed@amcco.ps</span>
            </a>
            <a href="tel:+970592397405" className="advisory-footer-contact-line advisory-footer-contact-link text-sm font-medium">
              <span dir="ltr" className="advisory-mixed-ltr">+970-592-397-405</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}