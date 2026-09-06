'use client'

import { useEffect, useRef, type CSSProperties } from 'react'
import { Magnetic } from './magnetic'
import { ProductImage } from './product-image'

/**
 * One ordered arrival: rail → the sentence opens → the ground is drawn → the
 * monument rises from it → the word beneath it lands → the engraving is cut →
 * dedication → actions → closing rail.
 */
const d = (ms: number) => ({ ['--hero-delay' as string]: `${ms}ms` }) as CSSProperties

export function Hero() {
  const spotRef = useRef<HTMLDivElement | null>(null)

  /**
   * The object is lit by the visitor. A single brass key light follows the
   * pointer across the room, written straight to CSS custom properties so the
   * gradient is composited and React never re-renders on pointer move.
   * Fine pointers only: on touch the light stays on the axis where it was set.
   */
  useEffect(() => {
    const el = spotRef.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    let raf = 0
    let x = 0
    let y = 0

    const apply = () => {
      raf = 0
      el.style.setProperty('--mx', `${x.toFixed(1)}%`)
      el.style.setProperty('--my', `${y.toFixed(1)}%`)
    }

    const onMove = (event: PointerEvent) => {
      x = (event.clientX / window.innerWidth) * 100
      y = (event.clientY / window.innerHeight) * 100
      if (!raf) raf = requestAnimationFrame(apply)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <section
      id="giris"
      aria-label="Giriş"
      className="relative isolate flex min-h-svh flex-col overflow-hidden bg-wine-deep"
    >
      {/* ── The room ────────────────────────────────────
          Falloff, a shaft of light down the axis, the visitor's key light,
          and grain. Nothing decorative: this is the lighting rig. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="dy-room absolute inset-0" />
        <div ref={spotRef} className="dy-spot absolute inset-0" />
        <div className="dy-hero-grain absolute inset-0" />
      </div>

      <div className="dy-measure flex flex-1 flex-col pt-[4.75rem] md:pt-[6rem]">
        {/* ── Opening rail ──────────────────────────── */}
        <div className="flex items-center justify-between gap-6">
          <span className="flex items-center gap-3.5 md:gap-5">
            <span
              aria-hidden="true"
              className="dy-hero-draw h-px w-8 bg-gold/55 md:w-14"
              style={d(80)}
            />
            <span className="overflow-hidden">
              <span className="dy-hero-in dy-eyebrow block text-gold" style={d(140)}>
                Zəfərin Rəmzi
              </span>
            </span>
          </span>
          <span className="dy-hero-in dy-meta dy-num text-ivory/30" style={d(220)}>
            MMXXVI · Bakı
          </span>
        </div>

        <div className="my-auto flex w-full flex-col pt-[clamp(1.5rem,4.2svh,3.25rem)]">
          {/* ── The monument ────────────────────────────
              The heading is a sentence the object completes. It stands on the
              plinth between the two words, breaching the baseline above it. */}
          <div
            className="dy-monument"
            style={{ ['--object-height' as string]: 'clamp(11rem, 35svh, 24rem)' }}
          >
            <h1 className="dy-monument-type">
              <span className="dy-line-mask">
                <span className="dy-monument-word dy-hero-rise text-ivory" style={d(260)}>
                  GÜCÜN
                </span>
              </span>
              <span aria-hidden="true" className="dy-monument-void" />
              <span className="dy-line-mask">
                <span className="dy-monument-word dy-hero-rise text-gold" style={d(820)}>
                  SİMVOLU
                </span>
              </span>
            </h1>

            {/* The ground, drawn before the object arrives to stand on it. */}
            <span
              aria-hidden="true"
              className="dy-plinth dy-monument-ground dy-hero-draw dy-hero-draw--axis"
              style={d(300)}
            />

            <figure className="dy-monument-figure z-10">
              <div className="dy-object">
                {/* Outside the clipped frame, so they straddle the plinth line
                    the object stands on rather than being trimmed with it. */}
                <span aria-hidden="true" className="dy-object-pool dy-hero-in" style={d(760)} />
                <span aria-hidden="true" className="dy-object-shadow dy-hero-in" style={d(760)} />
                <div className="dy-object-frame dy-hero-raise" style={d(420)}>
                  <ProductImage
                    name="fist-front"
                    alt="Dəmir Yumruq — qranit qaidə üzərində qızılı örtüklü bürünc yumruq"
                    priority
                    sizes="(max-width: 768px) 60vw, 30rem"
                  />
                </div>
              </div>
            </figure>
          </div>

          {/* ── The engraving, as it is cut into the base ─ */}
          <p
            className="dy-hero-cut dy-inscription mt-[clamp(1rem,2.4svh,1.75rem)] text-center text-gold/85"
            style={d(1000)}
          >
            Qarabağ Azərbaycandır
          </p>

          {/* ── Dedication and actions ────────────────── */}
          <div className="mt-[clamp(1.5rem,4svh,2.75rem)] flex flex-col items-center">
            <p
              className="dy-hero-in max-w-[34ch] text-center text-[0.9375rem] leading-[1.85] text-ivory/55 md:text-[1.0625rem]"
              style={d(1080)}
            >
              Bəzən gücü sözlə ifadə etmək olmur.
              <span className="mt-1.5 block text-ivory/90">
                Bu dəfə onu əlinizdə saxlaya bilərsiniz.
              </span>
            </p>

            <div
              className="dy-hero-in mt-8 flex flex-wrap items-stretch justify-center gap-3.5 sm:gap-5"
              style={d(1180)}
            >
              <Magnetic strength={0.16} className="grow sm:grow-0">
                <a
                  href="#sifaris"
                  className="dy-cta group flex w-full items-center justify-center gap-3.5 bg-gold px-8 py-4 text-[0.6875rem] font-semibold tracking-[0.28em] text-wine-deep uppercase sm:w-auto sm:px-10"
                >
                  Sifariş et
                  <span aria-hidden="true" className="dy-arrow">
                    →
                  </span>
                </a>
              </Magnetic>
              <a
                href="#obyekt"
                className="dy-ghost flex grow items-center justify-center border border-ivory/15 px-8 py-4 text-[0.6875rem] tracking-[0.28em] text-ivory/70 uppercase sm:grow-0 sm:px-10"
              >
                Kəşf et
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Closing rail ────────────────────────────────
          The frame the opening rail started and the way out. The full catalogue
          belongs to the chapter below, not here. */}
      <div className="dy-hero-in border-t border-[var(--rule)]" style={d(1300)}>
        <div className="dy-measure flex items-center justify-between gap-6 py-4 md:py-5">
          <span className="dy-meta text-ivory/30">
            Əl işi obyekt
            <span className="dy-num hidden sm:inline"> · Bakı</span>
          </span>
          <a href="#obyekt" className="group flex items-center gap-2.5">
            <span className="dy-meta text-ivory/30 transition-colors duration-500 group-hover:text-gold">
              Aşağı
            </span>
            <span aria-hidden="true" className="dy-arrow--down text-gold/55">
              ↓
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}
