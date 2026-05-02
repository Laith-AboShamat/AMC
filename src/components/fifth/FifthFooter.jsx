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
    <footer className="relative z-10 mt-10 w-full border-t border-white/10 bg-[linear-gradient(180deg,#081a42_0%,#04112f_100%)] px-4 pb-8 pt-10 text-white sm:px-6 lg:px-10 lg:pb-10">
      <div className="mx-auto max-w-[1380px] px-2 sm:px-0">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="text-sm font-bold uppercase tracking-[0.22em] text-white">AMC</div>
            <div className="mt-2 max-w-xl text-sm leading-7 text-white/62">{copy.copyright}</div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {copy.nav.map((item) => (
              <button
                key={item.href}
                type="button"
                onClick={() => scrollTo(item.href)}
                className="rounded-full border border-white/12 bg-white/8 px-4 py-2 text-sm font-semibold text-white/74 transition hover:border-white/20 hover:bg-white/12 hover:text-white"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-4 border-t border-white/10 pt-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            {copy.socials.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-white/12 bg-white/8 px-4 py-2 text-sm font-semibold text-white/76 transition hover:border-white/20 hover:bg-white/12 hover:text-white"
              >
                <AppIcon name={item.icon} size={16} />
                {item.label}
              </a>
            ))}
          </div>

          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-white/12 bg-white px-5 py-2.5 text-sm font-semibold text-[#081a42] transition hover:bg-white/92"
          >
            {copy.backToTop}
          </button>
        </div>
      </div>
    </footer>
  )
}