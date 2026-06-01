import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getEducationArticle, getPublishedSlugs } from '@/lib/education'
import { getEducationPageMetadataExtras } from '@/lib/education-aeo'
import EducationArticleLayout from '@/components/education/EducationArticleLayout'

interface PageProps {
  params: { slug: string }
}

export async function generateStaticParams() {
  return getPublishedSlugs('en').map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const article = getEducationArticle(params.slug, 'en')
  if (!article) return {}

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://thestandardjapan.com'
  const url = `${baseUrl}/education/${params.slug}`

  const extras = getEducationPageMetadataExtras({
    title: article.title,
    description: article.metaDescription,
    url,
    imageUrl: article.coverImage,
    locale: 'en',
    publishedTime: article.publishedAt,
    modifiedTime: article.updatedAt,
  })

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
    ...extras,
  }
}

export default function EducationArticlePage({ params }: PageProps) {
  const article = getEducationArticle(params.slug, 'en')
  if (!article) notFound()

  return <EducationArticleLayout article={article} locale="en" />
}
