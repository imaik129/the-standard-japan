import type { Metadata } from 'next'
import { Playfair_Display, Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

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
    'The definitive English-language guide to contemporary Japan. Culture, food, fashion, art, nightlife — the real Tokyo, unfiltered.',
  keywords: ['Tokyo', 'Japan', 'culture', 'food', 'fashion', 'travel', 'nightlife', 'art', 'expat'],
  authors: [{ name: 'The Standard Japan' }],
  creator: 'The Standard Japan',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://thestandardjapan.com',
    siteName: 'The Standard Japan',
    title: 'The Standard Japan — Tokyo\'s Underground, Unfiltered.',
    description:
      'The definitive English-language guide to contemporary Japan. Culture, food, fashion, art, nightlife — the real Tokyo, unfiltered.',
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
      'The definitive English-language guide to contemporary Japan.',
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
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'The Standard Japan',
    url: 'https://thestandardjapan.com',
    logo: 'https://thestandardjapan.com/logo.png',
    sameAs: ['https://twitter.com/thestandardjapan', 'https://tiktok.com/@thestandardjapan'],
    description: "Tokyo's Underground, Unfiltered.",
  }

  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} ${spaceGrotesk.variable}`}
    >
      <body className="bg-background text-content antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
