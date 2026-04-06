import { createElement, useState } from 'react'
import { Languages, Menu, MoonStar, SunMedium, X } from 'lucide-react'

function ControlButton({ active, icon, label, onClick, children }) {
  const Icon = icon

  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      aria-pressed={active}
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold transition max-sm:px-2.5 max-sm:py-2 max-sm:text-xs ${
        active
          ? 'bg-primary text-primary-content'
          : 'text-base-content/70 hover:bg-base-100 hover:text-primary'
      }`}
    >
      {Icon ? createElement(Icon, { size: 14 }) : null}
      <span>{children}</span>
    </button>
  )
}

function UnifiedControls({ content, locale, theme, onLocaleChange, onThemeChange }) {
  return (
    <div className="flex items-center rounded-full bg-base-200/90 p-1 text-xs shadow-ambient backdrop-blur-md max-sm:gap-0.5 max-sm:p-0.5">
      <div className="flex items-center gap-1 pr-1">
        <ControlButton
          active={locale === 'en'}
          icon={Languages}
          label={content.controls.englishLabel}
          onClick={() => onLocaleChange('en')}
        >
          {content.controls.english}
        </ControlButton>
        <ControlButton
          active={locale === 'ar'}
          label={content.controls.arabicLabel}
          onClick={() => onLocaleChange('ar')}
        >
          {content.controls.arabic}
        </ControlButton>
      </div>

      <span className="h-6 w-px bg-base-content/10" aria-hidden="true" />

      <div className="flex items-center gap-1 pl-1">
        <ControlButton
          active={theme === 'light'}
          icon={SunMedium}
          label={content.controls.light}
          onClick={() => onThemeChange('light')}
        >
          {content.controls.light}
        </ControlButton>
        <ControlButton
          active={theme === 'dark'}
          icon={MoonStar}
          label={content.controls.dark}
          onClick={() => onThemeChange('dark')}
        >
          {content.controls.dark}
        </ControlButton>
      </div>
    </div>
  )
}

function MobileMenu({ content, onNavigate }) {
  return (
    <div className="mt-3 flex basis-full flex-col gap-3 rounded-[1.5rem] bg-base-200/70 p-4 lg:hidden">
      <a href="#about" className="rounded-xl px-3 py-2 text-sm font-semibold text-secondary transition hover:bg-base-100 hover:text-primary" onClick={onNavigate}>
        {content.nav.about}
      </a>
      <a href="#methodology" className="rounded-xl px-3 py-2 text-sm font-semibold text-secondary transition hover:bg-base-100 hover:text-primary" onClick={onNavigate}>
        {content.nav.methodology}
      </a>
      <a href="#services" className="rounded-xl px-3 py-2 text-sm font-semibold text-secondary transition hover:bg-base-100 hover:text-primary" onClick={onNavigate}>
        {content.nav.services}
      </a>
      <a href="#contact" className="rounded-xl px-3 py-2 text-sm font-semibold text-secondary transition hover:bg-base-100 hover:text-primary" onClick={onNavigate}>
        {content.nav.contact}
      </a>
      <a href="#contact" className="btn btn-primary mt-2 rounded-card border-0 text-sm font-semibold normal-case shadow-none" onClick={onNavigate}>
        {content.header.cta}
      </a>
    </div>
  )
}

export function Header({ content, locale, theme, onLocaleChange, onThemeChange }) {
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)
  const toggleMenu = () => setMenuOpen((open) => !open)

  return (
    <header className="sticky top-0 z-50 px-4 py-4 sm:px-6 lg:px-10">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-4 rounded-card bg-base-100/78 px-4 py-3 shadow-ambient backdrop-blur-xl sm:px-6">
        <a href="#top" className="flex min-w-0 items-center gap-3">
          <img src="/amc2.png" alt={content.brand.logoAlt} className="h-11 w-11" />
          <div className="min-w-0">
            <p className="font-display text-sm font-extrabold uppercase tracking-label text-primary">
              {content.brand.name}
            </p>
            <p className="truncate text-xs uppercase tracking-[0.18em] text-secondary max-sm:hidden">
              {content.brand.tagline}
            </p>
          </div>
        </a>

        <div className="hidden flex-1 items-center justify-center gap-6 text-sm font-medium text-secondary lg:flex">
          <a href="#about" className="transition hover:text-primary">
            {content.nav.about}
          </a>
          <a href="#methodology" className="transition hover:text-primary">
            {content.nav.methodology}
          </a>
          <a href="#services" className="transition hover:text-primary">
            {content.nav.services}
          </a>
          <a href="#contact" className="transition hover:text-primary">
            {content.nav.contact}
          </a>
        </div>

        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <UnifiedControls
            content={content}
            locale={locale}
            theme={theme}
            onLocaleChange={onLocaleChange}
            onThemeChange={onThemeChange}
          />

          <a href="#contact" className="hidden btn btn-primary rounded-card border-0 px-5 text-sm font-semibold normal-case shadow-none md:inline-flex">
            {content.header.cta}
          </a>

          <button
            type="button"
            aria-label={menuOpen ? content.controls.closeMenu : content.controls.openMenu}
            title={menuOpen ? content.controls.closeMenu : content.controls.openMenu}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-base-200/90 text-base-content transition hover:bg-base-100 hover:text-primary lg:hidden"
            onClick={toggleMenu}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {menuOpen ? <MobileMenu content={content} onNavigate={closeMenu} /> : null}
      </div>
    </header>
  )
}