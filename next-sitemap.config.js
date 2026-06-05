/** @type {import('next-sitemap').IConfig} */
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.rdfuturesolutions.be";
const indexedPaths = ["/ebooks", "/ebooks/ai-voor-de-vakman", "/privacy"];

const config = {
  siteUrl,
  generateRobotsTxt: true,
  changefreq: "weekly",
  priority: 0.7,
  exclude: ["/api/*"],
  additionalPaths: async () =>
    indexedPaths.map((loc) => ({
      loc,
      changefreq: "weekly",
      priority: loc === "/ebooks" ? 0.85 : 0.8,
      lastmod: new Date().toISOString(),
    })),
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
  },
};

module.exports = config;
