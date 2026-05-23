import type { Metadata } from "next";
import { ButtonLink } from "@/components/button-link";
import {
  AnalyticsIcon,
  CheckIcon,
  HandshakeIcon,
  SearchIcon,
  ShieldIcon,
  SparkIcon,
} from "@/components/icons";
import { InfoCard } from "@/components/info-card";
import { SectionHeading } from "@/components/section-heading";
import { ServiceAccordions } from "@/components/service-accordions";
import { StructuredData } from "@/components/structured-data";
import { localBusinessSchema } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

const seoTitle = "AI-integratie specialist België | RD Future Solutions";
const seoDescription =
  "RD Future Solutions helpt Belgische KMO's groeien met AI-integratie — van strategie tot implementatie. Boek een gratis adviesgesprek.";

const heroParticles = [
  "left-[7%] top-[18%] h-2 w-2 bg-white/90 animate-float-slow",
  "left-[16%] top-[68%] h-2.5 w-2.5 bg-[rgba(124,58,237,0.34)] animate-float-medium",
  "left-[28%] top-[28%] h-1.5 w-1.5 bg-[rgba(59,130,246,0.55)] animate-float-reverse",
  "left-[36%] top-[74%] h-2 w-2 bg-white/80 animate-float-slow",
  "left-[46%] top-[18%] h-2.5 w-2.5 bg-[rgba(124,58,237,0.28)] animate-float-medium",
  "left-[58%] top-[58%] h-1.5 w-1.5 bg-[rgba(59,130,246,0.5)] animate-float-reverse",
  "left-[69%] top-[23%] h-2 w-2 bg-white/80 animate-float-slow",
  "left-[76%] top-[72%] h-2.5 w-2.5 bg-[rgba(124,58,237,0.26)] animate-float-medium",
  "left-[84%] top-[35%] h-1.5 w-1.5 bg-[rgba(59,130,246,0.6)] animate-float-reverse",
  "left-[91%] top-[61%] h-2 w-2 bg-white/75 animate-float-slow",
  "left-[22%] top-[46%] h-1 w-1 bg-white/85 animate-float-medium",
  "left-[63%] top-[84%] h-1 w-1 bg-[rgba(124,58,237,0.5)] animate-float-reverse",
] as const;

const problemCards = [
  {
    title: "Geen technische kennis nodig",
    description: "Wij nemen de complexiteit weg. Jij focust op je business.",
    icon: <ShieldIcon />,
    accent: "blue" as const,
  },
  {
    title: "Resultaatgericht",
    description: "Geen vage adviezen. Enkel implementaties die effectief werken.",
    icon: <AnalyticsIcon />,
    accent: "purple" as const,
  },
  {
    title: "Lokaal & persoonlijk",
    description: "Rechtstreeks contact met de expert, geen groot bureau.",
    icon: <HandshakeIcon />,
    accent: "blue" as const,
  },
] as const;

const deliverySteps = [
  {
    label: "01",
    title: "Strategische AI-scan",
    description:
      "We bepalen waar AI vandaag al waarde kan toevoegen in jouw sales, support of interne werking.",
  },
  {
    label: "02",
    title: "Snelle proof of concept",
    description:
      "We bouwen een eerste werkende oplossing waarmee je snel ziet wat het effect is op tijd, kwaliteit of omzet.",
  },
  {
    label: "03",
    title: "Integratie & opvolging",
    description:
      "Na validatie integreren we de oplossing in jouw bestaande processen, software of website.",
  },
] as const;

