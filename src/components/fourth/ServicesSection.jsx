import { useEffect, useRef } from 'react'
import { AppIcon } from './AppIcon.jsx'
import { AppImage } from './AppImage.jsx'
import { getAdvisoryCopy } from './copy.js'

export function FourthServicesSection({ locale = 'en' }) {
  const sectionRef = useRef(null)
  const cardRefs = useRef([])
  const differentiatorRef = useRef(null)
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

    if (differentiatorRef.current) {
      observer.observe(differentiatorRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="services" ref={sectionRef} className="py-20 lg:py-28 bg-[var(--bg-cool)]">
      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        <div className="section-header advisory-reveal-hidden mb-12 sm:mb-14 border-b border-[var(--border-light)] pb-8 sm:pb-10">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,380px)] gap-8 lg:gap-12 items-start">
          <div className="max-w-2xl">
            <span className="advisory-section-label block mb-3">{copy.label}</span>
            <h2 className="advisory-display text-5xl sm:text-6xl text-[var(--navy-dark)] leading-[0.98] tracking-[-0.02em] max-w-[11ch] sm:max-w-none">
              {copy.titleFirst}
              <br />
              <span className="advisory-gold-shimmer italic font-light">{copy.titleAccent}</span>
            </h2>
          </div>

          <div className="w-full max-w-none lg:max-w-[380px] lg:justify-self-end rounded-[1.75rem] border border-[var(--border-light)] bg-[rgba(255,255,255,0.03)] px-5 py-5 sm:px-6 sm:py-6 advisory-card-lift">
            <p className="text-[var(--text-secondary)] text-sm sm:text-[15px] leading-7 max-w-none text-left">
              {copy.intro}
            </p>
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--navy)] border-b-2 border-[var(--gold)] pb-0.5 hover:text-[var(--blue-accent)] hover:border-[var(--blue-accent)] transition-colors"
              type="button"
            >
              {copy.cta}
              <AppIcon name="ArrowUpRightIcon" size={14} />
            </button>
          </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5 lg:auto-rows-[minmax(360px,auto)]">
          {copy.cards.map((service, index) => (
            <div
              key={service.id}
              ref={(element) => {
                cardRefs.current[index] = element
              }}
              className={`advisory-reveal-hidden advisory-delay-${Math.min((index + 1) * 100, 700)} ${service.colSpan} ${service.rowSpan} relative overflow-hidden rounded-3xl border cursor-pointer group ${
                service.dark
                  ? 'advisory-service-card-dark advisory-noise-overlay border-[rgba(255,255,255,0.06)]'
                  : 'bg-[var(--bg-white)] border-[var(--border-light)] advisory-card-lift'
              } ${service.wide ? 'lg:flex lg:flex-row lg:items-center' : 'flex flex-col justify-between'} min-h-[300px] sm:min-h-[340px]`}
            >
              {service.image ? (
                <div className="absolute inset-0 z-0">
                  <AppImage
                    src={service.image}
                    alt={service.imageAlt}
                    fill
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-1000"
                  />
                  <div className={`advisory-service-image-scrim absolute inset-0 z-10 ${service.dark ? 'advisory-service-image-scrim-dark' : 'advisory-service-image-scrim-light'}`} />
                </div>
              ) : null}

              <div className={`relative z-10 flex flex-col justify-between h-full ${service.wide ? 'p-6 sm:p-8 lg:p-10 lg:flex-1' : 'p-6 sm:p-8 lg:p-9'}`}>
                <div>
                  <div className="flex items-start justify-between mb-5 gap-4">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${service.dark ? 'bg-[var(--blue-accent)]/20 text-[var(--blue-light)]' : 'bg-[var(--blue-pale)] text-[var(--blue-accent)]'}`}>
                      <AppIcon name={service.icon} size={22} />
                    </div>
                    <span className={`text-[9px] font-bold uppercase tracking-[0.18em] px-2.5 py-1 rounded-full ${service.dark ? 'advisory-service-dark-tag' : 'bg-[var(--bg-cool)] text-[var(--text-muted)]'}`}>
                      {service.tag}
                    </span>
                  </div>

                  <h3 className={`advisory-display text-xl lg:text-2xl mb-3 leading-snug ${service.dark ? 'advisory-service-dark-title' : 'text-[var(--navy-dark)]'}`}>
                    {service.title}
                  </h3>
                  <p className={`text-[13px] sm:text-sm leading-relaxed ${service.dark ? 'advisory-service-dark-body' : 'text-[var(--text-secondary)]'} ${service.wide ? 'max-w-lg' : ''}`}>
                    {service.description}
                  </p>
                </div>

                <div className={`flex flex-col sm:flex-row sm:items-center justify-between mt-5 gap-3 ${service.rowSpan ? 'items-start gap-4' : ''}`}>
                  <div className={`text-xs font-semibold px-3 py-1.5 rounded-lg ${service.dark ? 'advisory-service-dark-metric' : 'bg-[var(--gold-pale)] text-[var(--navy)]'}`}>
                    {service.metric}
                  </div>
                  <div className={`flex items-center gap-1.5 text-xs font-semibold group-hover:gap-2.5 transition-all ${service.dark ? 'advisory-service-dark-cta' : 'text-[var(--blue-accent)]'}`}>
                    {service.cta}
                    <AppIcon name="ArrowRightIcon" size={13} />
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

        <div ref={differentiatorRef} className="advisory-reveal-hidden advisory-delay-500 mt-8 sm:mt-10 rounded-[2rem] border border-[var(--border-light)] bg-[var(--bg-white)] p-6 sm:p-8 lg:p-10 advisory-card-lift">
          <div className="grid grid-cols-1 lg:grid-cols-[auto,1fr] gap-5 sm:gap-6 items-start">
            <div className="w-14 h-14 rounded-2xl bg-[var(--gold-pale)] text-[var(--gold)] flex items-center justify-center flex-shrink-0">
              <AppIcon name="PuzzlePieceIcon" size={28} />
            </div>
            <div>
              <span className="advisory-section-label block mb-3">{copy.differentiator.label}</span>
              <h3 className="advisory-display text-2xl sm:text-3xl text-[var(--navy-dark)] leading-tight mb-4">
                {copy.differentiator.title}
              </h3>
              <p className="text-[var(--text-secondary)] text-sm sm:text-base leading-relaxed mb-4 max-w-4xl">
                {copy.differentiator.description}
              </p>
              <div className="inline-flex items-center gap-2 rounded-full bg-[var(--bg-cool)] border border-[var(--border-light)] px-4 py-2 text-xs sm:text-sm font-semibold text-[var(--navy)]">
                <AppIcon name="SparklesIcon" size={14} className="text-[var(--gold)]" />
                {copy.differentiator.note}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}