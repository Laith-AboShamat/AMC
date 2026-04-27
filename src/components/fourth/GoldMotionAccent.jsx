import { AppIcon } from './AppIcon.jsx'

export function GoldMotionAccent({ variant = 'inline', className = '' }) {
  const size = variant === 'scroll' ? 10 : 9

  return (
    <span className={`advisory-gold-motion advisory-gold-motion-${variant} ${className}`.trim()} aria-hidden="true">
      <AppIcon
        name="SparklesIcon"
        size={size}
        strokeWidth={2.2}
        className="advisory-gold-motion-icon"
      />
    </span>
  )
}