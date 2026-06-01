import type { EducationArticle } from './education'
import { getEducationPath } from './education'
import type { EducationLocale } from './education-catalog'

export function getEducationArticleSchema(
  article: EducationArticle,
  locale: EducationLocale,
  baseUrl: string
) {
  const url = `${baseUrl}${getEducationPath(article.slug, locale)}`

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.metaDescription || article.excerpt,
    image: article.coverImage,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt || article.publishedAt,
    author: {
      '@type': 'Organization',
      name: 'The Standard Japan Education Guide',
      url: `${baseUrl}${locale === 'ja' ? '/ja/education' : '/education'}`,
    },
    publisher: {
      '@type': 'Organization',
      name: 'The Standard Japan',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/thestandardlogo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    keywords: article.tags?.join(', ') || '',
    url,
    articleSection: 'Education in Japan',
    inLanguage: locale === 'ja' ? 'ja' : 'en',
    wordCount: article.content.split(/\s+/).length,
  }
}

export function getEducationBreadcrumbSchema(
  items: { name: string; url: string }[],
  baseUrl: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${baseUrl}${item.url}`,
    })),
  }
}

/** Example FAQPage schema output — see docs/EDUCATION_SECTION.md */
export const FAQ_SCHEMA_EXAMPLE = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What are the best international schools in Kobe?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Some of the best-known international schools in Kobe include Canadian Academy, Marist Brothers International School, and St. Michael\'s International School. The best choice depends on your child\'s age, curriculum preference, commute, language needs, and long-term education plans.',
      },
    },
  ],
}
