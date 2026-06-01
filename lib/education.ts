import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { EducationLocale } from './education-catalog'
import { getCatalogEntry } from './education-catalog'

const EDUCATION_DIR = path.join(process.cwd(), 'content/education')

export interface EducationFrontmatter {
  title: string
  slug: string
  locale: EducationLocale
  excerpt: string
  metaDescription: string
  shortAnswer: string
  section: string
  coverImage: string
  author: string
  publishedAt: string
  updatedAt: string
  readTime: number
  featured: boolean
  tags: string[]
}

export interface EducationArticle extends EducationFrontmatter {
  content: string
}

function getLocaleDir(locale: EducationLocale): string {
  return path.join(EDUCATION_DIR, locale)
}

export function getAllEducationArticles(locale: EducationLocale): EducationFrontmatter[] {
  const dir = getLocaleDir(locale)
  if (!fs.existsSync(dir)) return []

  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.mdx'))

  const articles = files.map((filename) => {
    const filePath = path.join(dir, filename)
    const fileContent = fs.readFileSync(filePath, 'utf8')
    const { data } = matter(fileContent)
    return data as EducationFrontmatter
  })

  return articles.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )
}

export function getEducationArticle(
  slug: string,
  locale: EducationLocale
): EducationArticle | null {
  const dir = getLocaleDir(locale)
  const filePath = path.join(dir, `${slug}.mdx`)

  if (!fs.existsSync(filePath)) return null

  const fileContent = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContent)

  if (data.slug !== slug) return null

  return { ...(data as EducationFrontmatter), content }
}

export function getRelatedEducationArticles(
  currentSlug: string,
  section: string,
  locale: EducationLocale,
  limit = 3
): EducationFrontmatter[] {
  return getAllEducationArticles(locale)
    .filter((a) => a.slug !== currentSlug && a.section === section)
    .slice(0, limit)
}

export function getEducationPath(slug: string, locale: EducationLocale): string {
  return locale === 'ja' ? `/ja/education/${slug}` : `/education/${slug}`
}

export function getEducationHubPath(locale: EducationLocale): string {
  return locale === 'ja' ? '/ja/education' : '/education'
}

export function getAlternateLocale(locale: EducationLocale): EducationLocale {
  return locale === 'en' ? 'ja' : 'en'
}

export function articleExists(slug: string, locale: EducationLocale): boolean {
  return getEducationArticle(slug, locale) !== null
}

export function getPublishedSlugs(locale: EducationLocale): string[] {
  return getAllEducationArticles(locale).map((a) => a.slug)
}

export { getCatalogEntry }
