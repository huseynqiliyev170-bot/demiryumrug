import { Reveal } from './reveal'

export function ChapterMemory() {
  return (
    <section id="yaddas" aria-label="Yaddaş" className="relative overflow-hidden bg-ivory text-wine-deep">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-y-0 left-1/2 hidden w-px bg-wine/[0.06] lg:block" />
        <div className="absolute -right-24 top-20 select-none font-serif text-[clamp(12rem,28vw,28rem)] leading-none tracking-[-0.08em] text-wine/[0.035]">
          20
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-[120rem] px-6 py-24 md:px-10 md:py-36">
        {/* Top label + decorative line */}
        <Reveal>
          <div className="flex items-center gap-6">
            <span className="text-[10px] tracking-[0.35em] text-wine/40 uppercase">03 / YADDAŞ</span>
            <div className="h-px flex-1 max-w-[120px] bg-gradient-to-r from-wine/10 to-transparent" />
          </div>
        </Reveal>

        {/* Main spread: asymmetric — LEFT large statement / RIGHT timeline context */}
        <div className="mt-14 md:mt-20 md:grid md:grid-cols-12 md:gap-16 md:items-start">
          {/* LEFT: Large editorial statement */}
          <Reveal className="md:col-span-7" delay={80}>
            <h2 className="font-serif text-[clamp(3rem,9vw,7rem)] leading-[0.92] tracking-[-0.03em] text-wine-deep">
              ZAMAN KEÇİR.<br />
              <span className="text-wine/35">SİMVOLLAR</span><br />
              <span className="text-wine-deep">YADDAŞI YAŞADIR.</span>
            </h2>
            <div className="mt-10 md:mt-14 flex items-center gap-4">
              <div className="h-[2px] w-12 bg-gold/50" />
              <p className="text-[11px] tracking-[0.2em] text-wine/30 uppercase">Tarixi Kontekst</p>
            </div>
          </Reveal>

          {/* RIGHT: Timeline / memory motif */}
          <Reveal className="md:col-span-4 md:col-start-9 md:pt-4" delay={160}>
            <div className="relative border-l border-wine/15 pl-6 md:pl-8">
              <div className="absolute -left-[5px] top-1 h-2.5 w-2.5 rotate-45 bg-gold" />
              <div className="border-b border-wine/[0.09] pb-8">
                <p className="font-serif text-xl md:text-2xl text-wine-deep leading-tight">YADDAŞ</p>
                <p className="mt-2 text-[13px] leading-[1.8] text-wine-deep/50">
                  Bəzi simvollar yalnız bir hadisəni deyil, bütöv bir dövrünün hisslərini ifadə edir.
                </p>
              </div>
              <div className="border-b border-wine/[0.09] py-8">
                <p className="font-serif text-xl md:text-2xl text-wine-deep leading-tight">FİZİKİ İFADƏ</p>
                <p className="mt-2 text-[13px] leading-[1.8] text-wine-deep/50">
                  Dəmir Yumruq bu yaddaşın içində güc, birlik və qətiyyət anlayışlarını ifadə edən simvol kimi təqdim olunur.
                </p>
              </div>
              <div className="pt-8">
                <p className="font-serif text-xl md:text-2xl text-wine-deep leading-tight">DÖVR</p>
                <p className="mt-2 text-[13px] leading-[1.8] text-wine-deep/50">
                  Qarabağ müharibəsi və Azərbaycanın Zəfər yaddaşı ölkənin müasir tarixində dərin iz buraxıb.
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Lower: editorial caption in wider format */}
        <Reveal className="mt-20 md:mt-28" delay={300}>
          <div className="md:grid md:grid-cols-12 md:gap-8">
            <div className="md:col-span-6 md:col-start-4">
              <p className="text-[15px] md:text-[16px] leading-[1.9] text-wine-deep/70">
                Hər bir detaldakı iz — bir tarixin yadigarıdır. Dəmir Yumruq sadəcə bir obyekt deyil; o, bir dövrün, bir mübarizənin və bir zəfərin fiziki ifadəsidir. Bu simvolun arxasında minlərlə insanın xatirəsi durur.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
