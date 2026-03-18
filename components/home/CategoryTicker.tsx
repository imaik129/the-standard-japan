'use client'

import Link from 'next/link'
import { CATEGORIES } from '@/lib/categories'

export default function CategoryTicker() {
  const items = [...CATEGORIES, ...CATEGORIES]

  return (
    <div className="bg-accent text-white overflow-hidden py-2 border-y border-red-700">
      <div className="ticker-animate flex gap-8 whitespace-nowrap">
        {items.map((item, i) => (
          <Link
            key={`${item.slug}-${i}`}
            href={`/${item.slug}`}
            className="font-accent text-xs tracking-[0.2em] uppercase hover:text-white/90 transition-colors inline-flex items-center"
          >
            {item.name}
            <span className="mx-2 opacity-50">·</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
