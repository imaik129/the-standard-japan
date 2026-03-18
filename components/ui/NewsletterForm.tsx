'use client'

import { useState } from 'react'
import { ArrowRight, CheckCircle, Loader2 } from 'lucide-react'

interface NewsletterFormProps {
  variant?: 'default' | 'minimal' | 'banner'
  placeholder?: string
}

export default function NewsletterForm({
  variant = 'default',
  placeholder = 'your@email.com',
}: NewsletterFormProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setStatus('loading')
    setMessage('')

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await res.json()

      if (res.ok) {
        setStatus('success')
        setMessage(data.message || 'You\'re in. Welcome to The Standard.')
        setEmail('')
      } else {
        setStatus('error')
        setMessage(data.error || 'Something went wrong. Please try again.')
      }
    } catch {
      setStatus('error')
      setMessage('Something went wrong. Please try again.')
    }
  }

  if (status === 'success') {
    return (
      <div className="flex items-center gap-3 text-green-400">
        <CheckCircle size={20} />
        <span className="font-accent text-sm">{message}</span>
      </div>
    )
  }

  if (variant === 'minimal') {
    return (
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <div className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={placeholder}
            required
            className="flex-1 bg-surface border border-border px-3 py-2 text-sm text-content placeholder:text-muted focus:outline-none focus:border-accent transition-colors"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="bg-accent text-white px-4 py-2 text-sm font-accent font-semibold hover:bg-red-700 transition-colors disabled:opacity-50"
          >
            {status === 'loading' ? <Loader2 size={16} className="animate-spin" /> : 'GO'}
          </button>
        </div>
        {status === 'error' && (
          <p className="text-red-400 text-xs font-accent">{message}</p>
        )}
      </form>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder}
          required
          className="flex-1 bg-black/40 border border-border px-4 py-3 text-content placeholder:text-muted focus:outline-none focus:border-accent transition-colors font-body text-sm"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="group flex items-center justify-center gap-2 bg-accent text-white px-8 py-3 font-accent font-semibold text-sm tracking-widest uppercase hover:bg-red-700 transition-colors disabled:opacity-50 whitespace-nowrap"
        >
          {status === 'loading' ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <>
              Subscribe
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </div>
      {status === 'error' && (
        <p className="text-red-400 text-xs font-accent mt-2">{message}</p>
      )}
    </form>
  )
}
