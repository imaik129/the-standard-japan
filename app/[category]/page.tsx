import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getArticlesByCategory, CATEGORIES, getAllArticles } from '@/lib/mdx'
import ArticleCard from '@/components/article/ArticleCard'

interface CategoryPageProps {
  params: { category: string }
}

export async function generateStaticParams() {
  return CATEGORIES.map((cat) => ({ category: cat.slug }))
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const cat = CATEGORIES.find((c) => c.slug === params.category)
  if (!cat) return {}

  return {
    title: cat.name,
    description: `${cat.name} stories from The Standard Japan — Tokyo culture, food, fashion, art, and nightlife.`,
    openGraph: {
      title: `${cat.name} | The Standard Japan`,
      description: `${cat.name} stories from The Standard Japan`,
    },
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const cat = CATEGORIES.find((c) => c.slug === params.category)
  if (!cat) notFound()

  const articles = getArticlesByCategory(params.category)

  return (
    <div className="pt-[calc(4rem+4.5rem)] min-h-screen">
      {/* Header */}
      <div className="border-b border-border bg-surface/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <p className="font-accent text-[10px] tracking-[0.3em] text-accent uppercase mb-4">
            Section
          </p>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-content mb-4">
            {cat.name}
          </h1>
          <p className="font-accent text-xs text-muted tracking-wider">
            {articles.length} {articles.length === 1 ? 'story' : 'stories'}
          </p>
        </div>
      </div>

      {/* Articles */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {articles.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-accent text-muted text-sm tracking-wider">
              No stories yet in this section. Check back soon.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {articles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
