import Link from 'next/link'
import Image from 'next/image'
import type { EducationArticle } from '@/lib/education'
import {
  getEducationHubPath,
  getRelatedEducationArticles,
} from '@/lib/education'
import type { EducationLocale } from '@/lib/education-catalog'
import { extractFaqFromContent, getFaqSchema } from '@/lib/faq-schema'
import {
  getEducationArticleSchema,
  getEducationBreadcrumbSchema,
} from '@/lib/education-schema'
import { extractHeadings } from '@/lib/toc'
import ShortAnswerBlock from './ShortAnswerBlock'
import EducationBody from './EducationBody'
import LanguageSwitcher from './LanguageSwitcher'
import EducationRelated from './EducationRelated'
import EducationTableOfContents from './EducationTableOfContents'

interface EducationArticleLayoutProps {
  article: EducationArticle
  locale: EducationLocale
}

export default function EducationArticleLayout({
  article,
  locale,
}: EducationArticleLayoutProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://thestandardjapan.com'
  const articlePath = locale === 'ja' ? `/ja/education/${article.slug}` : `/education/${article.slug}`
  const articleUrl = `${baseUrl}${articlePath}`
  const hubPath = getEducationHubPath(locale)
  const hubLabel = locale === 'ja' ? '教育ガイド' : 'Education'

  const headings = extractHeadings(article.content).filter(
    (h) =>
      !h.text.toLowerCase().includes('table of contents') &&
      !h.text.includes('目次') &&
      !h.text.toLowerCase().includes('faq') &&
      !h.text.includes('よくある質問')
  )

  const faq = extractFaqFromContent(article.content)
  const faqSchema = getFaqSchema(faq, articleUrl)
  const articleSchema = getEducationArticleSchema(article, locale, baseUrl)
  const breadcrumbSchema = getEducationBreadcrumbSchema(
    [
      { name: 'Home', url: '/' },
      { name: hubLabel, url: hubPath },
      { name: article.title, url: articlePath },
    ],
    baseUrl
  )

  const related = getRelatedEducationArticles(article.slug, article.section, locale, 4)
  const shortAnswerLabel = locale === 'ja' ? '要約' : 'Short answer'
  const updatedLabel = locale === 'ja' ? '最終更新' : 'Last updated'
  const editorialLabel =
    locale === 'ja'
      ? '編集ノート：本ガイドは保護者向けの中立な情報提供を目的としています。各校の入学・料金・プログラムは変更される場合があります。最新情報は各学校の公式サイトでご確認ください。'
      : 'Editorial note: This guide is intended as neutral, parent-focused information. Admissions, fees, and programs change — always confirm details on each school’s official website.'

  const alternateLocale = locale === 'en' ? 'ja' : 'en'
  const alternatePath = `${baseUrl}${locale === 'en' ? '/ja' : ''}/education/${article.slug}`

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <article lang={locale} className="bg-edu-background min-h-screen pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex flex-wrap items-center gap-2 text-sm text-edu-muted mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-edu-accent transition-colors">
              {locale === 'ja' ? 'ホーム' : 'Home'}
            </Link>
            <span>/</span>
            <Link href={hubPath} className="hover:text-edu-accent transition-colors">
              {hubLabel}
            </Link>
            <span>/</span>
            <span className="text-edu-content line-clamp-1">{article.title}</span>
          </nav>

          <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
            <p className="font-accent text-[10px] tracking-widest text-edu-accent uppercase">
              {locale === 'ja' ? '保護者向け教育ガイド' : 'Parent education guide'}
            </p>
            <LanguageSwitcher slug={article.slug} locale={locale} />
          </div>

          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-edu-content max-w-4xl leading-tight mb-6">
            {article.title}
          </h1>

          <p className="font-body text-lg text-edu-muted max-w-3xl mb-6">{article.excerpt}</p>

          <div className="flex flex-wrap items-center gap-4 text-sm text-edu-muted font-accent tracking-wide mb-10">
            <time dateTime={article.updatedAt}>
              {updatedLabel}:{' '}
              {new Date(article.updatedAt).toLocaleDateString(locale === 'ja' ? 'ja-JP' : 'en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            <span>·</span>
            <span>
              {article.readTime} {locale === 'ja' ? '分' : 'min read'}
            </span>
          </div>

          <div className="relative w-full aspect-[21/9] max-h-[400px] rounded-lg overflow-hidden mb-12 border border-edu-border">
            <Image
              src={article.coverImage}
              alt=""
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1280px) 100vw, 1280px"
            />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-[1fr_220px] gap-12 max-w-5xl">
            <div>
              <ShortAnswerBlock text={article.shortAnswer} label={shortAnswerLabel} />

              <p className="font-body text-sm text-edu-muted italic border-l-2 border-edu-border pl-4 mb-10">
                {editorialLabel}
              </p>

              <EducationBody content={article.content} />

              <EducationRelated articles={related} locale={locale} />

              <div className="mt-12 p-6 bg-edu-surface-muted border border-edu-border rounded-lg">
                <p className="font-display text-lg font-bold text-edu-content mb-2">
                  {locale === 'ja' ? '他のガイドを探す' : 'Explore more guides'}
                </p>
                <p className="font-body text-sm text-edu-muted mb-4">
                  {locale === 'ja'
                    ? '神戸・関西・日本全国のインターナショナル教育について、関連記事をご覧ください。'
                    : 'Browse related guides on international schools and preschools in Kobe, Kansai, and across Japan.'}
                </p>
                <Link
                  href={hubPath}
                  className="inline-flex font-accent text-xs tracking-widest uppercase text-edu-accent hover:underline"
                >
                  {locale === 'ja' ? '教育ガイド一覧へ →' : 'View all education guides →'}
                </Link>
              </div>
            </div>

            {headings.length >= 3 && (
              <aside className="hidden xl:block">
                <EducationTableOfContents headings={headings} locale={locale} />
              </aside>
            )}
          </div>
        </div>

        <link rel="alternate" hrefLang={alternateLocale} href={alternatePath} />
        <link rel="alternate" hrefLang={locale} href={articleUrl} />
      </article>
    </>
  )
}
