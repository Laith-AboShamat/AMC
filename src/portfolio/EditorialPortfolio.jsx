import { AboutSection } from '../components/AboutSection.jsx'
import { ContactSection } from '../components/ContactSection.jsx'
import { HeroSection } from '../components/HeroSection.jsx'
import { MethodologySection } from '../components/MethodologySection.jsx'
import { PortfolioRouteHeader } from '../components/PortfolioRouteHeader.jsx'
import { PrinciplesSection } from '../components/PrinciplesSection.jsx'
import { ServicesSection } from '../components/ServicesSection.jsx'

export function EditorialPortfolio({ content, locale, onLocaleChange, direction }) {
  const navItems = [
    { href: '#about', label: content.nav.about },
    { href: '#methodology', label: content.nav.methodology },
    { href: '#services', label: content.nav.services },
    { href: '#contact', label: content.nav.contact },
  ]

  return (
    <>
      <PortfolioRouteHeader
        content={content}
        locale={locale}
        onLocaleChange={onLocaleChange}
        navItems={navItems}
      />

      <main id="top">
        <HeroSection content={content} />
        <AboutSection content={content} />
        <MethodologySection content={content} isRtl={direction === 'rtl'} />
        <PrinciplesSection content={content} isRtl={direction === 'rtl'} />
        <ServicesSection content={content} />
        <ContactSection content={content} />
      </main>
    </>
  )
}