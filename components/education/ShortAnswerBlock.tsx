import type { EducationLocale } from '@/lib/education-catalog'

interface ShortAnswerBlockProps {
  text: string
  label?: string
  locale?: EducationLocale
}

export default function ShortAnswerBlock({
  text,
  label,
  locale = 'en',
}: ShortAnswerBlockProps) {
  const resolvedLabel = label ?? (locale === 'ja' ? 'この記事の要点' : 'Short answer')

  if (locale === 'ja') {
    return (
      <aside
        id="article-short-answer"
        className="bg-edu-ja-highlight border border-edu-ja-highlight-border rounded-lg p-5 md:p-6 my-8 shadow-sm"
        aria-label={resolvedLabel}
      >
        <p className="inline-flex items-center gap-2 text-sm font-bold text-edu-ja-accent mb-3">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-edu-ja-accent" aria-hidden />
          {resolvedLabel}
        </p>
        <p className="text-[1rem] leading-[1.95] text-edu-content">{text}</p>
      </aside>
    )
  }

  return (
    <aside
      id="article-short-answer"
      className="bg-edu-surface border border-edu-border rounded-lg p-6 my-8 shadow-sm"
      aria-label={resolvedLabel}
    >
      <p className="font-accent text-[10px] tracking-widest text-edu-accent uppercase mb-3">
        {resolvedLabel}
      </p>
      <p className="font-body text-[1.05rem] leading-relaxed text-edu-content">{text}</p>
    </aside>
  )
}
