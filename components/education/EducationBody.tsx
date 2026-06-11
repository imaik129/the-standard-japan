import { MDXRemote } from 'next-mdx-remote/rsc'
import { slugify } from '@/lib/toc'
import type { EducationLocale } from '@/lib/education-catalog'

function getHeadingText(children: React.ReactNode): string {
  if (typeof children === 'string') return children
  if (Array.isArray(children)) return children.map(getHeadingText).join('')
  if (children && typeof children === 'object' && 'props' in children) {
    const el = children as React.ReactElement<{ children?: React.ReactNode }>
    return getHeadingText(el.props.children)
  }
  return ''
}

function buildComponents(locale: EducationLocale) {
  const isJa = locale === 'ja'

  return {
    h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => {
      const id = slugify(getHeadingText(props.children))
      return (
        <h2
          id={id}
          className={
            isJa
              ? 'scroll-mt-28'
              : 'font-display text-2xl md:text-3xl font-bold text-edu-content mt-12 mb-4 scroll-mt-28'
          }
          {...props}
        />
      )
    },
    h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => {
      const id = slugify(getHeadingText(props.children))
      return (
        <h3
          id={id}
          className={
            isJa
              ? 'scroll-mt-28'
              : 'font-display text-xl font-bold text-edu-content mt-8 mb-3 scroll-mt-28'
          }
          {...props}
        />
      )
    },
    p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
      <p
        className={
          isJa ? 'mb-6' : 'font-body text-[1.05rem] leading-[1.85] text-edu-muted mb-6'
        }
        {...props}
      />
    ),
    ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
      <ul className={`space-y-2 mb-6 ${isJa ? 'pl-5 list-disc' : 'pl-6'}`} {...props} />
    ),
    ol: (props: React.OlHTMLAttributes<HTMLOListElement>) => (
      <ol className="space-y-2 mb-6 pl-6 list-decimal" {...props} />
    ),
    li: (props: React.HTMLAttributes<HTMLLIElement>) => (
      <li
        className={
          isJa
            ? 'leading-relaxed text-edu-ja-muted'
            : 'font-body text-[1.05rem] leading-relaxed text-edu-muted list-disc marker:text-edu-accent'
        }
        {...props}
      />
    ),
    blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
      <blockquote
        className={
          isJa
            ? 'border-l-4 pl-5 py-3 my-8'
            : 'border-l-4 border-edu-accent pl-6 py-2 my-8 font-body text-edu-content bg-edu-surface-muted rounded-r-lg'
        }
        {...props}
      />
    ),
    hr: () => <hr className={isJa ? 'border-edu-ja-border my-12' : 'border-edu-border my-12'} />,
    strong: (props: React.HTMLAttributes<HTMLElement>) => (
      <strong className="font-semibold text-edu-content" {...props} />
    ),
    // Span-based markup: MDX wraps standalone images in <p>, so block elements would be invalid nesting
    img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
      <span className="block my-10">
        <span
          className={`block relative w-full aspect-[16/9] rounded-xl overflow-hidden ${
            isJa ? 'border border-edu-ja-border shadow-sm' : 'border border-edu-border'
          }`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={props.src}
            alt={props.alt || ''}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </span>
        {props.alt && (
          <span
            className={`block mt-3 text-sm text-center ${
              isJa ? 'text-edu-ja-muted' : 'font-body text-edu-muted italic'
            }`}
          >
            {props.alt}
          </span>
        )}
      </span>
    ),
    a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
      <a
        className={
          isJa
            ? 'text-edu-ja-accent hover:opacity-80 transition-opacity'
            : 'text-edu-accent hover:underline transition-colors'
        }
        target={props.href?.startsWith('http') ? '_blank' : undefined}
        rel={props.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
        {...props}
      />
    ),
    table: (props: React.HTMLAttributes<HTMLTableElement>) => (
      <div className="overflow-x-auto my-8">
        <table
          className={`w-full border-collapse text-sm ${
            isJa ? 'border border-edu-ja-border rounded-lg overflow-hidden' : 'border border-edu-border'
          }`}
          {...props}
        />
      </div>
    ),
    thead: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
      <thead className={isJa ? 'bg-edu-ja-accent-soft' : 'bg-edu-surface-muted'} {...props} />
    ),
    tr: (props: React.HTMLAttributes<HTMLTableRowElement>) => (
      <tr className={isJa ? 'border-b border-edu-ja-border' : 'border-b border-edu-border'} {...props} />
    ),
    th: (props: React.ThHTMLAttributes<HTMLTableCellElement>) => (
      <th
        className={
          isJa
            ? 'text-left font-bold text-edu-ja-accent px-4 py-3 border border-edu-ja-border'
            : 'text-left font-display font-bold text-edu-content px-4 py-3 border border-edu-border'
        }
        {...props}
      />
    ),
    td: (props: React.TdHTMLAttributes<HTMLTableCellElement>) => (
      <td
        className={
          isJa
            ? 'px-4 py-3 border border-edu-ja-border text-edu-ja-muted'
            : 'font-body text-edu-muted px-4 py-3 border border-edu-border'
        }
        {...props}
      />
    ),
  }
}

interface EducationBodyProps {
  content: string
  locale?: EducationLocale
}

export default function EducationBody({ content, locale = 'en' }: EducationBodyProps) {
  const components = buildComponents(locale)

  return (
    <div className="education-prose max-w-none">
      <MDXRemote source={content} components={components} />
    </div>
  )
}
