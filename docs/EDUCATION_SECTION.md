# Education in Japan — Section Architecture

The Standard Japan **Education Guide** is a bilingual (EN/JA) editorial section for families exploring international schools, English preschools, and education pathways in Japan.

**Section name:** Education in Japan  
**URLs:** `/education` (English) · `/ja/education` (Japanese)

---

## 1. Section architecture

```
/education                          → Hub (EN)
/education/[slug]                   → Article (EN)

/ja/education                       → Hub (JA)
/ja/education/[slug]                → Article (JA)
```

**Content files:**

```
content/education/en/*.mdx
content/education/ja/*.mdx
```

**Libraries:**

| File | Purpose |
|------|---------|
| `lib/education-catalog.ts` | Full article list, sections, publish flags |
| `lib/education.ts` | MDX loader, paths, related articles |
| `lib/education-schema.ts` | Article + breadcrumb JSON-LD |
| `lib/faq-schema.ts` | FAQ extraction (`## FAQ` or `## よくある質問`) |

**UI:**

| Component | Purpose |
|-----------|---------|
| `EducationHubPage` | Landing page |
| `EducationArticleLayout` | Article template (short answer, TOC, schema) |
| `EducationCard` | Hub card grid |
| `ShortAnswerBlock` | AEO summary block |
| `LanguageSwitcher` | EN ↔ JA |

**Design:** Light editorial theme (`edu-*` Tailwind colors) — distinct from main magazine dark theme, still on-brand.

---

## 2. Article catalog & SEO metadata

| Slug | EN title | Status |
|------|----------|--------|
| `best-international-schools-japan` | Best International Schools in Japan | Planned |
| `best-international-schools-tokyo` | Best International Schools in Tokyo | Planned |
| `best-international-schools-kobe` | Best International Schools in Kobe | **Live** |
| `best-international-schools-osaka` | Best International Schools in Osaka | Planned |
| `best-international-preschools-kobe` | Best International Preschools in Kobe | **Live** |
| `best-preschools-kobe` | Best Preschools in Kobe | Planned |
| `preschool-before-canadian-academy` | Preschool Before Canadian Academy | **Live** |
| `moving-to-kobe-international-schools` | Moving to Kobe with Children | Planned |
| `rokko-island-family-guide` | Rokko Island Family Guide | Planned |
| `international-school-vs-japanese-school` | International vs Japanese School | Planned |
| `english-preschool-vs-english-conversation-school` | English Preschool vs Eikaiwa | Planned |
| `how-to-choose-international-school-japan` | How to Choose an International School | Planned |

Meta descriptions and Japanese titles live in `lib/education-catalog.ts` and each article’s frontmatter.

---

## 3. Article template (MDX frontmatter)

```yaml
title: "..."
slug: best-international-preschools-kobe
locale: en | ja
excerpt: "..."
metaDescription: "..."
shortAnswer: "Short answer: ..."  # or 要約：...
section: preschool | international-schools | city-guides | moving | selection
coverImage: "https://..."
author: education-editorial
publishedAt: "2026-05-20"
updatedAt: "2026-05-20"
readTime: 12
featured: true
tags: [...]
```

**Body structure:**

1. `## Table of Contents` / `## 目次` (optional)
2. H2 sections with specific, searchable headings
3. Comparison tables where useful
4. “Who this is best for” / balanced Peter Pan mentions (Kobe articles only)
5. `## FAQ` (EN) or `## よくある質問` (JA)

---

## 4. JSON-LD examples

### Article schema

Generated automatically in `EducationArticleLayout` via `getEducationArticleSchema()`.

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Best International Preschools in Kobe: What Parents Should Know (2026)",
  "description": "Best international preschools in Kobe...",
  "datePublished": "2026-05-20",
  "dateModified": "2026-05-20",
  "inLanguage": "en",
  "author": {
    "@type": "Organization",
    "name": "The Standard Japan Education Guide"
  }
}
```

### FAQPage schema

Extracted from MDX FAQ section. Example:

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What are the best international schools in Kobe?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Some of the best-known international schools in Kobe include Canadian Academy, Marist Brothers International School, and St. Michael's International School..."
      }
    }
  ]
}
```

See `lib/education-schema.ts` → `FAQ_SCHEMA_EXAMPLE`.

---

## 5. Internal linking plan

| From | Link to |
|------|---------|
| Every Kobe school article | Preschool Kobe, Preschool before CA, Rokko Island (when live) |
| Every preschool article | Schools Kobe, Preschool before CA |
| Tokyo articles | Japan overview; Kobe only in “relocating to Kansai” section |
| Osaka articles | Kobe schools + Kobe preschool (Kansai section) |
| JA pages | Matching EN URL via language switcher |
| Hub | Featured + section groupings |

**Peter Pan mention rules:**

- Natural in: Kobe preschool, Kobe schools, CA preschool, moving to Kobe, Rokko Island
- Optional in: Osaka (Kansai preschool section), Tokyo (relocation to Kobe only)
- Avoid: Unrelated Tokyo-only articles

**Disclaimer (always when linking preschool → CA):**

> Peter Pan may be a helpful early environment for families considering Canadian Academy, but it does not guarantee admission. Canadian Academy makes its own admissions decisions independently.

---

## 6. CTA strategy

| Placement | EN | JA |
|-----------|----|----|
| Hub hero | Explore guides below | 下記ガイドから選択 |
| Hub bottom | Start with Kobe preschool guide | 神戸プリスクールガイドへ |
| Article end | “Explore more guides” → `/education` | 教育ガイド一覧へ |
| Card CTA | Read Guide | ガイドを読む |
| Unpublished | Coming soon | 近日公開 |

No hard-sell CTAs. No “Apply now” for Peter Pan — editorial only.

---

## 7. Design & layout recommendations

- **Background:** `#FAFAF8` (edu-background) — calm, readable
- **Typography:** Existing Playfair + Inter + Space Grotesk
- **Cards:** White surface, subtle border, hover shadow
- **Imagery:** Real photography (Unsplash), avoid childish illustrations
- **Short answer block:** Bordered card at top of article body (AEO)
- **TOC:** Sticky sidebar on xl+ screens
- **Language toggle:** Top-right on hub and articles

---

## 8. Publishing order (recommended)

**Week 1 (done):** Hub, Best International Preschools in Kobe (EN/JA)  
**Week 2:** Best International Schools in Kobe (EN/JA) — done  
**Week 3:** Preschool Before Canadian Academy (EN/JA) — done  
**Week 4:** Moving to Kobe  
**Month 2:** Osaka, Rokko Island  
**Month 3:** Tokyo, Japan national overview

---

## 9. Peter Pan positioning (editorial)

- **Role:** One relevant English-speaking preschool option in Rokko Island, Kobe
- **Audience:** Families in Rokko Island, Higashinada, Ashiya, Nishinomiya considering international pathways
- **Never claim:** “Best,” “No.1,” guaranteed CA admission
- **Always use:** “one option to consider,” “may be suitable,” “does not guarantee admission”

---

*Last updated: May 2026*
