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
          <div className="space-y-8 sm:space-y-10">
            <div className="advisory-about-intro-panel rounded-[2rem] border p-6 sm:p-8 lg:p-10 relative overflow-hidden">
              <div className="advisory-about-intro-aura pointer-events-none absolute inset-y-0 right-0 w-[38%]" />
                <div className="advisory-about-intro-orb advisory-blob pointer-events-none absolute -top-10 -right-10 h-32 w-32 rounded-full" />
              <span className="advisory-about-label block mb-4 relative z-10">{copy.label}</span>
              <h2 className="advisory-display text-4xl sm:text-5xl lg:text-[4.4rem] text-[var(--text-primary)] leading-[0.92] tracking-[-0.035em] mb-6 sm:mb-7 max-w-none relative z-10 advisory-about-intro-title">
                {copy.titleFirst}
                <br />
                <span className="advisory-about-headline-accent italic font-light">{copy.titleAccent}</span>
              </h2>

              <p className="advisory-about-core-copy text-base sm:text-lg leading-relaxed max-w-4xl relative z-10">
                {copy.coreMessage}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 items-stretch">
              <div className="advisory-about-message-card advisory-about-message-card-vision rounded-[1.75rem] border p-6 sm:p-7 lg:p-8 min-h-[320px] lg:min-h-[360px]">
                <div className="advisory-about-message-tag inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold mb-5">
                  <span className="advisory-about-tag-dot advisory-about-tag-dot-gold w-2.5 h-2.5 rounded-full inline-block flex-shrink-0" />
                    {copy.visionTitle}
                </div>
                <p className="text-[var(--text-secondary)] text-[15px] sm:text-base leading-8 sm:leading-9 max-w-[34rem]">
                  {copy.visionText}
                </p>
              </div>

              <div className="advisory-about-message-card advisory-about-message-card-mission rounded-[1.75rem] border p-6 sm:p-7 lg:p-8 min-h-[320px] lg:min-h-[360px]">
                <div className="advisory-about-message-tag inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold mb-5">
                  <span className="advisory-about-tag-dot advisory-about-tag-dot-gold w-2.5 h-2.5 rounded-full inline-block flex-shrink-0" />
                    {copy.missionTitle}
                </div>
                <p className="text-[var(--text-secondary)] text-[15px] sm:text-base leading-8 sm:leading-9 max-w-[34rem]">
                  {copy.missionText}
                </p>
              </div>
            </div>

            <div>
              <div className="advisory-about-approach-label inline-flex items-center rounded-full px-4 py-2 text-xs sm:text-sm font-bold uppercase tracking-[0.18em] mb-4 sm:mb-5">
                {copy.approachLabel}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {copy.values.map((value) => (
                  <div key={value.title} className="advisory-about-value-card rounded-[1.5rem] border p-5 sm:p-6 flex flex-col gap-4 min-h-[220px]">
                    <div className="w-11 h-11 rounded-xl bg-[var(--blue-pale)] flex items-center justify-center flex-shrink-0">
                      <AppIcon name={value.icon} size={20} className="text-[var(--blue-accent)]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[var(--text-primary)] text-base sm:text-lg mb-2">{value.title}</h3>
                      <p className="text-[var(--text-secondary)] text-sm sm:text-[15px] leading-7">{value.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="advisory-about-brand-card advisory-gold-sparkle-zone rounded-[2rem] p-7 sm:p-8 lg:p-10 relative overflow-hidden grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-8 lg:gap-10 items-center min-h-[260px]">
              <div className="advisory-about-brand-glow absolute inset-x-8 top-8 h-36 rounded-full blur-3xl pointer-events-none" />
              <div className="advisory-sparkle advisory-sparkle-three" aria-hidden="true" />
              <div className="advisory-sparkle advisory-sparkle-four" aria-hidden="true" />
              <div className="flex flex-col items-center lg:items-start justify-center relative z-10">
                <div className="advisory-about-brand-chip inline-flex items-center rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] mb-6">
                  AMC
                </div>
                <AppImage
                  src="/amc1.png"
                  alt="AMC logo"
                  width={160}
                  height={160}
                  className="object-contain rounded-xl w-28 h-28 sm:w-36 sm:h-36 lg:w-40 lg:h-40"
                />
              </div>
              <div className="relative z-10 text-center lg:text-left">
                <div className="advisory-display text-3xl sm:text-4xl text-white font-semibold mb-4">AMC</div>
                <div className="w-24 h-px bg-[rgba(255,255,255,0.18)] mb-6 mx-auto lg:mx-0" />
                <div className="advisory-about-card-motto text-base sm:text-xl lg:text-[1.45rem] text-center lg:text-left italic leading-relaxed max-w-3xl">
                  {copy.motto}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}