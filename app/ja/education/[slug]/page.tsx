import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getEducationArticle, getPublishedSlugs } from '@/lib/education'
import EducationArticleLayout from '@/components/education/EducationArticleLayout'

interface PageProps {
  params: { slug: string }
}

export async function generateStaticParams() {
  return getPublishedSlugs('ja').map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const article = getEducationArticle(params.slug, 'ja')
  if (!article) return {}

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://thestandardjapan.com'
  const url = `${baseUrl}/ja/education/${params.slug}`

  return {
    title: article.title,
    description: article.metaDescription,
    keywords: article.tags,
    alternates: {
      canonical: url,
      languages: {
        en: `${baseUrl}/education/${params.slug}`,
        ja: url,
      },
    },
    openGraph: {
      title: article.title,
      description: article.metaDescription,
      type: 'article',
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      url,
      locale: 'ja_JP',
      images: [{ url: article.coverImage, width: 1200, height: 630, alt: article.title }],
    },
  }
}

export default function JaEducationArticlePage({ params }: PageProps) {
  const article = getEducationArticle(params.slug, 'ja')
  if (!article) notFound()

  return <EducationArticleLayout article={article} locale="ja" />
}
