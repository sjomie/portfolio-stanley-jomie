import Reveal from './Reveal'

export default function SectionHeader({ index, eyebrow, title, accent, intro, align = 'left' }) {
  return (
    <div className={`mb-16 md:mb-24 ${align === 'center' ? 'text-center mx-auto max-w-3xl' : 'grid gap-8 md:grid-cols-12'}`}>
      <Reveal className={align === 'center' ? '' : 'md:col-span-7'}>
        <div className={`mb-6 flex items-center gap-4 ${align === 'center' ? 'justify-center' : ''}`}>
          <span className="font-mono text-[11px] text-electric">{index}</span>
          <span className="h-px w-10 bg-white/20" />
          <span className="eyebrow">{eyebrow}</span>
        </div>
        <h2 className="font-display text-[clamp(2.6rem,6vw,5.2rem)] leading-[0.95] tracking-tight text-ivory">
          {title} {accent && <em className="text-silver">{accent}</em>}
        </h2>
      </Reveal>
      {intro && (
        <Reveal delay={0.15} className={align === 'center' ? 'mt-6' : 'md:col-span-4 md:col-start-9 md:self-end'}>
          <p className="text-[15px] leading-relaxed text-silver">{intro}</p>
        </Reveal>
      )}
    </div>
  )
}
