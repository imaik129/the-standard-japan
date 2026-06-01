import { Metadata } from 'next'
import EducationHubPage from '@/components/education/EducationHubPage'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://thestandardjapan.com'

export const metadata: Metadata = {
  title: '日本のインターナショナル教育ガイド｜学校・プリスクール・子育てエリア',
  description:
    '日本でインターナショナルスクール、英語プリスクール、バイリンガル教育、子育てに適したエリアを探しているご家庭のための実用的な教育ガイドです。',
  keywords: [
    '日本 インターナショナルスクール おすすめ',
    '神戸 インターナショナルスクール おすすめ',
    '神戸 インターナショナルプリスクール',
    '神戸 英語プリスクール',
    '六甲アイランド プリスクール',
  ],
  alternates: {
    canonical: `${baseUrl}/ja/education`,
    languages: {
      en: `${baseUrl}/education`,
      ja: `${baseUrl}/ja/education`,
    },
  },
  openGraph: {
    title: '日本のインターナショナル教育ガイド | The Standard Japan',
    description:
      '東京・神戸・大阪・関西のインターナショナルスクールと英語プリスクールを比較する保護者向けガイド。',
    url: `${baseUrl}/ja/education`,
    type: 'website',
    locale: 'ja_JP',
  },
}

export default function JaEducationPage() {
  return <EducationHubPage locale="ja" />
}
