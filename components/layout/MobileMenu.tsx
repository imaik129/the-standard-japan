'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { X } from 'lucide-react'
import { CATEGORIES } from '@/lib/categories'

interface MobileMenuProps {
  open: boolean
  onClose: () => void
}

export default function MobileMenu({ open, onClose }: MobileMenuProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[100] lg:hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="absolute right-0 top-0 bottom-0 w-80 bg-surface border-l border-border flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <Link href="/" onClick={onClose} className="flex items-center gap-2">
            <Image
              src="/thestandardlogo.png"
              alt="The Standard Japan"
              width={28}
              height={28}
              className="object-contain"
            />
            <span className="font-display text-lg font-bold">THE STANDARD JAPAN</span>
          </Link>
          <button
            onClick={onClose}
            className="text-muted hover:text-content transition-colors"
            aria-label="Close menu"
          >
            <X size={22} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-6">
          <div className="mb-6">
            <p className="font-accent text-[10px] tracking-widest text-muted uppercase mb-3">
              Sections
            </p>
            <ul className="space-y-1">
              <li>
                <Link
                  href="/japan"
                  onClick={onClose}
                  className="block font-accent text-sm tracking-wider text-content py-2 border-b border-border/30 hover:text-accent transition-colors"
                >
                  Japan Guide
                </Link>
              </li>
              <li>
                <Link
                  href="/magazine"
                  onClick={onClose}
                  className="block font-accent text-sm tracking-wider text-content py-2 border-b border-border/30 hover:text-accent transition-colors"
                >
                  All Stories
                </Link>
              </li>
              <li>
                <Link
                  href="/search"
                  onClick={onClose}
                  className="block font-accent text-sm tracking-wider text-content py-2 border-b border-border/30 hover:text-accent transition-colors"
                >
                  Search
                </Link>
              </li>
              {CATEGORIES.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/${cat.slug}`}
                    onClick={onClose}
                    className="block font-accent text-sm tracking-wider text-content py-2 border-b border-border/30 hover:text-accent transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-6">
            <p className="font-accent text-[10px] tracking-widest text-muted uppercase mb-3">
              More
            </p>
            <ul className="space-y-1">
              <li>
                <Link href="/about" onClick={onClose} className="block font-accent text-sm tracking-wider text-muted py-2 border-b border-border/30 hover:text-content transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/newsletter" onClick={onClose} className="block font-accent text-sm tracking-wider text-muted py-2 border-b border-border/30 hover:text-content transition-colors">
                  Newsletter
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        {/* Subscribe CTA */}
        <div className="p-6 border-t border-border">
          <Link
            href="/newsletter"
            onClick={onClose}
            className="block w-full bg-accent text-white text-center font-accent text-sm tracking-widest uppercase py-3 hover:bg-red-700 transition-colors"
          >
            Subscribe to Newsletter
          </Link>
        </div>
      </div>
    </div>
  )
}
