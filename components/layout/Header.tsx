'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, Search } from 'lucide-react'
import { CATEGORIES } from '@/lib/categories'
import MobileMenu from './MobileMenu'
import SearchModal from './SearchModal'

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setSearchOpen(true)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
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
            <Link href="/" className="flex-shrink-0 flex items-center gap-2">
              <Image
                src="/thestandardlogo.png"
                alt="The Standard Japan"
                width={40}
                height={40}
                className="object-contain"
                priority
              />
              <span className="font-display text-xl font-bold tracking-tight text-content hidden sm:inline">
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
                onClick={() => setSearchOpen(true)}
                aria-label="Search (⌘K)"
                className="flex items-center gap-1.5 text-muted hover:text-content transition-colors"
                title="Search (⌘K)"
              >
                <Search size={18} />
                <kbd className="hidden sm:inline font-mono text-[10px] px-1.5 py-0.5 rounded bg-black/40 border border-border/50">⌘K</kbd>
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
                href="/japan"
                className="font-accent text-[11px] tracking-widest text-accent uppercase whitespace-nowrap hover:text-red-400 transition-colors"
              >
                Japan Guide
              </Link>
              <Link
                href="/magazine"
                className="font-accent text-[11px] tracking-widest text-muted uppercase whitespace-nowrap hover:text-content transition-colors"
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
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
