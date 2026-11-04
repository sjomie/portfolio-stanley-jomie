import { GraduationCap } from 'lucide-react'
import { about, associative, education, interests } from '../data/profile'
import Reveal from './Reveal'
import SectionHeader from './SectionHeader'

export default function About() {
  return (
    <section id="about" className="relative bg-ink py-28 md:py-40">
      <div className="container-x">
        <SectionHeader index="01" eyebrow="About" title="Entre la donnée" accent="et le ciel." />

        <div className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-7">
            <Reveal>
              <p className="font-display text-[clamp(1.6rem,2.6vw,2.3rem)] leading-[1.25] text-ivory">{about.intro}</p>
            </Reveal>
            <div className="mt-12 space-y-6">
              {about.paragraphs.map((p, i) => (
                <Reveal key={i} delay={0.08 * i}>
                  <p className="max-w-[60ch] text-[15.5px] leading-[1.8] text-silver">{p}</p>
                </Reveal>
              ))}
            </div>

            <div className="mt-16 grid gap-px overflow-hidden border border-white/[0.07] bg-white/[0.07] sm:grid-cols-3">
              {about.pillars.map((p, i) => (
                <Reveal key={p.label} delay={0.1 * i} className="bg-ink p-6">
                  <p className="font-mono text-[10px] text-electric">0{i + 1}</p>
                  <p className="mt-4 font-display text-2xl text-ivory">{p.label}</p>
                  <p className="mt-2 text-[13px] leading-relaxed text-silver">{p.text}</p>
                </Reveal>
              ))}
            </div>
          </div>

          <aside className="md:col-span-4 md:col-start-9">
            <Reveal>
              <div className="mb-8 flex items-center gap-3">
                <GraduationCap size={16} className="text-electric" />
                <p className="eyebrow">Formation</p>
              </div>
            </Reveal>
            <ol className="relative border-l border-white/10">
              {education.map((e, i) => (
                <Reveal as="li" key={e.school} delay={0.08 * i} className="relative pb-10 pl-7 last:pb-0">
                  <span className="absolute -left-[4.5px] top-1.5 h-2 w-2 rounded-full border border-electric bg-ink" />
                  <p className="font-mono text-[11px] text-silver-dim">{e.period} · {e.place}</p>
                  <p className="mt-2 text-[17px] font-medium text-ivory">{e.school}</p>
                  <p className="mt-0.5 text-[14px] text-ivory/80">{e.degree}</p>
                  <p className="mt-2 text-[13px] leading-relaxed text-silver-dim">{e.detail}</p>
                </Reveal>
              ))}
            </ol>

            <Reveal className="mt-14 border-t border-white/10 pt-8">
              <p className="eyebrow mb-5">Engagements</p>
              {associative.map((a) => (
                <div key={a.org} className="mb-4">
                  <p className="text-[14px] text-ivory">{a.org} <span className="text-silver-dim">· {a.period}</span></p>
                  <p className="text-[13px] text-silver">{a.role}{a.note && ` — ${a.note}`}</p>
                </div>
              ))}
              <p className="eyebrow mb-4 mt-8">Centres d'intérêt</p>
              <div className="flex flex-wrap gap-2">
                {interests.map((i) => <span key={i} className="chip">{i}</span>)}
              </div>
            </Reveal>
          </aside>
        </div>
      </div>
    </section>
  )
}
