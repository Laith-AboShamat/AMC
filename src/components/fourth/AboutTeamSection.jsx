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
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.08fr)_380px] gap-8 lg:gap-10 items-start">
            <div className="space-y-8 sm:space-y-10">
              <div className="advisory-about-intro-panel rounded-[2rem] border p-6 sm:p-8 lg:p-10 relative overflow-hidden">
                <div className="advisory-about-intro-orb advisory-blob pointer-events-none absolute -top-10 -right-10 h-32 w-32 rounded-full" />
                <span className="advisory-about-label block mb-4">{copy.label}</span>
                <h2 className="advisory-display text-4xl sm:text-5xl lg:text-[4.25rem] text-[var(--text-primary)] leading-[0.94] tracking-[-0.03em] mb-6 max-w-[11ch] sm:max-w-none relative z-10">
                  {copy.titleFirst}
                  <br />
                  <span className="advisory-about-headline-accent italic font-light">{copy.titleAccent}</span>
                </h2>

                <p className="advisory-about-core-copy text-base sm:text-lg leading-relaxed max-w-3xl relative z-10">
                  {copy.coreMessage}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                <div className="advisory-about-message-card advisory-about-message-card-vision rounded-[1.75rem] border p-5 sm:p-6 lg:p-7">
                  <div className="advisory-about-message-tag inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold mb-5">
                    <span className="w-2 h-2 rounded-full bg-[var(--gold)] inline-block flex-shrink-0" />
                    {copy.visionTitle}
                  </div>
                  <p className="text-[var(--text-secondary)] text-[15px] leading-8">
                    {copy.visionText}
                  </p>
                </div>

                <div className="advisory-about-message-card advisory-about-message-card-mission rounded-[1.75rem] border p-5 sm:p-6 lg:p-7 md:translate-y-6">
                  <div className="advisory-about-message-tag inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold mb-5">
                    <span className="w-2 h-2 rounded-full bg-[var(--blue-accent)] inline-block flex-shrink-0" />
                    {copy.missionTitle}
                  </div>
                  <p className="text-[var(--text-secondary)] text-[15px] leading-8">
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
            </div>

            <div className="lg:sticky lg:top-28">
              <div className="advisory-about-brand-card advisory-gold-sparkle-zone rounded-[2rem] p-7 sm:p-8 lg:p-10 relative overflow-hidden flex flex-col items-center justify-center text-center min-h-[500px]">
                <div className="advisory-about-brand-glow absolute inset-x-6 top-8 h-32 rounded-full blur-3xl pointer-events-none" />
                <div className="advisory-sparkle advisory-sparkle-three" aria-hidden="true" />
                <div className="advisory-sparkle advisory-sparkle-four" aria-hidden="true" />
                <div className="absolute top-4 right-4 opacity-10">
                  <AppIcon name="StarIcon" size={80} className="text-white" />
                </div>
                <div className="advisory-about-brand-chip inline-flex items-center rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] mb-8">
                  AMC
                </div>
                <AppImage
                  src="/amc1.png"
                  alt="AMC logo"
                  width={160}
                  height={160}
                  className="object-contain rounded-xl mb-10 w-28 h-28 sm:w-40 sm:h-40"
                />
                <div className="advisory-display text-2xl sm:text-3xl text-white font-semibold text-center mb-4">AMC</div>
                <div className="w-20 h-px bg-[rgba(255,255,255,0.18)] mb-6" />
                <div className="advisory-about-card-motto text-sm sm:text-lg text-center italic leading-relaxed max-w-sm">
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