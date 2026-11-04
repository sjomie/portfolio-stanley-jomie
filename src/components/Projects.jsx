import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { projectFilters, projects } from '../data/profile'
import DemoShowcase from './DemoShowcase'
import DemoViewer from './DemoViewer'
import ProjectModal from './ProjectModal'
import Reveal from './Reveal'
import SectionHeader from './SectionHeader'

export default function Projects() {
  const [filter, setFilter] = useState('Tous')
  const [selected, setSelected] = useState(null)
  const [demo, setDemo] = useState(null)
  const list = filter === 'Tous' ? projects : projects.filter((p) => p.tags.includes(filter))
  const featured = projects.find((p) => p.featured)

  return (
    <section id="projects" className="relative bg-ink py-28 md:py-40">
      <div className="container-x">
        <SectionHeader
          index="03"
          eyebrow="Projects"
          title="Réalisations"
          accent="choisies."
          intro="Data science appliquée à l'aérien, finance de groupe et performance commerciale : chaque projet est issu de mes missions chez Air France-KLM et Air Caraïbes."
        />

        {/* Projet phare */}
        <Reveal>
          <button
            onClick={() => setSelected(featured)}
            className="group relative mb-10 block w-full overflow-hidden border border-white/[0.08] text-left"
          >
            <div className="absolute inset-0 bg-[radial-gradient(80%_120%_at_85%_20%,rgba(62,139,255,0.22),transparent_60%),linear-gradient(135deg,#0B1A37,#02040A)] transition-transform duration-[1.4s] ease-out group-hover:scale-[1.03]" />
            <svg className="absolute inset-0 h-full w-full opacity-40" viewBox="0 0 1200 500" preserveAspectRatio="none" aria-hidden="true">
              {Array.from({ length: 7 }).map((_, i) => (
                <path key={i} d={`M -20 ${420 - i * 18} C 300 ${380 - i * 40}, 700 ${150 + i * 12}, 1220 ${90 + i * 30}`} fill="none" stroke="#7FB2FF" strokeOpacity={0.06 + i * 0.03} strokeDasharray="2 6" />
              ))}
            </svg>
            <div className="relative grid gap-10 p-8 md:grid-cols-12 md:p-14">
              <div className="md:col-span-8">
                <p className="eyebrow !text-electric-soft">Projet phare · {featured.category}</p>
                <h3 className="mt-6 font-display text-[clamp(2.2rem,5vw,4.6rem)] leading-[0.98] text-ivory">{featured.title}</h3>
                <p className="mt-6 max-w-[52ch] text-[16px] leading-relaxed text-silver">{featured.summary}</p>
              </div>
              <div className="flex flex-col justify-between gap-8 md:col-span-4 md:items-end md:text-right">
                <span className="font-display text-[7rem] leading-none text-white/[0.06]">{featured.index}</span>
                <div>
                  <p className="text-[14px] text-ivory">{featured.company}</p>
                  <p className="mt-1 font-mono text-[11px] text-silver-dim">{featured.period}</p>
                  <span className="mt-6 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-ivory">
                    Étude de cas
                    <ArrowUpRight size={15} className="transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </div>
          </button>
        </Reveal>

        {/* Prototype interactif du projet phare */}
        {featured.demo && (
          <DemoShowcase demo={featured.demo} onLaunch={() => setDemo(featured.demo)} onCaseStudy={() => setSelected(featured)} />
        )}

        {/* Filtres */}
        <Reveal className="mb-10 flex flex-wrap gap-2" >
          {projectFilters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`relative px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors ${filter === f ? 'text-navy-950' : 'text-silver hover:text-ivory'}`}
            >
              {filter === f && <motion.span layoutId="filter-pill" className="absolute inset-0 bg-ivory" transition={{ type: 'spring', stiffness: 300, damping: 30 }} />}
              <span className="relative">{f}</span>
            </button>
          ))}
        </Reveal>

        {/* Liste éditoriale */}
        <motion.ul layout className="border-t border-white/10">
          <AnimatePresence mode="popLayout">
            {list.map((p) => (
              <motion.li
                layout
                key={p.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="border-b border-white/10"
              >
                <button onClick={() => setSelected(p)} className="group relative grid w-full grid-cols-12 items-center gap-4 overflow-hidden py-8 text-left md:py-10">
                  <span className="absolute inset-0 origin-left scale-x-0 bg-gradient-to-r from-navy-800/70 to-transparent transition-transform duration-700 ease-out group-hover:scale-x-100" />
                  <span className="relative col-span-2 font-mono text-[12px] text-silver-dim transition-colors group-hover:text-electric md:col-span-1">{p.index}</span>
                  <span className="relative col-span-10 md:col-span-6">
                    <span className="block font-display text-[clamp(1.6rem,3vw,2.6rem)] leading-tight text-ivory transition-transform duration-700 group-hover:translate-x-3">{p.title}</span>
                    <span className="mt-2 block text-[13px] text-silver md:hidden">{p.company}</span>
                  </span>
                  <span className="relative hidden text-[13px] text-silver md:col-span-3 md:block">
                    {p.company}
                    <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-silver-dim">{p.category}</span>
                  </span>
                  <span className="relative hidden justify-end md:col-span-2 md:flex">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 transition-all duration-500 group-hover:border-electric group-hover:bg-electric">
                      <ArrowUpRight size={16} className="transition-transform duration-500 group-hover:rotate-45" />
                    </span>
                  </span>
                </button>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} onOpenDemo={(d) => setDemo(d)} />
      <DemoViewer demo={demo} onClose={() => setDemo(null)} />
    </section>
  )
}
