import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { CATEGORIES } from '@/lib/categories'

interface BreadcrumbsProps {
  category: string
  title: string
}

export default function Breadcrumbs({ category, title }: BreadcrumbsProps) {
  const cat = CATEGORIES.find((c) => c.slug === category)

  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex flex-wrap items-center gap-1 font-accent text-xs text-muted">
        <li>
          <Link href="/" className="hover:text-content transition-colors">
            Home
          </Link>
        </li>
        <li className="flex items-center gap-1">
          <ChevronRight size={12} className="text-border" />
          <Link href={`/${category}`} className="hover:text-content transition-colors">
            {cat?.name || category}
          </Link>
        </li>
        <li className="flex items-center gap-1">
          <ChevronRight size={12} className="text-border" />
          <span className="text-content truncate max-w-[200px] sm:max-w-none" aria-current="page">
            {title}
          </span>
        </li>
      </ol>
    </nav>
  )
}
