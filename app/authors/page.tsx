import { Metadata } from 'next'
import Link from 'next/link'
import { AUTHORS, getArticlesByAuthor } from '@/lib/authors'
import { getAllArticles } from '@/lib/mdx'

export const metadata: Metadata = {
  title: 'Our Writers',
  description: 'Meet the writers behind The Standard Japan. Tokyo locals, expats, and experts who cover culture, food, fashion, and more.',
}

export default function AuthorsPage() {
  const allArticles = getAllArticles()

  return (
    <div className="pt-[calc(4rem+4.5rem)] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <p className="font-accent text-[10px] tracking-[0.3em] text-accent uppercase mb-4">
          The Team
        </p>
        <h1 className="font-display text-5xl md:text-6xl font-bold text-content mb-6">
          Our Writers
        </h1>
        <p className="font-body text-lg text-muted max-w-xl mb-16">
          The people behind The Standard Japan. Tokyo locals, expats, and experts who write with authority because they live it.
        </p>

        <div className="space-y-12">
          {AUTHORS.filter((a) => a.slug !== 'the-standard-japan').map((author) => {
            const articles = getArticlesByAuthor(author.slug, allArticles)
            return (
              <Link
                key={author.slug}
                href={`/author/${author.slug}`}
                className="block border border-border p-6 hover:border-accent/50 transition-colors"
              >
                <div className="flex gap-6">
                  <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                    <span className="font-display text-2xl font-bold text-accent">
                      {author.name.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="font-display text-xl font-bold text-content mb-1">
                      {author.name}
                    </h2>
                    <p className="font-accent text-xs text-accent uppercase tracking-wider mb-2">
                      {author.role}
                    </p>
                    <p className="font-body text-sm text-muted mb-2">{author.bio}</p>
                    <p className="font-accent text-xs text-muted">
                      {articles.length} article{articles.length !== 1 ? 's' : ''} · {author.location}
                      {author.yearsInJapan && ` · ${author.yearsInJapan} in Japan`}
                    </p>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
