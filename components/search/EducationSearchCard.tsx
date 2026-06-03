import Link from 'next/link'
import Image from 'next/image'
import type { EducationCatalogEntry, EducationLocale } from '@/lib/education-catalog'
import { EDUCATION_SECTION_IMAGES } from '@/lib/education-images'

interface EducationSearchCardProps {
  entry: EducationCatalogEntry
  locale: EducationLocale
}

export default function EducationSearchCard({ entry, locale }: EducationSearchCardProps) {
  const title = entry.title[locale]
  const excerpt = entry.excerpt[locale]
  const href = locale === 'ja' ? `/ja/education/${entry.slug}` : `/education/${entry.slug}`
  const cover = EDUCATION_SECTION_IMAGES[entry.section] || EDUCATION_SECTION_IMAGES['city-guides']

  const sectionLabels: Record<string, { en: string; ja: string }> = {
    'international-schools': { en: 'International Schools', ja: 'インターナショナルスクール' },
    preschool: { en: 'Preschool', ja: 'プリスクール' },
    'city-guides': { en: 'City Guide', ja: '都市ガイド' },
    moving: { en: 'Moving', ja: '引っ越し' },
    selection: { en: 'School Selection', ja: '学校選び' },
  }

  const sectionLabel = sectionLabels[entry.section]?.[locale] || entry.section

  if (locale === 'ja') {
    return (
      <Link href={href} className="block h-full">
        <article className="group flex flex-col h-full bg-white border border-edu-ja-border rounded-xl overflow-hidden hover:shadow-lg hover:border-edu-ja-accent/30 transition-all">
          <div className="relative aspect-[16/10] w-full bg-edu-ja-accent-soft overflow-hidden">
            <Image
              src={cover}
              alt={title}
              fill
              className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <div className="flex flex-col flex-1 p-4 md:p-5">
            <span className="inline-block self-start text-xs font-medium text-edu-ja-accent bg-edu-ja-accent-soft px-2.5 py-1 rounded-full mb-3">
              {sectionLabel}
            </span>
            <h3 className="text-base md:text-lg font-bold text-edu-content mb-2 leading-snug line-clamp-2 group-hover:text-edu-ja-accent transition-colors">
              {title}
            </h3>
            <p className="text-sm text-edu-ja-muted leading-relaxed flex-1 line-clamp-3">{excerpt}</p>
            <p className="text-sm font-medium text-edu-ja-accent mt-4">読む →</p>
          </div>
        </article>
      </Link>
    )
  }

  return (
    <Link href={href} className="block h-full">
      <article className="group flex flex-col h-full bg-edu-surface border border-edu-border rounded-lg overflow-hidden hover:border-edu-accent/40 hover:shadow-md transition-all">
        <div className="relative aspect-[16/9] w-full overflow-hidden">
          <Image src={cover} alt={title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
        </div>
        <div className="flex flex-col flex-1 p-6">
          <p className="font-accent text-[10px] tracking-widest text-edu-accent uppercase mb-3">
            {sectionLabel}
          </p>
          <h3 className="font-display text-xl font-bold text-edu-content mb-3 group-hover:text-edu-accent transition-colors line-clamp-2">
            {title}
          </h3>
          <p className="font-body text-sm text-edu-muted leading-relaxed flex-1 line-clamp-3">{excerpt}</p>
          <p className="font-accent text-xs tracking-widest uppercase mt-6 text-edu-accent">
            Read guide →
          </p>
        </div>
      </article>
    </Link>
  )
}

