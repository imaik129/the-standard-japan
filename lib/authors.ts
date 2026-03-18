export interface Author {
  slug: string
  name: string
  role: string
  image?: string
  bio: string
  background: string
  expertise: string
  location: string
  yearsInJapan?: string
  twitter?: string
  instagram?: string
}

export const AUTHORS: Author[] = [
  {
    slug: 'yuki-tanaka',
    name: 'Yuki Tanaka',
    role: 'Culture & Food Editor',
    bio: 'Born and raised in Tokyo. Writes about the city most tourists never see.',
    background: 'Grew up in Shibuya, 1988–2006. Moved to NYC for university, returned to Tokyo in 2012. Has lived in Shimokitazawa, Nakameguro, and now Yoyogi.',
    expertise: 'Japanese convenience store culture, izakaya etiquette, Tokyo neighborhoods, daily life',
    location: 'Tokyo',
    yearsInJapan: '26 years',
  },
  {
    slug: 'james-chen',
    name: 'James Chen',
    role: 'Food & Drink Writer',
    bio: 'Former chef. Now eats his way through Tokyo and writes about it.',
    background: 'Moved to Tokyo from San Francisco in 2016. Worked in kitchens in both cities before switching to food journalism. Lives in Nakameguro.',
    expertise: 'Ramen, izakaya, Tokyo restaurants, food culture',
    location: 'Tokyo',
    yearsInJapan: '8 years',
  },
  {
    slug: 'maya-yamamoto',
    name: 'Maya Yamamoto',
    role: 'Fashion & Culture Writer',
    bio: 'Harajuku kid who never left. Covers street fashion and underground culture.',
    background: 'Grew up in Saitama, moved to Harajuku at 18. Been documenting street fashion and youth culture since 2015.',
    expertise: 'Harajuku fashion, Japanese streetwear, underground culture, vintage',
    location: 'Tokyo',
    yearsInJapan: '28 years',
  },
  {
    slug: 'alex-rivera',
    name: 'Alex Rivera',
    role: 'Travel & Living Editor',
    bio: 'Expat guide. Helps people actually move to and navigate Japan.',
    background: 'Moved from London to Tokyo in 2018. Went through the full gaijin experience—visa, housing, banking, the works. Now writes the guide he wished he had.',
    expertise: 'Moving to Tokyo, expat life, travel, Kyoto vs Tokyo, onsen',
    location: 'Tokyo',
    yearsInJapan: '6 years',
  },
  {
    slug: 'emma-foster',
    name: 'Emma Foster',
    role: 'Art & Nightlife Writer',
    bio: 'Gallery hopper by day, jazz bar regular by night.',
    background: 'Moved from Melbourne in 2019. Art history degree, jazz obsession. Covers Tokyo\'s art scene and late-night venues.',
    expertise: 'Tokyo galleries, jazz bars, art scene, music venues',
    location: 'Tokyo',
    yearsInJapan: '5 years',
  },
  {
    slug: 'the-standard-japan',
    name: 'The Standard Japan',
    role: 'Editorial Team',
    bio: 'The collective voice of The Standard Japan. Our team lives in Tokyo and writes with authority because we live it.',
    background: 'Founded in 2024. Our editors and contributors are based across Tokyo—from Shinjuku to Shimokitazawa.',
    expertise: 'Japan culture, food, fashion, travel, living',
    location: 'Tokyo',
    yearsInJapan: 'Various',
  },
]

export function getAuthorBySlug(slug: string): Author | undefined {
  return AUTHORS.find((a) => a.slug === slug)
}

export function getAuthorBySlugOrName(authorField: string): Author | null {
  const bySlug = getAuthorBySlug(authorField)
  if (bySlug) return bySlug
  const byName = AUTHORS.find((a) => a.name === authorField)
  if (byName) return byName
  return null
}

export function getArticlesByAuthor<T extends { author: string }>(
  slug: string,
  allArticles: T[]
): T[] {
  const author = getAuthorBySlug(slug)
  if (!author) return []
  return allArticles.filter(
    (a) => a.author === slug || a.author === author.name
  )
}
