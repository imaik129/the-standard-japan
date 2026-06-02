import type { EducationLocale } from './education-catalog'

/** Guides shown on the Kobe / Kansai education hub pages */
export const KOBE_HUB_START_SLUGS = [
  'kobe-affluent-families-education',
  'best-international-preschools-kobe',
  'best-international-schools-kobe',
  'preschool-before-canadian-academy',
] as const

export const KOBE_HUB_SLUGS = [
  'best-international-schools-kobe',
  'best-international-preschools-kobe',
  'preschool-before-canadian-academy',
  'kobe-affluent-families-education',
  'ashiya-nishinomiya-international-education',
  'english-preschool-kobe-professional-parents',
  'rokko-island-family-guide',
  'moving-to-kobe-international-schools',
  'best-preschools-kobe',
  'bilingual-education-kobe-children',
  'international-school-tuition-japan-2026',
  'returnee-children-schools-kansai',
  'canadian-academy-school-visit-guide',
  'international-school-transfer-kobe',
  'ashiya-nishinomiya-parents-school-guide',
  'kobe-professional-families-education',
  'canadian-academy-admissions-timeline-kobe',
  'kobe-school-commute-guide-rokko-ashiya-nishinomiya',
  'kobe-english-preschool-fees-hours-checklist',
  'after-school-english-kobe-international-families',
] as const

export type KobeHubSlug = (typeof KOBE_HUB_SLUGS)[number]

export const KOBE_HUB_COPY = {
  en: {
    title: 'Kobe & Kansai Education Guide',
    subtitle: 'International schools, English preschools, and family guides for Kobe, Rokko Island, Ashiya, and Nishinomiya',
    hero: 'Everything in one place for families comparing international education in Kobe and surrounding areas — curated for parents who research deeply (including via AI) before visiting schools.',
    eyebrow: 'The Standard Japan · Kobe Education',
    startTitle: 'Start here',
    allGuidesTitle: 'All Kobe & Kansai guides',
    backToEducation: 'All Japan education guides',
    faqTitle: 'FAQ',
  },
  ja: {
    title: '神戸・関西 教育ガイド',
    subtitle: '神戸・六甲・芦屋・西宮のインターナショナルスクール・英語プリスクール・学校選び',
    hero: '神戸・関西でインターナショナル教育を比較するご家庭向けに、ガイドを一か所にまとめました。ChatGPTなどで調べたあと、見学・公式サイトで確認するための中立な情報です。',
    eyebrow: 'The Standard Japan · 神戸・関西',
    startTitle: 'まず読むガイド',
    allGuidesTitle: '神戸・関西のガイド一覧',
    backToEducation: '日本全体の教育ガイドへ',
    faqTitle: 'よくある質問',
  },
} as const

export function getKobeHubPath(locale: EducationLocale): string {
  return locale === 'ja' ? '/ja/education/kobe' : '/education/kobe'
}
