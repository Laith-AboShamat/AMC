import { motion } from 'framer-motion'
import aboutImpactImage from '../../assets/Built for impact, driven by purpose..png'
import { AppIcon } from '../fourth/AppIcon.jsx'
import { AppImage } from '../fourth/AppImage.jsx'
import { getAdvisoryCopy } from '../fourth/copy.js'

const MotionDiv = motion.div

export function SixthAboutSection({ locale = 'en' }) {
  const copy = getAdvisoryCopy(locale).about

  return (
    <section id="about" className="bg-[#f7f9fc] py-20 lg:py-24">
      <div className="mx-auto max-w-[1380px] px-4 sm:px-6 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start lg:gap-14">
          <MotionDiv
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.24 }}
            transition={{ duration: 0.68, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="text-xs font-bold uppercase tracking-[0.24em] text-[#2d6cdf]">{copy.label}</div>
            <h2 className="mt-4 max-w-[11ch] text-[2.9rem] font-extrabold leading-[0.95] tracking-[-0.04em] text-slate-950 sm:text-[3.8rem]">
              {copy.titleFirst}
              <span className="block text-slate-500">{copy.titleAccent}</span>
            </h2>
            <p className="mt-6 max-w-3xl text-base leading-8 text-black">{copy.coreMessage}</p>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {copy.values.map((value, index) => (
                <MotionDiv
                  key={value.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.16 }}
                  transition={{ duration: 0.56, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-[1.6rem] border border-white bg-white p-5 shadow-[0_16px_40px_rgba(15,23,42,0.04)]"
                >
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#081a42] text-white shadow-[0_14px_28px_rgba(8,26,66,0.14)]">
                    <AppIcon name={value.icon} size={20} />
                  </div>
                  <div className="mt-4 text-lg font-bold text-slate-950">{value.title}</div>
                  <p className="mt-3 text-sm leading-7 text-black">{value.desc}</p>
                </MotionDiv>
              ))}
            </div>
          </MotionDiv>

          <MotionDiv
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.22 }}
            transition={{ duration: 0.68, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden rounded-[2rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#eef4ff_100%)] lg:self-start"
          >
            <div className="relative h-full">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(45,108,223,0.14),transparent_30%)]" aria-hidden="true" />
              <div className="grid h-full gap-0 lg:grid-rows-[0.78fr_1fr]">
                <div className="relative min-h-[220px] overflow-hidden border-b border-slate-200 sm:min-h-[240px] lg:min-h-[320px]">
                  <AppImage
                    src={aboutImpactImage}
                    fallbackSrc="/advisory-hero.svg"
                    alt={copy.brandLogoAlt}
                    fill
                    className="h-full w-full object-cover object-left-center opacity-95"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,26,66,0.18)_0%,rgba(8,26,66,0.12)_36%,rgba(8,26,66,0.42)_100%)]" />
                  <div className="absolute inset-x-0 top-0 p-5 sm:p-6">
                    <div className="rounded-[1.5rem] border border-white/14 bg-white/10 p-4 text-white backdrop-blur-md sm:p-5">
                      <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/70">{copy.brandName}</div>
                      <div className="mt-3 text-2xl font-extrabold leading-tight">{copy.motto}</div>
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 p-5 sm:p-6 lg:grid-cols-2">
                  <div className="relative overflow-hidden rounded-[1.5rem] bg-white p-5 shadow-[0_14px_30px_rgba(15,23,42,0.04)]">
                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden="true">
                      <AppIcon name="RocketLaunchIcon" size={132} className="text-[#2d6cdf]/[0.16]" strokeWidth={1.4} />
                    </div>
                    <div className="relative z-10 text-base font-extrabold uppercase tracking-[0.14em] text-slate-700 sm:text-lg">{copy.visionTitle}</div>
                    <p className="relative z-10 mt-3 text-sm leading-7 text-black">{copy.visionText}</p>
                  </div>
                  <div className="relative overflow-hidden rounded-[1.5rem] bg-[#081a42] p-5 text-white shadow-[0_18px_36px_rgba(8,26,66,0.18)]">
                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden="true">
                      <AppIcon name="ClipboardDocumentCheckIcon" size={132} className="text-white/[0.16]" strokeWidth={1.4} />
                    </div>
                    <div className="relative z-10 text-base font-extrabold uppercase tracking-[0.14em] text-white/90 sm:text-lg">{copy.missionTitle}</div>
                    <p className="relative z-10 mt-3 text-sm leading-7 text-white/78">{copy.missionText}</p>
                  </div>
                </div>
              </div>
            </div>
          </MotionDiv>
        </div>
      </div>
    </section>
  )
}