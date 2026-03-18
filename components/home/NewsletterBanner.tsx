import NewsletterForm from '@/components/ui/NewsletterForm'

export default function NewsletterBanner() {
  return (
    <section className="relative overflow-hidden bg-surface-elevated border-y border-border my-16">
      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, #C8102E, #C8102E 1px, transparent 1px, transparent 40px), repeating-linear-gradient(90deg, #C8102E, #C8102E 1px, transparent 1px, transparent 40px)',
        }}
      />

      {/* Accent bar */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="font-accent text-[10px] tracking-[0.3em] text-accent uppercase mb-4">
              The Standard Newsletter
            </p>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-content leading-tight mb-4">
              Tokyo in your inbox.
              <span className="text-accent"> Weekly.</span>
            </h2>
            <p className="font-body text-muted text-lg leading-relaxed max-w-lg">
              No algorithms curating your culture. No sponsored content disguised as journalism. Just the real Tokyo — the izakayas at 2am, the Harajuku kids who never made it to the algorithm, the ramen shop with no sign.
            </p>

            <div className="flex items-center gap-6 mt-6">
              <div className="text-center">
                <p className="font-display text-2xl font-bold text-content">8K+</p>
                <p className="font-accent text-[10px] text-muted tracking-widest uppercase">Subscribers</p>
              </div>
              <div className="w-px h-10 bg-border" />
              <div className="text-center">
                <p className="font-display text-2xl font-bold text-content">Weekly</p>
                <p className="font-accent text-[10px] text-muted tracking-widest uppercase">Editions</p>
              </div>
              <div className="w-px h-10 bg-border" />
              <div className="text-center">
                <p className="font-display text-2xl font-bold text-content">Free</p>
                <p className="font-accent text-[10px] text-muted tracking-widest uppercase">Always</p>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-background/60 border border-border p-8">
              <h3 className="font-display text-xl font-bold text-content mb-2">
                Join the underground.
              </h3>
              <p className="font-body text-sm text-muted mb-6">
                One email a week. Unsubscribe anytime.
              </p>
              <NewsletterForm />
              <p className="font-accent text-[10px] text-muted mt-4 tracking-wide">
                No spam. No sharing your data. Tokyo only.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
