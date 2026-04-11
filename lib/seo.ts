import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

type MetadataOptions = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
};

export function createMetadata({
  title,
  description,
  path,
  keywords = [],
}: MetadataOptions): Metadata {
  const mergedKeywords = Array.from(new Set([...siteConfig.keywords, ...keywords]));

  return {
    title,
    description,
    keywords: mergedKeywords,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title,
      description,
      url: path,
      siteName: siteConfig.name,
      locale: "nl_BE",
      type: "website",
      images: [
        {
          url: `${siteConfig.siteUrl}/og-image.svg`,
          width: 1200,
          height: 630,
          alt: "RD Future Solutions - websites, apps en software op maat in Vlaanderen",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${siteConfig.siteUrl}/og-image.svg`],
    },
  };
}

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: siteConfig.name,
  address: {
    "@type": "PostalAddress",
    addressLocality: siteConfig.city,
    addressRegion: siteConfig.region,
    addressCountry: "BE",
  },
  telephone: siteConfig.phone,
  email: siteConfig.email,
  url: siteConfig.siteUrl,
  areaServed: siteConfig.areaServed,
  vatID: siteConfig.vatId,
  description: siteConfig.description,
};

export const serviceSchemas = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Website laten maken in Vlaanderen",
    serviceType: "Webdesign en websiteontwikkeling op maat",
    provider: {
      "@type": "LocalBusiness",
      name: siteConfig.name,
      url: siteConfig.siteUrl,
    },
    areaServed: siteConfig.areaServed,
    description:
      "Professionele, snelle en SEO-geoptimaliseerde websites op maat voor KMO's, zelfstandigen en lokale handelaars in Vlaanderen.",
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "App laten maken in Vlaanderen",
    serviceType: "Mobiele app ontwikkeling voor iOS en Android",
    provider: {
      "@type": "LocalBusiness",
      name: siteConfig.name,
      url: siteConfig.siteUrl,
    },
    areaServed: siteConfig.areaServed,
    description:
      "Mobiele apps voor iOS en Android, gebouwd met React Native en afgestemd op ondernemers en bedrijven in Vlaanderen.",
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Software op maat in Vlaanderen",
    serviceType: "Dashboards, automatiseringstools en platformen op maat",
    provider: {
      "@type": "LocalBusiness",
      name: siteConfig.name,
      url: siteConfig.siteUrl,
    },
    areaServed: siteConfig.areaServed,
    description:
      "Dashboards, automatiseringstools en interne platformen op maat voor bedrijven in Vlaanderen die meer nodig hebben dan standaardsoftware.",
  },
];
