import { getAllArticles, getFeaturedArticles, getArticlesByCategory } from '@/lib/mdx'
import Hero from '@/components/home/Hero'
import FeaturedGrid from '@/components/home/FeaturedGrid'
import LatestArticles from '@/components/home/LatestArticles'
import NewsletterBanner from '@/components/home/NewsletterBanner'
import CategoryStrip from '@/components/home/CategoryStrip'
import CategoryTicker from '@/components/home/CategoryTicker'
import PopularGuides from '@/components/home/PopularGuides'

export default function HomePage() {
  const allArticles = getAllArticles()
  const featuredArticles = getFeaturedArticles()
  const heroArticle = featuredArticles[0] || allArticles[0]
  const featuredGrid = allArticles.slice(0, 3)
  const latestArticles = allArticles.slice(3, 9)

  const foodArticles = getArticlesByCategory('food')
  const cultureArticles = getArticlesByCategory('culture')
  const fashionArticles = getArticlesByCategory('fashion')
  const guideArticles = getArticlesByCategory('guide')

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://thestandardjapan.com'
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'The Standard Japan',
    alternateName: 'Japan Guide by The Standard',
    url: baseUrl,
    description: 'The definitive guide to Japan. Culture, food, fashion, art, nightlife — the real Tokyo.',
    inLanguage: 'en-US',
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: `${baseUrl}/search?q={search_term_string}` },
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
      <CategoryTicker />

      {/* Featured Grid */}
      <FeaturedGrid articles={featuredGrid} />

      {/* Popular / Essential Japan Guides */}
      <PopularGuides articles={featuredArticles.length > 0 ? featuredArticles : allArticles.slice(0, 4)} />

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

      {/* Tokyo Guide Strip */}
      {guideArticles.length > 0 && (
        <div className="border-t border-border">
          <CategoryStrip title="Tokyo Guide" slug="guide" articles={guideArticles} />
        </div>
      )}
    </>
  )
}
