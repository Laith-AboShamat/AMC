import { FifthAboutSection } from '../components/fifth/FifthAboutSection.jsx'
import { FifthContactSection } from '../components/fifth/FifthContactSection.jsx'
import { FifthFooter } from '../components/fifth/FifthFooter.jsx'
import { FifthHeader } from '../components/fifth/FifthHeader.jsx'
import { FifthHeroSection } from '../components/fifth/FifthHeroSection.jsx'
import { FifthResultsSection } from '../components/fifth/FifthResultsSection.jsx'
import { FifthServicesSection } from '../components/fifth/FifthServicesSection.jsx'

export function FifthPortfolio({ content, locale, onLocaleChange }) {
  return (
    <div className="fifth-shell min-h-screen bg-[#f3f6f9] text-slate-950">
      <FifthHeader content={content} locale={locale} onLocaleChange={onLocaleChange} />
      <main>
        <FifthHeroSection locale={locale} />
        <FifthServicesSection locale={locale} />
        <FifthAboutSection locale={locale} />
        <FifthResultsSection locale={locale} />
        <FifthContactSection locale={locale} />
      </main>
      <FifthFooter locale={locale} />
    </div>
  )
}