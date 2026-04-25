import { useEffect, useRef, useState } from 'react'
import { getAdvisoryCopy } from './copy.js'

function ImpactItem({ item, index, visible }) {
  return (
    <div
      className={`advisory-stat-divider advisory-reveal-hidden advisory-delay-${Math.min(index * 150, 700)} flex min-h-[180px] flex-col items-center justify-center px-6 py-8 text-center sm:px-8 sm:py-10 ${visible ? 'is-visible' : ''}`}
    >
      <div className="advisory-display text-2xl sm:text-3xl lg:text-[2.35rem] font-semibold text-white leading-tight mb-3 max-w-[14ch]">
        {item.title}
      </div>
      <div className="text-sm sm:text-[15px] text-white/68 font-medium leading-7 max-w-[28ch]">
        {item.sub}
      </div>
    </div>
  )
}

export function FourthStatsSection({ locale = 'en' }) {
  const sectionRef = useRef(null)
  const [visible, setVisible] = useState(false)
  const statsBand = getAdvisoryCopy(locale).statsBand
  const items = statsBand.items

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
      <div className="advisory-stats-band relative z-10">
        <div className="absolute top-0 left-[10%] w-48 h-48 sm:w-72 sm:h-72 lg:left-1/4 lg:w-96 lg:h-96 rounded-full bg-[var(--blue-accent)] opacity-10 blur-[90px] lg:blur-[120px] advisory-blob pointer-events-none" />
        <div className="absolute bottom-0 right-[8%] w-44 h-44 sm:w-64 sm:h-64 lg:right-1/4 lg:w-80 lg:h-80 rounded-full bg-[var(--gold)] opacity-10 blur-[80px] lg:blur-[100px] advisory-blob-slow pointer-events-none" />

        <div className="max-w-7xl mx-auto px-5 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 divide-y md:divide-x md:divide-y xl:divide-y-0 divide-white/10">
            {items.map((item, index) => (
              <ImpactItem key={item.title} item={item} index={index} visible={visible} />
            ))}
          </div>

          {statsBand.closing ? (
            <div className={`advisory-reveal-hidden advisory-delay-700 border-t border-white/10 ${visible ? 'is-visible' : ''}`}>
              <div className="flex min-h-[136px] flex-col items-center justify-center px-6 py-8 text-center sm:px-10">
                <div className="advisory-display text-2xl sm:text-3xl font-semibold text-white leading-tight mb-2">
                  {statsBand.closing.title}
                </div>
                <div className="text-sm sm:text-base text-white/68 font-medium leading-7">
                  {statsBand.closing.sub}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}