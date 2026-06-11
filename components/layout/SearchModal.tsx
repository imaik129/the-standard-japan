'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { X, Search, ArrowRight, Loader2 } from 'lucide-react'

interface ArticleResult {
  slug: string
  title: string
  excerpt: string
  category: string
  tags?: string[]
}

interface EducationResult {
  slug: string
  title: string
  excerpt: string
  section: string
  path: string
}

interface SearchResponse {
  articles: ArticleResult[]
  education: EducationResult[]
}

function isSearchResponse(data: unknown): data is SearchResponse {
  return (
    typeof data === 'object' &&
    data !== null &&
    Array.isArray((data as SearchResponse).articles) &&
    Array.isArray((data as SearchResponse).education)
  )
}

interface SearchModalProps {
  open: boolean
  onClose: () => void
}

export default function SearchModal({ open, onClose }: SearchModalProps) {
  const pathname = usePathname()
  const locale = pathname?.startsWith('/ja') ? 'ja' : 'en'
  const [query, setQuery] = useState('')
  const [articles, setArticles] = useState<ArticleResult[]>([])
  const [education, setEducation] = useState<EducationResult[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (open) {
      setQuery('')
      setArticles([])
      setEducation([])
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    if (!open) return

    const timer = setTimeout(async () => {
      setLoading(true)
      try {
        const res = await fetch(
          `/api/search?q=${encodeURIComponent(query)}&locale=${locale}`
        )
        const data: unknown = await res.json()
        if (isSearchResponse(data)) {
          setArticles(data.articles)
          setEducation(data.education)
        } else {
          setArticles([])
          setEducation([])
        }
      } catch {
        setArticles([])
        setEducation([])
      } finally {
        setLoading(false)
      }
    }, 200)

    return () => clearTimeout(timer)
  }, [open, query, locale])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (open) {
      window.addEventListener('keydown', handleKeyDown)
      return () => window.removeEventListener('keydown', handleKeyDown)
    }
  }, [open, onClose])

  if (!open) return null

  const hasResults = articles.length > 0 || education.length > 0
  const labels = {
    en: {
      placeholder: 'Search stories and guides...',
      empty: 'No results found. Try a different search.',
      hint: 'Start typing to search...',
      stories: 'Magazine',
      guides: 'Education guides',
      viewAll: 'View all stories →',
      viewEducation: 'View education guides →',
    },
    ja: {
      placeholder: '記事・教育ガイドを検索...',
      empty: '該当する結果がありません。別のキーワードをお試しください。',
      hint: 'キーワードを入力してください...',
      stories: 'マガジン',
      guides: '教育ガイド',
      viewAll: 'すべての記事を見る →',
      viewEducation: '教育ガイド一覧へ →',
    },
  }[locale]

  return (
    <div className="fixed inset-0 z-[200]">
      <div
        className="absolute inset-0 bg-black/90 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative max-w-2xl mx-auto mt-[15vh] px-4">
        <div className="bg-surface border border-border shadow-2xl">
          <div className="flex items-center gap-3 p-4 border-b border-border">
            <Search size={20} className="text-muted flex-shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={labels.placeholder}
              autoFocus
              className="flex-1 bg-transparent text-content placeholder:text-muted focus:outline-none font-body text-lg"
            />
            <button
              onClick={onClose}
              className="text-muted hover:text-content transition-colors p-1"
              aria-label="Close search"
            >
              <X size={20} />
            </button>
          </div>

          <div className="max-h-[60vh] overflow-y-auto">
            {loading ? (
              <div className="p-8 flex justify-center">
                <Loader2 size={24} className="animate-spin text-muted" />
              </div>
            ) : !hasResults ? (
              <div className="p-8 text-center text-muted font-accent text-sm">
                {query ? labels.empty : labels.hint}
              </div>
            ) : (
              <div className="divide-y divide-border">
                {articles.length > 0 && (
                  <section>
                    <p className="px-4 pt-4 pb-2 font-accent text-[10px] text-muted uppercase tracking-wider">
                      {labels.stories}
                    </p>
                    <ul>
                      {articles.map((article) => (
                        <li key={`article-${article.slug}`}>
                          <Link
                            href={`/${article.category}/${article.slug}`}
                            onClick={onClose}
                            className="flex items-start gap-4 p-4 hover:bg-surface-elevated transition-colors group"
                          >
                            <div className="flex-1 min-w-0">
                              <span className="font-accent text-[10px] text-accent uppercase tracking-wider">
                                {article.category}
                              </span>
                              <h3 className="font-display font-bold text-content mt-1 group-hover:text-accent transition-colors line-clamp-2">
                                {article.title}
                              </h3>
                              <p className="font-body text-sm text-muted mt-1 line-clamp-1">
                                {article.excerpt}
                              </p>
                            </div>
                            <ArrowRight size={16} className="text-muted group-hover:text-accent flex-shrink-0 mt-2" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                {education.length > 0 && (
                  <section>
                    <p className="px-4 pt-4 pb-2 font-accent text-[10px] text-muted uppercase tracking-wider">
                      {labels.guides}
                    </p>
                    <ul>
                      {education.map((guide) => (
                        <li key={`education-${guide.slug}`}>
                          <Link
                            href={guide.path}
                            onClick={onClose}
                            className="flex items-start gap-4 p-4 hover:bg-surface-elevated transition-colors group"
                          >
                            <div className="flex-1 min-w-0">
                              <span className="font-accent text-[10px] text-accent uppercase tracking-wider">
                                {guide.section.replace(/-/g, ' ')}
                              </span>
                              <h3 className="font-display font-bold text-content mt-1 group-hover:text-accent transition-colors line-clamp-2">
                                {guide.title}
                              </h3>
                              <p className="font-body text-sm text-muted mt-1 line-clamp-1">
                                {guide.excerpt}
                              </p>
                            </div>
                            <ArrowRight size={16} className="text-muted group-hover:text-accent flex-shrink-0 mt-2" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}
              </div>
            )}
          </div>

          <div className="p-3 border-t border-border flex flex-col sm:flex-row sm:justify-center gap-2 sm:gap-6">
            <Link
              href="/magazine"
              onClick={onClose}
              className="text-center font-accent text-xs text-muted hover:text-content transition-colors"
            >
              {labels.viewAll}
            </Link>
            <Link
              href={locale === 'ja' ? '/ja/education' : '/education'}
              onClick={onClose}
              className="text-center font-accent text-xs text-muted hover:text-content transition-colors"
            >
              {labels.viewEducation}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
