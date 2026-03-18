'use client'

export default function ScrollIndicator() {
  const scrollToContent = () => {
    const hero = document.querySelector('section[class*="h-screen"]')
    if (hero) {
      const nextSection = hero.nextElementSibling
      nextSection?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <button
      onClick={scrollToContent}
      className="absolute bottom-8 right-8 hidden md:flex flex-col items-center gap-2 group cursor-pointer hover:opacity-80 transition-opacity"
      aria-label="Scroll to content"
    >
      <span
        className="font-accent text-[10px] tracking-widest text-muted uppercase group-hover:text-content transition-colors"
        style={{ writingMode: 'vertical-rl' }}
      >
        Scroll
      </span>
      <div className="w-px h-12 bg-gradient-to-b from-muted to-transparent group-hover:from-accent transition-colors" />
    </button>
  )
}
