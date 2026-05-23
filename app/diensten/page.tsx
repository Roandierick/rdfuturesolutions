import type { Metadata } from "next";
import { ButtonLink } from "@/components/button-link";
import {
  SearchIcon,
  ShieldIcon,
  SoftwareIcon,
  SparkIcon,
} from "@/components/icons";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { ServiceAccordions } from "@/components/service-accordions";
import { StructuredData } from "@/components/structured-data";
import { siteConfig } from "@/lib/site";

const seoTitle = "AI Diensten & Integraties België | RD Future Solutions";
const seoDescription =
  "Van AI-strategie en automatisering tot custom AI tools en startup begeleiding. RD Future Solutions is jouw AI-partner in België.";

const serviceItems = [
  {
    number: "01",
    title: "AI-strategie & advies",
    description:
      "Weet je dat AI waarde kan brengen in jouw bedrijf maar weet je niet waar te beginnen? Wij analyseren jouw processen en leveren een concrete, uitvoerbare AI-strategie op maat.",
    features: [
      "Analyse van jouw huidige bedrijfsprocessen",
      "Identificatie van AI-opportuniteiten met hoogste ROI",
      "Concrete roadmap voor AI-implementatie",
      "Advies over tools, platformen en aanpak",
      "Persoonlijke begeleiding zonder jargon",
    ],
    audienceTitle: "Voor wie",
    audienceText:
      "Voor ondernemers en KMO's die weten dat AI de toekomst is maar concreet willen weten wat het voor hún bedrijf kan betekenen.",
    noteTitle: "Hoe het werkt",
    noteText:
      "Alles start met een gratis en vrijblijvend gesprek. Daarna ontvang je een duidelijk voorstel.",
    ctaHref: "/contact",
    ctaLabel: "Boek een gratis gesprek",
  },
  {
    number: "02",
    title: "AI-automatisering van bedrijfsprocessen",
    description:
      "Repetitieve taken kosten tijd en geld. Wij automatiseren jouw workflows met AI zodat jouw team zich kan focussen op wat écht waarde creëert.",
    features: [
      "Automatisering van repetitieve en tijdrovende taken",
      "AI-gestuurde workflows op maat",
      "Integratie met bestaande tools en systemen",
      "Meetbare tijds- en kostenbesparing",
    ],
    audienceTitle: "Voor wie",
    audienceText:
      "Voor bedrijven die efficiënter willen werken en tijd willen terugwinnen door slimme automatisering.",
    noteTitle: "Prijs",
    noteText:
      "Op aanvraag, afhankelijk van scope en complexiteit. Start met een vrijblijvend gesprek.",
    ctaHref: "/contact",
    ctaLabel: "Bespreek jouw automatisering",
  },
  {
    number: "03",
    title: "AI-chatbots & klantenservice",
    description:
      "Een slimme AI-chatbot die jouw klanten 24/7 helpt, vragen beantwoordt en leads capteert — volledig afgestemd op jouw bedrijf en tone of voice.",
    features: [
      "AI-chatbot op maat voor jouw website",
      "Getraind op jouw producten, diensten en FAQ",
      "24/7 beschikbaar voor klanten",
      "Integratie met bestaande klantenservice tools",
      "Doorverwijzing naar menselijke medewerker indien nodig",
    ],
    audienceTitle: "Voor wie",
    audienceText:
      "Voor bedrijven die hun klantenservice willen verbeteren en automatiseren zonder in te boeten op kwaliteit.",
    noteTitle: "Prijs",
    noteText:
      "Vanaf €2.000 eenmalig + €110/maand voor monitoring, updates en optimalisatie.",
    ctaHref: "/contact",
    ctaLabel: "Vraag een demo aan",
  },
  {
    number: "04",
    title: "AI Startup Assistant",
    description:
      "Alles wat een starter of ondernemer nodig heeft om professioneel online te gaan — op één plek, slim geautomatiseerd met AI. Van landingspagina en branding tot e-mailfunnel, AI-chatbot, advertenties op Meta en Google, en een volledig ingesteld Google Business Profile.",
    features: [
      "Landing page / website op maat",
      "Branding en visuele identiteit",
      "E-mailfunnel opgezet en geautomatiseerd",
      "AI-chatbot geïntegreerd op de website",
      "Meta Ads + Google Ads setup",
      "Google Business Profile aangemaakt en geoptimaliseerd",
      "Alles zo goed mogelijk geautomatiseerd met AI",
    ],
    audienceTitle: "Voor wie",
    audienceText:
      "Voor starters en ondernemers met een idee en een budget die niet willen werken met 5 verschillende agencies. Alles wat je nodig hebt om te groeien, op één plek.",
    noteTitle: "Prijsstructuur",
    noteText:
      "Eenmalig bedrag voor setup + maandelijkse recurring kost voor onderhoud, advies en advertentiebeheer. Prijs op aanvraag.",
    ctaHref: "/contact",
    ctaLabel: "Bespreek jouw startup",
  },
  {
    number: "05",
    title: "Custom AI Tools",
    description:
      "Op maat gemaakte AI-tools voor jouw specifieke noden. Van een interactieve database tot een gespecialiseerde AI-chatbot die diepgaande kennis heeft over jouw bedrijf, sector of product.",
    features: [
      "Interactieve AI-databases",
      "Gespecialiseerde AI-chatbots op maat",
      "AI-tools geïntegreerd in bestaande workflows",
      "Volledig afgestemd op jouw use case",
    ],
    audienceTitle: "Voor wie",
    audienceText:
      "Voor bedrijven die verder willen gaan dan standaard AI-integraties en een tool op maat willen die écht werkt voor hun specifieke situatie.",
    noteTitle: "Prijs",
    noteText:
      "Volledig op aanvraag, afhankelijk van complexiteit en functionaliteit. Elk traject start met een vrijblijvend gesprek.",
    ctaHref: "/contact",
    ctaLabel: "Bespreek jouw AI tool",
  },
];

