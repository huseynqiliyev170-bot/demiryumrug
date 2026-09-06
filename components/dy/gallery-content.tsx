'use client'

import { AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { SiteHeader } from '@/components/dy/site-header'
import { SiteFooter } from '@/components/dy/site-footer'
import { Reveal } from '@/components/dy/reveal'
import { CataloguePlate } from '@/components/dy/gallery/catalogue-plate'
import { PlateViewer } from '@/components/dy/gallery/plate-viewer'
import { Turntable } from '@/components/dy/gallery/turntable'
import { catalogue, plateNo, plates } from '@/lib/gallery-plates'

/** Plates before the catalogue — the rotation study the turntable consumes. */
const CATALOGUE_OFFSET = plates.length - catalogue.length
const catalogueRange = catalogue.length
  ? `${plateNo(catalogue[0])} — ${plateNo(catalogue[catalogue.length - 1])}`
  : '—'

const catalogueLayout = {
  standard: {
    className: 'md:col-span-1 xl:col-span-6',
    sizes: '(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 48vw',
  },
  narrow: {
    className: 'md:col-span-1 xl:col-span-5',
    sizes: '(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 40vw',
  },
  wide: {
    className: 'md:col-span-1 xl:col-span-7',
    sizes: '(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 56vw',
  },
  feature: {
    className: 'md:col-span-2 xl:col-span-12',
    sizes: '(max-width: 768px) 100vw, 94vw',
  },
} as const

export function GalleryContent() {
  const [viewing, setViewing] = useState<number | null>(null)

  return (
    <>
      <SiteHeader />

      <main className="relative bg-wine-deep">
        {/* A single warm pool behind the object — the only light on the wall. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[140vh] bg-[radial-gradient(60%_45%_at_62%_28%,color-mix(in_srgb,var(--gold)_9%,transparent),transparent_70%)]"
        />

        <div className="relative">
          <Turntable onOpen={setViewing} />
        </div>

        {/* ── The catalogue ──────────────────────────────────────────── */}
        <section
          aria-labelledby="kataloq"
          className="relative mx-auto max-w-[100rem] px-5 pb-24 pt-20 sm:px-8 md:pb-32 md:pt-28 lg:px-12"
        >
          <Reveal as="header" className="grid gap-8 border-b border-ivory/10 pb-10 md:pb-14 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-4">
                <span aria-hidden className="h-px w-8 bg-gold/50" />
                <p className="text-[10px] tracking-[0.42em] text-gold/80 uppercase">
                  Kataloq
                </p>
                <span aria-hidden className="h-px w-8 bg-ivory/10" />
                <p className="text-[10px] tabular-nums tracking-[0.28em] text-ivory-dim/50">
                  {catalogueRange}
                </p>
              </div>

              <h2
                id="kataloq"
                className="mt-7 font-serif text-[clamp(2.4rem,5vw,4.5rem)] leading-[0.95] tracking-[-0.02em] text-ivory"
              >
                Obyekt və təqdimat
              </h2>
            </div>

            <p className="max-w-xl border-l border-gold/25 pl-6 text-[15px] leading-[1.85] text-ivory-dim/75 lg:col-span-5">
              Müxtəlif rakurslar, səth detalları və təqdimat qutusu. Hər kadrı açaraq obyektə yaxından baxa bilərsiniz.
            </p>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 items-start gap-x-8 gap-y-14 md:mt-16 md:grid-cols-2 md:gap-y-20 xl:grid-cols-12 xl:gap-x-12 xl:gap-y-24">
            {catalogue.map((plate, i) => {
              const layout = catalogueLayout[plate.layout ?? 'standard']
              return (
                <Reveal
                  key={plate.src}
                  className={layout.className}
                  delay={i % 2 === 0 ? 0 : 110}
                >
                  <CataloguePlate
                    plate={plate}
                    sizes={layout.sizes}
                    onOpen={() => setViewing(CATALOGUE_OFFSET + i)}
                  />
                </Reveal>
              )
            })}
          </div>
        </section>

        {/* ── Closing ────────────────────────────────────────────────── */}
        <section className="relative border-t border-ivory/[0.07]">
          <Reveal className="mx-auto max-w-[104rem] px-5 py-16 text-center md:px-10 md:py-24">
            <p className="mx-auto max-w-lg font-serif text-[clamp(1.375rem,2.6vw,2rem)] leading-[1.35] text-ivory/85">
              «Güc — detallardadır.»
            </p>
            <p className="mt-8 text-[10px] tabular-nums tracking-[0.5em] text-gold/50">
              MMXXVI
            </p>
          </Reveal>
        </section>
      </main>
      <SiteFooter />

      <AnimatePresence>
        {viewing !== null ? (
          <PlateViewer
            index={viewing}
            onClose={() => setViewing(null)}
            onNavigate={setViewing}
          />
        ) : null}
      </AnimatePresence>
    </>
  )
}
