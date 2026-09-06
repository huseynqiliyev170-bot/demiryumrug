import { DisplayLines } from './display-lines'
import { ProductImage } from './product-image'
import { Reveal } from './reveal'

export function Closing() {
  return (
    <section
      aria-labelledby="son-basliq"
      className="relative overflow-hidden border-t border-gold/10 bg-wine-deep"
    >
      {/* The last pool of light in the room, behind the final plate. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_78%_45%,color-mix(in_srgb,var(--gold)_10%,transparent),transparent_70%)]"
      />

      <div className="relative mx-auto w-full max-w-[120rem] px-6 py-24 md:px-10 md:py-32 lg:py-36">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-x-16 xl:gap-x-20">
          {/* The final word. */}
          <div className="lg:col-span-7">
            <Reveal variant="line" className="flex items-center gap-4">
              <span aria-hidden="true" className="h-px w-10 bg-gold/60" />
              <p className="dy-eyebrow text-gold">Son qeyd</p>
              <span aria-hidden="true" className="h-px w-10 bg-ivory/10" />
              <p className="dy-num text-[10px] tracking-[0.28em] text-ivory-dim/60">MMXXVI</p>
            </Reveal>

            <DisplayLines
              id="son-basliq"
              as="h2"
              delay={80}
              className="mt-9 text-(length:--fs-display-l) text-ivory"
              lines={[
                { text: 'Güc keçir,' },
                { text: 'yaddaş qalır.', className: 'text-gold' },
              ]}
            />

            <Reveal
              as="p"
              delay={220}
              className="mt-8 max-w-xl border-l border-gold/25 pl-6 text-[15px] leading-[1.85] text-ivory-dim/85"
            >
              Zəfər anı bir saniyə sürür — obyekt isə nəsillərlə qalır. Dəmir
              Yumruq həmin anı əbədi saxlamaq üçün tökülüb: bürünc, qızıl və
              üzərində tək bir cümlə — «Qarabağ Azərbaycandır!»
            </Reveal>

            <Reveal delay={320} className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href="#sifaris"
                className="dy-cta inline-flex items-center gap-3 bg-gold px-10 py-4 text-[12px] font-semibold tracking-[0.22em] text-wine-deep"
              >
                SİFARİŞ ET <span aria-hidden="true" className="dy-arrow">→</span>
              </a>
              <a
                href="/gallery"
                className="dy-ghost border border-ivory/25 px-10 py-4 text-[12px] font-medium tracking-[0.22em] text-ivory"
              >
                QALEREYAYA BAX <span aria-hidden="true" className="dy-arrow">→</span>
              </a>
            </Reveal>
          </div>

          {/* The full set, presented as the exhibition's closing plate. */}
          <Reveal variant="mask" delay={160} className="lg:col-span-5">
            <figure className="group relative">
              <span
                aria-hidden="true"
                className="absolute -inset-4 border border-gold/12 transition-[inset,border-color] duration-1000 ease-[var(--e-out)] group-hover:-inset-6 group-hover:border-gold/25 md:-inset-5"
              />
              <div className="relative aspect-[2/3] overflow-hidden border border-[var(--rule)] bg-[#0c0a09]">
                <ProductImage
                  name="full-set"
                  alt="Dəmir Yumruq tam dəsti — obyekt və təqdimat qutusu"
                  fit="cover"
                  sizes="(max-width: 1024px) 92vw, 38vw"
                  className="h-full w-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0d0a09]/60 via-transparent to-transparent"
                />
              </div>
              <figcaption className="mt-5 flex items-baseline justify-between gap-6">
                <span className="dy-meta text-ivory-dim">Tam dəst — obyekt və təqdimat qutusu</span>
                <span className="dy-num shrink-0 text-[11px] tracking-[0.18em] text-gold/70">№ 001</span>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
