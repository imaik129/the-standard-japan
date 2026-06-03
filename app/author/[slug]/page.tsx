import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getAuthorBySlug, AUTHORS, getArticlesByAuthor } from '@/lib/authors'
import { getAllArticles } from '@/lib/mdx'
import ArticleCard from '@/components/article/ArticleCard'
import AuthorProfile from '@/components/article/AuthorProfile'

interface AuthorPageProps {
  params: { slug: string }
}

export async function generateStaticParams() {
  return AUTHORS.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: AuthorPageProps): Promise<Metadata> {
  const author = getAuthorBySlug(params.slug)
  if (!author) return {}

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://thestandardjapan.com'

  return {
    title: `${author.name} — ${author.role}`,
    description: `${author.bio} ${author.role} at The Standard Japan. ${author.background}`,
    alternates: {
      canonical: `${baseUrl}/author/${author.slug}`,
    },
    openGraph: {
      title: `${author.name} | The Standard Japan`,
      description: author.bio,
      url: `${baseUrl}/author/${author.slug}`,
      type: 'profile',
    },
  }
}

export default function AuthorPage({ params }: AuthorPageProps) {
  const author = getAuthorBySlug(params.slug)
  if (!author) notFound()

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://thestandardjapan.com'
  const allArticles = getAllArticles()
  const authorArticles = getArticlesByAuthor(params.slug, allArticles)

  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: author.name,
    jobTitle: author.role,
    description: author.bio,
    url: `${baseUrl}/author/${author.slug}`,
    worksFor: {
      '@type': 'Organization',
      name: 'The Standard Japan',
      url: baseUrl,
    },
    knowsAbout: author.expertise,
    ...(author.twitter && { sameAs: [`https://twitter.com/${author.twitter.replace('@', '')}`] }),
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl },
      { '@type': 'ListItem', position: 2, name: 'Authors', item: `${baseUrl}/authors` },
      { '@type': 'ListItem', position: 3, name: author.name, item: `${baseUrl}/author/${author.slug}` },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="pt-[calc(4rem+4.5rem)] min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <AuthorProfile author={author} articleCount={authorArticles.length} />

          {authorArticles.length > 0 && (
            <section className="mt-16">
              <h2 className="font-display text-2xl font-bold text-content mb-8">
                Articles by {author.name}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {authorArticles.map((article) => (
                  <ArticleCard key={article.slug} article={article} variant="horizontal" />
                ))}
              </div>
            </section>
          )}

          <div className="mt-12 pt-8 border-t border-border">
            <Link
              href="/magazine"
              className="font-accent text-xs tracking-widest text-muted uppercase hover:text-content transition-colors"
            >
              ← Back to all stories
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
