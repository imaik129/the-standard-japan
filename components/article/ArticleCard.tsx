import Image from 'next/image'
import Link from 'next/link'
import { Clock } from 'lucide-react'
import { ArticleFrontmatter } from '@/lib/mdx'
import CategoryBadge from '@/components/ui/CategoryBadge'

interface ArticleCardProps {
  article: ArticleFrontmatter
  variant?: 'default' | 'large' | 'horizontal' | 'minimal'
}

export default function ArticleCard({ article, variant = 'default' }: ArticleCardProps) {
  const href = `/${article.category}/${article.slug}`

  if (variant === 'large') {
    return (
      <Link href={href} className="group block relative overflow-hidden aspect-[3/2] md:aspect-[16/9]">
        <Image
          src={article.coverImage}
          alt={article.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 66vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <div className="mb-3">
            <CategoryBadge category={article.category} linked={false} size="md" />
          </div>
          <h2 className="font-display text-2xl md:text-4xl font-bold text-content leading-tight mb-3 group-hover:text-accent transition-colors">
            {article.title}
          </h2>
          <p className="text-gray-300 text-sm md:text-base line-clamp-2 mb-4 max-w-2xl font-body">
            {article.excerpt}
          </p>
          <div className="flex items-center gap-3">
            <span className="font-accent text-xs text-muted">
              {new Date(article.publishedAt).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
            <span className="text-muted">·</span>
            <span className="flex items-center gap-1 font-accent text-xs text-muted">
              <Clock size={12} />
              {article.readTime} min read
            </span>
          </div>
        </div>
      </Link>
    )
  }

  if (variant === 'horizontal') {
    return (
      <Link href={href} className="group flex gap-4">
        <div className="relative w-24 h-24 flex-shrink-0 overflow-hidden">
          <Image
            src={article.coverImage}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="96px"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="mb-1">
            <CategoryBadge category={article.category} linked={false} />
          </div>
          <h3 className="font-display text-sm font-bold text-content leading-tight line-clamp-2 group-hover:text-accent transition-colors">
            {article.title}
          </h3>
          <p className="font-accent text-xs text-muted mt-1">
            {new Date(article.publishedAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
            })}
            {' · '}{article.readTime}m
          </p>
        </div>
      </Link>
    )
  }

  if (variant === 'minimal') {
    return (
      <Link href={href} className="group block border-b border-border py-4">
        <div className="mb-1">
          <CategoryBadge category={article.category} linked={false} />
        </div>
        <h3 className="font-display text-lg font-bold text-content leading-tight group-hover:text-accent transition-colors">
          {article.title}
        </h3>
        <p className="font-body text-sm text-muted mt-1 line-clamp-2">
          {article.excerpt}
        </p>
        <p className="font-accent text-xs text-muted mt-2">
          {new Date(article.publishedAt).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </Link>
    )
  }

  // Default card
  return (
    <Link href={href} className="group block">
      <div className="relative overflow-hidden aspect-[16/10] mb-4">
        <Image
          src={article.coverImage}
          alt={article.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <div>
        <div className="mb-2">
          <CategoryBadge category={article.category} linked={false} />
        </div>
        <h3 className="font-display text-lg font-bold text-content leading-tight line-clamp-2 group-hover:text-accent transition-colors mb-2">
          {article.title}
        </h3>
        <p className="font-body text-sm text-muted line-clamp-2 mb-3">
          {article.excerpt}
        </p>
        <div className="flex items-center gap-2">
          <span className="font-accent text-xs text-muted">
            {new Date(article.publishedAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </span>
          <span className="text-border">·</span>
          <span className="flex items-center gap-1 font-accent text-xs text-muted">
            <Clock size={11} />
            {article.readTime} min
          </span>
        </div>
      </div>
    </Link>
  )
}
