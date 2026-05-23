import type { Metadata } from "next";
import { ButtonLink } from "@/components/button-link";
import { PageHero } from "@/components/page-hero";
import { ebooks, formatEbookPrice } from "@/lib/ebooks";
import { siteConfig } from "@/lib/site";

const pageTitle = "AI Ebooks voor ondernemers | RD Future Solutions";
const pageDescription = "Praktische AI-gidsen voor Belgische KMO's en zelfstandigen.";

export const metadata: Metadata = {
  title: {
    absolute: pageTitle,
  },
  description: pageDescription,
  alternates: {
    canonical: "/ebooks",
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: "/ebooks",
    siteName: siteConfig.name,
    locale: "nl_BE",
    type: "website",
    images: [
      {
        url: `${siteConfig.siteUrl}/og-image.svg`,
        width: 1200,
        height: 630,
        alt: "AI ebooks voor ondernemers van RD Future Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    images: [`${siteConfig.siteUrl}/og-image.svg`],
  },
  keywords: [
    "AI ebook België",
    "AI gids ondernemers",
    "AI voor zelfstandigen",
    "AI voor KMO's",
    "praktische AI gids",
  ],
};

export default function EbooksPage() {
  return (
    <>
      <PageHero
        eyebrow="Ebooks"
        title="Praktische AI-gidsen voor Belgische ondernemers"
        description="Geen technisch jargon. Geen vage beloftes. Concrete gidsen die je direct kan toepassen in jouw bedrijf."
      />

      <section className="section-space pt-4">
        <div className="section-shell">
          <div className="grid gap-6 xl:grid-cols-2">
            {ebooks.map((ebook) => (
              <article
                key={ebook.slug}
                className="rd-card h-full border-l-[3px] border-l-[var(--rd-blue)] p-6 sm:p-7"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="mono-label">Ebook</p>
                    <h2 className="mt-4 text-[1.85rem] sm:text-[2.15rem]">{ebook.title}</h2>
                    <p className="mt-3 text-base font-medium leading-7 text-[var(--rd-text)] sm:text-lg">
                      {ebook.subtitle}
                    </p>
                  </div>

                  {ebook.badge ? (
                    <span className="inline-flex rounded-full border border-[rgba(41,82,204,0.14)] bg-[var(--rd-gradient-soft)] px-3 py-1 text-sm font-semibold text-[var(--rd-blue)]">
                      {ebook.badge}
                    </span>
                  ) : null}
                </div>

                <p className="mt-5 text-sm leading-7 sm:text-base">{ebook.description}</p>

                <div className="mt-6 grid gap-4 border-t border-[var(--rd-border)] pt-6 sm:grid-cols-2">
                  <div>
                    <p className="mono-label">Prijs</p>
                    <p className="mt-2 text-[2rem] font-semibold leading-none text-[var(--rd-text)]">
                      {formatEbookPrice(ebook.price)}
                    </p>
                  </div>

                  <div className="sm:text-right">
                    <p className="mono-label">Pagina’s</p>
                    <p className="mt-2 text-[2rem] font-semibold leading-none text-[var(--rd-text)]">
                      {ebook.pages}
                    </p>
                  </div>
                </div>

                <div className="mt-6">
                  <p className="mono-label">Onderwerpen</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {ebook.topics.map((topic) => (
                      <span
                        key={topic}
                        className="inline-flex rounded-full border border-[var(--rd-border)] bg-[var(--rd-bg)] px-3 py-2 text-sm text-[var(--rd-text)]"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-8">
                  <ButtonLink href={`/ebooks/${ebook.slug}`} size="lg">
                    Bekijk ebook
                  </ButtonLink>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
