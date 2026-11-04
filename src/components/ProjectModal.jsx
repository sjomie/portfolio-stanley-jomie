import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Play, X } from 'lucide-react'

export default function ProjectModal({ project, onClose, onOpenDemo }) {
  useEffect(() => {
    if (!project) return
    // Échap ferme la fiche, sauf si la démo plein écran est ouverte par-dessus
    const onKey = (e) => e.key === 'Escape' && !document.querySelector('[aria-label^="Démo "]') && onClose()
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [project, onClose])

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[70] flex justify-end bg-ink/70 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-title"
        >
          <motion.article
            onClick={(e) => e.stopPropagation()}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-full w-full max-w-[720px] overflow-y-auto border-l border-white/10 bg-navy-950"
          >
            <div className="absolute inset-x-0 top-0 h-72 bg-[radial-gradient(70%_100%_at_80%_0%,rgba(62,139,255,0.25),transparent)]" />
            <div className="relative p-8 md:p-14">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] text-electric">{project.index} / Étude de cas</span>
                <button onClick={onClose} className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 transition-colors hover:border-electric" aria-label="Fermer">
                  <X size={18} />
                </button>
              </div>

              <p className="eyebrow mt-14">{project.category}</p>
              <h3 id="project-title" className="mt-5 font-display text-[clamp(2.4rem,5vw,4rem)] leading-[0.98] text-ivory">{project.title}</h3>
              <div className="mt-6 flex gap-8 font-mono text-[11px] uppercase tracking-[0.18em] text-silver">
                <span>{project.company}</span>
                <span className="text-silver-dim">{project.period}</span>
              </div>

              <p className="mt-10 font-display text-2xl leading-snug text-ivory/90">{project.summary}</p>

              {project.demo && (
                <button
                  onClick={() => onOpenDemo?.(project.demo)}
                  className="group relative mt-10 block w-full overflow-hidden border border-white/10 text-left"
                >
                  <img src={project.demo.preview} alt="" className="aspect-[16/9] w-full object-cover opacity-80 transition-all duration-700 group-hover:scale-[1.03] group-hover:opacity-100" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/30 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5">
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-electric-soft">Prototype</p>
                      <p className="mt-1 font-display text-2xl text-ivory">{project.demo.name}</p>
                    </div>
                    <span className="inline-flex shrink-0 items-center gap-2 bg-ivory px-4 py-2.5 text-[11px] font-medium uppercase tracking-[0.18em] text-navy-950">
                      <Play size={12} className="fill-navy-950" /> Lancer
                    </span>
                  </div>
                </button>
              )}

              <div className="mt-12 space-y-10 border-t border-white/10 pt-10">
                {[
                  ['Contexte', project.context],
                  ['Mon rôle', project.role],
                  ['Impact', project.impact],
                ].map(([k, v], i) => (
                  <motion.div key={k} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.1, duration: 0.7 }} className="grid gap-3 md:grid-cols-4">
                    <p className="eyebrow pt-1">{k}</p>
                    <p className="text-[15.5px] leading-[1.8] text-silver md:col-span-3">{v}</p>
                  </motion.div>
                ))}
                <div className="grid gap-3 md:grid-cols-4">
                  <p className="eyebrow pt-1">Outils</p>
                  <div className="flex flex-wrap gap-2 md:col-span-3">
                    {project.stack.map((s) => <span key={s} className="chip">{s}</span>)}
                  </div>
                </div>
              </div>
            </div>
          </motion.article>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
