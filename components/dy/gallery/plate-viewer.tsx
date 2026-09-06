'use client'

import Image from 'next/image'
import { motion, useMotionValue, useReducedMotion } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { aspectOf, plateNo, plates } from '@/lib/gallery-plates'

const MIN_ZOOM = 1
const MAX_ZOOM = 3
const ZOOM_STEP = 0.5
/** Where a double-click from rest lands — close enough to read the engraving. */
const REST_ZOOM = 2.2

/**
 * Hairline square control. Deliberately not a pill: the rest of the site frames
 * its actions with a single rule, and the viewer should not introduce a second
 * button language on top of it.
 */
function Control({
  onClick,
  label,
  disabled = false,
  className,
  children,
}: {
  onClick: () => void
  label: string
  disabled?: boolean
  className?: string
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className={cn(
        'flex h-10 w-10 items-center justify-center border border-ivory/15 text-ivory-dim transition-colors duration-300',
        'hover:border-gold/60 hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold',
        'disabled:pointer-events-none disabled:opacity-25 md:h-11 md:w-11',
        className,
      )}
    >
      {children}
    </button>
  )
}

/**
 * Full-screen study of a single plate.
 *
 * The viewer is a reading surface rather than a slideshow: the catalogue number
 * and museum label travel with the photograph, and zoom exists so the engraving
 * on the base can actually be read.
 */
