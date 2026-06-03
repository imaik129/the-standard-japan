import type { Metadata } from 'next'
import Link from 'next/link'
import ShortAnswerBlock from '@/components/education/ShortAnswerBlock'
import EducationCard from '@/components/education/EducationCard'
import { getCatalogEntry } from '@/lib/education-catalog'
import { FAMILY_HUB_COPY, FAMILY_HUB_START_SLUGS, getFamilyHubAllEntries } from '@/lib/family-hub'
import { getEducationHubSchemaGraph } from '@/lib/education-aeo'
import { getEducationHubPath } from '@/lib/education'

export const metadata: Metadata = {
  title: '子育て・家族の日本生活ガイド',
  description: '保育園・幼稚園、小児科、子連れ引っ越しの実用ガイド（日本）。',
  alternates: {
    canonical: '/ja/family',
    languages: {
      en: '/family',
    },
  },
}

export default function FamilyHubPageJa() {
  const locale = 'ja' as const
  const copy = FAMILY_HUB_COPY[locale]

  const start = FAMILY_HUB_START_SLUGS.map((slug) => getCatalogEntry(slug)).filter(Boolean)
  const all = getFamilyHubAllEntries()

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://thestandardjapan.com'
  const url = `${baseUrl}/ja/family`

  const schemaArticles = all.map((entry) => ({
    title: entry.title[locale],
    url: `${baseUrl}/ja/education/${entry.slug}`,
    description: entry.excerpt[locale],
  }))

  const schemaGraph = getEducationHubSchemaGraph({
    locale,
    baseUrl,
    url,
    title: copy.title,
    description: copy.shortAnswer,
    articles: schemaArticles,
    faq: [
      {
        question: '子連れで日本に引っ越すとき、何から始める？',
        answer:
          'まずは引っ越しチェックリストで必要手続きを整理し、次に保育（保育園/幼稚園）と小児科の使い方を確認します。最終条件は自治体・医療機関の公式情報で確認してください。',
      },
      {
        question: '保育園の入りやすさは全国で同じ？',
        answer:
          'いいえ。自治体・年齢・時期で大きく異なります。最新情報は必ず自治体の公式案内を確認してください。',
      },
      {
        question: '保育園と幼稚園、どっちを選ぶ？',
        answer:
          '目安として、保育園は長時間保育（共働き）寄り、幼稚園は教育（短時間）寄りです。お子さんの年齢、保護者の就労状況、自治体のルールで最適解が変わります。',
      },
      {
        question: '小児科はどうやって選ぶ？',
        answer:
          '距離・診療時間・休日夜間の導線（救急）を先に確認し、予約方式、言語、持ち物（母子手帳等）をチェックします。自治体の医療機関一覧も役立ちます。',
      },
      {
        question: 'インター校と日本の学校、比較の軸は？',
        answer:
          '言語環境、総費用、通学（現実的な移動時間）、将来の進路が主要な軸です。まずは日々の生活リズムとお子さんの言語ニーズから逆算すると判断しやすいです。',
      },
      {
        question: 'インター校出願前に準備することは？',
        answer:
          '書類（成績・パスポート・健康書類）を早めに揃え、サポートが必要な言語や学習面を整理します。最新の要件は各校の入学担当の案内が最優先です。',
      },
    ],
  })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
      />

      <div className="education-ja pt-[calc(4rem+4.5rem)] min-h-screen">
        <div className="border-b border-edu-ja-border bg-white/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
            <p className="text-[11px] tracking-[0.28em] text-edu-ja-accent uppercase mb-3">
              {copy.eyebrow}
            </p>
            <h1 className="text-3xl md:text-5xl font-bold text-edu-content mb-3">
              {copy.title}
            </h1>
            <p className="text-sm md:text-base text-edu-ja-muted max-w-3xl">{copy.subtitle}</p>

            <div className="max-w-3xl">
              <div id="hub-short-answer">
                <ShortAnswerBlock text={copy.shortAnswer} locale="ja" label="要点" />
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
          <section>
            <div className="flex items-end justify-between gap-6 mb-6">
              <h2 className="edu-ja-section-title text-xl md:text-2xl font-bold text-edu-content">
                まず読むガイド
              </h2>
              <Link href={getEducationHubPath(locale)} className="text-sm text-edu-ja-accent hover:underline">
                教育ガイドへ →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {start.map((entry) => (
                <EducationCard key={entry!.slug} entry={entry!} locale={locale} />
              ))}
            </div>
          </section>

          <section>
            <h2 className="edu-ja-section-title text-xl md:text-2xl font-bold text-edu-content mb-6">
              すべての子育てガイド
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {all.map((entry) => (
                <EducationCard key={entry.slug} entry={entry} locale={locale} />
              ))}
            </div>
          </section>

          <section className="max-w-3xl">
            <h2 className="edu-ja-section-title text-xl md:text-2xl font-bold text-edu-content mb-6">
              {copy.faqTitle}
            </h2>
            <div className="space-y-4">
              <div className="bg-white border border-edu-ja-border rounded-lg p-5 shadow-sm">
                <p className="font-bold text-edu-content mb-2">何から始める？</p>
                <p className="text-sm text-edu-ja-muted leading-relaxed">
                  まずは手続きと生活設計（住居・通勤・保育）を整理し、次に保育園/幼稚園と小児科を確認します。
                  条件は自治体・医療機関の公式情報が最優先です。
                </p>
              </div>
              <div className="bg-white border border-edu-ja-border rounded-lg p-5 shadow-sm">
                <p className="font-bold text-edu-content mb-2">AIの回答はそのまま使える？</p>
                <p className="text-sm text-edu-ja-muted leading-relaxed">
                  方向性の参考にはなりますが、自治体で制度が異なり変更もあります。必ず最新の公式案内で確認してください。
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}

