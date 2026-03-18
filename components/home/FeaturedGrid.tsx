import { ArticleFrontmatter } from '@/lib/mdx'
import AnimatedArticleCard from '@/components/article/AnimatedArticleCard'
import Link from 'next/link'

interface FeaturedGridProps {
  articles: ArticleFrontmatter[]
}

export default function FeaturedGrid({ articles }: FeaturedGridProps) {
  const [main, ...rest] = articles

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Section header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-1 h-6 bg-accent" />
          <h2 className="font-display text-2xl font-bold text-content">Featured</h2>
        </div>
        <Link
          href="/magazine"
          className="font-accent text-xs tracking-widest text-muted uppercase hover:text-content transition-colors"
        >
          View All →
        </Link>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Large main card */}
        {main && (
          <div className="lg:col-span-2">
            <AnimatedArticleCard article={main} variant="large" delay={0} />
          </div>
        )}

        {/* Side cards */}
        <div className="flex flex-col gap-6">
          {rest.slice(0, 2).map((article, i) => (
            <AnimatedArticleCard
              key={article.slug}
              article={article}
              variant="default"
              delay={(i + 1) * 100}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
