import type { EducationSectionId } from './education-catalog'

/** Default thumbnails when MDX cover is missing */
export const EDUCATION_SECTION_IMAGES: Record<EducationSectionId, string> = {
  'international-schools':
    'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80',
  preschool: 'https://images.unsplash.com/photo-1511895426328-dc871419eb0c?w=800&q=80',
  'city-guides': 'https://images.unsplash.com/photo-1545569341-9bbff18859ce?w=800&q=80',
  moving: 'https://images.unsplash.com/photo-1427504494781-a3fd09ac2b32?w=800&q=80',
  selection: 'https://images.unsplash.com/photo-1503676260728-1c00da280a02?w=800&q=80',
}

export const EDUCATION_HUB_HERO = {
  education: {
    ja: 'https://images.unsplash.com/photo-1545569341-9bbff18859ce?w=1600&q=85',
    en: 'https://images.unsplash.com/photo-1493976040374-85c8e412f188?w=1600&q=85',
  },
  kobe: {
    ja: 'https://images.unsplash.com/photo-1574263867127-a8d92288a124?w=1600&q=85',
    en: 'https://images.unsplash.com/photo-1574263867127-a8d92288a124?w=1600&q=85',
  },
}
