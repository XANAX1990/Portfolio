/**
 * Canonical origin for metadata, sitemap and robots.
 * Order: SITE_URL (set this to the real domain) → Vercel's production domain → local dev.
 */
export const siteUrl = process.env.SITE_URL
  ? process.env.SITE_URL
  : process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000";
