import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getAllArticles } from '@/lib/mdx'

interface TagPageProps {
  params: { tag: string }
}

export async function generateStaticParams() {
  const articles = getAllArticles()
  const tagSet = new Set<string>()
  articles.forEach((a) => a.tags?.forEach((t) => tagSet.add(encodeURIComponent(t.toLowerCase().replace(/\s+/g, '-')))))
  return Array.from(tagSet).map((tag) => ({ tag }))
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const tag = decodeURIComponent(params.tag).replace(/-/g, ' ')
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://thestandardjapan.com'
  return {
    title: `${tag} — Articles`,
    description: `All articles tagged with "${tag}" on The Standard Japan.`,
    alternates: {
      canonical: `${baseUrl}/tags/${params.tag}`,
    },
  }
}

export default function TagPage({ params }: TagPageProps) {
  const tagParam = decodeURIComponent(params.tag).replace(/-/g, ' ').toLowerCase()
  const articles = getAllArticles().filter(
    (a) => a.tags?.some((t) => t.toLowerCase() === tagParam)
  )

  if (articles.length === 0) notFound()

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://thestandardjapan.com'

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl },
      { '@type': 'ListItem', position: 2, name: tagParam, item: `${baseUrl}/tags/${params.tag}` },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="pt-[calc(4rem+4.5rem)] pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-muted mb-8">
            <Link href="/" className="hover:text-accent">Home</Link>
            <span className="opacity-50">/</span>
            <Link href="/search" className="hover:text-accent">Search</Link>
            <span className="opacity-50">/</span>
            <span className="text-content">{tagParam}</span>
          </nav>

          <p className="font-accent text-[10px] tracking-widest text-accent uppercase mb-4">
            Tag
          </p>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-content mb-2">
            {tagParam}
          </h1>
          <p className="text-muted mb-10">
            {articles.length} article{articles.length !== 1 ? 's' : ''}
          </p>

          <div className="space-y-8">
            {articles.map((article) => (
              <article key={article.slug} className="border-b border-border pb-8">
                <p className="font-accent text-[10px] tracking-widest text-accent uppercase mb-2">
                  {article.category}
                </p>
                <h2 className="font-display text-xl font-bold text-content mb-2">
                  <Link
                    href={`/${article.category}/${article.slug}`}
                    className="hover:text-accent transition-colors"
                  >
                    {article.title}
                  </Link>
                </h2>
                <p className="text-muted text-sm leading-relaxed mb-3">{article.excerpt}</p>
                <div className="flex flex-wrap gap-2">
                  {article.tags?.map((t) => (
                    <Link
                      key={t}
                      href={`/tags/${encodeURIComponent(t.toLowerCase().replace(/\s+/g, '-'))}`}
                      className={`font-accent text-[10px] tracking-widest uppercase border px-3 py-1 transition-colors ${
                        t.toLowerCase() === tagParam
                          ? 'border-accent text-accent'
                          : 'border-border text-muted hover:border-accent hover:text-content'
                      }`}
                    >
                      {t}
                    </Link>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
