import Link from 'next/link'
import Image from 'next/image'
import { getCatalogEntry, type EducationLocale } from '@/lib/education-catalog'
import { getEducationHubPath, getEducationPath, articleExists } from '@/lib/education'
import {
  TOKYO_HUB_SLUGS,
  TOKYO_HUB_START_SLUGS,
  TOKYO_HUB_COPY,
  getTokyoHubPath,
} from '@/lib/education-tokyo-hub'
import { EDUCATION_HUB_HERO } from '@/lib/education-images'
import LanguageSwitcher from './LanguageSwitcher'
import EducationCard from './EducationCard'
import EducationJaFaq from './EducationJaFaq'
import EducationJaSectionTitle from './EducationJaSectionTitle'
import ShortAnswerBlock from './ShortAnswerBlock'
import { getEducationHubSchemaGraph } from '@/lib/education-aeo'
import { TOKYO_HUB_SHORT_ANSWER } from '@/lib/education-hub-aeo'

const TOKYO_FAQ = {
  en: [
    {
      q: 'What are the best international schools in Tokyo for expat families?',
      a: 'Tokyo\'s most prominent international schools include ASIJ (American curriculum), BST (British), Nishimachi International School, and Seisen International School. The best fit depends on curriculum preference, commute zone, and language goals. Verify availability and admissions directly with each school.',
    },
    {
      q: 'How does childcare (hoikuen) work in Tokyo for working parents?',
      a: 'Hoikuen (認可保育園) places in Tokyo are municipal and allocated by points based on working hours and family situation. Applications open in autumn for April enrollment. Waiting lists are common in central wards. The ward office (区役所) handles applications; start researching 6–12 months before you need care.',
    },
    {
      q: 'Can I use AI to research Tokyo international schools?',
      a: 'AI tools are useful for orientation — comparing curricula, understanding the system, and generating questions. Always verify fees, enrollment openings, and admissions requirements directly with each school\'s official website and admissions office.',
    },
  ],
  ja: [
    {
      q: '東京の外国人家庭に人気のインターナショナルスクールは？',
      a: 'ASIJ（米国式）、BST（英国式）、西町インターナショナル、清泉インターナショナルなどがよく比較されます。カリキュラム・通学圏・日本語教育の有無を軸に検討し、最新の入学・学費は各校公式情報で確認してください。',
    },
    {
      q: '東京の保育園（認可）はどう申し込みますか？',
      a: '認可保育園は区が管轄し、就労時間等のポイントで入園が決まります。申込は秋（10〜11月）に行い、4月入園が一般的です。待機が多い区もあるので、入園希望の6〜12か月前から区役所で情報収集を始めると安心です。',
    },
    {
      q: 'ChatGPTで東京のインター学校を調べた情報は信頼できますか？',
      a: 'AIは制度の仕組みや比較の整理に役立ちますが、学費・空き学年・出願条件は各校の公式サイトと直接問い合わせで必ず確認してください。',
    },
  ],
}

interface TokyoHubPageProps {
  locale: EducationLocale
}

