import { Building2, Factory, GraduationCap } from 'lucide-react'
import { MotionArticle, MotionDiv, reveal } from './shared.js'

const serviceIcons = [Building2, Factory, GraduationCap]

export function ServicesSection({ content }) {
  return (
    <section id="services" className="px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <MotionDiv {...reveal} className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-label text-secondary">{content.services.badge}</p>
            <h2 className="font-display text-4xl font-extrabold tracking-editorial text-primary sm:text-5xl">
              {content.services.title}
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-8 text-onSurface/78">{content.services.intro}</p>
        </MotionDiv>

        <div className="mt-10 grid gap-5 xl:grid-cols-3">
          {content.services.cards.map((service, index) => {
            const Icon = serviceIcons[index]

            return (
              <MotionArticle key={service.title} {...reveal} className="service-card rounded-[1.75rem] bg-surfaceLowest p-7 shadow-ambient">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-card bg-primary text-white">
                  <Icon size={24} />
                </div>
                <h3 className="font-display text-2xl font-extrabold tracking-editorial text-primary">
                  {service.title}
                </h3>
                <p className="mt-4 text-base leading-8 text-onSurface/78">{service.description}</p>
                <div className="mt-6 rounded-[1.25rem] bg-surfaceLow p-5">
                  <p className="text-xs font-semibold uppercase tracking-label text-secondary">
                    {content.services.impactLabel}
                  </p>
                  <p className="mt-2 text-sm leading-7 text-primary">{service.outcome}</p>
                </div>
              </MotionArticle>
            )
          })}
        </div>

        <MotionDiv {...reveal} className="mt-12 rounded-[2rem] bg-primaryContainer px-7 py-8 text-slate-50 sm:px-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-label text-slate-200">
                {content.services.extendedSupportTitle}
              </p>
              <p className="mt-3 max-w-3xl text-lg leading-8 text-slate-100/92">
                {content.services.extendedSupportText}
              </p>
            </div>
            <a href="#contact" className="btn rounded-card border-0 bg-white px-6 text-sm font-semibold normal-case text-primary shadow-none hover:scale-[0.98] hover:bg-slate-100">
              {content.services.extendedSupportCta}
            </a>
          </div>
        </MotionDiv>
      </div>
    </section>
  )
}