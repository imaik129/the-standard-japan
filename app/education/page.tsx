import { Metadata } from 'next'
import EducationHubPage from '@/components/education/EducationHubPage'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://thestandardjapan.com'

export const metadata: Metadata = {
  title: 'Education in Japan: International Schools, Preschools, and Family Guides',
  description:
    'A practical guide for international and Japanese families exploring international schools, English preschools, bilingual education, and family-friendly areas in Japan.',
  keywords: [
    'international schools Japan',
    'international schools Tokyo',
    'international schools Kobe',
    'international schools Osaka',
    'international preschool Kobe',
    'English preschool Kobe',
    'best preschools Kobe',
    'Canadian Academy preschool',
    'Rokko Island preschool',
    'international schools near Ashiya',
    'international schools near Nishinomiya',
    'international school guide Japan',
    'preschool before international school Japan',
  ],
  alternates: {
    canonical: `${baseUrl}/education`,
    languages: {
      en: `${baseUrl}/education`,
      ja: `${baseUrl}/ja/education`,
    },
  },
  openGraph: {
    title: 'Education in Japan | The Standard Japan',
    description:
      'International schools, English preschools, and family guides for Tokyo, Kobe, Osaka, and Kansai.',
    url: `${baseUrl}/education`,
    type: 'website',
  },
}

export default function EducationPage() {
  return <EducationHubPage locale="en" />
}
