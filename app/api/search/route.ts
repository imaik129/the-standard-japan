import { NextRequest } from 'next/server'
import { getAllArticles } from '@/lib/mdx'
import { EDUCATION_CATALOG } from '@/lib/education-catalog'

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get('q') || ''
  const locale = (request.nextUrl.searchParams.get('locale') || 'en') as 'en' | 'ja'
  const articles = getAllArticles()
  const educationEntries = EDUCATION_CATALOG.filter((e) => e.published)

  if (!query.trim()) {
    return Response.json({
      articles: articles.slice(0, 5),
      education: educationEntries.slice(0, 5).map((e) => ({
        slug: e.slug,
        title: e.title[locale],
        excerpt: e.excerpt[locale],
        section: e.section,
        path: locale === 'ja' ? `/ja/education/${e.slug}` : `/education/${e.slug}`,
      })),
    })
  }

  const q = query.toLowerCase()
  const filtered = articles.filter(
    (a) =>
      a.title.toLowerCase().includes(q) ||
      a.excerpt.toLowerCase().includes(q) ||
      a.tags?.some((t) => t.toLowerCase().includes(q)) ||
      a.category.toLowerCase().includes(q)
  )

  const filteredEducation = educationEntries
    .filter((e) => {
      const hay = `${e.title[locale]} ${e.excerpt[locale]} ${e.metaDescription[locale]} ${e.section}`.toLowerCase()
      return hay.includes(q)
    })
    .slice(0, 8)
    .map((e) => ({
      slug: e.slug,
      title: e.title[locale],
      excerpt: e.excerpt[locale],
      section: e.section,
      path: locale === 'ja' ? `/ja/education/${e.slug}` : `/education/${e.slug}`,
    }))

  return Response.json({ articles: filtered.slice(0, 8), education: filteredEducation })
}
