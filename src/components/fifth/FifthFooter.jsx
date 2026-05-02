import { AppIcon } from '../fourth/AppIcon.jsx'
import { getAdvisoryCopy } from '../fourth/copy.js'

export function FifthFooter({ locale = 'en' }) {
  const copy = getAdvisoryCopy(locale).footer

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
    <footer className="px-4 pb-8 pt-4 sm:px-6 lg:px-10 lg:pb-10">
      <div className="mx-auto max-w-[1380px] rounded-[2rem] border border-slate-200 bg-white px-6 py-6 shadow-[0_20px_60px_rgba(15,23,42,0.05)] sm:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="text-sm font-bold uppercase tracking-[0.22em] text-slate-950">AMC</div>
            <div className="mt-2 text-sm leading-7 text-slate-500">{copy.copyright}</div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {copy.nav.map((item) => (
              <button
                key={item.href}
                type="button"
                onClick={() => scrollTo(item.href)}
                className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:text-slate-950"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-4 border-t border-slate-200 pt-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            {copy.socials.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-[#2d6cdf] hover:text-[#2d6cdf]"
              >
                <AppIcon name={item.icon} size={16} />
                {item.label}
              </a>
            ))}
          </div>

          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            {copy.backToTop}
          </button>
        </div>
      </div>
    </footer>
  )
}