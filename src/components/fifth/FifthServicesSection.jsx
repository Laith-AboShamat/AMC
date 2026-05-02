import { AnimatePresence, motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { AppIcon } from '../fourth/AppIcon.jsx'
import { AppImage } from '../fourth/AppImage.jsx'
import { getAdvisoryCopy } from '../fourth/copy.js'

const MotionDiv = motion.div
const MotionArticle = motion.article

export function FifthServicesSection({ locale = 'en' }) {
  const copy = getAdvisoryCopy(locale).services
  const [activeId, setActiveId] = useState(copy.cards[0]?.id ?? null)
  const activeService = useMemo(
    () => copy.cards.find((card) => card.id === activeId) ?? copy.cards[0],
    [activeId, copy.cards],
  )

  return (
    <section id="services" className="px-4 py-20 sm:px-6 lg:px-10 lg:py-24">
      <div className="mx-auto grid max-w-[1380px] gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:gap-10">
        <div className="lg:sticky lg:top-[112px] lg:self-start">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_24px_64px_rgba(15,23,42,0.05)] sm:p-8">
            <div className="text-xs font-bold uppercase tracking-[0.24em] text-[#2d6cdf]">{copy.label}</div>
            <h2 className="mt-4 max-w-[11ch] text-[2.9rem] font-extrabold leading-[0.95] tracking-[-0.04em] text-slate-950 sm:text-[3.8rem]">
              {copy.titleFirst}
              <span className="block text-slate-500">{copy.titleAccent}</span>
            </h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-slate-600">{copy.intro}</p>
            <button
              type="button"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
              className="mt-8 inline-flex min-h-[44px] items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-5 py-2.5 text-sm font-semibold text-slate-800 transition hover:border-[#2d6cdf] hover:text-[#2d6cdf]"
            >
              {copy.cta}
              <ArrowUpRight size={16} />
            </button>

            <div className="mt-8 rounded-[1.5rem] bg-[#f7f9fc] p-5">
              <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">{copy.differentiator.label}</div>
              <div className="mt-3 text-lg font-extrabold leading-snug text-slate-900">{copy.differentiator.title}</div>
              <p className="mt-3 text-sm leading-7 text-slate-600">{copy.differentiator.description}</p>
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div className="grid gap-4 xl:grid-cols-2">
            {copy.cards.map((service) => {
              const isActive = service.id === activeService.id

              return (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => setActiveId(service.id)}
                  className="relative overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white p-5 text-left shadow-[0_20px_50px_rgba(15,23,42,0.04)] transition hover:-translate-y-1"
                >
                  {isActive ? (
                    <MotionDiv
                      layoutId="fifth-service-highlight"
                      className="absolute inset-0 border border-[#2d6cdf] bg-[linear-gradient(135deg,rgba(45,108,223,0.08),rgba(45,108,223,0.02))]"
                    />
                  ) : null}

                  <div className="relative z-10">
                    <div className="flex items-start justify-between gap-4">
                      <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#edf4ff] text-[#2d6cdf]">
                        <AppIcon name={service.icon} size={22} />
                      </div>
                      <div className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
                        {service.tag}
                      </div>
                    </div>

                    <h3 className="mt-5 text-xl font-extrabold leading-snug text-slate-950">{service.title}</h3>
                    <div className="mt-4 inline-flex rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600">
                      {service.metric}
                    </div>
                  </div>
                </button>
              )
            })}
          </div>

          <AnimatePresence mode="wait">
            <MotionArticle
              key={activeService.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.06)]"
            >
              <div className="grid gap-0 lg:grid-cols-[0.94fr_1.06fr]">
                <div className="relative min-h-[320px] overflow-hidden border-b border-slate-200 lg:min-h-full lg:border-b-0 lg:border-r">
                  <AppImage
                    src={activeService.image}
                    alt={activeService.imageAlt}
                    fill
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.04)_0%,rgba(15,23,42,0.44)_100%)]" />

                  <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/12 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-white backdrop-blur-md">
                      <span className="inline-flex h-2 w-2 rounded-full bg-[#7db1ff]" />
                      {copy.modalEyebrow}
                    </div>
                    <h3 className="mt-4 max-w-[14ch] text-3xl font-extrabold leading-[1.02] text-white sm:text-4xl">{activeService.title}</h3>
                  </div>
                </div>

                <div className="p-6 sm:p-8 lg:p-10">
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#edf4ff] text-[#2d6cdf]">
                      <AppIcon name={activeService.icon} size={22} />
                    </div>
                    <div className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-slate-600">
                      {activeService.tag}
                    </div>
                    <div className="rounded-full bg-[#eef4ff] px-3 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-[#2d6cdf]">
                      {activeService.metric}
                    </div>
                  </div>

                  <p className="mt-6 text-base leading-8 text-slate-600">{activeService.description}</p>

                  <div className="mt-8 rounded-[1.5rem] bg-[#f7f9fc] p-5">
                    <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">{copy.modalValueLabel}</div>
                    <div className="mt-3 text-xl font-extrabold leading-snug text-slate-950">{activeService.metric}</div>
                  </div>

                  <div className="mt-8 inline-flex min-h-[44px] items-center gap-2 rounded-full bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white">
                    {activeService.cta}
                    <ArrowUpRight size={16} />
                  </div>
                </div>
              </div>
            </MotionArticle>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}