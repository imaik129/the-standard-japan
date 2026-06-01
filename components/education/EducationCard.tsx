import Link from 'next/link'
import type { EducationCatalogEntry } from '@/lib/education-catalog'
import type { EducationLocale } from '@/lib/education-catalog'
import { getEducationPath, articleExists } from '@/lib/education'

interface EducationCardProps {
  entry: EducationCatalogEntry
  locale: EducationLocale
}

export default function EducationCard({ entry, locale }: EducationCardProps) {
  const published = entry.published && articleExists(entry.slug, locale)
  const title = entry.title[locale]
  const excerpt = entry.excerpt[locale]
  const cta = locale === 'ja' ? 'ガイドを読む' : 'Read Guide'
  const comingSoon = locale === 'ja' ? '近日公開' : 'Coming soon'

  const sectionLabels: Record<string, { en: string; ja: string }> = {
    'international-schools': { en: 'International Schools', ja: 'インターナショナルスクール' },
    preschool: { en: 'Preschool', ja: 'プリスクール' },
    'city-guides': { en: 'City Guide', ja: '都市ガイド' },
    moving: { en: 'Moving', ja: '引っ越し' },
    selection: { en: 'School Selection', ja: '学校選び' },
  }

  const sectionLabel = sectionLabels[entry.section]?.[locale] || entry.section

  const inner = (
    <article
      className={`group flex flex-col h-full bg-edu-surface border border-edu-border rounded-lg p-6 transition-all ${
        published ? 'hover:border-edu-accent/40 hover:shadow-md' : 'opacity-75'
      }`}
    >
      <p className="font-accent text-[10px] tracking-widest text-edu-accent uppercase mb-3">
        {sectionLabel}
      </p>
      <h3 className="font-display text-xl font-bold text-edu-content mb-3 group-hover:text-edu-accent transition-colors line-clamp-2">
        {title}
      </h3>
      <p className="font-body text-sm text-edu-muted leading-relaxed flex-1 line-clamp-3">{excerpt}</p>
      <p className="font-accent text-xs tracking-widest uppercase mt-6 text-edu-accent">
        {published ? `${cta} →` : comingSoon}
      </p>
    </article>
  )

  if (published) {
    return (
      <Link href={getEducationPath(entry.slug, locale)} className="block h-full">
        {inner}
      </Link>
    )
  }

  return <div className="h-full">{inner}</div>
}
