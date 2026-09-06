import Link from 'next/link'

const NAV = [
  { label: 'OBYEKT', href: '/#obyekt' },
  { label: 'SİMVOL', href: '/#simvol' },
  { label: 'MƏHSUL', href: '/#forma' },
  { label: 'TƏQDİMAT', href: '/#teqdimat' },
  { label: 'QALEREYA', href: '/gallery' },
  { label: 'POSTLAR', href: '/posts' },
  { label: 'HAQQIMIZDA', href: '/about' },
  { label: 'ƏLAQƏ', href: '/contact' },
]

const CONTACT = [
  { label: 'Ünvan', value: 'Bakı, Azərbaycan', href: null },
  { label: 'E-poçt', value: 'info@demiryumrug.com', href: 'mailto:info@demiryumrug.com' },
]

const INSTAGRAM_URL = 'https://www.instagram.com/demiryumrug.az'

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden="true">
      <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
      <circle cx="12" cy="12" r="4.25" />
      <circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

/**
 * The single site footer, shared by every route.
 *
 * Replaces the earlier pair of overlapping footers (one inside `Closing`, one
 * standalone) and is built entirely from the artifact palette tokens so it
 * matches the chapters above it.
 */
export function SiteFooter() {
  return (
    <footer className="border-t border-gold/15 bg-ink">
      <div className="mx-auto w-full max-w-[120rem] px-6 md:px-10">
        <div className="grid gap-12 py-16 md:grid-cols-12 md:gap-8 md:py-20">
          <div className="md:col-span-4">
            <Link
              href="/"
              className="font-serif text-xl tracking-[0.15em] text-ivory transition-colors hover:text-gold"
            >
              DƏMİR YUMRUQ
            </Link>
            <p className="mt-4 max-w-xs text-[13px] leading-[1.7] text-ivory-dim">
              Gücün, birliyin və Zəfər yaddaşının simvolik ifadəsi.
            </p>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex text-ivory-dim transition-colors hover:text-gold"
              aria-label="Instagram"
            >
              <InstagramIcon className="h-5 w-5" />
            </a>
          </div>

          <nav aria-label="Səhifə naviqasiyası" className="md:col-span-4">
            <h2 className="text-[10px] font-medium uppercase tracking-[0.28em] text-gold">Naviqasiya</h2>
            <ul className="mt-6 space-y-3">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[13px] tracking-[0.16em] text-ivory-dim transition-colors hover:text-ivory"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-4">
            <h2 className="text-[10px] font-medium uppercase tracking-[0.28em] text-gold">Əlaqə</h2>
            <ul className="mt-6 space-y-4">
              {CONTACT.map((item) => (
                <li key={item.label}>
                  <span className="block text-[10px] uppercase tracking-[0.24em] text-ivory-dim/60">
                    {item.label}
                  </span>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="mt-1 block text-[14px] text-ivory transition-colors hover:text-gold"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <span className="mt-1 block text-[14px] text-ivory">{item.value}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-ivory/[0.08] py-6">
          <p className="text-[10px] uppercase tracking-[0.2em] text-ivory-dim/70">
            Zəfərin simvolu. Yaddaşın izi.
          </p>
          <p className="text-[10px] tracking-[0.2em] text-ivory-dim/70">
            &copy; {new Date().getFullYear()} DƏMİR YUMRUQ
          </p>
        </div>
      </div>
    </footer>
  )
}
