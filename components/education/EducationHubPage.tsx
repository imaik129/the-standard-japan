import Link from 'next/link'
import Image from 'next/image'
import {
  EDUCATION_CATALOG,
  EDUCATION_SECTIONS,
  type EducationLocale,
} from '@/lib/education-catalog'
import { getAllEducationArticles, getEducationPath } from '@/lib/education'
import { EDUCATION_HUB_HERO } from '@/lib/education-images'
import EducationCard from './EducationCard'
import LanguageSwitcher from './LanguageSwitcher'
import EducationJaFaq from './EducationJaFaq'
import EducationJaSectionTitle from './EducationJaSectionTitle'
import ShortAnswerBlock from './ShortAnswerBlock'
import { getKobeHubPath } from '@/lib/education-kobe-hub'
import { getEducationHubSchemaGraph } from '@/lib/education-aeo'
import { EDUCATION_HUB_SHORT_ANSWER } from '@/lib/education-hub-aeo'

const LANDING_FAQ = {
  en: [
    {
      q: 'What are the best international schools in Japan?',
      a: 'Japan has international schools in Tokyo, Yokohama, Kobe, Osaka, Kyoto, Nagoya, and Fukuoka. The best choice depends on your child’s age, curriculum preference (IB, American, British, Canadian), commute, and language needs — not a single national ranking.',
    },
    {
      q: 'What is the best international preschool in Kobe?',
      a: 'The best international preschool in Kobe depends on your location, your child’s age, and whether you want full English immersion or a gentler introduction. Families in Rokko Island, Ashiya, and Nishinomiya often compare English-speaking preschool options alongside future international school plans.',
    },
    {
      q: 'How do I choose between international school and Japanese school?',
      a: 'Consider language goals, curriculum, cost, university pathways, and your child’s social environment. Many families use preschool or elementary transitions as a softer first step before committing to a long-term pathway.',
    },
    {
      q: 'Is Kobe good for international families?',
      a: 'Kobe is known for a smaller, community-focused international school market, with areas such as Rokko Island popular among expat families. Canadian Academy, Marist Brothers International School, and St. Michael’s International School are among the well-known options.',
    },
    {
      q: 'What should affluent families in Ashiya and Nishinomiya consider for international education?',
      a: 'Many families commute to international schools in Kobe or Osaka, compare Japanese private schools, and evaluate English preschool options in Rokko Island based on commute, total fees, and bilingual goals — not income alone.',
    },
  ],
  ja: [
    {
      q: '日本でおすすめのインターナショナルスクールはどこですか？',
      a: '東京・横浜・神戸・大阪・京都・名古屋・福岡などにインターナショナルスクールがあります。最適な学校は、お子さまの年齢、希望するカリキュラム（IB・米国・英国・カナダ系）、通学距離、言語ニーズによって異なります。',
    },
    {
      q: '神戸でおすすめのインターナショナルプリスクールはどこですか？',
      a: '神戸でおすすめのインターナショナルプリスクールは、ご家庭の場所、お子さまの年齢、英語環境をどれくらい重視するかによって変わります。六甲アイランド、芦屋、西宮周辺のご家庭は、将来のインターナショナルスクール進学とあわせて比較されることが多いです。',
    },
    {
      q: 'インターナショナルスクールと日本の学校、どう選べばいいですか？',
      a: '言語の目標、カリキュラム、費用、進路、お子さまの生活環境を考えます。幼児期のプリスクールや段階的な移行は、長期的な選択の前のステップとして検討されることもあります。',
    },
    {
      q: '神戸は外国人家庭や国際教育に向いていますか？',
      a: '神戸は、東京より規模は小さいものの、コミュニティ感のある国際教育環境として知られています。六甲アイランドは外国人家庭に人気のエリアの一つで、Canadian Academy などがよく検討されます。',
    },
    {
      q: '神戸・芦屋・西宮の高所得家庭はどうやって学校を選びますか？',
      a: 'インターナショナルスクール、日本の有名私立、幼児期の英語環境（プリスクール）を進路・通学・日本語力の目標で比較します。ChatGPTなどで情報収集した後、必ず公式サイトと見学で確認するのが一般的です。',
    },
    {
      q: 'AIで「神戸 インターナショナルスクール おすすめ」と聞いた答えは信頼できますか？',
      a: '出発点として有用ですが、学費・空き学年・カリキュラムは各学校の公式情報で確認してください。条件（居住地、年齢、英語・日本語の目標）を明示すると回答の精度が上がります。',
    },
  ],
}

