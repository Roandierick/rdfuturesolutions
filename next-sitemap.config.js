/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://www.rdfs.be",
  generateRobotsTxt: true,
  changefreq: "weekly",
  priority: 0.7,
  exclude: ["/api/*"],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    additionalSitemaps: [
      `${process.env.NEXT_PUBLIC_SITE_URL || "https://www.rdfs.be"}/sitemap.xml`,
    ],
  },
};

module.exports = config;
