import type { ReactNode } from 'react'

interface EducationJaSectionTitleProps {
  children: ReactNode
  className?: string
  as?: 'h2' | 'h3'
}

/** Japanese comparison-site style section heading (left accent bar) */
export default function EducationJaSectionTitle({
  children,
  className = '',
  as: Tag = 'h2',
}: EducationJaSectionTitleProps) {
  return (
    <Tag
      className={`edu-ja-section-title text-xl md:text-2xl font-bold text-edu-content mb-6 pb-2 border-b border-edu-ja-border ${className}`}
    >
      {children}
    </Tag>
  )
}