const serviceItems = [
  {
    number: "01",
    title: "AI-strategie & advies",
    description:
      "We vertalen AI naar een duidelijke roadmap voor jouw onderneming. Geen theoretische workshops, wel een scherp plan met prioriteiten, quick wins en concrete use cases die relevant zijn voor Belgische KMO's.",
    features: [
      "AI-opportuniteiten identificeren per team of proces",
      "Use cases prioriteren op impact, kost en haalbaarheid",
      "Heldere roadmap voor implementatie in fases",
      "Praktisch advies over tooling, data en adoptie",
    ],
    audienceTitle: "Voor wie",
    audienceText:
      "Voor zaakvoerders en teams die AI willen inzetten, maar eerst duidelijkheid nodig hebben over waar ze het best starten.",
    noteTitle: "Wat je krijgt",
    noteText:
      "Een concreet advieskader waarmee je intern sneller beslist en extern niet verdwaalt in buzzwords of losse tools.",
    ctaHref: "/contact",
    ctaLabel: "Plan een gratis intake",
  },
  {
    number: "02",
    title: "AI-automatisering van bedrijfsprocessen",
    description:
      "Repetitieve taken kosten tijd, focus en marge. Wij bouwen AI-automatiseringen die workflows versnellen, informatie slimmer laten doorstromen en manuele stappen verminderen zonder je team te overbelasten.",
    features: [
      "Automatische verwerking van e-mails, documenten of aanvragen",
      "Slimme workflows voor offertes, opvolging en interne taken",
      "Koppelingen tussen AI, formulieren, inboxen en databases",
      "Stapsgewijze uitrol met focus op meetbare tijdswinst",
    ],
    audienceTitle: "Voor wie",
    audienceText:
      "Voor bedrijven die minder tijd willen verliezen aan herhaling en op zoek zijn naar AI-automatisering in Vlaanderen met een praktische aanpak.",
    noteTitle: "Belangrijk",
    noteText:
      "We vertrekken niet vanuit technologie, maar vanuit processen die vandaag al frictie, vertraging of fouten veroorzaken.",
    ctaHref: "/contact",
    ctaLabel: "Bespreek jouw workflow",
  },
  {
    number: "03",
    title: "AI-chatbots & klantenservice",
    description:
      "Een goede AI-chatbot doet meer dan antwoorden genereren. We ontwikkelen oplossingen die jouw tone of voice respecteren, informatie correct ontsluiten en klanten sneller verder helpen op je website of in interne support.",
    features: [
      "Chatbots op maat voor website, support of interne kennisbank",
      "Training op jouw content, FAQ's en processen",
      "Escalaties naar menselijk contact wanneer nodig",
      "Focus op kwaliteit, betrouwbaarheid en gebruiksgemak",
    ],
    audienceTitle: "Voor wie",
    audienceText:
      "Voor teams die sneller willen reageren op vragen zonder in te boeten op kwaliteit of persoonlijkheid.",
    noteTitle: "Resultaat",
    noteText:
      "Meer bereikbaarheid, minder repetitieve vragen voor je team en een betere eerste ervaring voor bezoekers en klanten.",
    ctaHref: "/contact",
    ctaLabel: "Ontdek chatbot-mogelijkheden",
  },
  {
    number: "04",
    title: "AI-integraties in bestaande software/websites",
    description:
      "Heb je al een website, tool of platform? Dan integreren we AI rechtstreeks in wat je vandaag gebruikt, zodat je processen slimmer worden zonder opnieuw van nul te moeten starten.",
    features: [
      "Integraties met bestaande websites, CRM's en interne tools",
      "OpenAI-workflows en maatwerklogica op jouw data",
      "Veilige koppelingen met bestaande processen en rollen",
      "Technische implementatie met oog voor schaalbaarheid",
    ],
    audienceTitle: "Voor wie",
    audienceText:
      "Voor ondernemingen die AI niet naast hun werking willen zetten, maar er structureel in willen verweven.",
    noteTitle: "Aanpak",
    noteText:
      "We bekijken eerst wat al goed werkt, en bouwen daarop verder. Zo blijft de implementatie beheersbaar voor jouw team.",
    ctaHref: "/contact",
    ctaLabel: "Bekijk jouw integratiekansen",
  },
] as const;

const founderSignals = [
  "5+ jaar ervaring in webdevelopment en digitale producten",
  "Volledige focus op praktische AI-integratie voor Belgische bedrijven",
  "Directe communicatie vanuit Diest, zonder tussenlagen of bureaugedoe",
] as const;

