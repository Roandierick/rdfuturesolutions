import Link from "next/link";
import { ButtonLink } from "@/components/button-link";
import { ClockIcon, HandshakeIcon, LocationIcon } from "@/components/icons";
import { PricingCard } from "@/components/pricing-card";
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
  },
  {
    title: "App ontwikkeling",
    description:
      "Mobiele apps voor iOS en Android, van idee en ontwerp tot publicatie in de stores.",
    href: "/diensten",
    linkLabel: "Bekijk app ontwikkeling",
  },
  {
    title: "Software op maat",
    description:
      "Dashboards, tools en platformen wanneer standaardsoftware niet ver genoeg gaat voor jouw bedrijf.",
    href: "/diensten",
    linkLabel: "Lees over maatwerksoftware",
  },
] as const;

const trustItems = [
  { emphasis: "5+", label: "jaar ervaring" },
  { emphasis: "Actief", label: "in heel Vlaanderen" },
  { emphasis: "Geen templates", label: "wel maatwerk" },
  { emphasis: "Directe lijn", label: "met de developer" },
] as const;

const expectationItems = [
  {
    title: "Snel schakelen",
    description: "Geen lagen van accountmanagers, wel rechtstreeks contact met de developer.",
  },
  {
    title: "Sterke technische basis",
    description: "Next.js, React Native en moderne tooling voor performante digitale producten.",
  },
  {
    title: "Helder traject",
    description:
      "Duidelijke scope, transparante prijzen en een aanpak die meegroeit met jouw bedrijf.",
  },
] as const;

const founderHighlights = [
  {
    title: "5+ jaar ervaring",
    description: "Roan Dierick, oprichter, 20 jaar en meer dan 5 jaar praktijkervaring.",
    icon: <ClockIcon />,
  },
  {
    title: "Actief in Vlaanderen",
    description: "Gevestigd in Diest en actief voor klanten in heel Vlaanderen.",
    icon: <LocationIcon />,
  },
  {
    title: "Directe communicatie",
    description: "Geen groot bureau, wel directe communicatie zonder tussenpersonen.",
    icon: <HandshakeIcon />,
  },
  {
    title: "Snelle oplevering",
    description: "Snelle oplevering, transparante samenwerking en heldere planning.",
    icon: <ClockIcon />,
  },
] as const;

