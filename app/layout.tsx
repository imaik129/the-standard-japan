import type { Metadata } from 'next'
import { Playfair_Display, Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import BackToTop from '@/components/layout/BackToTop'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://thestandardjapan.com'),
  title: {
    default: 'The Standard Japan — Tokyo\'s Underground, Unfiltered.',
    template: '%s | The Standard Japan',
  },
  description:
    'The definitive guide to Japan. Culture, food, fashion, art, nightlife — the real Tokyo, unfiltered. Your go-to resource for everything Japan.',
  keywords: ['Japan', 'Japan guide', 'Tokyo', 'Japanese culture', 'Japan food', 'Japan travel', 'Tokyo guide', 'things to do in Japan'],
  authors: [{ name: 'The Standard Japan' }],
  creator: 'The Standard Japan',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://thestandardjapan.com',
    siteName: 'The Standard Japan',
    title: 'The Standard Japan — Tokyo\'s Underground, Unfiltered.',
    description:
      'The definitive guide to Japan. Culture, food, fashion, art, nightlife — the real Tokyo. Your go-to resource for everything Japan.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'The Standard Japan',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Standard Japan — Tokyo\'s Underground, Unfiltered.',
    description:
      'The definitive guide to Japan. Your go-to resource for Tokyo, culture, food, and more.',
    images: ['/og-image.png'],
    creator: '@thestandardjapan',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://thestandardjapan.com'

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'The Standard Japan',
    alternateName: 'Japan Guide by The Standard',
    url: baseUrl,
    logo: `${baseUrl}/thestandardlogo.png`,
    sameAs: [
      'https://twitter.com/thestandardjapan',
      'https://instagram.com/thestandardjapan',
      'https://tiktok.com/@thestandardjapan',
    ],
    description: 'The definitive guide to Japan. Culture, food, fashion, art, nightlife — the real Tokyo, unfiltered.',
    foundingDate: '2024',
    areaServed: { '@type': 'Country', name: 'Japan' },
  }

  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} ${spaceGrotesk.variable}`}
    >
      <head>
        <link rel="icon" href="/thestandardlogo.png" type="image/png" />
        <link rel="alternate" type="application/rss+xml" title="The Standard Japan RSS" href="/feed" />
        {process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION && (
          <meta name="google-site-verification" content={process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION} />
        )}
      </head>
      <body className="bg-background text-content antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-accent focus:text-white focus:px-4 focus:py-2 focus:font-accent focus:text-sm focus:tracking-widest"
        >
          Skip to content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
        <BackToTop />
      </body>
    </html>
  )
}
