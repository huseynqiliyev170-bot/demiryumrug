'use client'

import { ChapterMark } from './chapter-mark'
import { DisplayLines } from './display-lines'
import { ProductImage } from './product-image'
import { Reveal } from './reveal'

/** One row of the technical entry: numeral, field, value. */
function SpecRow({
  index,
  label,
  value,
}: {
  index: string
  label: string
  value: string
}) {
  return (
    <div className="group grid grid-cols-[2.25rem_1fr] items-baseline gap-x-4 border-b border-[var(--rule)] py-3.5 transition-colors duration-500 hover:border-[var(--rule-strong)] sm:grid-cols-[2.5rem_8rem_1fr]">
      <span className="dy-num font-serif text-[0.6875rem] italic text-gold/45 transition-colors duration-500 group-hover:text-gold/85">
        {index}
      </span>
      <span className="dy-meta text-ivory/35">{label}</span>
      <span className="col-start-2 mt-1 font-serif text-[0.9375rem] text-ivory/85 sm:col-start-3 sm:mt-0">
        {value}
      </span>
    </div>
  )
}

/** The three meanings, told as short numbered theses — not floating slogans. */
const MEANINGS = [
  {
    index: '01',
    title: 'Güc',
    text: 'Metal və ağırlıq iradənin formasıdır. Obyekt ələ alındıqda adı nə deyirsə, onu hiss etdirir.',
  },
  {
    index: '02',
    title: 'Birlik',
    text: 'Yumruq ayrı-ayrı barmaqların birgə duruşudur — biri olmadan o biri möhkəm dayanmır.',
  },
  {
    index: '03',
    title: 'Zəfər',
    text: 'Postamentin üzərində tək bir yazı qalır: «Qarabağ Azərbaycandır!» — qalib gələn anın qeydi.',
  },
] as const

/** The physical facts, trimmed to what a collector actually asks. */
const SPECS = [
  { index: 'i', label: 'Material', value: 'Bürünc · 24K qızılı örtük' },
  { index: 'ii', label: 'Forma', value: 'Dəmir yumruq, qranit postament' },
  { index: 'iii', label: 'Gravür', value: '«Qarabağ Azərbaycandır!» — postament üzərində' },
  { index: 'iv', label: 'Təqdimat', value: 'Qutu və qoruyucu astar' },
  { index: 'v', label: 'İstehsal', value: 'Əl işi · Bakı, Azərbaycan' },
] as const

