import { ArrowUp } from 'lucide-react'
import { profile } from '../data/profile'

export default function Footer() {
  return (
    <footer className="relative bg-ink">
      <div className="container-x">
        <div className="hairline" />
        <div className="flex flex-col items-start justify-between gap-6 py-10 sm:flex-row sm:items-center">
          <p className="font-mono text-[11px] tracking-[0.15em] text-silver-dim">
            © {new Date().getFullYear()} {profile.firstName.toUpperCase()} {profile.lastName.toUpperCase()} · DATA · FINANCE · AÉRIEN
          </p>
          <a href="#home" className="group flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-silver transition-colors hover:text-ivory">
            Retour en haut
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 transition-colors group-hover:border-electric">
              <ArrowUp size={14} />
            </span>
          </a>
        </div>
      </div>
    </footer>
  )
}
