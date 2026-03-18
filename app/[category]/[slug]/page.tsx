import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getArticleBySlug, getRelatedArticles, getAllArticles } from '@/lib/mdx'
import { extractFaqFromContent, getFaqSchema } from '@/lib/faq-schema'
import ArticleHero from '@/components/article/ArticleHero'
import ArticleBody from '@/components/article/ArticleBody'
import ArticleCard from '@/components/article/ArticleCard'
import NewsletterBanner from '@/components/home/NewsletterBanner'
import ReadingProgress from '@/components/article/ReadingProgress'

interface ArticlePageProps {
  params: { category: string; slug: string }
}

export async function generateStaticParams() {
  const articles = getAllArticles()
  return articles.map((a) => ({ category: a.category, slug: a.slug }))
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const article = getArticleBySlug(params.slug)
  if (!article) return {}

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://thestandardjapan.com'

  return {
    title: article.title,
    description: article.excerpt,
    keywords: article.tags,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      publishedTime: article.publishedAt,
      authors: [article.author],
      url: `${baseUrl}/${article.category}/${article.slug}`,
      images: [
        {
          url: article.coverImage,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      images: [article.coverImage],
    },
    alternates: {
      canonical: `${baseUrl}/${article.category}/${article.slug}`,
    },
  }
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const article = getArticleBySlug(params.slug)
  if (!article) notFound()

  const relatedArticles = getRelatedArticles(params.slug, article.category)

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://thestandardjapan.com'
  const articleUrl = `${baseUrl}/${article.category}/${article.slug}`

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    image: article.coverImage,
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    author: {
      '@type': 'Organization',
      name: article.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'The Standard Japan',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/thestandardlogo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': articleUrl,
    },
    keywords: article.tags?.join(', ') || '',
    url: articleUrl,
    articleSection: article.category,
    wordCount: article.content.split(/\s+/).length,
  }

  const faq = extractFaqFromContent(article.content)
  const faqSchema = getFaqSchema(faq, articleUrl)

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl },
      { '@type': 'ListItem', position: 2, name: article.category, item: `${baseUrl}/${article.category}` },
      { '@type': 'ListItem', position: 3, name: article.title, item: articleUrl },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <ReadingProgress />

      <article className="pt-[calc(4rem+4.5rem)]">
        {/* Hero */}
        <ArticleHero article={article} />

        {/* Body */}
        <ArticleBody content={article.content} />

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="max-w-2xl mx-auto px-4 sm:px-6 pb-12">
            <div className="border-t border-border pt-8 flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <a
                  key={tag}
                  href={`/search?q=${encodeURIComponent(tag)}`}
                  className="font-accent text-[10px] tracking-widest text-muted uppercase border border-border px-3 py-1.5 hover:border-accent hover:text-content transition-colors"
                >
                  {tag}
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Newsletter */}
        <NewsletterBanner />

        {/* Related articles */}
        {relatedArticles.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="flex items-center justify-between mb-8 border-b border-border pb-6">
              <div className="flex items-center gap-4">
                <div className="w-1 h-6 bg-accent" />
                <h2 className="font-display text-2xl font-bold text-content">Related Stories</h2>
              </div>
              <Link
                href={`/${article.category}`}
                className="font-accent text-xs tracking-widest text-muted uppercase hover:text-content transition-colors"
              >
                More →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedArticles.map((related) => (
                <ArticleCard key={related.slug} article={related} />
              ))}
            </div>
          </section>
        )}
      </article>
    </>
  )
}
