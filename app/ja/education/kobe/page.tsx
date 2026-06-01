import { Metadata } from 'next'
import KobeHubPage from '@/components/education/KobeHubPage'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://thestandardjapan.com'

export const metadata: Metadata = {
  title: '神戸・関西 教育ガイド｜インターナショナルスクール・英語プリスクール',
  description:
    '神戸・六甲・芦屋・西宮のインターナショナルスクール、英語プリスクール、高所得家庭の学校選び。AIで調べる保護者向けガイド一覧。',
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
    canonical: `${baseUrl}/ja/education/kobe`,
    languages: {
      en: `${baseUrl}/education/kobe`,
      ja: `${baseUrl}/ja/education/kobe`,
    },
  },
  openGraph: {
    title: '神戸・関西 教育ガイド | The Standard Japan',
    description: '神戸・芦屋・西宮のインターナショナル教育ガイドを一か所に。',
    url: `${baseUrl}/ja/education/kobe`,
    locale: 'ja_JP',
  },
}

export default function JaKobeEducationHubPage() {
  return <KobeHubPage locale="ja" />
}
