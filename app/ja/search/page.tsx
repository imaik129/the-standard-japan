import { Metadata } from 'next'
import SearchPageClient from '@/components/search/SearchPageClient'
import { EDUCATION_CATALOG } from '@/lib/education-catalog'

export const metadata: Metadata = {
  title: '検索',
  description: 'The Standard Japan のガイドを検索（教育・子育て・移住）。',
}

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams

  // Japanese side: focus on the bilingual education/parenting guides.
  const educationEntries = EDUCATION_CATALOG.filter((e) => e.published)

  return (
    <SearchPageClient
      articles={[]}
      educationEntries={educationEntries}
      locale="ja"
      initialQuery={q || ''}
    />
  )
}

