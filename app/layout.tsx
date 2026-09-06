import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Noto_Serif_Display } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-inter',
  display: 'swap',
})

const notoSerifDisplay = Noto_Serif_Display({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-display',
  display: 'swap',
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? `https://${process.env.NEXT_PUBLIC_SITE_URL.replace(/^https?:\/\//, '')}`
  : process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'http://localhost:3000'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Dəmir Yumruq — Zəfərin və Gücün Simvolu',
    template: '%s · Dəmir Yumruq',
  },
  description:
    'Dəmir Yumruq — güc, birlik və Zəfər yaddaşını simvolizə edən xüsusi fiziki əsər. Məhsulu kəşf edin və sifariş üçün müraciət edin.',
  openGraph: {
    siteName: 'Dəmir Yumruq',
    title: 'DƏMİR YUMRUQ — ZƏFƏRİN SİMVOLU',
    description:
      'Bəzən gücü sözlə ifadə etmək olmur. Bəzən bir simvol hər şeyi deyir.',
    images: [
      {
        url: '/images/fist-on-box.webp',
        width: 2000,
        height: 1333,
        alt: 'Dəmir Yumruq — bürünc yumruq obyekti təqdimat qutusunun üzərində',
      },
    ],
    locale: 'az_AZ',
    type: 'website',
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  colorScheme: 'dark light',
  themeColor: '#171512',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="az"
      className={`bg-background ${inter.variable} ${notoSerifDisplay.variable}`}
    >
      <body className="antialiased font-sans">
        <noscript>
          {/* Scroll-reveal elements start hidden and are uncovered by JS; without
              it the failsafe keyframes must stand down so nothing stays hidden. */}
          <style>{`.dy-reveal,.dy-reveal-scale,.dy-reveal-mask,.dy-reveal-line,.dy-line-inner,.dy-hero-in,.dy-hero-rise,.dy-hero-raise,.dy-hero-cut,.dy-hero-draw{opacity:1!important;transform:none!important;clip-path:none!important;animation:none!important}`}</style>
        </noscript>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
