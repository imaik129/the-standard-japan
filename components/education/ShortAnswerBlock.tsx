interface ShortAnswerBlockProps {
  text: string
  label?: string
}

export default function ShortAnswerBlock({ text, label = 'Short answer' }: ShortAnswerBlockProps) {
  return (
    <aside
      className="bg-edu-surface border border-edu-border rounded-lg p-6 my-8 shadow-sm"
      aria-label={label}
    >
      <p className="font-accent text-[10px] tracking-widest text-edu-accent uppercase mb-3">
        {label}
      </p>
      <p className="font-body text-[1.05rem] leading-relaxed text-edu-content">{text}</p>
    </aside>
  )
}
