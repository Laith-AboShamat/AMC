import { useEffect, useRef, useState } from 'react'
import { AppIcon } from './AppIcon.jsx'
import { getAdvisoryCopy } from './copy.js'

const initialForm = {
  name: '',
  email: '',
  company: '',
  role: '',
  service: '',
  message: '',
}

export function FourthContactSection({ locale = 'en' }) {
  const revealRef = useRef(null)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState(initialForm)
  const copy = getAdvisoryCopy(locale).contact

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 },
    )

    if (revealRef.current) {
      observer.observe(revealRef.current)
    }

    return () => observer.disconnect()
  }, [])

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
    <section id="contact" className="py-20 lg:py-28 bg-[var(--bg-white)]">
      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        <div ref={revealRef} className="advisory-reveal-hidden grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <div className="flex flex-col justify-between">
            <div>
              <span className="advisory-section-label block mb-3">{copy.label}</span>
              <h2 className="advisory-display text-4xl sm:text-5xl text-[var(--navy-dark)] leading-tight mb-5">
                {copy.titleFirst}
                <br />
                <span className="italic font-light text-[var(--text-secondary)]">{copy.titleAccent}</span>
              </h2>
              <p className="text-[var(--text-secondary)] text-base leading-relaxed mb-10 max-w-md">
                {copy.description}
              </p>

              <div className="space-y-6">
                {copy.process.map((step, index) => (
                  <div key={step.title} className="flex items-start gap-4">
                    <div className="flex-shrink-0 relative">
                      <div className="w-11 h-11 rounded-xl bg-[var(--blue-pale)] flex items-center justify-center">
                        <AppIcon name={step.icon} size={20} className="text-[var(--blue-accent)]" />
                      </div>
                      {index < copy.process.length - 1 ? (
                        <div className="absolute top-full left-1/2 -translate-x-1/2 w-px h-6 bg-[var(--border-mid)] mt-1" />
                      ) : null}
                    </div>
                    <div className="pt-1">
                      <h4 className="font-semibold text-[var(--navy-dark)] text-sm mb-1">{step.title}</h4>
                      <p className="text-[var(--text-muted)] text-sm leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10 pt-8 border-t border-[var(--border-light)] grid grid-cols-1 sm:grid-cols-2 gap-5">
              {copy.contacts.map((contact) => (
                <div key={contact.label} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[var(--blue-pale)] flex items-center justify-center flex-shrink-0">
                    <AppIcon name={contact.icon} size={18} className="text-[var(--blue-accent)]" />
                  </div>
                  <div>
                    <div className="text-xs text-[var(--text-muted)] font-medium mb-0.5">{contact.label}</div>
                    <div
                      dir={contact.icon === 'PhoneIcon' ? 'ltr' : undefined}
                      className={`text-sm font-semibold text-[var(--navy-dark)] ${
                        contact.icon === 'PhoneIcon' ? 'advisory-phone-value' : ''
                      }`}
                    >
                      {contact.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-[var(--border-light)] bg-[var(--bg-cool)] p-6 sm:p-8 lg:p-10">
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full min-h-[320px] sm:min-h-[400px] text-center gap-5">
                <div className="w-16 h-16 rounded-full bg-[var(--blue-pale)] flex items-center justify-center">
                  <AppIcon name="CheckCircleIcon" size={36} className="text-[var(--blue-accent)]" />
                </div>
                <h3 className="advisory-display text-2xl text-[var(--navy-dark)]">{copy.submittedTitle}</h3>
                <p className="text-[var(--text-secondary)] text-sm leading-relaxed max-w-xs">
                  {copy.submittedText}
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false)
                    setForm(initialForm)
                  }}
                  className="advisory-btn-outline px-6 py-2.5 rounded-full text-sm font-semibold mt-2"
                  type="button"
                >
                  {copy.sendAnother}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <h3 className="advisory-display text-xl text-[var(--navy-dark)] mb-1">{copy.formTitle}</h3>
                <p className="text-xs text-[var(--text-muted)] mb-4">{copy.formNote}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[var(--navy-dark)] mb-1.5" htmlFor="advisory-name">{copy.fields.name}</label>
                    <input id="advisory-name" type="text" name="name" value={form.name} onChange={handleChange} required placeholder={copy.placeholders.name} className="advisory-form-input w-full px-4 py-3 rounded-xl border border-[var(--border-mid)] bg-[var(--bg-white)] text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] min-h-[44px]" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[var(--navy-dark)] mb-1.5" htmlFor="advisory-email">{copy.fields.email}</label>
                    <input id="advisory-email" type="email" name="email" value={form.email} onChange={handleChange} required placeholder={copy.placeholders.email} className="advisory-form-input w-full px-4 py-3 rounded-xl border border-[var(--border-mid)] bg-[var(--bg-white)] text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] min-h-[44px]" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[var(--navy-dark)] mb-1.5" htmlFor="advisory-company">{copy.fields.company}</label>
                    <input id="advisory-company" type="text" name="company" value={form.company} onChange={handleChange} required placeholder={copy.placeholders.company} className="advisory-form-input w-full px-4 py-3 rounded-xl border border-[var(--border-mid)] bg-[var(--bg-white)] text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] min-h-[44px]" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[var(--navy-dark)] mb-1.5" htmlFor="advisory-role">{copy.fields.role}</label>
                    <input id="advisory-role" type="text" name="role" value={form.role} onChange={handleChange} placeholder={copy.placeholders.role} className="advisory-form-input w-full px-4 py-3 rounded-xl border border-[var(--border-mid)] bg-[var(--bg-white)] text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] min-h-[44px]" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[var(--navy-dark)] mb-1.5" htmlFor="advisory-service">{copy.fields.service}</label>
                  <select id="advisory-service" name="service" value={form.service} onChange={handleChange} required className="advisory-form-input w-full px-4 py-3 rounded-xl border border-[var(--border-mid)] bg-[var(--bg-white)] text-sm text-[var(--text-primary)] min-h-[44px] appearance-none">
                    <option value="">{copy.placeholders.service}</option>
                    {copy.services.map((service) => (
                      <option key={service} value={service}>{service}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[var(--navy-dark)] mb-1.5" htmlFor="advisory-message">{copy.fields.message}</label>
                  <textarea id="advisory-message" name="message" value={form.message} onChange={handleChange} required rows={4} placeholder={copy.placeholders.message} className="advisory-form-input w-full px-4 py-3 rounded-xl border border-[var(--border-mid)] bg-[var(--bg-white)] text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] resize-none" />
                </div>

                <button type="submit" disabled={loading} className="advisory-btn-primary w-full py-3.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2.5 min-h-[44px] disabled:opacity-70 disabled:cursor-not-allowed">
                  {loading ? (
                    <>
                      <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8v8H4Z" />
                      </svg>
                      {copy.submitting}
                    </>
                  ) : (
                    <>
                      {copy.submit}
                      <AppIcon name="ArrowRightIcon" size={16} />
                    </>
                  )}
                </button>

                <p className="text-[10px] text-[var(--text-muted)] text-center leading-relaxed">
                  {copy.disclaimer}
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}