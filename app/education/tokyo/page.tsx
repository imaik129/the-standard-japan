import { Metadata } from 'next'
import TokyoHubPage from '@/components/education/TokyoHubPage'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://thestandardjapan.com'

export const metadata: Metadata = {
  title: 'Tokyo Education Guide | International Schools & Family Guides',
  description:
    'Practical guides for international families in Tokyo — international schools, preschools, childcare, and family admin. Compare schools, childcare, and moving resources.',
  keywords: [
    'international schools Tokyo',
    'Tokyo international school',
    'ASIJ Tokyo',
    'BST Tokyo',
    'Nishimachi International School',
    'Seisen International School',
    'Tokyo preschool English',
    'hoikuen Tokyo',
    'moving to Tokyo with children',
    'Tokyo expat families education',
  ],
  alternates: {
    canonical: `${baseUrl}/education/tokyo`,
    languages: {
      en: `${baseUrl}/education/tokyo`,
      ja: `${baseUrl}/ja/education/tokyo`,
    },
  },
  openGraph: {
    title: 'Tokyo Education Guide | The Standard Japan',
    description:
      'International schools, preschools, and family guides for Tokyo.',
    url: `${baseUrl}/education/tokyo`,
    type: 'website',
  },
}

export default function TokyoEducationHubPage() {
  return <TokyoHubPage locale="en" />
}
