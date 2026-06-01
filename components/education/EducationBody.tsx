import { MDXRemote } from 'next-mdx-remote/rsc'
import { slugify } from '@/lib/toc'

function getHeadingText(children: React.ReactNode): string {
  if (typeof children === 'string') return children
  if (Array.isArray(children)) return children.map(getHeadingText).join('')
  if (children && typeof children === 'object' && 'props' in children) {
    const el = children as React.ReactElement<{ children?: React.ReactNode }>
    return getHeadingText(el.props.children)
  }
  return ''
}

const components = {
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => {
    const id = slugify(getHeadingText(props.children))
    return (
      <h2
        id={id}
        className="font-display text-2xl md:text-3xl font-bold text-edu-content mt-12 mb-4 scroll-mt-28"
        {...props}
      />
    )
  },
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => {
    const id = slugify(getHeadingText(props.children))
    return (
      <h3
        id={id}
        className="font-display text-xl font-bold text-edu-content mt-8 mb-3 scroll-mt-28"
        {...props}
      />
    )
  },
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="font-body text-[1.05rem] leading-[1.85] text-edu-muted mb-6" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="space-y-2 mb-6 pl-6" {...props} />
  ),
  ol: (props: React.OlHTMLAttributes<HTMLOListElement>) => (
    <ol className="space-y-2 mb-6 pl-6 list-decimal" {...props} />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li
      className="font-body text-[1.05rem] leading-relaxed text-edu-muted list-disc marker:text-edu-accent"
      {...props}
    />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="border-l-4 border-edu-accent pl-6 py-2 my-8 font-body text-edu-content bg-edu-surface-muted rounded-r-lg"
      {...props}
    />
  ),
  hr: () => <hr className="border-edu-border my-12" />,
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong className="font-semibold text-edu-content" {...props} />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      className="text-edu-accent hover:underline transition-colors"
      target={props.href?.startsWith('http') ? '_blank' : undefined}
      rel={props.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      {...props}
    />
  ),
  table: (props: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="overflow-x-auto my-8">
      <table className="w-full border-collapse border border-edu-border text-sm" {...props} />
    </div>
  ),
  thead: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <thead className="bg-edu-surface-muted" {...props} />
  ),
  tr: (props: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr className="border-b border-edu-border" {...props} />
  ),
  th: (props: React.ThHTMLAttributes<HTMLTableCellElement>) => (
    <th
      className="text-left font-display font-bold text-edu-content px-4 py-3 border border-edu-border"
      {...props}
    />
  ),
  td: (props: React.TdHTMLAttributes<HTMLTableCellElement>) => (
    <td className="font-body text-edu-muted px-4 py-3 border border-edu-border" {...props} />
  ),
}

interface EducationBodyProps {
  content: string
}

export default function EducationBody({ content }: EducationBodyProps) {
  return (
    <div className="education-prose">
      <MDXRemote source={content} components={components} />
    </div>
  )
}
