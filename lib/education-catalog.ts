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
    published: true,
    featured: true,
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
    published: true,
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
    published: true,
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
    published: true,
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
    published: true,
    featured: true,
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
    published: true,
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
    published: true,
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
    published: true,
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
    published: true,
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
  {
    slug: 'kobe-affluent-families-education',
    section: 'city-guides',
    published: true,
    featured: true,
    title: {
      en: 'Education for Affluent Families in Kobe and Kansai: A Practical Guide',
      ja: '神戸・関西の高所得家庭向け教育ガイド｜インターナショナルとバイリンガル',
    },
    excerpt: {
      en: 'How affluent Japanese and international families in Kobe, Ashiya, and Nishinomiya approach international schools, bilingual education, and preschool.',
      ja: '神戸・芦屋・西宮のご家庭がインターナショナルスクール、バイリンガル教育、幼児教育をどう選ぶか。',
    },
    metaDescription: {
      en: 'Kobe affluent families education guide: international schools, bilingual preschool, Ashiya, Nishinomiya, Rokko Island for high-income parents.',
      ja: '神戸 富裕層 教育｜インターナショナルスクール・バイリンガル・芦屋・西宮・六甲。高所得家庭の学校選び。',
    },
  },
  {
    slug: 'ashiya-nishinomiya-international-education',
    section: 'city-guides',
    published: true,
    featured: true,
    title: {
      en: 'International Education in Ashiya and Nishinomiya: Schools and Preschools',
      ja: '芦屋・西宮のインターナショナル教育｜学校・プリスクール・通学',
    },
    excerpt: {
      en: 'Why families in Ashiya and Nishinomiya commute to Kobe international schools — and preschool options worth comparing.',
      ja: '芦屋・西宮から神戸のインターナショナルスクールへ通う家庭のリアルと、幼児期の選択肢。',
    },
    metaDescription: {
      en: 'Ashiya and Nishinomiya international education: schools near Kobe, Canadian Academy commute, English preschool options.',
      ja: '芦屋 西宮 インターナショナルスクール｜神戸通学・英語プリスクール・カナディアンアカデミー。',
    },
  },
  {
    slug: 'bilingual-education-kobe-children',
    section: 'selection',
    published: true,
    featured: false,
    title: {
      en: 'Bilingual Education in Kobe: What Japanese Parents Should Know',
      ja: '神戸でバイリンガル教育を考える親へ｜英語と日本語のバランス',
    },
    excerpt: {
      en: 'Balancing English immersion with Japanese literacy for children in Kobe and Kansai — preschool through elementary decisions.',
      ja: '英語環境と日本語力の両立｜神戸・関西の幼児期からの教育設計。',
    },
    metaDescription: {
      en: 'Bilingual education Kobe: international preschool, Japanese school, and bilingual pathways for children in Kansai.',
      ja: '神戸 バイリンガル教育｜英語プリスクール・日本語・インターナショナルスクールの選び方。',
    },
  },
  {
    slug: 'international-school-tuition-japan-2026',
    section: 'selection',
    published: true,
    featured: true,
    title: {
      en: 'International School Tuition in Japan (2026): What Parents Pay',
      ja: 'インターナショナルスクール学費ガイド2026｜東京・神戸・大阪の目安',
    },
    excerpt: {
      en: 'Realistic tuition ranges for international schools in Tokyo, Kobe, and Osaka — and what is not included in the headline fee.',
      ja: '東京・神戸・大阪の学費目安と、見えない費用（バス・入学金・行事）の確認ポイント。',
    },
    metaDescription: {
      en: 'International school tuition Japan 2026: costs in Tokyo, Kobe, Osaka. Fees, hidden costs, and budgeting for families.',
      ja: 'インターナショナルスクール 学費 2026｜東京・神戸・大阪の費用比較。高所得家庭の予算感。',
    },
  },
  {
    slug: 'returnee-children-schools-kansai',
    section: 'moving',
    published: true,
    featured: false,
    title: {
      en: 'Returnee Children in Kansai: Choosing Schools in Kobe and Osaka',
      ja: '帰国子女の学校選び｜神戸・大阪・関西で保護者が知ること',
    },
    excerpt: {
      en: 'School options for kikokushijo families settling in Kobe, Ashiya, or Osaka — international, Japanese, and hybrid paths.',
      ja: '帰国直後の子どもに合う学校は？神戸・芦屋・西宮・大阪の選択肢を整理。',
    },
    metaDescription: {
      en: 'Returnee children schools Kansai: kikokushijo guide for Kobe, Osaka international and Japanese school options.',
      ja: '帰国子女 神戸 学校｜関西のインターナショナルスクールと日本の学校の選び方。',
    },
  },
  {
    slug: 'english-preschool-kobe-professional-parents',
    section: 'preschool',
    published: true,
    featured: true,
    title: {
      en: 'English Preschool in Kobe for Professional Families: What to Compare',
      ja: '神戸の英語幼児教育｜共働き・高所得家庭が比較するポイント',
    },
    excerpt: {
      en: 'What dual-income and professional families in Kobe prioritize when choosing English or international preschool — before international school.',
      ja: '共働き・医師・経営者層が幼児期の英語教育で見る、安全性・進路・通学の基準。',
    },
    metaDescription: {
      en: 'English preschool Kobe professional families: Rokko Island, international pathways, comparison for busy parents using AI research.',
      ja: '神戸 英語 幼児教育 富裕層｜プリスクール比較・六甲・インターナショナル進学。AIで調べる保護者向け。',
    },
  },
  {
    slug: 'ashiya-nishinomiya-parents-school-guide',
    section: 'city-guides',
    published: true,
    featured: false,
    title: {
      en: 'School Choices for Parents in Ashiya and Nishinomiya: A Neutral Guide',
      ja: '芦屋・西宮のママ・パパ向け学校選び｜インターナショナルと日本の学校',
    },
    excerpt: {
      en: 'What Ashiya and Nishinomiya parents compare when choosing international schools, Japanese private schools, and preschool — without hype.',
      ja: '芦屋・西宮のご家庭が実際に比較する学校・プリスクールの選び方（中立ガイド）。',
    },
    metaDescription: {
      en: 'Ashiya Nishinomiya parents school guide: international school commute to Kobe, preschool, bilingual choices.',
      ja: '芦屋 西宮 ママ 学校選び｜インターナショナルスクール 通学 神戸 プリスクール。',
    },
  },
  {
    slug: 'kobe-professional-families-education',
    section: 'city-guides',
    published: true,
    featured: false,
    title: {
      en: 'Education for Medical and Professional Families in Kobe',
      ja: '医師・専門職家族の神戸・関西教育ガイド｜学校と幼児教育',
    },
    excerpt: {
      en: 'How dual-career medical and professional households in Kansai approach international school, Japanese school, and English preschool decisions.',
      ja: '医師・専門職・共働き家庭が神戸・芦屋・西宮で教育を選ぶときの現実的なポイント。',
    },
    metaDescription: {
      en: 'Kobe medical professional families education: international school, English preschool, Ashiya Nishinomiya for busy parents.',
      ja: '神戸 医師 教育 インターナショナルスクール プリスクール 芦屋 西宮 共働き。',
    },
  },
  {
    slug: 'canadian-academy-school-visit-guide',
    section: 'international-schools',
    published: true,
    featured: false,
    title: {
      en: 'Canadian Academy School Visit: What Parents Should Ask (Kobe)',
      ja: 'Canadian Academy見学ガイド｜神戸・六甲で保護者が確認すること',
    },
    excerpt: {
      en: 'A neutral checklist for open days and tours at Canadian Academy on Rokko Island — questions, documents, and preschool context.',
      ja: 'カナディアンアカデミー見学・説明会で聞くべきこと（中立チェックリスト）。',
    },
    metaDescription: {
      en: 'Canadian Academy school visit guide Kobe: questions for parents, open day tips, preschool pathway context.',
      ja: 'カナディアンアカデミー 見学 準備 神戸 六甲 質問リスト プリスクール。',
    },
  },
  {
    slug: 'international-school-transfer-kobe',
    section: 'moving',
    published: true,
    featured: false,
    title: {
      en: 'Transferring to International School in Kobe: Mid-Year and Admissions',
      ja: '神戸のインターナショナルスクールへ転校・編入｜保護者向けガイド',
    },
    excerpt: {
      en: 'When mid-year transfer to Kobe international schools is possible — English level, timing, and alternatives.',
      ja: '学年途中の編入・転校、英語力、タイミング — 神戸・関西のインターナショナルスクール。',
    },
    metaDescription: {
      en: 'International school transfer Kobe: mid-year admission, Canadian Academy, Marist, English support.',
      ja: 'インターナショナルスクール 転校 神戸 編入 カナディアンアカデミー 英語力。',
    },
  },
  {
    slug: 'canadian-academy-admissions-timeline-kobe',
    section: 'selection',
    published: true,
    featured: false,
    title: {
      en: 'Canadian Academy Admissions Timeline (Kobe): When to Start (2026)',
      ja: 'Canadian Academyの出願タイムライン｜神戸・六甲アイランド（2026）',
    },
    excerpt: {
      en: 'A parent-friendly planning guide: when to contact admissions, tours, documents, and decision points (always verify with CA).',
      ja: '入学担当への問い合わせ時期、見学、必要書類、夫婦の意思決定ポイントを整理（最新は公式確認）。',
    },
    metaDescription: {
      en: 'Canadian Academy admissions timeline Kobe: when to apply, tours, documents, waitlists — parent planning guide.',
      ja: 'カナディアンアカデミー 出願 時期 神戸｜見学・必要書類・タイムラインを保護者向けに整理。',
    },
  },
  {
    slug: 'international-school-application-checklist-japan',
    section: 'selection',
    published: true,
    featured: false,
    title: {
      en: 'International School Application Checklist (Japan) (2026)',
      ja: 'インターナショナルスクール出願チェックリスト｜日本（2026）',
    },
    excerpt: {
      en: 'AEO-first checklist for families: documents, health forms, language support, and questions to ask admissions.',
      ja: '必要書類、健康書類、言語サポート、入学担当に確認する質問をチェックリスト化。',
    },
    metaDescription: {
      en: 'International school application checklist Japan: documents, medical forms, EAL, tours and questions for admissions.',
      ja: 'インターナショナルスクール 出願 チェックリスト 日本｜必要書類・健康書類・質問リスト。',
    },
  },
  {
    slug: 'kobe-school-commute-guide-rokko-ashiya-nishinomiya',
    section: 'city-guides',
    published: true,
    featured: false,
    title: {
      en: 'Kobe School Commute Guide: Rokko Island, Ashiya, Nishinomiya (2026)',
      ja: '神戸の通学ガイド｜六甲アイランド・芦屋・西宮（2026）',
    },
    excerpt: {
      en: 'How parents sanity-check commutes: bus vs train vs car, rush hour tests, and preschool vs elementary reality.',
      ja: 'バス・電車・車、ラッシュ実測、プリスクールと小学校で違う「通学の現実」を整理。',
    },
    metaDescription: {
      en: 'Kobe international school commute: Rokko Island, Ashiya, Nishinomiya. How to test routes before deciding.',
      ja: '神戸 インターナショナルスクール 通学｜六甲アイランド・芦屋・西宮の通学の考え方。',
    },
  },
  {
    slug: 'kobe-english-preschool-fees-hours-checklist',
    section: 'preschool',
    published: true,
    featured: false,
    title: {
      en: 'English Preschool in Kobe: Fees & Hours Checklist (2026)',
      ja: '神戸の英語プリスクール｜費用・保育時間チェックリスト（2026）',
    },
    excerpt: {
      en: 'What parents should request and compare: fee schedules, extended care, bus, sick policy, and trial lessons.',
      ja: '月額以外の費用、延長、送迎、病欠ルール、体験の見方をチェックリスト化。',
    },
    metaDescription: {
      en: 'English preschool Kobe fees and hours: checklist for parents comparing programs and total cost.',
      ja: '神戸 英語プリスクール 費用 保育時間｜総額・延長・送迎のチェックリスト。',
    },
  },
  {
    slug: 'after-school-english-kobe-international-families',
    section: 'selection',
    published: true,
    featured: false,
    title: {
      en: 'After-School English in Kobe: Options for International Families (2026)',
      ja: '神戸のアフタースクール英語｜インター家庭の選び方（2026）',
    },
    excerpt: {
      en: 'How families mix school, after-school programs, tutors, and Japanese literacy — with a practical decision framework.',
      ja: '学校＋アフタースクール＋家庭日本語（または補習）の組み合わせ方を実用的に整理。',
    },
    metaDescription: {
      en: 'After-school English Kobe: programs, tutors, balancing Japanese and English for international school families.',
      ja: '神戸 アフタースクール 英語｜インター家庭の放課後英語と日本語維持の考え方。',
    },
  },
]

export function getCatalogEntry(slug: string): EducationCatalogEntry | undefined {
  return EDUCATION_CATALOG.find((e) => e.slug === slug)
}

export function getCatalogBySection(section: EducationSectionId): EducationCatalogEntry[] {
  return EDUCATION_CATALOG.filter((e) => e.section === section)
}
