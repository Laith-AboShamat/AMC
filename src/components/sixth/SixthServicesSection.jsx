import { AnimatePresence, motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { AppIcon } from '../fourth/AppIcon.jsx'
import { AppImage } from '../fourth/AppImage.jsx'
import { getAdvisoryCopy } from '../fourth/copy.js'

const MotionDiv = motion.div
const MotionArticle = motion.article

export function SixthServicesSection({ locale = 'en' }) {
  const copy = getAdvisoryCopy(locale).services
  const [activeId, setActiveId] = useState(copy.cards[0]?.id ?? null)
  const activeService = useMemo(
    () => copy.cards.find((card) => card.id === activeId) ?? copy.cards[0],
    [activeId, copy.cards],
  )

  return (
    <section id="services" className="bg-white py-20 lg:py-24">
      <div className="mx-auto grid max-w-[1380px] gap-12 px-4 sm:px-6 lg:grid-cols-[0.78fr_1.22fr] lg:px-10">
        <MotionDiv
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.24 }}
          transition={{ duration: 0.68, ease: [0.22, 1, 0.36, 1] }}
          className="lg:sticky lg:top-[112px] lg:self-start"
        >
          <div className="text-xs font-bold uppercase tracking-[0.24em] text-[#2d6cdf]">{copy.label}</div>
          <h2 className="mt-4 max-w-[10ch] text-[2.9rem] font-extrabold leading-[0.95] tracking-[-0.04em] text-slate-950 sm:text-[3.8rem]">
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

          <div className="mt-10 border-t border-slate-200 pt-6">
            <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">{copy.differentiator.label}</div>
            <div className="mt-3 text-xl font-extrabold leading-snug text-slate-950">{copy.differentiator.title}</div>
            <p className="mt-3 text-sm leading-7 text-slate-600">{copy.differentiator.description}</p>
          </div>
        </MotionDiv>

        <div className="space-y-8">
          <div className="divide-y divide-slate-200 border-y border-slate-200">
            {copy.cards.map((service, index) => {
              const isActive = service.id === activeService.id

              return (
                <MotionDiv
                  key={service.id}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.18 }}
                  transition={{ duration: 0.56, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
                >
                  <button
                    type="button"
                    onClick={() => setActiveId(service.id)}
                    className="grid w-full gap-4 px-0 py-6 text-left transition sm:grid-cols-[auto_1fr_auto] sm:items-center"
                  >
                    <div className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl ${isActive ? 'bg-[#eef4ff] text-[#2d6cdf]' : 'bg-slate-100 text-slate-500'}`}>
                      <AppIcon name={service.icon} size={22} />
                    </div>
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">{service.tag}</div>
                      <div className={`mt-2 text-xl font-extrabold leading-snug ${isActive ? 'text-slate-950' : 'text-slate-700'}`}>{service.title}</div>
                    </div>
                    <div className="justify-self-start rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600 sm:justify-self-end">
                      {service.metric}
                    </div>
                  </button>
                </MotionDiv>
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
              className="overflow-hidden rounded-[2rem] border border-slate-200 bg-[#f7f9fc]"
            >
              <div className="grid gap-0 lg:grid-cols-[0.95fr_1.05fr]">
                <div className="relative min-h-[300px] overflow-hidden border-b border-slate-200 lg:border-b-0 lg:border-r">
                  <AppImage
                    src={activeService.image}
                    alt={activeService.imageAlt}
                    fill
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.08)_0%,rgba(15,23,42,0.48)_100%)]" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/14 bg-white/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-white backdrop-blur-md">
                      <span className="inline-flex h-2 w-2 rounded-full bg-[#7db1ff]" />
                      {copy.modalEyebrow}
                    </div>
                    <h3 className="mt-4 max-w-[15ch] text-3xl font-extrabold leading-[1.02] text-white sm:text-4xl">{activeService.title}</h3>
                  </div>
                </div>

                <div className="p-6 sm:p-8 lg:p-10">
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#2d6cdf] shadow-[0_10px_24px_rgba(15,23,42,0.05)]">
                      <AppIcon name={activeService.icon} size={22} />
                    </div>
                    <div className="rounded-full bg-white px-3 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-slate-600 shadow-[0_8px_18px_rgba(15,23,42,0.04)]">
                      {activeService.metric}
                    </div>
                  </div>

                  <p className="mt-6 text-base leading-8 text-slate-600">{activeService.description}</p>

                  <div className="mt-8 border-t border-slate-200 pt-6">
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