import type { EducationLocale } from './education-catalog'

/** Guides shown prominently at the top of the Tokyo education hub */
export const TOKYO_HUB_START_SLUGS = [
  'best-international-schools-tokyo',
  'tokyo-international-school-admissions-guide',
  'tokyo-international-school-neighborhoods-commute',
  'moving-to-tokyo-with-children',
] as const

/** All guides listed on the Tokyo education hub */
export const TOKYO_HUB_SLUGS = [
  'best-international-schools-tokyo',
  'tokyo-international-school-admissions-guide',
  'tokyo-international-school-neighborhoods-commute',
  'best-international-schools-japan',
  'moving-to-tokyo-with-children',
  'international-school-tuition-japan-2026',
  'international-school-vs-japanese-school',
  'how-to-choose-international-school-japan',
  'international-school-application-checklist-japan',
  'hoikuen-vs-yochien-japan',
  'hoikuen-application-waitlist-japan',
  'pediatric-clinics-japan-guide',
  'pediatric-emergency-after-hours-japan',
  'child-allowance-kodomo-teate-japan',
  'vaccination-schedule-children-japan',
  'ward-registration-families-japan',
  'moving-to-japan-with-children-checklist',
] as const

export type TokyoHubSlug = (typeof TOKYO_HUB_SLUGS)[number]

export const TOKYO_HUB_COPY = {
  en: {
    title: 'Tokyo Education Guide for International Families',
    subtitle: 'International schools, preschools, childcare, and family guides for Tokyo and greater Tokyo',
    hero: 'A practical reference for families comparing international schools, bilingual education, and family services in Tokyo — designed for parents who research carefully before committing.',
    eyebrow: 'The Standard Japan · Tokyo Education',
    startTitle: 'Start here',
    allGuidesTitle: 'All Tokyo & Japan family guides',
    backToEducation: 'All Japan education guides',
    faqTitle: 'FAQ',
  },
  ja: {
    title: '東京 教育ガイド｜インター家族・子連れ移住',
    subtitle: '東京のインターナショナルスクール・保育・子育て・移住手続きガイド',
    hero: '東京でインターナショナルスクール・保育・子育て手続きを比較・検討するご家庭向けに、ガイドをまとめました。見学・公式サイト確認の前の参考情報として活用してください。',
    eyebrow: 'The Standard Japan · 東京・子育て',
    startTitle: 'まず読むガイド',
    allGuidesTitle: '東京・日本のガイド一覧',
    backToEducation: '日本全体の教育ガイドへ',
    faqTitle: 'よくある質問',
  },
} as const

export function getTokyoHubPath(locale: EducationLocale): string {
  return locale === 'ja' ? '/ja/education/tokyo' : '/education/tokyo'
}
