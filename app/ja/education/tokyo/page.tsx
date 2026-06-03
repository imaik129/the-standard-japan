import { Metadata } from 'next'
import TokyoHubPage from '@/components/education/TokyoHubPage'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://thestandardjapan.com'

export const metadata: Metadata = {
  title: '東京 教育ガイド｜インターナショナルスクール・子育て・保育',
  description:
    '東京でインターナショナルスクール・保育・子育て手続きを比較するご家庭向けのガイド。ASIJ・BST・西町・清泉など主要校と、保育園・転入手続きの実務情報。',
  alternates: {
    canonical: `${baseUrl}/ja/education/tokyo`,
    languages: {
      en: `${baseUrl}/education/tokyo`,
      ja: `${baseUrl}/ja/education/tokyo`,
    },
  },
  openGraph: {
    title: '東京 教育ガイド | The Standard Japan',
    description:
      '東京のインターナショナルスクール・保育・子育て家族向けガイド。',
    url: `${baseUrl}/ja/education/tokyo`,
    locale: 'ja_JP',
    type: 'website',
  },
}

export default function JaTokyoEducationHubPage() {
  return <TokyoHubPage locale="ja" />
}
