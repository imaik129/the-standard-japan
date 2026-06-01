import Image from 'next/image'
import type { EducationLocale } from '@/lib/education-catalog'

interface EducationHeroProps {
  src: string
  alt: string
  locale: EducationLocale
  caption?: string
}

export default function EducationHero({ src, alt, locale, caption }: EducationHeroProps) {
  if (locale === 'ja') {
    return (
      <div className="relative w-full mb-12 rounded-xl overflow-hidden border border-edu-ja-border shadow-sm">
        <div className="relative aspect-[2.4/1] md:aspect-[2.8/1] max-h-[420px]">
          <Image src={src} alt={alt} fill className="object-cover" priority sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
        </div>
        {caption && (
          <p className="absolute bottom-0 left-0 right-0 px-4 py-3 text-sm text-white/95 bg-black/40 backdrop-blur-sm">
            {caption}
          </p>
        )}
      </div>
    )
  }

  return (
    <div className="relative w-full aspect-[21/9] max-h-[400px] rounded-lg overflow-hidden mb-12 border border-edu-border">
      <Image src={src} alt={alt} fill className="object-cover" priority sizes="(max-width: 1280px) 100vw, 1280px" />
    </div>
  )
}
