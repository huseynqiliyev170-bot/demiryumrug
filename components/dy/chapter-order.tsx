'use client'

import { useActionState, useState } from 'react'
import { submitOrder, type OrderState } from '@/app/actions'
import { Reveal } from './reveal'
import { ProductImage } from './product-image'

const initialState: OrderState = { status: 'idle' }

/* ---------- UI primitives ---------- */

function Field({
  label,
  htmlFor,
  error,
  hint,
  children,
}: {
  label: string
  htmlFor: string
  error?: string
  hint?: string
  children: React.ReactNode
}) {
  return (
    <div className="group">
      <div className="flex items-baseline justify-between">
        <label htmlFor={htmlFor} className="block">
          <span className="text-[10px] font-medium tracking-[0.22em] uppercase text-ink/60 transition-colors group-focus-within:text-wine">
            {label}
          </span>
        </label>
        {hint ? <span className="text-[10px] tracking-[0.12em] text-ink/30">{hint}</span> : null}
      </div>
      <div className="mt-2.5">{children}</div>
      {error ? (
        <p
          id={`${htmlFor}-error`}
          role="alert"
          className="mt-2 flex items-center gap-1.5 text-[12px] font-medium text-[#a3121f]"
        >
          <span aria-hidden className="inline-block h-1 w-1 rounded-full bg-[#a3121f]" />
          {error}
        </p>
      ) : null}
    </div>
  )
}

const inputClass =
  'w-full border border-ink/10 bg-ivory px-4 py-3.5 text-[15px] text-ink placeholder:text-ink/30 transition-all duration-300 focus:border-wine focus:outline-none focus:ring-2 focus:ring-wine/15 focus:bg-white hover:border-ink/20'

/* Угловые засечки для карточки товара */
function CornerMarks() {
  return (
    <>
      {(['top-4 left-4 border-t border-l', 'top-4 right-4 border-t border-r',
         'bottom-4 left-4 border-b border-l', 'bottom-4 right-4 border-b border-r'] as const).map((pos) => (
        <span key={pos} aria-hidden className={`pointer-events-none absolute h-5 w-5 border-gold/30 ${pos}`} />
      ))}
    </>
  )
}

/* ---------- Component ---------- */

const TRUST_ITEMS = [
  { k: '01', label: 'ƏL İŞİ', sub: 'Hər obyekt diqqətlə hazırlanır' },
  { k: '24', label: 'SAAT ƏRZİNDƏ ƏLAQƏ', sub: 'Operator sizinlə danışacaq' },
  { k: '◆', label: 'PREMİUM QUTU', sub: 'Hədiyyə təqdimatı daxildir' },
] as const

const STEPS = [
  { n: '01', t: 'MÜRACİƏT', d: 'Formanı doldurun — 1 dəqiqə kifayətdir' },
  { n: '02', t: 'TƏSDİQ', d: 'Sizinlə əlaqə saxlayıb detalları dəqiqləşdirəcəyik' },
  { n: '03', t: 'TƏHVİL', d: 'Obyekt təqdimat qutusunda ünvanınıza çatdırılır' },
] as const

