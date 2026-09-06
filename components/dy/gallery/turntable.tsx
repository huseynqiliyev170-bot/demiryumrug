'use client'

import Image from 'next/image'
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion'
import { useRef, useState } from 'react'
import { plateNo, plates, rotation, type Plate } from '@/lib/gallery-plates'

const LAST = rotation.length - 1

/**
 * One rotation frame.
 *
 * Exactly one frame is ever visible: the nearest one takes the whole step and
 * the rest sit at zero. These plates are transparent cut-outs, so anything that
 * leaves two frames on screen at once — a cross-dissolve, or holding earlier
 * frames opaque underneath — shows the previous silhouette around the incoming
 * one instead of hiding behind it. A clean cut between neighbouring angles reads
 * as rotation; an overlap reads as a double exposure.
 */
function Frame({
  plate,
  index,
  progress,
  priority,
}: {
  plate: Plate
  index: number
  progress: MotionValue<number>
  priority: boolean
}) {
  const opacity = useTransform(progress, (p) =>
    Math.round(p * LAST) === index ? 1 : 0,
  )

  return (
    <motion.div
      style={{ opacity, zIndex: index }}
      className="absolute inset-0"
      aria-hidden={index > 0}
    >
      <Image
        src={plate.src}
        alt={index === 0 ? plate.alt : ''}
        fill
        sizes="(max-width: 1280px) 45vw, 40vw"
        quality={82}
        priority={priority}
        placeholder="blur"
        blurDataURL={plate.blurDataURL}
        className="object-contain"
      />
    </motion.div>
  )
}

function Ticks({
  active,
  onSelect,
}: {
  active: number
  onSelect: (index: number) => void
}) {
  return (
    <div className="mt-8 flex items-start gap-1">
      {rotation.map((plate, i) => {
        const current = i === active
        return (
          <button
            key={plate.src}
            type="button"
            onClick={() => onSelect(i)}
            aria-current={current ? 'true' : undefined}
            className="group flex-1 pt-4 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
          >
            <span
              aria-hidden
              className={`block h-px w-full transition-all duration-500 ${
                current
                  ? 'bg-ivory'
                  : 'bg-ivory/15 group-hover:bg-ivory/45'
              }`}
            />
            <span
              className={`mt-3 block text-[10px] tracking-[0.26em] uppercase transition-colors duration-500 ${
                current ? 'text-ivory' : 'text-ivory-dim/45 group-hover:text-ivory-dim'
              }`}
            >
              {plate.view}
            </span>
            <span
              className={`mt-1 block text-[10px] tabular-nums tracking-[0.2em] transition-colors duration-500 ${
                current ? 'text-gold' : 'text-gold/25'
              }`}
            >
              {plateNo(plate)}
            </span>
          </button>
        )
      })}
    </div>
  )
}

function Heading({ id }: { id?: string }) {
  return (
    <>
      <div className="flex items-center gap-4">
        <span aria-hidden className="h-px w-8 bg-gold/50" />
        <p className="text-[10px] tracking-[0.42em] text-gold/80 uppercase">
          Qalereya
        </p>
        <span aria-hidden className="h-px w-8 bg-gold/20" />
        <p className="text-[10px] tabular-nums tracking-[0.28em] text-ivory-dim/50">
          {plates.length} lövhə
        </p>
      </div>

      <h1
        id={id}
        className="mt-6 font-serif text-[clamp(2.75rem,6.6vw,5.5rem)] leading-[0.9] tracking-[-0.02em] text-ivory"
      >
        Bir obyekt,
        <br />
        <span className="text-ivory-dim">iyirmi lövhə</span>
      </h1>

      <p className="mt-6 max-w-sm text-[15px] leading-[1.85] text-ivory-dim/75">
        Altı bucaq — obyektin ətrafında tam dönüş. On dörd lövhə — qutusu və
        qablaşdırma variantları ilə təqdimat. Hər lövhəni açıb yaxından baxa
        bilərsiniz.
      </p>
    </>
  )
}

export function Turntable({ onOpen }: { onOpen: (plateIndex: number) => void }) {
  const trackRef = useRef<HTMLDivElement | null>(null)
  const [active, setActive] = useState(0)
  const reduced = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start start', 'end end'],
  })

  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    const next = Math.min(LAST, Math.max(0, Math.round(p * LAST)))
    setActive((prev) => (prev === next ? prev : next))
  })

  const drift = useTransform(scrollYProgress, [0, 1], [8, -8])

  const scrollToStep = (index: number) => {
    const el = trackRef.current
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY
    const range = el.offsetHeight - window.innerHeight
    window.scrollTo({ top: top + range * (index / LAST) })
  }

  return (
    <>
      {/* ── Desktop: the object turns as the page scrolls ───────────── */}
      <div
        ref={trackRef}
        className="relative hidden md:block md:h-[190vh]"
      >
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <div className="mx-auto grid w-full max-w-[104rem] grid-cols-12 items-center gap-x-10 px-10 pt-14">
            <div className="col-span-5 xl:col-span-4">
              <Heading id="qalereya-basliq" />

              <div className="mt-10 flex items-center gap-3 text-[10px] tracking-[0.32em] text-ivory-dim/40 uppercase">
                <span>Sürüşdürün</span>
                <span aria-hidden className="dy-scroll-cue block h-4 w-px bg-gold/50" />
              </div>
            </div>

            <div className="col-span-6 col-start-7 xl:col-span-7 xl:col-start-6">
              <button
                type="button"
                onClick={() => onOpen(active)}
                aria-label={`${rotation[active].title} — böyüdərək baxın`}
                className="group relative block w-full cursor-zoom-in focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-gold"
              >
                <motion.div
                  style={{ y: reduced ? 0 : drift }}
                  className="relative mx-auto h-[58vh] max-h-[42rem] w-full"
                >
                  {rotation.map((plate, i) => (
                    <Frame
                      key={plate.src}
                      plate={plate}
                      index={i}
                      progress={scrollYProgress}
                      priority={i === 0}
                    />
                  ))}
                </motion.div>

                {/* Light pooling on the surface the object stands on. */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-[26%] bottom-2 h-10 rounded-[100%] bg-ivory/[0.06] blur-2xl"
                />
              </button>

              <Ticks active={active} onSelect={scrollToStep} />
            </div>
          </div>
        </div>
      </div>

      {/* ── Mobile: the same angles, swiped ─────────────────────────── */}
      <div className="px-5 pb-4 pt-24 md:hidden">
        <Heading />

        <ul className="dy-rail mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2">
          {rotation.map((plate, i) => (
            <li key={plate.src} className="w-[74vw] shrink-0 snap-center">
              <button
                type="button"
                onClick={() => onOpen(i)}
                className="block w-full text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
              >
                <span className="relative block aspect-[3/4] w-full overflow-hidden bg-ink">
                  <Image
                    src={plate.src}
                    alt={plate.alt}
                    fill
                    sizes="74vw"
                    quality={82}
                    priority={i === 0}
                    placeholder="blur"
                    blurDataURL={plate.blurDataURL}
                    className="object-contain p-6"
                  />
                </span>
                <span className="mt-3 flex items-baseline justify-between border-t border-ivory/10 pt-3">
                  <span className="text-[11px] tracking-[0.24em] text-ivory uppercase">
                    {plate.view}
                  </span>
                  <span className="text-[10px] tabular-nums tracking-[0.2em] text-gold/70">
                    {plateNo(plate)}
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>

        <p className="mt-5 text-[10px] tracking-[0.32em] text-ivory-dim/40 uppercase">
          Yana sürüşdürün
        </p>
      </div>
    </>
  )
}
