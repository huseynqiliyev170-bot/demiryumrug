'use client'

import { type ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { useReveal } from './use-reveal'

/**
 * The reveal vocabulary.
 *
 * `text`  — copy and blocks rise a short distance and fade.
 * `scale` — supporting photography settles back from a slight push-in.
 * `mask`  — the chapter's lead photograph is uncovered from its bottom edge
 *           while the frame inside it settles. Reserved, so it stays an event.
 * `line`  — a ruled hairline draws across as its block arrives.
 * `plain` — no motion of its own; only publishes `is-visible` so nested
 *           choreography (masked heading lines) can key off it.
 */
export type RevealVariant = 'text' | 'scale' | 'mask' | 'line' | 'plain'

const VARIANT_CLASS: Record<RevealVariant, string> = {
  text: 'dy-reveal',
  scale: 'dy-reveal-scale',
  mask: 'dy-reveal-mask',
  line: 'dy-reveal-line',
  plain: '',
}

type RevealProps = {
  children?: ReactNode
  className?: string
  /** ms delay, applied through a CSS variable so it also staggers nested lines */
  delay?: number
  variant?: RevealVariant
  /** shorthand kept for the supporting-photography case */
  scale?: boolean
  /** shorthand kept for the lead-photograph case */
  mask?: boolean
  as?:
    | 'div'
    | 'section'
    | 'figure'
    | 'figcaption'
    | 'header'
    | 'footer'
    | 'aside'
    | 'p'
    | 'h2'
    | 'h3'
    | 'span'
    | 'li'
    | 'ol'
    | 'ul'
    | 'blockquote'
  'aria-live'?: 'polite' | 'off' | 'assertive'
}

export function Reveal({
  children,
  className,
  delay = 0,
  variant,
  scale = false,
  mask = false,
  as: Tag = 'div',
  ...rest
}: RevealProps) {
  const ref = useReveal<HTMLElement>()
  const resolved: RevealVariant = variant ?? (mask ? 'mask' : scale ? 'scale' : 'text')

  return (
    <Tag
      // @ts-expect-error the tag is dynamic, so the ref type cannot be narrowed
      ref={ref}
      className={cn(VARIANT_CLASS[resolved], className)}
      style={{ ['--reveal-delay' as string]: `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
