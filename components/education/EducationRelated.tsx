import Link from 'next/link'
import type { EducationFrontmatter } from '@/lib/education'
import { getEducationPath } from '@/lib/education'
import type { EducationLocale } from '@/lib/education-catalog'

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

  const heading =
    title || (locale === 'ja' ? '関連ガイド' : 'Related guides')

  return (
    <section className="border-t border-edu-border pt-12 mt-12">
      <h2 className="font-display text-2xl font-bold text-edu-content mb-6">{heading}</h2>
      <ul className="space-y-4">
        {articles.map((article) => (
          <li key={article.slug}>
            <Link
              href={getEducationPath(article.slug, locale)}
              className="group block bg-edu-surface-muted border border-edu-border rounded-lg p-5 hover:border-edu-accent/40 transition-colors"
            >
              <p className="font-display text-lg font-bold text-edu-content group-hover:text-edu-accent transition-colors">
                {article.title}
              </p>
              <p className="font-body text-sm text-edu-muted mt-2 line-clamp-2">{article.excerpt}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
