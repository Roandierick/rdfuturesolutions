import { ButtonLink } from "@/components/button-link";
import { FaqAccordion } from "@/components/faq-accordion";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { createMetadata } from "@/lib/seo";

const pricingItems = [
  {
    title: "AI-strategie & advies",
    setup: "vanaf €500",
    recurring: "optioneel €150/maand (opvolging en bijsturing)",
    description:
      "Een strategiesessie met concrete roadmap voor AI in jouw bedrijf.",
  },
  {
    title: "AI-automatisering",
    setup: "vanaf €1.500",
    recurring: "€110–€250/maand (monitoring, onderhoud, optimalisatie)",
    description:
      "Automatisering van repetitieve processen op maat van jouw werking.",
  },
  {
    title: "AI-chatbots & klantenservice",
    setup: "vanaf €2.000",
    recurring: "€110/maand (monitoring, updates, optimalisatie)",
    description:
      "Een slimme chatbot die jouw klanten 24/7 helpt en leads capteert.",
  },
  {
    title: "AI Startup Assistant",
    setup: "vanaf €3.000",
    recurring: "vanaf €500/maand (onderhoud, ads, opvolging)",
    description:
      "Alles voor starters op één plek: website, branding, funnel, chatbot en advertenties.",
  },
  {
    title: "Custom AI Tools",
    setup: "op aanvraag",
    recurring: "op aanvraag",
    description:
      "Maatwerk AI-tools afgestemd op jouw specifieke noden en sector.",
  },
] as const;

const faqItems = [
  {
    question: "Wat zit er in de eenmalige kost?",
    answer:
      "De eenmalige kost dekt de volledige analyse, strategie, bouw en implementatie van jouw AI-oplossing. Alles wat nodig is om de oplossing werkend op te leveren.",
  },
  {
    question: "Waarom is er een maandelijkse kost?",
    answer:
      "AI-oplossingen hebben actieve opvolging nodig. Modellen worden bijgewerkt, jouw bedrijf evolueert en wat vandaag werkt moet morgen nog beter presteren. Het maandelijks bedrag dekt monitoring, updates en continue optimalisatie.",
  },
  {
    question: "Kan ik starten zonder maandelijks abonnement?",
    answer:
      "Voor AI-strategie & advies is het maandelijks abonnement optioneel. Voor alle andere diensten is opvolging verplicht — zonder onderhoud kan een AI-implementatie snel verouderen of falen.",
  },
  {
    question: "Hoe verloopt de samenwerking?",
    answer:
      "Alles start met een gratis en vrijblijvend gesprek. Daarna ontvang je een concreet voorstel met scope, prijs en planning. Pas als je akkoord gaat, starten we.",
  },
  {
    question: "Werk je ook buiten Diest?",
    answer:
      "Ja. RD Future Solutions is gevestigd in Diest maar werkt voor klanten in heel België via online meetings en duidelijke projectopvolging.",
  },
  {
    question: "Zijn er verborgen kosten?",
    answer:
      "Nee. Alle kosten worden op voorhand besproken en vastgelegd. Geen verrassingen achteraf.",
  },
] as const;