const homeSchemas = [
  localBusinessSchema,
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "AI-strategie & advies",
    serviceType: "AI-consultancy voor Belgische KMO's",
    provider: {
      "@type": "LocalBusiness",
      name: siteConfig.name,
      url: siteConfig.siteUrl,
    },
    areaServed: "Belgium",
    description:
      "Strategisch AI-advies voor Belgische KMO's, van use-case selectie tot een concrete implementatieroadmap.",
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "AI-automatisering van bedrijfsprocessen",
    serviceType: "AI-automatisering en workflow optimalisatie",
    provider: {
      "@type": "LocalBusiness",
      name: siteConfig.name,
      url: siteConfig.siteUrl,
    },
    areaServed: "Belgium",
    description:
      "AI-automatisering voor Vlaamse en Belgische bedrijven die repetitieve processen slimmer willen laten verlopen.",
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "AI-chatbots & klantenservice",
    serviceType: "AI-chatbots op maat",
    provider: {
      "@type": "LocalBusiness",
      name: siteConfig.name,
      url: siteConfig.siteUrl,
    },
    areaServed: "Belgium",
    description:
      "AI-chatbots voor website, support en interne kennisbanken, afgestemd op de werking van Belgische KMO's.",
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "AI-integraties in bestaande software en websites",
    serviceType: "Technische AI-integraties",
    provider: {
      "@type": "LocalBusiness",
      name: siteConfig.name,
      url: siteConfig.siteUrl,
    },
    areaServed: "Belgium",
    description:
      "Integratie van AI in bestaande websites, software en bedrijfsprocessen voor ondernemingen in België.",
  },
];

