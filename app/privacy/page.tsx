import { PageHero } from "@/components/page-hero";
import { createMetadata } from "@/lib/seo";

const privacySections = [
  {
    title: "Wie zijn wij",
    content:
      "RD Future Solutions is gevestigd in Diest, België. Voor vragen over je gegevens kan je ons bereiken via info@rdfuturesolutions.be.",
  },
  {
    title: "Welke gegevens verzamelen we",
    content:
      "We verzamelen naam, e-mailadres, telefoonnummer, adresgegevens en, indien je als bedrijf koopt, ook je BTW-nummer.",
  },
  {
    title: "Waarvoor gebruiken we die gegevens",
    content:
      "We gebruiken deze gegevens voor de uitvoering van de overeenkomst, facturatie en om te voldoen aan onze wettelijke verplichtingen.",
  },
  {
    title: "Hoe lang bewaren we die gegevens",
    content:
      "Boekhoudkundige documenten bewaren we 7 jaar. Overige gegevens bewaren we maximaal 1 jaar wanneer daar geen wettelijke bewaarplicht voor geldt.",
  },
  {
    title: "Jouw rechten",
    content:
      "Je hebt recht op inzage, correctie en verwijdering van je gegevens. Je kan daarvoor contact opnemen via info@rdfuturesolutions.be.",
  },
  {
    title: "Cookies",
    content:
      "We gebruiken functionele cookies om de website goed te laten werken en Stripe voor een veilige betalingsverwerking.",
  },
] as const;

export const metadata = createMetadata({
  title: "Privacyverklaring | RD Future Solutions",
  description:
    "Lees hoe RD Future Solutions omgaat met persoonsgegevens voor ebook aankopen, facturatie en wettelijke verplichtingen.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Privacy"
        title="Privacyverklaring"
        description="Hier lees je welke gegevens we verzamelen, waarom we dat doen en welke rechten je hebt."
      />

      <section className="section-space pt-4">
        <div className="section-shell">
          <div className="grid gap-6 lg:grid-cols-2">
            {privacySections.map((section) => (
              <article
                key={section.title}
                className="rd-card border-l-[3px] border-l-[var(--rd-blue)] p-6 sm:p-8"
              >
                <p className="mono-label">Privacy</p>
                <h2 className="mt-4 text-[clamp(1.8rem,3vw,2.4rem)]">{section.title}</h2>
                <p className="mt-4 text-sm leading-8 sm:text-base">{section.content}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
