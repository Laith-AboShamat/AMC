import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import { AppIcon } from '../fourth/AppIcon.jsx'
import { AppImage } from '../fourth/AppImage.jsx'
import { getAdvisoryCopy } from '../fourth/copy.js'

const MotionDiv = motion.div

const revealViewport = { once: true, amount: 0.18 }

function wrapIndex(index, total) {
  return (index + total) % total
}

function getSlideDirection(step, isRtl) {
  const normalizedStep = step >= 0 ? 1 : -1

  return isRtl ? normalizedStep * -1 : normalizedStep
}

function ServiceShowcaseCard({ service, copy, isRtl }) {
  const unlocks = Array.isArray(service.unlocks) && service.unlocks.length > 0 ? service.unlocks : [service.metric]
  const imageOverlayClass =
    service.id === 'enterprise'
      ? 'absolute inset-0 bg-[linear-gradient(90deg,rgba(3,17,47,0.08)_0%,rgba(3,17,47,0.04)_34%,rgba(3,17,47,0.68)_100%),linear-gradient(180deg,rgba(3,17,47,0.02)_0%,rgba(3,17,47,0.5)_100%)]'
      : 'absolute inset-0 bg-[linear-gradient(90deg,rgba(3,17,47,0.18)_0%,rgba(3,17,47,0.08)_36%,rgba(3,17,47,0.76)_100%),linear-gradient(180deg,rgba(3,17,47,0.04)_0%,rgba(3,17,47,0.62)_100%)]'

  return (
    <article className="overflow-hidden rounded-[2rem] border border-slate-200 bg-[linear-gradient(135deg,#03112f_0%,#0b1f4a_52%,#17356d_100%)] shadow-[0_28px_80px_rgba(15,23,42,0.16)] lg:h-[620px]">
      <div className="grid gap-0 lg:h-full lg:grid-cols-[1.08fr_0.92fr]">
        <div className="relative min-h-[360px] overflow-hidden lg:h-full lg:min-h-0">
          <div className="absolute inset-0">
            <AppImage
              src={service.image}
              alt={service.imageAlt}
              fill
              className={`h-full w-full ${service.imageClassName ?? 'object-cover object-center'}`}
            />
            <div className={imageOverlayClass} />
          </div>

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(125,177,255,0.26),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.1),transparent_18%)]" />

          <div className={`relative z-10 flex h-full flex-col justify-between p-6 sm:p-8 lg:p-10 ${isRtl ? 'items-end text-right' : 'items-start text-left'}`}>
            <div className="flex h-full w-full flex-col">
              <div className="flex w-full items-start justify-between gap-4">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#081a42] text-white shadow-[0_16px_32px_rgba(3,17,47,0.34)] ring-1 ring-white/15">
                  <AppIcon name={service.icon} size={24} />
                </div>
                <div className="inline-flex rounded-full border border-white/18 bg-white/14 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-[rgba(255,255,255,0.95)] backdrop-blur-md">
                  {service.tag}
                </div>
              </div>

              <div className="my-auto flex w-full justify-center pt-6 pb-10 sm:pb-12 lg:pb-14">
                <h3 className="w-full whitespace-pre-line text-center text-3xl font-extrabold leading-[1.02] text-[rgba(255,255,255,0.98)] sm:text-4xl lg:text-[3rem]">
                  {service.title}
                </h3>
              </div>
            </div>
          </div>
        </div>

        <div className="relative p-6 sm:p-8 lg:flex lg:h-full lg:flex-col lg:p-10">
          <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,rgba(125,177,255,0),rgba(125,177,255,0.6),rgba(125,177,255,0))] lg:inset-y-10 lg:left-0 lg:right-auto lg:h-auto lg:w-px lg:bg-[linear-gradient(180deg,rgba(125,177,255,0),rgba(125,177,255,0.6),rgba(125,177,255,0))]" />

          <div className={`flex h-full flex-col ${isRtl ? 'text-right' : 'text-left'}`}>
            <div className={`flex flex-wrap items-center gap-3 ${isRtl ? 'flex-row-reverse' : ''}`}>
              <div className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-[rgba(255,255,255,0.92)] backdrop-blur-md">
                {service.metric}
              </div>
            </div>

            <p className="mt-6 text-base leading-8 text-[rgba(244,247,255,0.9)]">{service.description}</p>

            <div className="mt-8 rounded-[1.5rem] border border-white/10 bg-white/6 p-5 backdrop-blur-md sm:p-6">
              <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-[rgba(255,255,255,0.76)]">{copy.modalValueLabel}</div>
              <div className="mt-4 flex flex-wrap gap-3">
                {unlocks.map((item) => (
                  <div
                    key={item}
                    className="rounded-full border border-white/12 bg-white px-4 py-2 text-sm font-semibold text-[#081a42] shadow-[0_10px_24px_rgba(3,17,47,0.16)]"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
              className={`mt-auto inline-flex min-h-[46px] items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#081a42] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/92 hover:shadow-[0_18px_36px_rgba(125,177,255,0.2)] ${isRtl ? 'self-end' : 'self-start'}`}
            >
              {service.cta}
              <ArrowUpRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}

export function SixthServicesSection({ locale = 'en' }) {
  const copy = getAdvisoryCopy(locale).services
  const [activeIndex, setActiveIndex] = useState(0)
  const [slideTransition, setSlideTransition] = useState(null)
  const prefersReducedMotion = useReducedMotion()
  const isRtl = locale === 'ar'
  const activeService = copy.cards[activeIndex] ?? copy.cards[0]
  const isSliding = slideTransition !== null

  useEffect(() => {
    setActiveIndex((current) => wrapIndex(current, copy.cards.length))
  }, [copy.cards.length])

  const startSlideTransition = (targetIndex, visualDirection) => {
    if (targetIndex === activeIndex || isSliding) {
      return
    }

    if (prefersReducedMotion) {
      setActiveIndex(targetIndex)
      return
    }

    setSlideTransition({
      fromIndex: activeIndex,
      toIndex: targetIndex,
      direction: visualDirection,
    })
  }

  const changeSlide = (step) => {
    const targetIndex = wrapIndex(activeIndex + step, copy.cards.length)

    startSlideTransition(targetIndex, getSlideDirection(step, isRtl))
  }

  const jumpToSlide = (index) => {
    if (index === activeIndex) {
      return
    }

    const step = index > activeIndex ? 1 : -1
    startSlideTransition(index, getSlideDirection(step, isRtl))
  }

  const transitionFromService = slideTransition ? copy.cards[slideTransition.fromIndex] : null
  const transitionToService = slideTransition ? copy.cards[slideTransition.toIndex] : null

  return (
    <section id="services" className="bg-white py-20 lg:py-24">
      <div className="mx-auto max-w-[1380px] px-4 sm:px-6 lg:px-10">
        <div className="grid gap-8 border-b border-slate-200 pb-10 lg:grid-cols-[minmax(0,1fr)_minmax(320px,420px)] lg:items-end">
          <MotionDiv
            initial={prefersReducedMotion ? false : { opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={revealViewport}
            transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
            className={isRtl ? 'text-right' : 'text-left'}
          >
            <div className="text-xs font-bold uppercase tracking-[0.24em] text-[#2d6cdf]">{copy.label}</div>
            <h2 className="mt-4 max-w-[10ch] text-[2.9rem] font-extrabold leading-[0.95] tracking-[-0.04em] text-slate-950 sm:text-[3.8rem]">
              {copy.titleFirst}
              <span className="block text-slate-500">{copy.titleAccent}</span>
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-black">{copy.intro}</p>
            <button
              type="button"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
              className="mt-8 inline-flex min-h-[44px] items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-5 py-2.5 text-sm font-semibold text-slate-800 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#2d6cdf] hover:text-[#2d6cdf] hover:shadow-[0_16px_32px_rgba(45,108,223,0.16)]"
            >
              {copy.cta}
              <ArrowUpRight size={16} />
            </button>
          </MotionDiv>

          <MotionDiv
            initial={prefersReducedMotion ? false : { opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={revealViewport}
            transition={{ duration: 0.62, delay: prefersReducedMotion ? 0 : 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-[1.75rem] border border-slate-200 bg-slate-50/80 p-6 shadow-[0_18px_42px_rgba(15,23,42,0.05)] backdrop-blur-sm"
          >
            <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">{copy.differentiator.label}</div>
            <div className="mt-3 text-xl font-extrabold leading-snug text-slate-950">{copy.differentiator.title}</div>
            <p className="mt-3 text-sm leading-7 text-black">{copy.differentiator.description}</p>
          </MotionDiv>
        </div>

        <div className="mt-10 space-y-6">
          <MotionDiv
            initial={prefersReducedMotion ? false : { opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={revealViewport}
            transition={{ duration: 0.56, delay: prefersReducedMotion ? 0 : 0.04, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap items-center justify-between gap-4"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-[11px] font-bold uppercase tracking-[0.22em] text-slate-500 shadow-[0_10px_26px_rgba(15,23,42,0.04)]">
              <span className="inline-flex h-2 w-2 rounded-full bg-[#2d6cdf]" />
              {copy.sliderRegionLabel}
            </div>

            <div className={`flex items-center gap-3 ${isRtl ? 'flex-row-reverse' : ''}`}>
              <div className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500 shadow-[0_8px_22px_rgba(15,23,42,0.04)]">
                {String(activeIndex + 1).padStart(2, '0')} / {String(copy.cards.length).padStart(2, '0')}
              </div>
              <button
                type="button"
                onClick={() => changeSlide(-1)}
                disabled={isSliding}
                aria-label={copy.previousServiceLabel}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-[0_10px_24px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#2d6cdf] hover:text-[#2d6cdf] hover:shadow-[0_16px_30px_rgba(45,108,223,0.18)] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
              >
                {isRtl ? <ArrowRight size={18} /> : <ArrowLeft size={18} />}
              </button>
              <button
                type="button"
                onClick={() => changeSlide(1)}
                disabled={isSliding}
                aria-label={copy.nextServiceLabel}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-[0_10px_24px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#2d6cdf] hover:text-[#2d6cdf] hover:shadow-[0_16px_30px_rgba(45,108,223,0.18)] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
              >
                {isRtl ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
              </button>
            </div>
          </MotionDiv>

          <MotionDiv
            initial={prefersReducedMotion ? false : { opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={revealViewport}
            transition={{ duration: 0.62, delay: prefersReducedMotion ? 0 : 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden"
          >
            {isSliding && transitionFromService && transitionToService ? (
              <MotionDiv
                key={`${slideTransition.fromIndex}-${slideTransition.toIndex}-${slideTransition.direction}`}
                initial={{ x: slideTransition.direction > 0 ? '0%' : '-50%' }}
                animate={{ x: slideTransition.direction > 0 ? '-50%' : '0%' }}
                transition={{ duration: 0.64, ease: [0.22, 1, 0.36, 1] }}
                onAnimationComplete={() => {
                  setActiveIndex(slideTransition.toIndex)
                  setSlideTransition(null)
                }}
                className="flex w-[200%]"
              >
                {slideTransition.direction > 0 ? (
                  <>
                    <div className="w-1/2 shrink-0">
                      <ServiceShowcaseCard service={transitionFromService} copy={copy} isRtl={isRtl} />
                    </div>
                    <div className="w-1/2 shrink-0">
                      <ServiceShowcaseCard service={transitionToService} copy={copy} isRtl={isRtl} />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-1/2 shrink-0">
                      <ServiceShowcaseCard service={transitionToService} copy={copy} isRtl={isRtl} />
                    </div>
                    <div className="w-1/2 shrink-0">
                      <ServiceShowcaseCard service={transitionFromService} copy={copy} isRtl={isRtl} />
                    </div>
                  </>
                )}
              </MotionDiv>
            ) : (
              <ServiceShowcaseCard service={activeService} copy={copy} isRtl={isRtl} />
            )}
          </MotionDiv>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {copy.cards.map((service, index) => {
              const isActive = index === activeIndex

              return (
                <MotionDiv
                  key={service.id}
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.12 }}
                  transition={{ duration: 0.5, delay: prefersReducedMotion ? 0 : index * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full"
                >
                  <button
                    type="button"
                    onClick={() => jumpToSlide(index)}
                    aria-label={`${copy.jumpToServiceLabel} ${service.title}`}
                    aria-current={isActive ? 'true' : undefined}
                    className={`flex h-full w-full flex-col rounded-[1.35rem] border px-4 py-4 text-left transition-all duration-300 ${isActive ? 'border-[#2d6cdf]/30 bg-[#eef4ff] shadow-[0_16px_32px_rgba(45,108,223,0.12)] hover:-translate-y-0.5 hover:shadow-[0_20px_36px_rgba(45,108,223,0.16)]' : 'border-slate-200 bg-white hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-[0_16px_30px_rgba(15,23,42,0.08)]'} ${isRtl ? 'text-right' : 'text-left'}`}
                  >
                    <div className={`flex items-start justify-between gap-4 ${isRtl ? 'flex-row-reverse' : ''}`}>
                      <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#081a42] text-white shadow-[0_12px_24px_rgba(8,26,66,0.14)]">
                        <AppIcon name={service.icon} size={20} />
                      </div>
                      <div className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] ${isActive ? 'bg-white text-slate-600' : 'bg-slate-100 text-slate-500'}`}>
                        {String(index + 1).padStart(2, '0')}
                      </div>
                    </div>
                    <div className="mt-4 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">{service.tag}</div>
                    <div className={`mt-2 whitespace-pre-line text-lg font-extrabold leading-snug ${isActive ? 'text-slate-950' : 'text-slate-700'}`}>{service.title}</div>
                    <div className="mt-auto pt-3" />
                  </button>
                </MotionDiv>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}