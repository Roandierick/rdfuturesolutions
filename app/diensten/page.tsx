import { ButtonLink } from "@/components/button-link";
import {
  GlobeIcon,
  MobileIcon,
  SearchIcon,
  ShieldIcon,
  SoftwareIcon,
  SparkIcon,
} from "@/components/icons";
import { PageHero } from "@/components/page-hero";
import { PageLinks } from "@/components/page-links";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { StructuredData } from "@/components/structured-data";
import { createMetadata, serviceSchemas } from "@/lib/seo";

const processSteps = [
  {
    title: "Kennismaking en analyse",
    description:
      "We bekijken je doel, doelgroep, timing en welke oplossing het meeste impact zal maken.",
  },
  {
    title: "Voorstel en planning",
    description:
      "Je krijgt een duidelijke scope, prijsindicatie en planning zodat je weet waar je aan toe bent.",
  },
  {
    title: "Design en development",
    description:
      "We bouwen iteratief, houden de communicatie kort en sturen bij op basis van feedback.",
  },
  {
    title: "Oplevering en ondersteuning",
    description:
      "Na testing en launch zorgen we ervoor dat je project stabiel online blijft en verder kan groeien.",
  },
];

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

      <section className="section-space">
        <div className="section-shell space-y-8">
          <Reveal>
            <div className="rd-card p-6 sm:p-8 lg:p-10">
              <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-start">
                <span className="icon-chip">
                  <GlobeIcon />
                </span>
                <div>
                  <h2 className="text-2xl font-semibold sm:text-3xl">Website laten maken in Vlaanderen</h2>
                  <p className="mt-2 text-base leading-7">
                    Professionele, snelle en SEO-geoptimaliseerde websites volledig op maat. Geen
                    templates, geen beperkingen. Van een strakke landingspagina tot een uitgebreide
                    bedrijfswebsite met CMS.
                  </p>
                </div>
              </div>
              <div className="mt-8 grid gap-6 lg:grid-cols-3">
                <div className="rounded-2xl bg-[var(--rd-bg-soft)] p-5">
                  <h3 className="text-xl font-semibold">Inbegrepen</h3>
                  <ul className="mt-4 space-y-3 text-sm leading-7 sm:text-base">
                    <li>Uniek design op maat</li>
                    <li>Volledig responsief op mobiel en desktop</li>
                    <li>Basis-SEO met meta-data, sitemap en titels</li>
                    <li>Contactformulier en optioneel CMS</li>
                    <li>Advies over domein en online structuur</li>
                  </ul>
                </div>
                <div className="rounded-2xl bg-[var(--rd-bg-soft)] p-5">
                  <h3 className="text-xl font-semibold">Voor wie</h3>
                  <p className="mt-4 text-sm leading-7 sm:text-base">
                    Voor KMO&apos;s, zelfstandigen, starters en lokale handelaars in Vlaanderen die
                    professioneel online zichtbaar willen zijn en gevonden willen worden op Google.
                  </p>
                </div>
                <div className="rounded-2xl bg-[var(--rd-bg-soft)] p-5">
                  <h3 className="text-xl font-semibold">Belangrijke opmerking</h3>
                  <p className="mt-4 text-sm leading-7 sm:text-base">
                    Hosting is verplicht bij elk websiteproject. Zo blijft je website veilig,
                    online en technisch up-to-date. Meer info vind je op de pagina met prijzen.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="rd-card p-6 sm:p-8 lg:p-10">
              <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-start">
                <span className="icon-chip">
                  <MobileIcon />
                </span>
                <div>
                  <h2 className="text-2xl font-semibold sm:text-3xl">App laten maken</h2>
                  <p className="mt-2 text-base leading-7">
                    Mobiele apps voor iOS en Android, gebouwd met React Native. Van concept tot live
                    in de App Store en Google Play.
                  </p>
                </div>
              </div>
              <div className="mt-8 grid gap-6 lg:grid-cols-3">
                <div className="rounded-2xl bg-[var(--rd-bg-soft)] p-5">
                  <h3 className="text-xl font-semibold">Inbegrepen</h3>
                  <ul className="mt-4 space-y-3 text-sm leading-7 sm:text-base">
                    <li>UX/UI design en functionele flow</li>
                    <li>Cross-platform development voor iOS en Android</li>
                    <li>API-integraties en koppelingen met externe systemen</li>
                    <li>Begeleiding bij publicatie in de stores</li>
                  </ul>
                </div>
                <div className="rounded-2xl bg-[var(--rd-bg-soft)] p-5">
                  <h3 className="text-xl font-semibold">Voor wie</h3>
                  <p className="mt-4 text-sm leading-7 sm:text-base">
                    Voor ondernemers met een app-idee en bedrijven die een mobiele tool willen
                    bouwen voor klanten, teams of interne processen.
                  </p>
                </div>
                <div className="rounded-2xl bg-[var(--rd-bg-soft)] p-5">
                  <h3 className="text-xl font-semibold">Belangrijke opmerking</h3>
                  <p className="mt-4 text-sm leading-7 sm:text-base">
                    Hosting of backend-infrastructuur is verplicht bij elk app-project. Dat is nodig
                    voor veiligheid, beschikbaarheid en toekomstige uitbreidingen.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={220}>
            <div className="rd-card p-6 sm:p-8 lg:p-10">
              <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-start">
                <span className="icon-chip">
                  <SoftwareIcon />
                </span>
                <div>
                  <h2 className="text-2xl font-semibold sm:text-3xl">Software op maat</h2>
                  <p className="mt-2 text-base leading-7">
                    Dashboards, automatiseringstools, interne platformen en SaaS-producten op maat
                    wanneer standaardsoftware niet volstaat.
                  </p>
                </div>
              </div>
              <div className="mt-8 grid gap-6 lg:grid-cols-3">
                <div className="rounded-2xl bg-[var(--rd-bg-soft)] p-5">
                  <h3 className="text-xl font-semibold">Inbegrepen</h3>
                  <ul className="mt-4 space-y-3 text-sm leading-7 sm:text-base">
                    <li>Requirements analyse en functionele afstemming</li>
                    <li>Volledige development, testing en deployment</li>
                    <li>Documentatie en overdraagbare technische basis</li>
                    <li>Doorontwikkeling wanneer je product groeit</li>
                  </ul>
                </div>
                <div className="rounded-2xl bg-[var(--rd-bg-soft)] p-5">
                  <h3 className="text-xl font-semibold">Voor wie</h3>
                  <p className="mt-4 text-sm leading-7 sm:text-base">
                    Voor bedrijven met specifieke procesbehoeften en startups die een digitaal
                    product willen bouwen dat niet in een standaardpakket past.
                  </p>
                </div>
                <div className="rounded-2xl bg-[var(--rd-bg-soft)] p-5">
                  <h3 className="text-xl font-semibold">Prijs</h3>
                  <p className="mt-4 text-sm leading-7 sm:text-base">
                    Volledig op aanvraag, afhankelijk van scope, koppelingen, gebruikersrollen en
                    complexiteit. Elk traject start met een vrijblijvende intake.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-space bg-[var(--rd-bg-soft)]">
        <div className="section-shell">
          <Reveal>
            <SectionHeading
              eyebrow="Hoe we werken"
              title="Van eerste gesprek tot oplevering"
              description="Een goed digitaal project vraagt niet alleen code, maar ook structuur. Daarom werken we met een duidelijk proces dat houvast geeft."
            />
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {processSteps.map((step, index) => (
              <Reveal key={step.title} delay={index * 80}>
                <div className="rd-card h-full w-full p-5 sm:p-6">
                  <span className="icon-chip">
                    {index === 0 ? (
                      <SearchIcon />
                    ) : index === 1 ? (
                      <SparkIcon />
                    ) : index === 2 ? (
                      <SoftwareIcon />
                    ) : (
                      <ShieldIcon />
                    )}
                  </span>
                  <h3 className="mt-6 text-xl font-semibold sm:text-2xl">{step.title}</h3>
                  <p className="mt-3 text-sm leading-7 sm:text-base">{step.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={220} className="mt-10">
            <div className="flex flex-col gap-4 sm:flex-row">
              <ButtonLink href="/prijzen">Bekijk de prijsstructuur</ButtonLink>
              <ButtonLink href="/contact" variant="secondary">
                Bespreek jouw project
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>

      <PageLinks currentPath="/diensten" />
    </>
  );
}
