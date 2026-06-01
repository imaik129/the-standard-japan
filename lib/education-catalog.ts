export type EducationLocale = 'en' | 'ja'

export type EducationSectionId =
  | 'international-schools'
  | 'preschool'
  | 'city-guides'
  | 'moving'
  | 'selection'

export interface EducationCatalogEntry {
  slug: string
  section: EducationSectionId
  published: boolean
  featured: boolean
  title: { en: string; ja: string }
  excerpt: { en: string; ja: string }
  metaDescription: { en: string; ja: string }
}

export const EDUCATION_SECTIONS: {
  id: EducationSectionId
  title: { en: string; ja: string }
  description: { en: string; ja: string }
}[] = [
  {
    id: 'international-schools',
    title: { en: 'International School Guides', ja: 'インターナショナルスクール' },
    description: {
      en: 'Compare international schools across Japan by city, curriculum, and family needs.',
      ja: '都市・カリキュラム・ご家庭のニーズ別に、日本のインターナショナルスクールを比較。',
    },
  },
  {
    id: 'preschool',
    title: { en: 'Preschool & Early Education', ja: 'プリスクール・幼児教育' },
    description: {
      en: 'English preschools, bilingual programs, and early pathways before international school.',
      ja: '英語プリスクール、バイリンガル教育、インターナショナルスクール進学前の選択肢。',
    },
  },
  {
    id: 'city-guides',
    title: { en: 'City Guides: Tokyo, Kobe, Osaka, Kansai', ja: '都市別ガイド：東京・神戸・大阪・関西' },
    description: {
      en: 'Location-specific guides for families comparing major education hubs in Japan.',
      ja: '東京・神戸・大阪・関西など、主要エリアの教育環境を比較するガイド。',
    },
  },
  {
    id: 'moving',
    title: { en: 'Moving to Japan with Children', ja: '子連れで日本へ・国内移住' },
    description: {
      en: 'Practical guides for relocating families — schools, neighborhoods, and daily life.',
      ja: '引っ越し・転居を考えるご家庭向けの、学校・住むエリア・生活の実用ガイド。',
    },
  },
  {
    id: 'selection',
    title: { en: 'School Selection Tips', ja: '学校選びのポイント' },
    description: {
      en: 'How to compare curricula, languages, costs, and long-term pathways.',
      ja: 'カリキュラム・言語・費用・進路の比較方法。',
    },
  },
]

