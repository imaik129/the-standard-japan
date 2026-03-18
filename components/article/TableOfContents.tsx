'use client'

import { useState, useEffect } from 'react'

interface Heading {
  text: string
  id: string
  level: number
}

interface TableOfContentsProps {
  headings: Heading[]
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
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
      { rootMargin: '-80px 0px -80% 0px', threshold: 0 }
    )

    headings.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [headings])

  if (headings.length < 3) return null

  return (
    <nav className="hidden xl:block sticky top-32 self-start" aria-label="Table of contents">
      <p className="font-accent text-[10px] tracking-widest text-muted uppercase mb-4">
        In this article
      </p>
      <ul className="space-y-2">
        {headings.map(({ text, id, level }) => (
          <li
            key={id}
            style={{ paddingLeft: level === 3 ? '1rem' : 0 }}
            className={level === 3 ? 'border-l border-border/50' : ''}
          >
            <a
              href={`#${id}`}
              className={`font-accent text-xs tracking-wider transition-colors block py-1 ${
                activeId === id ? 'text-accent' : 'text-muted hover:text-content'
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
