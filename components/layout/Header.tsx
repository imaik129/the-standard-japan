'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Search } from 'lucide-react'
import { CATEGORIES } from '@/lib/categories'
import MobileMenu from './MobileMenu'

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-background/95 backdrop-blur-sm border-b border-border'
            : 'bg-transparent'
        }`}
      >
        {/* Top bar */}
        <div className="border-b border-border/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-8">
              <p className="font-accent text-[10px] tracking-widest text-muted uppercase">
                Tokyo&apos;s Underground, Unfiltered.
              </p>
              <div className="flex items-center gap-4">
                <Link href="/newsletter" className="font-accent text-[10px] tracking-widest text-muted uppercase hover:text-content transition-colors">
                  Newsletter
                </Link>
                <Link href="/about" className="font-accent text-[10px] tracking-widest text-muted uppercase hover:text-content transition-colors">
                  About
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Main header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <span className="font-display text-xl font-bold tracking-tight text-content">
                THE STANDARD JAPAN
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-6">
              {CATEGORIES.slice(0, 6).map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/${cat.slug}`}
                  className="font-accent text-xs tracking-wider text-muted uppercase hover:text-content transition-colors"
                >
                  {cat.name}
                </Link>
              ))}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-4">
              <button
                aria-label="Search"
                className="text-muted hover:text-content transition-colors"
              >
                <Search size={18} />
              </button>
              <Link
                href="/newsletter"
                className="hidden sm:inline-flex items-center bg-accent text-white font-accent text-xs tracking-widest uppercase px-4 py-2 hover:bg-red-700 transition-colors"
              >
                Subscribe
              </Link>
              <button
                onClick={() => setMobileOpen(true)}
                className="lg:hidden text-muted hover:text-content transition-colors"
                aria-label="Open menu"
              >
                <Menu size={22} />
              </button>
            </div>
          </div>
        </div>

        {/* Category nav strip */}
        <div className="hidden lg:block border-t border-border/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-8 h-9 overflow-x-auto scrollbar-hide">
              <Link
                href="/magazine"
                className="font-accent text-[11px] tracking-widest text-accent uppercase whitespace-nowrap hover:text-red-400 transition-colors"
              >
                All Stories
              </Link>
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/${cat.slug}`}
                  className="font-accent text-[11px] tracking-widest text-muted uppercase whitespace-nowrap hover:text-content transition-colors"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  )
}
