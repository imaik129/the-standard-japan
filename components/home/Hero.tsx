import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { ArticleFrontmatter } from '@/lib/mdx'
import CategoryBadge from '@/components/ui/CategoryBadge'
import ScrollIndicator from '@/components/home/ScrollIndicator'

interface HeroProps {
  article: ArticleFrontmatter
}

export default function Hero({ article }: HeroProps) {
  return (
    <section className="relative w-full h-screen min-h-[600px] max-h-[900px] overflow-hidden">
      <Image
        src={article.coverImage}
        alt={article.title}
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-black/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/50 to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end pb-16 px-4 sm:px-8 lg:px-16">
        <div className="max-w-3xl">
          {/* Category */}
          <div className="mb-4">
            <CategoryBadge category={article.category} size="md" />
          </div>

          {/* Title */}
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-content leading-[1.05] mb-6">
            {article.title}
          </h1>

          {/* Excerpt */}
          <p className="font-body text-lg sm:text-xl text-gray-300 mb-8 max-w-xl leading-relaxed">
            {article.excerpt}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href={`/${article.category}/${article.slug}`}
              className="group flex items-center gap-2 bg-accent text-white font-accent font-semibold text-sm tracking-widest uppercase px-8 py-4 hover:bg-red-700 transition-all"
            >
              Read Story
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/magazine"
              className="group flex items-center gap-2 border border-content/30 text-content font-accent font-semibold text-sm tracking-widest uppercase px-8 py-4 hover:border-content hover:bg-white/5 transition-all"
            >
              All Stories
            </Link>
          </div>

          {/* Issue line */}
          <p className="font-accent text-xs text-muted mt-6 tracking-widest uppercase">
            {new Date(article.publishedAt).toLocaleDateString('en-US', {
              month: 'long',
              year: 'numeric',
            })}
            {' '}· The Standard Japan
          </p>
        </div>
      </div>

      <ScrollIndicator />
    </section>
  )
}
