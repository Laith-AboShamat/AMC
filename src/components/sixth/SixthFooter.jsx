import { motion } from 'framer-motion'
import { AppIcon } from '../fourth/AppIcon.jsx'
import { getAdvisoryCopy } from '../fourth/copy.js'

const MotionDiv = motion.div

export function SixthFooter({ locale = 'en' }) {
  const advisory = getAdvisoryCopy(locale)
  const copy = advisory.footer
  const isRtl = locale === 'ar'

  const scrollTo = (href) => {
    const id = href.replace('#', '')
    const element = document.getElementById(id)
    if (!element) {
      return
    }

    const top = element.getBoundingClientRect().top + window.scrollY - 104
    window.scrollTo({ top, behavior: 'smooth' })
  }

  return (
    <footer className="relative z-10 mt-10 w-full border-t border-white/10 bg-[linear-gradient(180deg,#081a42_0%,#04112f_100%)] px-4 pb-8 pt-10 text-white sm:px-6 lg:px-10 lg:pb-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(125,177,255,0.12),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.04),transparent_20%)]" />

      <div className="relative mx-auto max-w-[1380px] px-2 sm:px-0">
        <MotionDiv
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.18 }}
          transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
          className="grid gap-8 border-b border-white/10 pb-8 lg:grid-cols-[minmax(0,1.1fr)_220px_280px] lg:items-start lg:gap-14"
        >
          <div className={isRtl ? 'text-right' : 'text-left'}>
            <div className="text-sm font-bold uppercase tracking-[0.24em] text-white">AMC</div>
            <p className="mt-3 max-w-xl text-sm leading-7 text-white/62">Operational Excellence Consultant</p>
            <p className="mt-4 max-w-xl text-sm leading-7 text-white/56">{copy.copyright.replace('AMC · ', '')}</p>
          </div>

          <div className={isRtl ? 'text-right' : 'text-left'}>
            <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/42">{copy.navigationTitle}</div>
            <div className="mt-4 flex flex-col gap-3">
              {copy.nav.map((item) => (
                <button
                  key={item.href}
                  type="button"
                  onClick={() => scrollTo(item.href)}
                  className="text-base font-semibold text-white/78 transition hover:text-white"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className={isRtl ? 'text-right' : 'text-left'}>
            <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/42">{advisory.header.nav.contact}</div>
            <div className="mt-4 flex flex-col gap-4">
              <div>
                <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/38">Email</div>
                <a href="mailto:a.mahameed@amcco.ps" className="mt-2 inline-flex items-center gap-3 text-sm font-semibold text-white/82 transition hover:text-white">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/6 text-white/84">
                    <AppIcon name="EnvelopeIcon" size={16} />
                  </span>
                  <span dir="ltr">a.mahameed@amcco.ps</span>
                </a>
              </div>

              <div>
                <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/38">Phone</div>
                <a href="tel:+970592397405" className="mt-2 inline-flex items-center gap-3 text-sm font-semibold text-white/82 transition hover:text-white">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/6 text-white/84">
                    <AppIcon name="PhoneIcon" size={16} />
                  </span>
                  <span dir="ltr">+970-592-397-405</span>
                </a>
              </div>
            </div>
          </div>
        </MotionDiv>

        <MotionDiv
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.18 }}
          transition={{ duration: 0.56, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className={`mt-6 flex flex-col gap-5 ${isRtl ? 'lg:flex-row-reverse' : 'lg:flex-row'} lg:items-center lg:justify-between`}
        >
          <div className="flex flex-wrap items-center gap-3">
            {copy.socials.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-white/12 bg-white/8 px-4 py-2 text-sm font-semibold text-white/74 transition hover:border-white/20 hover:bg-white/12 hover:text-white"
              >
                <AppIcon name={item.icon} size={16} />
                {item.label}
              </a>
            ))}
          </div>

          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-white/12 bg-white px-5 py-2.5 text-sm font-semibold text-[#081a42] transition hover:bg-white/92"
          >
            {copy.backToTop}
          </button>
        </MotionDiv>
      </div>
    </footer>
  )
}
