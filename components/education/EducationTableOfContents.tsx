'use client'

import { useState, useEffect } from 'react'
import type { EducationLocale } from '@/lib/education-catalog'

interface Heading {
  text: string
  id: string
  level: number
}

interface EducationTableOfContentsProps {
  headings: Heading[]
  locale: EducationLocale
}

export default function EducationTableOfContents({
  headings,
  locale,
}: EducationTableOfContentsProps) {
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    if (headings.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
            break
          }
        }
      },
      { rootMargin: '-100px 0px -80% 0px', threshold: 0 }
    )

    headings.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [headings])

  if (headings.length < 3) return null

  const label = locale === 'ja' ? '目次' : 'In this guide'

  return (
    <nav className="sticky top-32 self-start" aria-label="Table of contents">
      <p className="font-accent text-[10px] tracking-widest text-edu-muted uppercase mb-4">
        {label}
      </p>
      <ul className="space-y-2">
        {headings.map(({ text, id, level }) => (
          <li key={id} style={{ paddingLeft: level === 3 ? '1rem' : 0 }}>
            <a
              href={`#${id}`}
              className={`font-accent text-xs tracking-wider transition-colors block py-1 ${
                activeId === id ? 'text-edu-accent' : 'text-edu-muted hover:text-edu-content'
              }`}
            >
              {text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
