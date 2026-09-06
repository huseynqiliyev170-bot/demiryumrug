'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

type MagneticProps = {
  children: ReactNode
  className?: string
  /** fraction of the pointer's offset from centre that the control follows */
  strength?: number
}

/**
 * Gives a control a little physical mass.
 *
 * While the pointer is over it, the control follows a fraction of the pointer's
 * offset from its own centre; on leave it springs back on the slower easing.
 * Only for fine pointers — on touch there is no hover state to reward, and a
 * tap that moves its own target is a usability bug, not a delight.
 */
export function Magnetic({ children, className, strength = 0.28 }: MagneticProps) {
  const ref = useRef<HTMLSpanElement | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    let raf = 0
    let x = 0
    let y = 0

    const apply = () => {
      raf = 0
      el.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`
    }

    const onMove = (event: PointerEvent) => {
      const box = el.getBoundingClientRect()
      x = (event.clientX - (box.left + box.width / 2)) * strength
      y = (event.clientY - (box.top + box.height / 2)) * strength * 0.6
      if (!raf) raf = requestAnimationFrame(apply)
    }

    const onEnter = () => el.setAttribute('data-engaged', 'true')

    const onLeave = () => {
      el.removeAttribute('data-engaged')
      if (raf) {
        cancelAnimationFrame(raf)
        raf = 0
      }
      el.style.transform = ''
    }

    el.addEventListener('pointerenter', onEnter)
    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    // A keyboard user tabbing away must not leave the control displaced.
    el.addEventListener('focusout', onLeave)

    return () => {
      el.removeEventListener('pointerenter', onEnter)
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
      el.removeEventListener('focusout', onLeave)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [strength])

  return (
    <span ref={ref} className={cn('dy-magnetic inline-flex', className)}>
      {children}
    </span>
  )
}
