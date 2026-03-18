import Link from 'next/link'
import { ArticleFrontmatter } from '@/lib/mdx'
import ArticleCard from '@/components/article/ArticleCard'

interface PopularGuidesProps {
  articles: ArticleFrontmatter[]
}

export default function PopularGuides({ articles }: PopularGuidesProps) {
  if (articles.length === 0) return null

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-border">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-1 h-6 bg-accent" />
          <h2 className="font-display text-2xl font-bold text-content">Essential Japan Guides</h2>
        </div>
        <Link
          href="/japan"
          className="font-accent text-xs tracking-widest text-muted uppercase hover:text-content transition-colors"
        >
          Explore All →
        </Link>
      </div>
      <p className="font-body text-muted mb-8 max-w-xl">
        Start here for the best ramen, izakaya etiquette, onsen rules, and more. Your go-to resource for Japan.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {articles.slice(0, 4).map((article) => (
          <ArticleCard key={article.slug} article={article} variant="default" />
        ))}
      </div>
    </section>
  )
}
