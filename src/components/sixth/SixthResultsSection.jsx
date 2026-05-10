import { motion } from 'framer-motion'
import { AppIcon } from '../fourth/AppIcon.jsx'
import { getAdvisoryCopy } from '../fourth/copy.js'
import { FifthHeroBeams } from '../fifth/FifthHeroBeams.jsx'

const MotionDiv = motion.div
const MotionArticle = motion.article

export function SixthResultsSection({ locale = 'en' }) {
  const advisory = getAdvisoryCopy(locale)
  const copy = advisory.outcomes
  const stats = advisory.statsBand.items

  return (
    <section id="results" className="relative overflow-hidden bg-[linear-gradient(180deg,#02102d_0%,#081a42_100%)] py-20 text-white lg:py-24">
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute inset-0" style={{ transform: 'scaleX(-1)' }}>
          <FifthHeroBeams className="[mask-image:linear-gradient(180deg,rgba(0,0,0,0.95)_0%,rgba(0,0,0,0.86)_100%)]" />
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(125,177,255,0.16),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.06),transparent_24%)]" />

      <div className="relative z-10 mx-auto max-w-[1380px] px-4 sm:px-6 lg:px-10">
        <MotionDiv
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.24 }}
          transition={{ duration: 0.68, ease: [0.22, 1, 0.36, 1] }}
          className="grid gap-8 lg:grid-cols-[0.84fr_1.16fr] lg:items-start"
        >
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.24em] text-[#2d6cdf]">{copy.label}</div>
            <h2 className="mt-4 max-w-[11ch] text-[2.8rem] font-extrabold leading-[0.95] tracking-[-0.04em] text-white sm:text-[3.7rem]">
              {copy.title}
            </h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-white/74">{copy.subtitle}</p>
          </div>

          <div className="grid items-stretch gap-4 md:grid-cols-2 xl:grid-cols-4">
            {stats.map((item, index) => (
              <MotionDiv
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -4 }}
                viewport={{ once: true, amount: 0.16 }}
                transition={{ duration: 0.56, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="h-full"
              >
                <div className="relative flex h-full min-h-[168px] flex-col overflow-hidden rounded-[1.45rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.075)_0%,rgba(255,255,255,0.03)_100%)] p-5 shadow-[0_18px_40px_rgba(0,0,0,0.14)] backdrop-blur-md">
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(142,183,255,0.12),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.04),transparent_36%)]" />
                  <div className="relative z-10 flex items-start justify-between gap-4">
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#081a42] text-white shadow-[0_14px_28px_rgba(2,12,32,0.22)]">
                      <span className="text-[11px] font-bold uppercase tracking-[0.2em]">{String(index + 1).padStart(2, '0')}</span>
                    </div>
                    <div className="h-px flex-1 self-center bg-[linear-gradient(90deg,rgba(142,183,255,0.34),rgba(255,255,255,0))]" />
                  </div>
                  <div className="relative z-10 mt-5 text-[1.02rem] font-extrabold leading-[1.12] tracking-[-0.02em] text-white xl:text-[1.08rem]">{item.title}</div>
                  <div className="relative z-10 mt-3 flex-1 text-sm leading-7 text-white/78">{item.sub}</div>
                </div>
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
              className="rounded-[1.8rem] border border-white/10 bg-white/6 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.16)] backdrop-blur-md"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#081a42] text-white shadow-[0_16px_30px_rgba(2,12,32,0.24)]">
                  <AppIcon name={item.icon} size={22} />
                </div>
                <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/40">
                  {String(index + 1).padStart(2, '0')}
                </div>
              </div>

              <div className="mt-6 text-[11px] font-bold uppercase tracking-[0.2em] text-[#8eb7ff]">{item.kicker}</div>
              <h3 className="mt-3 text-[1.8rem] font-extrabold leading-[1.02] tracking-[-0.03em] text-white">{item.title}</h3>
              <p className="mt-4 text-sm leading-8 text-white/74">{item.description}</p>
            </MotionArticle>
          ))}
        </div>
      </div>
    </section>
  )
}