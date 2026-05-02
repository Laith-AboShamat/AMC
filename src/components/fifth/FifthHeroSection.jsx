import { motion } from 'framer-motion'
import { ArrowRight, Play } from 'lucide-react'
import { AppImage } from '../fourth/AppImage.jsx'
import { getAdvisoryCopy } from '../fourth/copy.js'
import { FifthHeroBeams } from './FifthHeroBeams.jsx'

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
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] },
  },
}

export function FifthHeroSection({ locale = 'en' }) {
  const copy = getAdvisoryCopy(locale).hero
  const marqueeItems = [...copy.stats, ...copy.stats]

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (!element) {
      return
    }

    const top = element.getBoundingClientRect().top + window.scrollY - 104
    window.scrollTo({ top, behavior: 'smooth' })
  }

  return (
    <section id="hero" className="relative overflow-hidden px-4 pb-8 pt-6 sm:px-6 lg:px-10">
      <div className="relative mx-auto max-w-[1380px] overflow-hidden rounded-[2.25rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f5f7fa_100%)] shadow-[0_30px_90px_rgba(15,23,42,0.07)]">
        <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_top_left,rgba(45,108,223,0.08),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(148,163,184,0.06),transparent_40%),linear-gradient(180deg,rgba(255,255,255,0.16),rgba(245,247,250,0.28))]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 top-[44%] z-0 hidden lg:block">
          <FifthHeroBeams className="opacity-75 [mask-image:linear-gradient(180deg,transparent_0%,rgba(0,0,0,0.86)_24%,rgba(0,0,0,0.92)_100%)]" />
        </div>

        <div className="relative z-10 grid gap-10 px-6 py-8 sm:px-8 sm:py-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-start lg:px-12 lg:py-14">
          <MotionDiv variants={container} initial="hidden" animate="visible" className="relative z-10 flex flex-col justify-center">
            <MotionDiv variants={item} className="inline-flex w-fit items-center gap-2 rounded-full border border-[#d8e2f2] bg-[#eef4ff] px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-[#2d6cdf]">
              <span className="inline-flex h-2 w-2 rounded-full bg-[#2d6cdf]" />
              {copy.eyebrow.lead} {copy.eyebrow.accent} {copy.eyebrow.tail}
            </MotionDiv>

            <MotionH1 variants={item} className="mt-6 max-w-[12ch] text-[3.2rem] font-extrabold leading-[0.92] tracking-[-0.05em] text-slate-950 sm:text-[4.5rem] lg:text-[5.35rem]">
              {copy.lines.map((line, lineIndex) => (
                <span key={`line-${lineIndex}`} className="block">
                  {line.map((segment, segmentIndex) => (
                    <span
                      key={`segment-${lineIndex}-${segmentIndex}`}
                      className={segment.accent === 'gold' ? 'text-[#2d6cdf]' : ''}
                    >
                      {segment.text}
                    </span>
                  ))}
                </span>
              ))}
            </MotionH1>

            <MotionP variants={item} className="mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              {copy.description}
            </MotionP>

            <MotionDiv variants={item} className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => scrollToSection('contact')}
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                {copy.contactCta}
                <ArrowRight size={16} />
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('services')}
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:text-slate-950"
              >
                <Play size={15} />
                {copy.servicesCta}
              </button>
            </MotionDiv>

            <MotionDiv variants={item} className="mt-10 grid gap-3 sm:grid-cols-2 xl:max-w-[92%] xl:grid-cols-2 2xl:grid-cols-4">
              {copy.stats.map((stat) => (
                <div key={stat.label} className="min-w-0 rounded-[1.5rem] border border-slate-200 bg-white px-4 py-4 shadow-[0_16px_40px_rgba(15,23,42,0.04)]">
                  <div className="break-words text-[1.55rem] font-extrabold leading-[1.02] text-slate-950 sm:text-[1.7rem]">{stat.value}</div>
                  <div className="mt-2 break-words text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{stat.label}</div>
                </div>
              ))}
            </MotionDiv>
          </MotionDiv>

          <MotionDiv initial={{ opacity: 0, x: 32 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.18 }} className="relative lg:self-start">
            <div className="absolute -right-16 top-0 h-64 w-64 rounded-full bg-[#dbe8ff] blur-3xl" aria-hidden="true" />
            <div className="absolute bottom-10 left-0 h-48 w-48 rounded-full bg-[#edf2f7] blur-3xl" aria-hidden="true" />

            <div className="relative rounded-[2rem] border border-slate-200 bg-white p-4 shadow-[0_30px_90px_rgba(15,23,42,0.08)] sm:p-5">
              <div className="relative overflow-hidden rounded-[1.6rem] border border-slate-200 bg-slate-950">
                <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(15,23,42,0.18),rgba(45,108,223,0.1))]" />
                <AppImage
                  src="/background.jpg"
                  fallbackSrc="/advisory-hero.svg"
                  alt={copy.visualAlt}
                  width={860}
                  height={860}
                  className="aspect-[1.05/1] w-full object-cover opacity-90"
                />

                <div className="absolute inset-x-0 top-0 flex items-center justify-between px-5 py-4">
                  <div className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.22em] text-white backdrop-blur-md">
                    {copy.visualEyebrow}
                  </div>
                  <div className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/80 backdrop-blur-md">
                    AMC
                  </div>
                </div>

                <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-6">
                  <div className="w-full max-w-[21rem] rounded-[1.5rem] border border-white/15 bg-[linear-gradient(145deg,rgba(17,24,39,0.9),rgba(15,23,42,0.76))] p-5 text-white shadow-[0_24px_60px_rgba(15,23,42,0.28)] backdrop-blur-xl sm:max-w-[22rem] lg:max-w-[24rem] lg:p-6">
                    <div className="text-xs font-bold uppercase tracking-[0.22em] text-white/70">{copy.visualCardEyebrow}</div>
                    <div className="mt-3 text-2xl font-extrabold leading-tight">{copy.visualCardTitle}</div>
                    <div className="mt-3 text-sm leading-7 text-white/80">{copy.scrollLabel}</div>
                  </div>
                </div>
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-[1.1fr_0.9fr]">
                <MotionDiv
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
                  className="rounded-[1.5rem] border border-slate-200 bg-[#f7f9fc] p-5"
                >
                  <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">{copy.visualFocusTitle}</div>
                  <div className="mt-4 space-y-3">
                    {copy.stats.map((stat) => (
                      <div key={stat.label} className="rounded-[1rem] border border-slate-200 bg-white px-4 py-3">
                        <div className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">{stat.label}</div>
                        <div className="mt-1 text-sm font-semibold text-slate-800">{stat.value}</div>
                      </div>
                    ))}
                  </div>
                </MotionDiv>

                <MotionDiv
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 7, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
                  className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-[0_16px_40px_rgba(15,23,42,0.05)]"
                >
                  <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#2d6cdf]">{copy.visualNoteLabel}</div>
                  <div className="mt-4 text-2xl font-extrabold leading-tight text-slate-950">{copy.visualNoteTitle}</div>
                  <div className="mt-6 rounded-[1.25rem] bg-slate-950 px-4 py-4 text-white">
                    <div className="text-xs font-bold uppercase tracking-[0.16em] text-white/60">{copy.visualPrincipleLabel}</div>
                    <div className="mt-2 text-sm leading-7 text-white/84">{copy.description}</div>
                  </div>
                </MotionDiv>
              </div>
            </div>
          </MotionDiv>
        </div>

        <div className="border-t border-slate-200 bg-white/65 py-4">
          <div className="overflow-hidden">
            <MotionDiv
              className="flex min-w-max gap-4 px-4 sm:px-8"
              animate={{ x: ['0%', '-50%'] }}
              transition={{ duration: 22, repeat: Number.POSITIVE_INFINITY, ease: 'linear' }}
            >
              {marqueeItems.map((item, index) => (
                <div key={`${item.label}-${index}`} className="inline-flex items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-slate-600">
                  <span className="inline-flex h-2 w-2 rounded-full bg-[#2d6cdf]" />
                  <span>{item.value}</span>
                  <span className="text-slate-400">{item.label}</span>
                </div>
              ))}
            </MotionDiv>
          </div>
        </div>
      </div>
    </section>
  )
}