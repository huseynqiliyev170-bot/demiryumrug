'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'
import { SiteHeader } from '@/components/dy/site-header'
import { SiteFooter } from '@/components/dy/site-footer'
import { Reveal } from '@/components/dy/reveal'

/* Every line on this page is a fact the rest of the site already states —
   nothing invented here. */

const CREED = [
  'Güc keçir — yaddaş qalır.',
  'Bəzən gücü sözlə ifadə etmək olmur.',
  'Zaman keçir — simvollar yaddaşı yaşadır.',
]

const STEPS = [
  {
    num: '01',
    title: 'Müraciət',
    text: 'Formanı doldurun — bir dəqiqə kifayətdir.',
  },
  {
    num: '02',
    title: 'Təsdiq',
    text: 'Komandamız 24 saat ərzində sizinlə əlaqə saxlayıb detalları dəqiqləşdirəcək.',
  },
  {
    num: '03',
    title: 'Təhvil',
    text: 'Obyekt məxmər çanta və sərt təqdimat qutusunda ünvanınıza çatdırılır.',
  },
]

const COLORWAYS = [
  {
    name: 'Qəhvəyi qutu',
    tone: '#7a5230',
    image: '/images/cutout/_Z7A2808.webp',
    alt: 'Qəhvəyi məxmər qutuda Dəmir Yumruq',
    blurb: 'Klassik və sakit — birinci addım.',
  },
  {
    name: 'Qırmızı qutu',
    tone: '#8c2b1f',
    image: '/images/cutout/_Z7A2857.webp',
    alt: 'Qırmızı məxmər qutuda Dəmir Yumruq',
    blurb: 'Ənənəvi cəsarət rəngi.',
  },
  {
    name: 'Bordo qutu',
    tone: '#4c1a1e',
    image: '/images/cutout/_Z7A2879.webp',
    alt: 'Bordo məxmər qutuda Dəmir Yumruq',
    blurb: 'Dərinlik və eksklüzivlik.',
  },
]

const PRINCIPLES = [
  {
    num: 'I',
    title: 'Güc',
    text: 'Çətinlik qarşısında geri çəkilməmək. Metalın ağırlığı iradənin formasıdır.',
  },
  {
    num: 'II',
    title: 'Birlik',
    text: 'Bir məqsəd ətrafında birləşmək. Yumruq ayrı-ayrı barmaqların birgə duruşudur.',
  },
  {
    num: 'III',
    title: 'Qətiyyət',
    text: 'Qarşıya qoyulan məqsədə sona qədər bağlı qalmaq.',
  },
  {
    num: 'IV',
    title: 'Zəfər',
    text: 'Yaddaşda qalan nəticə. Zəfər anı bir saniyə sürür — obyekt isə nəsillərlə qalır.',
  },
]

function Eyebrow({ children }: { children: string }) {
  return <p className="dy-eyebrow text-gold">{children}</p>
}

/**
 * The hero plate: the fist cutout, framed like an exhibition object —
 * plinth line, pin spots, a soft cast shadow, and a gyroscope tilt so the
 * composition has mass instead of floating flat.
 */
function HeroFrame() {
  const frame = useRef<HTMLDivElement | null>(null)

  const onPointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType === 'touch') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const root = frame.current
    if (!root || root.dataset.raf) return
    root.dataset.raf = '1'
    const rect = root.getBoundingClientRect()
    const dx = ((e.clientX - rect.left) / rect.width - 0.5) * 2
    const dy = ((e.clientY - rect.top) / rect.height - 0.5) * 2
    requestAnimationFrame(() => {
      delete root.dataset.raf
      root.style.transform = `perspective(1200px) rotateX(${dy * -3.2}deg) rotateY(${dx * 4.2}deg)`
    })
  }

  const onPointerLeave = () => {
    const root = frame.current
    if (!root) return
    root.style.transition = 'transform 0.9s cubic-bezier(0.16, 1, 0.3, 1)'
    root.style.transform = ''
    const clear = () => {
      root.style.transition = ''
      root.removeEventListener('transitionend', clear)
    }
    root.addEventListener('transitionend', clear)
  }

  return (
    <figure className="relative [perspective:1400px]">
      <div
        ref={frame}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        className="relative aspect-[3/4] w-full [transform-style:preserve-3d]"
      >
        {/* the wall the object hangs against */}
        <div className="absolute inset-0 overflow-hidden border border-[var(--rule)] bg-[linear-gradient(to_bottom,var(--wine-soft),var(--wine))]">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(75%_55%_at_50%_12%,rgba(215,182,117,0.16),transparent_65%)]"
          />
          {/* cast shadow under the object */}
          <div
            aria-hidden="true"
            className="absolute bottom-[4%] left-1/2 h-[9%] w-[62%] -translate-x-1/2 rounded-full bg-black/55 blur-[18px]"
          />
          {/* the object — alpha cutout, no offset math, so it can never tear */}
          <div className="absolute inset-x-[6%] bottom-[6%] top-[8%]">
            <Image
              src="/images/fist-front.webp"
              alt="Dəmir Yumruq heykəli — bürünc yumruq"
              fill
              priority
              sizes="(max-width: 1024px) 84vw, 36vw"
              className="object-contain object-bottom drop-shadow-[0_34px_44px_rgba(0,0,0,0.5)]"
            />
          </div>
        </div>
        {/* the plate's caption strip */}
        <div className="mt-5 flex items-baseline justify-between gap-6">
          <span className="dy-meta text-ivory-dim">Qranit qaidə üzərində qızılı örtüklü bürünc</span>
          <span className="dy-num shrink-0 text-[11px] tracking-[0.18em] text-gold/70">№ 001</span>
        </div>
      </div>
    </figure>
  )
}

