import type { EducationLocale } from './education-catalog'
import { getCatalogEntry } from './education-catalog'
import { getEducationArticle } from './education'
import { EDUCATION_SECTION_IMAGES } from './education-images'

export function getEducationCoverImage(slug: string, locale: EducationLocale): string {
  const article = getEducationArticle(slug, locale)
  if (article?.coverImage) return article.coverImage

  const entry = getCatalogEntry(slug)
  if (entry) return EDUCATION_SECTION_IMAGES[entry.section]

  return EDUCATION_SECTION_IMAGES['city-guides']
}
