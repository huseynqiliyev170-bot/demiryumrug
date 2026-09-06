'use client'

import { useEffect, useRef } from 'react'

/**
 * One IntersectionObserver for every reveal on the page.
 *
 * The previous implementation created an observer (plus a resize listener) per
 * element, which meant several dozen live observers on the home page. A single
 * shared instance does the same job: elements register on mount, get
 * `is-visible` once, then unobserve themselves.
 */
let shared: IntersectionObserver | null = null

function getObserver() {
  if (shared) return shared
  shared = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        entry.target.classList.add('is-visible')
        shared?.unobserve(entry.target)
      }
    },
    { threshold: 0.12, rootMargin: '0px 0px -7% 0px' },
  )
  return shared
}

/**
 * Registers an element with the shared reveal observer and returns its ref.
 *
 * Anything already inside the viewport at mount reveals immediately, so the
 * first screen is never blank while waiting for a scroll event. A resize
 * (rotation, devtools, responsive preview) can move an element past the
 * observer without an intersection event, so we re-measure once on resize as a
 * safety net — content must never stay permanently invisible.
 */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced || typeof IntersectionObserver === 'undefined') {
      el.classList.add('is-visible')
      return
    }

    const onScreen = () => {
      const box = el.getBoundingClientRect()
      return box.top < window.innerHeight && box.bottom > 0
    }

    if (onScreen()) {
      el.classList.add('is-visible')
      return
    }

    const observer = getObserver()
    observer.observe(el)

    const onResize = () => {
      if (onScreen()) {
        el.classList.add('is-visible')
        observer.unobserve(el)
      }
    }

    window.addEventListener('resize', onResize, { passive: true })
    return () => {
      observer.unobserve(el)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return ref
}
