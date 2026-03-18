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
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

/** Injects {#id} into headings for anchor links. Strips markdown from heading text for slug. */
export function addHeadingIds(content: string): string {
  return content.replace(/^(#{2,3})\s+(.+?)(?:\s*\{#[\w-]+\})?\s*$/gm, (_, hashes, title) => {
    const plainText = title.replace(/\*\*(.+?)\*\*/g, '$1').replace(/\*(.+?)\*/g, '$1').trim()
    const id = slugify(plainText)
    return `${hashes} ${title} {#${id}}`
  })
}
