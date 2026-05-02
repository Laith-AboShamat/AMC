import { motion } from 'framer-motion'
import { AppIcon } from '../fourth/AppIcon.jsx'
import { AppImage } from '../fourth/AppImage.jsx'
import { getAdvisoryCopy } from '../fourth/copy.js'

const MotionDiv = motion.div

export function FifthAboutSection({ locale = 'en' }) {
  const copy = getAdvisoryCopy(locale).about

  return (
    <section id="about" className="px-4 py-20 sm:px-6 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-[1380px] space-y-6">
        <MotionDiv
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.68, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_24px_64px_rgba(15,23,42,0.05)]"
        >
          <div className="grid gap-0 lg:grid-cols-[1.08fr_0.92fr]">
            <div className="p-6 sm:p-8 lg:p-10">
              <div className="text-xs font-bold uppercase tracking-[0.24em] text-[#2d6cdf]">{copy.label}</div>
              <h2 className="mt-4 max-w-[11ch] text-[2.9rem] font-extrabold leading-[0.95] tracking-[-0.04em] text-slate-950 sm:text-[3.8rem]">
                {copy.titleFirst}
                <span className="block text-slate-500">{copy.titleAccent}</span>
              </h2>
              <p className="mt-6 max-w-3xl text-base leading-8 text-slate-600">{copy.coreMessage}</p>

              <div className="mt-8 grid gap-4 md:grid-cols-2">
                <div className="rounded-[1.5rem] bg-[#f7f9fc] p-5">
                  <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">{copy.visionTitle}</div>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{copy.visionText}</p>
                </div>
                <div className="rounded-[1.5rem] bg-[#eef4ff] p-5">
                  <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#2d6cdf]">{copy.missionTitle}</div>
                  <p className="mt-3 text-sm leading-7 text-slate-700">{copy.missionText}</p>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden border-t border-slate-200 bg-[linear-gradient(180deg,#f8fafc_0%,#eef4ff_100%)] lg:border-l lg:border-t-0">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(45,108,223,0.14),transparent_30%)]" aria-hidden="true" />
              <div className="relative flex h-full flex-col justify-between p-6 sm:p-8 lg:p-10">
                <div className="rounded-[1.5rem] border border-white/80 bg-white/90 p-5 shadow-[0_18px_40px_rgba(15,23,42,0.05)]">
                  <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">{copy.brandName}</div>
                  <div className="mt-4 flex items-center gap-4">
                    <AppImage src="/amc1.png" alt={copy.brandLogoAlt} width={72} height={72} className="h-16 w-16 rounded-2xl border border-slate-200 bg-white p-2 object-contain" />
                    <div className="text-xl font-extrabold leading-tight text-slate-950">{copy.motto}</div>
                  </div>
                </div>

                <div className="mt-6 rounded-[1.75rem] border border-slate-200 bg-slate-950 p-6 text-white">
                  <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/60">{copy.approachLabel}</div>
                  <div className="mt-4 space-y-4">
                    {copy.values.map((value) => (
                      <div key={value.title} className="rounded-[1.25rem] border border-white/10 bg-white/5 p-4">
                        <div className="flex items-center gap-3">
                          <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-[#8eb7ff]">
                            <AppIcon name={value.icon} size={20} />
                          </div>
                          <div className="text-lg font-bold">{value.title}</div>
                        </div>
                        <p className="mt-3 text-sm leading-7 text-white/78">{value.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MotionDiv>
      </div>
    </section>
  )
}