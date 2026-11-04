import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Plane } from 'lucide-react'
import { experiences } from '../data/profile'
import Reveal from './Reveal'
import SectionHeader from './SectionHeader'

export default function Experience() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] })
  const height = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
  const planeTop = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section id="experience" className="relative overflow-hidden bg-gradient-to-b from-ink via-navy-950 to-ink py-28 md:py-40">
      <div className="container-x">
        <SectionHeader
          index="02"
          eyebrow="Experience"
          title="Cinq ans"
          accent="en compagnie aérienne."
          intro="Deux alternances, deux compagnies, une même trajectoire : de l'analyse commerciale à la data science appliquée à la finance d'un grand groupe aérien."
        />

        <div ref={ref} className="relative">
          {/* Axe de la timeline */}
          <div className="absolute bottom-0 left-[7px] top-0 w-px bg-white/10 md:left-[calc(25%-0.5px)]" />
          <motion.div style={{ height }} className="absolute left-[7px] top-0 w-px bg-gradient-to-b from-electric to-electric-soft md:left-[calc(25%-0.5px)]" />
          <motion.div style={{ top: planeTop }} className="absolute left-[7px] z-10 -translate-x-1/2 -translate-y-1/2 md:left-[25%]">
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-electric/50 bg-ink">
              <Plane size={13} className="rotate-90 text-electric" />
            </span>
          </motion.div>

          <div className="space-y-24 md:space-y-32">
            {experiences.map((exp) => (
              <article key={exp.company} className="relative grid gap-8 pl-10 md:grid-cols-4 md:gap-0 md:pl-0">
                <Reveal className="md:pr-12 md:text-right">
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-electric">{exp.period}</p>
                  <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.2em] text-silver-dim">{exp.contract}</p>
                  <p className="mt-6 hidden font-display text-[5rem] leading-none text-white/[0.05] md:block">{exp.code}</p>
                </Reveal>

                <div className="md:col-span-3 md:pl-16">
                  <Reveal>
                    <h3 className="font-display text-[clamp(2.2rem,4.5vw,3.8rem)] leading-none text-ivory">{exp.company}</h3>
                    <p className="mt-4 text-[16px] text-ivory/85">{exp.role}</p>
                    <p className="mt-1 text-[13px] text-silver-dim">{exp.location}</p>
                  </Reveal>

                  <ul className="mt-10 grid gap-px overflow-hidden border border-white/[0.06] bg-white/[0.06] lg:grid-cols-2">
                    {exp.missions.map((m, i) => (
                      <Reveal
                        as="li"
                        key={m.title}
                        delay={0.05 * i}
                        className={`group bg-ink p-6 transition-colors duration-500 hover:bg-navy-900 ${i === exp.missions.length - 1 && exp.missions.length % 2 ? 'lg:col-span-2' : ''}`}
                      >
                        <p className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-silver">
                          <span className="text-electric">{String(i + 1).padStart(2, '0')}</span>
                          {m.title}
                        </p>
                        <p className="mt-3 text-[14.5px] leading-relaxed text-silver transition-colors duration-500 group-hover:text-ivory/90">{m.text}</p>
                      </Reveal>
                    ))}
                  </ul>

                  <Reveal className="mt-6 flex flex-wrap gap-2">
                    {exp.stack.map((s) => <span key={s} className="chip">{s}</span>)}
                  </Reveal>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
