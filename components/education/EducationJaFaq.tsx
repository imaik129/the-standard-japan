interface FaqItem {
  q: string
  a: string
}

interface EducationJaFaqProps {
  items: FaqItem[]
  title?: string
}

export default function EducationJaFaq({ items, title = 'よくある質問' }: EducationJaFaqProps) {
  return (
    <section>
      <h2 className="edu-ja-section-title text-xl md:text-2xl font-bold text-edu-content mb-6 pb-2 border-b border-edu-ja-border">
        {title}
      </h2>
      <dl className="space-y-4">
        {items.map(({ q, a }) => (
          <div
            key={q}
            className="bg-white border border-edu-ja-border rounded-lg p-5 shadow-sm"
          >
            <dt className="text-base font-bold text-edu-content mb-2 flex gap-2">
              <span className="shrink-0 text-edu-ja-accent font-bold">Q.</span>
              <span>{q}</span>
            </dt>
            <dd className="text-sm text-edu-ja-muted leading-relaxed pl-6">{a}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
