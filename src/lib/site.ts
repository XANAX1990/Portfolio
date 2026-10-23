/**
 * Canonical origin for metadata, sitemap and robots.
 * SITE_URL overrides it (set it if the site moves to a custom domain); production builds
 * default to the live Vercel domain; local development uses localhost.
 */
export const siteUrl =
  process.env.SITE_URL ??
  (process.env.NODE_ENV === "production"
    ? "https://portfolio-xanax.vercel.app"
    : "http://localhost:3000");