export const metadata: Metadata = {
  title: {
    absolute: seoTitle,
  },
  description: seoDescription,
  keywords: [
    "AI-integratie België",
    "AI-consultant België",
    "AI voor KMO's",
    "artificiële intelligentie bedrijf België",
    "AI-automatisering Vlaanderen",
    "AI-chatbot België",
    "AI implementatie KMO",
    "AI specialist Diest",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: seoTitle,
    description: seoDescription,
    url: "/",
    siteName: siteConfig.name,
    locale: "nl_BE",
    type: "website",
    images: [
      {
        url: `${siteConfig.siteUrl}/og-image.svg`,
        width: 1200,
        height: 630,
        alt: "RD Future Solutions helpt Belgische KMO's met AI-integratie en automatisering.",
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

export default function HomePage() {
  return (
    <>
      <StructuredData data={homeSchemas} />

      <section className="relative isolate overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.98),rgba(255,255,255,0.62)_30%,transparent_58%),radial-gradient(circle_at_82%_14%,rgba(124,58,237,0.24),transparent_34%),radial-gradient(circle_at_66%_78%,rgba(59,130,246,0.18),transparent_34%),linear-gradient(180deg,#ffffff_0%,#f8f9ff_55%,#eef4ff_100%)]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-x-0 top-0 h-32 bg-[linear-gradient(180deg,rgba(255,255,255,0.94),transparent)]" />
          <div className="absolute left-[-10%] top-[-12%] h-[18rem] w-[18rem] rounded-full bg-[rgba(124,58,237,0.2)] blur-3xl motion-reduce:animate-none md:h-[28rem] md:w-[28rem] animate-mesh-slow" />
          <div className="absolute right-[-8%] top-[8%] h-[16rem] w-[16rem] rounded-full bg-[rgba(59,130,246,0.2)] blur-3xl motion-reduce:animate-none md:h-[24rem] md:w-[24rem] animate-mesh-medium" />
          <div className="absolute bottom-[-16%] left-[28%] h-[16rem] w-[16rem] rounded-full bg-[rgba(255,255,255,0.75)] blur-3xl motion-reduce:animate-none md:h-[24rem] md:w-[24rem] animate-mesh-reverse" />
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.25),rgba(255,255,255,0))]" />
          <div className="absolute inset-0 opacity-80">
            {heroParticles.map((particle) => (
              <span
                key={particle}
                className={`absolute rounded-full blur-[1px] motion-reduce:animate-none ${particle}`}
              />
            ))}
          </div>
          <div className="absolute inset-x-0 bottom-0 h-32 bg-[linear-gradient(180deg,transparent,rgba(255,255,255,0.92))]" />
        </div>

        <div className="section-shell relative py-10 md:py-14 lg:py-20">
          <div className="grid min-h-[calc(100svh-8rem)] gap-12 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:items-center lg:gap-14">
            <div className="min-w-0">
              <p className="mono-label">AI-INTEGRATIE VLAANDEREN &middot; BELGI&Euml;</p>
              <h1 className="mt-6 max-w-4xl text-[clamp(3.2rem,7vw,6rem)]">
                Jouw bedrijf.
                <span className="block gradient-text">Slimmer gemaakt met AI.</span>
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--rd-text-body)] sm:text-lg">
                AI is de toekomst &mdash; maar waar begin je? RD Future Solutions begeleidt
                Belgische ondernemers van strategie tot concrete implementatie. Geen hype, wel
                resultaten.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                <ButtonLink href="/contact" size="lg">
                  Boek een gratis gesprek
                </ButtonLink>
                <ButtonLink href="/diensten" variant="secondary" size="lg">
                  Ontdek onze aanpak
                </ButtonLink>
              </div>

              <div className="mt-10 flex flex-wrap gap-3">
                <span className="inline-flex rounded-full border border-[rgba(124,58,237,0.16)] bg-white/80 px-4 py-2 text-sm text-[var(--rd-text)] shadow-[0_12px_40px_rgba(10,14,31,0.05)] backdrop-blur">
                  AI voor KMO&apos;s
                </span>
                <span className="inline-flex rounded-full border border-[rgba(59,130,246,0.16)] bg-white/80 px-4 py-2 text-sm text-[var(--rd-text)] shadow-[0_12px_40px_rgba(10,14,31,0.05)] backdrop-blur">
                  AI-integratie Belgi&euml;
                </span>
                <span className="inline-flex rounded-full border border-[rgba(59,130,246,0.16)] bg-white/80 px-4 py-2 text-sm text-[var(--rd-text)] shadow-[0_12px_40px_rgba(10,14,31,0.05)] backdrop-blur">
                  AI-automatisering Vlaanderen
                </span>
              </div>

              <p className="mt-6 max-w-2xl text-sm leading-7 text-[var(--rd-text-muted)] sm:text-base">
                Zoek je een{" "}
                <span className="font-semibold text-[var(--rd-text)]">
                  AI-consultant Belgi&euml;
                </span>{" "}
                of typ je eerder{" "}
                <span className="font-semibold text-[var(--rd-text)]">
                  artifici&euml;le intelligentie bedrijf Belgi&euml;
                </span>
                ? Dan wil je vooral weten waar AI vandaag echt rendement oplevert voor jouw team.
              </p>
            </div>

            <div className="min-w-0 lg:justify-self-end">
              <div className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-[0_30px_120px_rgba(59,130,246,0.12)] backdrop-blur-xl sm:p-8">
                <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(124,58,237,0.4),rgba(59,130,246,0.4),transparent)]" />
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="mono-label text-[var(--rd-purple)]">AI-automatisering Vlaanderen</p>
                    <h2 className="mt-3 text-[clamp(1.75rem,3vw,2.4rem)]">
                      Van idee naar implementatie
                    </h2>
                  </div>
                  <span className="inline-flex h-12 w-12 flex-none items-center justify-center rounded-full bg-[rgba(124,58,237,0.08)] text-[var(--rd-purple)]">
                    <SparkIcon />
                  </span>
                </div>

                <div className="mt-8 space-y-4">
                  {deliverySteps.map((step) => (
                    <div
                      key={step.label}
                      className="rd-card border-l-[3px] border-l-[var(--rd-blue)] bg-white/90 p-5"
                    >
                      <p className="mono-label">{step.label}</p>
                      <h3 className="mt-3">{step.title}</h3>
                      <p className="mt-3 text-sm leading-7 sm:text-base">{step.description}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 grid gap-4 border-t border-[rgba(41,82,204,0.1)] pt-6 sm:grid-cols-3">
                  <div>
                    <p className="text-2xl font-semibold leading-none text-[var(--rd-text)]">Diest</p>
                    <p className="mt-2 text-sm text-[var(--rd-text-muted)]">Lokaal verankerd</p>
                  </div>
                  <div>
                    <p className="text-2xl font-semibold leading-none text-[var(--rd-text)]">KMO</p>
                    <p className="mt-2 text-sm text-[var(--rd-text-muted)]">Focus op haalbaarheid</p>
                  </div>
                  <div>
                    <p className="text-2xl font-semibold leading-none text-[var(--rd-text)]">
                      End-to-end
                    </p>
                    <p className="mt-2 text-sm text-[var(--rd-text-muted)]">
                      Strategie tot livegang
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="section-shell">
          <SectionHeading
            index="01"
            eyebrow="AI voor KMO's"
            title="Je weet dat AI waarde kan brengen. Maar je weet niet waar te beginnen."
            description={
              "Dat is exact waarom RD Future Solutions bestaat. Wij vertalen AI naar concrete, werkende oplossingen voor jouw bedrijf — zonder gedoe, zonder verspilde tijd."
            }
          />

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {problemCards.map((card) => (
              <div key={card.title} className="h-full">
                <InfoCard {...card} />
              </div>
            ))}
          </div>

          <div className="mt-8 max-w-3xl">
            <p className="text-base leading-8 text-[var(--rd-text-body)] sm:text-lg">
              Voor veel ondernemers begint{" "}
              <span className="font-semibold text-[var(--rd-text)]">
                AI-integratie Belgi&euml;
              </span>{" "}
              niet met software, maar met duidelijkheid: wat automatiseren we eerst, welke winst
              verwachten we en hoe houden we het haalbaar voor jouw team?
            </p>
          </div>
        </div>
      </section>

      <section className="section-space rd-soft-section">
        <div className="section-shell">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.62fr)_minmax(0,0.38fr)] lg:items-end">
            <SectionHeading
              index="02"
              eyebrow="AI-automatisering Vlaanderen"
              title="Wat wij doen"
              description="Van eerste strategische keuzes tot technische oplevering: RD Future Solutions bouwt AI-oplossingen die passen bij Belgische KMO's, bestaande workflows en realistische groeidoelen."
            />

            <p className="max-w-lg text-base leading-8 text-[var(--rd-text-body)] sm:text-lg lg:justify-self-end">
              Of je nu nog aan het verkennen bent of al heel concreet weet wat je wilt bouwen, wij
              combineren advies, uitvoering en opvolging in &eacute;&eacute;n traject.
            </p>
          </div>
        </div>

        <ServiceAccordions items={serviceItems} />

        <div className="section-shell pt-8">
          <div className="flex justify-center">
            <ButtonLink href="/diensten" variant="secondary" size="lg">
              Bekijk alle diensten &rarr;
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="section-shell">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.56fr)_minmax(0,0.44fr)] lg:gap-14">
            <div className="min-w-0">
              <SectionHeading
                index="03"
                eyebrow="AI-consultant Belgi&euml;"
                title="Wie staat achter RDFS?"
              />

              <p className="mt-6 text-base leading-8 text-[var(--rd-text-body)] sm:text-lg">
                Roan Dierick, oprichter van RD Future Solutions, is al meer dan 5 jaar bezig met
                webdevelopment en verdiepte zich de afgelopen jaren volledig in artifici&euml;le
                intelligentie. Vandaag helpt hij Belgische ondernemers om AI praktisch en
                winstgevend in te zetten in hun bedrijf &mdash; zonder omwegen.
              </p>

              <p className="mt-6 text-base leading-8 text-[var(--rd-text-body)] sm:text-lg">
                Veel bedrijven die zoeken op{" "}
                <span className="font-semibold text-[var(--rd-text)]">
                  artifici&euml;le intelligentie bedrijf Belgi&euml;
                </span>{" "}
                willen geen theoretisch verhaal, maar een partner die analyseert, bouwt en
                opvolgt. Dat is precies hoe RDFS werkt.
              </p>
            </div>

            <div className="min-w-0">
              <div className="rd-card border-l-[3px] border-l-[var(--rd-purple)] bg-[linear-gradient(180deg,rgba(123,53,232,0.05),rgba(255,255,255,0.96))] p-6 sm:p-8">
                <p className="mono-label text-[var(--rd-purple)]">Waarom ondernemers hiervoor kiezen</p>
                <h3 className="mt-4 text-[1.45rem] leading-tight sm:text-[1.6rem]">
                  E&eacute;n vaste expert, van analyse tot livegang
                </h3>

                <div className="mt-6 space-y-4">
                  {founderSignals.map((signal) => (
                    <div key={signal} className="flex items-start gap-3">
                      <span className="mt-0.5 inline-flex h-6 w-6 flex-none items-center justify-center rounded-full bg-[rgba(124,58,237,0.1)] text-[var(--rd-purple)]">
                        <CheckIcon className="h-4 w-4" />
                      </span>
                      <p className="text-sm leading-7 sm:text-base">{signal}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 grid gap-4 border-t border-[rgba(41,82,204,0.08)] pt-6 sm:grid-cols-2">
                  <div className="rd-card border-l-[3px] border-l-[var(--rd-blue)] bg-white/90 p-5">
                    <span className="rd-icon-square">
                      <SearchIcon />
                    </span>
                    <h3 className="mt-5">Praktisch advies</h3>
                    <p className="mt-3 text-sm leading-7 sm:text-base">
                      Heldere keuzes, concrete use cases en een traject dat afgestemd is op je
                      huidige werking.
                    </p>
                  </div>

                  <div className="rd-card border-l-[3px] border-l-[var(--rd-blue)] bg-white/90 p-5">
                    <span className="rd-icon-square">
                      <SparkIcon />
                    </span>
                    <h3 className="mt-5">Werkende implementatie</h3>
                    <p className="mt-3 text-sm leading-7 sm:text-base">
                      Geen slide deck dat in een map verdwijnt, maar oplossingen die je echt kunt
                      gebruiken in je bedrijf.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-16 md:pb-20 lg:pb-24">
        <div className="section-shell">
          <div className="relative overflow-hidden rounded-[2rem] border border-[rgba(255,255,255,0.18)] bg-[linear-gradient(135deg,rgba(124,58,237,0.98),rgba(59,130,246,0.98))] p-8 shadow-[0_30px_90px_rgba(41,82,204,0.22)] sm:p-10 lg:p-12">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute left-[-8%] top-[-18%] h-48 w-48 rounded-full bg-white/12 blur-3xl" />
              <div className="absolute bottom-[-28%] right-[-8%] h-56 w-56 rounded-full bg-[rgba(255,255,255,0.16)] blur-3xl" />
            </div>

            <div className="relative grid gap-8 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,0.28fr)] lg:items-center">
              <div className="min-w-0">
                <p className="mono-label text-white/80">Gratis adviesgesprek</p>
                <h2 className="mt-4 text-white">Klaar om AI te laten werken voor jouw bedrijf?</h2>
                <p className="mt-5 max-w-2xl text-base leading-8 text-white/80 sm:text-lg">
                  Boek een gratis en vrijblijvend adviesgesprek. We bekijken samen waar AI direct
                  waarde kan toevoegen.
                </p>
              </div>

              <div className="lg:justify-self-end">
                <ButtonLink
                  href="/contact"
                  variant="secondary"
                  size="lg"
                  className="border-white/50 bg-white text-[var(--rd-purple)] hover:border-white"
                >
                  Boek nu een gesprek &rarr;
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
