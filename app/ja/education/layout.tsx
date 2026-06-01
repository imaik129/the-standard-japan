import { Noto_Sans_JP } from 'next/font/google'

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-noto-sans-jp',
  display: 'swap',
})

export default function JaEducationLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`education-section education-ja bg-edu-background ${notoSansJP.variable}`}
      lang="ja"
    >
      {children}
    </div>
  )
}
