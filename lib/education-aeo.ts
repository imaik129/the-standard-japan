import type { EducationArticle } from './education'
import { getEducationPath, getEducationHubPath } from './education'
import type { EducationLocale } from './education-catalog'
import { getFaqSchema } from './faq-schema'

const SITE_NAME = 'The Standard Japan'
const EDUCATION_ORG_NAME = 'The Standard Japan Education Guide'

/** Strip markdown for schema text fields (AI grounding / FAQ answers). */
export function stripMarkdownForSchema(text: string): string {
  return text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\*\*/g, '')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\s+/g, ' ')
    .trim()
}

function getPublisher(baseUrl: string) {
  return {
    '@type': 'Organization' as const,
    '@id': `${baseUrl}/#organization`,
    name: SITE_NAME,
    url: baseUrl,
    logo: {
      '@type': 'ImageObject' as const,
      url: `${baseUrl}/thestandardlogo.png`,
    },
  }
}

function getEducationWebsiteNode(baseUrl: string, locale: EducationLocale) {
  const hubPath = getEducationHubPath(locale)
  const hubUrl = `${baseUrl}${hubPath}`
  return {
    '@type': 'WebSite' as const,
    '@id': `${hubUrl}#website`,
    name: locale === 'ja' ? `${EDUCATION_ORG_NAME}（日本語）` : EDUCATION_ORG_NAME,
    url: hubUrl,
    inLanguage: locale === 'ja' ? 'ja' : 'en',
    publisher: { '@id': `${baseUrl}/#organization` },
    about: {
      '@type': 'Thing' as const,
      name:
        locale === 'ja'
          ? '日本のインターナショナルスクール・プリスクール'
          : 'International schools and preschools in Japan',
    },
  }
}

/** Article + WebPage + Breadcrumb + FAQ + Speakable — single @graph for AEO. */
export function getEducationArticleSchemaGraph(
  article: EducationArticle,
  locale: EducationLocale,
  baseUrl: string,
  faq: { question: string; answer: string }[]
) {
  const url = `${baseUrl}${getEducationPath(article.slug, locale)}`
  const hubPath = getEducationHubPath(locale)
  const hubLabel = locale === 'ja' ? '教育ガイド' : 'Education'
  const abstract = stripMarkdownForSchema(article.shortAnswer)

  const webPage = {
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: article.title,
    description: article.metaDescription || article.excerpt,
    inLanguage: locale === 'ja' ? 'ja-JP' : 'en-US',
    isPartOf: { '@id': `${baseUrl}${hubPath}#website` },
    datePublished: article.publishedAt,
    dateModified: article.updatedAt || article.publishedAt,
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: article.coverImage,
    },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['#article-short-answer', 'h1'],
    },
  }

  const articleNode = {
    '@type': 'Article',
    '@id': `${url}#article`,
    headline: article.title,
    description: article.metaDescription || article.excerpt,
    abstract,
    image: [article.coverImage],
    datePublished: article.publishedAt,
    dateModified: article.updatedAt || article.publishedAt,
    author: {
      '@type': 'Organization',
      name: EDUCATION_ORG_NAME,
      url: `${baseUrl}${hubPath}`,
    },
    publisher: getPublisher(baseUrl),
    mainEntityOfPage: { '@id': `${url}#webpage` },
    keywords: article.tags?.join(', ') || '',
    articleSection:
      locale === 'ja' ? '日本のインターナショナル教育' : 'Education in Japan',
    inLanguage: locale === 'ja' ? 'ja-JP' : 'en-US',
    wordCount: article.content.split(/\s+/).filter(Boolean).length,
    about: {
      '@type': 'Thing',
      name:
        locale === 'ja'
          ? 'インターナショナルスクール・プリスクール（日本）'
          : 'International education in Japan',
    },
  }

  const breadcrumb = {
    '@type': 'BreadcrumbList',
    '@id': `${url}#breadcrumb`,
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl },
      {
        '@type': 'ListItem',
        position: 2,
        name: hubLabel,
        item: `${baseUrl}${hubPath}`,
      },
      { '@type': 'ListItem', position: 3, name: article.title, item: url },
    ],
  }

  const graph: Record<string, unknown>[] = [
    getPublisher(baseUrl),
    getEducationWebsiteNode(baseUrl, locale),
    webPage,
    articleNode,
    breadcrumb,
  ]

  const faqSchema = getFaqSchema(
    faq.map((f) => ({
      question: f.question,
      answer: stripMarkdownForSchema(f.answer),
    })),
    url
  )
  if (faqSchema) {
    graph.push({ ...faqSchema, '@id': `${url}#faq` })
    ;(webPage as Record<string, unknown>).mainEntity = { '@id': `${url}#faq` }
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  }
}

export function getEducationHubSchemaGraph(options: {
  locale: EducationLocale
  baseUrl: string
  title: string
  description: string
  url: string
  articles: { title: string; url: string; description: string; dateModified?: string }[]
  faq?: { question: string; answer: string }[]
}) {
  const { locale, baseUrl, title, description, url, articles, faq = [] } = options

  const collectionPage = {
    '@type': 'CollectionPage',
    '@id': `${url}#collection`,
    url,
    name: title,
    description,
    inLanguage: locale === 'ja' ? 'ja-JP' : 'en-US',
    isPartOf: { '@id': `${url}#website` },
    dateModified: new Date().toISOString().split('T')[0],
    about: {
      '@type': 'Thing',
      name:
        locale === 'ja'
          ? '日本のインターナショナルスクール・プリスクール'
          : 'International schools and preschools in Japan',
    },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: articles.length,
      itemListElement: articles.map((a, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'Article',
          name: a.title,
          url: a.url,
          description: a.description,
          ...(a.dateModified ? { dateModified: a.dateModified } : {}),
        },
      })),
    },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['#hub-short-answer', 'h1'],
    },
  }

  const graph: Record<string, unknown>[] = [
    getPublisher(baseUrl),
    { ...getEducationWebsiteNode(baseUrl, locale), '@id': `${url}#website`, url },
    collectionPage,
  ]

  const faqSchema = getFaqSchema(
    faq.map((f) => ({
      question: f.question,
      answer: stripMarkdownForSchema(f.answer),
    })),
    url
  )
  if (faqSchema) {
    graph.push({ ...faqSchema, '@id': `${url}#faq` })
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  }
}

/** Shared metadata fields for education pages (SEO + social). */
export function getEducationPageMetadataExtras(options: {
  title: string
  description: string
  url: string
  imageUrl?: string
  locale: EducationLocale
  publishedTime?: string
  modifiedTime?: string
  ogType?: 'website' | 'article'
}) {
  const { title, description, url, imageUrl, locale, publishedTime, modifiedTime, ogType = 'article' } =
    options
  const images = imageUrl ? [{ url: imageUrl, width: 1200, height: 630, alt: title }] : undefined

  return {
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large' as const },
    },
    twitter: {
      card: 'summary_large_image' as const,
      title,
      description,
      images: imageUrl ? [imageUrl] : undefined,
    },
    openGraph: {
      title,
      description,
      url,
      locale: locale === 'ja' ? 'ja_JP' : 'en_US',
      type: ogType,
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
      ...(images ? { images } : {}),
    },
    other: {
      ...(publishedTime ? { 'article:published_time': publishedTime } : {}),
      ...(modifiedTime ? { 'article:modified_time': modifiedTime } : {}),
    },
  }
}