export function AboutContent() {
  return (
    <>
      <SiteHeader />
      <main id="obyekt" className="bg-wine-deep">
        {/* ═══ HERO — the framed plate ═══ */}
        <section
          aria-labelledby="about-heading"
          className="dy-room relative overflow-hidden"
        >
          <div aria-hidden="true" className="dy-hero-grain absolute inset-0" />

          <div className="dy-measure relative grid min-h-[96svh] items-center gap-14 pb-20 pt-32 md:pt-36 lg:grid-cols-12 lg:gap-10">
            <div className="relative z-10 lg:col-span-7">
              <Reveal variant="plain">
                <Eyebrow>Haqqımızda</Eyebrow>
              </Reveal>

              <h1
                id="about-heading"
                className="mt-9 font-serif font-light leading-[0.9] tracking-[-0.02em] text-ivory text-[length:var(--fs-display-l)]"
              >
                <Reveal variant="plain" as="span" className="dy-line-mask">
                  <span className="dy-line-inner" style={{ ['--line-i' as string]: 0 }}>
                    Bu bir{' '}
                  </span>
                </Reveal>
                <Reveal variant="plain" as="span" className="dy-line-mask">
                  <span
                    className="dy-line-inner italic text-gold"
                    style={{ ['--line-i' as string]: 1 }}
                  >
                    yumruq{' '}
                  </span>
                </Reveal>
                <Reveal variant="plain" as="span" className="dy-line-mask">
                  <span className="dy-line-inner" style={{ ['--line-i' as string]: 2 }}>
                    deyil.
                  </span>
                </Reveal>
              </h1>

              <Reveal delay={420}>
                <p className="mt-10 max-w-md text-[15px] leading-[1.85] text-ivory-dim md:text-base">
                  Bəzən gücü sözlə ifadə etmək olmur. Dəmir Yumruq — güc, birlik, qətiyyət
                  və Zəfər yaddaşını fiziki formada ifadə edən xüsusi obyektdir.
                </p>
              </Reveal>

              <Reveal delay={540}>
                <div className="mt-12 flex flex-wrap items-center gap-4">
                  <Link
                    href="/#sifaris"
                    className="dy-cta bg-gold px-9 py-3.5 text-[11px] font-semibold tracking-[0.22em] text-wine-deep"
                  >
                    SİFARİŞ ET <span aria-hidden="true" className="dy-arrow">→</span>
                  </Link>
                  <Link
                    href="/gallery"
                    className="dy-ghost border border-ivory/25 px-9 py-3.5 text-[11px] font-medium tracking-[0.22em] text-ivory"
                  >
                    QALEREYAYA BAX <span aria-hidden="true" className="dy-arrow">→</span>
                  </Link>
                </div>
              </Reveal>
            </div>

            {/* The framed object. */}
            <Reveal
              mask
              delay={200}
              className="relative lg:col-span-5"
            >
              <div className="mx-auto w-full max-w-[26rem] lg:max-w-none">
                <HeroFrame />
              </div>
            </Reveal>
          </div>

          {/* the plinth line the composition stands on */}
          <Reveal variant="line" delay={500} className="dy-plinth relative" />

          {/* Manifest strip: the creed, three lines on one axis. */}
          <div className="relative">
            <ol className="dy-measure grid md:grid-cols-3">
              {CREED.map((line, i) => (
                <Reveal
                  as="li"
                  key={line}
                  delay={600 + i * 130}
                  className="border-t border-[var(--rule)] py-8 font-serif text-[clamp(1.1rem,2.2vw,1.5rem)] leading-[1.4] text-ivory/85 md:border-l md:border-t-0 md:px-9 md:py-10 md:first:border-l-0 md:first:pl-0"
                >
                  {line}
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        {/* ═══ MANIFEST — four decisions ═══ */}
        <section aria-labelledby="manifest-heading" className="dy-section">
          <div className="dy-measure">
            <div className="grid gap-12 md:grid-cols-12 md:gap-10">
              <Reveal className="md:col-span-5 lg:col-span-4">
                <Eyebrow>Simvolun mənası</Eyebrow>
                <h2
                  id="manifest-heading"
                  className="mt-7 font-serif font-light leading-[1.04] tracking-[-0.015em] text-ivory text-[length:var(--fs-display-m)]"
                >
                  Dəmir Yumruq
                  <br />
                  <span className="italic text-gold">nəyi ifadə edir?</span>
                </h2>
                <p className="mt-9 max-w-sm text-[15px] leading-[1.85] text-ivory-dim">
                  Bu ifadə Azərbaycan ictimai yaddaşında güc, birlik, qətiyyət və Zəfər
                  anlayışları ilə əlaqələnən güclü simvollardan birinə çevrilib. Hər
                  detalında bir məna var.
                </p>
              </Reveal>

              <ol className="md:col-span-7 lg:col-span-7 lg:col-start-6">
                {PRINCIPLES.map((p, i) => (
                  <Reveal
                    as="li"
                    key={p.num}
                    delay={i * 70}
                    className="flex gap-7 border-t border-[var(--rule)] py-9 first:border-t-0 first:pt-0 md:gap-10 md:py-11"
                  >
                    <span
                      aria-hidden="true"
                      className="dy-num mt-1 w-12 shrink-0 font-serif text-[clamp(1.5rem,2.6vw,2.1rem)] font-light leading-none text-gold/70"
                    >
                      {p.num}
                    </span>
                    <div>
                      <h3 className="font-serif text-[clamp(1.3rem,2.4vw,1.8rem)] font-light leading-tight text-ivory">
                        {p.title}
                      </h3>
                      <p className="mt-3 max-w-xl text-[14px] leading-[1.85] text-ivory-dim">
                        {p.text}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* ═══ ORDER — how an order actually happens ═══ */}
        <section
          aria-labelledby="order-heading"
          className="border-t border-[var(--rule)] bg-wine/40"
        >
          <div className="dy-measure dy-section">
            <div className="grid gap-12 md:grid-cols-12 md:gap-10">
              <div className="md:col-span-4">
                <Reveal className="md:sticky md:top-32">
                  <Eyebrow>Sifariş prosesi</Eyebrow>
                  <h2
                    id="order-heading"
                    className="mt-7 font-serif font-light leading-[1.06] tracking-[-0.015em] text-ivory text-[length:var(--fs-display-m)]"
                  >
                    Üç addımda —
                    <br />
                    <span className="text-gold">sizin simvol.</span>
                  </h2>
                  <p className="mt-8 max-w-xs text-[14px] leading-[1.85] text-ivory-dim">
                    Hər obyekt əl işidir. Sifarişdən təhvilə qədər proses belə keçir:
                  </p>
                </Reveal>
              </div>

              <ol className="md:col-span-7 md:col-start-6">
                {STEPS.map((item, i) => (
                  <Reveal
                    as="li"
                    key={item.num}
                    delay={i * 60}
                    className="group border-t border-[var(--rule)] py-10 first:border-t-0 first:pt-0 md:py-12"
                  >
                    <span className="dy-num block font-serif text-[clamp(2.4rem,5.5vw,4.25rem)] font-light leading-none text-gold/25 transition-colors duration-500 group-hover:text-gold/60">
                      {item.num}
                    </span>
                    <h3 className="mt-6 font-serif text-[clamp(1.3rem,2.6vw,1.9rem)] font-light text-ivory">
                      {item.title}
                    </h3>
                    <p className="mt-3 max-w-xl text-[14px] leading-[1.85] text-ivory-dim">
                      {item.text}
                    </p>
                  </Reveal>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* ═══ COLORWAYS — three plates, lit by their own tone ═══ */}
        <section aria-labelledby="colorways-heading" className="dy-section">
          <div className="dy-measure">
            <Reveal>
              <Eyebrow>Təqdimat qutusu</Eyebrow>
              <h2
                id="colorways-heading"
                className="mt-7 font-serif font-light leading-[1.04] tracking-[-0.015em] text-ivory text-[length:var(--fs-display-m)]"
              >
                Qutudan daha çoxu —
                <br />
                <span className="italic text-gold">üç rəngdə.</span>
              </h2>
            </Reveal>

            <ul className="mt-16 grid gap-12 md:mt-20 md:grid-cols-3 md:gap-8 lg:gap-10">
              {COLORWAYS.map((c, i) => (
                <Reveal as="li" key={c.name} delay={i * 110} className="group">
                  <figure>
                    <div
                      className="relative aspect-[4/5] overflow-hidden border border-[var(--rule)] transition-colors duration-700 group-hover:border-[var(--rule-strong)]"
                      style={{
                        background: `radial-gradient(90% 72% at 50% 34%, ${c.tone}33, transparent 78%), linear-gradient(to bottom, var(--wine-soft) 0%, var(--wine) 100%)`,
                      }}
                    >
                      <Image
                        src={c.image}
                        alt={c.alt}
                        fill
                        sizes="(max-width: 768px) 92vw, 30vw"
                        quality={82}
                        className="object-contain p-8 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.045] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                      />
                    </div>
                    <figcaption className="mt-6 flex items-start gap-3.5">
                      <span
                        aria-hidden="true"
                        className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full ring-1 ring-inset ring-ivory/15"
                        style={{ backgroundColor: c.tone }}
                      />
                      <div>
                        <p className="font-serif text-lg font-light text-ivory">{c.name}</p>
                        <p className="mt-1.5 text-[13px] leading-[1.7] text-ivory-dim">
                          {c.blurb}
                        </p>
                      </div>
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        {/* ═══ ATELIER NOTE — the workshop's word ═══ */}
        <section
          aria-labelledby="statement-heading"
          className="relative overflow-hidden border-t border-[var(--rule)] bg-wine/40"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-gold/[0.05] blur-[110px]"
          />
          <div className="dy-measure dy-section relative">
            <Reveal as="blockquote" className="mx-auto max-w-3xl text-center">
              <h2 id="statement-heading" className="sr-only">
                Son qeyd
              </h2>
              <p className="font-serif text-[length:var(--fs-lead)] font-light leading-[1.45] text-ivory/90">
                «Güc keçir, yaddaş qalır. Dəmir Yumruq Zəfər anını əbədi saxlamaq üçün tökülüb:
                bürünc, qızıl və üzərində tək bir cümlə —{' '}
                <span className="italic text-gold">Qarabağ Azərbaycandır!</span>»
              </p>
              <footer className="mt-10">
                <Reveal variant="line" delay={200} className="dy-rule mx-auto mb-8 w-24" />
                <p className="dy-eyebrow text-gold">Dəmir Yumruq</p>
                <p className="dy-meta mt-3 text-ivory-dim">Bakı · MMXXVI</p>
              </footer>
            </Reveal>
          </div>
        </section>

        {/* ═══ CTA — the final chord ═══ */}
        <section
          aria-labelledby="about-cta-heading"
          className="relative overflow-hidden border-t border-[var(--rule)]"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-[-32%] right-[-10%] h-[560px] w-[560px] rounded-full bg-gold/[0.07] blur-[130px]"
          />
          <div className="dy-measure dy-section relative text-center">
            <Reveal>
              <Eyebrow>Sifariş</Eyebrow>
              <h2
                id="about-cta-heading"
                className="mx-auto mt-7 max-w-3xl font-serif font-light leading-[1.04] tracking-[-0.015em] text-ivory text-[length:var(--fs-display-m)]"
              >
                Bu dəfə onu <span className="italic text-gold">əlinizdə saxlayın.</span>
              </h2>
              <p className="mx-auto mt-8 max-w-md text-[15px] leading-[1.85] text-ivory-dim">
                Formanı doldurun — komandamız 24 saat ərzində sizinlə əlaqə saxlayacaq.
              </p>
              <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/#sifaris"
                  className="dy-cta bg-gold px-10 py-4 text-[12px] font-semibold tracking-[0.22em] text-wine-deep"
                >
                  SİFARİŞ ET <span aria-hidden="true" className="dy-arrow">→</span>
                </Link>
                <Link
                  href="/gallery"
                  className="dy-ghost border border-ivory/25 px-10 py-4 text-[12px] font-medium tracking-[0.22em] text-ivory"
                >
                  QALEREYAYA BAX <span aria-hidden="true" className="dy-arrow">→</span>
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
