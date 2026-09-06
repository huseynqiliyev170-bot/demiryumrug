import { Reveal } from './reveal'

const facts = [
  {
    number: '01',
    label: 'Material',
    value: 'Bürünc · 24K qızılı örtük',
  },
  {
    number: '02',
    label: 'İstehsal',
    value: 'Əl işi · Bakı',
  },
  {
    number: '03',
    label: 'Təqdimat',
    value: 'Qutu · qoruyucu astar',
  },
] as const

export function ArtifactIndex() {
  return (
    <section aria-label="Obyektin pasportu" className="relative overflow-hidden border-y border-gold/15 bg-ink">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_140%_at_15%_50%,rgba(185,154,98,0.11),transparent_68%)]"
      />

      <div className="dy-measure relative py-10 md:py-14">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <Reveal className="lg:col-span-4">
            <div className="flex items-center gap-4">
              <span aria-hidden className="h-px w-8 bg-gold/60" />
              <p className="dy-eyebrow text-gold/75">Obyektin pasportu</p>
            </div>
            <p className="mt-5 max-w-sm font-serif text-[clamp(1.65rem,3vw,2.6rem)] leading-[1.08] text-ivory">
              Əl işi. Ağır.
              <span className="block text-gold">Yadda qalan.</span>
            </p>
          </Reveal>

          <div className="grid border-y border-ivory/10 sm:grid-cols-3 sm:border-y-0 lg:col-span-8">
            {facts.map((fact, index) => (
              <Reveal
                key={fact.number}
                delay={100 + index * 90}
                className="group relative border-b border-ivory/10 py-6 last:border-b-0 sm:border-b-0 sm:border-l sm:px-7 lg:px-9"
              >
                <span className="font-serif text-[2.3rem] leading-none text-gold/25 transition-colors duration-500 group-hover:text-gold/55">
                  {fact.number}
                </span>
                <p className="mt-5 text-[9px] tracking-[0.32em] text-gold/60 uppercase">
                  {fact.label}
                </p>
                <p className="mt-2 text-[13px] leading-relaxed text-ivory/80">
                  {fact.value}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
