'use client'

import { useState, useEffect } from 'react'

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const updateProgress = () => {
      const article = document.querySelector('article')
      if (!article) return

      const { top, height } = article.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const scrollableHeight = height - windowHeight

      if (scrollableHeight <= 0) {
        setProgress(100)
        return
      }

      const scrolled = -top
      const percent = Math.min(100, Math.max(0, (scrolled / scrollableHeight) * 100))
      setProgress(percent)
    }

    window.addEventListener('scroll', updateProgress, { passive: true })
    updateProgress()
    return () => window.removeEventListener('scroll', updateProgress)
  }, [])

  return (
    <div
      className="fixed top-0 left-0 right-0 h-0.5 bg-accent z-[60] origin-left"
      style={{ transform: `scaleX(${progress / 100})` }}
      aria-hidden
    />
  )
}
