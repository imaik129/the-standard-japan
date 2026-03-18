# Google Search Console — Setup Guide for The Standard Japan

Complete step-by-step guide to get your site indexed and ranking on Google.

---

## Step 1: Add Your Property

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Sign in with your Google account
3. Click **"Add property"**
4. Choose **"URL prefix"** (recommended for most sites)
5. Enter your domain: `https://thestandardjapan.com`
   - If using Vercel: use your custom domain, not `*.vercel.app`
   - The `*.vercel.app` URL can be a separate property if needed

---

## Step 2: Verify Ownership

You have several options. **HTML tag** is easiest for Next.js:

### Option A: HTML Meta Tag (Recommended)

1. In GSC, select **"HTML tag"** as verification method
2. You'll get something like: `<meta name="google-site-verification" content="ABC123..." />`
3. Add this to your site:
   - Create/update `app/layout.tsx` and add the meta tag in the `<head>`
   - Or add to `next.config.js` under `head` if supported
4. Deploy your site
5. Click **"Verify"** in GSC

**To add the verification tag:** Add this to your layout's head section (you'll need to get the actual content value from GSC):

```tsx
<meta name="google-site-verification" content="YOUR_VERIFICATION_CODE" />
```

### Option B: DNS Verification (If you have domain access)

1. In GSC, select **"Domain name provider"**
2. Add the TXT record to your DNS (e.g. Vercel, Cloudflare, Namecheap)
3. Wait for DNS propagation (5 min - 48 hrs)
4. Click **"Verify"**

### Option C: HTML File Upload

1. Download the verification file from GSC
2. Place it in `public/` folder (e.g. `public/google1234567890.html`)
3. Deploy — it will be at `yoursite.com/google1234567890.html`
4. Click **"Verify"**

---

## Step 3: Submit Your Sitemap

1. In GSC, go to **Sitemaps** (left sidebar)
2. Under "Add a new sitemap", enter: `sitemap.xml`
3. Click **Submit**

Your sitemap URL: `https://thestandardjapan.com/sitemap.xml`

**What's in your sitemap:**
- Homepage
- /japan (Japan Guide hub)
- /magazine
- All category pages
- All article pages
- /about, /newsletter, /search

---

## Step 4: Request Indexing for Key Pages

1. Go to **URL Inspection** (top search bar)
2. Enter each URL and click **"Request Indexing"**

**Priority URLs to submit first:**
1. `https://thestandardjapan.com`
2. `https://thestandardjapan.com/japan`
3. `https://thestandardjapan.com/magazine`
4. Your top 5-10 articles (e.g. best ramen, konbini, izakaya)

---

## Step 5: Set Up Your Domain Correctly

**Important:** If using Vercel:

1. Add your custom domain in Vercel: `thestandardjapan.com` and `www.thestandardjapan.com`
2. Choose one as canonical:
   - **Recommended:** Use `thestandardjapan.com` (no www) everywhere
   - Add redirect: `www.thestandardjapan.com` → `thestandardjapan.com`
3. In GSC, add the property for your chosen canonical URL
4. Set `NEXT_PUBLIC_SITE_URL` in Vercel env to `https://thestandardjapan.com`

---

## Step 6: Ongoing Tasks (Weekly/Monthly)

### Weekly

| Task | Where in GSC |
|------|--------------|
| Check for indexing errors | Coverage → Errors |
| Check for manual actions | Manual actions |
| Review performance | Performance → Search results |

### Monthly

| Task | Action |
|------|--------|
| Submit new sitemap | Sitemaps → re-submit if you add many pages |
| Request indexing for new articles | URL Inspection for each new article |
| Review top queries | Performance → see what's ranking |
| Fix any crawl errors | Coverage → exclude or fix |

---

## Step 7: Enable Additional Features

### International Targeting (Optional)

If you want to target specific countries:
1. Go to **Settings** (gear icon)
2. **International targeting** → Select "Japan" or "United States" depending on your audience
3. For English content: "Unlisted" or "United States" is fine

### URL Parameters (Optional)

If you have query params (e.g. `?ref=twitter`):
1. Go to **Settings** → **URL parameters**
2. Tell Google which params to ignore

---

## Step 8: Connect to Other Tools (Optional)

- **Google Analytics 4** — Link in GSC settings for combined data
- **Bing Webmaster Tools** — Submit same sitemap at bing.com/webmasters

---

## Troubleshooting

### "Coverage: Excluded" or "Discovered - currently not indexed"

- **Normal for new sites** — Google crawls over time
- **Speed it up:** Use URL Inspection → Request Indexing for priority pages
- **Check:** Ensure no `noindex` in your robots or meta tags

### "Crawl error" or "Server error"

- Check your site is live and accessible
- Verify SSL certificate is valid
- Check Vercel deployment status

### Sitemap "Couldn't fetch"

- Ensure `https://thestandardjapan.com/sitemap.xml` loads in browser
- Check for redirects (should be 200, not 301/302)
- Verify no robots.txt blocking

### Pages not appearing in search

- Give it 1-4 weeks for new sites
- Ensure pages are linked from sitemap and other pages
- Check Search Appearance → Structured Data for errors

---

## Quick Checklist

- [ ] Add property (URL prefix)
- [ ] Verify ownership
- [ ] Submit sitemap.xml
- [ ] Request indexing for homepage, /japan, /magazine
- [ ] Set NEXT_PUBLIC_SITE_URL in Vercel
- [ ] Add custom domain (if not done)
- [ ] Redirect www to non-www (or vice versa)

---

## Verification Meta Tag

When you get your verification code from GSC, add it to your layout. Create a `.env.local`:

```
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your_code_here
```

Then in `app/layout.tsx` head:

```tsx
{process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION && (
  <meta name="google-site-verification" content={process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION} />
)}
```

---

*Last updated: March 2024*