export default function TokyoHubPage({ locale }: TokyoHubPageProps) {
  const copy = TOKYO_HUB_COPY[locale]
  const hubPath = getTokyoHubPath(locale)
  const educationHub = getEducationHubPath(locale)
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://thestandardjapan.com'
  const isJa = locale === 'ja'

  const startEntries = TOKYO_HUB_START_SLUGS.map((slug) => getCatalogEntry(slug)).filter(
    (e) => e && e.published && articleExists(e.slug, locale)
  )
  const allEntries = TOKYO_HUB_SLUGS.map((slug) => getCatalogEntry(slug)).filter(
    (e): e is NonNullable<ReturnType<typeof getCatalogEntry>> =>
      !!e && e.published && articleExists(e.slug, locale)
  )

  const faq = TOKYO_FAQ[locale]
  const hubUrl = `${baseUrl}${hubPath}`

  const hubSchemaGraph = getEducationHubSchemaGraph({
    locale,
    baseUrl,
    title: copy.title,
    description: TOKYO_HUB_SHORT_ANSWER[locale],
    url: hubUrl,
    articles: allEntries.map((entry) => ({
      title: entry.title[locale],
      url: `${baseUrl}${getEducationPath(entry.slug, locale)}`,
      description: entry.excerpt[locale],
    })),
    faq: faq.map(({ q, a }) => ({ question: q, answer: a })),
  })

  const breadcrumbSep = isJa ? '›' : '/'

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(hubSchemaGraph) }}
      />

      <div className={`min-h-screen pt-32 pb-20 ${isJa ? '' : 'bg-edu-background'}`}>
        <div className={`mx-auto px-4 sm:px-6 lg:px-8 ${isJa ? 'max-w-6xl' : 'max-w-7xl'}`}>
          <nav
            className={`flex flex-wrap items-center gap-2 text-sm mb-8 ${
              isJa ? 'text-edu-ja-muted' : 'text-edu-muted'
            }`}
          >
            <Link href="/" className={isJa ? 'hover:text-edu-ja-accent' : 'hover:text-edu-accent'}>
              {locale === 'ja' ? 'ホーム' : 'Home'}
            </Link>
            <span className="opacity-50">{breadcrumbSep}</span>
            <Link
              href={educationHub}
              className={isJa ? 'hover:text-edu-ja-accent' : 'hover:text-edu-accent'}
            >
              {locale === 'ja' ? '教育ガイド' : 'Education'}
            </Link>
            <span className="opacity-50">{breadcrumbSep}</span>
            <span className="text-edu-content">{locale === 'ja' ? '東京' : 'Tokyo'}</span>
          </nav>

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
            <div className="flex gap-2">
              <LanguageSwitcher locale={locale} />
              <Link
                href={locale === 'ja' ? '/education/tokyo' : '/ja/education/tokyo'}
                className={
                  isJa
                    ? 'text-xs font-medium text-edu-ja-muted border border-edu-ja-border px-3 py-1.5 rounded-md hover:text-edu-ja-accent'
                    : 'font-accent text-xs tracking-widest text-edu-muted hover:text-edu-accent uppercase border border-edu-border px-3 py-1.5 rounded'
                }
              >
                {locale === 'ja' ? 'English' : '日本語'}
              </Link>
            </div>
          </div>

          <h1
            className={`font-bold text-edu-content max-w-4xl leading-tight mb-4 ${
              isJa ? 'text-3xl md:text-4xl' : 'font-display text-4xl md:text-5xl'
            }`}
          >
            {copy.title}
          </h1>
          <p
            className={`mb-6 ${isJa ? 'text-lg text-edu-ja-accent font-bold' : 'font-display text-xl text-edu-muted'}`}
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
              text={TOKYO_HUB_SHORT_ANSWER[locale]}
              label={locale === 'ja' ? 'このページの要点' : 'Quick answer'}
              locale={locale}
            />
          </div>

          <div
            className={`relative w-full rounded-xl overflow-hidden mb-12 ${
              isJa ? 'border border-edu-ja-border shadow-sm' : 'border border-edu-border'
            }`}
          >
            <div className={`relative ${isJa ? 'aspect-[2.4/1] max-h-[380px]' : 'aspect-[21/9] max-h-[400px]'}`}>
              <Image
                src={EDUCATION_HUB_HERO.tokyo[locale]}
                alt={copy.title}
                fill
                className="object-cover"
                priority
                sizes="100vw"
              />
              {isJa && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
              )}
            </div>
            {isJa && (
              <p className="absolute bottom-0 left-0 right-0 px-4 py-3 text-sm text-white bg-black/35 backdrop-blur-sm">
                東京 — インターナショナルスクール・保育園・子育て手続き
              </p>
            )}
          </div>

          {startEntries.length > 0 && (
            <section className="mb-16">
              {isJa ? (
                <EducationJaSectionTitle>{copy.startTitle}</EducationJaSectionTitle>
              ) : (
                <h2 className="font-display text-2xl font-bold text-edu-content mb-6 border-b border-edu-border pb-4">
                  {copy.startTitle}
                </h2>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {startEntries.map((entry) => (
                  <EducationCard key={entry!.slug} entry={entry!} locale={locale} />
                ))}
              </div>
            </section>
          )}

          <section className="mb-16">
            {isJa ? (
              <EducationJaSectionTitle>{copy.allGuidesTitle}</EducationJaSectionTitle>
            ) : (
              <h2 className="font-display text-2xl font-bold text-edu-content mb-6 border-b border-edu-border pb-4">
                {copy.allGuidesTitle}
              </h2>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {allEntries.map((entry) => (
                <EducationCard key={entry.slug} entry={entry} locale={locale} />
              ))}
            </div>
          </section>

          {isJa ? (
            <div className="mb-12">
              <EducationJaFaq items={TOKYO_FAQ.ja} title={copy.faqTitle} />
            </div>
          ) : (
            <section className="mb-12">
              <h2 className="font-display text-2xl font-bold text-edu-content mb-8 border-b border-edu-border pb-4">
                {copy.faqTitle}
              </h2>
              <dl className="space-y-8 max-w-3xl">
                {faq.map(({ q, a }) => (
                  <div key={q}>
                    <dt className="font-display text-lg font-bold text-edu-content mb-2">{q}</dt>
                    <dd className="font-body text-edu-muted leading-relaxed">{a}</dd>
                  </div>
                ))}
              </dl>
            </section>
          )}

          <Link
            href={educationHub}
            className={
              isJa
                ? 'inline-flex text-sm font-medium text-edu-ja-accent hover:underline'
                : 'inline-flex font-accent text-xs tracking-widest uppercase text-edu-accent hover:underline'
            }
          >
            ← {copy.backToEducation}
          </Link>
        </div>
      </div>
    </>
  )
}
