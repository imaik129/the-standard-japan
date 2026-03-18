import { NextRequest } from 'next/server'
import { getAllArticles } from '@/lib/mdx'

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get('q') || ''
  const articles = getAllArticles()

  if (!query.trim()) {
    return Response.json(articles.slice(0, 5))
  }

  const q = query.toLowerCase()
  const filtered = articles.filter(
    (a) =>
      a.title.toLowerCase().includes(q) ||
      a.excerpt.toLowerCase().includes(q) ||
      a.tags?.some((t) => t.toLowerCase().includes(q)) ||
      a.category.toLowerCase().includes(q)
  )

  return Response.json(filtered.slice(0, 8))
}
