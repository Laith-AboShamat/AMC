import { SixthAboutSection } from '../components/sixth/SixthAboutSection.jsx'
import { SixthContactSection } from '../components/sixth/SixthContactSection.jsx'
import { SixthFooter } from '../components/sixth/SixthFooter.jsx'
import { SixthHeader } from '../components/sixth/SixthHeader.jsx'
import { SixthHeroSection } from '../components/sixth/SixthHeroSection.jsx'
import { SixthResultsSection } from '../components/sixth/SixthResultsSection.jsx'
import { SixthServicesSection } from '../components/sixth/SixthServicesSection.jsx'

export function SixthPortfolio({ content, locale }) {
  return (
    <div className="sixth-shell min-h-screen bg-white text-slate-950">
      <SixthHeader content={content} locale={locale} />
      <main>
        <SixthHeroSection locale={locale} />
        <SixthServicesSection locale={locale} />
        <SixthAboutSection locale={locale} />
        <SixthResultsSection locale={locale} />
        <SixthContactSection locale={locale} />
      </main>
      <SixthFooter locale={locale} />
    </div>
  )
}