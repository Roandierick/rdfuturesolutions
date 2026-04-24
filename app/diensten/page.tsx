import { ButtonLink } from "@/components/button-link";
import {
  SearchIcon,
  ShieldIcon,
  SoftwareIcon,
  SparkIcon,
} from "@/components/icons";
import { PageHero } from "@/components/page-hero";
import { PageLinks } from "@/components/page-links";
import { SectionHeading } from "@/components/section-heading";
import { ServiceAccordions } from "@/components/service-accordions";
import { StructuredData } from "@/components/structured-data";
import { createMetadata, serviceSchemas } from "@/lib/seo";

const serviceItems = [
  {
    number: "01",
    title: "Website laten maken in Vlaanderen",
    description:
      "Professionele, snelle en SEO-geoptimaliseerde websites volledig op maat. Geen templates, geen beperkingen. Van een strakke landingspagina tot een uitgebreide bedrijfswebsite met CMS.",
    features: [
      "Uniek design op maat",
      "Volledig responsief op mobiel en desktop",
      "Basis-SEO met meta-data, sitemap en titels",
      "Contactformulier en optioneel CMS",
      "Advies over domein en online structuur",
    ],
    audienceTitle: "Voor wie",
    audienceText:
      "Voor KMO's, zelfstandigen, starters en lokale handelaars in Vlaanderen die professioneel online zichtbaar willen zijn en gevonden willen worden op Google.",
    noteTitle: "Belangrijke opmerking",
    noteText:
      "Hosting is verplicht bij elk websiteproject. Zo blijft je website veilig, online en technisch up-to-date. Meer info vind je op de pagina met prijzen.",
    ctaHref: "/contact",
    ctaLabel: "Vraag een offerte aan",
  },
  {
    number: "02",
    title: "App laten maken",
    description:
      "Mobiele apps voor iOS en Android, gebouwd met React Native. Van concept tot live in de App Store en Google Play.",
    features: [
      "UX/UI design en functionele flow",
      "Cross-platform development voor iOS en Android",
      "API-integraties en koppelingen met externe systemen",
      "Begeleiding bij publicatie in de stores",
    ],
    audienceTitle: "Voor wie",
    audienceText:
      "Voor ondernemers met een app-idee en bedrijven die een mobiele tool willen bouwen voor klanten, teams of interne processen.",
    noteTitle: "Belangrijke opmerking",
    noteText:
      "Hosting of backend-infrastructuur is verplicht bij elk app-project. Dat is nodig voor veiligheid, beschikbaarheid en toekomstige uitbreidingen.",
    ctaHref: "/contact",
    ctaLabel: "Bespreek jouw app-idee",
  },
  {
    number: "03",
    title: "Software op maat",
    description:
      "Dashboards, automatiseringstools, interne platformen en SaaS-producten op maat wanneer standaardsoftware niet volstaat.",
    features: [
      "Requirements analyse en functionele afstemming",
      "Volledige development, testing en deployment",
      "Documentatie en overdraagbare technische basis",
      "Doorontwikkeling wanneer je product groeit",
    ],
    audienceTitle: "Voor wie",
    audienceText:
      "Voor bedrijven met specifieke procesbehoeften en startups die een digitaal product willen bouwen dat niet in een standaardpakket past.",
    noteTitle: "Prijs",
    noteText:
      "Volledig op aanvraag, afhankelijk van scope, koppelingen, gebruikersrollen en complexiteit. Elk traject start met een vrijblijvende intake.",
    ctaHref: "/contact",
    ctaLabel: "Start een vrijblijvende intake",
  },
] as const;

const processSteps = [
  {
    title: "Kennismaking en analyse",
    description:
      "We bekijken je doel, doelgroep, timing en welke oplossing het meeste impact zal maken.",
    icon: <SearchIcon />,
  },
  {
    title: "Voorstel en planning",
    description:
      "Je krijgt een duidelijke scope, prijsindicatie en planning zodat je weet waar je aan toe bent.",
    icon: <SparkIcon />,
  },
  {
    title: "Design en development",
    description:
      "We bouwen iteratief, houden de communicatie kort en sturen bij op basis van feedback.",
    icon: <SoftwareIcon />,
  },
  {
    title: "Oplevering en ondersteuning",
    description:
      "Na testing en launch zorgen we ervoor dat je project stabiel online blijft en verder kan groeien.",
    icon: <ShieldIcon />,
  },
] as const;

export const metadata = createMetadata({
  title: "Diensten",
  description:
    "Website laten maken in Vlaanderen, app laten bouwen of software op maat ontwikkelen? Bekijk de diensten van RD Future Solutions.",
  path: "/diensten",
});

export default function ServicesPage() {
  return (
    <>
      <StructuredData data={serviceSchemas} />

      <PageHero
        eyebrow="Diensten"
        title="Digitale diensten voor ondernemers die vooruit willen"
        description="RD Future Solutions bouwt websites, apps en software op maat voor KMO's, zelfstandigen en startups in Vlaanderen. Altijd modern ontwikkeld, helder gecommuniceerd en afgestemd op jouw groeiplannen."
        primaryCta={{ href: "/contact", label: "Vraag een offerte aan" }}
        secondaryCta={{ href: "/prijzen", label: "Bekijk de prijzen" }}
      />

      <ServiceAccordions items={serviceItems} />

      <section className="section-space rd-soft-section">
        <div className="section-shell">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.62fr)_minmax(0,0.38fr)] lg:items-end">
            <SectionHeading
              eyebrow="Hoe we werken"
              title="Van eerste gesprek tot oplevering"
            />

            <p className="max-w-lg text-base leading-8 text-[var(--rd-text-body)] sm:text-lg lg:justify-self-end">
              Een goed digitaal project vraagt niet alleen code, maar ook structuur. Daarom werken
              we met een duidelijk proces dat houvast geeft.
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

      <PageLinks currentPath="/diensten" />
    </>
  );
}
