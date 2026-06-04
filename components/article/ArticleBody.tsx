import Image from 'next/image'
import { MDXRemote } from 'next-mdx-remote/rsc'

const components = {
  img: ({ src, alt }: { src?: string; alt?: string }) => {
    if (!src) return null
    return (
      <figure className="my-10 -mx-2 sm:mx-0">
        <div className="relative w-full aspect-[16/10] overflow-hidden border border-border bg-surface-elevated">
          <Image
            src={src}
            alt={alt || ''}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 672px"
          />
        </div>
        {alt ? (
          <figcaption className="mt-2 px-1 font-accent text-xs text-muted text-center tracking-wide leading-relaxed">
            {alt}
          </figcaption>
        ) : null}
      </figure>
    )
  },
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="font-display text-2xl md:text-3xl font-bold text-content mt-12 mb-4" {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="font-display text-xl font-bold text-content mt-8 mb-3" {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="font-body text-[1.05rem] leading-[1.85] text-gray-200 mb-6" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="space-y-2 mb-6 pl-6" {...props} />
  ),
  ol: (props: React.OlHTMLAttributes<HTMLOListElement>) => (
    <ol className="space-y-2 mb-6 pl-6 list-decimal" {...props} />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="font-body text-[1.05rem] leading-relaxed text-gray-200 list-disc marker:text-accent" {...props} />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="border-l-4 border-accent pl-6 py-2 my-8 italic font-display text-xl text-content bg-surface-elevated"
      {...props}
    />
  ),
  hr: () => (
    <div className="flex items-center gap-4 my-12">
      <div className="flex-1 border-t border-border" />
      <div className="w-1.5 h-1.5 bg-accent rounded-full" />
      <div className="flex-1 border-t border-border" />
    </div>
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong className="font-bold text-content" {...props} />
  ),
  em: (props: React.HTMLAttributes<HTMLElement>) => (
    <em className="italic text-gray-300" {...props} />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      className="text-accent hover:underline transition-colors"
      target={props.href?.startsWith('http') ? '_blank' : undefined}
      rel={props.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      {...props}
    />
  ),
  table: (props: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="overflow-x-auto my-8">
      <table className="w-full border-collapse border border-border" {...props} />
    </div>
  ),
  thead: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <thead className="bg-surface-elevated" {...props} />
  ),
  tbody: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <tbody {...props} />
  ),
  tr: (props: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr className="border-b border-border hover:bg-surface-elevated/50 transition-colors" {...props} />
  ),
  th: (props: React.ThHTMLAttributes<HTMLTableCellElement>) => (
    <th className="text-left font-display font-bold text-content px-4 py-3 border border-border" {...props} />
  ),
  td: (props: React.TdHTMLAttributes<HTMLTableCellElement>) => (
    <td className="font-body text-[1.05rem] text-gray-200 px-4 py-3 border border-border" {...props} />
  ),
}

interface ArticleBodyProps {
  content: string
}

export default function ArticleBody({ content }: ArticleBodyProps) {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
      <MDXRemote source={content} components={components} />
    </div>
  )
}
