import { ShieldCheck } from 'lucide-react'
import { MotionArticle, MotionDiv, reveal } from './shared.js'

export function PrinciplesSection({ content, isRtl }) {
  return (
    <section className="bg-surfaceLow px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <MotionDiv {...reveal} className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-4">
            <p className="text-sm font-semibold uppercase tracking-label text-secondary">{content.principles.badge}</p>
            <h2 className="font-display text-4xl font-extrabold tracking-editorial text-primary sm:text-5xl">
              {content.principles.title}
            </h2>
          </div>
          <p className="max-w-xl text-base leading-8 text-onSurface/76">{content.principles.intro}</p>
        </MotionDiv>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {content.principles.items.map((item) => (
            <MotionArticle key={item.title} {...reveal} className="group relative overflow-hidden rounded-[1.5rem] bg-surfaceLowest p-7 shadow-ambient">
              <div
                className={`absolute inset-y-6 ${isRtl ? 'right-0' : 'left-0'} w-[2px] origin-top scale-y-0 bg-primary transition duration-300 group-hover:scale-y-100`}
              />
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-sharp bg-primary/8 text-primary">
                <ShieldCheck size={20} />
              </div>
              <h3 className="font-display text-2xl font-extrabold tracking-editorial text-primary">{item.title}</h3>
              <p className="mt-3 text-base leading-8 text-onSurface/78">{item.description}</p>
            </MotionArticle>
          ))}
        </div>
      </div>
    </section>
  )
}