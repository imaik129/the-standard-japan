import { Metadata } from 'next'
import KobeHubPage from '@/components/education/KobeHubPage'
import { KOBE_HUB_SHORT_ANSWER } from '@/lib/education-hub-aeo'
import { getEducationPageMetadataExtras } from '@/lib/education-aeo'
import { EDUCATION_HUB_HERO } from '@/lib/education-images'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://thestandardjapan.com'
const hubUrl = `${baseUrl}/ja/education/kobe`
const title = '神戸・関西 教育ガイド｜インターナショナルスクール・英語プリスクール'
const description = KOBE_HUB_SHORT_ANSWER.ja

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    '神戸 インターナショナルスクール',
    '神戸 英語プリスクール',
    '芦屋 インターナショナルスクール',
    '西宮 インターナショナルスクール',
    '六甲アイランド 教育',
    '神戸 富裕層 教育',
    'カナディアンアカデミー',
  ],
  alternates: {
    canonical: hubUrl,
    languages: {
      en: `${baseUrl}/education/kobe`,
      ja: hubUrl,
    },
  },
  ...getEducationPageMetadataExtras({
    title,
    description,
    url: hubUrl,
    imageUrl: EDUCATION_HUB_HERO.kobe.ja,
    locale: 'ja',
    ogType: 'website',
  }),
}

export default function JaKobeEducationHubPage() {
  return <KobeHubPage locale="ja" />
}
