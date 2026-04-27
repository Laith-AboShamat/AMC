import { motion } from 'framer-motion'
import { AppIcon } from './AppIcon.jsx'
import { getAdvisoryCopy } from './copy.js'

export function FourthOutcomesSection({ locale = 'en' }) {
  const copy = getAdvisoryCopy(locale).outcomes
  const isRtl = locale === 'ar'
  const cardOffsets = ['xl:translate-y-5', 'xl:-translate-y-3', 'xl:translate-y-8', 'xl:translate-y-0']

  return (
    <section id="results" className="advisory-outcomes-section relative overflow-hidden py-20 lg:py-28 bg-[var(--bg-cool)]">
      <div className="advisory-outcomes-orb advisory-outcomes-orb-one" aria-hidden="true" />
      <div className="advisory-outcomes-orb advisory-outcomes-orb-two" aria-hidden="true" />
      <div className="advisory-outcomes-gridline" aria-hidden="true" />
      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        <motion.div
          className={`mb-14 text-center ${isRtl ? 'lg:text-right' : 'lg:text-center'}`}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="advisory-section-label advisory-outcomes-label block mb-4">Strategic outcomes</span>
          <h2 className="advisory-display text-5xl sm:text-6xl leading-[0.96] max-w-4xl mx-auto advisory-outcomes-heading">
            <span className="advisory-gold-shimmer">{copy.title}</span>
          </h2>
          <p className="mt-5 max-w-3xl mx-auto advisory-outcomes-subtitle text-base sm:text-lg leading-8">
            {copy.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 xl:gap-6 items-start">
          {copy.items.map((item, index) => (
            <motion.article
              key={item.title}
              className={`advisory-outcome-card ${cardOffsets[index] ?? ''} relative overflow-hidden rounded-[2rem] border flex flex-col group`}
              initial={{ opacity: 0, y: 34, rotate: index % 2 === 0 ? -1.2 : 1.2 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              whileHover={{ y: -8, scale: 1.01 }}
              viewport={{ once: true, amount: 0.22 }}
              transition={{ duration: 0.65, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="advisory-outcome-card-beam absolute inset-x-0 top-0 h-1" />
              <div className="advisory-outcome-card-noise absolute inset-0" aria-hidden="true" />
              <div className="advisory-outcome-card-orb advisory-outcome-card-orb-one" aria-hidden="true" />
              <div className="advisory-outcome-card-orb advisory-outcome-card-orb-two" aria-hidden="true" />

              <div className="relative z-10 px-7 pt-7 pb-6 flex-1 flex flex-col">
                <div className={`flex items-start justify-between gap-4 ${isRtl ? 'flex-row-reverse' : ''}`}>
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-[1.35rem] advisory-outcome-icon-wrap transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-3">
                    <span className="advisory-outcome-icon-glow" aria-hidden="true" />
                    <span className="relative z-10 text-[var(--gold)]">
                  <AppIcon name={item.icon} size={22} />
                    </span>
                  </div>
                  <span className="advisory-outcome-index text-[11px] font-bold uppercase tracking-[0.24em]">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                <div className="relative flex-1 mt-7">
                  <div className="advisory-outcome-kicker mb-4">{item.kicker}</div>
                  <h3 className="advisory-display text-[2rem] sm:text-[2.25rem] leading-[0.98] advisory-outcome-title mb-4 max-w-[12ch]">
                    {item.title}
                  </h3>
                  <p className="advisory-outcome-description text-sm sm:text-[15px] leading-8 font-medium">
                    {item.description}
                  </p>
                </div>

                <div className={`mt-8 pt-5 border-t advisory-outcome-divider flex items-center ${isRtl ? 'justify-end' : 'justify-start'}`}>
                  <div className="advisory-outcome-signal">
                    <span className="advisory-outcome-signal-bar" />
                    <span className="advisory-outcome-signal-bar advisory-outcome-signal-bar-mid" />
                    <span className="advisory-outcome-signal-bar" />
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}