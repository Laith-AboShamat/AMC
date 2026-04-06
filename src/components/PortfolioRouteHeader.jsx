import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { DesignControls } from './DesignControls.jsx'

export function PortfolioRouteHeader({ content, locale, theme, onLocaleChange, onThemeChange, navItems = [] }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 px-4 py-4 sm:px-6 lg:px-10">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-4 rounded-card bg-base-100/78 px-4 py-3 shadow-ambient backdrop-blur-xl sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <img src="/amc2.png" alt={content.brand.logoAlt} className="h-11 w-11" />
            <div className="min-w-0">
              <p className="font-display text-sm font-extrabold uppercase tracking-label text-primary">
                {content.brand.name}
              </p>
              <p className="truncate text-xs uppercase tracking-[0.18em] text-secondary max-sm:hidden">
                {content.brand.tagline}
              </p>
            </div>
          </div>
        </div>

        <nav className="hidden flex-1 items-center justify-center gap-6 text-sm font-medium text-secondary lg:flex">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="transition hover:text-primary">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <DesignControls
            content={content}
            locale={locale}
            theme={theme}
            onLocaleChange={onLocaleChange}
            onThemeChange={onThemeChange}
          />

          <button
            type="button"
            aria-label={menuOpen ? content.controls.closeMenu : content.controls.openMenu}
            title={menuOpen ? content.controls.closeMenu : content.controls.openMenu}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-base-200/90 text-base-content transition hover:bg-base-100 hover:text-primary lg:hidden"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {menuOpen ? (
          <div className="mt-3 flex basis-full flex-col gap-3 rounded-[1.5rem] bg-base-200/70 p-4 lg:hidden">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="rounded-xl px-3 py-2 text-sm font-semibold text-secondary transition hover:bg-base-100 hover:text-primary" onClick={() => setMenuOpen(false)}>
                {item.label}
              </a>
            ))}
          </div>
        ) : null}
      </div>
    </header>
  )
}