export const EDUCATION_CATALOG: EducationCatalogEntry[] = [
  {
    slug: 'best-international-schools-japan',
    section: 'international-schools',
    published: false,
    featured: false,
    title: {
      en: "Best International Schools in Japan: A Parent's Guide",
      ja: '日本のおすすめインターナショナルスクール｜保護者向けガイド',
    },
    excerpt: {
      en: 'A national overview of international schools in Tokyo, Kobe, Osaka, Kyoto, and beyond — curricula, costs, and how to compare.',
      ja: '東京・神戸・大阪・京都など、日本全国のインターナショナルスクールを保護者目線で比較。',
    },
    metaDescription: {
      en: 'Best international schools in Japan: compare Tokyo, Kobe, Osaka, Kyoto and more. IB, American, British, and Canadian curricula explained for parents.',
      ja: '日本のインターナショナルスクールおすすめ｜東京・神戸・大阪・京都を比較。IB・米国・英国・カナダ系の選び方。',
    },
  },
  {
    slug: 'best-international-schools-tokyo',
    section: 'international-schools',
    published: false,
    featured: false,
    title: {
      en: "Best International Schools in Tokyo: A Parent's Guide",
      ja: '東京のおすすめインターナショナルスクール｜保護者向けガイド',
    },
    excerpt: {
      en: 'ASIJ, BST, Nishimachi, Seisen, and more — how Tokyo\'s international school market compares for expat and Japanese families.',
      ja: 'ASIJ、BST、西町インターナショナル、清泉など、東京のインターナショナルスクールを比較。',
    },
    metaDescription: {
      en: 'Best international schools in Tokyo for expat and bilingual families. Compare curricula, locations, and pathways — plus moving to Kansai.',
      ja: '東京のインターナショナルスクールおすすめ｜カリキュラム・立地・進路を保護者向けに解説。',
    },
  },
  {
    slug: 'best-international-schools-kobe',
    section: 'international-schools',
    published: true,
    featured: true,
    title: {
      en: "Best International Schools in Kobe: A Parent's Guide",
      ja: '神戸のおすすめインターナショナルスクール｜保護者向けガイド',
    },
    excerpt: {
      en: 'Canadian Academy, Marist Brothers, St. Michael\'s — and preschool options for families in Kobe, Rokko Island, Ashiya, and Nishinomiya.',
      ja: 'Canadian Academy、マリスト、St. Michael\'sなど、神戸・六甲・芦屋・西宮のご家庭向けガイド。',
    },
    metaDescription: {
      en: 'Best international schools in Kobe: Canadian Academy, Marist Brothers, St. Michael\'s. Guide for Rokko Island, Ashiya, and Nishinomiya families.',
      ja: '神戸のインターナショナルスクールおすすめ｜Canadian Academy、マリストなど。六甲・芦屋・西宮の家庭向け。',
    },
  },
  {
    slug: 'best-international-schools-osaka',
    section: 'international-schools',
    published: false,
    featured: false,
    title: {
      en: "Best International Schools in Osaka: A Parent's Guide",
      ja: '大阪のおすすめインターナショナルスクール｜関西エリアで比較',
    },
    excerpt: {
      en: 'Osaka YMCA, OISKG, Senri — and how Kansai families compare Osaka with nearby Kobe options.',
      ja: '大阪YMCA、関西学院OIS、千里など、大阪と神戸の教育選択を比較。',
    },
    metaDescription: {
      en: 'Best international schools in Osaka and Kansai. Compare Osaka schools with Kobe options for bilingual and expat families.',
      ja: '大阪のインターナショナルスクールおすすめ｜関西・神戸との比較も含めて解説。',
    },
  },
  {
    slug: 'best-international-preschools-kobe',
    section: 'preschool',
    published: true,
    featured: true,
    title: {
      en: 'Best International Preschools in Kobe: What Parents Should Know',
      ja: '神戸のおすすめインターナショナルプリスクール｜英語幼児教育の選び方',
    },
    excerpt: {
      en: 'How to choose an English or international preschool in Kobe — environment, location, pathways, and options including Rokko Island.',
      ja: '神戸で英語・インターナショナルプリスクールを選ぶポイント｜環境・立地・進路。',
    },
    metaDescription: {
      en: 'Best international preschools in Kobe and English preschool options. Guide for Rokko Island, Ashiya, Nishinomiya, and Canadian Academy pathways.',
      ja: '神戸のインターナショナルプリスクール・英語プリスクールの選び方｜六甲アイランド・芦屋・西宮。',
    },
  },
  {
    slug: 'best-preschools-kobe',
    section: 'preschool',
    published: false,
    featured: false,
    title: {
      en: 'Best Preschools in Kobe: International, Bilingual, and Local Options',
      ja: '神戸のおすすめプリスクール・幼児教室｜英語・国際教育も含めて比較',
    },
    excerpt: {
      en: 'Compare international preschools, English programs, yochien, and hoikuen — who each option is best for.',
      ja: 'インターナショナル、英語、幼稚園・保育園を含め、神戸の幼児教育を比較。',
    },
    metaDescription: {
      en: 'Best preschools in Kobe: international, English, bilingual, and Japanese options compared for expat and local families.',
      ja: '神戸のプリスクール比較｜英語・国際・バイリンガル・日本の幼児教育。',
    },
  },
  {
    slug: 'preschool-before-canadian-academy',
    section: 'preschool',
    published: true,
    featured: true,
    title: {
      en: 'Preschool Before Canadian Academy: What Parents Should Know',
      ja: 'Canadian Academy進学前のプリスクール選び｜神戸・六甲アイランド',
    },
    excerpt: {
      en: 'Early English exposure, classroom readiness, and preschool options — with clear notes on admissions.',
      ja: '進学前の英語環境・生活習慣・プリスクール選び｜入学保証についても解説。',
    },
    metaDescription: {
      en: 'Preschool before Canadian Academy Kobe: early English, readiness, and Rokko Island options. No guaranteed admission — what parents should know.',
      ja: 'Canadian Academy進学前のプリスクール｜神戸・六甲。入学保証はない — 保護者が知っておくこと。',
    },
  },
  {
    slug: 'moving-to-kobe-international-schools',
    section: 'moving',
    published: false,
    featured: false,
    title: {
      en: 'Moving to Kobe with Children: International School and Preschool Guide',
      ja: '子連れで神戸に引っ越す家庭向けインターナショナル教育ガイド',
    },
    excerpt: {
      en: 'Best family areas, schools, preschools, and commute considerations for relocating to Kobe.',
      ja: '神戸への引っ越し｜子育てエリア・学校・プリスクール・通学のポイント。',
    },
    metaDescription: {
      en: 'Moving to Kobe with children: international schools, preschools, Rokko Island, Ashiya, Nishinomiya, and family neighborhoods.',
      ja: '子連れで神戸へ｜インターナショナルスクール・プリスクール・六甲・芦屋・西宮。',
    },
  },
  {
    slug: 'rokko-island-family-guide',
    section: 'city-guides',
    published: false,
    featured: false,
    title: {
      en: 'Rokko Island Family Guide: Schools, Preschools, and Living',
      ja: '六甲アイランド子育て・教育ガイド｜学校・プリスクール・暮らし',
    },
    excerpt: {
      en: 'Why international families choose Rokko Island — schools, preschools, parks, and daily life.',
      ja: '外国人家庭に人気の六甲アイランド｜学校・プリスクール・暮らし。',
    },
    metaDescription: {
      en: 'Rokko Island family guide: Canadian Academy area, international preschools, living in Kobe for expat families.',
      ja: '六甲アイランド子育てガイド｜Canadian Academy、プリスクール、暮らし。',
    },
  },
  {
    slug: 'international-school-vs-japanese-school',
    section: 'selection',
    published: false,
    featured: false,
    title: {
      en: 'International School vs Japanese School in Japan',
      ja: 'インターナショナルスクールと日本の学校の違い｜保護者向けガイド',
    },
    excerpt: {
      en: 'Language, curriculum, cost, culture, and university pathways — a balanced comparison for parents.',
      ja: '言語・カリキュラム・費用・文化・進路 — 保護者向けに比較。',
    },
    metaDescription: {
      en: 'International school vs Japanese school in Japan: language, cost, curriculum, and identity — for expat and Japanese families.',
      ja: 'インターナショナルスクールと日本の学校の違い｜言語・費用・進路の比較。',
    },
  },
  {
    slug: 'english-preschool-vs-english-conversation-school',
    section: 'preschool',
    published: false,
    featured: false,
    title: {
      en: 'English Preschool vs English Conversation School',
      ja: '英語プリスクールと英会話教室の違い',
    },
    excerpt: {
      en: 'Daily English exposure vs weekly lessons — what matters for young children.',
      ja: '日常の英語環境と週1レッスンの違い｜幼児期に大切なこと。',
    },
    metaDescription: {
      en: 'English preschool vs eikaiwa in Japan: daily immersion, social learning, and what parents should expect.',
      ja: '英語プリスクールと英会話教室の違い｜幼児の英語教育の選び方。',
    },
  },
  {
    slug: 'how-to-choose-international-school-japan',
    section: 'selection',
    published: false,
    featured: false,
    title: {
      en: 'How to Choose an International School in Japan',
      ja: '日本でインターナショナルスクールを選ぶ方法',
    },
    excerpt: {
      en: 'Age, curriculum, commute, language needs, and questions to ask before you apply.',
      ja: '年齢・カリキュラム・通学・言語ニーズ｜申し込み前のチェックリスト。',
    },
    metaDescription: {
      en: 'How to choose an international school in Japan: curriculum, location, cost, and questions for parents.',
      ja: '日本でインターナショナルスクールを選ぶ方法｜カリキュラム・立地・費用の比較。',
    },
  },
]

export function getCatalogEntry(slug: string): EducationCatalogEntry | undefined {
  return EDUCATION_CATALOG.find((e) => e.slug === slug)
}

export function getCatalogBySection(section: EducationSectionId): EducationCatalogEntry[] {
  return EDUCATION_CATALOG.filter((e) => e.section === section)
}