export const metadata = createMetadata({
  title: "Prijzen AI-integratie & consultancy België",
  description:
    "Transparante prijsstructuur voor AI-strategie, automatisering, chatbots en custom AI tools. Eenmalige kost + maandelijkse opvolging.",
  path: "/prijzen",
  keywords: [
    "AI integratie prijs België",
    "AI consultant tarief",
    "AI chatbot kosten",
    "AI automatisering prijs KMO",
  ],
});

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Prijzen"
        title="Eerlijke prijzen voor AI die echt werkt"
        description="Elk project is anders. Daarom werken we met een combinatie van een eenmalige opstartkost en een maandelijks bedrag voor opvolging en optimalisatie. Geen verrassingen, geen verborgen kosten."
        primaryCta={{ href: "/contact", label: "Boek een gratis gesprek" }}
        secondaryCta={{ href: "/diensten", label: "Bekijk de diensten" }}
      />

      <section className="section-space pt-4">
        <div className="section-shell">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rd-card p-6 sm:p-8">
              <p className="mono-label">Eenmalige kost</p>
              <h3 className="mt-4 text-[1.45rem] sm:text-[1.6rem]">Eenmalige opstartkost</h3>
              <p className="mt-4 text-sm leading-7 sm:text-base">
                Dit dekt de analyse, strategie, bouw en implementatie van jouw AI-oplossing. De
                prijs hangt af van de complexiteit en scope van jouw project.
              </p>
            </div>

            <div className="rd-card p-6 sm:p-8">
              <p className="mono-label">Maandelijks</p>
              <h3 className="mt-4 text-[1.45rem] sm:text-[1.6rem]">Maandelijkse opvolging</h3>
              <p className="mt-4 text-sm leading-7 sm:text-base">
                AI staat niet stil. Modellen evolueren, jouw bedrijf groeit. Het maandelijks bedrag
                zorgt dat wij actief blijven monitoren, optimaliseren en bijsturen — zodat jouw
                investering blijft renderen.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-space pt-0">
        <div className="section-shell">
          <SectionHeading
            eyebrow="Prijsstructuur"
            title="Richtprijzen per dienst"
            description="Elk traject start met een vrijblijvende intake. Op basis daarvan bepalen we de exacte scope, de eenmalige opstartkost en de maandelijkse opvolging."
          />

          <div className="mt-12 grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
            {pricingItems.map((item) => (
              <div
                key={item.title}
                className="rd-card border-l-[3px] border-l-[var(--rd-purple)] p-6 sm:p-7"
              >
                <p className="mono-label text-[var(--rd-purple)]">Dienst</p>
                <h3 className="mt-4">{item.title}</h3>

                <div className="mt-6 space-y-4">
                  <div>
                    <p className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-[var(--rd-text-muted)]">
                      Eenmalig
                    </p>
                    <p className="mt-2 text-[1.65rem] font-semibold leading-none text-[var(--rd-text)]">
                      {item.setup}
                    </p>
                  </div>

                  <div>
                    <p className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-[var(--rd-text-muted)]">
                      Recurring
                    </p>
                    <p className="mt-2 text-sm leading-7 text-[var(--rd-text)] sm:text-base">
                      {item.recurring}
                    </p>
                  </div>
                </div>

                <p className="mt-6 text-sm leading-7 sm:text-base">{item.description}</p>
              </div>
            ))}
          </div>

          <p className="mt-6 text-sm italic leading-7 text-[var(--rd-text-muted)] sm:text-base">
            Alle prijzen zijn exclusief BTW. Maandelijkse kosten worden gefactureerd per
            kalendermaand. Prijzen zijn richtprijzen — elk project start met een vrijblijvend
            gesprek.
          </p>
        </div>
      </section>

      <section className="section-space pt-0">
        <div className="section-shell">
          <div className="border border-transparent bg-[linear-gradient(#fff,#fff)_padding-box,var(--rd-gradient)_border-box] p-8 md:p-10 lg:p-12">
            <SectionHeading
              centered
              eyebrow="Gratis gesprek"
              title="Klaar om te starten?"
              description="Boek een gratis en vrijblijvend gesprek. We bekijken samen wat AI voor jouw bedrijf kan betekenen en wat het concreet kost."
            />

            <div className="mt-8 flex justify-center">
              <ButtonLink href="/contact" size="lg">
                Boek nu een gesprek
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <section className="section-space rd-soft-section">
        <div className="section-shell">
          <SectionHeading
            eyebrow="FAQ"
            title="Veelgestelde vragen over prijzen en samenwerking"
            description="Nog vragen over de prijsstructuur, opvolging of de manier van samenwerken? Hieronder vind je de antwoorden op de vragen die we het vaakst krijgen."
          />

          <div className="mt-12">
            <FaqAccordion items={faqItems} />
          </div>
        </div>
      </section>
    </>
  );
}
