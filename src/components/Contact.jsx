import { useState } from 'react'
import { ArrowUpRight, Check, Copy, Download, Linkedin, Mail, MapPin, Phone } from 'lucide-react'
import { cvLinkProps, isSandboxed, profile } from '../data/profile'
import Reveal from './Reveal'

export default function Contact() {
  const [copied, setCopied] = useState(false)
  const [form, setForm] = useState({ name: '', message: '' })

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch { /* presse-papiers indisponible */ }
  }

  const [sent, setSent] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    const text = `${form.message}\n\n— ${form.name}`
    let copied = false
    try {
      await navigator.clipboard.writeText(text)
      copied = true
    } catch { /* presse-papiers indisponible */ }
    setSent(copied ? 'copied' : 'manual')
    if (!isSandboxed) {
      const subject = encodeURIComponent(`Contact portfolio — ${form.name}`)
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${encodeURIComponent(text)}`
    }
  }

  const channels = [
    { icon: Mail, label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
    { icon: Phone, label: 'Téléphone', value: profile.phone, href: profile.phoneHref },
    { icon: Linkedin, label: 'LinkedIn', value: profile.linkedinLabel, href: profile.linkedin, external: true },
    { icon: MapPin, label: 'Basé à', value: profile.location },
  ]

  return (
    <section id="contact" className="relative overflow-hidden bg-ink pb-16 pt-28 md:pt-40">
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-[50vmax] w-[80vmax] -translate-x-1/2 translate-y-1/2 rounded-full bg-electric/[0.08] blur-[120px]" />
      <div className="container-x relative">
        <Reveal>
          <div className="mb-6 flex items-center gap-4">
            <span className="font-mono text-[11px] text-electric">05</span>
            <span className="h-px w-10 bg-white/20" />
            <span className="eyebrow">Contact</span>
          </div>
          <h2 className="font-display text-[clamp(3rem,10vw,9rem)] leading-[0.9] tracking-tight text-ivory">
            Prochaine <em className="text-silver">destination ?</em>
          </h2>
        </Reveal>

        <div className="mt-20 grid gap-16 md:grid-cols-12">
          <div className="md:col-span-6">
            <ul className="border-t border-white/10">
              {channels.map(({ icon: Icon, label, value, href, external }, i) => {
                const Inner = (
                  <>
                    <Icon size={18} className="text-silver-dim transition-colors group-hover:text-electric" />
                    <span className="w-28 font-mono text-[10px] uppercase tracking-[0.2em] text-silver-dim">{label}</span>
                    <span className="flex-1 break-all text-[15px] text-ivory md:text-[17px]">{value}</span>
                    {href && <ArrowUpRight size={16} className="text-silver-dim transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ivory" />}
                  </>
                )
                return (
                  <Reveal as="li" key={label} delay={0.06 * i} className="border-b border-white/10">
                    {href ? (
                      <a href={href} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined} className="group flex items-center gap-5 py-6">
                        {Inner}
                      </a>
                    ) : (
                      <div className="group flex items-center gap-5 py-6">{Inner}</div>
                    )}
                  </Reveal>
                )
              })}
            </ul>
            <Reveal className="mt-8 flex flex-wrap gap-3">
              <button onClick={copy} className="btn-ghost">
                {copied ? <Check size={16} /> : <Copy size={16} />}
                {copied ? 'Copié' : "Copier l'email"}
              </button>
              <a href={profile.cv} {...cvLinkProps} className="btn-ghost">
                <Download size={16} /> CV (PDF)
              </a>
            </Reveal>
          </div>

          <Reveal delay={0.15} className="md:col-span-5 md:col-start-8">
            <form onSubmit={submit} className="card p-8 md:p-10">
              <p className="eyebrow mb-8">Envoyer un message</p>
              <label className="block">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-silver-dim">Nom</span>
                <input
                  id="contact-name"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="mt-2 w-full border-b border-white/15 bg-transparent py-3 text-ivory outline-none transition-colors placeholder:text-silver-dim/60 focus:border-electric"
                  placeholder="Votre nom"
                />
              </label>
              <label className="mt-8 block">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-silver-dim">Message</span>
                <textarea
                  id="contact-message"
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="mt-2 w-full resize-none border-b border-white/15 bg-transparent py-3 text-ivory outline-none transition-colors placeholder:text-silver-dim/60 focus:border-electric"
                  placeholder="Parlons de votre projet…"
                />
              </label>
              <button type="submit" className="btn-primary mt-10 w-full justify-center">
                Envoyer <ArrowUpRight size={16} />
              </button>
              <p className="mt-4 text-center text-[12px] leading-relaxed text-silver-dim" aria-live="polite">
                {sent === 'copied' && <>Message copié. Collez-le dans un email à <span className="select-all text-ivory">{profile.email}</span>.</>}
                {sent === 'manual' && <>Copiez votre message et envoyez-le à <span className="select-all text-ivory">{profile.email}</span>.</>}
                {!sent && (isSandboxed ? 'Votre message sera copié, prêt à être collé dans un email.' : 'Ouvre votre messagerie avec le message pré-rempli.')}
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
