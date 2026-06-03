import { Metadata } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://thestandardjapan.com'

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'Terms of Use for The Standard Japan.',
  alternates: { canonical: `${baseUrl}/terms` },
  robots: { index: false, follow: false },
}

export default function TermsPage() {
  return (
    <div className="pt-[calc(4rem+4.5rem)] min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <p className="font-accent text-[10px] tracking-[0.3em] text-accent uppercase mb-4">Legal</p>
        <h1 className="font-display text-4xl font-bold text-content mb-8">Terms of Use</h1>
        <p className="font-accent text-xs text-muted mb-10">Last updated: June 2026</p>

        <div className="space-y-10 font-body text-muted leading-relaxed">
          <section>
            <h2 className="font-display text-xl font-bold text-content mb-3">Use of content</h2>
            <p>All content on The Standard Japan — text, images, and other media — is copyright The Standard Japan unless otherwise stated. You may share links to articles. You may not reproduce, republish, or distribute content without written permission.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-content mb-3">Editorial independence</h2>
            <p>The Standard Japan maintains full editorial independence. We do not accept payment in exchange for editorial coverage. Any sponsored or commercial content is clearly labelled as such.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-content mb-3">Accuracy</h2>
            <p>We strive for accuracy in all content. Information about places, prices, and hours changes frequently — always verify details directly with the relevant venue or service before visiting. We accept no liability for outdated information.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-content mb-3">External links</h2>
            <p>We link to third-party websites for reference. We are not responsible for the content or practices of external sites.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-content mb-3">Changes</h2>
            <p>We may update these terms at any time. Continued use of the site constitutes acceptance of the current terms.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-content mb-3">Contact</h2>
            <p>Questions about these terms? Use our <a href="/contact" className="text-accent hover:underline">contact form</a>.</p>
          </section>
        </div>
      </div>
    </div>
  )
}
