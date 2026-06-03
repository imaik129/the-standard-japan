import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getJaArticleBySlug, getAllJaArticles, getRelatedArticles } from '@/lib/mdx'
import { extractFaqFromContent, getFaqSchema } from '@/lib/faq-schema'
import { getAuthorBySlugOrName } from '@/lib/authors'
import ArticleHero from '@/components/article/ArticleHero'
import AuthorProfile from '@/components/article/AuthorProfile'
import ArticleBody from '@/components/article/ArticleBody'
import NewsletterBanner from '@/components/home/NewsletterBanner'
import ReadingProgress from '@/components/article/ReadingProgress'

interface JaArticlePageProps {
  params: { category: string; slug: string }
}

export async function generateStaticParams() {
  const articles = getAllJaArticles()
  return articles.map((a) => ({ category: a.category, slug: a.slug }))
}

export async function generateMetadata({ params }: JaArticlePageProps): Promise<Metadata> {
  const article = getJaArticleBySlug(params.slug)
  if (!article) return {}

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://thestandardjapan.com'
  const author = getAuthorBySlugOrName(article.author)
  const authorName = author ? author.name : article.author

  return {
    title: article.title,
    description: article.excerpt,
    keywords: article.tags,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      publishedTime: article.publishedAt,
      authors: [authorName],
      url: `${baseUrl}/ja/${article.category}/${article.slug}`,
      locale: 'ja_JP',
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
      canonical: `${baseUrl}/ja/${article.category}/${article.slug}`,
      languages: {
        'en': `${baseUrl}/${article.category}/${article.slug}`,
        'ja': `${baseUrl}/ja/${article.category}/${article.slug}`,
      },
    },
  }
}

export default function JaArticlePage({ params }: JaArticlePageProps) {
  const article = getJaArticleBySlug(params.slug)
  if (!article) notFound()

  const author = getAuthorBySlugOrName(article.author)
  const relatedArticles = getRelatedArticles(params.slug, article.category)

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://thestandardjapan.com'
  const articleUrl = `${baseUrl}/ja/${article.category}/${article.slug}`

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    image: article.coverImage,
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    inLanguage: 'ja',
    author: author
      ? { '@type': 'Person', name: author.name, url: `${baseUrl}/author/${author.slug}` }
      : { '@type': 'Organization', name: article.author },
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
      { '@type': 'ListItem', position: 1, name: 'ホーム', item: baseUrl },
      { '@type': 'ListItem', position: 2, name: article.category, item: `${baseUrl}/ja/${article.category}` },
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
        <ArticleHero article={article} />
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <ArticleBody content={article.content} />
          {author && (
            <div className="pt-12">
              <AuthorProfile author={author} />
            </div>
          )}
          {article.tags && article.tags.length > 0 && (
            <div className="pt-12">
              <div className="border-t border-border pt-8 flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <a
                    key={tag}
                    href={`/ja/search?q=${encodeURIComponent(tag)}`}
                    className="font-accent text-[10px] tracking-widest text-muted uppercase border border-border px-3 py-1.5 hover:border-accent hover:text-content transition-colors"
                  >
                    {tag}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
      <NewsletterBanner />
    </>
  )
}
