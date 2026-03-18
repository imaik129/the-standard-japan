/**
 * Extracts steps from MDX content for HowTo schema.
 * Looks for ## Step N or ## Step N: Title format, or numbered ## 1. Title
 */
export function extractStepsFromContent(content: string): { name: string; text: string }[] {
  const steps: { name: string; text: string }[] = []

  // Match ## Step 1, ## Step 2: Title, or ## 1. Title
  const stepRegex = /^##\s+(?:Step\s+)?(\d+)(?:\.|:)\s*(.+?)\s*$/gm
  const sectionRegex = /^##\s+(.+?)\s*$/gm

  const lines = content.split('\n')
  let i = 0

  while (i < lines.length) {
    const line = lines[i]
    const stepMatch = line.match(/^##\s+(?:Step\s+)?(\d+)(?:\.|:)\s*(.+?)\s*$/)
    if (stepMatch) {
      const stepName = stepMatch[2].trim()
      let stepText = ''
      i++
      while (i < lines.length && !lines[i].startsWith('##')) {
        stepText += lines[i] + ' '
        i++
      }
      steps.push({ name: stepName, text: stepText.trim().replace(/\s+/g, ' ') })
      continue
    }
    i++
  }

  return steps
}

/**
 * Alternative: extract from H2 sections as steps for how-to guides
 */
export function extractHowToSteps(content: string): { name: string; text: string }[] {
  const steps = extractStepsFromContent(content)
  if (steps.length >= 2) return steps

  // Fallback: use H2 sections (excluding FAQ) as steps
  const parts = content.split(/^##\s+/m)
  const sections: { name: string; content: string }[] = []

  for (let i = 1; i < parts.length; i++) {
    const part = parts[i]
    const firstLineEnd = part.indexOf('\n')
    const name = firstLineEnd > 0 ? part.slice(0, firstLineEnd).trim() : part.trim()
    const sectionContent = firstLineEnd > 0 ? part.slice(firstLineEnd).trim() : ''

    if (name.toLowerCase().includes('faq')) break
    if (name && sectionContent) {
      sections.push({
        name,
        content: sectionContent.replace(/\s+/g, ' ').slice(0, 300),
      })
    }
  }

  if (sections.length >= 2) {
    return sections.map((s) => ({ name: s.name, text: s.content }))
  }

  return []
}

export function getHowToSchema(
  title: string,
  description: string,
  steps: { name: string; text: string }[],
  url: string
) {
  if (steps.length < 2) return null

  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: title,
    description,
    url,
    step: steps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  }
}
