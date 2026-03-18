import { Metadata } from 'next'
import Link from 'next/link'
import { getAllArticles } from '@/lib/mdx'
import { CATEGORIES } from '@/lib/categories'
import ArticleCard from '@/components/article/ArticleCard'

export const metadata: Metadata = {
  title: 'Japan Guide — Complete Guide to Tokyo, Culture, Food & Travel',
  description: 'The definitive guide to Japan. Everything you need: Tokyo neighborhoods, Japanese culture, best ramen, izakaya etiquette, onsen, fashion, and more. Your go-to resource for Japan.',
  keywords: ['Japan guide', 'Tokyo guide', 'Japan travel', 'Japanese culture', 'Japan food', 'things to do in Japan'],
  openGraph: {
    title: 'Japan Guide — Complete Guide to Tokyo, Culture, Food & Travel',
    description: 'The definitive guide to Japan. Everything you need for Tokyo, culture, food, travel, and more.',
  },
}

export default function JapanHubPage() {
  const articles = getAllArticles()

  const byCategory = CATEGORIES.reduce((acc, cat) => {
    acc[cat.slug] = articles.filter((a) => a.category.toLowerCase() === cat.slug)
    return acc
  }, {} as Record<string, typeof articles>)

  const popularGuides = articles.filter((a) => a.featured)
  const allGuides = articles

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://thestandardjapan.com'

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Japan Guide — Complete Guide to Tokyo, Culture, Food & Travel',
    description: 'The definitive guide to Japan. Everything you need for Tokyo, culture, food, travel, fashion, and more.',
    url: `${baseUrl}/japan`,
    publisher: {
      '@type': 'Organization',
      name: 'The Standard Japan',
      url: baseUrl,
    },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: articles.length,
      itemListElement: articles.slice(0, 20).map((a, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'Article',
          name: a.title,
          url: `${baseUrl}/${a.category}/${a.slug}`,
        },
      })),
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="pt-[calc(4rem+4.5rem)] min-h-screen">
        {/* Hero */}
        <div className="border-b border-border bg-surface/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <p className="font-accent text-[10px] tracking-[0.3em] text-accent uppercase mb-4">
              The Definitive Guide
            </p>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-content leading-tight mb-6">
              Everything Japan
            </h1>
            <p className="font-body text-xl text-muted max-w-2xl leading-relaxed">
              The go-to resource for Japan — Tokyo neighborhoods, Japanese culture, best ramen, izakaya etiquette, onsen, fashion, art, nightlife, and more. No sponsored content. Just the real Japan.
            </p>
          </div>
        </div>

        {/* Popular / Start Here */}
        {popularGuides.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-1 h-8 bg-accent" />
              <h2 className="font-display text-2xl font-bold text-content">Start Here</h2>
            </div>
            <p className="font-body text-muted mb-8 max-w-xl">
              Essential guides for anyone visiting or living in Japan. Start with these.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {popularGuides.slice(0, 6).map((article) => (
                <ArticleCard key={article.slug} article={article} variant="default" />
              ))}
            </div>
          </section>
        )}

        {/* By Category */}
        <div className="border-t border-border bg-surface/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="flex items-center gap-4 mb-12">
              <div className="w-1 h-8 bg-accent" />
              <h2 className="font-display text-2xl font-bold text-content">Browse by Topic</h2>
            </div>

            <div className="space-y-16">
              {CATEGORIES.map((cat) => {
                const categoryArticles = byCategory[cat.slug] || []
                if (categoryArticles.length === 0) return null

                return (
                  <div key={cat.slug}>
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="font-display text-xl font-bold text-content">{cat.name}</h3>
                      <Link
                        href={`/${cat.slug}`}
                        className="font-accent text-xs tracking-widest text-muted uppercase hover:text-accent transition-colors"
                      >
                        View all →
                      </Link>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {categoryArticles.slice(0, 3).map((article) => (
                        <ArticleCard key={article.slug} article={article} />
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* All Guides */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-1 h-8 bg-accent" />
            <h2 className="font-display text-2xl font-bold text-content">All Japan Guides</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {allGuides.map((article) => (
              <ArticleCard key={article.slug} article={article} variant="minimal" />
            ))}
          </div>
        </section>
      </div>
    </>
  )
}
