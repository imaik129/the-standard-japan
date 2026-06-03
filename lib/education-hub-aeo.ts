import type { EducationLocale } from './education-catalog'

/** Hub-level direct answers for AEO / llms.txt (inverted pyramid, fact-dense). */
export const EDUCATION_HUB_SHORT_ANSWER: Record<EducationLocale, string> = {
  en: 'International schools in Japan are concentrated in Tokyo, Yokohama, Kobe, Osaka, and Kyoto. The best school depends on your child’s age, curriculum (IB, American, British, Canadian), commute, Japanese language needs, and budget — not a single national ranking. Kobe families often compare Canadian Academy on Rokko Island, Marist Brothers, and St. Michael’s, plus English preschool options before applying.',
  ja: '日本のインターナショナルスクールは東京・横浜・神戸・大阪・京都などにあります。最適校はお子さまの年齢、カリキュラム（IB・米国・英国・カナダ系）、通学、日本語プログラム、学費によって異なります。神戸・芦屋・西宮のご家庭は、Canadian Academy（六甲アイランド）、Marist Brothers、St. Michael\'s などと、英語プリスクールを並行して比較するのが一般的です。最新の入学・学費は必ず各学校の公式サイトで確認してください。',
}

export const TOKYO_HUB_SHORT_ANSWER: Record<EducationLocale, string> = {
  en: 'Tokyo has the largest concentration of international schools in Japan, including ASIJ (American curriculum), BST (British), Nishimachi and Seisen (K-12 bilingual). Families typically compare curriculum, commute zone, and language goals. For younger children, hoikuen (daycare) and yochien (kindergarten) are the main childcare options; international preschools exist but availability varies by ward.',
  ja: '東京には日本最多のインターナショナルスクールがあります（ASIJ・BST・西町・清泉など）。カリキュラム・通学圏・日本語プログラムを軸に比較するのが一般的です。未就学児は保育園・幼稚園が主流で、英語プリスクールも区によって選択肢があります。最新の学費・空き・入学条件は各校公式サイトで確認してください。',
}

export const KOBE_HUB_SHORT_ANSWER: Record<EducationLocale, string> = {
  en: 'Kobe’s main international schools include Canadian Academy (Rokko Island), Marist Brothers International School, and St. Michael’s International School. Families in Ashiya and Nishinomiya often commute to Kobe or compare Osaka schools. English preschools in Rokko Island are considered before elementary applications; preschool attendance does not guarantee international school admission.',
  ja: '神戸の主なインターナショナルスクールは、Canadian Academy（六甲アイランド）、Marist Brothers International School、St. Michael\'s International School などです。芦屋・西宮のご家庭は神戸通学または大阪の校も比較します。幼児期は六甲の英語プリスクール（ピーターパン・インターナショナルプリスクールなど）が検討されることもありますが、通園がインター入学を保証しません。学費・空き学年は公式情報で確認してください。',
}
