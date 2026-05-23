import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/button-link";
import { EbookCheckoutButton } from "@/components/ebook-checkout-button";
import { CheckIcon } from "@/components/icons";
import { SectionHeading } from "@/components/section-heading";
import { StructuredData } from "@/components/structured-data";
import { ebooks, formatEbookPrice, getEbookBySlug } from "@/lib/ebooks";
import { siteConfig } from "@/lib/site";

type EbookDetailPageProps = {
  params: {
    slug: string;
  };
};

export const dynamicParams = false;

export function generateStaticParams() {
  return ebooks.map((ebook) => ({
    slug: ebook.slug,
  }));
}

export function generateMetadata({ params }: EbookDetailPageProps): Metadata {
  const ebook = getEbookBySlug(params.slug);

  if (!ebook) {
    return {
      title: {
        absolute: "Ebook niet gevonden | RD Future Solutions",
      },
    };
  }

  const title = `${ebook.title} | RD Future Solutions`;
  const description = `${ebook.subtitle}. ${ebook.description}`;

  return {
    title: {
      absolute: title,
    },
    description,
    alternates: {
      canonical: `/ebooks/${ebook.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `/ebooks/${ebook.slug}`,
      siteName: siteConfig.name,
      locale: "nl_BE",
      type: "article",
      images: [
        {
          url: `${siteConfig.siteUrl}/og-image.svg`,
          width: 1200,
          height: 630,
          alt: `${ebook.title} van RD Future Solutions`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${siteConfig.siteUrl}/og-image.svg`],
    },
    keywords: [
      ebook.title,
      "AI ebook België",
      "AI voor zelfstandigen",
      "AI voor ondernemers",
      "AI voor vakmensen",
    ],
  };
}

const purchaseHighlights = [
  "Veilige betaling via Stripe",
  "Directe PDF download na betaling",
  "Geen abonnement of terugkerende kosten",
] as const;

const includedItems = [
  "Directe PDF download na betaling",
  "Levenslange toegang tot je aankoop",
  "Geen abonnement, geen verborgen kosten",
] as const;

const audienceItems = [
  "Ambachtslieden die minder tijd willen verliezen aan randzaken",
  "Zelfstandigen die AI praktisch willen inzetten zonder technisch gedoe",
  "Kleine ondernemers die meer structuur, snelheid en rust willen in hun bedrijf",
] as const;

