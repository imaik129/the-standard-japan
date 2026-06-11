import type { EducationSectionId } from './education-catalog'

/** Default thumbnails when MDX cover is missing */
export const EDUCATION_SECTION_IMAGES: Record<EducationSectionId, string> = {
  'international-schools':
    'https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80',
  preschool: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=800&q=80',
  'city-guides': 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800&q=80',
  moving: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80',
  selection: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80',
}

export const EDUCATION_HUB_HERO = {
  education: {
    ja: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=1600&q=85',
    en: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1600&q=85',
  },
  kobe: {
    ja: 'https://images.unsplash.com/photo-1480796927426-f609979314bd?w=1600&q=85',
    en: 'https://images.unsplash.com/photo-1480796927426-f609979314bd?w=1600&q=85',
  },
  tokyo: {
    ja: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1600&q=85',
    en: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1600&q=85',
  },
}
