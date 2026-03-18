import Image from 'next/image'
import Link from 'next/link'
import { Clock, Calendar } from 'lucide-react'
import { ArticleFrontmatter } from '@/lib/mdx'
import { getAuthorBySlugOrName } from '@/lib/authors'
import CategoryBadge from '@/components/ui/CategoryBadge'
import ShareButtons from '@/components/article/ShareButtons'
import Breadcrumbs from '@/components/article/Breadcrumbs'

interface ArticleHeroProps {
  article: ArticleFrontmatter
}

export default function ArticleHero({ article }: ArticleHeroProps) {
  const author = getAuthorBySlugOrName(article.author)

  return (
    <div className="relative w-full h-[70vh] min-h-[500px] max-h-[800px] overflow-hidden">
      <Image
        src={article.coverImage}
        alt={article.title}
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-black/30" />

      <div className="absolute bottom-0 left-0 right-0 px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-4xl mx-auto">
          <Breadcrumbs category={article.category} title={article.title} />
          <div className="mb-4">
            <CategoryBadge category={article.category} size="md" />
          </div>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-content leading-tight mb-6">
            {article.title}
          </h1>
          <p className="font-body text-lg text-gray-300 mb-6 max-w-2xl leading-relaxed">
            {article.excerpt}
          </p>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4">
              {author ? (
                <Link
                  href={`/author/${author.slug}`}
                  className="flex items-center gap-2 group"
                >
                  <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center group-hover:bg-accent/30 transition-colors">
                    <span className="font-display text-xs font-bold text-accent">
                      {author.name.charAt(0)}
                    </span>
                  </div>
                  <span className="font-accent text-sm font-semibold text-content group-hover:text-accent transition-colors">
                    {author.name}
                  </span>
                </Link>
              ) : (
                <span className="font-accent text-sm font-semibold text-content">
                  {article.author}
                </span>
              )}
              <span className="text-border">·</span>
              <span className="flex items-center gap-1.5 font-accent text-sm text-muted">
                <Calendar size={14} />
                {new Date(article.publishedAt).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
              <span className="text-border">·</span>
              <span className="flex items-center gap-1.5 font-accent text-sm text-muted">
                <Clock size={14} />
                {article.readTime} min read
              </span>
            </div>
            <ShareButtons title={article.title} url={`/${article.category}/${article.slug}`} />
          </div>
          {article.tags && article.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-accent text-[10px] tracking-widest text-muted uppercase border border-border px-2 py-0.5"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
