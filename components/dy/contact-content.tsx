'use client'

import { motion } from 'framer-motion'
import { SiteHeader } from '@/components/dy/site-header'
import { SiteFooter } from '@/components/dy/site-footer'

const EASE = [0.22, 1, 0.36, 1] as const

const FADE = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
} as const

const CHANNELS = [
  {
    label: 'E-poçt',
    value: 'info@demiryumruq.az',
    href: 'mailto:info@demiryumrug.com',
    note: 'Hər gün — 24 saat ərzində cavab',
    external: false,
  },
  // {
  //   label: 'Telefon',
  //   value: '+994 50 123 45 67',
  //   href: 'tel:+994501234567',
  //   note: 'B.e–Şənbə, 10:00–19:00 (GMT+4)',
  //   external: false,
  // },
  {
    label: 'Instagram',
    value: '@demiryumrug.az',
    href: 'https://www.instagram.com/demiryumrug.az',
    note: 'DM — sürətli cavab',
    external: true,
  },
]

const STEPS = [
  {
    num: '01',
    title: 'Siz yazırsınız',
    text: 'İstənilən kanaldan — e-poçt, zəng və ya Instagram DM. İki cümlə kifayətdir.',
  },
  {
    num: '02',
    title: '24 saat ərzində cavab',
    text: 'Operator birbaşa sizinlə əlaqə saxlayır, tarix və detalları dəqiqləşdirir.',
  },
  {
    num: '03',
    title: 'Sifariş təsdiqlənir',
    text: 'Çatdırılma ünvanı və fərdi işləmə razılaşdırılır — geriyə yalnız gözləmək qalır.',
  },
]

const QA = [
  {
    q: 'Sifariş nə qədər hazırlanır?',
    a: 'Hər parça fərdi hazırlanır — adətən 5–10 iş günü. Böyük sifarişlərdə tarix ayrıca razılaşdırılır.',
  },
  {
    q: 'Çatdırılma necə olur?',
    a: 'Bakı daxilində fərdi təqdimat, bölgələrə 2–4 gün. Beynəlxalq göndəriş mümkündür.',
  },
  {
    q: 'Fərdi işləmə mümkündürmü?',
    a: 'Bəli — hədiyyə üzərində ad, tarix və ya xüsusi yazı qazına bilərik. Sifariş zamanı bildirin.',
  },
  {
    q: 'Ödəniş üsulları?',
    a: 'Bank köçürməsi və yerli ödəniş sistemləri qəbul olunur. Detallar təsdiqdə göndərilir.',
  },
]

function Eyebrow({ children }: { children: string }) {
  return (
    <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-gold">{children}</p>
  )
}

