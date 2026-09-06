'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Award, Gem, PackageCheck, Sparkles } from 'lucide-react'
import { ProductImage } from './product-image'
import type { ProductImageKey } from '@/lib/image-data'

const ease = [0.22, 1, 0.36, 1] as const

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
}

const specs = [
  { icon: Gem, label: 'Material', value: 'Bürünc + 24K qızıl örtük' },
  { icon: Award, label: 'Qablaşdırma', value: 'Əl işi təqdimat qutusu' },
  { icon: PackageCheck, label: 'Təqdimat', value: 'Qutu və qoruyucu astar' },
  { icon: Sparkles, label: 'İstehsal', value: 'Əl işi, Bakı' },
]

export function ProductShowcase() {
  return (
    <section
      id="koleksiya"
      aria-label="Koleksiya"
      className="relative overflow-hidden border-t border-gold/10 bg-wine-deep py-20 md:py-32"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_8%,rgba(179,151,104,0.08),transparent_42%)]" />

      <div className="relative mx-auto w-full max-w-7xl px-5 md:px-8">

        {/* ── Header: заголовок + описание + спеки в одной плотной сетке ── */}
        <div className="grid gap-6 md:grid-cols-12 md:items-end mb-8 md:mb-10">
          <motion.div {...fadeUp} transition={{ duration: 0.7, ease }} className="md:col-span-7">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-gold/50" />
              <span className="text-[10px] tracking-[0.35em] text-gold/70 uppercase">07 / Koleksiya</span>
            </div>
            <h2 className="mt-3 font-serif text-[clamp(2rem,5.5vw,3.75rem)] leading-[0.95] tracking-tight text-ivory">
              ZƏFƏRİN SİMVOLU{' '}
              <span className="italic text-gold">ƏBƏDİYƏN</span>
            </h2>
          </motion.div>

          <motion.div {...fadeUp} transition={{ duration: 0.7, delay: 0.1, ease }} className="md:col-span-5">
            <p className="text-[13.5px] leading-relaxed text-ivory-dim/70 border-l border-gold/20 pl-4">
              Hər bir detal — bürüncün istiliyi, qızılın parıltısı, formanın qətiyyəti — bir hekayə danışır.
              Bu, sadəcə obyekt deyil. <span className="text-ivory/90">Bu, yaddaşdır.</span>
            </p>
          </motion.div>
        </div>

        {/* ── Спеки-стрип: заполняет пустоту между хедером и галереей ── */}
        <motion.ul
          {...fadeUp}
          transition={{ duration: 0.7, delay: 0.15, ease }}
          className="mb-8 grid grid-cols-2 divide-y divide-gold/10 border-y border-gold/10 bg-transparent lg:grid-cols-4 lg:divide-x lg:divide-y-0"
        >
          {specs.map(({ icon: Icon, label, value }) => (
            <li key={label} className="flex items-center gap-3 px-4 py-3.5 md:px-5">
              <Icon size={16} className="shrink-0 text-gold/70" aria-hidden="true" />
              <div className="min-w-0">
                <p className="text-[9px] tracking-[0.25em] text-gold/50 uppercase">{label}</p>
                <p className="truncate text-[12px] text-ivory/85">{value}</p>
              </div>
            </li>
          ))}
        </motion.ul>

        {/* ── Gallery: dense, no row-span gaps ── */}
        <div className="grid gap-4 md:grid-cols-12">

          {/* Lead frame */}
          <motion.div {...fadeUp} transition={{ duration: 0.8, ease }} className="md:col-span-7">
            <a
              href="#sifaris"
              className="group relative block h-full overflow-hidden border border-gold/10 bg-gradient-to-br from-oxblood/[0.12] via-gold/[0.05] to-transparent"
            >
              <div className="relative aspect-[16/11] overflow-hidden md:aspect-auto md:h-full md:min-h-[420px]">
                <ProductImage
                  name="fist-on-box"
                  alt="Dəmir Yumruq — tam kolleksiya görüntüsü"
                  fit="cover"
                  sizes="(max-width: 768px) 92vw, 58vw"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-wine-deep/70 via-wine-deep/10 to-transparent" />

                {/* Corner marks */}
                <div aria-hidden="true" className="absolute left-4 top-4 h-6 w-6 border-l border-t border-gold/40 transition-all duration-500 group-hover:h-8 group-hover:w-8" />
                <div aria-hidden="true" className="absolute right-4 bottom-4 h-6 w-6 border-r border-b border-gold/40 transition-all duration-500 group-hover:h-8 group-hover:w-8" />

                {/* Object label */}
                <div className="absolute right-4 top-4 border border-gold/30 bg-wine-deep/75 px-3.5 py-1.5">
                  <span className="text-[10px] tracking-[0.2em] text-gold uppercase">Əl işi obyekt</span>
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between p-5 md:p-6">
                <div>
                  <span className="text-[9px] tracking-[0.3em] text-gold/70 uppercase">01 — Tam Kolleksiya</span>
                  <p className="mt-1 font-serif text-lg md:text-xl text-ivory">ZƏFƏRİN SİMVOLU</p>
                </div>
                <span className="flex h-9 w-9 items-center justify-center border border-gold/30 text-gold transition-all duration-300 group-hover:bg-gold group-hover:text-wine-deep">
                  <ArrowRight size={14} />
                </span>
              </div>
            </a>
          </motion.div>

          {/* Right column: two frames flush, no height gaps */}
          <div className="grid gap-4 md:col-span-5">
            {[
              { name: 'fist-back', alt: 'Dəmir Yumruq — metal səthi', num: '02', label: 'Metal Səth' },
              { name: 'fist-profile', alt: 'Dəmir Yumruq — yan profil', num: '03', label: 'Yan Profil' },
            ].map((item, i) => (
              <motion.a
                key={item.num}
                href="#sifaris"
                {...fadeUp}
                transition={{ duration: 0.7, delay: 0.1 + i * 0.12, ease }}
                className="group relative block overflow-hidden border border-gold/10 bg-gradient-to-br from-oxblood/[0.1] via-gold/[0.05] to-transparent"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <ProductImage
                    name={item.name as ProductImageKey}
                    alt={item.alt}
                    fit="contain"
                    sizes="(max-width: 768px) 92vw, 40vw"
                    className="h-full w-full object-contain p-3 pb-10 transition-transform duration-700 group-hover:scale-[1.05] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-wine-deep/60 via-transparent to-transparent" />
                  {/* Caption over the photo, so it costs no extra height */}
                  <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between p-4">
                    <span className="text-[9px] tracking-[0.3em] text-gold/80 uppercase">
                      {item.num} — {item.label}
                    </span>
                    <ArrowRight
                      size={13}
                      className="text-gold/0 -translate-x-2 transition-all duration-300 group-hover:translate-x-0 group-hover:text-gold"
                    />
                  </div>
                </div>
              </motion.a>
            ))}
          </div>

        </div>

        {/* ── CTA-панель: цена + кнопка в одном блоке, без болтающегося низа ── */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.7, delay: 0.2, ease }}
          className="mt-10 flex flex-col items-start gap-5 border-y border-gold/15 border-l-2 border-l-oxblood-soft bg-gradient-to-r from-oxblood/[0.12] via-gold/[0.04] to-transparent px-6 py-6 md:flex-row md:items-center md:justify-between md:px-8"
        >
          <div>
            <p className="text-[9px] tracking-[0.3em] text-gold/60 uppercase">Rəsmi sifariş</p>
            <p className="mt-1 font-serif text-lg text-ivory">
              Hər obyekt diqqətlə hazırlanır və təqdimat qutusu ilə göndərilir
            </p>
          </div>

          <a
            href="#sifaris"
            className="group relative inline-flex shrink-0 items-center gap-3 overflow-hidden bg-gold px-8 py-3.5 text-[11px] font-semibold tracking-[0.2em] text-wine-deep transition-colors hover:bg-gold-bright"
          >
            {/* Шиммер при ховере */}
            <span
              aria-hidden="true"
              className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full"
            />
            SİFARİŞ ET
            <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
