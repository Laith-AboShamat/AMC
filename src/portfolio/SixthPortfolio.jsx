import { FifthFooter } from '../components/fifth/FifthFooter.jsx'
import { FifthHeader } from '../components/fifth/FifthHeader.jsx'
import { SixthAboutSection } from '../components/sixth/SixthAboutSection.jsx'
import { SixthContactSection } from '../components/sixth/SixthContactSection.jsx'
import { SixthHeroSection } from '../components/sixth/SixthHeroSection.jsx'
import { SixthResultsSection } from '../components/sixth/SixthResultsSection.jsx'
import { SixthServicesSection } from '../components/sixth/SixthServicesSection.jsx'

export function SixthPortfolio({ content, locale, onLocaleChange }) {
  return (
    <div className="min-h-screen bg-white text-slate-950">
      <FifthHeader content={content} locale={locale} onLocaleChange={onLocaleChange} />
      <main>
        <SixthHeroSection locale={locale} />
        <SixthServicesSection locale={locale} />
        <SixthAboutSection locale={locale} />
        <SixthResultsSection locale={locale} />
        <SixthContactSection locale={locale} />
      </main>
      <FifthFooter locale={locale} />
    </div>
  )
}