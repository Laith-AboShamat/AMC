import { useState } from 'react'

export function AppImage({
  src,
  alt,
  className = '',
  fallbackSrc = '/amc2.png',
  fill = false,
  sizes,
  onClick,
  ...props
}) {
  const [imageSrc, setImageSrc] = useState(src)

  if (fill) {
    return (
      <img
        src={imageSrc}
        alt={alt}
        className={className}
        sizes={sizes}
        onClick={onClick}
        onError={() => setImageSrc(fallbackSrc)}
        {...props}
      />
    )
  }

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={className}
      onClick={onClick}
      onError={() => setImageSrc(fallbackSrc)}
      {...props}
    />
  )
}