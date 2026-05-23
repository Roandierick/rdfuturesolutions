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
  description:
    "RD Future Solutions is een Belgische AI-integratiespecialist gevestigd in Diest. Wij helpen KMO's en ondernemers groeien door slimme AI-integratie \u2014 van strategie tot implementatie.",
};

export const serviceSchemas = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "AI-strategie & advies Belgi\u00eb",
    serviceType: "AI-consulting en strategisch advies voor KMO's",
    provider: {
      "@type": "LocalBusiness",
      name: siteConfig.name,
      url: siteConfig.siteUrl,
    },
    areaServed: siteConfig.areaServed,
    description:
      "Concrete AI-strategie op maat voor Belgische ondernemers en KMO's. Van procesanalyse tot uitvoerbare roadmap.",
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "AI-automatisering van bedrijfsprocessen Belgi\u00eb",
    serviceType: "AI-automatisering en workflow optimalisatie",
    provider: {
      "@type": "LocalBusiness",
      name: siteConfig.name,
      url: siteConfig.siteUrl,
    },
    areaServed: siteConfig.areaServed,
    description:
      "Automatisering van repetitieve bedrijfsprocessen met AI voor KMO's en zelfstandigen in Belgi\u00eb.",
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "AI-chatbots & klantenservice Belgi\u00eb",
    serviceType: "AI-chatbot ontwikkeling en klantenservice automatisering",
    provider: {
      "@type": "LocalBusiness",
      name: siteConfig.name,
      url: siteConfig.siteUrl,
    },
    areaServed: siteConfig.areaServed,
    description:
      "Op maat gemaakte AI-chatbots voor Belgische bedrijven. 24/7 klantenservice, getraind op jouw producten en diensten.",
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "AI Startup Assistant Belgi\u00eb",
    serviceType: "Volledige digitale lancering met AI voor starters",
    provider: {
      "@type": "LocalBusiness",
      name: siteConfig.name,
      url: siteConfig.siteUrl,
    },
    areaServed: siteConfig.areaServed,
    description:
      "Alles voor starters op \u00e9\u00e9n plek: website, branding, e-mailfunnel, AI-chatbot, Meta en Google Ads, Google Business Profile \u2014 volledig geautomatiseerd met AI.",
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Custom AI Tools Belgi\u00eb",
    serviceType: "Op maat gemaakte AI-tools en toepassingen",
    provider: {
      "@type": "LocalBusiness",
      name: siteConfig.name,
      url: siteConfig.siteUrl,
    },
    areaServed: siteConfig.areaServed,
    description:
      "Gespecialiseerde AI-tools op maat voor Belgische bedrijven. Van interactieve databases tot diepgaande AI-chatbots afgestemd op jouw sector.",
  },
];
