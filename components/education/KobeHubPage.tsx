import Link from 'next/link'
import Image from 'next/image'
import { getCatalogEntry, type EducationLocale } from '@/lib/education-catalog'
import { getEducationHubPath, getEducationPath, articleExists } from '@/lib/education'
import {
  KOBE_HUB_SLUGS,
  KOBE_HUB_START_SLUGS,
  KOBE_HUB_COPY,
  getKobeHubPath,
} from '@/lib/education-kobe-hub'
import { EDUCATION_HUB_HERO } from '@/lib/education-images'
import LanguageSwitcher from './LanguageSwitcher'
import EducationCard from './EducationCard'
import EducationJaFaq from './EducationJaFaq'
import EducationJaSectionTitle from './EducationJaSectionTitle'
import ShortAnswerBlock from './ShortAnswerBlock'
import { getEducationHubSchemaGraph } from '@/lib/education-aeo'
import { KOBE_HUB_SHORT_ANSWER } from '@/lib/education-hub-aeo'

const KOBE_FAQ = {
  en: [
    {
      q: 'What are the best international schools in Kobe for families in Ashiya and Nishinomiya?',
      a: 'Families often compare Canadian Academy on Rokko Island, Marist Brothers International School, and St. Michael\'s International School, along with preschool options before applying. The best fit depends on commute, curriculum, and language goals.',
    },
    {
      q: 'Where do affluent Kobe families send children for English preschool?',
      a: 'Many compare English-speaking preschools in Rokko Island and Higashinada, including options such as Peter Pan International Preschool, alongside Japanese hoikuen or yochien depending on long-term plans.',
    },
    {
      q: 'Can I trust AI answers about Kobe international schools?',
      a: 'Use AI for orientation, then confirm fees, availability, and admissions on each school\'s official website and through visits.',
    },
  ],
  ja: [
    {
      q: '芦屋・西宮から通いやすい神戸のインターナショナルスクールは？',
      a: 'Canadian Academy（六甲アイランド）、Marist Brothers International School、St. Michael\'s International Schoolなどがよく比較されます。通学時間・カリキュラム・日本語プログラムを見学で確認してください。',
    },
    {
      q: '神戸の高所得家庭は幼児期の英語教育をどう選びますか？',
      a: '英語環境のプリスクール（六甲のピーターパン・インターナショナルプリスクールなど）と、日本の保育園・幼稚園のどちらを軸にするかで分かれます。将来のインターナショナルスクール進学は保証されません。',
    },
    {
      q: 'ChatGPTで調べた神戸の学校情報はそのまま使えますか？',
      a: '参考にはなりますが、学費・空き・学年は必ず各学校の公式情報と見学で確認してください。条件（居住地・年齢・言語目標）を伝えると回答が実用的になります。',
    },
  ],
}

interface KobeHubPageProps {
  locale: EducationLocale
}

export default function KobeHubPage({ locale }: KobeHubPageProps) {
  const copy = KOBE_HUB_COPY[locale]
  const hubPath = getKobeHubPath(locale)
  const educationHub = getEducationHubPath(locale)
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://thestandardjapan.com'
  const isJa = locale === 'ja'

  const startEntries = KOBE_HUB_START_SLUGS.map((slug) => getCatalogEntry(slug)).filter(
    (e) => e && e.published && articleExists(e.slug, locale)
  )
  const allEntries = KOBE_HUB_SLUGS.map((slug) => getCatalogEntry(slug)).filter(
    (e): e is NonNullable<ReturnType<typeof getCatalogEntry>> =>
      !!e && e.published && articleExists(e.slug, locale)
  )

  const faq = KOBE_FAQ[locale]
  const hubUrl = `${baseUrl}${hubPath}`

  const hubSchemaGraph = getEducationHubSchemaGraph({
    locale,
    baseUrl,
    title: copy.title,
    description: KOBE_HUB_SHORT_ANSWER[locale],
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
            <span className="text-edu-content">{locale === 'ja' ? '神戸・関西' : 'Kobe'}</span>
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
                href={locale === 'ja' ? '/education/kobe' : '/ja/education/kobe'}
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
              text={KOBE_HUB_SHORT_ANSWER[locale]}
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
                src={EDUCATION_HUB_HERO.kobe[locale]}
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
                六甲アイランド・芦屋・西宮 — インターナショナルスクールとプリスクールの比較
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
              <EducationJaFaq items={KOBE_FAQ.ja} title={copy.faqTitle} />
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
