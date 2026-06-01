import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getEducationArticle, getPublishedSlugs } from '@/lib/education'
import { getCatalogEntry } from '@/lib/education-catalog'
import EducationArticleLayout from '@/components/education/EducationArticleLayout'

interface PageProps {
  params: { slug: string }
}

export async function generateStaticParams() {
  return getPublishedSlugs('en').map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const article = getEducationArticle(params.slug, 'en')
  const catalog = getCatalogEntry(params.slug)
  if (!article) return {}

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://thestandardjapan.com'
  const url = `${baseUrl}/education/${params.slug}`

  return {
    title: article.title,
    description: article.metaDescription,
    keywords: article.tags,
    alternates: {
      canonical: url,
      languages: {
        en: url,
        ja: `${baseUrl}/ja/education/${params.slug}`,
      },
    },
    openGraph: {
      title: article.title,
      description: article.metaDescription,
      type: 'article',
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      url,
      images: [{ url: article.coverImage, width: 1200, height: 630, alt: article.title }],
    },
  }
}

export default function EducationArticlePage({ params }: PageProps) {
  const article = getEducationArticle(params.slug, 'en')
  if (!article) notFound()

  return <EducationArticleLayout article={article} locale="en" />
}
