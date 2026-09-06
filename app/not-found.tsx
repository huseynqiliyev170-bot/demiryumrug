import { SiteHeader } from '@/components/dy/site-header'
import { SiteFooter } from '@/components/dy/site-footer'

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="flex min-h-[70vh] items-center bg-wine-deep">
        <div className="dy-measure text-center">
          <p className="dy-eyebrow text-gold">Səhifə tapılmadı</p>
          <h1 className="dy-display mt-8 text-[length:var(--fs-display-l)] text-ivory">
            404
          </h1>
          <p className="mx-auto mt-6 max-w-md text-[15px] leading-[1.85] text-ivory-dim/85">
            Axtardığınız səhifə mövcud deyil — lakin simvol yerindədir.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="/"
              className="dy-cta inline-flex items-center gap-3 bg-gold px-10 py-4 text-[12px] font-semibold tracking-[0.22em] text-wine-deep"
            >
              ANA SƏHİFƏYƏ QAYIT <span aria-hidden="true" className="dy-arrow">→</span>
            </a>
            <a
              href="/gallery"
              className="dy-ghost border border-ivory/25 px-10 py-4 text-[12px] font-medium tracking-[0.22em] text-ivory"
            >
              QALEREYAYA BAX <span aria-hidden="true" className="dy-arrow">→</span>
            </a>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
