import { motion } from 'framer-motion'
import { AppIcon } from '../fourth/AppIcon.jsx'
import { getAdvisoryCopy } from '../fourth/copy.js'

const MotionDiv = motion.div
const MotionArticle = motion.article

export function FifthResultsSection({ locale = 'en' }) {
  const advisory = getAdvisoryCopy(locale)
  const copy = advisory.outcomes
  const stats = advisory.statsBand.items

  return (
    <section id="results" className="px-4 py-20 sm:px-6 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-[1380px]">
        <div className="grid gap-6 lg:grid-cols-[0.86fr_1.14fr]">
          <MotionDiv
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.68, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-[2rem] border border-slate-200 bg-slate-950 p-6 text-white shadow-[0_28px_80px_rgba(15,23,42,0.12)] sm:p-8"
          >
            <div className="text-xs font-bold uppercase tracking-[0.24em] text-[#8eb7ff]">{copy.label}</div>
            <h2 className="mt-4 max-w-[11ch] text-[2.8rem] font-extrabold leading-[0.95] tracking-[-0.04em] sm:text-[3.7rem]">
              {copy.title}
            </h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-white/78">{copy.subtitle}</p>

            <div className="mt-8 space-y-3">
              {stats.map((item) => (
                <div key={item.title} className="rounded-[1.4rem] border border-white/10 bg-white/5 px-4 py-4">
                  <div className="text-sm font-bold text-white">{item.title}</div>
                  <div className="mt-1 text-sm leading-7 text-white/68">{item.sub}</div>
                </div>
              ))}
            </div>
          </MotionDiv>

          <div className="grid gap-4 md:grid-cols-2">
            {copy.items.map((item, index) => (
              <MotionArticle
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -6 }}
                viewport={{ once: true, amount: 0.18 }}
                transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-[0_24px_64px_rgba(15,23,42,0.05)]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eef4ff] text-[#2d6cdf]">
                    <AppIcon name={item.icon} size={22} />
                  </div>
                  <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                </div>

                <div className="mt-6 text-[11px] font-bold uppercase tracking-[0.2em] text-[#2d6cdf]">{item.kicker}</div>
                <h3 className="mt-3 text-[1.85rem] font-extrabold leading-[1.02] tracking-[-0.03em] text-slate-950">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm leading-8 text-slate-600">{item.description}</p>
              </MotionArticle>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}