'use client'

import { useState } from 'react'
import { ArrowRight, CheckCircle, Loader2 } from 'lucide-react'

const SUBJECTS = [
  'Editorial pitch',
  'Press inquiry',
  'Collaboration',
  'Advertising',
  'General question',
  'Other',
]

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()

      if (res.ok) {
        setStatus('success')
      } else {
        setStatus('error')
        setErrorMsg(data.error || 'Something went wrong. Please try again.')
      }
    } catch {
      setStatus('error')
      setErrorMsg('Something went wrong. Please try again.')
    }
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
        <CheckCircle size={40} className="text-green-400" />
        <h3 className="font-display text-2xl font-bold text-content">Message received.</h3>
        <p className="font-body text-muted">We read every message and will be in touch if relevant.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="font-accent text-[10px] tracking-widest text-muted uppercase block mb-2">
            Name *
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="Your name"
            className="w-full bg-black/40 border border-border px-4 py-3 text-content placeholder:text-muted focus:outline-none focus:border-accent transition-colors font-body text-sm"
          />
        </div>
        <div>
          <label className="font-accent text-[10px] tracking-widest text-muted uppercase block mb-2">
            Email *
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="your@email.com"
            className="w-full bg-black/40 border border-border px-4 py-3 text-content placeholder:text-muted focus:outline-none focus:border-accent transition-colors font-body text-sm"
          />
        </div>
      </div>

      <div>
        <label className="font-accent text-[10px] tracking-widest text-muted uppercase block mb-2">
          Subject
        </label>
        <select
          name="subject"
          value={form.subject}
          onChange={handleChange}
          className="w-full bg-black/40 border border-border px-4 py-3 text-content focus:outline-none focus:border-accent transition-colors font-body text-sm appearance-none"
        >
          <option value="">Select a topic</option>
          {SUBJECTS.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="font-accent text-[10px] tracking-widest text-muted uppercase block mb-2">
          Message *
        </label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          required
          rows={6}
          placeholder="What's on your mind?"
          className="w-full bg-black/40 border border-border px-4 py-3 text-content placeholder:text-muted focus:outline-none focus:border-accent transition-colors font-body text-sm resize-none"
        />
      </div>

      {status === 'error' && (
        <p className="text-red-400 text-sm font-accent">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="group flex items-center gap-2 bg-accent text-white px-8 py-4 font-accent font-semibold text-sm tracking-widest uppercase hover:bg-red-700 transition-colors disabled:opacity-50"
      >
        {status === 'loading' ? (
          <Loader2 size={16} className="animate-spin" />
        ) : (
          <>
            Send Message
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </>
        )}
      </button>
    </form>
  )
}
