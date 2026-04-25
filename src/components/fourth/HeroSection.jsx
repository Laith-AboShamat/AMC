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

  const renderLine = (segments, lineIndex) => (
    <span className="advisory-text-reveal-wrapper advisory-hero-line block" key={`line-${lineIndex}`}>
      <span className="advisory-text-reveal-content advisory-delay-200 inline-flex flex-wrap items-baseline gap-x-0.5 sm:gap-x-1">
        {segments.map((segment, segmentIndex) => (
          <span
            key={`segment-${lineIndex}-${segmentIndex}`}
            className={segment.accent === 'gold' ? 'advisory-gold-shimmer italic font-light' : ''}
          >
            {segment.text}
          </span>
        ))}
      </span>
    </span>
  )

  return (
    <section id="hero" className="relative min-h-screen flex flex-col overflow-hidden" style={{ minHeight: '100svh' }}>
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

      <div className="absolute top-[18%] right-[12%] w-56 h-56 sm:w-80 sm:h-80 lg:w-[500px] lg:h-[500px] rounded-full bg-[var(--blue-accent)] opacity-10 blur-[90px] lg:blur-[120px] advisory-blob pointer-events-none z-0" />
      <div className="absolute bottom-[22%] left-[8%] w-48 h-48 sm:w-72 sm:h-72 lg:bottom-1/3 lg:left-1/3 lg:w-[400px] lg:h-[400px] rounded-full bg-[var(--navy)] opacity-15 blur-[80px] lg:blur-[100px] advisory-blob-slow pointer-events-none z-0" />

      <div className="relative z-10 flex-1 flex flex-col max-w-7xl mx-auto px-4 sm:px-6 w-full pt-28 sm:pt-32 lg:pt-36 pb-12 sm:pb-16">
        <div className="flex flex-col lg:flex-row items-start lg:items-end gap-10 sm:gap-12 lg:gap-20 flex-1">
          <div className="lg:w-7/12 flex flex-col justify-center flex-1">
            <div
              className={`advisory-hero-intro inline-flex max-w-full items-center gap-2 sm:gap-2.5 px-3.5 sm:px-5 py-2.5 rounded-full text-[10px] sm:text-[11px] font-semibold tracking-[0.14em] sm:tracking-[0.2em] uppercase mb-6 sm:mb-8 w-fit transition-all duration-700 ${
                loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)] advisory-pulse-dot flex-shrink-0" />
              <span className="advisory-hero-intro-text">
                {copy.eyebrow.lead}
                <span className="advisory-hero-intro-accent"> {copy.eyebrow.accent} </span>
                {copy.eyebrow.tail}
              </span>
              <AppIcon name="SparklesIcon" size={12} className="text-[var(--gold-light)] advisory-spark-inline" />
            </div>

            <h1 ref={titleRef} className="advisory-display advisory-hero-title advisory-hero-heading text-[2.9rem] sm:text-6xl lg:text-7xl mb-5 sm:mb-6 leading-[1.06] sm:leading-[1.05] max-w-[11ch] sm:max-w-none">
              {copy.lines.map((line, lineIndex) => renderLine(line, lineIndex))}
            </h1>

            <p
              className={`advisory-hero-description text-base sm:text-lg font-light mb-8 sm:mb-10 max-w-xl leading-relaxed transition-all duration-700 delay-500 ${
                loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              {copy.description}
            </p>

            <div
              className={`flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto transition-all duration-700 delay-700 ${
                loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <button
                onClick={() => scrollToSection('contact')}
                className="advisory-btn-primary w-full sm:w-auto px-6 sm:px-8 py-3.5 rounded-full text-sm font-semibold flex items-center justify-center gap-2.5"
                type="button"
              >
                {copy.contactCta}
                <AppIcon name="ArrowRightIcon" size={16} />
              </button>
              <button
                onClick={() => scrollToSection('services')}
                className="advisory-hero-secondary-btn w-full sm:w-auto px-6 sm:px-8 py-3.5 rounded-full text-sm font-semibold transition-all flex items-center justify-center gap-2.5"
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
            <div className="advisory-gold-sparkle-zone grid grid-cols-2 gap-3">
              <div className="advisory-sparkle advisory-sparkle-one" aria-hidden="true" />
              <div className="advisory-sparkle advisory-sparkle-two" aria-hidden="true" />
              {copy.stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className={`advisory-hero-stat-card advisory-hero-stat-${index + 1} p-5 border rounded-2xl text-center ${
                    stat.accent === 'gold' ? 'advisory-gold-glow-card' : ''
                  }`}
                >
                  <div
                    className={`advisory-display advisory-hero-stat-value mb-1 leading-none ${
                      String(stat.value).length > 8 ? 'text-[2rem]' : 'text-3xl'
                    } ${stat.accent === 'gold' ? 'advisory-hero-stat-value-gold' : ''}`}
                  >
                    {stat.value}
                  </div>
                  <div className="advisory-hero-stat-label text-[11px] font-semibold uppercase tracking-[0.15em]">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={`advisory-scroll-cue flex items-center justify-center sm:justify-start gap-3 mt-8 transition-all duration-700 delay-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
          <div className="advisory-scroll-indicator w-6 h-10 rounded-full border flex items-start justify-center pt-2">
            <div className="w-1 h-2 rounded-full animate-bounce advisory-scroll-dot" />
          </div>
          <span className="advisory-scroll-label text-xs uppercase tracking-[0.12em] font-semibold">{copy.scrollLabel}</span>
        </div>
      </div>
    </section>
  )
}