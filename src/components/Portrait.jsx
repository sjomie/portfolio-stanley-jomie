import { useState } from 'react'
import { motion, useTransform } from 'framer-motion'
import { ImageOff } from 'lucide-react'
import { profile } from '../data/profile'

/**
 * Portrait principal. Traitement : fondu dans le décor, étalonnage bleu nuit,
 * lumière de contour électrique, profondeur au survol de la souris.
 */
export default function Portrait({ mx, my, scrollY }) {
  const [failed, setFailed] = useState(false)
  const x = useTransform(mx, (v) => v * 14)
  const y = useTransform(my, (v) => v * 10)
  const rotY = useTransform(mx, (v) => v * 2.5)
  const rotX = useTransform(my, (v) => v * -2)
  const lightX = useTransform(mx, (v) => `${30 + v * 20}%`)

  return (
    <motion.div
      style={{ y: scrollY, perspective: 1200 }}
      className="absolute inset-0"
      initial={{ opacity: 0, scale: 1.06 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div style={{ x, y, rotateY: rotY, rotateX: rotX }} className="relative h-full w-full">
        {failed ? null : profile.portraitCutout ? (
          <>
            {/* Contre-jour : halo derrière la silhouette */}
            <motion.div
              style={{ left: lightX }}
              className="absolute top-[14%] h-[46%] w-[60%] -translate-x-1/2 rounded-full bg-electric/25 blur-[110px]"
            />
            <div className="absolute left-1/2 top-[18%] h-[60%] w-[75%] -translate-x-1/2 rounded-full bg-navy-600/50 blur-[80px]" />
            <img
              src={profile.portrait}
              alt={`Portrait de ${profile.firstName} ${profile.lastName}`}
              onError={() => setFailed(true)}
              fetchpriority="high"
              className="portrait-mask-cutout absolute left-1/2 top-[9%] h-[122%] w-auto max-w-none -translate-x-1/2 select-none contrast-[1.04] [filter:drop-shadow(-10px_0_28px_rgba(62,139,255,0.35))_drop-shadow(0_30px_60px_rgba(0,0,0,0.6))] md:top-[8%] md:h-[130%]"
              draggable="false"
            />
          </>
        ) : (
          <div className="portrait-mask absolute inset-0">
            <img
              src={profile.portrait}
              alt={`Portrait de ${profile.firstName} ${profile.lastName}`}
              onError={() => setFailed(true)}
              fetchpriority="high"
              className="absolute inset-0 h-full w-full object-cover object-[50%_22%] saturate-[0.8] contrast-[1.08] brightness-[0.92]"
            />
            {/* Vignettage bleu nuit : assombrit l'arrière-plan de la photo, préserve le visage */}
            <div className="absolute inset-0 mix-blend-multiply [background:radial-gradient(60%_55%_at_55%_38%,transparent_20%,rgba(7,17,38,0.75)_70%,#040A17_100%)]" />
            <div className="absolute inset-0 bg-navy-700/25 mix-blend-color" />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/10 to-transparent" />
            <motion.div
              style={{ left: lightX }}
              className="absolute top-[10%] h-[70%] w-[35%] -translate-x-1/2 rounded-full bg-electric/20 mix-blend-screen blur-[90px]"
            />
          </div>
        )}
        {failed && <PortraitPlaceholder />}
      </motion.div>
    </motion.div>
  )
}

function PortraitPlaceholder() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative flex aspect-[3/4] h-[72%] max-h-[640px] flex-col items-center justify-center border border-white/10 bg-gradient-to-b from-navy-700/40 to-transparent">
        <span className="font-display text-[6rem] md:text-[9rem] italic leading-none text-ivory/10">SJ</span>
        <div className="mt-6 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.2em] text-silver-dim">
          <ImageOff size={14} /> public/images/portrait.jpg
        </div>
        {['left-0 top-0 border-l border-t', 'right-0 top-0 border-r border-t', 'left-0 bottom-0 border-l border-b', 'right-0 bottom-0 border-r border-b'].map((c) => (
          <span key={c} className={`absolute h-5 w-5 border-electric/60 ${c}`} />
        ))}
      </div>
    </div>
  )
}
