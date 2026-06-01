import Link from 'next/link'
import type { EducationLocale } from '@/lib/education-catalog'
import { getEducationPath, getEducationHubPath, articleExists } from '@/lib/education'

interface LanguageSwitcherProps {
  slug?: string
  locale: EducationLocale
}

export default function LanguageSwitcher({ slug, locale }: LanguageSwitcherProps) {
  const other: EducationLocale = locale === 'en' ? 'ja' : 'en'

  if (slug && !articleExists(slug, other)) return null

  const href = slug ? getEducationPath(slug, other) : getEducationHubPath(other)
  const label = locale === 'en' ? '日本語' : 'English'

  return (
    <Link
      href={href}
      hrefLang={other}
      className="font-accent text-xs tracking-widest text-edu-muted hover:text-edu-accent uppercase border border-edu-border px-3 py-1.5 rounded transition-colors"
    >
      {label}
    </Link>
  )
}
