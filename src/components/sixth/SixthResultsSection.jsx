import { motion } from 'framer-motion'
import { AppIcon } from '../fourth/AppIcon.jsx'
import { getAdvisoryCopy } from '../fourth/copy.js'

const MotionDiv = motion.div
const MotionArticle = motion.article

export function SixthResultsSection({ locale = 'en' }) {
  const advisory = getAdvisoryCopy(locale)
  const copy = advisory.outcomes
  const stats = advisory.statsBand.items

  return (
    <section id="results" className="bg-white py-20 lg:py-24">
      <div className="mx-auto max-w-[1380px] px-4 sm:px-6 lg:px-10">
        <MotionDiv
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.24 }}
          transition={{ duration: 0.68, ease: [0.22, 1, 0.36, 1] }}
          className="grid gap-8 lg:grid-cols-[0.84fr_1.16fr] lg:items-end"
        >
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.24em] text-[#2d6cdf]">{copy.label}</div>
            <h2 className="mt-4 max-w-[11ch] text-[2.8rem] font-extrabold leading-[0.95] tracking-[-0.04em] text-slate-950 sm:text-[3.7rem]">
              {copy.title}
            </h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-slate-600">{copy.subtitle}</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {stats.map((item, index) => (
              <MotionDiv
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.16 }}
                transition={{ duration: 0.56, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="border-l border-slate-200 pl-4 first:border-l-0 first:pl-0"
              >
                <div className="text-base font-bold text-slate-950">{item.title}</div>
                <div className="mt-2 text-sm leading-7 text-slate-600">{item.sub}</div>
              </MotionDiv>
            ))}
          </div>
        </MotionDiv>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {copy.items.map((item, index) => (
            <MotionArticle
              key={item.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -4 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{ duration: 0.58, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-[1.8rem] border border-slate-200 bg-[#f7f9fc] p-6 shadow-[0_20px_50px_rgba(15,23,42,0.04)]"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#2d6cdf] shadow-[0_10px_24px_rgba(15,23,42,0.05)]">
                  <AppIcon name={item.icon} size={22} />
                </div>
                <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">
                  {String(index + 1).padStart(2, '0')}
                </div>
              </div>

              <div className="mt-6 text-[11px] font-bold uppercase tracking-[0.2em] text-[#2d6cdf]">{item.kicker}</div>
              <h3 className="mt-3 text-[1.8rem] font-extrabold leading-[1.02] tracking-[-0.03em] text-slate-950">{item.title}</h3>
              <p className="mt-4 text-sm leading-8 text-slate-600">{item.description}</p>
            </MotionArticle>
          ))}
        </div>
      </div>
    </section>
  )
}