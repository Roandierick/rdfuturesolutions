import { ButtonLink } from "@/components/button-link";
import {
  ClockIcon,
  GlobeIcon,
  HandshakeIcon,
  LocationIcon,
  MobileIcon,
  SoftwareIcon,
} from "@/components/icons";
import { InfoCard } from "@/components/info-card";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { StructuredData } from "@/components/structured-data";
import { createMetadata, localBusinessSchema } from "@/lib/seo";

const services = [
  {
    title: "Website op maat",
    description:
      "Strakke, snelle en SEO-geoptimaliseerde websites voor KMO's en zelfstandigen die professioneel online willen groeien.",
    href: "/diensten",
    linkLabel: "Ontdek webdesign",
    icon: <GlobeIcon />,
  },
  {
    title: "App ontwikkeling",
    description:
      "Mobiele apps voor iOS en Android, van idee en ontwerp tot publicatie in de stores.",
    href: "/diensten",
    linkLabel: "Bekijk app ontwikkeling",
    icon: <MobileIcon />,
  },
  {
    title: "Software op maat",
    description:
      "Dashboards, tools en platformen wanneer standaardsoftware niet ver genoeg gaat voor jouw bedrijf.",
    href: "/diensten",
    linkLabel: "Lees over maatwerksoftware",
    icon: <SoftwareIcon />,
  },
] as const;

const trustItems = [
  "5+ jaar ervaring",
  "Actief in heel Vlaanderen",
  "Geen templates — wel maatwerk",
  "Directe lijn met de developer",
];

const founderHighlights = [
  "Roan Dierick, oprichter, 20 jaar en meer dan 5 jaar praktijkervaring.",
  "Gevestigd in Diest en actief voor klanten in heel Vlaanderen.",
  "Geen groot bureau, wel directe communicatie zonder tussenpersonen.",
  "Snelle oplevering, transparante samenwerking en heldere planning.",
  "Scherpe prijzen zonder in te boeten op kwaliteit of ondersteuning.",
];

const priceTeasers = [
  {
    title: "Starter",
    price: "Vanaf €600",
    details: "Voor een landingspagina of compacte website die snel live moet staan.",
  },
  {
    title: "Professioneel",
    price: "€1.200 – €2.500",
    details: "Voor bedrijven die meer pagina's, SEO en een CMS-integratie nodig hebben.",
  },
  {
    title: "Maatwerk",
    price: "Vanaf €2.500",
    details: "Voor grotere websites, webshops en projecten met complexe functionaliteiten.",
  },
];

