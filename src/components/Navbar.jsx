import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { navItems, profile } from '../data/profile'
import useActiveSection from '../hooks/useActiveSection'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const active = useActiveSection(navItems.map((n) => n.id))
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  return (
    <>
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ${
          scrolled ? 'border-b border-white/[0.06] bg-ink/70 backdrop-blur-xl' : 'bg-transparent'
        }`}
      >
        <nav className="container-x flex h-[72px] items-center justify-between" aria-label="Navigation principale">
          <a href="#home" className="group flex items-baseline gap-2" aria-label="Retour à l'accueil">
            <span className="font-display text-2xl italic text-ivory">SJ</span>
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.25em] text-silver-dim transition-colors group-hover:text-silver sm:inline">
              {profile.firstName} {profile.lastName}
            </span>
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={`relative px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em] transition-colors duration-300 ${
                    active === item.id ? 'text-ivory' : 'text-silver-dim hover:text-silver'
                  }`}
                >
                  {item.label}
                  {active === item.id && (
                    <motion.span layoutId="nav-dot" className="absolute -bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-electric" />
                  )}
                </a>
              </li>
            ))}
          </ul>

          <button onClick={() => setOpen(true)} className="p-2 text-ivory md:hidden" aria-label="Ouvrir le menu">
            <Menu size={22} />
          </button>
        </nav>
        <motion.div style={{ scaleX: progress }} className="absolute bottom-0 left-0 h-px w-full origin-left bg-electric/70" />
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[60] flex flex-col bg-navy-950/95 backdrop-blur-xl md:hidden"
          >
            <div className="container-x flex h-[72px] items-center justify-between">
              <span className="font-display text-2xl italic">SJ</span>
              <button onClick={() => setOpen(false)} className="p-2" aria-label="Fermer le menu">
                <X size={22} />
              </button>
            </div>
            <ul className="container-x mt-10 flex flex-col gap-2">
              {navItems.map((item, i) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 * i, duration: 0.6 }}
                >
                  <a href={`#${item.id}`} onClick={() => setOpen(false)} className="flex items-baseline gap-4 py-3">
                    <span className="font-mono text-[11px] text-electric">0{i + 1}</span>
                    <span className={`font-display text-5xl ${active === item.id ? 'italic text-ivory' : 'text-silver'}`}>{item.label}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
