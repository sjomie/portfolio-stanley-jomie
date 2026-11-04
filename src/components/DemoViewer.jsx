import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ExternalLink, X } from 'lucide-react'

/** Plein écran pour un prototype interactif (chargé uniquement à l'ouverture). */
export default function DemoViewer({ demo, onClose }) {
  useEffect(() => {
    if (!demo) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [demo, onClose])

  return (
    <AnimatePresence>
      {demo && (
        <motion.div
          className="fixed inset-0 z-[80] flex flex-col bg-ink/95 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label={`Démo ${demo.name}`}
        >
          <div className="flex h-14 shrink-0 items-center justify-between gap-4 border-b border-white/10 px-4 md:px-6">
            <div className="min-w-0">
              <p className="truncate font-display text-xl italic text-ivory">{demo.name}</p>
            </div>
            <p className="hidden flex-1 truncate text-center font-mono text-[10px] uppercase tracking-[0.2em] text-silver-dim md:block">
              {demo.label} · Échap pour fermer
            </p>
            <div className="flex shrink-0 items-center gap-2">
              <a
                href={demo.src}
                target="_blank"
                rel="noreferrer"
                className="hidden items-center gap-2 border border-white/15 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-silver transition-colors hover:border-electric hover:text-ivory sm:inline-flex"
              >
                <ExternalLink size={13} /> Nouvel onglet
              </a>
              <button
                onClick={onClose}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 transition-colors hover:border-electric"
                aria-label="Fermer la démo"
              >
                <X size={17} />
              </button>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.985 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex-1"
          >
            <iframe
              src={demo.src}
              title={`${demo.name} — démo interactive`}
              className="absolute inset-0 h-full w-full border-0"
              allow="fullscreen"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
