import { Metadata } from 'next'
import NewsletterForm from '@/components/ui/NewsletterForm'

export const metadata: Metadata = {
  title: 'Newsletter',
  description: 'Subscribe to The Standard Japan newsletter — Tokyo culture, food, and nightlife in your inbox weekly.',
}

export default function NewsletterPage() {
  return (
    <div className="pt-[calc(4rem+4.5rem)] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[60vh]">
          {/* Left */}
          <div>
            <p className="font-accent text-[10px] tracking-[0.3em] text-accent uppercase mb-6">
              The Standard Newsletter
            </p>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-content leading-[1.05] mb-6">
              Tokyo in your inbox.
              <br />
              <span className="text-accent">Weekly.</span>
            </h1>
            <p className="font-body text-muted text-xl leading-relaxed mb-8 max-w-lg">
              No algorithms curating your culture. No sponsored content disguised as journalism. Just the real Tokyo — the izakayas at 2am, the galleries nobody is writing about yet, the ramen shop with no sign.
            </p>

            {/* What to expect */}
            <div className="space-y-4 mb-8">
              {[
                'One email, every Friday',
                'The week\'s best Tokyo stories',
                'Insider picks — food, art, nightlife',
                'Never sponsored, never algorithm-driven',
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0" />
                  <p className="font-body text-muted">{item}</p>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="flex items-center gap-8 pt-6 border-t border-border">
              <div>
                <p className="font-display text-3xl font-bold text-content">8K+</p>
                <p className="font-accent text-[10px] text-muted tracking-widest uppercase mt-1">Subscribers</p>
              </div>
              <div className="w-px h-12 bg-border" />
              <div>
                <p className="font-display text-3xl font-bold text-content">52</p>
                <p className="font-accent text-[10px] text-muted tracking-widest uppercase mt-1">Issues / Year</p>
              </div>
              <div className="w-px h-12 bg-border" />
              <div>
                <p className="font-display text-3xl font-bold text-accent">Free</p>
                <p className="font-accent text-[10px] text-muted tracking-widest uppercase mt-1">Always</p>
              </div>
            </div>
          </div>

          {/* Right — Form */}
          <div>
            <div className="bg-surface border border-border p-8 lg:p-10">
              <div className="mb-6">
                <div className="w-8 h-0.5 bg-accent mb-4" />
                <h2 className="font-display text-2xl font-bold text-content mb-2">
                  Join the underground.
                </h2>
                <p className="font-body text-muted text-sm">
                  One email a week. Unsubscribe anytime. No spam, ever.
                </p>
              </div>

              <NewsletterForm />

              <p className="font-accent text-[10px] text-muted mt-6 tracking-wide leading-relaxed">
                By subscribing, you agree to receive our weekly newsletter. We respect your privacy and will never share your information.
              </p>
            </div>

            {/* Testimonials */}
            <div className="mt-6 space-y-4">
              {[
                { quote: 'The only Japan newsletter I actually read every week.', author: 'Tokyo expat, 4 years' },
                { quote: 'Finally, someone covering the Japan that actually exists.', author: 'Subscriber since 2023' },
              ].map((t) => (
                <div key={t.author} className="border border-border p-4 bg-surface/50">
                  <p className="font-body text-sm text-muted italic mb-2">&quot;{t.quote}&quot;</p>
                  <p className="font-accent text-[10px] text-muted tracking-widest uppercase">— {t.author}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
