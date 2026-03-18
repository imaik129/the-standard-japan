import { Metadata } from 'next'
import { getAllArticles } from '@/lib/mdx'
import MagazineGrid from '@/components/magazine/MagazineGrid'

export const metadata: Metadata = {
  title: 'Magazine',
  description: 'All stories from The Standard Japan — Tokyo culture, food, fashion, art, and nightlife.',
}

export default function MagazinePage() {
  const articles = getAllArticles()

  return <MagazineGrid articles={articles} />
}
