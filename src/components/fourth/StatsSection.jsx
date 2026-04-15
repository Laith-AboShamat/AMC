import { useEffect, useRef, useState } from 'react'
import { getAdvisoryCopy } from './copy.js'

function useCountUp(target, duration, start) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!start) {
      return undefined
    }

    let startTime = null
    let frame = 0
    const isDecimal = target % 1 !== 0

    const step = (timestamp) => {
      if (!startTime) {
        startTime = timestamp
      }

      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - (1 - progress) ** 3
      const current = eased * target
      setCount(isDecimal ? Number(current.toFixed(1)) : Math.floor(current))

      if (progress < 1) {
        frame = window.requestAnimationFrame(step)
      }
    }

    frame = window.requestAnimationFrame(step)
    return () => window.cancelAnimationFrame(frame)
  }, [duration, start, target])

  return count
}

function StatItem({ stat, index, visible }) {
  const count = useCountUp(stat.value, 1800, visible)

  return (
    <div
      className={`advisory-stat-divider flex flex-col items-center justify-center px-8 py-10 text-center advisory-reveal-hidden advisory-delay-${Math.min(index * 100, 700)} ${visible ? 'is-visible' : ''}`}
    >
      <div className="advisory-display text-5xl sm:text-6xl font-semibold text-white leading-none mb-2">
        {stat.prefix ?? ''}
        {count}
        {stat.suffix}
      </div>
      <div className="text-sm font-semibold text-white/90 mb-1">{stat.label}</div>
      <div className="text-xs text-white/50 font-medium">{stat.sub}</div>
    </div>
  )
}

export function FourthStatsSection({ locale = 'en' }) {
  const sectionRef = useRef(null)
  const [visible, setVisible] = useState(false)
  const stats = getAdvisoryCopy(locale).statsBand.items

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-0">
      <div
        className="relative z-10"
        style={{ background: 'linear-gradient(135deg, #0D1B2A 0%, #1B3A6B 50%, #1E3A5F 100%)' }}
      >
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-[var(--blue-accent)] opacity-10 blur-[120px] advisory-blob pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-[var(--gold)] opacity-10 blur-[100px] advisory-blob-slow pointer-events-none" />

        <div className="max-w-7xl mx-auto px-5 sm:px-6 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-white/10">
            {stats.map((stat, index) => (
              <StatItem key={stat.label} stat={stat} index={index} visible={visible} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}