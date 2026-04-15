import { useEffect, useRef } from 'react'
import { AppIcon } from './AppIcon.jsx'
import { AppImage } from './AppImage.jsx'
import { getAdvisoryCopy } from './copy.js'

export function FourthServicesSection({ locale = 'en' }) {
  const sectionRef = useRef(null)
  const cardRefs = useRef([])
  const copy = getAdvisoryCopy(locale).services

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' },
    )

    const headerElement = sectionRef.current?.querySelector('.section-header')
    if (headerElement) {
      observer.observe(headerElement)
    }

    cardRefs.current.forEach((element) => {
      if (element) {
        observer.observe(element)
      }
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section id="services" ref={sectionRef} className="py-20 lg:py-28 bg-[var(--bg-cool)]">
      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        <div className="section-header advisory-reveal-hidden flex flex-col md:flex-row justify-between items-end mb-14 gap-6 border-b border-[var(--border-light)] pb-10">
          <div className="max-w-lg">
            <span className="advisory-section-label block mb-3">{copy.label}</span>
            <h2 className="advisory-display text-4xl sm:text-5xl text-[var(--navy-dark)] leading-tight">
              {copy.titleFirst}
              <br />
              <span className="italic font-light text-[var(--text-secondary)]">{copy.titleAccent}</span>
            </h2>
          </div>

          <div className="flex-shrink-0">
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed max-w-xs text-right hidden md:block">
              {copy.intro}
            </p>
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--navy)] border-b-2 border-[var(--gold)] pb-0.5 hover:text-[var(--blue-accent)] hover:border-[var(--blue-accent)] transition-colors"
              type="button"
            >
              {copy.cta}
              <AppIcon name="ArrowUpRightIcon" size={14} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:auto-rows-[320px]">
          {copy.cards.map((service, index) => (
            <div
              key={service.id}
              ref={(element) => {
                cardRefs.current[index] = element
              }}
              className={`advisory-reveal-hidden advisory-delay-${Math.min((index + 1) * 100, 700)} ${service.colSpan} ${service.rowSpan} relative overflow-hidden rounded-3xl border cursor-pointer group ${
                service.dark
                  ? 'advisory-service-card-dark advisory-noise-overlay border-[rgba(255,255,255,0.06)]'
                  : 'bg-white border-[var(--border-light)] advisory-card-lift'
              } ${service.wide ? 'lg:flex lg:flex-row lg:items-center' : 'flex flex-col justify-between'}`}
              style={{ minHeight: service.rowSpan ? undefined : '280px' }}
            >
              {service.image ? (
                <div className="absolute inset-0 z-0">
                  <AppImage
                    src={service.image}
                    alt={service.imageAlt}
                    fill
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-1000"
                  />
                  <div className="advisory-service-image-scrim absolute inset-0 z-10" />
                </div>
              ) : null}

              <div className={`relative z-10 flex flex-col justify-between h-full ${service.wide ? 'p-8 lg:p-10 lg:flex-1' : 'p-8 lg:p-9'}`}>
                <div>
                  <div className="flex items-start justify-between mb-5 gap-4">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${service.dark ? 'bg-[var(--blue-accent)]/20 text-[var(--blue-light)]' : 'bg-[var(--blue-pale)] text-[var(--blue-accent)]'}`}>
                      <AppIcon name={service.icon} size={22} />
                    </div>
                    <span className={`text-[9px] font-bold uppercase tracking-[0.18em] px-2.5 py-1 rounded-full ${service.dark ? 'bg-white/10 text-white/60' : 'bg-[var(--bg-cool)] text-[var(--text-muted)]'}`}>
                      {service.tag}
                    </span>
                  </div>

                  <h3 className={`advisory-display text-xl lg:text-2xl mb-3 leading-snug ${service.dark ? 'text-white' : 'text-[var(--navy-dark)]'}`}>
                    {service.title}
                  </h3>
                  <p className={`text-sm leading-relaxed ${service.dark ? 'text-white/60' : 'text-[var(--text-secondary)]'} ${service.wide ? 'max-w-lg' : ''}`}>
                    {service.description}
                  </p>
                </div>

                <div className={`flex items-center justify-between mt-5 ${service.rowSpan ? 'flex-col items-start gap-4' : ''}`}>
                  <div className={`text-xs font-semibold px-3 py-1.5 rounded-lg ${service.dark ? 'bg-[var(--gold)]/15 text-[var(--gold-light)]' : 'bg-[var(--gold-pale)] text-[var(--navy)]'}`}>
                    {service.metric}
                  </div>
                  <div className={`flex items-center gap-1.5 text-xs font-semibold group-hover:gap-2.5 transition-all ${service.dark ? 'text-[var(--blue-light)]' : 'text-[var(--blue-accent)]'}`}>
                    {service.cta}
                    <AppIcon name="ArrowRightIcon" size={13} />
                  </div>
                </div>
              </div>

              {service.wide ? (
                <div className="hidden lg:flex lg:w-64 items-center justify-center p-8 border-l border-[var(--border-light)] flex-shrink-0">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-2xl bg-[var(--blue-pale)] flex items-center justify-center mx-auto mb-3">
                      <AppIcon name="PuzzlePieceIcon" size={32} className="text-[var(--blue-accent)]" />
                    </div>
                    <p className="text-xs text-[var(--text-muted)] font-medium leading-snug">
                      {service.sideLabel}
                      <br />
                      {service.sideLabelSecond}
                    </p>
                  </div>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}