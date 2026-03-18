import Link from 'next/link'
import Image from 'next/image'
import { CATEGORIES } from '@/lib/categories'
import NewsletterForm from '@/components/ui/NewsletterForm'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-surface border-t border-border mt-20">
      {/* Newsletter strip */}
      <div className="border-b border-border bg-surface-elevated">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <p className="font-accent text-[10px] tracking-widest text-accent uppercase mb-2">
                The Standard Newsletter
              </p>
              <h3 className="font-display text-2xl font-bold text-content">
                Tokyo in your inbox. Weekly.
              </h3>
              <p className="text-muted text-sm mt-1 font-body">
                No algorithms. No sponsored content. Just the real Tokyo.
              </p>
            </div>
            <div className="w-full md:w-96">
              <NewsletterForm variant="minimal" />
            </div>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-3">
              <Image
                src="/thestandardlogo.png"
                alt="The Standard Japan"
                width={32}
                height={32}
                className="object-contain"
              />
              <span className="font-display text-lg font-bold text-content">
                THE STANDARD JAPAN
              </span>
            </Link>
            <p className="text-muted text-xs font-body leading-relaxed">
              The definitive English-language guide to Japan. Culture, food, fashion, art, nightlife — the real Tokyo, unfiltered. Your go-to resource for everything Japan.
            </p>
          </div>

          {/* Sections */}
          <div>
            <p className="font-accent text-[10px] tracking-widest text-muted uppercase mb-4">
              Sections
            </p>
            <ul className="space-y-2">
              {CATEGORIES.slice(0, 4).map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/${cat.slug}`}
                    className="font-accent text-xs text-muted hover:text-content transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-accent text-[10px] tracking-widest text-muted uppercase mb-4">
              &nbsp;
            </p>
            <ul className="space-y-2 mt-0">
              {CATEGORIES.slice(4).map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/${cat.slug}`}
                    className="font-accent text-xs text-muted hover:text-content transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="font-accent text-[10px] tracking-widest text-muted uppercase mb-4">
              Company
            </p>
            <ul className="space-y-2">
              <li>
                <Link href="/japan" className="font-accent text-xs text-muted hover:text-content transition-colors">
                  Japan Guide
                </Link>
              </li>
              <li>
                <Link href="/about" className="font-accent text-xs text-muted hover:text-content transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/authors" className="font-accent text-xs text-muted hover:text-content transition-colors">
                  Writers
                </Link>
              </li>
              <li>
                <Link href="/newsletter" className="font-accent text-xs text-muted hover:text-content transition-colors">
                  Newsletter
                </Link>
              </li>
              <li>
                <Link href="/magazine" className="font-accent text-xs text-muted hover:text-content transition-colors">
                  Magazine
                </Link>
              </li>
              <li>
                <Link href="/search" className="font-accent text-xs text-muted hover:text-content transition-colors">
                  Search
                </Link>
              </li>
              <li>
                <a
                  href="mailto:hello@thestandardjapan.com"
                  className="font-accent text-xs text-muted hover:text-content transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-accent text-[11px] text-muted tracking-wider">
            © {currentYear} The Standard Japan. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="https://twitter.com/thestandardjapan"
              target="_blank"
              rel="noopener noreferrer"
              className="font-accent text-[11px] text-muted hover:text-content transition-colors tracking-wider"
            >
              Twitter
            </a>
            <a
              href="https://tiktok.com/@thestandardjapan"
              target="_blank"
              rel="noopener noreferrer"
              className="font-accent text-[11px] text-muted hover:text-content transition-colors tracking-wider"
            >
              TikTok
            </a>
            <a
              href="https://instagram.com/thestandardjapan"
              target="_blank"
              rel="noopener noreferrer"
              className="font-accent text-[11px] text-muted hover:text-content transition-colors tracking-wider"
            >
              Instagram
            </a>
            <a
              href="/feed"
              className="font-accent text-[11px] text-muted hover:text-content transition-colors tracking-wider"
            >
              RSS
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
