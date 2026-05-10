import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, ChevronDown, Menu, X } from 'lucide-react'
import { AppIcon } from '../fourth/AppIcon.jsx'
import { getAdvisoryCopy } from '../fourth/copy.js'

const sectionIds = ['hero', 'services', 'about', 'results', 'contact']
const MotionDiv = motion.div

function toBriefText(text, maxLength = 108) {
  if (!text) {
    return ''
  }

  const normalized = text.replace(/\s+/g, ' ').trim()
  const firstSentence = normalized.split(/[.!؟]\s/)[0]?.trim() ?? normalized

  if (firstSentence.length <= maxLength) {
    return firstSentence
  }

  return `${firstSentence.slice(0, maxLength).trim()}...`
}

export function SixthHeader({ content, locale }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const [openPreview, setOpenPreview] = useState(null)
  const [panelTop, setPanelTop] = useState(88)
  const headerRef = useRef(null)
  const copy = getAdvisoryCopy(locale)
  const isRtl = locale === 'ar'

  const navItems = useMemo(
    () => [
      {
        id: 'hero',
        label: copy.header.nav.home,
        title: copy.hero.eyebrow.tail,
        description: copy.hero.description,
        tone: 'hero',
        cards: [
          {
            title: copy.hero.visualEyebrow,
            description: toBriefText(copy.hero.visualNoteTitle),
          },
          ...copy.hero.stats.slice(0, 2).map((item) => ({
            title: item.value,
            description: toBriefText(item.label, 82),
          })),
        ],
      },
      {
        id: 'services',
        label: copy.header.nav.services,
        title: `${copy.services.titleFirst} ${copy.services.titleAccent}`,
        description: copy.services.intro,
        tone: 'services',
        cards: copy.services.cards.slice(0, 4).map((item) => ({
          title: item.title,
          description: toBriefText(item.metric, 56),
        })),
      },
      {
        id: 'about',
        label: copy.header.nav.about,
        title: `${copy.about.titleFirst} ${copy.about.titleAccent}`,
        description: copy.about.coreMessage,
        tone: 'about',
        cards: [
          ...copy.about.values.map((item) => ({
            title: item.title,
            description: toBriefText(item.desc),
          })),
          {
            title: copy.about.visionTitle,
            description: toBriefText(copy.about.visionText),
          },
        ],
      },
      {
        id: 'results',
        label: copy.header.nav.results,
        title: copy.outcomes.title,
        description: copy.outcomes.subtitle,
        tone: 'results',
        cards: copy.outcomes.items.map((item) => ({
          title: item.title,
          description: toBriefText(item.description),
        })),
      },
      {
        id: 'contact',
        label: copy.header.nav.contact,
        title: `${copy.contact.titleFirst} ${copy.contact.titleAccent}`,
        description: copy.contact.description,
        tone: 'contact',
        companyInfo: {
          name: content.brand.name,
          email: copy.contact.contacts[0]?.value ?? 'a.mahameed@amcco.ps',
          phone: copy.contact.contacts[1]?.value ?? '+970-592-397-405',
        },
      },
    ],
    [content.brand.name, copy],
  )

  useEffect(() => {
    const updatePanelTop = () => {
      if (!headerRef.current) {
        return
      }

      setPanelTop(headerRef.current.getBoundingClientRect().bottom)
    }

    updatePanelTop()

    const handleScroll = () => {
      setScrolled(window.scrollY > 18)
      updatePanelTop()

      const scrollMarker = window.scrollY + 160
      let nextActiveSection = 'hero'

      sectionIds.forEach((id) => {
        const element = document.getElementById(id)
        if (element && scrollMarker >= element.offsetTop) {
          nextActiveSection = id
        }
      })

      setActiveSection(nextActiveSection)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setOpenPreview(null)
      }
    }

    document.addEventListener('mousedown', handlePointerDown)

    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
    }
  }, [])

  const handleNavClick = (id) => {
    setMenuOpen(false)
    setOpenPreview(null)

    const element = document.getElementById(id)
    if (!element) {
      return
    }

    const top = element.getBoundingClientRect().top + window.scrollY - 108
    window.scrollTo({ top, behavior: 'smooth' })
  }

  const activePreviewItem = navItems.find((item) => item.id === openPreview) ?? null
  const isContactPreview = activePreviewItem?.id === 'contact'

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 w-full border-b border-white/10 bg-[linear-gradient(180deg,rgba(2,16,45,0.98),rgba(7,24,62,0.94))] shadow-[0_18px_40px_rgba(2,12,32,0.18)] backdrop-blur-xl"
    >
      <div
        className={`mx-auto flex max-w-[1380px] flex-wrap items-center gap-4 px-4 py-4 text-white transition duration-300 sm:px-6 lg:px-10 ${
          scrolled ? 'shadow-none' : ''
        }`}
      >
        <div className="flex min-w-0 items-center gap-3">
          <button type="button" onClick={() => handleNavClick('hero')} className="flex min-w-0 items-center gap-3 text-left transition-all duration-300 hover:-translate-y-0.5">
            <span className="inline-flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl bg-white/10 p-1.5 shadow-[0_12px_24px_rgba(0,0,0,0.16)] backdrop-blur-md">
              <img src="/amc1.png" alt={content.brand.logoAlt} className="h-[142%] w-[142%] max-w-none object-contain" />
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-bold uppercase tracking-[0.22em] text-white">{content.brand.name}</p>
              <p className="truncate text-xs font-medium uppercase tracking-[0.18em] text-white/56 max-sm:hidden">{copy.header.brandLine}</p>
            </div>
          </button>
        </div>

        <nav className="hidden flex-1 items-center justify-center gap-2 lg:flex">
          {navItems.map((item) => {
            const isActive = activeSection === item.id
            const isOpen = openPreview === item.id

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setOpenPreview((current) => (current === item.id ? null : item.id))}
                aria-expanded={isOpen}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 ${
                  isActive || isOpen
                    ? 'bg-white text-[#081a42] shadow-[0_12px_24px_rgba(0,0,0,0.22)] hover:shadow-[0_16px_28px_rgba(0,0,0,0.24)]'
                    : 'text-white/70 hover:bg-white/10 hover:text-white hover:shadow-[0_14px_26px_rgba(2,12,32,0.18)]'
                }`}
              >
                <span>{item.label}</span>
                <ChevronDown size={15} className={`transition ${isOpen ? 'rotate-180' : ''}`} />
              </button>
            )
          })}
        </nav>

        <div className="ml-auto hidden items-center gap-3 lg:flex">
          <button
            type="button"
            onClick={() => handleNavClick('contact')}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-white/12 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-[#9fc0ff] hover:bg-[#8eb7ff] hover:text-[#081a42] hover:shadow-[0_18px_32px_rgba(2,12,32,0.22)]"
          >
            {content.header.cta}
            <ArrowRight size={15} className={isRtl ? 'rotate-180' : ''} />
          </button>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? content.controls.closeMenu : content.controls.openMenu}
          className="ml-auto inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/8 text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/12 hover:shadow-[0_16px_28px_rgba(2,12,32,0.2)] lg:hidden"
        >
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>

        {menuOpen ? (
          <div className="flex basis-full flex-col gap-3 rounded-[1.5rem] border border-white/12 bg-[#0b1d49]/94 p-4 text-white shadow-[0_18px_45px_rgba(0,0,0,0.18)] backdrop-blur-xl lg:hidden">
            {navItems.map((item) => {
              const isOpen = openPreview === item.id

              return (
                <div key={item.id} className="rounded-[1.25rem] border border-white/8 bg-white/6 p-3">
                  <button
                    type="button"
                    onClick={() => setOpenPreview((current) => (current === item.id ? null : item.id))}
                    className={`flex min-h-[44px] w-full items-center justify-between gap-3 text-left text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 ${
                      activeSection === item.id ? 'text-white' : 'text-white/82'
                    } ${isRtl ? 'flex-row-reverse text-right' : ''}`}
                  >
                    <span>{item.label}</span>
                    <ChevronDown size={15} className={`transition ${isOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isOpen ? (
                    <div className={`mt-3 border-t border-slate-300/70 pt-3 ${isRtl ? 'text-right' : 'text-left'}`}>
                      <div className="text-lg font-bold text-slate-950">{item.title}</div>
                      <p className="mt-2 text-sm leading-7 text-black">{item.description}</p>
                      <button
                        type="button"
                        onClick={() => handleNavClick(item.id)}
                        className="mt-4 inline-flex min-h-[44px] items-center gap-2 rounded-full bg-[#0f2148] px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#162d5c] hover:shadow-[0_18px_34px_rgba(8,26,66,0.24)]"
                      >
                        {copy.header.previewCta}
                        <ArrowRight size={15} className={isRtl ? 'rotate-180' : ''} />
                      </button>
                    </div>
                  ) : null}
                </div>
              )
            })}

            <button
              type="button"
              onClick={() => handleNavClick('contact')}
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-2xl border border-white/12 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/14 hover:shadow-[0_18px_34px_rgba(2,12,32,0.22)]"
            >
              {content.header.cta}
              <ArrowRight size={15} className={isRtl ? 'rotate-180' : ''} />
            </button>
          </div>
        ) : null}

      </div>

      <AnimatePresence>
        {activePreviewItem ? (
          <MotionDiv
            className="pointer-events-none fixed left-0 right-0 z-[60] hidden lg:block"
            style={{ top: `${panelTop}px` }}
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="w-screen">
              <div className="pointer-events-auto w-screen overflow-hidden border-y border-slate-300/80 bg-[linear-gradient(135deg,#d9dde3_0%,#f3f5f7_42%,#c7ccd4_100%)] shadow-[0_26px_60px_rgba(15,23,42,0.18)]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.72),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(148,163,184,0.2),transparent_22%)]" />
                <div className="px-6 py-8 lg:px-10 xl:px-12">
                  <div className={`relative z-10 grid gap-6 xl:grid-cols-[minmax(280px,360px)_minmax(0,1fr)_auto] xl:items-start ${isRtl ? 'text-right' : 'text-left'}`}>
                    <div className="min-w-0">
                      <div className="max-w-[16ch] text-[2.2rem] font-extrabold leading-[0.98] text-slate-950">{activePreviewItem.title}</div>
                    </div>

                    <div className="min-w-0">
                      <p className="w-full text-sm leading-8 text-black xl:text-[15px]">
                        {activePreviewItem.description}
                      </p>
                    </div>

                    <div className={`flex ${isRtl ? 'xl:justify-start' : 'xl:justify-end'}`}>
                      <button
                        type="button"
                        onClick={() => handleNavClick(activePreviewItem.id)}
                        className="inline-flex min-h-[44px] shrink-0 items-center gap-2 rounded-full bg-[#0f2148] px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#162d5c] hover:shadow-[0_18px_34px_rgba(8,26,66,0.24)]"
                      >
                        {copy.header.previewCta}
                        <ArrowRight size={15} className={isRtl ? 'rotate-180' : ''} />
                      </button>
                    </div>
                  </div>

                  {isContactPreview ? (
                    <div className="relative z-10 mt-7 grid gap-5 xl:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)]">
                      <MotionDiv
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.32, delay: 0.04 }}
                        className="rounded-[1.6rem] border border-slate-300/80 bg-white/70 px-5 py-5 text-slate-950 shadow-[0_12px_28px_rgba(15,23,42,0.08)] backdrop-blur-md"
                      >
                        <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">{activePreviewItem.companyInfo.name}</div>
                        <p className="mt-3 max-w-3xl text-sm leading-8 text-black">{copy.contact.formNote}</p>
                      </MotionDiv>

                      <MotionDiv
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.32, delay: 0.1 }}
                        className="rounded-[1.6rem] border border-slate-300/80 bg-white/70 px-5 py-5 text-slate-950 shadow-[0_12px_28px_rgba(15,23,42,0.08)] backdrop-blur-md"
                      >
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div>
                            <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">Email</div>
                            <a href={`mailto:${activePreviewItem.companyInfo.email}`} className="mt-2 block text-base font-semibold text-slate-950 hover:text-[#0f2148]">
                              <span dir="ltr">{activePreviewItem.companyInfo.email}</span>
                            </a>
                          </div>
                          <div>
                            <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">Phone</div>
                            <a href="tel:+970592397405" className="mt-2 block text-base font-semibold text-slate-950 hover:text-[#0f2148]">
                              <span dir="ltr">{activePreviewItem.companyInfo.phone}</span>
                            </a>
                          </div>
                        </div>
                      </MotionDiv>
                    </div>
                  ) : (
                    <div className="relative z-10 mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                      {activePreviewItem.cards.map((card, index) => (
                        <MotionDiv
                          key={`${activePreviewItem.id}-${card.title}-${index}`}
                          initial={{ opacity: 0, y: 18 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.32, delay: 0.04 + index * 0.05 }}
                          className="rounded-[1.5rem] border border-slate-300/80 bg-white/72 px-4 py-4 text-slate-950 shadow-[0_12px_28px_rgba(15,23,42,0.08)] backdrop-blur-md"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[#0f2148] text-white">
                              <AppIcon
                                name={
                                  index % 4 === 0
                                    ? 'SparklesIcon'
                                    : index % 4 === 1
                                      ? 'ArrowTrendingUpIcon'
                                      : index % 4 === 2
                                        ? 'LightBulbIcon'
                                        : 'CheckCircleIcon'
                                }
                                size={18}
                              />
                            </span>
                            <MotionDiv
                              className="h-1.5 w-10 rounded-full bg-[linear-gradient(90deg,#94a3b8,#0f2148)]"
                              animate={{ opacity: [0.45, 1, 0.45], scaleX: [0.92, 1, 0.92] }}
                              transition={{ duration: 2.2, repeat: Number.POSITIVE_INFINITY, delay: index * 0.18 }}
                            />
                          </div>
                          <div className="mt-4 text-base font-bold leading-snug text-slate-950">{card.title}</div>
                          <p className="mt-3 text-sm leading-7 text-slate-700">{card.description}</p>
                        </MotionDiv>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </MotionDiv>
        ) : null}
      </AnimatePresence>
    </header>
  )
}