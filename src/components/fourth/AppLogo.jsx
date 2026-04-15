import { AppImage } from './AppImage.jsx'
import { AppIcon } from './AppIcon.jsx'

export function AppLogo({
  src = '/amc2.png',
  iconName = 'SparklesIcon',
  size = 64,
  className = '',
  onClick,
}) {
  return (
    <div className={`flex items-center ${onClick ? 'cursor-pointer' : ''} ${className}`} onClick={onClick}>
      {src ? (
        <AppImage src={src} alt="AMC logo" width={size} height={size} className="flex-shrink-0" />
      ) : (
        <AppIcon name={iconName} size={size} className="flex-shrink-0" />
      )}
    </div>
  )
}