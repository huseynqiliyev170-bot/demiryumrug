'use client'

import { useState } from 'react'
import Image from 'next/image'
import { SiteHeader } from '@/components/dy/site-header'
import { SiteFooter } from '@/components/dy/site-footer'
import { Reveal } from '@/components/dy/reveal'
import { PostViewer } from '@/components/dy/post-viewer'
import { cn } from '@/lib/utils'

/* ── The Instagram feed, as published. Order is curatorial, not chronological:
   the grid opens on the strongest frames and lets the rest breathe. ── */
type Post = {
  src: string
  alt: string
  featured?: boolean
}

const POSTS: Post[] = [
  { src: '/Posts/demir-yumrq-7Artboard-1.png', alt: 'Dəmir Yumruq — brend postu', featured: true },
  { src: '/Posts/demir-yumruq-10-Artboard-1.png', alt: 'Dəmir Yumruq — məhsul təqdimatı' },
  { src: '/Posts/demir-yumruq8Artboard-1.png', alt: 'Dəmir Yumruq — detal kadrları' },
  { src: '/Posts/Demir-yumruqArtboard-2_2.png', alt: 'Dəmir Yumruq — qutu təqdimatı' },
  { src: '/Posts/demir-yumruq-13Artboard-1.png', alt: 'Dəmir Yumruq — atmosfer kadri', featured: true },
  { src: '/Posts/demir-yumruq-99Artboard-1.png', alt: 'Dəmir Yumruq — kompozisiya' },
  { src: '/Posts/Demir-yumruqArtboard-2_3.png', alt: 'Dəmir Yumruq — dəst təqdimatı' },
  { src: '/Posts/demir-yumruq6Artboard-1.png', alt: 'Dəmir Yumruq — səth detalı' },
  { src: '/Posts/demir-yumruq-12Artboard-1.png', alt: 'Dəmir Yumruq — işıq və kölgə' },
  { src: '/Posts/demir-yumruq11Artboard-1.png', alt: 'Dəmir Yumruq — qadraj öyrənməsi', featured: true },
  { src: '/Posts/Demir-yumruqArtboard-2_4.png', alt: 'Dəmir Yumruq — təqdimat lövhəsi' },
  { src: '/Posts/demir-yumrurq-6Artboard-1.png', alt: 'Dəmir Yumruq — yekun kadr' },
]

const INSTAGRAM_URL = 'https://www.instagram.com/demiryumrug.az'
const INSTAGRAM_HANDLE = '@DEMIRYUMRUG.AZ'
const postNo = (i: number) => String(i + 1).padStart(2, '0')

function Eyebrow({ children }: { children: string }) {
  return <p className="dy-eyebrow text-gold">{children}</p>
}

function InstagramMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true" className={className}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.25" />
      <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function PostsContent() {
  const [viewing, setViewing] = useState<number | null>(null)

  return (
    <>
      <SiteHeader />

      <main id="postlar" className="relative overflow-x-clip bg-wine-deep">
        {/* One warm pool of light behind the masthead — the only lamp in the room. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-[120vh] bg-[radial-gradient(60%_45%_at_62%_22%,color-mix(in_srgb,var(--gold)_9%,transparent),transparent_70%)]"
        />

        {/* ── Masthead: heading on the left, the lead post already open on
           the right — the page never shows an empty wall. ── */}
        <header className="dy-measure relative pb-16 pt-28 md:pb-20 md:pt-36 lg:pb-24">
          <div className="grid items-center gap-10 md:gap-12 lg:grid-cols-12">
            <Reveal variant="plain" className="lg:col-span-7">
              <Reveal variant="line" className="flex items-center gap-4">
                <span aria-hidden="true" className="h-px w-10 bg-gold/60" />
                <Eyebrow>Instagram arxivi</Eyebrow>
                <span aria-hidden="true" className="h-px w-10 bg-ivory/10" />
                <span className="dy-num text-[10px] tracking-[0.28em] text-ivory-dim/60">
                  {postNo(0)} — {postNo(POSTS.length - 1)}
                </span>
              </Reveal>

              <h1 className="dy-display mt-8 text-[length:var(--fs-display-l)] text-ivory">
                <span className="dy-line-mask block">
                  <span className="dy-line-inner block" style={{ ['--line-i' as string]: 0 }}>
                    Dəmir Yumruq —
                  </span>
                </span>
                <span className="dy-line-mask block">
                  <span className="dy-line-inner block" style={{ ['--line-i' as string]: 1 }}>
                    gündəlik <em className="not-italic text-gold">kadrlar.</em>
                  </span>
                </span>
              </h1>

              <Reveal variant="text" delay={200} className="mt-8 border-l border-gold/25 pl-6">
                <p className="max-w-xl text-[15px] leading-[1.85] text-ivory-dim/85">
                  Atelyenin gündəliyi: tökmə prosesi, səth detalları, qutu təqdimatı.
                  İstənilən postu açıb tam ölçüdə izləyə bilərsiniz.
                </p>
              </Reveal>

              <Reveal variant="text" delay={300} className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-5">
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="dy-ghost inline-flex items-center gap-3 border border-ivory/25 px-7 py-3 text-[11px] font-medium tracking-[0.22em] text-ivory"
                >
                  <InstagramMark className="h-4 w-4" />
                  {INSTAGRAM_HANDLE} <span aria-hidden="true" className="dy-arrow">→</span>
                </a>
                <a
                  href="#butun-postlar"
                  className="group inline-flex items-center gap-3 text-[11px] font-medium tracking-[0.22em] text-ivory-dim/80 transition-colors hover:text-gold"
                >
                  BÜTÜN POSTLAR <span aria-hidden="true" className="dy-arrow--down">↓</span>
                </a>
              </Reveal>
            </Reveal>

            {/* The lead plate, presented like the hero of the About page:
               framed, numbered, and clickable. */}
            <Reveal variant="mask" delay={150} className="lg:col-span-5">
              <LeadPlate post={POSTS[0]} onOpen={() => setViewing(0)} />
            </Reveal>
          </div>
        </header>

        {/* ── The film strip: every post rolls by once, in miniature ────── */}
        <section aria-hidden="true" className="relative border-y border-ivory/[0.07] py-6 md:py-8">
          <div className="dy-post-strip pointer-events-none select-none [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <div className="dy-post-strip-track flex w-max gap-4 md:gap-6">
              {[...POSTS, ...POSTS].map((post, i) => (
                <div
                  key={`${post.src}-${i}`}
                  className="relative h-32 w-[26vw] min-w-24 max-w-32 shrink-0 overflow-hidden border border-ivory/10 md:h-44 md:max-w-40"
                >
                  <Image
                    src={post.src}
                    alt=""
                    width={1080}
                    height={1350}
                    sizes="160px"
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── The grid ─────────────────────────────────────────────────── */}
        <section id="butun-postlar" aria-labelledby="butun-postlar-heading" className="dy-measure dy-section relative scroll-mt-24">
          <Reveal as="header" className="flex flex-wrap items-end justify-between gap-6 border-b border-ivory/10 pb-8 md:pb-10">
            <div>
              <Eyebrow>Bütün postlar</Eyebrow>
              <h2
                id="butun-postlar-heading"
                className="mt-5 font-serif text-[clamp(1.9rem,3.6vw,3.25rem)] leading-[1.02] tracking-[-0.02em] text-ivory"
              >
                Seçilmiş nəşrlər
              </h2>
            </div>
            <p className="dy-meta text-ivory-dim/60">
              {POSTS.length} POST · <span className="text-gold/70">AÇMAQ ÜÇÜN KLİKLƏYİN</span>
            </p>
          </Reveal>

          <div className="mt-10 grid grid-cols-2 items-start gap-x-4 gap-y-10 sm:gap-x-6 md:mt-14 md:gap-y-14 lg:grid-cols-12 lg:gap-x-8">
            {POSTS.map((post, i) => (
              <Reveal
                key={post.src}
                variant="text"
                delay={(i % 3) * 90}
                className={cn(
                  'col-span-1',
                  post.featured ? 'lg:col-span-6' : 'lg:col-span-4',
                )}
              >
                <PostCard post={post} index={i} onOpen={() => setViewing(i)} />
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── Closing invitation ───────────────────────────────────────── */}
        <section className="relative border-t border-ivory/[0.07]">
          <div className="dy-measure dy-section text-center">
            <Reveal variant="text">
              <Eyebrow>Daha çoxu</Eyebrow>
              <p className="mx-auto mt-8 max-w-2xl font-serif text-[clamp(1.75rem,4vw,3rem)] leading-[1.15] tracking-[-0.01em] text-ivory">
                Yeni kadrlar ilk öncə{' '}
                <em className="not-italic text-gold">Instagram-da</em> görünür.
              </p>
              <p className="mx-auto mt-6 max-w-md text-[15px] leading-[1.85] text-ivory-dim/75">
                Atelyenin ritmini izləyin — tökmədən qutuya qədər hər mərhələ.
              </p>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="dy-cta inline-flex items-center gap-3 bg-gold px-10 py-4 text-[12px] font-semibold tracking-[0.22em] text-wine-deep"
                >
                  <InstagramMark className="h-4 w-4" />
                  İZLƏYİN <span aria-hidden="true" className="dy-arrow">→</span>
                </a>
                <a
                  href="/gallery"
                  className="dy-ghost border border-ivory/25 px-10 py-4 text-[12px] font-medium tracking-[0.22em] text-ivory"
                >
                  QALEREYAYA BAX <span aria-hidden="true" className="dy-arrow">→</span>
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <SiteFooter />

      {viewing !== null ? (
        <PostViewer
          posts={POSTS}
          index={viewing}
          onClose={() => setViewing(null)}
          onNavigate={setViewing}
        />
      ) : null}
    </>
  )
}

function LeadPlate({ post, onOpen }: { post: Post; onOpen: () => void }) {
  return (
    <figure>
      <button
        type="button"
        onClick={onOpen}
        aria-label="Post 01 — aç"
        className="group relative block aspect-[4/5] w-full overflow-hidden border border-[var(--rule)] bg-[var(--wine-soft)] text-left"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 z-10 bg-[radial-gradient(75%_55%_at_50%_12%,rgba(215,182,117,0.14),transparent_65%)]"
        />
        <Image
          src={post.src}
          alt={post.alt}
          fill
          priority
          sizes="(max-width: 1024px) 92vw, 38vw"
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
        />
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-0 z-20 h-px origin-left scale-x-0 bg-gold/80 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
        />
        <span
          aria-hidden="true"
          className="absolute bottom-3 right-3 z-20 flex h-9 w-9 translate-y-2 items-center justify-center border border-gold/50 bg-wine-deep/80 text-gold opacity-0 backdrop-blur-sm transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-4 w-4">
            <path d="M15 4h5v5M20 4l-8 8M9 20H4v-5M4 20l8-8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </button>
      <figcaption className="mt-5 flex items-baseline justify-between gap-6">
        <span className="dy-meta text-ivory-dim">{post.alt}</span>
      </figcaption>
    </figure>
  )
}

function PostCard({
  post,
  index,
  onOpen,
}: {
  post: Post
  index: number
  onOpen: () => void
}) {
  return (
    <figure>
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Post ${postNo(index)} — aç`}
        className="group relative block w-full overflow-hidden border border-[var(--rule)] bg-[var(--wine-soft)] text-left"
      >
        <span className="relative block aspect-[4/5] w-full">
          <Image
            src={post.src}
            alt={post.alt}
            width={1080}
            height={1350}
            sizes={
              post.featured
                ? '(max-width: 1024px) 50vw, 46vw'
                : '(max-width: 1024px) 50vw, 30vw'
            }
            className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.035]"
          />
        </span>

        {/* Brass hairline draws in from the left on hover. */}
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gold/80 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
        />

        {/* Open hint — a quiet plaque that surfaces on hover. */}
        <span
          aria-hidden="true"
          className="absolute bottom-3 right-3 flex h-9 w-9 translate-y-2 items-center justify-center border border-gold/50 bg-wine-deep/80 text-gold opacity-0 backdrop-blur-sm transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-4 w-4">
            <path d="M15 4h5v5M20 4l-8 8M9 20H4v-5M4 20l8-8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </button>

      <figcaption className="mt-4 flex items-baseline justify-between gap-4 border-t border-ivory/10 pt-3">
       
        <span className="dy-meta truncate text-ivory-dim/60">{post.alt}</span>
      </figcaption>
    </figure>
  )
}