const processSteps = [
  {
    title: "Analyse en intake",
    description:
      "We starten met jouw doelen, processen en bottlenecks zodat we snel zien waar AI het meeste rendement oplevert.",
    icon: <SearchIcon />,
  },
  {
    title: "Strategie en prioriteiten",
    description:
      "Je krijgt een helder voorstel met aanbevolen use cases, aanpak en een plan dat past bij jouw budget en timing.",
    icon: <SparkIcon />,
  },
  {
    title: "Implementatie op maat",
    description:
      "We bouwen, koppelen en testen de juiste AI-oplossing zodat die echt werkt binnen jouw bestaande werking.",
    icon: <SoftwareIcon />,
  },
  {
    title: "Optimalisatie en opvolging",
    description:
      "Na livegang blijven we monitoren, bijsturen en verbeteren zodat je AI-oplossing waarde blijft opleveren.",
    icon: <ShieldIcon />,
  },
];

const aiServiceSchemas = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "AI-strategie & advies",
    serviceType: "AI-consultancy en strategie op maat",
    provider: {
      "@type": "LocalBusiness",
      name: siteConfig.name,
      url: siteConfig.siteUrl,
    },
    areaServed: "Belgium",
    description:
      "AI-strategie en advies voor Belgische KMO's die concreet willen weten waar AI de meeste impact kan maken.",
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "AI-automatisering van bedrijfsprocessen",
    serviceType: "AI-automatisering voor bedrijfsprocessen",
    provider: {
      "@type": "LocalBusiness",
      name: siteConfig.name,
      url: siteConfig.siteUrl,
    },
    areaServed: "Belgium",
    description:
      "AI-automatisering voor bedrijven die repetitieve taken willen verminderen en efficiënter willen werken.",
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "AI-chatbots & klantenservice",
    serviceType: "AI-chatbots en geautomatiseerde klantenservice",
    provider: {
      "@type": "LocalBusiness",
      name: siteConfig.name,
      url: siteConfig.siteUrl,
    },
    areaServed: "Belgium",
    description:
      "AI-chatbots op maat voor websites en klantenservice, afgestemd op de tone of voice en werking van jouw bedrijf.",
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "AI Startup Assistant",
    serviceType: "Startup begeleiding met AI en digitale automatisering",
    provider: {
      "@type": "LocalBusiness",
      name: siteConfig.name,
      url: siteConfig.siteUrl,
    },
    areaServed: "Belgium",
    description:
      "Een totaalpakket voor starters met website, branding, AI-chatbot, funnels, advertenties en Google Business Profile.",
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Custom AI Tools",
    serviceType: "Maatwerk AI-tools en gespecialiseerde AI-oplossingen",
    provider: {
      "@type": "LocalBusiness",
      name: siteConfig.name,
      url: siteConfig.siteUrl,
    },
    areaServed: "Belgium",
    description:
      "Custom AI tools, interactieve AI-databases en gespecialiseerde AI-chatbots voor specifieke bedrijfsnoden.",
  },
];

