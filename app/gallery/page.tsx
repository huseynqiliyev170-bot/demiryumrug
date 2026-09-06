import type { Metadata } from 'next'
import { GalleryContent } from '@/components/dy/gallery-content'

export const metadata: Metadata = {
  title: 'Qalereya — Obyekt və təqdimat',
  description:
    'Dəmir Yumruq obyektinin kataloqu: müxtəlif rakurslar, səth detalları və təqdimat qutusu. Hər kadrı açıb yaxından baxın.',
  openGraph: {
    title: 'Dəmir Yumruq — Qalereya',
    description:
      'Müxtəlif rakurslar, səth detalları və təqdimat qutusu — tam kataloq.',
    url: '/gallery',
  },
}

export default function Page() {
  return <GalleryContent />
}
