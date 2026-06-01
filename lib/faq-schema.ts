/**
 * Extracts FAQ Q&A pairs from MDX content.
 * Supports:
 * - ## FAQ / ## よくある質問
 * - **Question?** on its own line, answer on following lines
 * - **Question?** Answer on the same line (common in JA guides)
 */
const FAQ_HEADING_PATTERN = /## (?:FAQ|よくある質問)\s+([\s\S]*?)(?=\n## |$)/i

export function extractFaqFromContent(content: string): { question: string; answer: string }[] {
  const faq: { question: string; answer: string }[] = []
  const faqSection = content.match(FAQ_HEADING_PATTERN)
  if (!faqSection) return faq

  const section = faqSection[1].trim()
  const lines = section.split('\n')

  let i = 0
  while (i < lines.length) {
    const line = lines[i].trim()
    if (!line) {
      i++
      continue
    }

    const inlineMatch = line.match(/^\*\*(.+?)\*\*\s*(.*)$/)
    if (inlineMatch) {
      const question = inlineMatch[1].trim()
      let answer = inlineMatch[2].trim()

      if (!answer) {
        const answerParts: string[] = []
        i++
        while (i < lines.length) {
          const next = lines[i].trim()
          if (!next) {
            i++
            continue
          }
          if (next.startsWith('**') && next.includes('**')) break
          answerParts.push(next)
          i++
        }
        answer = answerParts.join(' ').trim()
      } else {
        i++
      }

      if (question && answer) {
        faq.push({ question, answer })
      }
      continue
    }

    i++
  }

  return faq
}

export function getFaqSchema(faq: { question: string; answer: string }[], url: string) {
  if (faq.length === 0) return null

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${url}#faq`,
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
