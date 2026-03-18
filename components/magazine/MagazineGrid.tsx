'use client'

import { useState } from 'react'
import { ArticleFrontmatter } from '@/lib/mdx'
import ArticleCard from '@/components/article/ArticleCard'
import { CATEGORIES } from '@/lib/categories'

interface MagazineGridProps {
  articles: ArticleFrontmatter[]
}

export default function MagazineGrid({ articles }: MagazineGridProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const filteredArticles = activeCategory
    ? articles.filter((a) => a.category.toLowerCase() === activeCategory)
    : articles

  return (
    <div className="pt-[calc(4rem+4.5rem)] min-h-screen">
      {/* Page header */}
      <div className="border-b border-border bg-surface/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <p className="font-accent text-[10px] tracking-[0.3em] text-accent uppercase mb-4">
            The Archive
          </p>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-content mb-4">
            Magazine
          </h1>
          <p className="font-body text-muted text-lg max-w-xl">
            Every story we&apos;ve published. No algorithm. Just journalism.
          </p>
          <p className="font-accent text-xs text-muted mt-4 tracking-wider">
            {articles.length} stories published
          </p>

          {/* Category filter tabs */}
          <div className="flex flex-wrap gap-2 mt-8">
            <button
              onClick={() => setActiveCategory(null)}
              className={`font-accent text-xs tracking-widest uppercase px-4 py-2 border transition-colors ${
                activeCategory === null
                  ? 'bg-accent text-white border-accent'
                  : 'border-border text-muted hover:text-content hover:border-content/50'
              }`}
            >
              All
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => setActiveCategory(cat.slug)}
                className={`font-accent text-xs tracking-widest uppercase px-4 py-2 border transition-colors ${
                  activeCategory === cat.slug
                    ? 'bg-accent text-white border-accent'
                    : 'border-border text-muted hover:text-content hover:border-content/50'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Articles grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {filteredArticles.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-accent text-muted text-sm tracking-wider">
              No stories in this category yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {filteredArticles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
