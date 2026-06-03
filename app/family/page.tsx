import type { Metadata } from 'next'
import Link from 'next/link'
import ShortAnswerBlock from '@/components/education/ShortAnswerBlock'
import EducationCard from '@/components/education/EducationCard'
import { getCatalogEntry } from '@/lib/education-catalog'
import { FAMILY_HUB_COPY, FAMILY_HUB_START_SLUGS, getFamilyHubAllEntries } from '@/lib/family-hub'
import { getEducationHubSchemaGraph } from '@/lib/education-aeo'
import { getEducationHubPath } from '@/lib/education'

export const metadata: Metadata = {
  title: 'Family Life in Japan',
  description:
    'Childcare, healthcare, moving checklists, and practical guides for parents and families living in Japan.',
  alternates: {
    canonical: '/family',
    languages: {
      ja: '/ja/family',
    },
  },
}

export default function FamilyHubPage() {
  const locale = 'en' as const
  const copy = FAMILY_HUB_COPY[locale]

  const start = FAMILY_HUB_START_SLUGS.map((slug) => getCatalogEntry(slug)).filter(Boolean)
  const all = getFamilyHubAllEntries()

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://thestandardjapan.com'
  const url = `${baseUrl}/family`

  const schemaArticles = all.map((entry) => ({
    title: entry.title[locale],
    url: `${baseUrl}/education/${entry.slug}`,
    description: entry.excerpt[locale],
  }))

  // Reuse the hub schema graph generator for a clean @graph:
  // CollectionPage + Website + FAQ (AEO-first).
  const schemaGraph = getEducationHubSchemaGraph({
    locale,
    baseUrl,
    url,
    title: copy.title,
    description: copy.shortAnswer,
    articles: schemaArticles,
    // Minimal FAQ for AEO on the hub itself.
    faq: [
      {
        question: 'Where should families start when moving to Japan?',
        answer:
          'Start with a moving checklist, then clarify childcare (daycare vs kindergarten) and pediatric care options in your city. Always verify with your city office and official providers.',
      },
      {
        question: 'Is daycare availability the same everywhere in Japan?',
        answer:
          'No — availability and processes vary by city/ward and by age. Use guides for orientation, then confirm the latest details with your local city office.',
      },
      {
        question: 'Hoikuen vs yochien: which should we choose?',
        answer:
          'Hoikuen is daycare-oriented and typically supports longer hours; yochien is education-oriented and often has shorter hours. Which fits best depends on caregiver work hours, child age, and municipal rules.',
      },
      {
        question: 'How do we choose a pediatric clinic in Japan?',
        answer:
          'Start with distance, hours, and after-hours options; then confirm reservations, language support, and what to bring for visits and vaccines. Your city may also publish lists of pediatric clinics.',
      },
      {
        question: 'International school vs Japanese school — what matters most?',
        answer:
          'The biggest drivers are language environment, total cost, commute, and long-term pathway. Many families decide by starting with the child’s language needs and daily routine, then comparing realistic commutes.',
      },
      {
        question: 'What should we prepare before applying to international schools?',
        answer:
          'Prepare documents early (records, passports, health forms), clarify language support needs, and make a shortlist based on commute and tuition. Always verify current requirements with each school’s admissions office.',
      },
    ],
  })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
      />

      <div className="pt-[calc(4rem+4.5rem)] min-h-screen">
        <div className="border-b border-border bg-surface/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <p className="font-accent text-[10px] tracking-[0.3em] text-accent uppercase mb-4">
              {copy.eyebrow}
            </p>
            <h1 className="font-display text-5xl md:text-6xl font-bold text-content mb-4">
              {copy.title}
            </h1>
            <p className="font-body text-lg text-muted max-w-3xl">{copy.subtitle}</p>

            <div className="max-w-3xl">
              <div id="hub-short-answer">
                <ShortAnswerBlock text={copy.shortAnswer} locale="en" label="Short answer" />
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-14">
          <section>
            <div className="flex items-end justify-between gap-6 mb-6">
              <h2 className="font-display text-2xl font-bold text-content">Start here</h2>
              <Link href={getEducationHubPath(locale)} className="text-sm text-accent hover:underline">
                Education hub →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {start.map((entry) => (
                <EducationCard key={entry!.slug} entry={entry!} locale={locale} />
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-content mb-6">All family guides</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {all.map((entry) => (
                <EducationCard key={entry.slug} entry={entry} locale={locale} />
              ))}
            </div>
          </section>

          <section className="max-w-3xl">
            <h2 className="font-display text-2xl font-bold text-content mb-6">{copy.faqTitle}</h2>
            <div className="space-y-4">
              <div className="bg-white border border-border rounded-lg p-5">
                <p className="font-bold text-content mb-2">Where should families start?</p>
                <p className="text-sm text-muted leading-relaxed">
                  Use a moving checklist first, then decide your childcare path (daycare vs kindergarten) and
                  confirm pediatric clinics near your home. Verify details with your city office and official
                  providers.
                </p>
              </div>
              <div className="bg-white border border-border rounded-lg p-5">
                <p className="font-bold text-content mb-2">Can I trust AI answers about childcare?</p>
                <p className="text-sm text-muted leading-relaxed">
                  AI is useful for orientation, but rules vary by municipality and change over time. Always
                  confirm the latest requirements with your local city/ward office.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}

