import type { Metadata } from 'next'
import { AboutContent } from '@/components/dy/about-content'

export const metadata: Metadata = {
  title: 'Haqqımızda — Atelye hekayəsi',
  description:
    'Dəmir Yumruq atelyesinin hekayəsi: ilk eskizdən bürünc tökməyə, üç rəng kolleksiyasından bugünkü əl işinə qədər. Bakı, Azərbaycan.',
  openGraph: {
    title: 'Dəmir Yumruq — Haqqımızda',
    description:
      'Gücü sözlə izah etmək olmur. Onu əldə saxlamaq olar. Atelyenin hekayəsi.',
    url: '/about',
  },
}

export default function Page() {
  return <AboutContent />
}
