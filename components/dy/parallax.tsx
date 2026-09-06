'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

type ParallaxProps = {
  children: ReactNode
  className?: string
  /** total drift in px across the element's visible scroll range (kept subtle) */
  amount?: number
}

/**
 * Subtle scroll-linked parallax. Translates children a few pixels as the
 * element crosses the viewport. Disabled for reduced motion and small screens.
 */
export function Parallax({ children, className, amount = 24 }: ParallaxProps) {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (window.matchMedia('(max-width: 767px)').matches) return

    let raf = 0
    let inView = false

    const update = () => {
      raf = 0
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight
      // progress: 0 when element bottom enters, 1 when top leaves
      const progress = Math.min(
        1,
        Math.max(0, (vh - rect.top) / (vh + rect.height)),
      )
      const y = (progress - 0.5) * amount
      el.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0)`
    }

    const onScroll = () => {
      if (!inView || raf) return
      raf = requestAnimationFrame(update)
    }

    const io = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting
      if (inView) onScroll()
    })
    io.observe(el)
    window.addEventListener('scroll', onScroll, { passive: true })
    update()

    return () => {
      io.disconnect()
      window.removeEventListener('scroll', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [amount])

  return (
    <div ref={ref} className={cn('dy-parallax', className)}>
      {children}
    </div>
  )
}
