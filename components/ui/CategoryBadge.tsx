import Link from 'next/link'

const categoryColors: Record<string, string> = {
  culture: 'bg-purple-900/40 text-purple-300 border-purple-800/50',
  food: 'bg-orange-900/40 text-orange-300 border-orange-800/50',
  travel: 'bg-blue-900/40 text-blue-300 border-blue-800/50',
  fashion: 'bg-pink-900/40 text-pink-300 border-pink-800/50',
  art: 'bg-teal-900/40 text-teal-300 border-teal-800/50',
  music: 'bg-yellow-900/40 text-yellow-300 border-yellow-800/50',
  living: 'bg-green-900/40 text-green-300 border-green-800/50',
  guide: 'bg-red-900/40 text-red-300 border-red-800/50',
}

const categoryLabels: Record<string, string> = {
  culture: 'Culture',
  food: 'Food & Drink',
  travel: 'Travel',
  fashion: 'Fashion',
  art: 'Art & Design',
  music: 'Music & Nightlife',
  living: 'Living',
  guide: 'Tokyo Guide',
}

interface CategoryBadgeProps {
  category: string
  linked?: boolean
  size?: 'sm' | 'md'
}

export default function CategoryBadge({ category, linked = true, size = 'sm' }: CategoryBadgeProps) {
  const colorClass = categoryColors[category.toLowerCase()] || 'bg-gray-900/40 text-gray-300 border-gray-800/50'
  const label = categoryLabels[category.toLowerCase()] || category
  const sizeClass = size === 'sm' ? 'text-[10px] px-2 py-0.5' : 'text-xs px-3 py-1'

  const badge = (
    <span
      className={`inline-block font-accent font-medium tracking-widest uppercase border rounded-sm ${colorClass} ${sizeClass}`}
    >
      {label}
    </span>
  )

  if (linked) {
    return (
      <Link href={`/${category.toLowerCase()}`} className="hover:opacity-80 transition-opacity">
        {badge}
      </Link>
    )
  }

  return badge
}
