
'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

const links = [
  { href: '/#obyekt', id: 'obyekt', label: 'HAQQINDA' },
  { href: '/#simvol', id: 'simvol', label: 'SİMVOL' },
  { href: '/#forma', id: 'forma', label: 'MƏHSUL' },
  { href: '/#teqdimat', id: 'teqdimat', label: 'TƏQDİMAT' },
  { href: '/gallery', id: 'gallery', label: 'QALEREYA', external: true },
  { href: '/posts', id: 'posts', label: 'POSTLAR', external: true },
  { href: '/about', id: 'about', label: 'HAQQIMIZDA', external: true },
  { href: '/contact', id: 'contact', label: 'ƏLAQƏ', external: true },
]

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const headerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    let raf = 0

    const onScroll = () => {
      if (raf) return

      raf = requestAnimationFrame(() => {
        raf = 0

        const y = window.scrollY

        setScrolled((prev) => {
          const next = y > 24
          return next === prev ? prev : next
        })

        const doc = document.documentElement
        const max = doc.scrollHeight - window.innerHeight
        const progress = max > 0 ? y / max : 0

        headerRef.current?.style.setProperty(
          '--progress',
          String(Math.min(1, Math.max(0, progress))),
        )
      })
    }

    onScroll()

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)

      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  useEffect(() => {
    const sections = links
      .filter((l) => !l.external)
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => el !== null)

    if (sections.length === 0) return

    let raf = 0

    const measure = () => {
      raf = 0

      const anchor = window.innerHeight * 0.4
      let current = sections[0].id

      for (const section of sections) {
        const { top, bottom } = section.getBoundingClientRect()

        if (top <= anchor && bottom > anchor) {
          current = section.id
          break
        }

        if (top <= anchor) {
          current = section.id
        }
      }

      setActive((prev) => (prev === current ? prev : current))
    }

    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(measure)
    }

    measure()

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)

      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  useEffect(() => {
    if (!menuOpen) return

    const { overflow, paddingRight } = document.body.style
    const gap = window.innerWidth - document.documentElement.clientWidth

    document.body.style.overflow = 'hidden'

    if (gap > 0) {
      document.body.style.paddingRight = `${gap}px`
    }

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false)
      }
    }

    window.addEventListener('keydown', onKey)

    return () => {
      document.body.style.overflow = overflow
      document.body.style.paddingRight = paddingRight
      window.removeEventListener('keydown', onKey)
    }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <a
        href="/#obyekt"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:bg-gold focus:px-4 focus:py-2 focus:text-[11px] focus:font-semibold focus:tracking-[0.2em] focus:text-wine-deep"
      >
        ƏSAS MƏZMUNA KEÇ
      </a>

      <header
        ref={headerRef}
        className={cn(
          'dy-header fixed inset-x-0 top-0 z-50 transition-all duration-300',
          scrolled
            ? 'dy-header--scrolled backdrop-blur-md bg-wine-deep/85'
            : 'bg-transparent',
        )}
      >
        <div className="dy-header-inner mx-auto flex w-full max-w-[120rem] items-center justify-between px-6 py-4 md:px-10 md:py-5">
          <a
            href="/"
            onClick={closeMenu}
            className="font-serif text-[15px] md:text-lg tracking-[0.2em] text-ivory transition-colors hover:text-gold relative group"
          >
            <span className="relative z-10">DƏMİR YUMRUQ</span>

            <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
          </a>

          <nav
            aria-label="Əsas naviqasiya"
            className="hidden items-center gap-6 xl:flex 2xl:gap-8"
          >
            {links.map((link) => (
              <a
                key={link.id}
                href={link.href}
                data-active={active === link.id}
                aria-current={
                  active === link.id ? 'true' : undefined
                }
                className={cn(
                  'dy-nav-link text-[11px] tracking-[0.22em] transition-colors relative',
                  active === link.id
                    ? 'text-gold'
                    : 'text-ivory-dim hover:text-ivory',
                )}
              >
                {link.label}
              </a>
            ))}

            <a
              href="/#sifaris"
              className="dy-btn border border-gold/40 px-5 py-2 text-[11px] font-medium tracking-[0.2em] text-gold hover:bg-gold hover:text-wine-deep transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            >
              SİFARİŞ ET
            </a>
          </nav>

          <div className="flex items-center gap-3 xl:hidden">
            <a
              href="/#sifaris"
              onClick={closeMenu}
              className="dy-btn border border-gold/40 px-4 py-2 text-[10px] font-medium tracking-[0.2em] text-gold"
            >
              SİFARİŞ ET
            </a>

            <button
              type="button"
              aria-expanded={menuOpen}
              aria-controls="dy-mobile-menu"
              onClick={() => setMenuOpen((v) => !v)}
              className="flex h-11 w-11 items-center justify-center border border-gold/20 text-ivory hover:border-gold/50 transition-colors"
            >
              <span className="sr-only">
                {menuOpen ? 'Menyunu bağla' : 'Menyunu aç'}
              </span>

              <span
                aria-hidden="true"
                className="relative block h-3 w-5"
              >
                <span
                  className={cn(
                    'absolute left-0 top-0 h-px w-full bg-ivory transition-transform duration-300',
                    menuOpen &&
                      'translate-y-[5.5px] rotate-45',
                  )}
                />

                <span
                  className={cn(
                    'absolute bottom-0 left-0 h-px w-full bg-ivory transition-transform duration-300',
                    menuOpen &&
                      '-translate-y-[5.5px] -rotate-45',
                  )}
                />
              </span>
            </button>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="dy-progress h-[1px] w-full bg-gradient-to-r from-transparent via-gold/20 to-transparent"
        />
      </header>

      <div
        id="dy-mobile-menu"
        data-open={menuOpen}
        className="dy-menu fixed inset-0 z-40 flex flex-col justify-center bg-wine-deep px-6 pb-14 pt-24 transition-opacity duration-300 xl:hidden"
        style={{
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'auto' : 'none',
        }}
      >
        <nav
          aria-label="Mobil naviqasiya"
          className="flex flex-col"
        >
          {links.map((link, i) => (
            <a
              key={link.id}
              href={link.href}
              onClick={closeMenu}
              className="dy-menu-item flex items-baseline gap-4 border-t border-ivory/10 py-5 text-ivory"
              style={{ ['--menu-i' as string]: i }}
              tabIndex={menuOpen ? 0 : -1}
            >
              <span className="text-[10px] tracking-[0.26em] text-gold">
                0{i + 1}
              </span>

              <span className="font-serif text-2xl md:text-3xl">
                {link.label}
              </span>
            </a>
          ))}
        </nav>

        <a
          href="/#sifaris"
          onClick={closeMenu}
          className="dy-btn dy-menu-item mt-10 block bg-gold px-8 py-4 text-center text-[12px] font-semibold tracking-[0.22em] text-wine-deep"
          tabIndex={menuOpen ? 0 : -1}
        >
          SİFARİŞ ET
        </a>
      </div>
    </>
  )
}

