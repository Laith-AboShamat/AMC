import { useEffect, useRef } from 'react'
import { AppIcon } from './AppIcon.jsx'
import { AppImage } from './AppImage.jsx'
import { getAdvisoryCopy } from './copy.js'

export function FourthTestimonialsSection({ locale = 'en' }) {
  const revealRefs = useRef([])
  const copy = getAdvisoryCopy(locale).testimonials

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
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    )

    revealRefs.current.forEach((element) => {
      if (element) {
        observer.observe(element)
      }
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section id="results" className="py-20 lg:py-28 bg-[var(--bg-cool)]">
      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        <div className="advisory-reveal-hidden mb-14 text-center" ref={(element) => { revealRefs.current[0] = element }}>
          <span className="advisory-section-label block mb-3">{copy.label}</span>
          <h2 className="advisory-display text-4xl sm:text-5xl text-[var(--navy-dark)] leading-tight max-w-2xl mx-auto">
            {copy.titleFirst}
            <br />
            <span className="italic font-light text-[var(--text-secondary)]">{copy.titleAccent}</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {copy.items.map((testimonial, index) => (
            <div
              key={testimonial.name}
              ref={(element) => { revealRefs.current[index + 1] = element }}
              className={`advisory-reveal-hidden advisory-delay-${index * 100} advisory-testimonial-card bg-[var(--bg-white)] rounded-3xl border border-[var(--border-light)] overflow-hidden flex flex-col`}
            >
              <div className="px-7 pt-7 pb-0">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--blue-pale)] text-[var(--blue-accent)] text-xs font-bold mb-5">
                  <AppIcon name="CheckCircleIcon" size={14} />
                  {testimonial.result}
                </div>
              </div>

              <div className="px-7 pb-7 flex-1 flex flex-col justify-between">
                <div className="relative mb-6">
                  <div className="advisory-display text-4xl text-[var(--gold)] leading-none mb-2 select-none">“</div>
                  <p className="text-[var(--navy-dark)] text-base leading-relaxed font-medium">{testimonial.quote}</p>
                </div>

                <div className="flex items-center gap-3 pt-5 border-t border-[var(--border-light)]">
                  <div className="w-11 h-11 rounded-full overflow-hidden flex-shrink-0">
                    <AppImage src={testimonial.image} alt={testimonial.alt} className="object-cover w-full h-full" width={44} height={44} />
                  </div>
                  <div>
                    <div className="font-semibold text-[var(--navy-dark)] text-sm">{testimonial.name}</div>
                    <div className="text-[var(--text-muted)] text-xs">{testimonial.title}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="advisory-reveal-hidden mt-14 flex flex-wrap items-center justify-center gap-8" ref={(element) => { revealRefs.current[4] = element }}>
          <span className="text-[var(--text-muted)] text-xs font-semibold uppercase tracking-widest">{copy.trustLabel}</span>
          {copy.companies.map((company) => (
            <span key={company} className="text-sm font-semibold text-[var(--navy)] opacity-40 hover:opacity-70 transition-opacity cursor-default">
              {company}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}