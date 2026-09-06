import { Reveal } from './reveal'
import { ProductImage } from './product-image'

const included = [
  { index: '01', name: 'DƏMİR YUMRUQ', detail: 'Əsas simvolik obyekt' },
  { index: '02', name: 'MƏXMƏR ÇANTA', detail: 'Qoruyucu daxili təbəqə' },
  { index: '03', name: 'TƏQDİMAT QUTUSU', detail: 'Sərt konstruksiyalı qablaşdırma' },
]

const gallery = [
  {
    name: 'box-open',
    alt: 'Dəmir Yumruğun təqdimat qablaşdırması — açıq qutu',
    caption: 'Təqdimat qutusu — açıq',
    delay: 140,
  },
  {
    name: 'fist-beside-box',
    alt: 'Dəmir Yumruq obyekti təqdimat qutusunun yanında',
    caption: 'Obyekt və qutu',
    delay: 220,
  },
  // `as const` keeps `name` narrowed to ProductImageKey rather than widening
  // to string, which ProductImage's prop type rejects.
] as const

export function ChapterPresentation() {
  return (
    <section
      id="teqdimat"
      aria-label="Təqdimat"
      className="relative overflow-hidden bg-wine-deep"
    >
      {/* ── Quiet frame architecture ───────────────────── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(179,151,104,0.06),transparent_46%)]" />

      <div className="mx-auto w-full max-w-7xl px-6 md:px-10 py-24 md:py-32">
        {/* ── Chapter header — centered, ceremonial ────── */}
        <Reveal>
          <header className="relative text-center">
            <span
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none font-serif text-[clamp(9rem,22vw,18rem)] leading-none text-gold/[0.05]"
            >
              05
            </span>
            <div className="relative">
              <div className="mx-auto flex w-fit items-center gap-4">
                <span aria-hidden className="h-px w-10 bg-gradient-to-r from-transparent to-gold/40" />
                <p className="text-[10px] tracking-[0.45em] text-gold/70 uppercase">
                  Fəsil 05 — Təqdimat
                </p>
                <span aria-hidden className="h-px w-10 bg-gradient-to-l from-transparent to-gold/40" />
              </div>
              <h2 className="mx-auto mt-6 max-w-3xl font-serif text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.02] tracking-tight text-ivory text-balance">
                Qutudan daha çoxu
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-[15px] leading-[1.85] text-ivory-dim/75">
                Obyektin təqdimatı onun hekayəsinin son hissəsidir. Qorunma,
                təqdimat və ilk təəssürat bir araya gələrək Dəmir Yumruğun
                fiziki təcrübəsini tamamlayır.
              </p>
            </div>
          </header>
        </Reveal>

        {/* ── Main composition — vitrine + manifest ────── */}
        <div className="mt-16 md:mt-24 grid gap-10 md:grid-cols-12 md:gap-0">
          {/* Hero — museum vitrine with double frame */}
          <Reveal scale className="md:col-span-7 lg:col-span-8">
            <figure className="group relative h-full">
              {/* Outer frame */}
              <div className="relative h-full border border-gold/15 p-2.5 md:p-3">
                {/* Corner accents */}
                <span aria-hidden className="absolute left-0 top-0 h-8 w-8 border-l-2 border-t-2 border-gold/40" />
                <span aria-hidden className="absolute bottom-0 right-0 h-8 w-8 border-b-2 border-r-2 border-gold/40" />

                {/* Inner canvas */}
                <div className="relative h-full overflow-hidden border border-gold/[0.08] bg-[radial-gradient(ellipse_at_50%_38%,rgba(212,175,55,0.08),transparent_65%)]">
                  <div className="relative aspect-[4/3] md:aspect-auto md:h-full md:min-h-[620px]">
                    <ProductImage
                      name="full-set"
                      alt="Dəmir Yumruğun təqdimat dəsti — obyekt, məxmər çanta və qutu"
                      fit="contain"
                      sizes="(max-width: 768px) 92vw, 60vw"
                      className="absolute inset-0 h-full w-full object-contain p-10 md:p-16 transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
                    />
                  </div>

                  {/* Pedestal glow under the object */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-x-[15%] bottom-10 h-16 rounded-[100%] bg-gold/[0.07] blur-2xl"
                  />

                  <figcaption className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-wine-deep/90 via-wine-deep/40 to-transparent px-8 pb-6 pt-14">
                    <span className="text-[10px] tracking-[0.35em] text-ivory/70 uppercase">
                      Tam dəst
                    </span>
                    <span className="flex items-center gap-2" aria-hidden>
                      <span className="h-1 w-1 rounded-full bg-gold/70" />
                      <span className="h-px w-10 bg-gradient-to-r from-gold/50 to-transparent" />
                    </span>
                  </figcaption>
                </div>
              </div>
            </figure>
          </Reveal>

          {/* Manifest rail — evenly distributed, no dead space */}
          <div className="md:col-span-5 lg:col-span-4 flex flex-col justify-between md:py-4 md:pl-10 lg:pl-14">
            <Reveal delay={140}>
              <div>
                <div className="flex items-baseline justify-between border-b border-gold/20 pb-5">
                  <p className="text-[10px] tracking-[0.4em] text-gold/70 uppercase">
                    Sizə çatan
                  </p>
                  <span className="font-serif text-[12px] tabular-nums text-gold/40">
                    {String(included.length).padStart(2, '0')}
                  </span>
                </div>

                <ul>
                  {included.map((item) => (
                    <li
                      key={item.name}
                      className="group relative border-b border-gold/[0.08] py-7 transition-colors duration-500 hover:border-gold/30"
                    >
                      {/* Gold marker that grows on hover */}
                      <span
                        aria-hidden
                        className="absolute left-0 top-1/2 h-0 w-px -translate-y-1/2 bg-gold/60 transition-all duration-500 group-hover:h-8"
                      />
                      <div className="flex items-baseline gap-5 transition-transform duration-500 group-hover:translate-x-3">
                        <span className="font-serif text-[13px] tabular-nums text-gold/45">
                          {item.index}
                        </span>
                        <div className="flex flex-col gap-1.5">
                          <span className="text-[13px] font-medium tracking-[0.2em] text-ivory transition-colors duration-500 group-hover:text-gold">
                            {item.name}
                          </span>
                          <span className="text-[12px] leading-relaxed text-ivory/45">
                            {item.detail}
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* Statement — anchored to the bottom of the rail */}
            <Reveal delay={240}>
              <blockquote className="relative mt-14 md:mt-10 pl-6">
                <span
                  aria-hidden
                  className="absolute left-0 top-1 h-[calc(100%-0.5rem)] w-px bg-gradient-to-b from-gold/60 via-gold/25 to-transparent"
                />
                <p className="font-serif text-[clamp(1.35rem,2.4vw,1.75rem)] leading-[1.4] text-ivory/90 text-balance">
                  Çəki, səth və həcm bir araya gəldikdə simvol artıq yalnız
                  görüntü deyil —{' '}
                  <span className="text-gold">toxunulan bir obyektə</span>{' '}
                  çevrilir.
                </p>
              </blockquote>
            </Reveal>
          </div>
        </div>

        {/* ── Gallery — diptych fused into one band ────── */}
        <div className="mt-20 md:mt-28">
          <Reveal>
            <div className="mb-10 flex items-center gap-6">
              <p className="shrink-0 text-[10px] tracking-[0.4em] text-gold/60 uppercase">
                Detallara baxış
              </p>
              <span aria-hidden className="h-px flex-1 bg-gradient-to-r from-gold/25 to-transparent" />
            </div>
          </Reveal>

          <div className="grid gap-6 sm:grid-cols-2 md:gap-8">
            {gallery.map((img, i) => (
              <Reveal key={img.name} scale delay={img.delay}>
                <figure
                  className={`group relative overflow-hidden border border-gold/10 bg-gradient-to-b from-gold/[0.05] to-transparent transition-colors duration-500 hover:border-gold/25 ${
                    i === 1 ? 'sm:translate-y-8' : ''
                  }`}
                >
                  <div className="relative aspect-[16/11]">
                    <ProductImage
                      name={img.name}
                      alt={img.alt}
                      fit="contain"
                      sizes="(max-width: 640px) 92vw, 46vw"
                      className="absolute inset-0 h-full w-full object-contain p-8 md:p-10 transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
                    />
                  </div>
                  <figcaption className="flex items-center justify-between border-t border-gold/10 px-7 py-5">
                    <span className="text-[10px] tracking-[0.3em] text-gold/65 uppercase">
                      {img.caption}
                    </span>
                    <span
                      aria-hidden
                      className="font-serif text-[12px] tabular-nums text-gold/30"
                    >
                      {String(i + 1).padStart(2, '0')} / 02
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>

          {/* Extra bottom room for the offset card */}
          <div aria-hidden className="hidden sm:block h-8" />
        </div>

        {/* ── Closing rule — chapter feels finished ────── */}
        <Reveal delay={120}>
          <div className="mt-20 flex items-center justify-center gap-4">
            <span aria-hidden className="h-px w-16 bg-gradient-to-r from-transparent to-gold/30" />
            <span aria-hidden className="h-1.5 w-1.5 rotate-45 border border-gold/50" />
            <span aria-hidden className="h-px w-16 bg-gradient-to-l from-transparent to-gold/30" />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
