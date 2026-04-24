import { ButtonLink } from "@/components/button-link";
import { FaqAccordion } from "@/components/faq-accordion";
import { AnalyticsIcon, GlobeIcon, MobileIcon, ShieldIcon, SoftwareIcon } from "@/components/icons";
import { InfoCard } from "@/components/info-card";
import { PageHero } from "@/components/page-hero";
import { PageLinks } from "@/components/page-links";
import { PricingCard } from "@/components/pricing-card";
import { SectionHeading } from "@/components/section-heading";
import { createMetadata } from "@/lib/seo";

const faqItems = [
  {
    question: "Wat is er inbegrepen in de eenmalige prijs?",
    answer:
      "De eenmalige ontwikkelkost dekt het ontwerp, de development, basis testing en de afgesproken functionaliteiten van jouw project. Hosting en doorlopende ondersteuning worden apart gefactureerd.",
  },
  {
    question: "Waarom is hosting verplicht?",
    answer:
      "Hosting zorgt ervoor dat je website of app veilig online blijft, vlot laadt en technisch onderhouden kan worden. Zonder stabiele hosting kan geen digitaal project betrouwbaar werken.",
  },
  {
    question: "Hoelang duurt het om een website te bouwen?",
    answer:
      "Een compacte website kan vaak binnen ongeveer twee weken opgeleverd worden. Grotere projecten met extra pagina's, CMS of maatwerkfunctionaliteiten vragen logischerwijs meer tijd.",
  },
  {
    question: "Hoe verloopt de samenwerking stap voor stap?",
    answer:
      "We starten met een intake, stemmen scope en planning af, bouwen iteratief met feedbackmomenten en ronden af met testing, launch en praktische nazorg.",
  },
  {
    question: "Wat als ik al een domein of hosting heb?",
    answer:
      "Dat bekijken we samen. In veel gevallen kunnen we bestaande domeinen overnemen of een deel van je huidige setup integreren, zolang de technische kwaliteit goed genoeg is.",
  },
  {
    question: "Kan ik later extra pagina's of functies toevoegen?",
    answer:
      "Ja. Websites, apps en software worden zo opgebouwd dat ze later kunnen meegroeien met je onderneming. Uitbreidingen kunnen perfect in een volgende fase toegevoegd worden.",
  },
  {
    question: "Werk je ook buiten Diest, in de rest van Vlaanderen?",
    answer:
      "Ja. RD Future Solutions is gevestigd in Diest, maar werkt voor klanten in heel Vlaanderen via online meetings, efficiënte communicatie en duidelijke projectplanning.",
  },
] as const;

