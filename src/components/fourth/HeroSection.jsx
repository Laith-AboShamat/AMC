import { useEffect, useRef, useState } from 'react'
import { AppIcon } from './AppIcon.jsx'
import { AppImage } from './AppImage.jsx'
import { getAdvisoryCopy } from './copy.js'

export function FourthHeroSection({ locale = 'en' }) {
  const bgRef = useRef(null)
  const titleRef = useRef(null)
  const [loaded, setLoaded] = useState(false)
  const copy = getAdvisoryCopy(locale).hero

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setLoaded(true)
      titleRef.current?.classList.add('reveal-active')
    }, 200)

    const handleScroll = () => {
      if (bgRef.current) {
        bgRef.current.style.transform = `translateY(${window.scrollY * 0.2}px)`
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.clearTimeout(timer)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section id="hero" className="relative min-h-screen flex flex-col overflow-hidden" style={{ minHeight: '100vh' }}>
      <div className="absolute inset-0 z-0 overflow-hidden" ref={bgRef}>
        <AppImage
          src="/background.jpg"
          fallbackSrc="/advisory-hero.svg"
          alt="Modern business tower geometry representing institutional precision"
          fill
          className="h-full w-full object-cover object-center scale-[1.02]"
        />
        <div className="absolute inset-0 advisory-hero-photo" />
        <div className="absolute inset-y-0 right-[10%] hidden lg:block w-[34rem] advisory-hero-frame" />
        <div className="absolute inset-0 advisory-hero-overlay" />
        <div className="absolute inset-0 advisory-hero-mask" />
      </div>

      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-[var(--blue-accent)] opacity-10 blur-[120px] advisory-blob pointer-events-none z-0" />
      <div className="absolute bottom-1/3 left-1/3 w-[400px] h-[400px] rounded-full bg-[var(--navy)] opacity-15 blur-[100px] advisory-blob-slow pointer-events-none z-0" />

      <div className="relative z-10 flex-1 flex flex-col max-w-7xl mx-auto px-5 sm:px-6 w-full pt-36 pb-16">
        <div className="flex flex-col lg:flex-row items-end gap-12 lg:gap-20 flex-1">
          <div className="lg:w-7/12 flex flex-col justify-center flex-1">
            <div
              className={`inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[rgba(13,27,42,0.7)] backdrop-blur-md border border-[rgba(200,169,110,0.35)] text-white text-[10px] font-semibold tracking-[0.18em] uppercase mb-8 w-fit transition-all duration-700 ${
                loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)] animate-pulse flex-shrink-0" />
              {copy.eyebrow}
            </div>

            <h1 ref={titleRef} className="advisory-display text-5xl sm:text-6xl lg:text-7xl text-white mb-6 leading-[1.0]">
              <span className="advisory-text-reveal-wrapper block">
                <span className="advisory-text-reveal-content advisory-delay-200">{copy.lines[0]}</span>
              </span>
              <span className="advisory-text-reveal-wrapper block">
                <span className="advisory-text-reveal-content advisory-delay-300 italic font-light text-[var(--gold-light)]">
                  {copy.lines[1]}
                </span>
              </span>
              <span className="advisory-text-reveal-wrapper block">
                <span className="advisory-text-reveal-content advisory-delay-400">{copy.lines[2]}</span>
              </span>
            </h1>

            <p
              className={`text-white/80 text-lg font-light mb-10 max-w-xl leading-relaxed transition-all duration-700 delay-500 ${
                loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              {copy.description}
            </p>

            <div
              className={`flex flex-wrap items-center gap-4 transition-all duration-700 delay-700 ${
                loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <button
                onClick={() => scrollToSection('contact')}
                className="advisory-btn-primary px-8 py-3.5 rounded-full text-sm font-semibold flex items-center gap-2.5"
                type="button"
              >
                {copy.contactCta}
                <AppIcon name="ArrowRightIcon" size={16} />
              </button>
              <button
                onClick={() => scrollToSection('services')}
                className="px-8 py-3.5 rounded-full text-sm font-semibold text-white border border-white/30 hover:bg-white/10 transition-all flex items-center gap-2.5"
                type="button"
              >
                <AppIcon name="PlayIcon" size={14} />
                {copy.servicesCta}
              </button>
            </div>
          </div>

          <div
            className={`hidden lg:block lg:w-5/12 transition-all duration-700 delay-500 ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="grid grid-cols-2 gap-3">
              {copy.stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className={`p-5 backdrop-blur-xl border rounded-2xl ${
                    index === 0
                      ? 'bg-[var(--blue-accent)]/90 border-[var(--blue-accent)] text-white rounded-tl-3xl'
                      : index === 1
                        ? 'bg-white/90 border-white/30 text-[var(--navy-dark)] rounded-tr-3xl'
                        : index === 2
                          ? 'bg-[rgba(13,27,42,0.7)] border-white/10 text-white rounded-bl-3xl'
                          : 'bg-[rgba(200,169,110,0.85)] border-[var(--gold)] text-[var(--navy-dark)] rounded-br-3xl'
                  }`}
                >
                  <div className="advisory-display text-3xl font-semibold mb-1 leading-none">{stat.value}</div>
                  <div className={`text-[10px] font-semibold uppercase tracking-[0.15em] ${index === 0 || index === 2 ? 'text-white/70' : 'text-[var(--navy)]/70'}`}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={`flex items-center gap-3 mt-8 transition-all duration-700 delay-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
          <div className="w-6 h-10 rounded-full border border-white/30 flex items-start justify-center pt-2">
            <div className="w-1 h-2 bg-white/60 rounded-full animate-bounce" />
          </div>
          <span className="text-white/50 text-xs uppercase tracking-[0.15em] font-medium">{copy.scrollLabel}</span>
        </div>
      </div>
    </section>
  )
}