import { Metadata } from 'next'
import { getAllArticles } from '@/lib/mdx'
import ArticleCard from '@/components/article/ArticleCard'

export const metadata: Metadata = {
  title: 'Magazine',
  description: 'All stories from The Standard Japan — Tokyo culture, food, fashion, art, and nightlife.',
}

export default function MagazinePage() {
  const articles = getAllArticles()

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
        </div>
      </div>

      {/* Articles grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </div>
    </div>
  )
}
