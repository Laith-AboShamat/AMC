import { motion } from 'framer-motion'
import { ArrowRight, Play } from 'lucide-react'
import { AppImage } from '../fourth/AppImage.jsx'
import { getAdvisoryCopy } from '../fourth/copy.js'
import { FifthHeroBeams } from '../fifth/FifthHeroBeams.jsx'

const MotionDiv = motion.div
const MotionH1 = motion.h1
const MotionP = motion.p

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] },
  },
}

export function SixthHeroSection({ locale = 'en' }) {
  const copy = getAdvisoryCopy(locale).hero

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (!element) {
      return
    }

    const top = element.getBoundingClientRect().top + window.scrollY - 104
    window.scrollTo({ top, behavior: 'smooth' })
  }

  return (
    <section id="hero" className="relative overflow-hidden bg-[linear-gradient(180deg,#02102d_0%,#081a42_100%)] text-white">
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <FifthHeroBeams className="[mask-image:linear-gradient(180deg,transparent_0%,rgba(0,0,0,0.75)_18%,rgba(0,0,0,1)_100%)]" />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(125,177,255,0.14),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.08),transparent_28%)]" />

      <div className="relative z-10 mx-auto max-w-[1380px] px-4 pb-12 pt-12 sm:px-6 lg:px-10 lg:pb-14 lg:pt-16">
        <div className="grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <MotionDiv variants={container} initial="hidden" animate="visible" className="max-w-3xl">
            <MotionDiv variants={item} className="inline-flex w-fit items-center gap-2 rounded-full border border-white/12 bg-white/8 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-white/84 backdrop-blur-md">
              <span className="inline-flex h-2 w-2 rounded-full bg-[#7db1ff]" />
              {copy.eyebrow.lead} {copy.eyebrow.accent} {copy.eyebrow.tail}
            </MotionDiv>

            <MotionH1 variants={item} className="mt-6 max-w-[12ch] text-[3.2rem] font-extrabold leading-[0.92] tracking-[-0.05em] sm:text-[4.6rem] lg:text-[5.4rem]">
              {copy.lines.map((line, lineIndex) => (
                <span key={`line-${lineIndex}`} className="block">
                  {line.map((segment, segmentIndex) => (
                    <span
                      key={`segment-${lineIndex}-${segmentIndex}`}
                      className={segment.accent === 'gold' ? 'text-[#8eb7ff]' : 'text-white'}
                    >
                      {segment.text}
                    </span>
                  ))}
                </span>
              ))}
            </MotionH1>

            <MotionP variants={item} className="mt-6 max-w-2xl text-base leading-8 text-white/76 sm:text-lg">
              {copy.description}
            </MotionP>

            <MotionDiv variants={item} className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => scrollToSection('contact')}
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#081a42] transition hover:bg-white/92"
              >
                {copy.contactCta}
                <ArrowRight size={16} />
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('services')}
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-white/14 bg-white/8 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/12"
              >
                <Play size={15} />
                {copy.servicesCta}
              </button>
            </MotionDiv>
          </MotionDiv>

          <MotionDiv
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.14 }}
            className="relative"
          >
            <div className="absolute -right-10 top-10 h-56 w-56 rounded-full bg-[#2d6cdf]/18 blur-3xl" aria-hidden="true" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/12 shadow-[0_28px_80px_rgba(0,0,0,0.28)]">
              <AppImage
                src="/background.jpg"
                fallbackSrc="/advisory-hero.svg"
                alt={copy.visualAlt}
                width={1000}
                height={760}
                className="aspect-[1.18/1] w-full object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,16,45,0.04)_0%,rgba(2,16,45,0.44)_100%)]" />
              <div className="absolute inset-x-0 top-0 flex items-center justify-between px-5 py-5 sm:px-6">
                <div className="rounded-full border border-white/12 bg-white/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-white/82 backdrop-blur-md">
                  {copy.visualEyebrow}
                </div>
                <div className="rounded-full border border-white/12 bg-white/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/72 backdrop-blur-md">
                  AMC
                </div>
              </div>
              <div className="absolute inset-x-0 bottom-0 px-5 pb-5 pt-14 sm:px-6 sm:pb-6">
                <div className="max-w-xl border-t border-white/12 pt-4 text-sm leading-7 text-white/74">
                  {copy.visualNoteTitle}
                </div>
              </div>
            </div>
          </MotionDiv>
        </div>

        <MotionDiv
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1], delay: 0.24 }}
          className="mt-12 border-t border-white/10 pt-7"
        >
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {copy.stats.map((stat) => (
              <div key={stat.label} className="border-l border-white/10 pl-4 first:border-l-0 first:pl-0 md:first:pl-0">
                <div className="text-[1.45rem] font-extrabold leading-tight text-white">{stat.value}</div>
                <div className="mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/56">{stat.label}</div>
              </div>
            ))}
          </div>
        </MotionDiv>
      </div>
    </section>
  )
}