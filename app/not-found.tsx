import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="pt-[calc(4rem+4.5rem)] min-h-screen flex items-center justify-center">
      <div className="text-center max-w-lg mx-auto px-4">
        <p className="font-accent text-[10px] tracking-[0.3em] text-accent uppercase mb-4">
          404
        </p>
        <h1 className="font-display text-6xl font-bold text-content mb-6">
          Lost in Tokyo.
        </h1>
        <p className="font-body text-muted text-lg mb-8">
          This page doesn&apos;t exist — or maybe it never did. Try exploring the city instead.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="bg-accent text-white font-accent font-semibold text-sm tracking-widest uppercase px-8 py-4 hover:bg-red-700 transition-colors"
          >
            Back Home
          </Link>
          <Link
            href="/magazine"
            className="border border-border text-content font-accent font-semibold text-sm tracking-widest uppercase px-8 py-4 hover:border-content hover:bg-white/5 transition-all"
          >
            Read Stories
          </Link>
        </div>
      </div>
    </div>
  )
}