export default function EbookDetailPage({ params }: EbookDetailPageProps) {
  const ebook = getEbookBySlug(params.slug);

  if (!ebook) {
    notFound();
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "Book",
    name: ebook.title,
    description: ebook.description,
    inLanguage: "nl-BE",
    bookFormat: "EBook",
    numberOfPages: ebook.pages,
    author: {
      "@type": "Organization",
      name: siteConfig.name,
    },
    offers: {
      "@type": "Offer",
      price: ebook.price.toFixed(2),
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      url: `${siteConfig.siteUrl}/ebooks/${ebook.slug}`,
    },
  };

  return (
    <>
      <StructuredData data={schema} />

      <section className="relative isolate overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.98),rgba(255,255,255,0.72)_34%,transparent_58%),radial-gradient(circle_at_82%_16%,rgba(123,53,232,0.18),transparent_34%),radial-gradient(circle_at_72%_76%,rgba(41,82,204,0.14),transparent_32%),linear-gradient(180deg,#ffffff_0%,#f8f9ff_56%,#eef4ff_100%)]">
        <div className="section-shell relative py-10 md:py-14 lg:py-20">
          <div className="section-divider mb-8 md:mb-10" />

          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-3">
                <p className="mono-label">Ebook</p>
                {ebook.badge ? (
                  <span className="inline-flex rounded-full border border-[rgba(41,82,204,0.14)] bg-[var(--rd-gradient-soft)] px-3 py-1 text-sm font-semibold text-[var(--rd-blue)]">
                    {ebook.badge}
                  </span>
                ) : null}
              </div>

              <h1 className="mt-6 max-w-4xl">{ebook.title}</h1>
              <p className="mt-4 max-w-3xl text-xl font-semibold leading-8 text-[var(--rd-text)] sm:text-2xl">
                {ebook.subtitle}
              </p>
              <p className="mt-6 max-w-3xl text-base leading-8 text-[var(--rd-text-body)] sm:text-lg">
                {ebook.description}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <span className="inline-flex rounded-full border border-[var(--rd-border)] bg-white/80 px-4 py-2 text-sm font-medium text-[var(--rd-text)]">
                  {ebook.pages} pagina’s
                </span>
                <span className="inline-flex rounded-full border border-[var(--rd-border)] bg-white/80 px-4 py-2 text-sm font-medium text-[var(--rd-text)]">
                  Directe PDF download
                </span>
                <span className="inline-flex rounded-full border border-[var(--rd-border)] bg-white/80 px-4 py-2 text-sm font-medium text-[var(--rd-text)]">
                  Levenslange toegang
                </span>
              </div>
            </div>

            <aside className="rd-card border-l-[3px] border-l-[var(--rd-purple)] bg-white/95 p-6 shadow-[0_24px_80px_rgba(41,82,204,0.12)] backdrop-blur sm:p-7 lg:sticky lg:top-32">
              <p className="mono-label text-[var(--rd-purple)]">Koop direct</p>
              <p className="mt-4 text-[2.6rem] font-semibold leading-none text-[var(--rd-text)]">
                {formatEbookPrice(ebook.price)}
              </p>
              <p className="mt-3 text-sm leading-7 sm:text-base">
                {ebook.pages} pagina’s met praktische voorbeelden en duidelijke toepassingen voor
                ondernemers die snel resultaat willen.
              </p>

              <div className="mt-6">
                <EbookCheckoutButton
                  slug={ebook.slug}
                  label={`Koop nu — ${formatEbookPrice(ebook.price)}`}
                  className="w-full"
                />
              </div>

              <ul className="mt-6 space-y-3">
                {purchaseHighlights.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm leading-7 text-[var(--rd-text)]">
                    <span className="mt-1 inline-flex h-5 w-5 flex-none items-center justify-center rounded-full bg-[rgba(123,53,232,0.12)] text-[var(--rd-purple)]">
                      <CheckIcon className="h-3.5 w-3.5" />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </div>
      </section>

      <section className="section-space pt-4">
        <div className="section-shell grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]">
          <div className="rd-card p-6 sm:p-8">
            <SectionHeading
              eyebrow="Wat leer je?"
              title="Concrete onderwerpen die meteen bruikbaar zijn"
              description="Geen theoretisch AI-verhaal, maar praktische toepassingen die je vandaag al kan inzetten in jouw zaak."
            />

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {ebook.topics.map((topic) => (
                <div
                  key={topic}
                  className="flex items-start gap-3 rounded-[1.5rem] border border-[var(--rd-border)] bg-[var(--rd-bg)] p-4"
                >
                  <span className="mt-0.5 inline-flex h-6 w-6 flex-none items-center justify-center rounded-full bg-[rgba(41,82,204,0.1)] text-[var(--rd-blue)]">
                    <CheckIcon className="h-4 w-4" />
                  </span>
                  <p className="text-sm leading-7 text-[var(--rd-text)] sm:text-base">{topic}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rd-card p-6 sm:p-8">
              <SectionHeading
                eyebrow="Wat krijg je?"
                title="Alles wat je nodig hebt om direct te starten"
              />

              <ul className="mt-6 space-y-4">
                {includedItems.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm leading-7 sm:text-base">
                    <span className="mt-1 inline-flex h-5 w-5 flex-none items-center justify-center rounded-full bg-[rgba(41,82,204,0.1)] text-[var(--rd-blue)]">
                      <CheckIcon className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-[var(--rd-text)]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rd-card p-6 sm:p-8">
              <SectionHeading
                eyebrow="Voor wie is dit ebook?"
                title="Gemaakt voor ondernemers die weinig tijd hebben"
              />

              <ul className="mt-6 space-y-4">
                {audienceItems.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm leading-7 sm:text-base">
                    <span className="mt-1 inline-flex h-5 w-5 flex-none items-center justify-center rounded-full bg-[rgba(123,53,232,0.12)] text-[var(--rd-purple)]">
                      <CheckIcon className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-[var(--rd-text)]">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-col gap-4">
                <EbookCheckoutButton
                  slug={ebook.slug}
                  label={`Koop nu — ${formatEbookPrice(ebook.price)}`}
                  className="w-full"
                />
                <ButtonLink href="/contact" variant="secondary" size="lg">
                  Vraag iets aan RDFS
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
