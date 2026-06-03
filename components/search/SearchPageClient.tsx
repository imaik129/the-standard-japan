'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ArticleFrontmatter } from '@/lib/mdx'
import ArticleCard from '@/components/article/ArticleCard'
import type { EducationCatalogEntry, EducationLocale } from '@/lib/education-catalog'
import EducationSearchCard from '@/components/search/EducationSearchCard'

interface SearchPageClientProps {
  articles: ArticleFrontmatter[]
  educationEntries: EducationCatalogEntry[]
  locale?: EducationLocale
  initialQuery: string
}

function normalize(s: string): string {
  return s.toLowerCase().replace(/\s+/g, ' ').trim()
}

function expandQuery(query: string, locale: EducationLocale): string[] {
  const q = normalize(query)
  if (!q) return []

  const tokens = new Set<string>([q])

  // Lightweight synonym expansion for high-intent “family/childcare” queries.
  const add = (...vals: string[]) => vals.forEach((v) => tokens.add(v))

  if (locale === 'ja') {
    if (q.includes('保育園') || q.includes('ほいくえん')) add('こども', '子ども', '育児')
    if (q.includes('幼稚園') || q.includes('ようちえん')) add('こども', '子ども', '育児')
    if (q.includes('小児') || q.includes('病院') || q.includes('クリニック'))
      add('小児科', '救急', '休日', '夜間')
    if (q.includes('引っ越し') || q.includes('移住')) add('子連れ', '転居', '手続き')
  } else {
    if (q.includes('daycare')) add('nursery', 'hoikuen', 'preschool')
    if (q.includes('kindergarten')) add('yochien', 'preschool')
    if (q.includes('pediatric') || q.includes('doctor')) add('clinic', 'hospital', 'vaccines')
    if (q.includes('move') || q.includes('relocate')) add('checklist', 'with kids', 'children')
  }

  return Array.from(tokens)
}

export default function SearchPageClient({
  articles,
  educationEntries,
  locale = 'en',
  initialQuery,
}: SearchPageClientProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(initialQuery)

  useEffect(() => {
    setQuery(searchParams.get('q') || initialQuery)
  }, [searchParams, initialQuery])

  const handleQueryChange = (value: string) => {
    setQuery(value)
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set('q', value)
    } else {
      params.delete('q')
    }
    router.replace(`/search${params.toString() ? `?${params}` : ''}`, { scroll: false })
  }

  const terms = expandQuery(query, locale)

  const articleResults = query.trim()
    ? articles.filter((a) => {
        const hay = normalize(
          [a.title, a.excerpt, a.category, ...(a.tags || [])].filter(Boolean).join(' ')
        )
        return terms.some((t) => hay.includes(t))
      })
    : articles.slice(0, 8)

  const educationResults = query.trim()
    ? educationEntries.filter((e) => {
        const hay = normalize(
          [
            e.title[locale],
            e.excerpt[locale],
            e.metaDescription[locale],
            e.section,
          ]
            .filter(Boolean)
            .join(' ')
        )
        return terms.some((t) => hay.includes(t))
      })
    : educationEntries.slice(0, 8)

  const combinedCount = articleResults.length + educationResults.length

  return (
    <div className="pt-[calc(4rem+4.5rem)] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="font-display text-4xl font-bold text-content mb-8">Search</h1>
        <input
          type="search"
          value={query}
          onChange={(e) => handleQueryChange(e.target.value)}
          placeholder="Search stories by title, topic, or tag..."
          className="w-full max-w-xl bg-surface border border-border px-4 py-3 text-content placeholder:text-muted focus:outline-none focus:border-accent font-body"
        />
        <p className="font-accent text-sm text-muted mt-4">
          {query ? `${combinedCount} result${combinedCount !== 1 ? 's' : ''}` : 'Recent stories and guides'}
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {combinedCount === 0 ? (
          <p className="font-body text-muted">No results found. Try a different search.</p>
        ) : (
          <div className="space-y-16">
            {educationResults.length > 0 && (
              <section>
                <h2 className="font-display text-2xl font-bold text-content mb-6">
                  Education guides
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {educationResults.map((entry) => (
                    <EducationSearchCard key={`edu-${entry.slug}`} entry={entry} locale={locale} />
                  ))}
                </div>
              </section>
            )}

            {articleResults.length > 0 && (
              <section>
                <h2 className="font-display text-2xl font-bold text-content mb-6">Stories</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {articleResults.map((article) => (
                    <ArticleCard key={article.slug} article={article} />
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
