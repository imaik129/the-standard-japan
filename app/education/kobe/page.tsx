import { Metadata } from 'next'
import KobeHubPage from '@/components/education/KobeHubPage'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://thestandardjapan.com'

export const metadata: Metadata = {
  title: 'Kobe & Kansai Education Guide | International Schools & Preschools',
  description:
    'All guides for international schools and English preschools in Kobe, Rokko Island, Ashiya, and Nishinomiya — for families researching education in Kansai.',
  alternates: {
    canonical: `${baseUrl}/education/kobe`,
    languages: {
      en: `${baseUrl}/education/kobe`,
      ja: `${baseUrl}/ja/education/kobe`,
    },
  },
}

export default function KobeEducationHubPage() {
  return <KobeHubPage locale="en" />
}