export function PlateViewer({
  index,
  onClose,
  onNavigate,
}: {
  index: number
  onClose: () => void
  onNavigate: (index: number) => void
}) {
  const plate = plates[index]
  const reduced = useReducedMotion()

  const dialogRef = useRef<HTMLDivElement | null>(null)
  const stageRef = useRef<HTMLDivElement | null>(null)

  const [zoom, setZoom] = useState(1)
  const panX = useMotionValue(0)
  const panY = useMotionValue(0)

  const settle = useCallback(
    (next: number) => {
      const clamped = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, +next.toFixed(2)))
      if (clamped === MIN_ZOOM) {
        panX.set(0)
        panY.set(0)
      }
      setZoom(clamped)
    },
    [panX, panY],
  )

  const go = useCallback(
    (next: number) => {
      setZoom(1)
      panX.set(0)
      panY.set(0)
      onNavigate((next + plates.length) % plates.length)
    },
    [onNavigate, panX, panY],
  )

  /* Keyboard: navigation, zoom, dismissal, and a Tab loop kept inside the
     dialog so focus never reaches the page underneath. */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          onClose()
          return
        case 'ArrowLeft':
          go(index - 1)
          return
        case 'ArrowRight':
          go(index + 1)
          return
        case '+':
        case '=':
          settle(zoom + ZOOM_STEP)
          return
        case '-':
          settle(zoom - ZOOM_STEP)
          return
        case 'Tab': {
          const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
            'button:not([disabled])',
          )
          if (!focusable?.length) return
          const first = focusable[0]
          const last = focusable[focusable.length - 1]
          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault()
            last.focus()
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault()
            first.focus()
          }
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [go, index, onClose, settle, zoom])

  /* Hold the page still, compensating for the scrollbar so the layout behind
     the viewer does not shift as it opens. */
  useEffect(() => {
    const { overflow, paddingRight } = document.body.style
    const gap = window.innerWidth - document.documentElement.clientWidth
    document.body.style.overflow = 'hidden'
    if (gap > 0) document.body.style.paddingRight = `${gap}px`
    return () => {
      document.body.style.overflow = overflow
      document.body.style.paddingRight = paddingRight
    }
  }, [])

  /* Move focus in on open, hand it back to the trigger on close. */
  useEffect(() => {
    const returnTo = document.activeElement as HTMLElement | null
    dialogRef.current?.focus()
    return () => returnTo?.focus?.()
  }, [])

  const zoomed = zoom > MIN_ZOOM

  return (
    <motion.div
      ref={dialogRef}
      tabIndex={-1}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduced ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
      role="dialog"
      aria-modal="true"
      aria-label={`Lövhə ${plateNo(plate)} — ${plate.title}`}
      className="fixed inset-0 z-[90] flex flex-col bg-ink/95 backdrop-blur-xl focus:outline-none"
    >
      {/* ── Catalogue address and controls ───────────────────────────── */}
      <header className="flex shrink-0 items-start justify-between gap-6 border-b border-ivory/10 px-5 py-4 md:px-8 md:py-5">
        <div className="min-w-0">
          <p className="flex items-baseline gap-2 text-[10px] tabular-nums tracking-[0.28em]">
            <span className="text-gold">{plateNo(plate)}</span>
            <span aria-hidden className="h-px w-4 translate-y-[-3px] bg-ivory/20" />
            <span className="text-ivory-dim/50">{plates.length}</span>
          </p>
          <h2 className="mt-2 truncate font-serif text-lg text-ivory md:text-xl">
            {plate.title}
          </h2>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <Control
            onClick={() => settle(zoom - ZOOM_STEP)}
            label="Kiçilt"
            disabled={zoom <= MIN_ZOOM}
            className="hidden sm:flex"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.25">
              <circle cx="10.5" cy="10.5" r="6.5" />
              <path d="M7.5 10.5h6M15.5 15.5 20 20" />
            </svg>
          </Control>
          <Control
            onClick={() => settle(zoom === MIN_ZOOM ? REST_ZOOM : zoom + ZOOM_STEP)}
            label="Böyüt"
            disabled={zoom >= MAX_ZOOM}
            className="hidden sm:flex"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.25">
              <circle cx="10.5" cy="10.5" r="6.5" />
              <path d="M7.5 10.5h6M10.5 7.5v6M15.5 15.5 20 20" />
            </svg>
          </Control>
          <Control onClick={onClose} label="Bağla" className="ml-1">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.25">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </Control>
        </div>
      </header>

      {/* ── The plate ────────────────────────────────────────────────── */}
      <div
        ref={stageRef}
        onWheel={(e) => settle(zoom - e.deltaY * 0.0025)}
        className="relative min-h-0 flex-1 overflow-hidden"
      >
        <motion.div
          key={plate.src}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, scale: zoom }}
          transition={{
            opacity: { duration: reduced ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] },
            scale: { duration: reduced ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] },
          }}
          style={{ x: panX, y: panY }}
          drag={zoomed}
          dragConstraints={stageRef}
          dragElastic={0.05}
          dragMomentum={false}
          onDoubleClick={() => settle(zoomed ? MIN_ZOOM : REST_ZOOM)}
          className={cn(
            'absolute inset-6 md:inset-12',
            zoomed ? 'cursor-grab active:cursor-grabbing' : 'cursor-zoom-in',
          )}
        >
          <Image
            src={plate.src}
            alt={plate.alt}
            fill
            sizes="(max-width: 768px) 92vw, 82vw"
            quality={82}
            priority
            placeholder="blur"
            blurDataURL={plate.blurDataURL}
            draggable={false}
            className="select-none object-contain"
          />
        </motion.div>

        <Control
          onClick={() => go(index - 1)}
          label="Əvvəlki lövhə"
          className="absolute left-3 top-1/2 -translate-y-1/2 bg-ink/60 backdrop-blur-sm md:left-5"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.25">
            <path d="M14.5 5.5 8 12l6.5 6.5" />
          </svg>
        </Control>
        <Control
          onClick={() => go(index + 1)}
          label="Növbəti lövhə"
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-ink/60 backdrop-blur-sm md:right-5"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.25">
            <path d="M9.5 5.5 16 12l-6.5 6.5" />
          </svg>
        </Control>

        {zoomed ? (
          <button
            type="button"
            onClick={() => settle(MIN_ZOOM)}
            className="absolute bottom-3 left-1/2 -translate-x-1/2 border border-ivory/15 bg-ink/70 px-3 py-1.5 text-[10px] tabular-nums tracking-[0.26em] text-ivory-dim backdrop-blur-sm transition-colors hover:border-gold/60 hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            {Math.round(zoom * 100)}% — SIFIRLA
          </button>
        ) : null}
      </div>

      {/* ── Museum label and contact sheet ───────────────────────────── */}
      <footer className="shrink-0 border-t border-ivory/10 px-5 py-4 md:px-8 md:py-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-10">
          <p className="max-w-xl text-[12.5px] leading-relaxed text-ivory-dim/70">
            {plate.note}
          </p>

          {/* A contact sheet rather than a thumbnail grid: constant height,
              true widths, so the strip reads as the shoot it came from. */}
          <div className="dy-rail -mx-5 flex shrink-0 items-end gap-2 overflow-x-auto px-5 pb-1 md:mx-0 md:px-0">
            {plates.map((thumb, i) => {
              const current = i === index
              return (
                <button
                  key={thumb.src}
                  type="button"
                  onClick={() => go(i)}
                  aria-current={current ? 'true' : undefined}
                  aria-label={`Lövhə ${plateNo(thumb)} — ${thumb.title}`}
                  className="group shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                >
                  <span
                    aria-hidden
                    className={cn(
                      'mb-2 block h-px w-full transition-colors duration-500',
                      current ? 'bg-gold' : 'bg-ivory/15 group-hover:bg-ivory/40',
                    )}
                  />
                  <span
                    className={cn(
                      'relative block h-10 bg-wine/60 transition-opacity duration-500 md:h-12',
                      current ? 'opacity-100' : 'opacity-40 group-hover:opacity-80',
                    )}
                    style={{ aspectRatio: aspectOf(thumb) }}
                  >
                    <Image
                      src={thumb.src}
                      alt=""
                      fill
                      sizes="96px"
                      quality={75}
                      className="object-contain p-1"
                    />
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </footer>
    </motion.div>
  )
}
