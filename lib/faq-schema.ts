/**
 * Extracts FAQ Q&A pairs from MDX content.
 * Format: ## FAQ followed by **Question?** on one line, answer on following lines until next **
 */
export function extractFaqFromContent(content: string): { question: string; answer: string }[] {
  const faq: { question: string; answer: string }[] = []
  const faqSection = content.match(/## FAQ\s+([\s\S]*?)(?=\n## |$)/i)
  if (!faqSection) return faq

  const section = faqSection[1]
  const regex = /\*\*(.+?)\*\*\s*\n([\s\S]*?)(?=\n\*\*|$)/g
  let match
  while ((match = regex.exec(section)) !== null) {
    const question = match[1].trim()
    const answer = match[2].trim().replace(/\s+/g, ' ')
    if (question && answer) {
      faq.push({ question, answer })
    }
  }

  return faq
}

export function getFaqSchema(faq: { question: string; answer: string }[], url: string) {
  if (faq.length === 0) return null

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: answer,
      },
    })),
  }
}