export const metadata = createMetadata({
  title: "Website laten maken in Vlaanderen",
  description:
    "RD Future Solutions bouwt professionele websites, apps en software op maat voor KMO's, freelancers en ondernemers in Vlaanderen.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <StructuredData data={localBusinessSchema} />
      <section className="relative overflow-hidden pb-14 pt-6 sm:pb-20 sm:pt-10">
        <div className="absolute right-[-8%] top-[-10%] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,_rgba(123,53,232,0.15)_0%,_rgba(255,255,255,0)_70%)]" />
        <div className="absolute right-[10%] top-[5%] h-80 w-80 rounded-full bg-[radial-gradient(circle,_rgba(0,200,255,0.16)_0%,_rgba(255,255,255,0)_72%)]" />
        <div className="section-shell relative">
          <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]">
            <Reveal className="max-w-3xl min-w-0">
              <span className="inline-flex max-w-full rounded-full border border-[var(--rd-border-accent)] bg-[rgba(41,82,204,0.08)] px-4 py-1 text-sm font-medium text-[var(--rd-blue)]">
                Webdesign, apps en software op maat vanuit Diest
              </span>
              <h1 className="mt-6 text-3xl font-semibold leading-tight text-balance sm:text-4xl md:text-5xl lg:text-6xl">
                Jouw website, app of software{" "}
                <span className="gradient-text">vakkundig gebouwd</span> in Vlaanderen
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-7 text-[var(--rd-text-body)] sm:text-lg sm:leading-8">
                RD Future Solutions ontwerpt en bouwt professionele digitale oplossingen voor
                KMO&apos;s en zelfstandigen in Vlaanderen. Snel, betaalbaar en volledig op maat.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                <ButtonLink href="/contact" size="lg">
                  Gratis offerte aanvragen
                </ButtonLink>
                <ButtonLink href="/diensten" variant="secondary" size="lg">
                  Bekijk onze diensten
                </ButtonLink>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="rd-card w-full p-5 sm:p-6 lg:p-8">
                <h2 className="text-xl font-semibold sm:text-2xl">Wat je mag verwachten</h2>
                <div className="mt-6 space-y-4">
                  <div className="rounded-2xl bg-[var(--rd-bg-soft)] p-4">
                    <h3 className="text-lg font-semibold">Snel schakelen</h3>
                    <p className="mt-2 text-sm leading-7 sm:text-base">
                      Geen lagen van accountmanagers, wel rechtstreeks contact met de developer.
                    </p>
                  </div>
                  <div className="rounded-2xl bg-[var(--rd-bg-soft)] p-4">
                    <h3 className="text-lg font-semibold">Sterke technische basis</h3>
                    <p className="mt-2 text-sm leading-7 sm:text-base">
                      Next.js, React Native en moderne tooling voor performante digitale producten.
                    </p>
                  </div>
                  <div className="rounded-2xl bg-[var(--rd-bg-soft)] p-4">
                    <h3 className="text-lg font-semibold">Helder traject</h3>
                    <p className="mt-2 text-sm leading-7 sm:text-base">
                      Duidelijke scope, transparante prijzen en een aanpak die meegroeit met jouw
                      bedrijf.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-[var(--rd-bg-soft)] py-6">
        <div className="section-shell">
          <div className="grid gap-4 text-sm font-medium text-[var(--rd-text)] sm:grid-cols-2 lg:grid-cols-4">
            {trustItems.map((item, index) => (
              <Reveal key={item} delay={index * 70}>
                <div className="rounded-2xl border border-[var(--rd-border)] bg-white px-4 py-4 text-center shadow-card">
                  {item}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="section-shell">
          <Reveal>
            <SectionHeading
              eyebrow="Onze diensten"
              title="Digitale oplossingen voor ondernemers in Vlaanderen"
              description="Of je nu een website wilt laten maken in Vlaanderen, een mobiele app wilt lanceren of software op maat zoekt: we bouwen steeds vanuit jouw doel, doelgroep en budget."
            />
          </Reveal>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {services.map((service, index) => (
              <Reveal key={service.title} delay={index * 90}>
                <InfoCard {...service} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space bg-[var(--rd-bg-soft)]">
        <div className="section-shell">
          <Reveal>
            <div className="mx-auto max-w-5xl">
              <SectionHeading
                eyebrow="Waarom RD Future Solutions"
                title="Persoonlijke samenwerking, zonder bureaugedoe"
                description="Je werkt rechtstreeks samen met Roan Dierick. Dat betekent minder ruis, sneller feedback verwerken en oplossingen die technisch sterk zijn zonder onnodige overhead."
              />
              <div className="mt-8 space-y-4">
                {founderHighlights.map((item, index) => (
                  <div
                    key={item}
                    className="rd-card flex items-start gap-4 p-5"
                    style={{ transitionDelay: `${index * 60}ms` }}
                  >
                    <span className="icon-chip h-10 w-10 flex-none">
                      {index === 0 ? (
                        <ClockIcon />
                      ) : index === 1 ? (
                        <LocationIcon />
                      ) : (
                        <HandshakeIcon />
                      )}
                    </span>
                    <p className="leading-7">{item}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <ButtonLink href="/over-ons" variant="secondary">
                  Lees meer over ons
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-space">
        <div className="section-shell">
          <Reveal>
            <SectionHeading
              eyebrow="Prijzen"
              title="Betaalbare trajecten, helder uitgelegd"
              description="Je hoeft geen groot budget te hebben om professioneel online te gaan. Hieronder zie je hoe websiteprojecten meestal worden opgedeeld."
            />
          </Reveal>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {priceTeasers.map((tier, index) => (
              <Reveal key={tier.title} delay={index * 90}>
                <InfoCard
                  icon={index === 0 ? <GlobeIcon /> : index === 1 ? <ClockIcon /> : <SoftwareIcon />}
                  title={tier.title}
                  description={tier.details}
                  href="/prijzen"
                  linkLabel="Bekijk alle prijzen"
                >
                  <p className="text-xl font-semibold text-[var(--rd-text)] sm:text-2xl">{tier.price}</p>
                </InfoCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-16 sm:pb-20">
        <div className="section-shell">
          <Reveal>
            <div className="rd-card overflow-hidden bg-[var(--rd-bg-soft)] p-6 sm:p-8 lg:p-10">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-2xl">
                  <h2 className="text-2xl font-semibold sm:text-3xl">
                    Klaar om je digitale aanwezigheid te versterken?
                  </h2>
                  <p className="mt-4 text-base leading-7 text-[var(--rd-text-body)] sm:text-lg">
                    Vertel ons waar je naartoe wilt met je bedrijf. We bekijken graag welke website,
                    app of software-oplossing het beste past bij jouw situatie.
                  </p>
                </div>
                <ButtonLink href="/contact" size="lg">
                  Vraag een gratis offerte aan
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
