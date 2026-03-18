'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { X, Search, ArrowRight, Loader2 } from 'lucide-react'

interface ArticleResult {
  slug: string
  title: string
  excerpt: string
  category: string
  tags?: string[]
}

interface SearchModalProps {
  open: boolean
  onClose: () => void
}

export default function SearchModal({ open, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<ArticleResult[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (open) {
      setQuery('')
      setResults([])
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
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
        const data = await res.json()
        setResults(data)
      } catch {
        setResults([])
      } finally {
        setLoading(false)
      }
    }, 200)

    return () => clearTimeout(timer)
  }, [open, query])

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

  return (
    <div className="fixed inset-0 z-[200]">
      <div
        className="absolute inset-0 bg-black/90 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative max-w-2xl mx-auto mt-[15vh] px-4">
        <div className="bg-surface border border-border shadow-2xl">
          {/* Search input */}
          <div className="flex items-center gap-3 p-4 border-b border-border">
            <Search size={20} className="text-muted flex-shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search stories..."
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

          {/* Results */}
          <div className="max-h-[60vh] overflow-y-auto">
            {loading ? (
              <div className="p-8 flex justify-center">
                <Loader2 size={24} className="animate-spin text-muted" />
              </div>
            ) : results.length === 0 ? (
              <div className="p-8 text-center text-muted font-accent text-sm">
                {query ? 'No stories found. Try a different search.' : 'Start typing to search...'}
              </div>
            ) : (
              <ul className="divide-y divide-border">
                {results.map((article) => (
                  <li key={article.slug}>
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
            )}
          </div>

          <div className="p-3 border-t border-border">
            <Link
              href="/magazine"
              onClick={onClose}
              className="block text-center font-accent text-xs text-muted hover:text-content transition-colors"
            >
              View all stories →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
