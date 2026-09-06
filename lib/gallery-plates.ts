/**
 * Gallery catalogue — twelve plates of one object.
 *
 * Plates 01–05 are a rotation study of the object alone (transparent cut-outs,
 * shot at even intervals around it) and drive the turntable in the hero.
 * Plates 06–12 are the presentation photographs and are hung as the catalogue.
 *
 * `blurDataURL` values were produced with sharp at 12px wide; regenerate them
 * whenever a source photograph is replaced.
 */

export type Plate = {
  /** Catalogue number — the address used in captions, ticks and the lightbox. */
  no: number
  src: string
  width: number
  height: number
  /** Short view name. Appears on the turntable ticks and in the filmstrip. */
  view: string
  /** Museum-label title. */
  title: string
  /** One line describing what this plate actually shows. */
  note: string
  alt: string
  blurDataURL: string
  /** Optional catalogue emphasis. Omit it and the image receives a balanced half-width plate. */
  layout?: 'standard' | 'narrow' | 'wide' | 'feature'
}

export const plates: Plate[] = [
  {
    no: 1,
    src: '/images/fist-front.webp',
    width: 1333,
    height: 2000,
    view: 'Ön',
    title: 'Ön görünüş',
    note: 'Qaidədə həkk olunmuş yazı: «Qarabağ Azərbaycandır!»',
    alt: 'Dəmir Yumruq heykəli öndən — qaidədə həkk olunmuş yazı görünür',
    blurDataURL:
      'data:image/webp;base64,UklGRsQAAABXRUJQVlA4WAoAAAAQAAAACwAAEQAAQUxQSFAAAAARZ6C2jSQ1dznfM6QcEQGN45SPE1cQMKptW8n5Nv8BPhLEpQItiMCUEizqOLRyGkT0fwL4sesFsB/mQgFzCzC6i+i0Ng/sNgDZcQgI60rwJVZQOCBOAAAAkAMAnQEqDAASAD79aKxOqyYkIjAIAWAfiWQAuwAbjEqvPZNBwACd0wxZ7N1hO0HlYxEmrKAdp28ecdXGwJ6qtbltaLEy7oJn0+WGIAAA',
  },
  {
    no: 2,
    src: '/images/fist-angle.webp',
    width: 1333,
    height: 2000,
    view: 'Üç rüb',
    title: 'Üç rüb dönüş',
    note: 'Barmaqların həcmi və baş barmağın xətti bir kadrda oxunur.',
    alt: 'Dəmir Yumruq heykəli üç rüb bucaqdan',
    blurDataURL:
      'data:image/webp;base64,UklGRswAAABXRUJQVlA4WAoAAAAQAAAACwAAEQAAQUxQSFAAAAARZ6A0ABI2RyaC24gISHOa504ZbCLbdnI+lFkCQjBBj5FUMqhAAhKocrquyA4i+j8B/FhlQCgZQB3AXp7m+DRdbOnpaB5ER2tDLzmQ1JnFc1ZQOCBWAAAAcAMAnQEqDAASAD79aKxOqyYkIjAIAWAfiWwAtsgbhU4W0Z1AAJ3tkHywyOCaPXr2arjhe//IzQFS+t8QqS9R0szBZnXhU4HLJe31yPWzgvPmTq8AAAA=',
  },
  {
    no: 3,
    src: '/images/fist-side.webp',
    width: 1333,
    height: 2000,
    view: 'Yan',
    title: 'Yan görünüş',
    note: 'Billəkdən qaidəyə keçən düz xətt və üç pilləli oturacaq.',
    alt: 'Dəmir Yumruq heykəli yandan',
    blurDataURL:
      'data:image/webp;base64,UklGRrgAAABXRUJQVlA4WAoAAAAQAAAACwAAEQAAQUxQSEgAAAARV6CmbQM2VRDzKoVGREBhWt0Do9q2lewIyIwIjMhBAA2gUYjhEtQaRPR/AvyYxbCNsI+w5bAkMCewpXDkD4KrQXZPCNoCAABWUDggSgAAAFADAJ0BKgwAEgA+/WqtTysmJCIwCAFgH4lmALDsGxffu+fgAP0fi/eokfAaTyuCMcYOqecWM5pQiHFwekO/coG+9RfEz38Fo8QA',
  },
  {
    no: 4,
    src: '/images/fist-profile.webp',
    width: 1333,
    height: 2000,
    view: 'Profil',
    title: 'Profil',
    note: 'Siluet üç həcmə ayrılır: yumruq, bilək, qaidə.',
    alt: 'Dəmir Yumruq heykəlinin profili',
    blurDataURL:
      'data:image/webp;base64,UklGRrIAAABXRUJQVlA4WAoAAAAQAAAACwAAEQAAQUxQSEcAAAARZ6C2kaQ2+tln3gCRJyIChs6g4oVfDWoCAGn8rUACMxiBCAbT39MUe8UCV4OI/k+A+OgVqUiKJglIlCQBqcgY0pgViHXkHgBWUDggRAAAABADAJ0BKgwAEgA+/WisTqsmJCIwCAFgH4lkAKj0Gu0PgAD52J4QZgfPEKZT7PC3eNSZQcmWcke5QN96g6wn0hH1GAAA',
  },
  {
    no: 5,
    src: '/images/fist-back.webp',
    width: 1333,
    height: 2000,
    view: 'Arxa',
    title: 'Arxa görünüş',
    note: 'Barmaq oynaqlarının relyefi və səthin mat işığı.',
    alt: 'Dəmir Yumruq heykəli arxadan',
    blurDataURL:
      'data:image/webp;base64,UklGRsIAAABXRUJQVlA4WAoAAAAQAAAACwAAEQAAQUxQSEwAAAARZ6C4bSQ1tk84ZsaICMgDv5WnWfEiGNW2reR8CUAERjT6LYjCnBJEcLfbCm8Q0f8J4Pc8AWKVQCQBTNmpTU/dxVw8WUoDSB4IwfEcVlA4IFAAAACQAwCdASoMABIAPv1orU8rJiQiMAgBYB+JZgCw7BuoO7Pr4mqAAP0fi/I9MyuxdNnCVWcfcsiyMTl+sSF2Olo1a3La0VOeJUbZ+9XNSMAAAA==',
  },
  {
    no: 6,
    src: '/images/fist-top.webp',
    width: 1333,
    height: 2000,
    view: 'Yuxarıdan',
    title: 'Yuxarı bucaq',
    note: 'Yuxarıdan düşən işıq barmaqların üzərində toplanır.',
    alt: 'Dəmir Yumruq heykəli yuxarı bucaqdan',
    blurDataURL:
      'data:image/webp;base64,UklGRtAAAABXRUJQVlA4WAoAAAAQAAAACwAAEQAAQUxQSFMAAAARZ6C2kaQ2+Ln3D4RERMAc3pP9A1+BTWTbTg4ZOgRECVkAPWKoUIMARFDn64ooIaL/E8CvbQPkmg3oJfPGhUxygGUEWGXc2DcdcF5yKYJwmAL+BABWUDggVgAAADADAJ0BKgwAEgA+/WisTqsmJCIwCAFgH4lsALDsGqK27gAAvibn4rxuDUqidKjYuC3f075gX+NwvfgFzMlnEVmVjlFVO5wOWRuNd76Y4W/h/TiQgAAA',
    layout: 'narrow',
  },
  {
    no: 7,
    src: '/images/optimized/1.avif',
    width: 2000,
    height: 3000,
    view: 'Qutu üzərində',
    title: 'Qutu üzərində',
    note: 'Bağlı təqdimat qutusu obyekt üçün qaidəyə çevrilir.',
    alt: 'Dəmir Yumruq heykəli bağlı təqdimat qutusunun üzərində',
    blurDataURL:
      'data:image/webp;base64,UklGRsgAAABXRUJQVlA4WAoAAAAQAAAACwAAEQAAQUxQSFcAAAARX6CmjSQ3eH3Od+XD+IgIsId/+WI64TTbtivhnP+bMxE12axOwQiaTX+1GZ1AZ4ANmJARIvqfjgW4XeDzCnjcYZkgXgPz752zbHtFXNeBuO0Dz++/cxwAVlA4IEoAAACQAwCdASoMABIAPv1orE6rJiQiMAgBYB+JZwC7ACHh1Ar3oz8AAP7w0bfysPr8OZcLvx9AmPObkurg58kqibE/HrzbJmQno6DYAA==',
    layout: 'wide',
  },
  {
    no: 8,
    src: '/images/optimized/2.avif',
    width: 2000,
    height: 1333,
    view: 'Yanaşı',
    title: 'Yanaşı',
    note: 'Obyekt və bağlı qutu — miqyas müqayisəsi.',
    alt: 'Dəmir Yumruq heykəli və bağlı qutu yanaşı',
    blurDataURL:
      'data:image/webp;base64,UklGRsYAAABXRUJQVlA4WAoAAAAQAAAACwAABwAAQUxQSEoAAAARZ6AmAAg2psDeXCIigO/scWKTA6xi21byLIBbDU/y6EAFAtHhcb9xYhEiov8p/itDQoirTYTjffsWhQ+AN4h7wOtFj2NWAuGIBVZQOCBWAAAAcAIAnQEqDAAIAAPAYCUATocQAOT8+q930P/MAAD+6lpFdhAh0K+qR1T/zvz/ZSsuKHXeIywINuuLCTQscx81LU79mGOCYdpEKfROKe2ycPjviuaAAAA=',
    layout: 'feature',
  },
  {
    no: 9,
    src: '/images/optimized/3.avif',
    width: 2000,
    height: 2999,
    view: 'Şaquli',
    title: 'Şaquli qutu',
    note: 'Qapağın timsah dərisi relyefi və pirinç bağlayıcı.',
    alt: 'Şaquli dayanmış təqdimat qutusu və Dəmir Yumruq heykəli',
    blurDataURL:
      'data:image/webp;base64,UklGRtQAAABXRUJQVlA4WAoAAAAQAAAACwAAEQAAQUxQSGIAAAARZ6AmAAg2JsHe/CIigDnoU/YaDWxqa29CZ/7CBFPZIgEHCOgK2PFSHbQx2T4JIKtKiOj/BOD3JE0FoPc9BDQZ3cjV1WR2+pqUW6BIuUCR+SHUdbVH0HfVcHowjLgQAGDgPVZQOCBMAAAAUAMAnQEqDAASAD79aKxOqyYkIjAIAWAfiUAVgAQ6lbTXbDAA/vDCkQTw/oBGTkCeeLNyU0+cGEDdbAn5hYuJOoaIGlBF5sJotqYAAA==',
    layout: 'narrow',
  },
  {
    no: 10,
    src: '/images/optimized/4.avif',
    width: 2000,
    height: 1333,
    view: 'Qutunun içi',
    title: 'Qutunun içi',
    note: 'Atlaz astar, mahud qapaq və qapaqdakı pirinç lövhə.',
    alt: 'Açıq təqdimat qutusunun içi — atlaz astar və pirinç lövhə',
    blurDataURL:
      'data:image/webp;base64,UklGRpgAAABXRUJQVlA4WAoAAAAQAAAACwAABwAAQUxQSDwAAAARR6A0ABI2SyVBcnb/MyICXun4AUSxbWN+g39GAiWIYG8lBxVk/xki+k8wSVNtx9Ab4q3ErZnFxT+JPQBWUDggNgAAANABAJ0BKgwACAADwGAlAE6AG6PfHNDAAP72i0DiEj25koZxYqLzOQmxqjjI+wYSy6Rej4AAAA==',
    layout: 'wide',
  },
  {
    no: 11,
    src: '/images/optimized/5.avif',
    width: 2000,
    height: 1333,
    view: 'Yerində',
    title: 'Yerində',
    note: 'Obyekt astarın içində — göndərişə hazır vəziyyət.',
    alt: 'Dəmir Yumruq heykəli açıq qutunun astarı içində',
    blurDataURL:
      'data:image/webp;base64,UklGRpYAAABXRUJQVlA4WAoAAAAQAAAACwAABwAAQUxQSDgAAAARV6AgAAg05kE3Q0REAB/bYc0XFMW2Ug0NuKmowBCBpUvXNtAGjkm/FSL6H1BMQWbuHv9xrLqbA1ZQOCA4AAAAsAEAnQEqDAAIAAPAYCUAToAboFHUAAD+9pYJn24Y9FbTyYJLuK5+sigT5tqEQEJP4hqXu8mAAAA=',
    layout: 'wide',
  },
  {
    no: 12,
    src: '/images/optimized/6.avif',
    width: 2000,
    height: 2999,
    view: 'Tam dəst',
    title: 'Tam dəst',
    note: 'Obyekt, açıq qutu və astar bir kadrda.',
    alt: 'Dəmir Yumruq heykəli açıq təqdimat qutusunun yanında — tam dəst',
    blurDataURL:
      'data:image/webp;base64,UklGRuYAAABXRUJQVlA4WAoAAAAQAAAACwAAEQAAQUxQSGIAAAARX6C2jSQ1Kl3Idw8pU0QEaNnevmOvAbe1bStRC+/SAR0QuuQ0YplD7oSQQQTjb3Ivz0uI6P8E4K9hKxOwPrUXVr9YWCUxG1gl6TyySvAWdgjFhgMSpx33sKfLcwaEMnPxT1ZQOCBeAAAAkAMAnQEqDAASAD79aKxOqyYkIjAIAWAfiWgAtOgex5pOZs2eYAD+8N+nejMcFU7PmLBYS2D8ozhoAvslqaUbyBouOUkj30kzlV7tNyt44UHNXhBNJ1wl5iwQwEAAAA==',
    layout: 'narrow',
  },
]

/** Plates 01–05: the rotation study that drives the turntable. */
export const rotation = plates.slice(0, 5)

/** Plates 06–12: the presentation photographs, hung as the catalogue. */
export const catalogue = plates.slice(5)

export const aspectOf = (plate: Plate) => `${plate.width} / ${plate.height}`

/** Two-digit catalogue address, e.g. `07`. */
export const plateNo = (plate: Plate) => String(plate.no).padStart(2, '0')