const extraFounderHighlight =
  "Scherpe prijzen zonder in te boeten op kwaliteit of ondersteuning.";

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
] as const;

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

      <section className="relative isolate flex min-h-[calc(100vh-6rem)] items-center overflow-hidden md:min-h-[calc(100vh-7rem)]">
        <div className="section-shell relative py-10 md:py-14 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-center lg:gap-14">
            <div className="min-w-0">
              <div className="space-y-3">
                <p className="mono-label">WEBBUREAU · DIEST · VLAANDEREN</p>
                <p className="text-sm leading-7 text-[var(--rd-text-muted)]">
                  Webdesign, apps en software op maat vanuit Diest
                </p>
              </div>

              <h1 className="mt-8 max-w-5xl">
                Jouw website, app of software
                <span className="block">
                  <span className="gradient-text">vakkundig gebouwd</span> in Vlaanderen
                </span>
              </h1>

              <div className="mt-6 lg:pl-16">
                <p className="max-w-[32rem] text-base leading-8 text-[var(--rd-text-body)] sm:text-lg">
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
              </div>

              <div className="mt-12 flex items-center gap-4">
                <span className="section-divider max-w-[10rem] flex-1" />
                <span className="mono-label text-[var(--rd-text-muted)]">Scroll</span>
                <span className="scroll-dot" />
              </div>
            </div>

            <aside className="rd-card border-l-[3px] border-l-[var(--rd-blue)] bg-white p-6 sm:p-8">
              <p className="mono-label">Wat je mag verwachten</p>

              <div className="mt-8 space-y-6">
                {expectationItems.map((item) => (
                  <div
                    key={item.title}
                    className="border-b border-[var(--rd-border)] pb-6 last:border-b-0 last:pb-0"
                  >
                    <h3>{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 sm:text-base">{item.description}</p>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="rd-soft-section py-6">
        <div className="section-shell">
          <div className="grid grid-cols-2 divide-x divide-y divide-[var(--rd-border)] overflow-hidden border border-[var(--rd-border)] md:grid-cols-4 md:divide-y-0">
            {trustItems.map((item) => (
              <div key={`${item.emphasis}-${item.label}`} className="px-4 py-5 sm:px-6">
                <p className="text-[1.75rem] font-semibold leading-none text-[var(--rd-text-body)]">
                  {item.emphasis}
                </p>
                <p className="mt-2 font-mono text-[0.75rem] uppercase tracking-[0.15em] text-[var(--rd-text-muted)]">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space rd-soft-section">
        <div className="section-shell">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.62fr)_minmax(0,0.38fr)] lg:items-end">
            <SectionHeading
              index="01"
              eyebrow="Diensten"
              title="Digitale oplossingen voor ondernemers in Vlaanderen"
            />

            <p className="max-w-lg text-base leading-8 text-[var(--rd-text-body)] sm:text-lg lg:justify-self-end">
              Of je nu een website wilt laten maken in Vlaanderen, een mobiele app wilt lanceren of
              software op maat zoekt: we bouwen steeds vanuit jouw doel, doelgroep en budget.
            </p>
          </div>

          <div className="mt-14 border-t border-[var(--rd-border)]">
            {services.map((service, index) => (
              <div
                key={service.title}
                className="grid gap-6 border-b border-[var(--rd-border)] py-8 lg:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)] lg:gap-10"
              >
                <div className="relative min-w-0 pl-6">
                  <span className="absolute left-0 top-0 font-display text-6xl italic leading-none text-[rgba(41,82,204,0.12)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="relative border-l-[3px] border-l-[var(--rd-blue)] pl-5">
                    <h3 className="text-[1.35rem]">{service.title}</h3>
                  </div>
                </div>

                <div className="min-w-0 lg:pt-2">
                  <p className="max-w-2xl text-base leading-8 text-[var(--rd-text-body)] sm:text-lg">
                    {service.description}
                  </p>
                  <Link
                    href={service.href}
                    className="mt-4 inline-flex text-sm font-semibold text-[var(--rd-blue)] transition hover:text-[var(--rd-purple)]"
                  >
                    {service.linkLabel}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="section-shell">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.62fr)_minmax(0,0.38fr)] lg:items-end">
            <SectionHeading
              index="02"
              eyebrow="Waarom RD Future Solutions"
              title="Persoonlijke samenwerking, zonder bureaugedoe"
            />

            <p className="max-w-lg text-base leading-8 text-[var(--rd-text-body)] sm:text-lg lg:justify-self-end">
              Je werkt rechtstreeks samen met Roan Dierick. Dat betekent minder ruis, sneller
              feedback verwerken en oplossingen die technisch sterk zijn zonder onnodige overhead.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {founderHighlights.map((item) => (
              <div key={item.title} className="rd-card border-l-[3px] border-l-[var(--rd-blue)] p-6">
                <span className="rd-icon-square">{item.icon}</span>
                <h3 className="mt-6">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 sm:text-base">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 border-l-[3px] border-l-[var(--rd-purple)] bg-[var(--rd-bg-soft)] p-6">
            <p className="mono-label">Extra</p>
            <p className="mt-3 text-sm leading-7 sm:text-base">{extraFounderHighlight}</p>
          </div>

          <div className="mt-8">
            <ButtonLink href="/over-ons" variant="secondary">
              Lees meer over ons
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="section-space rd-soft-section">
        <div className="section-shell">
          <SectionHeading
            index="03"
            eyebrow="Prijzen"
            title="Betaalbare trajecten, helder uitgelegd"
            description="Je hoeft geen groot budget te hebben om professioneel online te gaan. Hieronder zie je hoe websiteprojecten meestal worden opgedeeld."
          />

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {priceTeasers.map((tier, index) => (
              <PricingCard
                key={tier.title}
                title={tier.title}
                price={tier.price}
                description={tier.details}
                badge={index === 1 ? "Meest gekozen" : undefined}
                highlighted={index === 1}
                ctaHref="/prijzen"
                ctaLabel="Bekijk alle prijzen"
                features={
                  index === 0
                    ? [
                        "Voor een landingspagina of compacte website die snel live moet staan.",
                        "Transparante prijsstructuur.",
                        "Helder traject zonder onnodige overhead.",
                      ]
                    : index === 1
                      ? [
                          "Voor bedrijven die meer pagina's, SEO en een CMS-integratie nodig hebben.",
                          "Sterke balans tussen inhoud, flexibiliteit en budget.",
                          "Een vaak gekozen traject voor groeigerichte bedrijven.",
                        ]
                      : [
                          "Voor grotere websites, webshops en projecten met complexe functionaliteiten.",
                          "Geschikt voor bedrijven met specifieke technische vereisten.",
                          "Volledig afgestemd op scope en ambities.",
                        ]
                }
              />
            ))}
          </div>
        </div>
      </section>

      <section className="pb-16 md:pb-20">
        <div className="section-shell">
          <div className="border border-transparent bg-[linear-gradient(#fff,#fff)_padding-box,var(--rd-gradient)_border-box] p-8 md:p-10 lg:p-12">
            <SectionHeading
              centered
              eyebrow="Klaar voor de volgende stap"
              title="Klaar om je digitale aanwezigheid te versterken?"
              description="Vertel ons waar je naartoe wilt met je bedrijf. We bekijken graag welke website, app of software-oplossing het beste past bij jouw situatie."
            />

            <div className="mt-8 flex justify-center">
              <ButtonLink href="/contact" size="lg">
                Vraag een gratis offerte aan
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
