'use client'

import Image from 'next/image'
import { cn } from '@/lib/utils'
import { plateNo, type Plate } from '@/lib/gallery-plates'

type CataloguePlateProps = {
  plate: Plate
  /** Responsive width hint — must match the column span this plate occupies. */
  sizes: string
  onOpen: () => void
  /** Grid placement and offset for this plate. */
  className?: string
}

/**
 * A catalogue plate: the photograph on a recessed mount, with a museum label
 * beneath it. There is no card — the mount and the hairline are the frame.
 */
export function CataloguePlate({
  plate,
  sizes,
  onOpen,
  className,
}: CataloguePlateProps) {
  const wideLabel = plate.layout === 'feature' || plate.layout === 'wide'
  const frameClass = plate.layout === 'feature'
    ? 'h-[70vw] max-h-[48rem] min-h-[24rem] md:h-[38rem] xl:h-[46rem]'
    : 'h-[118vw] max-h-[42rem] min-h-[25rem] md:h-[36rem] xl:h-[40rem]'

  return (
    <figure className={cn('group', className)}>
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Lövhə ${plateNo(plate)} — ${plate.title}. Böyüdərək baxın.`}
        className="block w-full cursor-zoom-in text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
      >
        <div
          className={cn(
            'relative overflow-hidden border border-ivory/[0.07] bg-ink transition-colors duration-500 group-hover:border-ivory/25',
            frameClass,
          )}
        >
          <Image
            src={plate.src}
            alt={plate.alt}
            fill
            sizes={sizes}
            quality={82}
            placeholder="blur"
            blurDataURL={plate.blurDataURL}
            className="object-contain p-6 transition-transform duration-700 ease-out group-hover:scale-[1.035] md:p-9 xl:p-12"
          />

          {/* Light gathers under the object as the plate is approached. */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-[18%] bottom-3 h-8 rounded-[100%] bg-ivory/0 blur-2xl transition-colors duration-700 group-hover:bg-ivory/[0.09]"
          />
        </div>
      </button>

      <figcaption
        className={cn(
          'relative mt-5 border-t border-ivory/10 pt-5 transition-colors duration-500 group-hover:border-ivory/25',
          wideLabel
            ? 'flex flex-col gap-x-12 gap-y-3 sm:flex-row sm:items-baseline sm:justify-between'
            : 'flex items-baseline gap-5',
        )}
      >
        {/* The label rule gilds itself on approach — the same gesture the
            navigation uses, so interactivity reads the same way site-wide. */}
        <span
          aria-hidden
          className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gold/70 transition-transform duration-700 ease-out group-hover:scale-x-100 motion-reduce:transition-none"
        />
        <span className={cn(wideLabel && 'flex items-baseline gap-5')}>
          <span className="shrink-0 text-[10px] tabular-nums tracking-[0.24em] text-gold/70 transition-colors duration-500 group-hover:text-gold">
            {plateNo(plate)}
          </span>
          {wideLabel ? (
            <span className="text-[12px] tracking-[0.22em] text-ivory uppercase">
              {plate.title}
            </span>
          ) : null}
        </span>

        {wideLabel ? (
          <span className="max-w-md text-[12.5px] leading-relaxed text-ivory-dim/65 sm:text-right">
            {plate.note}
          </span>
        ) : (
          <span className="block">
            <span className="block text-[12px] tracking-[0.22em] text-ivory uppercase">
              {plate.title}
            </span>
            <span className="mt-2 block max-w-sm text-[12.5px] leading-relaxed text-ivory-dim/65">
              {plate.note}
            </span>
          </span>
        )}
      </figcaption>
    </figure>
  )
}
