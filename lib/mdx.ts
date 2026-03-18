import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const ARTICLES_DIR = path.join(process.cwd(), 'content/articles')

export interface ArticleFrontmatter {
  title: string
  slug: string
  category: string
  excerpt: string
  coverImage: string
  author: string
  publishedAt: string
  readTime: number
  featured: boolean
  tags: string[]
}

export interface Article extends ArticleFrontmatter {
  content: string
}

export function getAllArticles(): ArticleFrontmatter[] {
  const files = fs.readdirSync(ARTICLES_DIR).filter((f) => f.endsWith('.mdx'))

  const articles = files.map((filename) => {
    const filePath = path.join(ARTICLES_DIR, filename)
    const fileContent = fs.readFileSync(filePath, 'utf8')
    const { data } = matter(fileContent)
    return data as ArticleFrontmatter
  })

  return articles.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )
}

export function getFeaturedArticles(): ArticleFrontmatter[] {
  return getAllArticles().filter((a) => a.featured)
}

export function getArticlesByCategory(category: string): ArticleFrontmatter[] {
  return getAllArticles().filter(
    (a) => a.category.toLowerCase() === category.toLowerCase()
  )
}

export function getArticleBySlug(slug: string): Article | null {
  const files = fs.readdirSync(ARTICLES_DIR).filter((f) => f.endsWith('.mdx'))

  for (const filename of files) {
    const filePath = path.join(ARTICLES_DIR, filename)
    const fileContent = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContent)

    if (data.slug === slug) {
      return { ...(data as ArticleFrontmatter), content }
    }
  }

  return null
}

export function getRelatedArticles(
  currentSlug: string,
  category: string,
  limit = 3
): ArticleFrontmatter[] {
  return getAllArticles()
    .filter((a) => a.slug !== currentSlug && a.category === category)
    .slice(0, limit)
}

export { CATEGORIES } from './categories'
