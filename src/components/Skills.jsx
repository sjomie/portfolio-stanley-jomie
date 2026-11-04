import { motion } from 'framer-motion'
import { languages, skills } from '../data/profile'
import Reveal from './Reveal'
import SectionHeader from './SectionHeader'

const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'Natif']

export default function Skills() {
  return (
    <section id="skills" className="relative overflow-hidden bg-gradient-to-b from-ink via-navy-950 to-ink py-28 md:py-40">
      <div className="container-x">
        <SectionHeader
          index="04"
          eyebrow="Skills"
          title="Le tableau"
          accent="de bord."
          intro="Les compétences techniques et métier mobilisées dans mes missions et ma formation, présentées comme un tableau des départs."
        />

        {/* Tableau des départs */}
        <div className="grid gap-px overflow-hidden border border-white/[0.07] bg-white/[0.07] md:grid-cols-2 lg:grid-cols-3">
          {skills.map((group, gi) => (
            <Reveal key={group.code} delay={0.06 * gi} className="group bg-ink p-7 transition-colors duration-700 hover:bg-navy-900/80 md:p-9">
              <div className="flex items-center justify-between">
                <span className="border border-electric/40 px-2 py-1 font-mono text-[10px] tracking-[0.2em] text-electric">{group.code}</span>
                <span className="font-mono text-[10px] text-silver-dim">GATE 0{gi + 1}</span>
              </div>
              <h3 className="mt-8 font-display text-[2rem] leading-none text-ivory">{group.title}</h3>
              <ul className="mt-8">
                {group.items.map((item, i) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, rotateX: -90 }}
                    whileInView={{ opacity: 1, rotateX: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 + i * 0.07 + gi * 0.05, duration: 0.6 }}
                    className="flex items-center justify-between border-b border-white/[0.06] py-3 [transform-origin:top]"
                  >
                    <span className="font-mono text-[13px] uppercase tracking-[0.08em] text-ivory/90">{item}</span>
                    <span className="h-1 w-1 rounded-full bg-silver-dim transition-colors duration-500 group-hover:bg-electric" />
                  </motion.li>
                ))}
              </ul>
            </Reveal>
          ))}

          {/* Langues */}
          <Reveal delay={0.3} className="bg-ink p-7 md:p-9">
            <div className="flex items-center justify-between">
              <span className="border border-electric/40 px-2 py-1 font-mono text-[10px] tracking-[0.2em] text-electric">LANG</span>
              <span className="font-mono text-[10px] text-silver-dim">GATE 0{skills.length + 1}</span>
            </div>
            <h3 className="mt-8 font-display text-[2rem] leading-none text-ivory">Langues</h3>
            <div className="mt-8 space-y-6">
              {languages.map((l) => (
                <div key={l.name}>
                  <div className="flex items-baseline justify-between">
                    <span className="text-[14px] text-ivory">{l.name}</span>
                    <span className="font-mono text-[11px] text-silver">{l.level}</span>
                  </div>
                  <div className="mt-2.5 grid grid-cols-6 gap-1" aria-label={`${l.name} : ${l.level}`}>
                    {levels.map((lv, i) => (
                      <motion.span
                        key={lv}
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + i * 0.06, duration: 0.5 }}
                        className={`h-1 origin-left ${i < l.value ? 'bg-electric' : 'bg-white/10'}`}
                      />
                    ))}
                  </div>
                </div>
              ))}
              <p className="font-mono text-[10px] tracking-[0.15em] text-silver-dim">ÉCHELLE CECRL · A1 → NATIF</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
