import { useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { AppIcon } from '../fourth/AppIcon.jsx'
import { getAdvisoryCopy } from '../fourth/copy.js'

const MotionDiv = motion.div

function FooterActionLink({ href, icon, label, external = false, direction = 'ltr' }) {
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
      className="inline-flex items-center gap-3 text-sm font-semibold text-white/82 transition-all duration-300 hover:-translate-y-0.5 hover:text-white"
    >
      <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#081a42] text-white shadow-[0_14px_28px_rgba(2,12,32,0.22)] transition-colors duration-300 hover:bg-[#12316e]">
        <AppIcon name={icon} size={16} />
      </span>
      <span className="min-w-0" dir={direction}>
        {label}
      </span>
    </a>
  )
}

function FooterDialog({ title, sections, onClose, isRtl }) {
  const dialog = (
    <AnimatePresence>
      <MotionDiv
        className="fixed inset-0 z-[120] overflow-y-auto bg-[rgba(2,12,32,0.82)] p-2 backdrop-blur-md sm:p-4 lg:p-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <MotionDiv
          initial={{ opacity: 0, y: 18, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.98 }}
          transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
          onClick={(event) => event.stopPropagation()}
          className={`relative flex min-h-[calc(100vh-1rem)] w-full flex-col overflow-hidden rounded-[1.4rem] border border-white/10 bg-[linear-gradient(180deg,#0a1d49_0%,#071634_100%)] text-white shadow-[0_28px_80px_rgba(0,0,0,0.34)] sm:min-h-[calc(100vh-2rem)] sm:rounded-[1.8rem] ${isRtl ? 'text-right' : 'text-left'}`}
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-[#10275d] text-white transition hover:bg-[#173777] sm:right-5 sm:top-5"
            aria-label="Close dialog"
          >
            <AppIcon name="XMarkIcon" size={18} />
          </button>

          <div className="border-b border-white/10 px-5 pb-5 pt-6 pr-16 sm:px-8 sm:pb-6 sm:pt-8 sm:pr-20">
            <div className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#8eb7ff]">AMC</div>
            <h3 className="mt-3 max-w-[22ch] text-[1.8rem] font-extrabold leading-[1] text-white sm:text-[2.4rem]">{title}</h3>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-white/72 sm:text-[0.98rem]">
              {isRtl
                ? 'اعرض جميع التفاصيل داخل النافذة ومرر المحتوى بسهولة دون أن ينقطع أو يخرج خارج الشاشة.'
                : 'Read the full information inside the dialog with a dedicated scroll area that stays fully visible on screen.'}
            </p>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-8 sm:py-7">
            <div className="grid gap-4 sm:gap-5">
            {sections.map((section) => (
              <div
                key={section.heading}
                className="rounded-[1.35rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.04))] p-5 backdrop-blur-md sm:rounded-[1.45rem] sm:p-6"
              >
                <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#8eb7ff]">{section.heading}</div>
                <div className="mt-3 text-[0.97rem] leading-8 text-white/88 sm:text-[1rem]">{section.body}</div>
              </div>
            ))}
            </div>
          </div>
        </MotionDiv>
      </MotionDiv>
    </AnimatePresence>
  )

  return typeof document === 'undefined' ? dialog : createPortal(dialog, document.body)
}

export function SixthFooter({ locale = 'en' }) {
  const advisory = getAdvisoryCopy(locale)
  const copy = advisory.footer
  const isRtl = locale === 'ar'
  const brandLine = advisory.header.brandLine
  const [activeDialog, setActiveDialog] = useState(null)
  const [subscriberEmail, setSubscriberEmail] = useState('')
  const [subscribeSubmitted, setSubscribeSubmitted] = useState(false)

  const footerLabels = locale === 'ar'
    ? {
        subscribeTitle: 'اشترك',
        subscribeText: 'اختر الموضوعات التي تهمك وابقَ على اطلاع بآخر الرؤى والخدمات من AMC.',
        subscribePlaceholder: 'البريد الإلكتروني',
        subscribeButton: 'اشتراك',
        subscribeSuccess: 'تم استلام بريدك. سنشاركك آخر الرؤى والتحديثات المهمة.',
        faq: 'الأسئلة الشائعة',
        privacy: 'سياسة الخصوصية',
        rights: '© 2026 AMC. جميع الحقوق محفوظة.',
      }
    : {
        subscribeTitle: 'Subscribe',
        subscribeText: 'Select topics and stay current with AMC insights, services, and practical updates.',
        subscribePlaceholder: 'Email address',
        subscribeButton: 'Submit',
        subscribeSuccess: 'Your email has been received. We will share relevant AMC insights and updates.',
        faq: 'FAQ',
        privacy: 'Privacy Policy',
        rights: '© 2026 AMC. All rights reserved.',
      }

  const dialogContent = useMemo(() => {
    if (locale === 'ar') {
      return {
        faq: {
          title: 'الأسئلة الشائعة',
          sections: [
            {
              heading: 'ما الذي تقدمه AMC؟',
              body: `نقدّم أربع خدمات رئيسية: ${advisory.services.cards.map((item) => item.title).join('، ')}. نعمل على إزالة الهدر التشغيلي، رفع الضبط، وتحويل الأنظمة إلى أداء عملي قابل للقياس.`,
            },
            {
              heading: 'كيف تبدأون العمل؟',
              body: `${advisory.contact.formNote} نبدأ بفهم التحدي، ثم نطابقك مع المسار والخدمة الأنسب، وبعدها ننتقل إلى تنفيذ عملي يركز على النتائج لا على التقارير فقط.`,
            },
            {
              heading: 'ما الذي يميز طريقة العمل؟',
              body: `${advisory.about.coreMessage} نحن نعمل كشريك حقيقي داخل المؤسسة ونبني أثرًا مستدامًا لا يعتمد على وجودنا المستمر بعد انتهاء المشروع.`,
            },
          ],
        },
        privacy: {
          title: 'سياسة الخصوصية',
          sections: [
            {
              heading: 'البيانات التي نجمعها',
              body: 'نجمع فقط البيانات التي تقدمها طوعًا عبر نماذج التواصل أو الاشتراك، مثل الاسم، البريد الإلكتروني، الشركة، والرسالة المرسلة.',
            },
            {
              heading: 'كيفية استخدام البيانات',
              body: 'نستخدم هذه البيانات للرد على الاستفسارات، مشاركة التحديثات ذات الصلة، وتحسين تجربة التواصل مع خدمات AMC.',
            },
            {
              heading: 'حماية البيانات',
              body: `${advisory.contact.disclaimer.replace('Privacy Policy', 'سياسة الخصوصية')} نتعامل مع معلوماتك بسرية ولا نبيعها أو نشاركها مع أطراف خارجية دون داعٍ مشروع متعلق بخدمتك.`,
            },
          ],
        },
      }
    }

    return {
      faq: {
        title: 'FAQ',
        sections: [
          {
            heading: 'What does AMC do?',
            body: `AMC delivers four core services: ${advisory.services.cards.map((item) => item.title).join(', ')}. Each offer is built to remove operational drag, strengthen control, and create measurable organizational performance.`,
          },
          {
            heading: 'How do engagements start?',
            body: `${advisory.contact.formNote} We begin by understanding the business challenge, match you with the right service path, and move into practical execution focused on outcomes rather than theoretical recommendations.`,
          },
          {
            heading: 'What makes the approach different?',
            body: `${advisory.about.coreMessage} AMC works as a real partner inside the organization and builds systems that continue to perform after the engagement ends.`,
          },
        ],
      },
      privacy: {
        title: 'Privacy Policy',
        sections: [
          {
            heading: 'What we collect',
            body: 'We only collect information you choose to provide through inquiry or subscription forms, such as name, email, company details, and your message.',
          },
          {
            heading: 'How we use it',
            body: 'We use submitted information to respond to inquiries, share relevant AMC updates, and improve how we support organizations exploring our services.',
          },
          {
            heading: 'How we protect it',
            body: `${advisory.contact.disclaimer} Your information is handled confidentially and is not sold or shared with third parties except where necessary to support your inquiry or service delivery.`,
          },
        ],
      },
    }
  }, [advisory, locale])

  const scrollTo = (href) => {
    const id = href.replace('#', '')
    const element = document.getElementById(id)
    if (!element) {
      return
    }

    const top = element.getBoundingClientRect().top + window.scrollY - 104
    window.scrollTo({ top, behavior: 'smooth' })
  }

  const handleSubscribe = (event) => {
    event.preventDefault()
    if (!subscriberEmail.trim()) {
      return
    }

    setSubscribeSubmitted(true)
    setSubscriberEmail('')
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
          className="grid gap-10 border-b border-white/10 pb-8 lg:grid-cols-[minmax(0,1.05fr)_180px_260px_minmax(280px,360px)] lg:items-start lg:gap-12"
        >
          <div className={`flex flex-col gap-4 ${isRtl ? 'items-end text-right' : 'items-start text-left'}`}>
            <img src="/amc1.png" alt="AMC logo" className="h-20 w-20 object-contain" />
            <div className="relative inline-block overflow-hidden">
              <MotionDiv
                aria-hidden="true"
                animate={{ x: ['-35%', '135%'], opacity: [0, 1, 0] }}
                transition={{ duration: 4.6, repeat: Infinity, repeatDelay: 1, ease: 'easeInOut' }}
                className="pointer-events-none absolute inset-y-0 left-0 w-28 bg-[linear-gradient(90deg,rgba(255,255,255,0),rgba(142,183,255,0.42),rgba(255,255,255,0))] blur-xl"
              />
              <MotionDiv
                animate={{ opacity: [0.86, 1, 0.9] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                className="relative text-[2rem] font-extrabold leading-none tracking-[0.1em] text-white drop-shadow-[0_0_16px_rgba(142,183,255,0.28)] sm:text-[2.35rem]"
              >
                AMC
              </MotionDiv>
            </div>
            <p className="max-w-sm text-sm leading-7 text-white/78">{brandLine}</p>
            <p className="max-w-sm text-sm font-semibold leading-7 text-white/92">The Institutional Excellence Partner</p>
          </div>

          <div className={`flex flex-col gap-4 pt-2 ${isRtl ? 'items-end text-right' : 'items-start text-left'}`}>
            {copy.nav.map((item) => (
              <button
                key={item.href}
                type="button"
                onClick={() => scrollTo(item.href)}
                className="w-fit text-[1.1rem] font-semibold text-white/82 transition-all duration-300 hover:-translate-y-0.5 hover:text-white"
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className={`flex flex-col gap-4 pt-2 ${isRtl ? 'items-end text-right' : 'items-start text-left'}`}>
            <FooterActionLink
              href="mailto:a.mahameed@amcco.ps"
              icon="EnvelopeIcon"
              label="a.mahameed@amcco.ps"
              direction="ltr"
            />

            <FooterActionLink
              href="tel:+970592397405"
              icon="PhoneIcon"
              label="+970-592-397-405"
              direction="ltr"
            />

            {copy.socials.map((item) => (
              <FooterActionLink
                key={item.label}
                href={item.href}
                icon={item.icon}
                label={item.label}
                external
                direction={isRtl ? 'rtl' : 'ltr'}
              />
            ))}
          </div>

          <div className={`pt-2 ${isRtl ? 'text-right' : 'text-left'}`}>
            <div className="w-full rounded-[1.6rem] border border-white/10 bg-white/6 p-5 backdrop-blur-md">
              <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#8eb7ff]">{footerLabels.subscribeTitle}</div>
              <p className="mt-3 text-sm leading-7 text-white/74">{footerLabels.subscribeText}</p>

              <form onSubmit={handleSubscribe} className="mt-4 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                <input
                  type="email"
                  value={subscriberEmail}
                  onChange={(event) => setSubscriberEmail(event.target.value)}
                  placeholder={footerLabels.subscribePlaceholder}
                  className="h-12 flex-1 rounded-full border border-white/12 bg-[#081a42] px-4 text-sm text-white outline-none transition placeholder:text-white/34 focus:border-[#8eb7ff]"
                />
                <button
                  type="submit"
                  className="inline-flex h-12 shrink-0 items-center justify-center rounded-full bg-white px-5 text-sm font-semibold text-[#081a42] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/92 hover:shadow-[0_18px_34px_rgba(125,177,255,0.16)]"
                >
                  {footerLabels.subscribeButton}
                </button>
              </form>

              {subscribeSubmitted ? <p className="mt-3 text-sm leading-7 text-white/78">{footerLabels.subscribeSuccess}</p> : null}
            </div>
          </div>
        </MotionDiv>

        <MotionDiv
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.18 }}
          transition={{ duration: 0.56, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className={`mt-6 flex flex-col gap-4 pt-6 text-sm text-white/72 ${isRtl ? 'lg:flex-row-reverse' : 'lg:flex-row'} lg:items-center lg:justify-between`}
        >
          <div className={`flex flex-wrap gap-5 ${isRtl ? 'lg:flex-row-reverse' : ''}`}>
            <button type="button" onClick={() => setActiveDialog('faq')} className="transition hover:text-white">
              {footerLabels.faq}
            </button>
            <button type="button" onClick={() => setActiveDialog('privacy')} className="transition hover:text-white">
              {footerLabels.privacy}
            </button>
          </div>

          <div className={isRtl ? 'lg:text-left' : 'lg:text-right'}>{footerLabels.rights}</div>
        </MotionDiv>
      </div>

      {activeDialog ? (
        <FooterDialog
          title={dialogContent[activeDialog].title}
          sections={dialogContent[activeDialog].sections}
          onClose={() => setActiveDialog(null)}
          isRtl={isRtl}
        />
      ) : null}
    </footer>
  )
}