export const metadata = createMetadata({
  title: "Prijzen",
  description:
    "Ontdek de prijzen van RD Future Solutions voor websites, hosting en maatwerksoftware in Vlaanderen. Transparant, helder en zonder verborgen kosten.",
  path: "/prijzen",
});

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Prijzen"
        title="Transparante prijzen voor websites, apps en software op maat"
        description="Je wilt weten waar je aan toe bent voor je beslist. Daarom vind je hier een heldere prijsstructuur voor websites, hosting en maatwerktrajecten."
        primaryCta={{ href: "/contact", label: "Vraag een offerte aan" }}
        secondaryCta={{ href: "/diensten", label: "Bekijk de diensten" }}
      />

      <section className="pb-8">
        <div className="section-shell">
          <div className="border-l-[3px] border-l-[var(--rd-purple)] bg-[var(--rd-bg-soft)] px-5 py-4 sm:px-6">
            <p className="text-base leading-8 text-[var(--rd-text-body)]">
              Bij elk website- of app-project is een hostingabonnement verplicht. Dit zorgt ervoor
              dat jouw project online blijft, veilig is en up-to-date.
            </p>
          </div>
        </div>
      </section>

      <section className="section-space pt-4">
        <div className="section-shell">
          <SectionHeading
            eyebrow="Websiteprojecten"
            title="Eenmalige kost voor websites"
            description="Deze pakketten geven een duidelijke richtlijn voor de meeste websiteprojecten. Voor extra functionaliteiten bekijken we samen wat nodig is."
          />

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            <PricingCard
              title="Starter"
              price="Vanaf €600"
              description="Voor een landingspagina of compacte website die snel online moet staan."
              features={[
                "Landingspagina of 1–3 pagina's",
                "Responsief design",
                "Contactformulier",
                "Basis-SEO",
                "Oplevering binnen 2 weken",
              ]}
            />

            <PricingCard
              title="Professioneel"
              price="€1.200 – €2.500"
              description="Voor groeigerichte bedrijven die meer content, SEO en flexibiliteit nodig hebben."
              badge="Meest gekozen"
              highlighted
              features={[
                "Tot 10 pagina's",
                "Geavanceerde SEO",
                "CMS-integratie",
                "Google Analytics & Search Console",
                "Animaties & microinteracties",
              ]}
            />

            <PricingCard
              title="Maatwerk"
              price="Op aanvraag, vanaf €2.500"
              description="Voor grotere websites, webshops of trajecten met specifieke technische vereisten."
              features={[
                "Onbeperkte pagina's",
                "Webshop met Stripe of Mollie",
                "Complexe integraties en functionaliteiten",
                "Volledig op maat uitgewerkt",
              ]}
            />
          </div>
        </div>
      </section>

      <section className="section-space rd-soft-section">
        <div className="section-shell">
          <SectionHeading
            eyebrow="Hosting & onderhoud"
            title="Twee duidelijke opties naast de ontwikkelkost"
            description="Hosting is verplicht bij elk website- en app-project en wordt apart gefactureerd naast de eenmalige ontwikkelkost."
          />

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <InfoCard
              icon={<ShieldIcon />}
              accent="purple"
              title="Optie 1 — Hosting + onderhoud"
              description="€50 / maand"
            >
              <ul className="space-y-3 text-sm leading-7 sm:text-base">
                <li>Hosting van je website of app</li>
                <li>SSL-certificaat</li>
                <li>Technische beschikbaarheid gegarandeerd</li>
                <li>Verplicht bij elk project</li>
              </ul>
            </InfoCard>

            <InfoCard
              icon={<AnalyticsIcon />}
              accent="purple"
              title="Optie 2 — Hosting + Google Ads ondersteuning"
              description="Vanaf €250 / maand"
            >
              <ul className="space-y-3 text-sm leading-7 sm:text-base">
                <li>Alles van Optie 1</li>
                <li>Opzetten en beheren van Google Ads campagnes</li>
                <li>Maandelijkse rapportage</li>
                <li>Optimalisatie van advertentiebudget</li>
              </ul>
            </InfoCard>
          </div>

          <p className="mt-6 text-sm leading-7 text-[var(--rd-text-muted)] sm:text-base">
            Hosting is verplicht bij elk website- en app-project en wordt apart gefactureerd naast
            de eenmalige ontwikkelkost.
          </p>
        </div>
      </section>

      <section className="section-space">
        <div className="section-shell">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.58fr)_minmax(0,0.42fr)] lg:items-start">
            <SectionHeading
              eyebrow="Apps & software"
              title="Prijs volledig op aanvraag"
              description="Elk project wordt individueel bekeken op basis van complexiteit, gewenste functionaliteiten en timing. Een vrijblijvende intake is altijd de eerste stap."
            />

            <div className="lg:pt-3">
              <ButtonLink href="/contact" size="lg">
                Bespreek jouw project
              </ButtonLink>
            </div>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            <InfoCard
              icon={<MobileIcon />}
              title="Apps"
              description="Voor mobiele toepassingen kijken we naar schermen, flows, backend, publicatie en onderhoud."
            />
            <InfoCard
              icon={<SoftwareIcon />}
              title="Software op maat"
              description="Voor dashboards, interne tools en platformen bepalen scope en logica hoe het budget wordt opgebouwd."
            />
            <InfoCard
              icon={<GlobeIcon />}
              title="Vrijblijvende intake"
              description="We luisteren eerst naar je noden en vertalen die daarna naar een realistische offerte en planning."
            />
          </div>
        </div>
      </section>

      <section className="section-space rd-soft-section">
        <div className="section-shell">
          <SectionHeading
            eyebrow="FAQ"
            title="Veelgestelde vragen over prijzen en samenwerking"
            description="Nog twijfels over hosting, timing of de manier van samenwerken? Hieronder vind je de antwoorden op de vragen die we het vaakst krijgen."
          />

          <div className="mt-12">
            <FaqAccordion items={faqItems} />
          </div>
        </div>
      </section>

      <PageLinks currentPath="/prijzen" />
    </>
  );
}
