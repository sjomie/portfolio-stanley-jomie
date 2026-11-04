import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion'
import { ArrowDown, ArrowUpRight, Download } from 'lucide-react'
import { cvLinkProps, profile } from '../data/profile'
import AviationBackdrop from './AviationBackdrop'
import Portrait from './Portrait'
import { ease } from './Reveal'

export default function Hero() {
  const ref = useRef(null)
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const mx = useSpring(rawX, { stiffness: 40, damping: 18 })
  const my = useSpring(rawY, { stiffness: 40, damping: 18 })

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return
    const onMove = (e) => {
      rawX.set(e.clientX / window.innerWidth - 0.5)
      rawY.set(e.clientY / window.innerHeight - 0.5)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [rawX, rawY])

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const portraitY = useTransform(scrollYProgress, [0, 1], ['0%', '14%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '40%'])
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const giantX = useTransform(scrollYProgress, [0, 1], ['0%', '-12%'])

  const line = (d) => ({
    initial: { y: '110%' },
    animate: { y: '0%' },
    transition: { duration: 1.3, delay: d, ease },
  })
  const fadeUp = (d) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1, delay: d, ease },
  })

  return (
    <section id="home" ref={ref} className="relative isolate min-h-[100svh] overflow-hidden bg-ink">
      <AviationBackdrop mx={mx} my={my} />

      {/* Nom géant en filigrane */}
      <motion.div
        style={{ x: giantX }}
        className="text-outline pointer-events-none absolute bottom-[-4vw] left-[-2vw] select-none whitespace-nowrap font-display text-[26vw] leading-none"
        aria-hidden="true"
      >
        Jomie
      </motion.div>

      {/* Portrait : grande colonne à droite (desktop), plein cadre haut (mobile) */}
      <div className="absolute inset-x-0 top-0 h-[64svh] md:inset-y-0 md:left-auto md:right-0 md:h-auto md:w-[58%] lg:w-[54%]">
        <Portrait mx={mx} my={my} scrollY={portraitY} />
        {/* Raccords de lumière avec le texte */}
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-ink/70 to-transparent" />

      {/* Mentions verticales */}
      <motion.div {...fadeUp(1.6)} className="absolute right-5 top-1/2 hidden -translate-y-1/2 lg:block">
        <p className="eyebrow [writing-mode:vertical-rl]">Data · Finance · Transport aérien</p>
      </motion.div>

      <motion.div style={{ y: textY, opacity: fade }} className="container-x relative flex min-h-[100svh] flex-col justify-end pb-10 pt-28 md:justify-center md:pb-24">
        <div className="max-w-[640px] pt-[38svh] md:pt-0">
          <motion.div {...fadeUp(0.4)} className="mb-5 flex items-center gap-4 md:mb-8">
            <span className="blink h-1.5 w-1.5 rounded-full bg-electric" />
            <span className="eyebrow">Portfolio · 2026</span>
          </motion.div>

          <h1 className="font-display leading-[0.86] tracking-[-0.02em] text-ivory">
            <span className="block overflow-hidden text-[clamp(4rem,11vw,10.5rem)]">
              <motion.span className="block" {...line(0.5)}>{profile.firstName}</motion.span>
            </span>
            <span className="block overflow-hidden pl-[0.6em] text-[clamp(4rem,11vw,10.5rem)] md:pl-[1.1em]">
              <motion.span className="block italic text-silver" {...line(0.65)}>{profile.lastName}</motion.span>
            </span>
          </h1>

          <motion.div {...fadeUp(1.1)} className="mt-6 flex items-center gap-4 md:mt-10">
            <span className="h-px w-12 bg-electric" />
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ivory/90 sm:text-[12px] sm:tracking-[0.22em]">{profile.title}</p>
          </motion.div>

          <motion.p {...fadeUp(1.25)} className="mt-6 max-w-[440px] text-[16px] leading-relaxed text-silver md:text-[17px]">
            {profile.tagline}
          </motion.p>

          <motion.div {...fadeUp(1.4)} className="mt-8 flex flex-wrap gap-3 md:mt-10">
            <a href="#experience" className="btn-primary group">
              Découvrir mon parcours
              <ArrowUpRight size={16} className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <a href={profile.cv} {...cvLinkProps} className="btn-ghost group">
              <Download size={16} className="transition-transform duration-500 group-hover:translate-y-0.5" />
              Télécharger le CV
            </a>
          </motion.div>
        </div>

        {/* Bandeau type carte d'embarquement */}
        <motion.div {...fadeUp(1.7)} className="mt-14 hidden max-w-[640px] grid-cols-3 border-t border-white/10 pt-5 md:grid">
          {[
            ['Actuellement', 'Air France-KLM'],
            ['Auparavant', 'Air Caraïbes'],
            ['Formation', 'Eugenia · HEC · PPA'],
          ].map(([k, v]) => (
            <div key={k}>
              <p className="eyebrow !text-[10px] text-silver-dim">{k}</p>
              <p className="mt-1.5 text-[14px] text-ivory">{v}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      <motion.a
        href="#about"
        {...fadeUp(2)}
        className="absolute bottom-8 right-8 hidden items-center gap-3 text-silver transition-colors hover:text-ivory md:flex"
        aria-label="Faire défiler vers la section À propos"
      >
        <span className="eyebrow">Scroll</span>
        <motion.span animate={{ y: [0, 6, 0] }} transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}>
          <ArrowDown size={16} />
        </motion.span>
      </motion.a>
    </section>
  )
}
