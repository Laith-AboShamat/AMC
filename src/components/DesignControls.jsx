import { createElement } from 'react'
import { Languages, MoonStar, SunMedium } from 'lucide-react'

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

export function DesignControls({ content, locale, theme, onLocaleChange, onThemeChange }) {
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