import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { AppIcon } from '../fourth/AppIcon.jsx'
import { getAdvisoryCopy } from '../fourth/copy.js'

const MotionDiv = motion.div

const initialForm = {
  name: '',
  email: '',
  company: '',
  role: '',
  service: '',
  message: '',
}

export function FifthContactSection({ locale = 'en' }) {
  const copy = getAdvisoryCopy(locale).contact
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState(initialForm)

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setLoading(true)

    window.setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 1400)
  }

  return (
    <section id="contact" className="px-4 py-20 sm:px-6 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-[1380px] overflow-hidden rounded-[2.25rem] border border-slate-200 bg-white shadow-[0_30px_90px_rgba(15,23,42,0.06)]">
        <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
          <MotionDiv
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="border-b border-slate-200 bg-[linear-gradient(180deg,#f8fafc_0%,#eef4ff_100%)] p-6 sm:p-8 lg:border-b-0 lg:border-r lg:p-10"
          >
            <div className="text-xs font-bold uppercase tracking-[0.24em] text-[#2d6cdf]">{copy.label}</div>
            <h2 className="mt-4 max-w-[11ch] text-[2.8rem] font-extrabold leading-[0.95] tracking-[-0.04em] text-slate-950 sm:text-[3.7rem]">
              {copy.titleFirst}
              <span className="block text-slate-500">{copy.titleAccent}</span>
            </h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-slate-600">{copy.description}</p>

            <div className="mt-8 space-y-5">
              {copy.process.map((step) => (
                <div key={step.title} className="rounded-[1.5rem] border border-white/80 bg-white/80 p-5 shadow-[0_14px_30px_rgba(15,23,42,0.04)]">
                  <div className="flex items-start gap-4">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eef4ff] text-[#2d6cdf]">
                      <AppIcon name={step.icon} size={21} />
                    </div>
                    <div>
                      <div className="text-base font-bold text-slate-900">{step.title}</div>
                      <div className="mt-1 text-sm leading-7 text-slate-600">{step.desc}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {copy.contacts.map((contact) => (
                <div key={contact.label} className="rounded-[1.5rem] border border-slate-200 bg-white p-4">
                  <div className="flex items-center gap-3">
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-white">
                      <AppIcon name={contact.icon} size={18} />
                    </div>
                    <div>
                      <div className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">{contact.label}</div>
                      <div className="mt-1 text-sm font-semibold text-slate-900" dir={contact.icon === 'PhoneIcon' ? 'ltr' : undefined}>{contact.value}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </MotionDiv>

          <MotionDiv
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="p-6 sm:p-8 lg:p-10"
          >
            {submitted ? (
              <div className="flex min-h-[420px] flex-col items-center justify-center rounded-[2rem] bg-[#f7f9fc] px-6 text-center">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#eef4ff] text-[#2d6cdf]">
                  <AppIcon name="CheckCircleIcon" size={34} />
                </div>
                <h3 className="mt-5 text-3xl font-extrabold tracking-[-0.03em] text-slate-950">{copy.submittedTitle}</h3>
                <p className="mt-3 max-w-md text-sm leading-7 text-slate-600">{copy.submittedText}</p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false)
                    setForm(initialForm)
                  }}
                  className="mt-6 inline-flex min-h-[44px] items-center rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800"
                >
                  {copy.sendAnother}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div>
                  <div className="text-xs font-bold uppercase tracking-[0.22em] text-[#2d6cdf]">{copy.formTitle}</div>
                  <p className="mt-2 text-sm leading-7 text-slate-500">{copy.formNote}</p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-slate-500">{copy.fields.name}</span>
                    <input name="name" value={form.name} onChange={handleChange} required placeholder={copy.placeholders.name} className="h-12 w-full rounded-2xl border border-slate-200 bg-[#f7f9fc] px-4 text-sm text-slate-900 outline-none transition focus:border-[#2d6cdf]" />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-slate-500">{copy.fields.email}</span>
                    <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder={copy.placeholders.email} className="h-12 w-full rounded-2xl border border-slate-200 bg-[#f7f9fc] px-4 text-sm text-slate-900 outline-none transition focus:border-[#2d6cdf]" />
                  </label>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-slate-500">{copy.fields.company}</span>
                    <input name="company" value={form.company} onChange={handleChange} required placeholder={copy.placeholders.company} className="h-12 w-full rounded-2xl border border-slate-200 bg-[#f7f9fc] px-4 text-sm text-slate-900 outline-none transition focus:border-[#2d6cdf]" />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-slate-500">{copy.fields.role}</span>
                    <input name="role" value={form.role} onChange={handleChange} placeholder={copy.placeholders.role} className="h-12 w-full rounded-2xl border border-slate-200 bg-[#f7f9fc] px-4 text-sm text-slate-900 outline-none transition focus:border-[#2d6cdf]" />
                  </label>
                </div>

                <label className="block">
                  <span className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-slate-500">{copy.fields.service}</span>
                  <select name="service" value={form.service} onChange={handleChange} required className="h-12 w-full rounded-2xl border border-slate-200 bg-[#f7f9fc] px-4 text-sm text-slate-900 outline-none transition focus:border-[#2d6cdf]">
                    <option value="">{copy.placeholders.service}</option>
                    {copy.services.map((service) => (
                      <option key={service} value={service}>{service}</option>
                    ))}
                  </select>
                </label>

                <label className="block">
                  <span className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-slate-500">{copy.fields.message}</span>
                  <textarea name="message" value={form.message} onChange={handleChange} required rows={5} placeholder={copy.placeholders.message} className="w-full rounded-[1.5rem] border border-slate-200 bg-[#f7f9fc] px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#2d6cdf]" />
                </label>

                <button type="submit" disabled={loading} className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70">
                  {loading ? copy.submitting : copy.submit}
                  {loading ? null : <ArrowRight size={16} />}
                </button>

                <p className="text-center text-[11px] leading-6 text-slate-400">{copy.disclaimer}</p>
              </form>
            )}
          </MotionDiv>
        </div>
      </div>
    </section>
  )
}