export function ContactContent() {
  return (
    <>
      <SiteHeader />
      <main className="bg-wine-deep">

        {/* ═══ HERO — типографика, без фото ═══ */}
        <section
          aria-labelledby="contact-heading"
          className="relative overflow-hidden border-b border-gold/15"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-[-30%] h-[560px] w-[900px] -translate-x-1/2 rounded-full bg-gold/[0.07] blur-[140px]"
          />

          <div className="relative mx-auto max-w-[120rem] px-6 pb-20 pt-40 md:px-10 md:pb-28 md:pt-52">
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE }}
            >
              <Eyebrow>Əlaqə</Eyebrow>
              <h1
                id="contact-heading"
                className="mt-8 max-w-5xl font-serif text-[clamp(2.75rem,7.5vw,6.5rem)] leading-[0.95] text-ivory"
              >
                Danışmaq <span className="italic text-gold">asandır.</span>
              </h1>
              <p className="mt-9 max-w-md text-[15px] leading-[1.8] text-ivory-dim md:text-base">
                Sifariş, fərdi işləmə və ya sadəcə sual — bir kanal seçin. Hər müraciətə birbaşa
                operator cavab verir.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-4">
                <a
                  href="/#sifaris"
                  className="inline-flex items-center gap-3 bg-gold px-9 py-4 text-[12px] font-semibold tracking-[0.22em] text-wine-deep transition-colors hover:bg-gold-bright focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                >
                  SİFARİŞ ET <span aria-hidden="true">→</span>
                </a>
                <a
                  href="#kanallar"
                  className="inline-flex items-center gap-3 border border-ivory/25 px-9 py-4 text-[12px] font-medium tracking-[0.22em] text-ivory transition-colors hover:border-gold/60 hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                >
                  KANALLARA BAX
                </a>
              </div>
            </motion.div>
          </div>

          {/* Служебная строка по низу hero */}
          <div className="relative border-t border-ivory/10">
            <div className="mx-auto grid max-w-[120rem] grid-cols-1 divide-y divide-ivory/10 px-6 sm:grid-cols-3 sm:divide-x sm:divide-y-0 md:px-10">
              {[
                ['Ünvan', 'Bakı, Azərbaycan'],
                ['İş saatları', 'B.e–Şənbə, 10:00–19:00'],
                ['Cavab müddəti', '24 saat ərzində'],
              ].map(([k, v]) => (
                <div key={k} className="flex items-baseline justify-between gap-4 py-5 sm:flex-col sm:justify-start sm:gap-1 sm:px-8 sm:py-7 sm:first:pl-0 sm:last:pr-0">
                  <span className="text-[10px] uppercase tracking-[0.28em] text-ivory-dim/70">{k}</span>
                  <span className="text-[13px] tracking-[0.08em] text-ivory">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ KANALLAR — строгие строки грида ═══ */}
        <section
          id="kanallar"
          aria-labelledby="channels-heading"
          className="border-b border-gold/15"
        >
          <div className="mx-auto max-w-[120rem] px-6 py-24 md:px-10 md:py-32">
            <motion.div {...FADE} transition={{ duration: 0.9, ease: EASE }} className="mb-14">
              <Eyebrow>Kanallar</Eyebrow>
              <h2
                id="channels-heading"
                className="mt-5 font-serif text-[clamp(1.9rem,4vw,3.2rem)] leading-[1.05] text-ivory"
              >
                Birini seçin — <span className="italic text-gold">hamısı canlıdır.</span>
              </h2>
            </motion.div>

            <ul className="border-t border-ivory/10">
              {CHANNELS.map((ch, i) => (
                <motion.li
                  key={ch.label}
                  {...FADE}
                  transition={{ duration: 0.8, delay: i * 0.07, ease: EASE }}
                  className="group border-b border-ivory/10"
                >
                  <a
                    href={ch.href}
                    {...(ch.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="grid grid-cols-[1fr_auto] items-center gap-x-6 gap-y-2 py-8 transition-colors md:grid-cols-[8rem_10rem_1fr_auto_auto] md:items-baseline md:gap-x-10 md:py-11"
                  >
                    <span
                      aria-hidden="true"
                      className="col-start-1 row-start-1 text-[11px] font-medium tracking-[0.25em] text-gold/60"
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="col-start-1 row-start-2 text-[10px] uppercase tracking-[0.3em] text-ivory-dim/70 md:col-start-2 md:row-start-1">
                      {ch.label}
                    </span>
                    <span className="col-span-2 row-start-3 font-serif text-[clamp(1.6rem,4.2vw,3.1rem)] leading-[1.08] text-ivory transition-colors duration-300 group-hover:text-gold md:col-span-1 md:col-start-3 md:row-start-1">
                      {ch.value}
                    </span>
                    <span className="col-start-1 row-start-4 text-[13px] leading-[1.6] text-ivory-dim md:col-start-4 md:row-start-1 md:max-w-[13rem] md:text-right">
                      {ch.note}
                    </span>
                    <span
                      aria-hidden="true"
                      className="col-start-2 row-start-1 text-2xl text-gold/50 transition-transform duration-300 group-hover:translate-x-1.5 group-hover:text-gold md:col-start-5"
                    >
                      →
                    </span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>
        </section>

        {/* ═══ PROSES — три шага в жёсткой сетке ═══ */}
        <section
          aria-labelledby="steps-heading"
          className="border-b border-gold/15 bg-wine/40"
        >
          <div className="mx-auto max-w-[120rem] px-6 py-24 md:px-10 md:py-32">
            <motion.div {...FADE} transition={{ duration: 0.9, ease: EASE }} className="mb-14">
              <Eyebrow>Proses</Eyebrow>
              <h2
                id="steps-heading"
                className="mt-5 font-serif text-[clamp(1.9rem,4vw,3.2rem)] leading-[1.05] text-ivory"
              >
                Yazdıqdan sonra — <span className="italic text-gold">üç addım.</span>
              </h2>
            </motion.div>

            <ol className="grid gap-px overflow-hidden border border-ivory/10 bg-ivory/10 md:grid-cols-3">
              {STEPS.map((step, i) => (
                <motion.li
                  key={step.num}
                  {...FADE}
                  transition={{ duration: 0.85, delay: i * 0.09, ease: EASE }}
                  className="flex flex-col bg-wine-deep p-8 md:p-10"
                >
                  <span
                    aria-hidden="true"
                    className="font-serif text-[clamp(2.2rem,4vw,3.2rem)] leading-none text-gold/30"
                  >
                    {step.num}
                  </span>
                  <h3 className="mt-6 font-serif text-xl leading-tight text-ivory md:text-2xl">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-[14px] leading-[1.75] text-ivory-dim">{step.text}</p>
                </motion.li>
              ))}
            </ol>
          </div>
        </section>

        {/* ═══ SUALLAR — 2-колоночная сетка ═══ */}
        <section
          aria-labelledby="qa-heading"
          className="border-b border-gold/15"
        >
          <div className="mx-auto max-w-[120rem] px-6 py-24 md:px-10 md:py-32">
            <motion.div {...FADE} transition={{ duration: 0.9, ease: EASE }} className="mb-14">
              <Eyebrow>Suallar</Eyebrow>
              <h2
                id="qa-heading"
                className="mt-5 font-serif text-[clamp(1.9rem,4vw,3.2rem)] leading-[1.05] text-ivory"
              >
                Tez-tez verilən <span className="italic text-gold">suallar.</span>
              </h2>
            </motion.div>

            <dl className="grid gap-px overflow-hidden border border-ivory/10 bg-ivory/10 md:grid-cols-2">
              {QA.map((item, i) => (
                <motion.div
                  key={item.q}
                  {...FADE}
                  transition={{ duration: 0.85, delay: (i % 2) * 0.08, ease: EASE }}
                  className="bg-wine-deep p-8 md:p-10"
                >
                  <dt className="font-serif text-lg leading-snug text-ivory md:text-xl">
                    {item.q}
                  </dt>
                  <dd className="mt-4 max-w-md text-[14px] leading-[1.8] text-ivory-dim">
                    {item.a}
                  </dd>
                </motion.div>
              ))}
            </dl>
          </div>
        </section>

        {/* ═══ CTA — финальная полоса ═══ */}
        <section aria-labelledby="contact-cta-heading" className="relative overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/[0.08] blur-[130px]"
          />
          <div className="relative mx-auto max-w-[120rem] px-6 py-24 text-center md:px-10 md:py-32">
            <motion.div {...FADE} transition={{ duration: 0.9, ease: EASE }}>
              <Eyebrow>Birbaşa yol</Eyebrow>
              <h2
                id="contact-cta-heading"
                className="mx-auto mt-6 max-w-2xl font-serif text-[clamp(2rem,5vw,3.8rem)] leading-[1.03] text-ivory"
              >
                Vaxt itirməyin — <span className="italic text-gold">sifariş verin.</span>
              </h2>
              <p className="mx-auto mt-7 max-w-md text-[15px] leading-[1.8] text-ivory-dim">
                Formu doldurun — komandamız sizinlə birbaşa əlaqə saxlayacaq.
              </p>
              <a
                href="/#sifaris"
                className="mt-10 inline-flex items-center gap-3 bg-gold px-10 py-4 text-[12px] font-semibold tracking-[0.22em] text-wine-deep transition-colors hover:bg-gold-bright focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
              >
                SİFARİŞ FORMUNA KEÇ <span aria-hidden="true">→</span>
              </a>
            </motion.div>
          </div>
        </section>

      </main>
      <SiteFooter />
    </>
  )
}
