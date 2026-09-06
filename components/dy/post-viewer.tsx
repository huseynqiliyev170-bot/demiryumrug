'use client'

import { useCallback, useEffect } from 'react'
import Image from 'next/image'

type Post = {
  src: string
  alt: string
}

const pad = (n: number) => String(n).padStart(2, '0')

export function PostViewer({
  posts,
  index,
  onClose,
  onNavigate,
}: {
  posts: Post[]
  index: number
  onClose: () => void
  onNavigate: (index: number) => void
}) {
  const total = posts.length
  const post = posts[index]

  const prev = useCallback(
    () => onNavigate((index - 1 + total) % total),
    [index, total, onNavigate],
  )
  const next = useCallback(
    () => onNavigate((index + 1) % total),
    [index, total, onNavigate],
  )

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = overflow
    }
  }, [onClose, prev, next])

  if (!post) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Post ${pad(index + 1)} — ${post.alt}`}
      className="fixed inset-0 z-[80] flex flex-col bg-wine-deep/95 backdrop-blur-md"
      onClick={onClose}
    >
      {/* Header: counter and close. */}
      <div className="flex items-center justify-between px-5 py-4 md:px-10 md:py-6">
        <p className="dy-num text-[11px] tracking-[0.24em] text-ivory-dim/70">
          № {pad(index + 1)} <span className="text-gold/60">/ {pad(total)}</span>
        </p>
        <button
          type="button"
          onClick={onClose}
          aria-label="Bağla"
          className="flex h-11 w-11 items-center justify-center border border-ivory/20 text-ivory transition-colors hover:border-gold/60 hover:text-gold"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-4 w-4" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* The plate. */}
      <div
        className="relative flex min-h-0 flex-1 items-center justify-center px-14 md:px-24"
        onClick={(e) => e.stopPropagation()}
      >
        <figure className="relative border border-[var(--rule)] bg-[var(--wine-soft)] shadow-[0_40px_80px_rgba(0,0,0,0.55)]">
          <Image
            key={post.src}
            src={post.src}
            alt={post.alt}
            width={1080}
            height={1350}
            priority
            className="h-auto max-h-[68vh] w-auto max-w-[calc(100vw-7rem)] object-contain md:max-w-[calc(100vw-16rem)]"
          />
          <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gold/70" />
        </figure>

        {/* Side arrows — desktop. */}
        <button
          type="button"
          onClick={prev}
          aria-label="Əvvəlki post"
          className="absolute left-4 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center border border-ivory/20 text-ivory transition-colors hover:border-gold/60 hover:text-gold md:flex"
        >
          <span aria-hidden="true">←</span>
        </button>
        <button
          type="button"
          onClick={next}
          aria-label="Növbəti post"
          className="absolute right-4 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center border border-ivory/20 text-ivory transition-colors hover:border-gold/60 hover:text-gold md:flex"
        >
          <span aria-hidden="true">→</span>
        </button>
      </div>

      {/* Footer: caption and mobile controls. */}
      <div
        className="flex items-center justify-between gap-6 border-t border-ivory/10 px-5 py-4 md:px-10 md:py-5"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="dy-meta min-w-0 truncate text-ivory-dim/80">{post.alt}</p>
        <div className="flex shrink-0 items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={prev}
            aria-label="Əvvəlki post"
            className="flex h-11 w-11 items-center justify-center border border-ivory/20 text-ivory transition-colors hover:border-gold/60 hover:text-gold"
          >
            <span aria-hidden="true">←</span>
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Növbəti post"
            className="flex h-11 w-11 items-center justify-center border border-ivory/20 text-ivory transition-colors hover:border-gold/60 hover:text-gold"
          >
            <span aria-hidden="true">→</span>
          </button>
        </div>
        <p className="dy-meta hidden shrink-0 text-ivory-dim/40 md:block">
          ← → ilə keçid
        </p>
      </div>
    </div>
  )
}