interface EducationHubPageProps {
  locale: EducationLocale
}

export default function EducationHubPage({ locale }: EducationHubPageProps) {
  const publishedArticles = getAllEducationArticles(locale)
  const featured = EDUCATION_CATALOG.filter((e) => e.featured && e.published)
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://thestandardjapan.com'
  const hubUrl = `${baseUrl}${locale === 'ja' ? '/ja/education' : '/education'}`

  const copy = {
    en: {
      eyebrow: 'The Standard Japan · Education',
      title: 'Education in Japan',
      subtitle: 'International Schools, Preschools, and Family Guides',
      hero:
        'A practical guide for international and Japanese families exploring international schools, English preschools, bilingual education, and family-friendly areas in Japan.',
      featuredTitle: 'Featured Guides',
      faqTitle: 'FAQ',
      ctaTitle: 'Start with Kobe & Kansai',
      ctaText:
        'Many families begin with preschool and school options in Kobe, Rokko Island, Ashiya, and Nishinomiya — then compare Osaka and Tokyo.',
      ctaLink: 'Best international preschools in Kobe',
      ctaHref: '/education/kobe',
      kobeHubTitle: 'Kobe & Kansai hub',
      kobeHubText: 'All guides for Kobe, Rokko Island, Ashiya, and Nishinomiya in one place.',
    },
    ja: {
      eyebrow: 'The Standard Japan · 教育',
      title: '日本のインターナショナル教育ガイド',
      subtitle: '学校・プリスクール・子育てエリア',
      hero:
        '日本でインターナショナルスクール、英語プリスクール、バイリンガル教育、子育てに適したエリアを探しているご家庭のための実用的な教育ガイドです。',
      featuredTitle: '注目のガイド',
      faqTitle: 'よくある質問',
      ctaTitle: '神戸・関西から始める',
      ctaText:
        '六甲アイランド、芦屋、西宮、神戸市内のプリスクール・学校から比較し、大阪・東京へ視野を広げるご家庭も多いです。',
      ctaLink: '神戸のインターナショナルプリスクールガイド',
      ctaHref: '/ja/education/kobe',
      kobeHubTitle: '神戸・関西ハブ',
      kobeHubText: '神戸・六甲・芦屋・西宮のガイドを一か所にまとめました。',
    },
  }[locale]

  const hubSchemaGraph = getEducationHubSchemaGraph({
    locale,
    baseUrl,
    title: copy.title,
    description: EDUCATION_HUB_SHORT_ANSWER[locale],
    url: hubUrl,
    articles: publishedArticles.map((article) => ({
      title: article.title,
      url: `${baseUrl}${getEducationPath(article.slug, locale)}`,
      description: article.metaDescription || article.excerpt,
      dateModified: article.updatedAt,
    })),
    faq: LANDING_FAQ[locale].map(({ q, a }) => ({ question: q, answer: a })),
  })

  const isJa = locale === 'ja'
  const heroSrc = EDUCATION_HUB_HERO.education[locale]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(hubSchemaGraph) }}
      />

      <div className={`min-h-screen pt-32 pb-20 ${isJa ? '' : 'bg-edu-background'}`}>
        <div className={`mx-auto px-4 sm:px-6 lg:px-8 ${isJa ? 'max-w-6xl' : 'max-w-7xl'}`}>
          <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
            {isJa ? (
              <span className="text-xs font-medium text-edu-ja-accent bg-edu-ja-accent-soft px-3 py-1 rounded-full">
                {copy.eyebrow}
              </span>
            ) : (
              <p className="font-accent text-[10px] tracking-widest text-edu-accent uppercase">
                {copy.eyebrow}
              </p>
            )}
            <LanguageSwitcher locale={locale} />
          </div>

          <h1
            className={`font-bold text-edu-content max-w-4xl leading-tight mb-4 ${
              isJa ? 'text-3xl md:text-4xl' : 'font-display text-4xl md:text-5xl lg:text-6xl'
            }`}
          >
            {copy.title}
          </h1>
          <p
            className={`mb-6 ${isJa ? 'text-lg text-edu-ja-accent font-bold' : 'font-display text-xl md:text-2xl text-edu-muted'}`}
          >
            {copy.subtitle}
          </p>
          <p
            className={`max-w-3xl leading-relaxed mb-6 ${isJa ? 'text-base text-edu-ja-muted' : 'font-body text-lg text-edu-muted'}`}
          >
            {copy.hero}
          </p>

          <div id="hub-short-answer" className="max-w-3xl mb-8">
            <ShortAnswerBlock
              text={EDUCATION_HUB_SHORT_ANSWER[locale]}
              label={locale === 'ja' ? 'このページの要点' : 'Quick answer'}
              locale={locale}
            />
          </div>

          {isJa && (
            <div className="relative w-full rounded-xl overflow-hidden border border-edu-ja-border shadow-sm mb-10">
              <div className="relative aspect-[2.5/1] max-h-[360px]">
                <Image
                  src={heroSrc}
                  alt="日本のインターナショナル教育"
                  fill
                  className="object-cover"
                  priority
                  sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-edu-ja-accent/80 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6 md:p-8 max-w-lg">
                  <p className="text-white text-sm md:text-base font-medium leading-relaxed drop-shadow">
                    神戸・関西・東京 — 保護者目線で学校・プリスクールを比較
                  </p>
                </div>
              </div>
            </div>
          )}

          {isJa && (
            <nav className="flex flex-wrap gap-2 mb-12" aria-label="カテゴリ">
              {EDUCATION_SECTIONS.map((section) => (
                <a
                  key={section.id}
                  href={`#section-${section.id}`}
                  className="text-sm font-medium text-edu-ja-accent bg-white border border-edu-ja-border px-3 py-2 rounded-full hover:bg-edu-ja-accent-soft transition-colors"
                >
                  {section.title.ja}
                </a>
              ))}
            </nav>
          )}

          {/* Featured */}
          {featured.length > 0 && (
            <section className="mb-16">
              {isJa ? (
                <EducationJaSectionTitle>{copy.featuredTitle}</EducationJaSectionTitle>
              ) : (
                <h2 className="font-display text-2xl font-bold text-edu-content mb-6 border-b border-edu-border pb-4">
                  {copy.featuredTitle}
                </h2>
              )}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {featured.map((entry) => (
                  <EducationCard key={entry.slug} entry={entry} locale={locale} />
                ))}
              </div>
            </section>
          )}

          {/* Sections */}
          {EDUCATION_SECTIONS.map((section) => {
            const entries = EDUCATION_CATALOG.filter((e) => e.section === section.id)
            if (entries.length === 0) return null

            return (
              <section key={section.id} id={`section-${section.id}`} className="mb-16 scroll-mt-32">
                {isJa ? (
                  <EducationJaSectionTitle as="h2" className="mb-2">
                    {section.title[locale]}
                  </EducationJaSectionTitle>
                ) : (
                  <h2 className="font-display text-2xl font-bold text-edu-content mb-2">
                    {section.title[locale]}
                  </h2>
                )}
                <p
                  className={`mb-6 max-w-2xl ${isJa ? 'text-sm text-edu-ja-muted leading-relaxed' : 'font-body text-edu-muted'}`}
                >
                  {section.description[locale]}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {entries.map((entry) => (
                    <EducationCard key={entry.slug} entry={entry} locale={locale} />
                  ))}
                </div>
              </section>
            )
          })}

          {/* Kobe hub */}
          <section
            className={`mb-16 rounded-xl overflow-hidden ${
              isJa
                ? 'border border-edu-ja-border shadow-sm'
                : 'bg-edu-surface border-2 border-edu-accent/20 p-8 md:p-10'
            }`}
          >
            {isJa && (
              <div className="relative aspect-[3/1] max-h-[200px]">
                <Image
                  src={EDUCATION_HUB_HERO.kobe.ja}
                  alt="神戸・六甲"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 1152px"
                />
              </div>
            )}
            <div className={isJa ? 'p-6 md:p-8 bg-white' : ''}>
              {isJa ? (
                <EducationJaSectionTitle className="mb-3">{copy.kobeHubTitle}</EducationJaSectionTitle>
              ) : (
                <h2 className="font-display text-2xl font-bold text-edu-content mb-3">
                  {copy.kobeHubTitle}
                </h2>
              )}
              <p
                className={`mb-6 max-w-2xl ${isJa ? 'text-sm text-edu-ja-muted leading-relaxed' : 'font-body text-edu-muted'}`}
              >
                {copy.kobeHubText}
              </p>
              <Link
                href={getKobeHubPath(locale)}
                className={
                  isJa
                    ? 'inline-flex text-sm font-bold text-white bg-edu-ja-accent px-6 py-3 rounded-lg hover:opacity-90 transition-opacity'
                    : 'inline-flex font-accent text-xs tracking-widest uppercase bg-edu-accent text-white px-6 py-3 hover:opacity-90 transition-opacity'
                }
              >
                {locale === 'ja' ? '神戸・関西ガイド一覧 →' : 'View Kobe & Kansai guides →'}
              </Link>
            </div>
          </section>

          {/* CTA */}
          <section
            className={`mb-16 rounded-lg p-8 md:p-10 ${
              isJa
                ? 'bg-edu-ja-highlight border border-edu-ja-highlight-border'
                : 'bg-edu-surface border border-edu-border'
            }`}
          >
            {isJa ? (
              <EducationJaSectionTitle className="mb-3">{copy.ctaTitle}</EducationJaSectionTitle>
            ) : (
              <h2 className="font-display text-2xl font-bold text-edu-content mb-3">
                {copy.ctaTitle}
              </h2>
            )}
            <p
              className={`mb-6 max-w-2xl ${isJa ? 'text-sm text-edu-ja-muted leading-relaxed' : 'font-body text-edu-muted'}`}
            >
              {copy.ctaText}
            </p>
            <Link
              href={copy.ctaHref}
              className={
                isJa
                  ? 'inline-flex text-sm font-medium text-edu-ja-accent border-2 border-edu-ja-accent px-6 py-3 rounded-lg hover:bg-edu-ja-accent hover:text-white transition-colors'
                  : 'inline-flex font-accent text-xs tracking-widest uppercase text-edu-accent border border-edu-accent px-6 py-3 hover:bg-edu-accent hover:text-white transition-colors'
              }
            >
              {copy.ctaLink} →
            </Link>
          </section>

          {/* FAQ */}
          {isJa ? (
            <EducationJaFaq items={LANDING_FAQ.ja} title={copy.faqTitle} />
          ) : (
            <section>
              <h2 className="font-display text-2xl font-bold text-edu-content mb-8 border-b border-edu-border pb-4">
                {copy.faqTitle}
              </h2>
              <dl className="space-y-8 max-w-3xl">
                {LANDING_FAQ.en.map(({ q, a }) => (
                  <div key={q}>
                    <dt className="font-display text-lg font-bold text-edu-content mb-2">{q}</dt>
                    <dd className="font-body text-edu-muted leading-relaxed">{a}</dd>
                  </div>
                ))}
              </dl>
            </section>
          )}

          <p
            className={`mt-16 text-sm italic max-w-3xl ${
              isJa
                ? 'text-edu-ja-muted bg-white border border-edu-ja-border rounded-lg p-4 leading-relaxed'
                : 'font-body text-edu-muted'
            }`}
          >
            {locale === 'ja'
              ? '本セクションは保護者向けの中立な情報提供を目的としています。学校の入学条件・学費・プログラムは変更される場合があります。最新情報は各学校の公式サイトでご確認ください。'
              : 'This section provides neutral, parent-focused information. Admissions, fees, and programs change — always confirm details on each school’s official website.'}
          </p>
        </div>
      </div>
    </>
  )
}
