import { Metadata } from 'next'
import EducationHubPage from '@/components/education/EducationHubPage'
import { EDUCATION_HUB_SHORT_ANSWER } from '@/lib/education-hub-aeo'
import { getEducationPageMetadataExtras } from '@/lib/education-aeo'
import { EDUCATION_HUB_HERO } from '@/lib/education-images'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://thestandardjapan.com'
const hubUrl = `${baseUrl}/ja/education`
const title = '日本のインターナショナル教育ガイド｜学校・プリスクール・子育てエリア'
const description = EDUCATION_HUB_SHORT_ANSWER.ja

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    '日本 インターナショナルスクール おすすめ',
    '神戸 インターナショナルスクール おすすめ',
    '神戸 インターナショナルプリスクール',
    '神戸 英語プリスクール',
    '六甲アイランド プリスクール',
  ],
  alternates: {
    canonical: hubUrl,
    languages: {
      en: `${baseUrl}/education`,
      ja: hubUrl,
    },
  },
  ...getEducationPageMetadataExtras({
    title,
    description,
    url: hubUrl,
    imageUrl: EDUCATION_HUB_HERO.education.ja,
    locale: 'ja',
    ogType: 'website',
  }),
}

export default function JaEducationPage() {
  return <EducationHubPage locale="ja" />
}
