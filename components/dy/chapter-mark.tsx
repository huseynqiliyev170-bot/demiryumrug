'use client'

import { cn } from '@/lib/utils'
import { Reveal } from './reveal'

type ChapterMarkProps = {
  /** two-digit chapter number, e.g. "01" */
  index: string
  /** chapter name, set in the metadata voice */
  title: string
  /** optional right-hand annotation, like a catalogue folio */
  note?: string
  /** paper chapters invert the rule and text to ink */
  tone?: 'charcoal' | 'paper'
  className?: string
}

/**
 * The chapter mark: the one structural device shared by all six chapters.
 *
 * An outlined display figure, a hairline that draws across the measure, and the
 * chapter name — the same construction every time, so the numbers read as a
 * running sequence through one publication rather than six sections that happen
 * to be stacked. The rule is what carries the eye from the number to the name,
 * so it animates rather than the text: the mark draws itself like a ruled line
 * on a plate.
 */
export function ChapterMark({
  index,
  title,
  note,
  tone = 'charcoal',
  className,
}: ChapterMarkProps) {
  const paper = tone === 'paper'

  return (
    <Reveal
      variant="plain"
      as="header"
      className={cn('flex items-baseline gap-5 md:gap-8', className)}
    >
      <span
        aria-hidden="true"
        className={cn(
          'dy-num font-serif text-[clamp(2.25rem,4.5vw,3.75rem)] font-light leading-none',
          paper ? 'text-ink/25' : 'text-transparent',
        )}
        style={
          paper
            ? undefined
            : { WebkitTextStroke: '1px var(--rule-strong)' }
        }
      >
        {index}
      </span>

      <span
        aria-hidden="true"
        className={cn(
          'dy-reveal-line mb-[0.5em] h-px flex-1',
          paper
            ? 'bg-gradient-to-r from-[var(--rule-ink-strong)] to-transparent'
            : 'bg-gradient-to-r from-[var(--rule-strong)] to-transparent',
        )}
        style={{ ['--reveal-delay' as string]: '120ms' }}
      />

      {/* A running head, not the section's heading — the display line below is
          the h2, so this stays a paragraph and the outline keeps one heading
          per chapter. */}
      <p
        className={cn(
          'dy-eyebrow mb-[0.35em] shrink-0',
          paper ? 'text-ink/50' : 'text-gold',
        )}
      >
        {title}
      </p>

      {note ? (
        <span
          className={cn(
            'dy-meta mb-[0.45em] hidden shrink-0 md:block',
            paper ? 'text-ink/30' : 'text-ivory/25',
          )}
        >
          {note}
        </span>
      ) : null}
    </Reveal>
  )
}
