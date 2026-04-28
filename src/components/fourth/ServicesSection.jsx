import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { AppIcon } from './AppIcon.jsx'
import { AppImage } from './AppImage.jsx'
import { getAdvisoryCopy } from './copy.js'

export function FourthServicesSection({ locale = 'en' }) {
  const sectionRef = useRef(null)
  const cardRefs = useRef([])
  const differentiatorRef = useRef(null)
  const [activeService, setActiveService] = useState(null)
  const [headerVisible, setHeaderVisible] = useState(false)
  const [visibleCards, setVisibleCards] = useState({})
  const [differentiatorVisible, setDifferentiatorVisible] = useState(false)
  const copy = getAdvisoryCopy(locale).services
  const isRtl = locale === 'ar'

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target.dataset.revealType === 'header') {
              setHeaderVisible(true)
            }

            if (entry.target.dataset.revealType === 'card') {
              const cardId = entry.target.dataset.cardId
              if (cardId) {
                setVisibleCards((current) => ({
                  ...current,
                  [cardId]: true,
                }))
              }
            }

            if (entry.target.dataset.revealType === 'differentiator') {
              setDifferentiatorVisible(true)
            }

            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' },
    )

    const headerElement = sectionRef.current?.querySelector('.section-header')
    if (headerElement) {
      headerElement.dataset.revealType = 'header'
      observer.observe(headerElement)
    }

    cardRefs.current.forEach((element, index) => {
      if (element) {
        element.dataset.revealType = 'card'
        element.dataset.cardId = copy.cards[index]?.id ?? ''
        observer.observe(element)
      }
    })

    if (differentiatorRef.current) {
      differentiatorRef.current.dataset.revealType = 'differentiator'
      observer.observe(differentiatorRef.current)
    }

    return () => observer.disconnect()
  }, [copy.cards])

  useEffect(() => {
    if (!activeService) {
      return undefined
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setActiveService(null)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [activeService])

  const openService = (service) => {
    setActiveService(service)
  }

  const closeService = () => {
    setActiveService(null)
  }

  const handleCardKeyDown = (event, service) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      openService(service)
    }
  }

  return (
    <>
      <section id="services" ref={sectionRef} className="py-20 lg:py-28 bg-[var(--bg-cool)]">
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
        <div className={`section-header advisory-reveal-hidden ${headerVisible ? 'is-visible' : ''} mb-12 sm:mb-14 border-b border-[var(--border-light)] pb-8 sm:pb-10`}>
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
            (() => {
              const isDarkVariant = true

              return (
            <div
              key={service.id}
              ref={(element) => {
                cardRefs.current[index] = element
              }}
              role="button"
              tabIndex={0}
              onClick={() => openService(service)}
              onKeyDown={(event) => handleCardKeyDown(event, service)}
              aria-label={`${copy.openDetailsLabel} ${service.title}`}
              className={`advisory-reveal-hidden ${visibleCards[service.id] ? 'is-visible' : ''} advisory-delay-${Math.min((index + 1) * 100, 700)} ${service.colSpan} ${service.rowSpan} relative overflow-hidden rounded-3xl border cursor-pointer group ${
                isDarkVariant
                  ? 'advisory-service-card-dark advisory-noise-overlay border-[rgba(255,255,255,0.06)]'
                  : 'bg-[var(--bg-white)] border-[var(--border-light)] advisory-card-lift'
              } ${service.wide ? 'lg:flex lg:flex-row lg:items-center' : 'flex flex-col justify-between'} min-h-[300px] sm:min-h-[340px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-cool)]`}
            >
              {service.image ? (
                <div className="absolute inset-0 z-0">
                  <AppImage
                    src={service.image}
                    alt={service.imageAlt}
                    fill
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-1000"
                  />
                  <div className={`advisory-service-image-scrim absolute inset-0 z-10 ${isDarkVariant ? 'advisory-service-image-scrim-dark' : 'advisory-service-image-scrim-light'}`} />
                </div>
              ) : null}

              <div className={`relative z-10 flex flex-col justify-between h-full ${service.wide ? 'p-6 sm:p-8 lg:p-10 lg:flex-1' : 'p-6 sm:p-8 lg:p-9'}`}>
                <div>
                  <div className="flex items-start justify-between mb-5 gap-4">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${isDarkVariant ? 'bg-[var(--blue-accent)]/20 text-[var(--blue-light)]' : 'bg-[var(--blue-pale)] text-[var(--blue-accent)]'}`}>
                      <AppIcon name={service.icon} size={22} />
                    </div>
                    <span className={`text-[9px] font-bold uppercase tracking-[0.18em] px-2.5 py-1 rounded-full ${isDarkVariant ? 'advisory-service-dark-tag' : 'bg-[var(--bg-cool)] text-[var(--text-muted)]'}`}>
                      {service.tag}
                    </span>
                  </div>

                  <h3 className={`advisory-display text-xl lg:text-2xl mb-3 leading-snug ${isDarkVariant ? 'advisory-service-dark-title' : 'text-[var(--navy-dark)]'}`}>
                    {service.title}
                  </h3>
                </div>

                <div className={`flex flex-col sm:flex-row sm:items-center justify-between mt-5 gap-3 ${service.rowSpan ? 'items-start gap-4' : ''}`}>
                  <div className={`text-xs font-semibold px-3 py-1.5 rounded-lg ${isDarkVariant ? 'advisory-service-dark-metric' : 'bg-[var(--gold-pale)] text-[var(--navy)]'}`}>
                    {service.metric}
                  </div>
                  <div className={`flex items-center gap-1.5 text-xs font-semibold group-hover:gap-2.5 transition-all ${isDarkVariant ? 'advisory-service-dark-cta' : 'text-[var(--blue-accent)]'}`}>
                    {copy.openDetailsLabel}
                    <AppIcon name="ArrowRightIcon" size={13} />
                  </div>
                </div>
              </div>

            </div>
              )
            })()
          ))}
        </div>

        <div ref={differentiatorRef} className={`advisory-reveal-hidden ${differentiatorVisible ? 'is-visible' : ''} advisory-delay-500 mt-10 sm:mt-12 text-center max-w-5xl mx-auto`}>
          <span className="advisory-section-label block mb-3">{copy.differentiator.label}</span>
          <h3 className="advisory-display text-3xl sm:text-4xl lg:text-[3.2rem] text-[var(--navy-dark)] leading-[1.02] mb-4 sm:mb-5">
            {copy.differentiator.title}
          </h3>
          <p className="text-[var(--text-secondary)] text-sm sm:text-base lg:text-[1.05rem] leading-relaxed max-w-4xl mx-auto">
            {copy.differentiator.description}
          </p>
        </div>
        </div>
      </section>

      <AnimatePresence>
        {activeService ? (
          (() => {
            const isDarkVariant = true

            return (
          <motion.div
            className="advisory-service-modal fixed inset-0 z-[120] flex items-end justify-center p-3 sm:p-6 lg:items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.button
              type="button"
              className="absolute inset-0 advisory-service-modal-backdrop"
              onClick={closeService}
              aria-label={copy.closeDetailsLabel}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby={`service-dialog-title-${activeService.id}`}
              className={`advisory-service-modal-panel relative w-full max-w-5xl overflow-hidden rounded-[2rem] border ${isDarkVariant ? 'advisory-service-modal-panel-dark' : 'advisory-service-modal-panel-light'} ${isRtl ? 'text-right' : 'text-left'}`}
              initial={{ opacity: 0, y: 28, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.98 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="absolute inset-x-0 top-0 h-1 advisory-service-modal-beam" />
              <div className="advisory-service-modal-orb advisory-service-modal-orb-one" />
              <div className="advisory-service-modal-orb advisory-service-modal-orb-two" />

              <button
                type="button"
                onClick={closeService}
                className={`absolute ${isRtl ? 'left-4 sm:left-5' : 'right-4 sm:right-5'} top-4 sm:top-5 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full border advisory-service-modal-close`}
                aria-label={copy.closeDetailsLabel}
              >
                <AppIcon name="XMarkIcon" size={18} />
              </button>

              <div className="advisory-service-modal-layout grid grid-cols-1 lg:grid-cols-[minmax(0,0.92fr)_minmax(360px,0.78fr)]">
                <div className="advisory-service-modal-media relative min-h-[280px] sm:min-h-[360px] lg:min-h-[100%] overflow-hidden">
                  {activeService.image ? (
                    <>
                      <AppImage
                        src={activeService.image}
                        alt={activeService.imageAlt}
                        fill
                        className="h-full w-full object-cover advisory-service-modal-image"
                      />
                      <div className={`absolute inset-0 advisory-service-modal-image-scrim ${isDarkVariant ? 'advisory-service-modal-image-scrim-dark' : 'advisory-service-modal-image-scrim-light'}`} />
                    </>
                  ) : (
                    <div className="absolute inset-0 advisory-service-modal-image-fallback" />
                  )}

                  <div className={`relative z-10 flex h-full flex-col justify-end p-6 sm:p-8 lg:p-10 ${isRtl ? 'items-end' : 'items-start'}`}>
                    <div className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl ${isDarkVariant ? 'bg-[rgba(122,164,255,0.16)] text-[var(--blue-light)]' : 'bg-[rgba(255,244,202,0.96)] text-[var(--gold)]'} shadow-[0_18px_40px_rgba(7,16,32,0.18)]`}>
                      <AppIcon name={activeService.icon} size={26} />
                    </div>
                    <div className={`mt-5 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] ${isDarkVariant ? 'border-white/10 bg-[rgba(10,19,33,0.48)] text-white/70' : 'border-[rgba(27,58,107,0.08)] bg-[rgba(255,255,255,0.74)] text-[var(--text-muted)]'}`}>
                      {activeService.tag}
                    </div>
                    <h3 id={`service-dialog-title-${activeService.id}`} className="advisory-display mt-5 max-w-[12ch] text-3xl sm:text-4xl leading-[1.02] text-white drop-shadow-[0_12px_32px_rgba(7,16,32,0.34)]">
                      {activeService.title}
                    </h3>
                  </div>
                </div>

                <div className="advisory-service-modal-content relative z-10 p-6 sm:p-8 lg:p-10">
                  <div className={`flex items-start justify-between gap-4 ${isRtl ? 'flex-row-reverse' : ''}`}>
                    <div className={`${isRtl ? 'text-right' : 'text-left'}`}>
                      <span className="advisory-section-label block mb-3">{copy.modalEyebrow}</span>
                      <div className={`inline-flex items-center rounded-full px-3 py-1.5 text-xs font-semibold ${isDarkVariant ? 'advisory-service-dark-metric' : 'bg-[var(--gold-pale)] text-[var(--navy)]'}`}>
                        {activeService.metric}
                      </div>
                    </div>
                  </div>

                  <p className="mt-6 text-[15px] sm:text-base leading-8 text-[var(--text-secondary)] advisory-service-modal-body">
                    {activeService.description}
                  </p>

                  <div className={`mt-8 rounded-[1.5rem] border p-5 sm:p-6 ${isDarkVariant ? 'advisory-service-modal-note-dark' : 'advisory-service-modal-note-light'}`}>
                    <div className={`flex items-start gap-3 ${isRtl ? 'flex-row-reverse text-right' : ''}`}>
                      <div className="mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--blue-pale)] text-[var(--blue-accent)] flex-shrink-0">
                        <AppIcon name="SparklesIcon" size={18} />
                      </div>
                      <div>
                        <div className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--text-muted)]">{copy.modalValueLabel}</div>
                        <div className="mt-2 text-sm leading-7 text-[var(--navy-dark)] advisory-service-modal-note-text">{activeService.metric}</div>
                      </div>
                    </div>
                  </div>

                  <div className={`mt-8 flex flex-col gap-3 sm:flex-row ${isRtl ? 'sm:flex-row-reverse' : ''}`}>
                    <button
                      type="button"
                      onClick={() => {
                        closeService()
                        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                      }}
                      className="advisory-btn-primary px-6 py-3.5 rounded-full text-sm font-semibold inline-flex items-center justify-center gap-2.5"
                    >
                      {copy.cta}
                      <AppIcon name="ArrowRightIcon" size={16} className={isRtl ? 'rotate-180' : ''} />
                    </button>
                    <button
                      type="button"
                      onClick={closeService}
                      className="advisory-btn-outline px-6 py-3.5 rounded-full text-sm font-semibold inline-flex items-center justify-center gap-2.5"
                    >
                      {copy.closeDetailsLabel}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
            )
          })()
        ) : null}
      </AnimatePresence>
    </>
  )
}