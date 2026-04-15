import { useEffect, useRef } from 'react'
import { AppImage } from './AppImage.jsx'
import { AppIcon } from './AppIcon.jsx'
import { getAdvisoryCopy } from './copy.js'

export function FourthAboutTeamSection({ locale = 'en' }) {
  const revealRefs = useRef([])
  const copy = getAdvisoryCopy(locale).about

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
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' },
    )

    revealRefs.current.forEach((element) => {
      if (element) {
        observer.observe(element)
      }
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" className="py-20 lg:py-28 bg-[var(--bg-white)]">
      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        <div className="advisory-reveal-hidden mb-20" ref={(element) => { revealRefs.current[0] = element }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div>
              <span className="advisory-section-label block mb-3">{copy.label}</span>
              <h2 className="advisory-display text-4xl sm:text-5xl text-[var(--navy-dark)] leading-tight mb-6">
                {copy.titleFirst}
                <br />
                <span className="italic font-light text-[var(--text-secondary)]">{copy.titleAccent}</span>
              </h2>

              <div className="mb-6">
                <h3 className="advisory-display text-xl font-semibold text-[var(--navy-dark)] mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[var(--gold)] inline-block flex-shrink-0" />
                  {copy.visionTitle}
                </h3>
                <p className="text-[var(--text-secondary)] text-base leading-relaxed">
                  {copy.visionText}
                </p>
              </div>

              <div className="mb-8">
                <h3 className="advisory-display text-xl font-semibold text-[var(--navy-dark)] mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[var(--blue-accent)] inline-block flex-shrink-0" />
                  {copy.missionTitle}
                </h3>
                <p className="text-[var(--text-secondary)] text-base leading-relaxed">
                  {copy.missionText}
                </p>
              </div>

              <div className="space-y-5">
                {copy.values.map((value) => (
                  <div key={value.title} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[var(--blue-pale)] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <AppIcon name={value.icon} size={20} className="text-[var(--blue-accent)]" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[var(--navy-dark)] text-sm mb-1">{value.title}</h4>
                      <p className="text-[var(--text-muted)] text-sm leading-relaxed">{value.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-5 lg:pt-6">
              <div className="rounded-3xl p-8 relative overflow-hidden flex flex-col items-center justify-center" style={{ background: 'linear-gradient(135deg, #0D1B2A 0%, #1B3A6B 100%)' }}>
                <div className="absolute top-4 right-4 opacity-10">
                  <AppIcon name="StarIcon" size={80} className="text-white" />
                </div>
                <AppImage
                  src="/amc1.png"
                  alt="AMC logo"
                  width={160}
                  height={160}
                  className="object-contain rounded-xl mb-6 w-40 h-40"
                />
                <div className="advisory-display text-2xl text-white font-semibold text-center mb-2">AMC</div>
                <div className="text-[var(--gold-light)] text-sm text-center italic leading-relaxed max-w-xs">
                  {copy.motto}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {copy.stats.map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-[var(--border-light)] bg-[var(--bg-cool)] p-4 text-center">
                    <div className="advisory-display text-2xl font-semibold text-[var(--navy)] mb-1">{stat.value}</div>
                    <div className="text-xs text-[var(--text-muted)] font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}