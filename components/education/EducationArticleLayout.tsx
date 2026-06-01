import Link from 'next/link'
import type { EducationArticle } from '@/lib/education'
import {
  getEducationHubPath,
  getRelatedEducationArticles,
} from '@/lib/education'
import type { EducationLocale } from '@/lib/education-catalog'
import { extractFaqFromContent } from '@/lib/faq-schema'
import { getEducationArticleSchemaGraph } from '@/lib/education-aeo'
import { extractHeadings } from '@/lib/toc'
import ShortAnswerBlock from './ShortAnswerBlock'
import EducationBody from './EducationBody'
import LanguageSwitcher from './LanguageSwitcher'
import EducationRelated from './EducationRelated'
import EducationTableOfContents from './EducationTableOfContents'
import EducationHero from './EducationHero'

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
  const schemaGraph = getEducationArticleSchemaGraph(article, locale, baseUrl, faq)

  const related = getRelatedEducationArticles(article.slug, article.section, locale, 4)
  const shortAnswerLabel = locale === 'ja' ? 'この記事の要点' : 'Short answer'
  const updatedLabel = locale === 'ja' ? '更新日' : 'Last updated'
  const editorialLabel =
    locale === 'ja'
      ? '編集ノート：本ガイドは保護者向けの中立な情報提供を目的としています。各校の入学・料金・プログラムは変更される場合があります。最新情報は各学校の公式サイトでご確認ください。'
      : 'Editorial note: This guide is intended as neutral, parent-focused information. Admissions, fees, and programs change — always confirm details on each school’s official website.'

  const alternateLocale = locale === 'en' ? 'ja' : 'en'
  const alternatePath = `${baseUrl}${locale === 'en' ? '/ja' : ''}/education/${article.slug}`

  const isJa = locale === 'ja'
  const breadcrumbSep = isJa ? '›' : '/'

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
      />

      <article
        lang={locale}
        className={`min-h-screen pt-32 pb-20 ${isJa ? '' : 'bg-edu-background'}`}
      >
        <div className={`mx-auto px-4 sm:px-6 lg:px-8 ${isJa ? 'max-w-4xl' : 'max-w-7xl'}`}>
          <nav
            className={`flex flex-wrap items-center gap-2 text-sm mb-8 ${
              isJa ? 'text-edu-ja-muted' : 'text-edu-muted'
            }`}
            aria-label="Breadcrumb"
          >
            <Link
              href="/"
              className={isJa ? 'hover:text-edu-ja-accent' : 'hover:text-edu-accent transition-colors'}
            >
              {locale === 'ja' ? 'ホーム' : 'Home'}
            </Link>
            <span className="opacity-50">{breadcrumbSep}</span>
            <Link
              href={hubPath}
              className={isJa ? 'hover:text-edu-ja-accent' : 'hover:text-edu-accent transition-colors'}
            >
              {hubLabel}
            </Link>
            <span className="opacity-50">{breadcrumbSep}</span>
            <span className={`line-clamp-1 ${isJa ? 'text-edu-content' : 'text-edu-content'}`}>
              {article.title}
            </span>
          </nav>

          <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
            {isJa ? (
              <span className="inline-flex text-xs font-medium text-edu-ja-accent bg-edu-ja-accent-soft px-3 py-1 rounded-full">
                保護者向け教育ガイド
              </span>
            ) : (
              <p className="font-accent text-[10px] tracking-widest text-edu-accent uppercase">
                Parent education guide
              </p>
            )}
            <LanguageSwitcher slug={article.slug} locale={locale} />
          </div>

          <h1
            className={`font-bold text-edu-content leading-tight mb-5 ${
              isJa ? 'text-2xl md:text-3xl' : 'font-display text-3xl md:text-4xl lg:text-5xl max-w-4xl mb-6'
            }`}
          >
            {article.title}
          </h1>

          <p
            className={`mb-5 ${isJa ? 'text-base text-edu-ja-muted leading-relaxed' : 'font-body text-lg text-edu-muted max-w-3xl mb-6'}`}
          >
            {article.excerpt}
          </p>

          <div
            className={`flex flex-wrap items-center gap-3 text-sm mb-8 ${
              isJa ? 'text-edu-ja-muted' : 'text-edu-muted font-accent tracking-wide mb-10'
            }`}
          >
            <time dateTime={article.updatedAt} className={isJa ? 'bg-white border border-edu-ja-border px-2.5 py-1 rounded-md' : undefined}>
              {updatedLabel}:{' '}
              {new Date(article.updatedAt).toLocaleDateString(locale === 'ja' ? 'ja-JP' : 'en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            {isJa && (
              <span className="bg-white border border-edu-ja-border px-2.5 py-1 rounded-md">
                読了目安 {article.readTime}分
              </span>
            )}
            {!isJa && (
              <>
                <span>·</span>
                <span>
                  {article.readTime} min read
                </span>
              </>
            )}
          </div>

          {article.tags && article.tags.length > 0 && isJa && (
            <div className="flex flex-wrap gap-2 mb-8">
              {article.tags.slice(0, 5).map((tag) => (
                <span
                  key={tag}
                  className="text-xs text-edu-ja-muted bg-edu-ja-accent-soft/60 border border-edu-ja-border px-2.5 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <EducationHero
            src={article.coverImage}
            alt={article.title}
            locale={locale}
            caption={
              isJa
                ? '写真はイメージです。学校・施設の公式情報を優先してください。'
                : undefined
            }
          />

          <div
            className={`grid grid-cols-1 gap-10 ${
              isJa ? 'xl:grid-cols-[1fr_11rem] 2xl:grid-cols-[1fr_13rem]' : 'xl:grid-cols-[1fr_220px] max-w-5xl'
            }`}
          >
            <div>
              <ShortAnswerBlock text={article.shortAnswer} label={shortAnswerLabel} locale={locale} />

              <p
                className={`text-sm italic mb-10 ${
                  isJa
                    ? 'text-edu-ja-muted bg-edu-ja-accent-soft/40 border border-edu-ja-border rounded-lg px-4 py-3 leading-relaxed'
                    : 'font-body text-edu-muted border-l-2 border-edu-border pl-4'
                }`}
              >
                {editorialLabel}
              </p>

              <EducationBody content={article.content} locale={locale} />

              <EducationRelated articles={related} locale={locale} />

              <div
                className={`mt-12 p-6 rounded-lg ${
                  isJa
                    ? 'bg-edu-ja-accent-soft border border-edu-ja-border'
                    : 'bg-edu-surface-muted border border-edu-border'
                }`}
              >
                <p className={`font-bold text-edu-content mb-2 ${isJa ? 'text-lg' : 'font-display text-lg'}`}>
                  {locale === 'ja' ? '他のガイドを探す' : 'Explore more guides'}
                </p>
                <p className={`text-sm mb-4 ${isJa ? 'text-edu-ja-muted leading-relaxed' : 'font-body text-edu-muted'}`}>
                  {locale === 'ja'
                    ? '神戸・関西・日本全国のインターナショナル教育について、関連記事をご覧ください。'
                    : 'Browse related guides on international schools and preschools in Kobe, Kansai, and across Japan.'}
                </p>
                <Link
                  href={hubPath}
                  className={`inline-flex text-sm font-medium ${
                    isJa ? 'text-edu-ja-accent hover:underline' : 'font-accent text-xs tracking-widest uppercase text-edu-accent hover:underline'
                  }`}
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
