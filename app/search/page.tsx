import { Metadata } from 'next'
import { getAllArticles } from '@/lib/mdx'
import SearchPageClient from '@/components/search/SearchPageClient'

export const metadata: Metadata = {
  title: 'Search',
  description: 'Search The Standard Japan — Tokyo culture, food, fashion, art, and nightlife.',
}

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams
  const articles = getAllArticles()

  return <SearchPageClient articles={articles} initialQuery={q || ''} />
}
