import { Reveal } from './reveal'
import { ProductImage } from './product-image'

const keywords = [
  { index: 'I', word: 'GÜC', definition: 'Çətinlik qarşısında geri çəkilməmək.' },
  { index: 'II', word: 'BİRLİK', definition: 'Bir məqsəd ətrafında birləşmək.' },
  { index: 'III', word: 'QƏTİYYƏT', definition: 'Qarşıya qoyulan məqsədə sona qədər bağlı qalmaq.' },
  { index: 'IV', word: 'ZƏFƏR', definition: 'Yaddaşda qalan nəticə.' },
]

export function ChapterSymbol() {
  return (
    <section
      id="simvol"
      aria-label="Simvol"
      className="relative bg-wine-deep overflow-hidden"
    >
      {/* ── Ambient depth: vignette + hairline grid ── */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(212,175,55,0.06),transparent_60%)]" />
        <div className="absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 bg-gold/[0.06] lg:block" />
      </div>

      {/* ── Giant ghost word behind content ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 select-none whitespace-nowrap font-serif text-[clamp(6rem,18vw,20rem)] leading-none tracking-tighter text-ivory/[0.03]"
      >
        SİMVOL
      </div>

      <div className="relative mx-auto w-full max-w-[110rem] px-6 md:px-12 py-16 md:py-24">

        {/* ── Chapter header: number + rule + title ── */}
        <div className="mb-16 md:mb-28">
          <Reveal>
            <div className="flex items-center gap-6">
              <span className="font-serif text-[clamp(3rem,6vw,5rem)] leading-none text-gold/25 tabular-nums">
                02
              </span>
              <div className="h-px flex-1 bg-gradient-to-r from-gold/40 via-gold/10 to-transparent" />
              <span className="text-[10px] tracking-[0.5em] text-gold/70 uppercase">
                Simvol
              </span>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <h2 className="mt-10 max-w-[18ch] font-serif text-[clamp(2.5rem,6.5vw,5.5rem)] leading-[1.02] tracking-tight text-ivory">
              Dəmir Yumruq{' '}
              <span className="italic text-gold">nəyi</span>{' '}
              simvolizə edir?
            </h2>
          </Reveal>
        </div>

        {/* ── Main spread ── */}
        <div className="lg:grid lg:grid-cols-12 lg:gap-16 xl:gap-24 items-start">

          {/* LEFT — image as monument */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <Reveal scale>
              <figure className="group relative">
                {/* Gold frame offset — signature detail */}
                <div
                  aria-hidden
                  className="absolute -inset-3 rounded-none border border-gold/20 transition-transform duration-700 group-hover:translate-x-2 group-hover:translate-y-2 md:-inset-4"
                />
                <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-b from-gold/[0.08] to-black/40">
                  <ProductImage
                    name="fist-angle"
                    alt="Dəmir Yumruq obyektinin yuxarı bucaqdan görüntüsü"
                    fit="cover"
                    sizes="(max-width: 1024px) 92vw, 40vw"
                    className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]"
                  />
                  {/* Bottom scrim + caption inside the image */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pt-24 pb-5 px-6">
                    <figcaption className="flex items-center justify-between">
                      <span className="text-[10px] tracking-[0.35em] uppercase text-ivory/80">
                        Dəmir Yumruq
                      </span>
                      <span className="text-[10px] tracking-[0.35em] uppercase text-gold/70">
                        MMXX
                      </span>
                    </figcaption>
                  </div>
                </div>
              </figure>
            </Reveal>

            {/* Quote moved under the image — intimate, not shouting */}
            <Reveal delay={150}>
              <blockquote className="mt-12 border-l border-gold/40 pl-6">
                <p className="font-serif text-[clamp(1.25rem,2vw,1.6rem)] leading-snug italic text-ivory/85 text-balance">
                  «Güc, birlik, qətiyyət, zəfər — hamısı bir simvolda.»
                </p>
              </blockquote>
            </Reveal>
          </div>

          {/* RIGHT — manifesto of values */}
          <div className="mt-20 lg:col-span-6 lg:col-start-7 lg:mt-0">
            <Reveal delay={100}>
              <p className="max-w-[52ch] text-[15px] leading-[1.9] text-ivory-dim">
                «Dəmir Yumruq» ifadəsi Azərbaycan ictimai yaddaşında güc,
                birlik, qətiyyət və Zəfər anlayışları ilə əlaqələnən güclü
                simvollardan birinə çevrilib. Hər detalında bir məna var.
              </p>
            </Reveal>

            <div className="mt-14 md:mt-16">
              {keywords.map((k, i) => (
                <Reveal key={k.word} delay={i * 110 + 200}>
                  <article className="group relative border-t border-ivory/10 py-8 transition-colors duration-500 hover:border-gold/40 md:py-10">
                    {/* Roman index — floats left, muted */}
                    <div className="grid grid-cols-[3.5rem_1fr] items-start gap-6 md:grid-cols-[5rem_1fr] md:gap-10">
                      <span className="pt-2 font-serif text-sm tracking-[0.3em] text-gold/40 transition-colors duration-500 group-hover:text-gold">
                        {k.index}
                      </span>
                      <div>
                        <h3 className="font-serif text-[clamp(2.25rem,4.5vw,3.5rem)] leading-none tracking-tight text-ivory transition-all duration-500 group-hover:translate-x-2 group-hover:text-gold">
                          {k.word}
                        </h3>
                        <p className="mt-3 max-w-[40ch] text-[13px] leading-relaxed text-ivory-dim/70 transition-colors duration-500 group-hover:text-ivory-dim">
                          {k.definition}
                        </p>
                      </div>
                    </div>
                    {/* Gold fill line on hover */}
                    <div className="absolute left-0 top-[-1px] h-px w-0 bg-gold transition-all duration-700 ease-out group-hover:w-full" />
                  </article>
                </Reveal>
              ))}
              <div className="border-t border-ivory/10" />
            </div>
          </div>
        </div>
      </div>

      {/* ── Vertical side label — editorial signature ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-6 top-1/2 hidden -translate-y-1/2 rotate-90 origin-right text-[10px] tracking-[0.6em] uppercase text-ivory/15 xl:block"
      >
        Güc · Birlik · Qətiyyət · Zəfər
      </div>
    </section>
  )
}
