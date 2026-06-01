export function extractHeadings(content: string): { text: string; id: string; level: number }[] {
  const headings: { text: string; id: string; level: number }[] = []
  const lines = content.split('\n')

  for (const line of lines) {
    const h2Match = line.match(/^##\s+(.+?)(?:\s*$|\s*\{)/)
    const h3Match = line.match(/^###\s+(.+?)(?:\s*$|\s*\{)/)

    if (h2Match) {
      const text = h2Match[1].trim()
      if (!text.toLowerCase().includes('faq')) {
        headings.push({ text, id: slugify(text), level: 2 })
      }
    } else if (h3Match) {
      const text = h3Match[1].trim()
      headings.push({ text, id: slugify(text), level: 3 })
    }
  }

  return headings
}

export function slugify(text: string): string {
  const base = text
    .toLowerCase()
    .replace(/[^\w\s-\u3040-\u309f\u30a0-\u30ff\u4e00-\u9faf]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()

  if (base.length > 0) return base

  // Fallback for headings that slugify to empty (e.g. punctuation-only)
  let hash = 0
  for (let i = 0; i < text.length; i++) {
    hash = (hash << 5) - hash + text.charCodeAt(i)
    hash |= 0
  }
  return `section-${Math.abs(hash)}`
}

/** Injects {#id} into headings for anchor links. Strips markdown from heading text for slug. */
export function addHeadingIds(content: string): string {
  let index = 0
  return content.replace(/^(#{2,3})\s+(.+?)(?:\s*\{#[\w-]+\})?\s*$/gm, (_, hashes, title) => {
    const plainText = title.replace(/\*\*(.+?)\*\*/g, '$1').replace(/\*(.+?)\*/g, '$1').trim()
    let id = slugify(plainText)
    if (!id || id === 'section-0') {
      index += 1
      id = `section-${index}`
    }
    return `${hashes} ${title} {#${id}}`
  })
}
