import { ArrowUpRight, Play } from 'lucide-react'
import Reveal from './Reveal'

/** Vitrine du prototype interactif du projet phare. */
export default function DemoShowcase({ demo, onLaunch, onCaseStudy }) {
  return (
    <Reveal className="mb-20 grid gap-10 md:grid-cols-12 md:gap-12">
      <button
        onClick={onLaunch}
        className="group relative block overflow-hidden border border-white/10 bg-navy-950 text-left md:col-span-7"
        aria-label={`Lancer la démo ${demo.name}`}
      >
        <div className="flex h-7 items-center gap-1.5 border-b border-white/10 bg-navy-900/80 px-3">
          {[0, 1, 2].map((i) => <span key={i} className="h-1.5 w-1.5 rounded-full bg-white/20" />)}
          <span className="ml-3 truncate font-mono text-[9px] uppercase tracking-[0.2em] text-silver-dim">{demo.name} · prototype</span>
        </div>
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src={demo.preview}
            alt={`Aperçu du prototype ${demo.name} : globe du réseau long-courrier, liste des vols et indicateurs du modèle`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent transition-opacity duration-700 group-hover:opacity-60" />
          <span className="absolute bottom-5 left-5 inline-flex items-center gap-3 bg-ivory px-5 py-3 text-[12px] font-medium uppercase tracking-[0.18em] text-navy-950 transition-shadow duration-500 group-hover:shadow-[0_0_40px_-6px_rgba(62,139,255,0.7)]">
            <Play size={14} className="fill-navy-950" /> Lancer la démo
          </span>
        </div>
      </button>

      <div className="flex flex-col md:col-span-5">
        <p className="eyebrow !text-electric-soft">{demo.label}</p>
        <h3 className="mt-4 font-display text-[clamp(2rem,3.6vw,3.2rem)] leading-none text-ivory">{demo.name}</h3>
        <p className="mt-5 text-[15px] leading-relaxed text-silver">{demo.description}</p>

        <ul className="mt-7 space-y-2.5">
          {demo.features.map((f) => (
            <li key={f} className="flex gap-3 text-[14px] leading-snug text-ivory/85">
              <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-electric" />
              {f}
            </li>
          ))}
        </ul>

        <dl className="mt-8 grid grid-cols-3 gap-px overflow-hidden border border-white/[0.08] bg-white/[0.08]">
          {demo.metrics.map((m) => (
            <div key={m.k} className="bg-ink p-4">
              <dd className="font-display text-[1.7rem] leading-none text-ivory [font-variant-numeric:tabular-nums]">{m.v}</dd>
              <dt className="mt-2 text-[11px] leading-snug text-silver-dim">{m.k}</dt>
            </div>
          ))}
        </dl>

        <div className="mt-8 flex flex-wrap gap-3">
          <button onClick={onLaunch} className="btn-primary">
            <Play size={14} className="fill-navy-950" /> Lancer la démo
          </button>
          <button onClick={onCaseStudy} className="btn-ghost group">
            Étude de cas <ArrowUpRight size={15} className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </button>
        </div>
        <p className="mt-5 text-[12px] leading-relaxed text-silver-dim">{demo.note}</p>
      </div>
    </Reveal>
  )
}
