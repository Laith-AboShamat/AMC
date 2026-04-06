import { TrendingUp } from 'lucide-react'
import { MotionDiv, reveal } from './shared.js'

export function MethodologySection({ content, isRtl }) {
  return (
    <section id="methodology" className="px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <MotionDiv {...reveal} className="space-y-6">
          <p className="text-sm font-semibold uppercase tracking-label text-secondary">{content.methodology.badge}</p>
          <h2 className="font-display text-4xl font-extrabold tracking-editorial text-primary sm:text-5xl">
            {content.methodology.title}
          </h2>
          <p className="max-w-xl text-base leading-8 text-onSurface/78">{content.methodology.description}</p>

          <div className="rounded-[1.5rem] bg-surfaceLow p-7">
            <div className="mb-5 flex items-center gap-3 text-sm font-semibold uppercase tracking-label text-secondary">
              <TrendingUp size={18} /> {content.methodology.beliefTitle}
            </div>
            <p className="font-display text-3xl font-extrabold tracking-editorial text-primary sm:text-4xl">
              {content.methodology.beliefText}
            </p>
          </div>
        </MotionDiv>

        <MotionDiv {...reveal} transition={{ duration: 0.8, ease: 'easeOut', delay: 0.12 }} className="grid gap-5">
          {content.methodology.steps.map((item, index) => (
            <div key={item.step} className="tracker-card relative overflow-hidden rounded-[1.5rem] bg-surfaceLowest p-6 shadow-ambient sm:p-7">
              <div className="grid gap-4 md:grid-cols-[92px_1fr] md:items-start">
                <div className="flex items-center gap-4 md:block">
                  <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-sharp bg-primary text-sm font-bold text-white">
                    {item.step}
                  </div>
                  <div
                    className={
                      isRtl
                        ? 'hidden h-full w-px bg-outlineVariant/30 md:mr-[21px] md:block'
                        : 'hidden h-full w-px bg-outlineVariant/30 md:ml-[21px] md:block'
                    }
                  />
                </div>
                <div>
                  <div className="mb-3 flex items-center gap-3">
                    <div className="h-2 w-10 bg-primary" />
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-secondary">
                      {content.methodology.stepLabel} {index + 1}
                    </p>
                  </div>
                  <h3 className="font-display text-2xl font-extrabold tracking-editorial text-primary">
                    {item.title}
                  </h3>
                  <p className="mt-3 max-w-2xl text-base leading-8 text-onSurface/78">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </MotionDiv>
      </div>
    </section>
  )
}