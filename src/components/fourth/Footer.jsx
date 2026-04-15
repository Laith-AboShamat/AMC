import { AppIcon } from './AppIcon.jsx'
import { AppLogo } from './AppLogo.jsx'
import { getAdvisoryCopy } from './copy.js'

export function FourthFooter({ locale = 'en' }) {
  const copy = getAdvisoryCopy(locale).footer
  const handleNav = (href) => {
    const id = href.replace('#', '')
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <footer className="border-t border-[var(--border-light)] bg-[var(--bg-cool)]">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 py-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
            <button type="button" onClick={() => handleNav('#hero')} className="flex items-center gap-2">
              <AppLogo src="/amc1.png" size={32} className="rounded-lg overflow-hidden bg-[var(--navy-dark)] p-1" />
              <span className="advisory-display font-semibold text-base text-[var(--navy-dark)]">AMC</span>
            </button>
            <div className="flex items-center gap-6 flex-wrap justify-center">
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
                <a key={social.label} href={social.href} aria-label={social.label} className="w-11 h-11 rounded-full border border-[var(--border-light)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--navy)] hover:border-[var(--navy)] transition-all">
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