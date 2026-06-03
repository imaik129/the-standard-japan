import { Metadata } from 'next'
import ContactForm from '@/components/ui/ContactForm'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://thestandardjapan.com'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with The Standard Japan — editorial pitches, press inquiries, collaborations, and general questions.',
  alternates: {
    canonical: `${baseUrl}/contact`,
  },
}

export default function ContactPage() {
  return (
    <div className="pt-[calc(4rem+4.5rem)] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

        <div className="mb-14">
          <p className="font-accent text-[10px] tracking-[0.3em] text-accent uppercase mb-4">
            Contact
          </p>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-content leading-tight mb-6">
            Get in Touch
          </h1>
          <div className="w-16 h-0.5 bg-accent mb-6" />
          <p className="font-body text-muted text-lg max-w-xl leading-relaxed">
            Pitches, press inquiries, collaborations, tips. We read everything — responses prioritised for editorial and press.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Form */}
          <div className="lg:col-span-2">
            <ContactForm />
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {[
              {
                title: 'Editorial Pitches',
                body: 'We consider freelance pitches from writers with Japan expertise. Include clips and a one-paragraph pitch.',
              },
              {
                title: 'Press & PR',
                body: 'For review requests, product placements, and press trips — note we do not accept payment for editorial coverage.',
              },
              {
                title: 'Collaborations',
                body: 'Brand partnerships, sponsored content, and events. All commercial content is clearly labelled.',
              },
              {
                title: 'Response Times',
                body: 'We aim to respond to relevant enquiries within 5 business days.',
              },
            ].map((item) => (
              <div key={item.title} className="border-l-2 border-accent pl-4">
                <h3 className="font-display text-sm font-bold text-content mb-1">{item.title}</h3>
                <p className="font-body text-xs text-muted leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
