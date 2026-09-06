'use client'

import { type CSSProperties } from 'react'
import { cn } from '@/lib/utils'
import { useReveal } from './use-reveal'

export type DisplayLine = {
  text: string
  /** per-line treatment: brass, outlined, dimmed */
  className?: string
}

type DisplayLinesProps = {
  lines: readonly DisplayLine[]
  className?: string
  /** ms delay before the first line starts */
  delay?: number
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'div'
  id?: string
}

/**
 * Text choreography for display headings.
 *
 * Each line sits in its own overflow mask and rises out of it, staggered, so
 * the headline assembles line by line instead of fading in as one block. The
 * lines are authored explicitly rather than measured at runtime: no layout
 * thrash, no reflow on resize, and the line breaks stay art-directed.
 *
 * The masks are padded and negatively margined by the same amount, so they clip
 * the animation without clipping tall diacritics (İ, Ğ) or descenders — display
 * type here is set at 0.86 line-height, which is tighter than the font's own
 * ascent.
 */
export function DisplayLines({
  lines,
  className,
  delay = 0,
  as: Tag = 'h2',
  id,
}: DisplayLinesProps) {
  const ref = useReveal<HTMLHeadingElement>()

  return (
    <Tag
      id={id}
      ref={ref}
      className={cn('dy-display', className)}
      style={{ ['--reveal-delay' as string]: `${delay}ms` } as CSSProperties}
    >
      {lines.map((line, i) => (
        <span key={`${line.text}-${i}`} className="dy-line-mask">
          <span
            className="dy-line-inner"
            style={{ ['--line-i' as string]: i } as CSSProperties}
          >
            <span className={line.className}>{line.text}</span>
          </span>
        </span>
      ))}
    </Tag>
  )
}