export function ChapterObject() {
  return (
    <section
      id="obyekt"
      aria-labelledby="obyekt-basliq"
      className="dy-section relative overflow-hidden bg-wine-deep"
    >
      {/* One light source, placed where the exhibit is. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_14%_24%,rgba(196,164,104,0.06),transparent_42%)]" />
      </div>

      <div className="dy-measure relative">
        <ChapterMark index="01" title="Obyekt" note="Bakı · 2026" />

        {/* ── Title ───────────────────────────────────── */}
        <div className="relative mt-[var(--sp-block)]">
          <DisplayLines
            id="obyekt-basliq"
            as="h2"
            delay={60}
            className="max-w-[62rem] text-(length:--fs-display-l) text-ivory"
            lines={[
              { text: 'BİR SİMVOLUN' },
              { text: 'HEKAYƏSİ', className: 'dy-display-outline' },
            ]}
          />

          <Reveal
            delay={320}
            className="mt-8 flex items-center gap-4 md:absolute md:bottom-2 md:right-0 md:mt-0"
          >
            <span aria-hidden="true" className="h-px w-8 bg-gold/30" />
            <span className="dy-meta text-ivory/35">Dəmir Yumruq</span>
          </Reveal>
        </div>

        {/* ── Exhibition. Photograph and text share one top edge and
           land within a line of each other at the bottom — no parallax,
           no offset frame, nothing drifts out of level. ── */}
        <div className="mt-[var(--sp-block)] lg:grid lg:grid-cols-[minmax(0,1.08fr)_minmax(20rem,0.72fr)] lg:items-start lg:gap-x-16 xl:gap-x-20">
          {/* The chapter's lead photograph: the object on its presentation
              box, so form and packaging are read in a single frame. */}
          <Reveal variant="mask">
            <figure>
              <div className="relative aspect-[3/2] overflow-hidden border border-ivory/[0.08] bg-[#0c0a09]">
                <ProductImage
                  name="fist-on-box"
                  alt="Dəmir Yumruq obyekti təqdimat qutusunun üzərində"
                  fit="cover"
                  sizes="(max-width: 1024px) 92vw, 58vw"
                  className="h-full w-full"
                />

                {/* Cinematic falloff, so the plate sits in the room rather
                    than floating on top of it. */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0d0a09]/75 via-transparent to-[#0d0a09]/10"
                />
              </div>

              <figcaption className="mt-5 flex items-baseline justify-between gap-4 border-t border-[var(--rule)] pt-4">
                <span className="dy-eyebrow text-gold/70">Obyekt və təqdimat qutusu</span>
                <span className="dy-num font-serif text-xs italic text-ivory/40">
                  fig. 01
                </span>
              </figcaption>
            </figure>
          </Reveal>

          {/* ── The editorial column ──────────────────── */}
          <div className="mt-[var(--sp-block)] lg:mt-0">
            <Reveal delay={120} className="flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-7 bg-gold/50" />
              <span className="dy-meta text-gold/70">Simvol haqqında</span>
            </Reveal>

            <DisplayLines
              as="p"
              delay={200}
              className="mt-7 max-w-[31rem] text-(length:--fs-lead) leading-[1.18] text-ivory"
              lines={[
                { text: 'Bu yumruq jest deyil —' },
                { text: 'ağırlığı olan bir işarədir.', className: 'text-gold' },
              ]}
            />

            <Reveal
              as="p"
              delay={280}
              className="mt-7 max-w-[30rem] text-[0.9375rem] leading-[1.8] text-ivory-dim/90"
            >
              Hər obyekt bürüncdən tökülür, əl ilə cilalanır və 24 karat qızılla
              örtülür. Qranit postament formaya ağırlıq verir, üzərindəki
              yazı isə ona mənasını.
            </Reveal>

            {/* The technical entry, reduced to the essentials. */}
            <Reveal variant="plain" className="mt-9">
              <div className="flex items-baseline justify-between pb-1">
                <span className="dy-meta text-gold/70">Texniki qeyd</span>
                <span className="dy-num font-serif text-xs italic text-ivory/30">
                  01 / 05
                </span>
              </div>
              <div className="border-t border-[var(--rule)]">
                {SPECS.map((row) => (
                  <SpecRow key={row.index} {...row} />
                ))}
              </div>
            </Reveal>
          </div>
        </div>

        {/* ── The three meanings, full width below the exhibition ── */}
        <Reveal
          variant="plain"
          className="mt-[var(--sp-block)] border-y border-[var(--rule)]"
        >
          <div className="grid divide-y divide-[var(--rule)] md:grid-cols-3 md:divide-x md:divide-y-0">
            {MEANINGS.map((item, i) => (
              <Reveal
                key={item.index}
                delay={i * 90}
                className="py-8 md:px-8 md:py-10 md:first:pl-0 md:last:pr-0"
              >
                <div className="flex items-baseline gap-3">
                  <span className="dy-num font-serif text-[0.6875rem] italic text-gold/55">
                    {item.index}
                  </span>
                  <h3 className="font-serif text-[1.25rem] text-ivory">
                    {item.title}
                  </h3>
                </div>
                <p className="mt-3 max-w-[24rem] text-[0.8125rem] leading-[1.75] text-ivory-dim/80">
                  {item.text}
                </p>
              </Reveal>
            ))}
          </div>
        </Reveal>

        <Reveal delay={140} className="mt-8 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3">
          <p className="font-serif text-[1.0625rem] italic leading-[1.6] text-ivory/70">
            «Formanın təsiri ilk baxışda gəlir. Mənası isə bir az sonra.»
          </p>
          <span className="dy-meta dy-num shrink-0 text-gold/35">Object / 01</span>
        </Reveal>
      </div>
    </section>
  )
}
