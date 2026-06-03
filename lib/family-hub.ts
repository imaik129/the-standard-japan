import type { EducationLocale, EducationSectionId } from './education-catalog'
import { EDUCATION_CATALOG, type EducationCatalogEntry } from './education-catalog'

export const FAMILY_HUB_COPY = {
  en: {
    title: 'Family Life in Japan',
    subtitle: 'Childcare, healthcare, moving checklists, and practical guides for parents in Japan',
    eyebrow: 'The Standard Japan · Family',
    shortAnswer:
      'For families in Japan, the highest-leverage planning topics are childcare (daycare vs kindergarten), pediatric care, and moving/admin paperwork. Use these guides to orient yourself quickly, then verify details with your city office and official providers.',
    faqTitle: 'FAQ',
  },
  ja: {
    title: '子育て・家族の日本生活ガイド',
    subtitle: '保育園・幼稚園、小児科、子連れ引っ越しチェックリストなどの実用ガイド',
    eyebrow: 'The Standard Japan · 子育て',
    shortAnswer:
      '日本で子育てをするご家庭が最初に詰まりやすいのは、保育（保育園/幼稚園の違い）、小児科の使い方、そして引っ越し手続きです。本ガイドは全体像の整理を目的とし、最終の条件は自治体・医療機関などの公式情報で確認してください。',
    faqTitle: 'よくある質問',
  },
} as const

export const FAMILY_HUB_START_SLUGS = [
  'moving-to-japan-with-children-checklist',
  'hoikuen-vs-yochien-japan',
  'hoikuen-application-waitlist-japan',
  'pediatric-clinics-japan-guide',
  'ward-registration-families-japan',
  'moving-to-tokyo-with-children',
] as const

const FAMILY_HUB_SECTIONS: EducationSectionId[] = ['moving', 'preschool', 'selection', 'city-guides']

export function getFamilyHubAllEntries(): EducationCatalogEntry[] {
  return EDUCATION_CATALOG.filter((e) => e.published && FAMILY_HUB_SECTIONS.includes(e.section)).sort(
    (a, b) => {
      if (a.featured !== b.featured) return a.featured ? -1 : 1
      return a.slug.localeCompare(b.slug)
    }
  )
}

export function getFamilyHubAllSlugs(): string[] {
  return getFamilyHubAllEntries().map((e) => e.slug)
}

export function getFamilyHubPath(locale: EducationLocale): string {
  return locale === 'ja' ? '/ja/family' : '/family'
}

