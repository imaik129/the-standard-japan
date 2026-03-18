'use client'

import AnimatedSection from '@/components/ui/AnimatedSection'
import ArticleCard from '@/components/article/ArticleCard'
import { ArticleFrontmatter } from '@/lib/mdx'

interface AnimatedArticleCardProps {
  article: ArticleFrontmatter
  variant?: 'default' | 'large' | 'horizontal' | 'minimal'
  delay?: number
}

export default function AnimatedArticleCard({
  article,
  variant = 'default',
  delay = 0,
}: AnimatedArticleCardProps) {
  return (
    <AnimatedSection delay={delay} direction="up">
      <ArticleCard article={article} variant={variant} />
    </AnimatedSection>
  )
}
