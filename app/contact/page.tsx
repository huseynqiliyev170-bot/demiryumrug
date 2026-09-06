import type { Metadata } from 'next'
import { ContactContent } from '@/components/dy/contact-content'

export const metadata: Metadata = {
  title: 'Əlaqə — Sifariş və suallar',
  description:
    'Dəmir Yumruq ilə əlaqə: e-poçt, telefon və ya Instagram DM. Hər müraciətə 24 saat ərzində cavab. Sifariş 5–10 iş gününə hazırlanır.',
  openGraph: {
    title: 'Dəmir Yumruq — Əlaqə',
    description:
      'Sifariş, fərdi işləmə və ya sadəcə sual — bir kanal seçin.',
    url: '/contact',
  },
}

export default function Page() {
  return <ContactContent />
}
