'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'

/**
 * Inertial scrolling for the home page.
 *
 * The chapters are paced as a sequence, and native wheel scrolling arrives in
 * discrete jumps that fight that pacing — the reveals fire mid-jump and the
 * parallax steps instead of drifting. Lenis interpolates the same native scroll
 * position, so `window.scrollY`, the header's progress rail, the reveal observer
 * and the parallax all keep working unchanged.
 *
 * Mounted on the home page only: the gallery route scrolls horizontally, and
 * wrapping that in a vertical smoother would only get in its way.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({
      duration: 1.1,
      // Expo-out: quick to answer the gesture, long to settle.
      easing: (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
      wheelMultiplier: 0.9,
      // Touch keeps the platform's own physics; only the wheel is smoothed.
      syncTouch: false,
    })

    let raf = requestAnimationFrame(function loop(time: number) {
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    })

    /**
     * In-page anchors: Lenis owns the animation, and the offset clears the
     * fixed header. Focus is moved to the target by hand, because preventing
     * the default navigation also cancels the focus move screen readers rely
     * on to announce arrival.
     */
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return

      const anchor = (event.target as Element | null)?.closest?.(
        'a[href^="#"]',
      ) as HTMLAnchorElement | null
      if (!anchor) return

      const id = anchor.getAttribute('href')?.slice(1)
      if (!id) return

      const target = document.getElementById(id)
      if (!target) return

      event.preventDefault()
      lenis.scrollTo(target, { offset: -88, duration: 1.5 })

      if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1')
      target.focus({ preventScroll: true })
    }

    document.addEventListener('click', onClick)

    return () => {
      document.removeEventListener('click', onClick)
      cancelAnimationFrame(raf)
      lenis.destroy()
    }
  }, [])

  return null
}
