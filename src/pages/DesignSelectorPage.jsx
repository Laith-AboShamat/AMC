import { ArrowRight, Building2, LayoutTemplate, Layers3, Palette } from 'lucide-react'
import { Link } from 'react-router-dom'
import { DesignControls } from '../components/DesignControls.jsx'
import { motion } from 'framer-motion'

const MotionDiv = motion.div
const MotionArticle = motion.article

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.6, ease: 'easeOut' },
}

const designIcons = [LayoutTemplate, Layers3, Palette, Building2]

function PreviewPanel({ design, index, openLabel }) {
  const Icon = designIcons[index]

  return (
    <MotionArticle {...reveal} className="group flex h-full flex-col overflow-hidden rounded-[2rem] bg-surfaceLowest p-6 shadow-ambient ring-1 ring-primary/5 transition duration-300 hover:-translate-y-1 hover:ring-primary/15 sm:p-7">
      <div className="mb-5 flex items-center justify-between gap-4">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-card bg-primary text-white">
          <Icon size={22} />
        </div>
        <span className="rounded-full bg-surfaceLow px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
          {design.library}
        </span>
      </div>

      <div className={`preview-stage preview-${design.slug} flex min-h-[220px] flex-1 flex-col rounded-[1.5rem] p-5`}>
        {design.slug === 'editorial' ? (
          <>
            <div className="mb-4 h-20 rounded-[1.25rem] bg-hero-gradient p-4 text-white">
              <div className="h-2 w-24 rounded-full bg-white/70" />
              <div className="mt-3 h-2 w-40 rounded-full bg-white/35" />
              <div className="mt-5 grid grid-cols-3 gap-2">
                <div className="h-8 rounded bg-white/20" />
                <div className="h-8 rounded bg-white/12" />
                <div className="h-8 rounded bg-white/12" />
              </div>
            </div>
            <div className="grid flex-1 gap-3">
              <div className="rounded-[1.1rem] bg-surfaceLow p-4">
                <div className="h-2 w-28 rounded-full bg-primary/30" />
                <div className="mt-3 h-2 w-full rounded-full bg-primary/10" />
                <div className="mt-2 h-2 w-4/5 rounded-full bg-primary/10" />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-[1rem] bg-surfaceLow p-3" />
                <div className="rounded-[1rem] bg-surfaceLow p-3" />
                <div className="rounded-[1rem] bg-surfaceLow p-3" />
              </div>
            </div>
          </>
        ) : null}

        {design.slug === 'mantine' ? (
          <>
            <div className="rounded-[1.35rem] bg-[#13233d] p-5 text-white">
              <div className="inline-flex rounded-full bg-[#28446f] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#d2e0f6]">
                Insight View
              </div>
              <div className="mt-4 h-3 w-3/4 rounded-full bg-white/80" />
              <div className="mt-2 h-2 w-2/3 rounded-full bg-white/30" />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-[1.1rem] bg-white p-4 shadow-[0_10px_24px_rgba(17,35,64,0.08)]">
                <div className="h-2 w-16 rounded-full bg-[#2e4a77]/30" />
                <div className="mt-4 h-10 w-10 rounded-full bg-[#edf3ff]" />
              </div>
              <div className="rounded-[1.1rem] bg-[#edf3ff] p-4">
                <div className="h-2 w-12 rounded-full bg-[#2e4a77]/25" />
                <div className="mt-4 space-y-2">
                  <div className="h-2 rounded-full bg-[#2e4a77]/15" />
                  <div className="h-2 w-4/5 rounded-full bg-[#2e4a77]/15" />
                </div>
              </div>
            </div>
            <div className="mt-4 rounded-[1.1rem] border border-dashed border-[#9fb2d1] bg-white/70 p-4" />
          </>
        ) : null}

        {design.slug === 'executive' ? (
          <>
            <div className="rounded-[1.25rem] bg-[#101828] p-5 text-white">
              <div className="flex items-center justify-between">
                <div className="h-2 w-24 rounded-full bg-[#86efac]/70" />
                <div className="h-7 w-7 rounded-full border border-white/15" />
              </div>
              <div className="mt-4 h-10 rounded-[0.85rem] bg-[#1d2939] p-3">
                <div className="h-2 w-2/3 rounded-full bg-white/70" />
              </div>
            </div>
            <div className="mt-4 grid grid-cols-[1.15fr_0.85fr] gap-3">
              <div className="rounded-[1.1rem] bg-white p-4 shadow-[0_10px_24px_rgba(17,24,39,0.08)]">
                <div className="mb-3 h-2 w-20 rounded-full bg-[#0f172a]/15" />
                <div className="space-y-2">
                  <div className="h-2 rounded-full bg-[#0f172a]/10" />
                  <div className="h-2 w-4/5 rounded-full bg-[#0f172a]/10" />
                </div>
              </div>
              <div className="rounded-[1.1rem] bg-[#eef2ff] p-4">
                <div className="mb-3 h-10 w-10 rounded-full bg-[#c7d2fe]" />
                <div className="h-2 w-16 rounded-full bg-[#3730a3]/20" />
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <div className="h-2 flex-1 rounded-full bg-[#0f172a]/10" />
              <div className="h-2 w-1/3 rounded-full bg-[#4f46e5]/30" />
            </div>
          </>
        ) : null}

        {design.slug === 'advisory' ? (
          <>
            <div className="rounded-[1.3rem] bg-[linear-gradient(135deg,#0d1b2a_0%,#1b3a6b_100%)] p-5 text-white">
              <div className="inline-flex rounded-full border border-[#c8a96e]/40 bg-white/8 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#f0ddbb]">
                Fourth Direction
              </div>
              <div className="mt-4 h-3 w-3/4 rounded-full bg-white/80" />
              <div className="mt-2 h-2 w-2/3 rounded-full bg-white/30" />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-[1.1rem] bg-[#2e6be6] p-4 text-white">
                <div className="h-2 w-14 rounded-full bg-white/50" />
                <div className="mt-4 text-2xl font-bold">100%</div>
              </div>
              <div className="rounded-[1.1rem] bg-white p-4 shadow-[0_10px_24px_rgba(17,35,64,0.08)]">
                <div className="h-2 w-16 rounded-full bg-[#2e4a77]/30" />
                <div className="mt-4 space-y-2">
                  <div className="h-2 rounded-full bg-[#2e4a77]/15" />
                  <div className="h-2 w-4/5 rounded-full bg-[#2e4a77]/15" />
                </div>
              </div>
            </div>
            <div className="mt-4 rounded-[1.1rem] bg-[#f5f7fb] p-4">
              <div className="grid grid-cols-3 gap-2">
                <div className="h-16 rounded-xl bg-[#e8effe]" />
                <div className="h-16 rounded-xl bg-[#0d1b2a]" />
                <div className="h-16 rounded-xl bg-[#f5ecd8]" />
              </div>
            </div>
          </>
        ) : null}
      </div>

      <div className="mt-6 space-y-3">
        <div className="flex items-center justify-between gap-4">
          <h3 className="font-display text-2xl font-extrabold tracking-editorial text-primary">
            {design.title}
          </h3>
          <span className="text-sm font-medium text-secondary">0{index + 1}</span>
        </div>
        <p className="text-sm leading-7 text-onSurface/78">{design.description}</p>
        <ul className="space-y-2 text-sm text-secondary">
          {design.bullets.map((bullet) => (
            <li key={bullet} className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              {bullet}
            </li>
          ))}
        </ul>
      </div>

      <Link to={design.href} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary transition group-hover:gap-3">
        {openLabel}
        <ArrowRight size={16} />
      </Link>
    </MotionArticle>
  )
}

export function DesignSelectorPage({ content, locale, onLocaleChange }) {
  return (
    <div className="px-4 py-6 sm:px-6 lg:px-10 lg:py-8">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-4 rounded-card bg-base-100/78 px-4 py-3 shadow-ambient backdrop-blur-xl sm:px-6">
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

        <div className="ml-auto">
          <DesignControls
            content={content}
            locale={locale}
            onLocaleChange={onLocaleChange}
          />
        </div>
      </div>

      <section className="mx-auto mt-8 max-w-7xl">
        <MotionDiv {...reveal} className="selector-hero overflow-hidden rounded-[2rem] bg-hero-gradient px-6 py-8 text-slate-50 sm:px-8 lg:px-12 lg:py-12">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div className="space-y-5">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-200/80">
                {content.selector.eyebrow}
              </p>
              <h1 className="font-display text-4xl font-extrabold tracking-editorial sm:text-5xl lg:text-6xl">
                {content.selector.title}
              </h1>
              <p className="max-w-2xl text-base leading-8 text-slate-200/92">
                {content.selector.description}
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {content.selector.highlights.map((item) => (
                <div key={item.label} className="rounded-[1.2rem] bg-white/10 p-4 backdrop-blur-md">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-200/80">{item.label}</p>
                  <p className="mt-2 text-sm leading-6 text-white">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </MotionDiv>

        <div className="mt-8 grid gap-6 xl:grid-cols-3">
          {content.selector.designs.map((design, index) => (
            <PreviewPanel
              key={design.slug}
              design={design}
              index={index}
              openLabel={content.selector.openDesign}
            />
          ))}
        </div>
      </section>
    </div>
  )
}