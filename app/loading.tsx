export default function Loading() {
  return (
    <div className="fixed inset-0 bg-background flex items-center justify-center z-50">
      <div className="text-center">
        <div className="w-8 h-0.5 bg-accent mx-auto mb-4 animate-pulse" />
        <p className="font-accent text-[10px] tracking-[0.3em] text-muted uppercase">
          Loading
        </p>
      </div>
    </div>
  )
}