export function ChapterOrder() {
  const [state, formAction, isPending] = useActionState(submitOrder, initialState)
  const v = state.values

  const [qty, setQty] = useState<number>(Number(v?.quantity) || 1)
  const [noteLen, setNoteLen] = useState<number>(v?.note?.length ?? 0)

  const clampQty = (n: number) => Math.min(50, Math.max(1, Math.round(n) || 1))

  return (
    <section id="sifaris" aria-label="Sifariş" className="relative overflow-hidden bg-ivory text-ink">
      {/* Фоновый водяной знак */}
      <div aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
        <span className="select-none whitespace-nowrap font-serif text-[26vw] leading-none tracking-tighter text-wine/[0.025]">
          ZƏFƏR
        </span>
      </div>
      {/* Тонкая вертикальная направляющая */}
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 hidden h-32 w-px bg-gradient-to-b from-transparent via-wine/15 to-transparent md:block" />

      <div className="relative mx-auto w-full max-w-[120rem] px-6 py-20 md:px-10 md:py-28">
        {/* ---------- Header ---------- */}
        <div className="mb-12 md:mb-16 md:grid md:grid-cols-12 md:items-end md:gap-10">
          <Reveal className="md:col-span-7">
            <div className="mb-6 flex items-center gap-5">
              <span className="text-[10px] uppercase tracking-[0.35em] text-wine/40">06 / SİFARİŞ</span>
              <div className="h-px max-w-[100px] flex-1 bg-gradient-to-r from-wine/15 to-transparent" />
            </div>
            <h2 className="font-serif text-[clamp(3rem,9vw,6.5rem)] leading-[0.85] tracking-tight text-ink">
              DƏMİR<br />
              <span className="text-wine">YUMRUĞUNU</span><br />
              ƏLDƏ EDİN
            </h2>
          </Reveal>
          <Reveal className="mt-8 md:col-span-5 md:col-start-8 md:mt-0 md:text-right" delay={120}>
            <p className="text-[15px] leading-[1.8] text-ink/50 md:text-[16px]">
              Əgər bu simvol sizin üçün də xüsusi məna daşıyırsa, sifariş üçün məlumatlarınızı göndərin.
              Sizinlə əlaqə saxlayaraq növbəti mərhələ barədə məlumat verəcəyik.
            </p>
          </Reveal>
        </div>

        {/* ---------- Trust bar ---------- */}
        <Reveal delay={160}>
          <div className="mb-12 grid grid-cols-1 divide-y divide-ink/[0.06] border-y border-ink/[0.06] sm:grid-cols-3 sm:divide-x sm:divide-y-0 md:mb-16">
            {TRUST_ITEMS.map((item) => (
              <div key={item.label} className="flex items-center gap-4 px-2 py-5 sm:justify-center sm:px-6">
                <span className="font-serif text-[1.6rem] leading-none text-gold/60">{item.k}</span>
                <div>
                  <p className="text-[10px] font-semibold tracking-[0.22em] text-ink/70">{item.label}</p>
                  <p className="mt-0.5 text-[12px] text-ink/40">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* ---------- Split: product / form ---------- */}
        {/* items-stretch: обе колонки одной высоты, без провалов снизу */}
        <div className="md:grid md:grid-cols-12 md:items-stretch md:gap-10">
          {/* LEFT: product + steps */}
          <div className="md:col-span-5 md:flex md:flex-col">
            {/* Мобильная компактная карточка товара */}
            <Reveal className="mb-10 md:hidden">
              <figure className="flex items-center gap-5 border border-ink/[0.06] bg-gradient-to-r from-wine-soft to-wine-deep p-4">
                <div className="relative h-28 w-24 shrink-0 overflow-hidden">
                  <ProductImage
                    name="fist-on-box"
                    alt="Dəmir Yumruq obyekti təqdimat qutusunun üzərində"
                    fit="contain"
                    sizes="96px"
                    className="h-full w-full object-contain"
                  />
                </div>
                <figcaption>
                  <p className="text-[10px] uppercase tracking-[0.26em] text-ivory/50">ZƏFƏRİN SİMVOLU</p>
                  <p className="mt-1 font-serif text-[1.3rem] leading-tight text-ivory">Dəmir Yumruq</p>
                </figcaption>
              </figure>
            </Reveal>

            {/* Desktop карточка — растягивается по высоте формы */}
            <Reveal scale className="hidden md:flex md:flex-1 md:flex-col" delay={80}>
              <figure className="relative flex flex-1 flex-col border border-ink/[0.06] bg-gradient-to-b from-wine-soft to-wine-deep p-6 shadow-[0_40px_100px_-40px_rgba(18,17,15,0.4)]">
                {/* flex-1 вместо aspect-[3/4]: фото занимает ровно доступную высоту */}
                <div className="relative min-h-[320px] flex-1 overflow-hidden border border-gold/[0.08]">
                  <CornerMarks />
                  <ProductImage
                    name="fist-on-box"
                    alt="Dəmir Yumruq obyekti təqdimat qutusunun üzərində"
                    fit="contain"
                    sizes="(max-width: 767px) 0px, 35vw"
                    className="absolute inset-0 h-full w-full object-contain transition-transform duration-700 hover:scale-[1.03]"
                  />
                </div>
                <figcaption className="mt-5 flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-[0.26em] text-ivory/40">ZƏFƏRİN SİMVOLU</span>
                  <span className="font-serif text-[13px] text-gold/50">— 06</span>
                </figcaption>
              </figure>
            </Reveal>
          </div>

          {/* RIGHT: form / success */}
          <div className="md:col-span-7 md:flex md:flex-col">
            {state.status === 'success' ? (
              <Reveal
                aria-live="polite"
                className="relative flex-1 overflow-hidden border-l-[3px] border-wine bg-gradient-to-r from-wine/[0.04] to-transparent px-8 py-14 shadow-[0_20px_60px_-30px_rgba(18,17,15,0.16)] md:px-12"
              >
                <span aria-hidden className="absolute -right-6 -top-10 select-none font-serif text-[10rem] leading-none text-wine/[0.05]">✓</span>
                <span className="text-[10px] uppercase tracking-[0.3em] text-gold/60">TƏŞƏKKÜRLƏR</span>
                <p className="mt-4 font-serif text-[2rem] leading-tight text-wine md:text-[2.5rem]">
                  MÜRACİƏTİNİZ QƏBUL OLUNDU.
                </p>
                <p className="mt-5 max-w-[36rem] text-[15px] leading-[1.8] text-ink/60 md:text-[16px]">{state.message}</p>
                <div className="mt-8 flex items-center gap-4 border-t border-ink/[0.08] pt-6">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-wine/20 font-serif text-[11px] text-wine">02</span>
                  <p className="text-[13px] text-ink/50">Növbəti addım: 24 saat ərzində sizinlə əlaqə saxlayacağıq.</p>
                </div>
              </Reveal>
            ) : (
              <Reveal delay={140} className="md:flex md:flex-1 md:flex-col">
                <form action={formAction} noValidate className="flex flex-1 flex-col space-y-7 border border-ink/[0.08] bg-white/45 p-7 shadow-[0_30px_80px_-50px_rgba(18,17,15,0.22)] backdrop-blur-sm md:p-10">
                  <div className="flex items-center justify-between border-b border-ink/[0.06] pb-6">
                    <p className="font-serif text-[1.4rem] text-ink">Sifariş formu</p>
                    <span className="text-[10px] tracking-[0.2em] text-ink/30">~ 1 DƏQİQƏ</span>
                  </div>

                  <Field label="AD, SOYAD" htmlFor="order-name" error={state.errors?.name}>
                    <input
                      id="order-name" name="name" type="text" autoComplete="name" required
                      defaultValue={v?.name}
                      aria-invalid={Boolean(state.errors?.name)}
                      aria-describedby={state.errors?.name ? 'order-name-error' : undefined}
                      placeholder="Adınızı və soyadınızı daxil edin"
                      className={inputClass}
                    />
                  </Field>

                  <div className="grid gap-7 sm:grid-cols-2">
                    <Field label="TELEFON NÖMRƏSİ" htmlFor="order-phone" error={state.errors?.phone}>
                      <input
                        id="order-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" required
                        defaultValue={v?.phone}
                        aria-invalid={Boolean(state.errors?.phone)}
                        aria-describedby={state.errors?.phone ? 'order-phone-error' : undefined}
                        placeholder="+994 XX XXX XX XX"
                        className={inputClass}
                      />
                    </Field>
                    <Field label="ŞƏHƏR" htmlFor="order-city" error={state.errors?.city}>
                      <input
                        id="order-city" name="city" type="text" autoComplete="address-level2" required
                        defaultValue={v?.city}
                        aria-invalid={Boolean(state.errors?.city)}
                        aria-describedby={state.errors?.city ? 'order-city-error' : undefined}
                        placeholder="Şəhərinizi daxil edin"
                        className={inputClass}
                      />
                    </Field>
                  </div>

                  {/* Степпер количества */}
                  <Field label="SİFARİŞ SAYI" htmlFor="order-quantity" error={state.errors?.quantity} hint="MAKS. 50">
                    <div className="inline-flex items-stretch border border-ink/10 bg-ivory transition-colors focus-within:border-wine focus-within:ring-2 focus-within:ring-wine/15">
                      <button
                        type="button"
                        aria-label="Azalt"
                        disabled={qty <= 1}
                        onClick={() => setQty((q) => clampQty(q - 1))}
                        className="w-12 text-[18px] text-ink/50 transition-colors hover:bg-wine/5 hover:text-wine disabled:opacity-25 disabled:hover:bg-transparent"
                      >
                        −
                      </button>
                      <input
                        id="order-quantity" name="quantity" type="number" inputMode="numeric"
                        min={1} max={50} step={1} required
                        value={qty}
                        onChange={(e) => setQty(clampQty(Number(e.target.value)))}
                        aria-invalid={Boolean(state.errors?.quantity)}
                        aria-describedby={state.errors?.quantity ? 'order-quantity-error' : undefined}
                        className="w-16 border-x border-ink/10 bg-transparent py-3.5 text-center text-[15px] text-ink focus:outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                      />
                      <button
                        type="button"
                        aria-label="Artır"
                        disabled={qty >= 50}
                        onClick={() => setQty((q) => clampQty(q + 1))}
                        className="w-12 text-[18px] text-ink/50 transition-colors hover:bg-wine/5 hover:text-wine disabled:opacity-25 disabled:hover:bg-transparent"
                      >
                        +
                      </button>
                    </div>
                  </Field>

                  <Field label="ƏLAVƏ QEYD" htmlFor="order-note" hint={`${noteLen}/1000`}>
                    <textarea
                      id="order-note" name="note" rows={3} maxLength={1000}
                      defaultValue={v?.note}
                      onChange={(e) => setNoteLen(e.target.value.length)}
                      placeholder="Əlavə məlumatınız varsa, qeyd edə bilərsiniz"
                      className={`${inputClass} min-h-[100px] resize-y`}
                    />
                  </Field>

                  {state.status === 'error' && state.message ? (
                    <div role="alert" className="border-l-2 border-[#a3121f] bg-[#a3121f]/[0.04] px-4 py-3">
                      <p className="text-[13px] font-medium text-[#a3121f]">{state.message}</p>
                    </div>
                  ) : null}

                  {/* mt-auto прижимает кнопку к низу — колонки заканчиваются вровень */}
                  <div className="mt-auto flex flex-col gap-5 pt-2 sm:flex-row sm:items-center sm:justify-between">
                    <button
                      type="submit"
                      disabled={isPending}
                      className="group/btn relative w-full overflow-hidden bg-wine-deep px-10 py-4 text-[12px] font-semibold tracking-[0.25em] text-ivory transition-all hover:bg-wine hover:shadow-[0_8px_30px_rgba(42,10,18,0.3)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wine disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                    >
                      <span className="relative z-10 inline-flex items-center gap-3">
                        {isPending ? 'GÖNDƏRİLİR...' : 'SİFARİŞİ GÖNDƏR'}
                        {!isPending && (
                          <span aria-hidden className="transition-transform duration-300 group-hover/btn:translate-x-1.5">→</span>
                        )}
                      </span>
                      <span aria-hidden className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-ivory/10 to-transparent transition-transform duration-700 group-hover/btn:translate-x-full" />
                    </button>
                    <p className="text-[11px] leading-relaxed text-ink/35">
                      Məlumatlarınız yalnız sifarişin icrası üçün istifadə olunur.
                    </p>
                  </div>
                </form>
              </Reveal>
            )}
          </div>
        </div>

        {/* ---------- Steps: горизонтально под сеткой, вместо дыры под карточкой ---------- */}
        <Reveal className="mt-12 hidden md:block" delay={200}>
          <ol className="grid grid-cols-3 divide-x divide-ink/[0.06] border-y border-ink/[0.06]">
            {STEPS.map((s) => (
              <li key={s.n} className="flex gap-5 px-8 py-7">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-wine/20 bg-ivory font-serif text-[11px] text-wine">
                  {s.n}
                </span>
                <div className="pt-1">
                  <p className="text-[10px] font-semibold tracking-[0.24em] text-ink/70">{s.t}</p>
                  <p className="mt-1 text-[13px] leading-relaxed text-ink/45">{s.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  )
}
