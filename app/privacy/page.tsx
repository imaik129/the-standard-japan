import { Metadata } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://thestandardjapan.com'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for The Standard Japan.',
  alternates: { canonical: `${baseUrl}/privacy` },
  robots: { index: false, follow: false },
}

export default function PrivacyPage() {
  return (
    <div className="pt-[calc(4rem+4.5rem)] min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <p className="font-accent text-[10px] tracking-[0.3em] text-accent uppercase mb-4">Legal</p>
        <h1 className="font-display text-4xl font-bold text-content mb-8">Privacy Policy</h1>
        <p className="font-accent text-xs text-muted mb-10">Last updated: June 2026</p>

        <div className="space-y-10 font-body text-muted leading-relaxed">
          <section>
            <h2 className="font-display text-xl font-bold text-content mb-3">What we collect</h2>
            <p>When you subscribe to our newsletter, we collect your email address. When you submit a contact form, we collect your name, email address, and message. We do not collect any other personal information.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-content mb-3">How we use it</h2>
            <p>Your email address is used solely to send you our newsletter (if subscribed) or to respond to your enquiry (if via contact form). We do not sell, share, or rent your information to any third party.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-content mb-3">Cookies</h2>
            <p>This site uses no tracking cookies. We use Vercel Analytics for anonymous, aggregated page view data that does not identify individual users.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-content mb-3">Data storage</h2>
            <p>Subscriber and contact data is stored in a Neon PostgreSQL database hosted on infrastructure in the Asia-Pacific region. Data is retained until you request deletion.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-content mb-3">Your rights</h2>
            <p>You can unsubscribe from the newsletter at any time via the unsubscribe link in any email. To request deletion of your data, contact us via the <a href="/contact" className="text-accent hover:underline">contact form</a>.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-content mb-3">Contact</h2>
            <p>For privacy-related questions, use our <a href="/contact" className="text-accent hover:underline">contact form</a>.</p>
          </section>
        </div>
      </div>
    </div>
  )
}
