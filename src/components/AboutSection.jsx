import { BriefcaseBusiness, Compass, Target } from 'lucide-react'
import { MotionDiv, reveal } from './shared.js'

export function AboutSection({ content }) {
  return (
    <section id="about" className="bg-surfaceLow px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:gap-14">
        <MotionDiv {...reveal} className="space-y-6">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-label text-secondary">{content.about.badge}</p>
            <h2 className="font-display text-4xl font-extrabold tracking-editorial text-primary sm:text-5xl">
              {content.about.title}
            </h2>
          </div>
          <div className="card rounded-[1.5rem] bg-surfaceLowest shadow-ambient">
            <div className="card-body gap-6 p-7">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary/8">
                  <img src="/amc2.png" alt={content.brand.blueLogoAlt} className="h-11 w-11 object-contain" />
                </div>
                <div>
                  <h3 className="font-display text-2xl font-extrabold text-primary">{content.about.profileTitle}</h3>
                  <p className="mt-1 text-sm leading-6 text-secondary">{content.about.profileSubtitle}</p>
                </div>
              </div>

              <div className="space-y-4 text-[15px] leading-8 text-onSurface/82">
                {content.about.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </MotionDiv>

        <MotionDiv {...reveal} transition={{ duration: 0.75, ease: 'easeOut', delay: 0.1 }} className="grid gap-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-[1.5rem] bg-primaryContainer p-7 text-slate-50">
              <div className="mb-5 flex items-center gap-3 text-sm font-semibold uppercase tracking-label text-slate-200">
                <Compass size={18} /> {content.about.visionTitle}
              </div>
              <p className="text-base leading-8 text-slate-100/92">{content.about.visionText}</p>
            </div>

            <div className="rounded-[1.5rem] bg-surfaceLowest p-7 shadow-ambient">
              <div className="mb-5 flex items-center gap-3 text-sm font-semibold uppercase tracking-label text-secondary">
                <Target size={18} /> {content.about.missionTitle}
              </div>
              <p className="text-base leading-8 text-onSurface/80">{content.about.missionText}</p>
            </div>
          </div>

          <div className="rounded-[1.5rem] bg-surfaceLowest p-7 shadow-ambient">
            <div className="mb-6 flex items-center gap-3 text-sm font-semibold uppercase tracking-label text-secondary">
              <BriefcaseBusiness size={18} /> {content.about.practiceAreasTitle}
            </div>
            <div className="flex flex-wrap gap-3">
              {content.about.expertise.map((item) => (
                <span key={item} className="rounded-full bg-surfaceLow px-4 py-2 text-sm font-medium text-primary">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </MotionDiv>
      </div>
    </section>
  )
}