import Link from 'next/link'
import { MapPin, Briefcase } from 'lucide-react'
import { Author } from '@/lib/authors'

interface AuthorProfileProps {
  author: Author
  articleCount?: number
  compact?: boolean
}

export default function AuthorProfile({ author, articleCount, compact = false }: AuthorProfileProps) {
  if (compact) {
    return (
      <Link
        href={`/author/${author.slug}`}
        className="inline-flex items-center gap-2 group"
      >
        <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
          <span className="font-display text-sm font-bold text-accent">
            {author.name.charAt(0)}
          </span>
        </div>
        <div>
          <span className="font-accent text-sm font-semibold text-content group-hover:text-accent transition-colors">
            {author.name}
          </span>
          <span className="font-accent text-xs text-muted block">{author.role}</span>
        </div>
      </Link>
    )
  }

  return (
    <div className="border border-border bg-surface/30 p-6">
      <div className="flex flex-col sm:flex-row gap-6">
        <Link href={`/author/${author.slug}`} className="flex-shrink-0">
          <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center hover:bg-accent/30 transition-colors">
            <span className="font-display text-2xl font-bold text-accent">
              {author.name.charAt(0)}
            </span>
          </div>
        </Link>
        <div className="flex-1 min-w-0">
          <Link href={`/author/${author.slug}`}>
            <h3 className="font-display text-lg font-bold text-content hover:text-accent transition-colors">
              {author.name}
            </h3>
          </Link>
          <p className="font-accent text-xs text-accent uppercase tracking-wider mb-2">
            {author.role}
          </p>
          <p className="font-body text-sm text-muted mb-4">{author.bio}</p>
          <div className="space-y-1 text-sm text-muted">
            <p className="flex items-start gap-2">
              <Briefcase size={14} className="flex-shrink-0 mt-0.5" />
              <span>{author.background}</span>
            </p>
            <p className="flex items-start gap-2">
              <MapPin size={14} className="flex-shrink-0 mt-0.5" />
              <span>
                {author.location}
                {author.yearsInJapan && ` · ${author.yearsInJapan} in Japan`}
              </span>
            </p>
            <p className="font-accent text-xs text-muted mt-2">
              Mainly writes about: {author.expertise}
            </p>
          </div>
          {articleCount !== undefined && articleCount > 0 && (
            <Link
              href={`/author/${author.slug}`}
              className="inline-block font-accent text-xs text-accent uppercase tracking-wider mt-4 hover:text-red-400 transition-colors"
            >
              View all {articleCount} article{articleCount !== 1 ? 's' : ''} →
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
