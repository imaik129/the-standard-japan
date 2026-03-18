import { getAllArticles } from '@/lib/mdx'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://thestandardjapan.com'

export async function GET() {
  const articles = getAllArticles()

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>The Standard Japan</title>
    <link>${SITE_URL}</link>
    <description>Tokyo's Underground, Unfiltered. Culture, food, fashion, art, nightlife — the real Tokyo.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed" rel="self" type="application/rss+xml"/>
    ${articles
      .map(
        (article) => `
    <item>
      <title><![CDATA[${article.title}]]></title>
      <link>${SITE_URL}/${article.category}/${article.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/${article.category}/${article.slug}</guid>
      <description><![CDATA[${article.excerpt}]]></description>
      <pubDate>${new Date(article.publishedAt).toUTCString()}</pubDate>
      <category>${article.category}</category>
    </item>`
      )
      .join('')}
  </channel>
</rss>`

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
