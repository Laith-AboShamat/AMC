import { CheckCircle2, Mail, Phone } from 'lucide-react'
import { MotionAside, MotionDiv, reveal } from './shared.js'

export function ContactSection({ content }) {
  return (
    <section id="contact" className="bg-surfaceLow px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_0.9fr]">
        <MotionDiv {...reveal} className="rounded-[2rem] bg-surfaceLowest p-8 shadow-ambient sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-label text-secondary">{content.contact.badge}</p>
          <h2 className="mt-4 font-display text-4xl font-extrabold tracking-editorial text-primary sm:text-5xl">
            {content.contact.title}
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-8 text-onSurface/78">{content.contact.description}</p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <a href={`tel:${content.contactData.phone.replace(/-/g, '')}`} className="contact-card rounded-[1.25rem] bg-surfaceLow p-5 transition hover:bg-primary hover:text-white">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-sharp bg-primary/10 text-primary">
                <Phone size={18} />
              </div>
              <p className="text-xs font-semibold uppercase tracking-label text-secondary">{content.contact.phoneLabel}</p>
              <p className="mt-2 text-lg font-semibold text-primary">{content.contactData.phone}</p>
            </a>

            <a href={`mailto:${content.contactData.email}`} className="contact-card rounded-[1.25rem] bg-surfaceLow p-5 transition hover:bg-primary hover:text-white">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-sharp bg-primary/10 text-primary">
                <Mail size={18} />
              </div>
              <p className="text-xs font-semibold uppercase tracking-label text-secondary">{content.contact.emailLabel}</p>
              <p className="mt-2 break-all text-lg font-semibold text-primary">{content.contactData.email}</p>
            </a>
          </div>
        </MotionDiv>

        <MotionAside {...reveal} transition={{ duration: 0.78, ease: 'easeOut', delay: 0.08 }} className="rounded-[2rem] bg-primary px-8 py-10 text-slate-50">
          <img src="/amc1.png" alt={content.brand.silverLogoAlt} className="h-20 w-20 object-contain" />
          <p className="mt-8 text-sm font-semibold uppercase tracking-label text-slate-200">
            {content.contact.finalPrincipleLabel}
          </p>
          <p className="mt-4 font-display text-3xl font-extrabold tracking-editorial text-white">
            {content.contact.finalPrincipleText}
          </p>

          <div className="mt-8 space-y-5">
            {content.contact.checklist.map((item) => (
              <div key={item} className="flex items-start gap-3">
                <CheckCircle2 size={18} className="mt-1 shrink-0" />
                <p className="text-sm leading-7 text-slate-100/92">{item}</p>
              </div>
            ))}
          </div>
        </MotionAside>
      </div>
    </section>
  )
}