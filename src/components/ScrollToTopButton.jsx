import { useEffect, useRef, useState } from 'react'
import { ArrowUp } from 'lucide-react'

export function ScrollToTopButton({ locale = 'en', offset = 0, label }) {
  const [visible, setVisible] = useState(false)
  const [lightStyle, setLightStyle] = useState(false)
  const buttonRef = useRef(null)
  const frameRef = useRef(0)
  const isRtl = locale === 'ar'

  useEffect(() => {
    const isNavyColor = (color) => {
      const match = color?.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i)

      if (!match) {
        return false
      }

      const r = Number(match[1])
      const g = Number(match[2])
      const b = Number(match[3])
      const isDark = r < 60 && g < 80 && b < 130
      const isBlueDominant = b > r && b > g

      return isDark && isBlueDominant
    }

    const hasNavyBehindButton = () => {
      const x = isRtl ? 30 : window.innerWidth - 30
      const y = window.innerHeight - (30 + offset)

      const candidates = document.elementsFromPoint(x, y)
      let element = candidates.find((node) => (buttonRef.current ? !buttonRef.current.contains(node) : true))

      const sectionNode = element?.closest?.('#results, footer')
      if (sectionNode) {
        return true
      }

      while (element && element !== document.body) {
        const bg = window.getComputedStyle(element).backgroundColor

        if (bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') {
          return isNavyColor(bg)
        }

        element = element.parentElement
      }

      return false
    }

    const updateButtonState = () => {
      if (frameRef.current) {
        return
      }

      frameRef.current = window.requestAnimationFrame(() => {
        frameRef.current = 0
        const nextVisible = window.scrollY > window.innerHeight * 0.5
        setVisible(nextVisible)
        setLightStyle(nextVisible ? hasNavyBehindButton() : false)
      })
    }

    updateButtonState()
    window.addEventListener('scroll', updateButtonState, { passive: true })
    window.addEventListener('resize', updateButtonState)

    return () => {
      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current)
        frameRef.current = 0
      }
      window.removeEventListener('scroll', updateButtonState)
      window.removeEventListener('resize', updateButtonState)
    }
  }, [isRtl, offset])

  return (
    <button
      ref={buttonRef}
      type="button"
      aria-label={label}
      title={label}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={`fixed bottom-5 z-[70] inline-flex h-12 w-12 items-center justify-center rounded-full border backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 ${
        lightStyle
          ? 'border-white/90 bg-white text-[#081a42] shadow-[0_18px_34px_rgba(15,23,42,0.18)] hover:bg-slate-100'
          : 'border-[#162d5c] bg-[#0f2148] text-white shadow-[0_18px_34px_rgba(8,26,66,0.24)] hover:bg-[#162d5c]'
      } ${
        isRtl ? 'left-5' : 'right-5'
      } ${visible ? 'pointer-events-auto translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'}`}
      style={{ bottom: `${20 + offset}px` }}
    >
      <ArrowUp size={18} />
    </button>
  )
}