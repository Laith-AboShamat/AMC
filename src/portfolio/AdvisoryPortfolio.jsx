import { FourthAboutTeamSection } from '../components/fourth/AboutTeamSection.jsx'
import { FourthContactSection } from '../components/fourth/ContactSection.jsx'
import { FourthFooter } from '../components/fourth/Footer.jsx'
import { FourthHeader } from '../components/fourth/Header.jsx'
import { FourthHeroSection } from '../components/fourth/HeroSection.jsx'
import { FourthOutcomesSection } from '../components/fourth/OutcomesSection.jsx'
import { FourthServicesSection } from '../components/fourth/ServicesSection.jsx'
import { FourthTestimonialsSection } from '../components/fourth/TestimonialsSection.jsx'

export function AdvisoryPortfolio({ content, locale, theme, onLocaleChange, onThemeChange }) {
  return (
    <div className="advisory-shell">
      <FourthHeader
        content={content}
        locale={locale}
        theme={theme}
        onLocaleChange={onLocaleChange}
        onThemeChange={onThemeChange}
      />
      <main className="min-h-screen bg-[var(--bg-cool)]">
        <FourthHeroSection locale={locale} />
        <FourthServicesSection locale={locale} theme={theme} />
        <FourthAboutTeamSection locale={locale} />
        <FourthOutcomesSection locale={locale} />
        <FourthTestimonialsSection locale={locale} />
        <FourthContactSection locale={locale} />
      </main>
      <FourthFooter locale={locale} />
    </div>
  )
}