import { getAllArticles, getFeaturedArticles, getArticlesByCategory } from '@/lib/mdx'
import Hero from '@/components/home/Hero'
import FeaturedGrid from '@/components/home/FeaturedGrid'
import LatestArticles from '@/components/home/LatestArticles'
import NewsletterBanner from '@/components/home/NewsletterBanner'
import CategoryStrip from '@/components/home/CategoryStrip'

export default function HomePage() {
  const allArticles = getAllArticles()
  const featuredArticles = getFeaturedArticles()
  const heroArticle = featuredArticles[0] || allArticles[0]
  const featuredGrid = allArticles.slice(0, 3)
  const latestArticles = allArticles.slice(3, 9)

  const foodArticles = getArticlesByCategory('food')
  const cultureArticles = getArticlesByCategory('culture')
  const fashionArticles = getArticlesByCategory('fashion')

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'The Standard Japan',
    url: 'https://thestandardjapan.com',
    description: "Tokyo's Underground, Unfiltered.",
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://thestandardjapan.com/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero — full viewport */}
      <div className="pt-[calc(4rem+4.5rem)]">
        {heroArticle && <Hero article={heroArticle} />}
      </div>

      {/* Ticker */}
      <div className="bg-accent text-white overflow-hidden py-2 border-y border-red-700">
        <div className="ticker-animate flex gap-8 whitespace-nowrap">
          {['Culture', 'Food & Drink', 'Travel', 'Fashion', 'Art & Design', 'Music & Nightlife', 'Living', 'Tokyo Guide',
            'Culture', 'Food & Drink', 'Travel', 'Fashion', 'Art & Design', 'Music & Nightlife', 'Living', 'Tokyo Guide'].map((cat, i) => (
            <span key={i} className="font-accent text-xs tracking-[0.2em] uppercase">
              {cat} <span className="mx-2 opacity-50">·</span>
            </span>
          ))}
        </div>
      </div>

      {/* Featured Grid */}
      <FeaturedGrid articles={featuredGrid} />

      {/* Category strips */}
      <div className="border-y border-border/50 bg-surface/30">
        <CategoryStrip title="Food & Drink" slug="food" articles={foodArticles} />
      </div>

      {/* Newsletter Banner */}
      <NewsletterBanner />

      {/* Culture Strip */}
      {cultureArticles.length > 0 && (
        <CategoryStrip title="Culture" slug="culture" articles={cultureArticles} />
      )}

      {/* Latest */}
      {latestArticles.length > 0 && (
        <div className="border-t border-border">
          <LatestArticles articles={latestArticles} />
        </div>
      )}

      {/* Fashion Strip */}
      {fashionArticles.length > 0 && (
        <div className="border-t border-border bg-surface/20">
          <CategoryStrip title="Fashion" slug="fashion" articles={fashionArticles} />
        </div>
      )}
    </>
  )
}
