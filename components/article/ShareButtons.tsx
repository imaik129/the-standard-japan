'use client'

import { useState } from 'react'
import { Twitter, Link2, Check } from 'lucide-react'

interface ShareButtonsProps {
  title: string
  url: string
}

export default function ShareButtons({ title, url }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)

  const shareUrl = typeof window !== 'undefined' ? window.location.href : url
  const twitterText = `"${title}" — The Standard Japan`

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback for older browsers
      const input = document.createElement('input')
      input.value = shareUrl
      document.body.appendChild(input)
      input.select()
      document.execCommand('copy')
      document.body.removeChild(input)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="flex items-center gap-2">
      <span className="font-accent text-[10px] tracking-widest text-muted uppercase mr-2">
        Share
      </span>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(twitterText)}&url=${encodeURIComponent(shareUrl)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 text-muted hover:text-accent transition-colors"
        aria-label="Share on X (Twitter)"
      >
        <Twitter size={18} />
      </a>
      <button
        onClick={handleCopy}
        className="p-2 text-muted hover:text-accent transition-colors"
        aria-label="Copy link"
      >
        {copied ? (
          <Check size={18} className="text-green-500" />
        ) : (
          <Link2 size={18} />
        )}
      </button>
    </div>
  )
}
