import Link from 'next/link'
import Image from 'next/image'
import type { EducationFrontmatter } from '@/lib/education'
import { getEducationPath } from '@/lib/education'
import type { EducationLocale } from '@/lib/education-catalog'
import { getEducationCoverImage } from '@/lib/education-cover'
import EducationJaSectionTitle from './EducationJaSectionTitle'

interface EducationRelatedProps {
  articles: EducationFrontmatter[]
  locale: EducationLocale
  title?: string
}

export default function EducationRelated({
  articles,
  locale,
  title,
}: EducationRelatedProps) {
  if (articles.length === 0) return null

  const heading = title || (locale === 'ja' ? '関連ガイド' : 'Related guides')

  if (locale === 'ja') {
    return (
      <section className="border-t border-edu-ja-border pt-12 mt-12">
        <EducationJaSectionTitle>{heading}</EducationJaSectionTitle>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {articles.map((article) => (
            <li key={article.slug}>
              <Link
                href={getEducationPath(article.slug, locale)}
                className="group flex gap-4 bg-white border border-edu-ja-border rounded-lg overflow-hidden hover:shadow-md hover:border-edu-ja-accent/30 transition-all"
              >
                <div className="relative w-28 sm:w-32 shrink-0 aspect-square">
                  <Image
                    src={getEducationCoverImage(article.slug, locale)}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="128px"
                  />
                </div>
                <div className="py-3 pr-3 min-w-0">
                  <p className="text-sm font-bold text-edu-content group-hover:text-edu-ja-accent transition-colors line-clamp-2 leading-snug">
                    {article.title}
                  </p>
                  <p className="text-xs text-edu-ja-muted mt-1.5 line-clamp-2 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    )
  }

  return (
    <section className="border-t border-edu-border pt-12 mt-12">
      <h2 className="font-display text-2xl font-bold text-edu-content mb-6">{heading}</h2>
      <ul className="space-y-4">
        {articles.map((article) => (
          <li key={article.slug}>
            <Link
              href={getEducationPath(article.slug, locale)}
              className="group flex gap-4 bg-edu-surface-muted border border-edu-border rounded-lg overflow-hidden hover:border-edu-accent/40 transition-colors"
            >
              <div className="relative w-28 min-h-[100px] shrink-0 hidden sm:block self-stretch">
                <Image
                  src={getEducationCoverImage(article.slug, locale)}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="112px"
                />
              </div>
              <div className="p-5 min-w-0">
                <p className="font-display text-lg font-bold text-edu-content group-hover:text-edu-accent transition-colors">
                  {article.title}
                </p>
                <p className="font-body text-sm text-edu-muted mt-2 line-clamp-2">{article.excerpt}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
