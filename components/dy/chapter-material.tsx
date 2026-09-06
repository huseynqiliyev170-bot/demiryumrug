import { Reveal } from './reveal'
import { ProductImage } from './product-image'
import type { ProductImageKey } from '@/lib/image-data'

/** The three orientation studies this chapter is captioned for. */
const IMAGES = {
  main: 'fist-back',
  profile: 'fist-profile',
  top: 'fist-top',
} as const satisfies Record<string, ProductImageKey>

const SPECS = [
  { num: '01', label: 'FORMA', desc: 'Metalın fiziki ifadəsi — gücün geometriyası.' },
  { num: '02', label: 'AĞIRLIQ', desc: 'Metalın kütləsi — möhkəmliyin hissi.' },
  { num: '03', label: 'TOXUNUŞ', desc: 'Səthin toxunuşu — işığın və kölgənin oyunu.' },
] as const

/* ── Reusable figure card: always fills its grid cell ── */

function GalleryFigure({
  name,
  alt,
  tag,
  title,
  numeral,
  sizes,
  large = false,
}: {
  name: ProductImageKey
  alt: string
  tag: string
  title: string
  numeral: string
  sizes: string
  large?: boolean
}) {
  return (
    <figure className="group relative h-full overflow-hidden border border-gold/[0.08] bg-gradient-to-b from-gold/[0.06] to-transparent">
      {/* Inner gold frame */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-3 z-10 border border-gold/15 transition-colors duration-700 group-hover:border-gold/30"
      />

      {/* The object stays whole — the grid dictates the cell height, not the photo. */}
      <ProductImage
        name={name}
        alt={alt}
        fit="contain"
        sizes={sizes}
        className={`absolute inset-0 h-full w-full object-contain transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100 ${
          large ? 'p-8 pb-24 md:p-12 md:pb-28' : 'p-6 pb-20 md:p-8 md:pb-24'
        }`}
      />

      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-wine-deep/70 via-transparent to-transparent"
      />

      <figcaption
        className={`absolute inset-x-0 bottom-0 z-10 flex items-end justify-between ${large ? 'p-8 md:p-10' : 'p-6 md:p-8'
          }`}
      >
        <div>
          <span className="block text-[10px] uppercase tracking-[0.4em] text-gold/80">
            {tag}
          </span>
          <span
            className={`mt-2 block font-serif text-ivory/90 ${large ? 'text-lg' : 'text-base'
              }`}
          >
            {title}
          </span>
        </div>

        <span
          aria-hidden
          className={`font-serif leading-none text-gold/20 ${large ? 'text-5xl' : 'text-4xl'
            }`}
        >
          {numeral}
        </span>
      </figcaption>
    </figure>
  )
}

export function ChapterMaterial() {
  return (
    <section
      id="forma"
      aria-labelledby="forma-heading"
      className="relative overflow-hidden bg-wine-deep"
    >
      {/* ───────── Atmosphere (всё привязано к краям, ничего не «уезжает») ───────── */}

      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(179,151,104,0.055),transparent_42%)]" />
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-black/20 to-transparent" />

        {/* декоративная цифра: прижата к правому краю, обрезается overflow-hidden секции */}
        <span className="absolute right-0 top-16 select-none font-serif text-[clamp(10rem,24vw,24rem)] leading-none tracking-tighter text-gold/[0.03]">
          04
        </span>
      </div>

      {/* единый контейнер — все ряды живут в одной сетке */}
      <div className="relative mx-auto w-full max-w-7xl px-6 py-28 md:px-12 md:py-40">

        {/* ───────── Header: 12 колонок, заголовок 1–7, текст 9–12, низ выровнен ───────── */}

        {/* ───────── Header: левая 7 — заголовок, правая 5 — описание + спеки ───────── */}

        <header className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-10 lg:gap-14">

          {/* Левая колонка */}
          <Reveal className="md:col-span-7">
            <p className="flex items-center gap-4 text-[11px] font-medium uppercase tracking-[0.45em] text-gold/70">
              <span aria-hidden className="h-px w-10 bg-gold/40" />
              Fəsil 04 — Forma
            </p>

            <h2
              id="forma-heading"
              className="mt-7 font-serif text-[clamp(3rem,7.5vw,6rem)] leading-[0.92] tracking-[-0.02em] text-ivory"
            >
              Forma.
              <br />
              <span className="text-gold">Ağırlıq.</span>
              <br />
              Toxunuş.
            </h2>
          </Reveal>

          {/* Правая колонка: тянется на всю высоту заголовка, контент распределён сверху вниз */}
          <Reveal
            className="flex flex-col md:col-span-5 md:justify-between"
            delay={150}
          >
            {/* Описание — выровнено по верху, на одной линии с кикером */}
            <p className="border-l border-gold/25 pl-6 text-[15px] leading-[1.85] text-ivory-dim/70 md:mt-1">
              Metalın ağırlığı, konturun kəskinliyi və işığın səthdə yaratdığı
              kölgələr — hamısı bir hekayəni danışır.
            </p>

            {/* Спеки — заполняют низ колонки, раньше вообще не рендерились */}
            <ul className="mt-12 md:mt-10">
              {SPECS.map((spec, i) => (
                <li
                  key={spec.num}
                  className={`flex items-baseline gap-5 py-4 ${i > 0 ? 'border-t border-gold/10' : ''
                    }`}
                >
                  <span className="font-serif text-xl leading-none text-gold/40">
                    {spec.num}
                  </span>
                  <div className="flex flex-1 flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                    <h3 className="text-[11px] font-medium uppercase tracking-[0.35em] text-gold/80">
                      {spec.label}
                    </h3>
                    <p className="text-[13px] leading-[1.7] text-ivory-dim/60">
                      {spec.desc}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </header>


        {/* ───────── Gallery: one grid; the right column matches the lead photo's height ───────── */}

        <div className="mt-20 grid grid-cols-1 gap-8 md:mt-28 md:grid-cols-12 md:gap-10">

          {/* Lead photo: aspect-ratio on mobile; on md+ it sets the row height */}
          <Reveal scale className="md:col-span-7" delay={100}>
            <div className="relative aspect-[3/4] md:aspect-[4/5]">
              <GalleryFigure
                large
                name={IMAGES.main}
                alt="Dəmir Yumruğun arxa görünüşü"
                tag="Səth"
                title="Arxa görünüş"
                numeral="I"
                sizes="(max-width: 768px) 92vw, 55vw"
              />
            </div>
          </Reveal>

          {/* Right pair: grid-rows-2 stretches both cards to the lead photo's height */}
          <div className="grid grid-cols-1 gap-8 md:col-span-5 md:grid-rows-2 md:gap-10">
            <Reveal scale delay={200} className="md:h-full">
              <div className="relative aspect-[16/10] md:aspect-auto md:h-full">
                <GalleryFigure
                  name={IMAGES.profile}
                  alt="Dəmir Yumruğun yan profil görünüşü"
                  tag="Profil"
                  title="Yan görünüş"
                  numeral="II"
                  sizes="(max-width: 768px) 92vw, 38vw"
                />
              </div>
            </Reveal>

            <Reveal scale delay={300} className="md:h-full">
              <div className="relative aspect-[4/3] md:aspect-auto md:h-full">
                <GalleryFigure
                  name={IMAGES.top}
                  alt="Dəmir Yumruğun yuxarıdan görünüşü"
                  tag="Kontur"
                  title="Yuxarı görünüş"
                  numeral="III"
                  sizes="(max-width: 768px) 92vw, 38vw"
                />
              </div>
            </Reveal>
          </div>
        </div>

        {/* ───────── Specs: an even row of three ───────── */}

        <div className="mt-20 grid grid-cols-1 gap-10 border-t border-gold/15 pt-14 md:mt-28 md:grid-cols-3 md:gap-10">
          {SPECS.map((spec, i) => (
            <Reveal key={spec.num} delay={100 + i * 100}>
              <div className="flex items-baseline gap-5">
                <span className="font-serif text-3xl leading-none text-gold/30">
                  {spec.num}
                </span>
                <div>
                  <h3 className="text-[11px] font-medium uppercase tracking-[0.4em] text-gold/80">
                    {spec.label}
                  </h3>
                  <p className="mt-3 text-[14px] leading-[1.8] text-ivory-dim/70">
                    {spec.desc}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
