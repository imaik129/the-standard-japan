import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About',
  description: 'About The Standard Japan — the definitive English-language guide to contemporary Japan.',
}

export default function AboutPage() {
  return (
    <div className="pt-[calc(4rem+4.5rem)] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <div className="mb-16">
          <p className="font-accent text-[10px] tracking-[0.3em] text-accent uppercase mb-4">
            About Us
          </p>
          <h1 className="font-display text-5xl md:text-7xl font-bold text-content leading-tight mb-8">
            We cover the Japan
            <br />
            <span className="text-accent">nobody else does.</span>
          </h1>
          <div className="w-16 h-0.5 bg-accent" />
        </div>

        {/* Mission */}
        <div className="prose max-w-none mb-16">
          <p className="font-body text-xl text-gray-200 leading-[1.85] mb-6">
            The Standard Japan is the definitive English-language guide to contemporary Japan — not the cherry blossoms and bullet trains, but the izakayas at 2am, the Harajuku kids who never made it to the algorithm, the ramen shop with no sign, the architect nobody&apos;s written about yet.
          </p>
          <p className="font-body text-lg text-gray-300 leading-[1.85] mb-6">
            We launched because we were tired of the same ten recommendations being recycled across every travel blog, influencer account, and listicle. Tokyo is a city of 14 million people and infinite subcultures. It deserves better coverage.
          </p>
          <p className="font-body text-lg text-gray-300 leading-[1.85]">
            Our editorial team lives and works in Japan. We eat the food, go to the shows, know the neighborhoods. We write with authority because we live it — and we write with opinion because that&apos;s what good journalism requires.
          </p>
        </div>

        {/* Values */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {[
            {
              title: 'Knowing but not elitist.',
              desc: 'We know Japan deeply, but we never make you feel like an outsider for not knowing it yet.',
            },
            {
              title: 'Sophisticated but never stuffy.',
              desc: 'We take quality seriously. We don\'t take ourselves too seriously.',
            },
            {
              title: 'Global perspective, local soul.',
              desc: 'We write for an international readership, but our roots are firmly in Japanese culture.',
            },
            {
              title: 'No sponsored content. Ever.',
              desc: 'Our editorial is independent. We don\'t take money to cover anything.',
            },
          ].map((v) => (
            <div key={v.title} className="border border-border p-6 bg-surface/30">
              <div className="w-6 h-0.5 bg-accent mb-4" />
              <h3 className="font-display text-lg font-bold text-content mb-2">{v.title}</h3>
              <p className="font-body text-sm text-muted leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>

        {/* Categories */}
        <div className="border-t border-border pt-12 mb-16">
          <h2 className="font-display text-3xl font-bold text-content mb-6">What We Cover</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {['Culture', 'Food & Drink', 'Travel', 'Fashion', 'Art & Design', 'Music & Nightlife', 'Living', 'Tokyo Guide'].map((cat) => (
              <div key={cat} className="border border-border px-4 py-3 text-center">
                <p className="font-accent text-xs tracking-wider text-muted uppercase">{cat}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="border-t border-border pt-12">
          <h2 className="font-display text-3xl font-bold text-content mb-4">Get in Touch</h2>
          <p className="font-body text-muted mb-6">
            Pitches, press inquiries, tips, collaborations.
          </p>
          <a
            href="mailto:hello@thestandardjapan.com"
            className="inline-flex items-center gap-2 bg-accent text-white font-accent font-semibold text-sm tracking-widest uppercase px-8 py-4 hover:bg-red-700 transition-colors"
          >
            hello@thestandardjapan.com
          </a>

          <div className="mt-8">
            <Link
              href="/newsletter"
              className="font-accent text-sm text-muted hover:text-content transition-colors"
            >
              Subscribe to our newsletter →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
