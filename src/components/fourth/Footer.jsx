import { useEffect, useRef, useState } from 'react'
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
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 text-center sm:text-left">
            <button type="button" onClick={() => handleNav('#hero')} className="flex items-center gap-2">
              <AppLogo src="/amc1.png" size={32} className="rounded-lg overflow-hidden bg-[var(--navy-dark)] p-1" />
              <span className="advisory-display font-semibold text-base text-[var(--navy-dark)]">AMC</span>
            </button>
            <div className="flex items-center gap-4 sm:gap-6 flex-wrap justify-center sm:justify-start">
              {copy.nav.map((link) => (
                <button key={link.href} type="button" onClick={() => handleNav(link.href)} className="text-sm font-medium text-[var(--text-muted)] hover:text-[var(--navy)] transition-colors min-h-[44px] flex items-center">
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex items-center gap-4">
              {copy.socials.map((social) => (
                <a key={social.label} href={social.href} target="_blank" rel="noreferrer" aria-label={social.label} className="w-11 h-11 rounded-full border border-[var(--border-light)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--navy)] hover:border-[var(--navy)] transition-all">
                  <AppIcon name={social.icon} size={16} />
                </a>
              ))}
            </div>
            <span className="text-sm text-[var(--text-muted)] font-medium text-center sm:text-left">
              © {new Date().getFullYear()} {copy.copyright}
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}