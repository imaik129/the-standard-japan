import Link from 'next/link'
import { ArticleFrontmatter } from '@/lib/mdx'
import AnimatedArticleCard from '@/components/article/AnimatedArticleCard'

interface LatestArticlesProps {
  articles: ArticleFrontmatter[]
}

export default function LatestArticles({ articles }: LatestArticlesProps) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 border-b border-border pb-6">
        <div className="flex items-center gap-4">
          <div className="w-1 h-6 bg-accent" />
          <h2 className="font-display text-2xl font-bold text-content">Latest Stories</h2>
        </div>
        <Link
          href="/magazine"
          className="font-accent text-xs tracking-widest text-muted uppercase hover:text-content transition-colors"
        >
          All Stories →
        </Link>
      </div>

      {/* Grid: 3 col on desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
        {articles.map((article, i) => (
          <AnimatedArticleCard
            key={article.slug}
            article={article}
            delay={i * 80}
          />
        ))}
      </div>
    </section>
  )
}