export const metadata: Metadata = {
  title: {
    absolute: seoTitle,
  },
  description: seoDescription,
  keywords: [
    "AI integratie België",
    "AI consultant België",
    "AI automatisering KMO",
    "AI chatbot laten maken",
    "AI startup begeleiding België",
    "custom AI tools België",
  ],
  alternates: {
    canonical: "/diensten",
  },
  openGraph: {
    title: seoTitle,
    description: seoDescription,
    url: "/diensten",
    siteName: siteConfig.name,
    locale: "nl_BE",
    type: "website",
    images: [
      {
        url: `${siteConfig.siteUrl}/og-image.svg`,
        width: 1200,
        height: 630,
        alt: "AI diensten en integraties van RD Future Solutions in België.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: seoTitle,
    description: seoDescription,
    images: [`${siteConfig.siteUrl}/og-image.svg`],
  },
};

export default function ServicesPage() {
  return (
    <>
      <StructuredData data={aiServiceSchemas} />

      <PageHero
        eyebrow="Diensten"
        title="AI-integratie, automatisering en digitale oplossingen voor Belgische ondernemers"
        description="Bij RD Future Solutions kan je voor alles rond AI terecht. Van strategie en advies tot concrete implementatie — wij zorgen voor resultaten die je bedrijf vooruithelpen."
        primaryCta={{ href: "/contact", label: "Boek een gesprek" }}
        secondaryCta={{ href: "/prijzen", label: "Bekijk de prijzen" }}
      />

      <ServiceAccordions items={serviceItems} />

      <section className="section-space rd-soft-section">
        <div className="section-shell">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.62fr)_minmax(0,0.38fr)] lg:items-end">
            <SectionHeading
              eyebrow="Hoe we werken"
              title="Van eerste gesprek tot werkende AI-oplossing"
            />

            <p className="max-w-lg text-base leading-8 text-[var(--rd-text-body)] sm:text-lg lg:justify-self-end">
              Een goede AI-implementatie vraagt duidelijkheid, realisme en een partner die het ook
              effectief kan bouwen. Daarom werken we met een helder traject van analyse tot
              optimalisatie.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {processSteps.map((step, index) => (
              <div key={step.title} className="rd-card border-l-[3px] border-l-[var(--rd-blue)] p-6">
                <span className="rd-icon-square">{step.icon}</span>
                <p className="mono-label mt-6">{String(index + 1).padStart(2, "0")}</p>
                <h3 className="mt-3">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 sm:text-base">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <ButtonLink href="/prijzen">Bekijk de prijsstructuur</ButtonLink>
            <ButtonLink href="/contact" variant="secondary">
              Bespreek jouw project
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
