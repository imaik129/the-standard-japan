'use client'

import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { ArticleFrontmatter } from '@/lib/mdx'
import ArticleCard from '@/components/article/ArticleCard'

interface CategoryStripProps {
  title: string
  slug: string
  articles: ArticleFrontmatter[]
}

export default function CategoryStrip({ title, slug, articles }: CategoryStripProps) {
  if (articles.length === 0) return null

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 border-b border-border pb-4">
        <div className="flex items-center gap-4">
          <div className="w-0.5 h-5 bg-accent" />
          <h2 className="font-display text-xl font-bold text-content">{title}</h2>
        </div>
        <Link
          href={`/${slug}`}
          className="flex items-center gap-1 font-accent text-xs tracking-widest text-muted uppercase hover:text-content transition-colors"
        >
          More <ChevronRight size={14} />
        </Link>
      </div>

      {/* Horizontal scroll on mobile, grid on desktop - snap scroll for better UX */}
      <div className="flex gap-6 overflow-x-auto pb-4 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:overflow-visible sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0 snap-x snap-mandatory scroll-smooth scrollbar-hide">
        {articles.slice(0, 4).map((article) => (
          <div
            key={article.slug}
            className="min-w-[260px] sm:min-w-0 flex-shrink-0 sm:flex-shrink snap-center"
          >
            <ArticleCard article={article} />
          </div>
        ))}
      </div>
    </section>
  )
}
