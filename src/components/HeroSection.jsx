import { ArrowRight, Sparkles } from 'lucide-react'
import { MotionDiv, reveal } from './shared.js'

export function HeroSection({ content }) {
  return (
    <section className="px-4 pb-16 pt-6 sm:px-6 lg:px-10 lg:pb-24">
      <div className="hero-shell mx-auto grid max-w-7xl gap-8 overflow-hidden rounded-[2rem] bg-hero-gradient px-6 py-8 text-slate-50 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:px-12 lg:py-14">
        <MotionDiv {...reveal} className="flex flex-col justify-between gap-10">
          <div className="space-y-6">
            <div className="inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-slate-100 backdrop-blur-md">
              <Sparkles size={14} />
              {content.hero.badge}
            </div>
            <div className="max-w-3xl space-y-5">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-200/80">
                {content.hero.eyebrow}
              </p>
              <h1 className="font-display text-5xl font-extrabold leading-none tracking-editorial sm:text-6xl lg:text-7xl">
                {content.hero.title}
              </h1>
              <p className="max-w-2xl text-base leading-8 text-slate-200 sm:text-lg">
                {content.hero.description}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
            <a href="#services" className="btn rounded-card border-0 bg-white px-6 text-sm font-semibold normal-case text-primary shadow-none hover:scale-[0.98] hover:bg-slate-100">
              {content.hero.primaryCta}
              <ArrowRight size={16} />
            </a>
            <a href="#methodology" className="btn rounded-card border-0 bg-white/10 px-6 text-sm font-semibold normal-case text-white shadow-none backdrop-blur-md hover:scale-[0.98] hover:bg-white/15">
              {content.hero.secondaryCta}
            </a>
          </div>
        </MotionDiv>

        <MotionDiv {...reveal} transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }} className="grid gap-5 lg:pl-8">
          <div className="rounded-[1.5rem] bg-white/10 p-6 backdrop-blur-md">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-200/80">
                  {content.hero.brandMarkTitle}
                </p>
                <p className="mt-2 max-w-xs text-sm leading-7 text-slate-200">
                  {content.hero.brandMarkDescription}
                </p>
              </div>
              <img src="/amc1.png" alt={content.brand.silverLogoAlt} className="h-24 w-24 object-contain" />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {content.hero.highlights.map((item) => (
                <div key={item.label} className="rounded-xl bg-white/10 p-4">
                  <p className="text-xs uppercase tracking-[0.22em] text-slate-200/75">{item.label}</p>
                  <p className="mt-2 text-sm font-medium text-white">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {content.hero.stats.map((item) => (
              <div key={item.value} className="rounded-[1.25rem] bg-white/95 p-5 text-primary shadow-ambient">
                <p className="font-display text-2xl font-extrabold tracking-editorial">{item.value}</p>
                <p className="mt-2 text-sm leading-6 text-secondary">{item.label}</p>
              </div>
            ))}
          </div>
        </MotionDiv>
      </div>
    </section>
  )
}