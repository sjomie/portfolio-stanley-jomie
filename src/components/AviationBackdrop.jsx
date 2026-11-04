import { motion, useTransform } from 'framer-motion'

/**
 * Décor de la homepage : halos, grille de navigation, route orthodromique
 * PTP → CDG (Guadeloupe → Paris), rose des vents. Réagit à la souris (mx, my).
 */
export default function AviationBackdrop({ mx, my }) {
  const x1 = useTransform(mx, (v) => v * -18)
  const y1 = useTransform(my, (v) => v * -12)
  const x2 = useTransform(mx, (v) => v * 30)
  const y2 = useTransform(my, (v) => v * 20)

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Fond et halos */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_70%_30%,#12264D_0%,#071126_42%,#02040A_85%)]" />
      <motion.div style={{ x: x2, y: y2 }} className="absolute right-[8%] top-[6%] h-[60vmax] w-[60vmax] rounded-full bg-electric/[0.10] blur-[120px]" />
      <motion.div style={{ x: x1, y: y1 }} className="absolute -left-[10%] bottom-[-20%] h-[50vmax] w-[50vmax] rounded-full bg-navy-600/30 blur-[140px]" />

      {/* Grille de navigation */}
      <motion.div
        style={{ x: x1, y: y1 }}
        className="absolute -inset-10 opacity-[0.35] [background-image:linear-gradient(rgba(167,176,190,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(167,176,190,0.06)_1px,transparent_1px)] [background-size:88px_88px] [mask-image:radial-gradient(70%_60%_at_60%_45%,#000,transparent)]"
      />

      {/* Route orthodromique + rose des vents */}
      <motion.svg style={{ x: x1, y: y1 }} className="absolute inset-0 h-full w-full" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="route" x1="0" x2="1">
            <stop offset="0" stopColor="#3E8BFF" stopOpacity="0" />
            <stop offset="0.35" stopColor="#7FB2FF" stopOpacity="0.7" />
            <stop offset="1" stopColor="#F1EDE4" stopOpacity="0.15" />
          </linearGradient>
        </defs>
        <motion.path
          id="flightpath"
          d="M 30 880 C 380 420, 860 170, 1420 210"
          fill="none"
          stroke="url(#route)"
          strokeWidth="1"
          strokeDasharray="2 7"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3.2, delay: 0.6, ease: [0.65, 0, 0.35, 1] }}
        />
        <circle r="3" fill="#7FB2FF">
          <animateMotion dur="14s" repeatCount="indefinite" rotate="auto" begin="3.5s">
            <mpath href="#flightpath" />
          </animateMotion>
        </circle>
        <g fontFamily="JetBrains Mono, monospace" fontSize="10" fill="#6B7588" letterSpacing="2">
          <circle cx="30" cy="880" r="4" fill="none" stroke="#6B7588" />
          <circle cx="1420" cy="210" r="4" fill="none" stroke="#6B7588" />
          <text x="1290" y="194">CDG · 49°00′N</text>
        </g>
        <g transform="translate(1080 470)" stroke="#A7B0BE" fill="none" opacity="0.14">
          <circle r="330" strokeDasharray="1 6" />
          <circle r="250" />
          {Array.from({ length: 72 }).map((_, i) => (
            <line key={i} x1="0" y1={-250} x2="0" y2={i % 6 === 0 ? -236 : -244} transform={`rotate(${i * 5})`} />
          ))}
        </g>
      </motion.svg>

      <div className="grain absolute inset-0" />
    </div>
  )
}
