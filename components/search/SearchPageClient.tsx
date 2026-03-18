'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ArticleFrontmatter } from '@/lib/mdx'
import ArticleCard from '@/components/article/ArticleCard'

interface SearchPageClientProps {
  articles: ArticleFrontmatter[]
  initialQuery: string
}

export default function SearchPageClient({ articles, initialQuery }: SearchPageClientProps) {
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

  const results = query.trim()
    ? articles.filter(
        (a) =>
          a.title.toLowerCase().includes(query.toLowerCase()) ||
          a.excerpt.toLowerCase().includes(query.toLowerCase()) ||
          a.tags?.some((t) => t.toLowerCase().includes(query.toLowerCase())) ||
          a.category.toLowerCase().includes(query.toLowerCase())
      )
    : articles.slice(0, 12)

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
          {query ? `${results.length} result${results.length !== 1 ? 's' : ''}` : 'Recent stories'}
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {results.length === 0 ? (
          <p className="font-body text-muted">No stories found. Try a different search.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {results.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
