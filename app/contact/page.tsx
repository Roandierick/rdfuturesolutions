import { ButtonLink } from "@/components/button-link";
import { ContactForm } from "@/components/contact-form";
import { ClockIcon, MailIcon, PhoneIcon, SparkIcon } from "@/components/icons";
import { PageHero } from "@/components/page-hero";
import { PageLinks } from "@/components/page-links";
import { SectionHeading } from "@/components/section-heading";
import { createMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata = createMetadata({
  title: "Contact",
  description:
    "Vraag een gratis offerte aan bij RD Future Solutions voor een website, app of software op maat in Vlaanderen.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Vertel ons wat je wilt bouwen"
        description="Zoek je een professionele website, een mobiele app of software op maat? Stuur je aanvraag door en we nemen zo snel mogelijk contact met je op."
        primaryCta={{ href: "#lead-form", label: "Start je aanvraag" }}
        secondaryCta={{ href: "/prijzen", label: "Bekijk eerst de prijzen" }}
      />

      <section id="lead-form" className="section-space scroll-mt-32">
        <div className="section-shell">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.4fr)_minmax(0,0.6fr)] lg:items-start">
            <div className="space-y-8">
              <SectionHeading
                eyebrow="Gratis offerte"
                title="Vraag vandaag nog jouw project aan"
                description="Vul het formulier in met zoveel mogelijk context. Hoe duidelijker je idee, hoe gerichter we kunnen antwoorden."
              />

              <div className="relative overflow-hidden bg-[var(--rd-bg-soft)] px-6 py-7 sm:px-7">
                <span className="absolute inset-y-0 left-0 w-[3px] bg-[image:var(--rd-gradient)]" />
                <p className="mono-label">Rechtstreeks bereikbaar</p>

                <div className="mt-5 space-y-4 text-sm leading-7 text-[var(--rd-text-body)] sm:text-base">
                  <p>{siteConfig.name}</p>
                  <p>{siteConfig.addressDisplay}</p>
                  <p>KBO {siteConfig.kboDisplay}</p>
                  <a href={`tel:${siteConfig.phone}`} className="flex items-start gap-3 hover:text-[var(--rd-blue)]">
                    <PhoneIcon className="mt-1 h-4 w-4 flex-none" />
                    <span>{siteConfig.phoneDisplay}</span>
                  </a>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="flex items-start gap-3 break-all hover:text-[var(--rd-blue)]"
                  >
                    <MailIcon className="mt-1 h-4 w-4 flex-none" />
                    <span>{siteConfig.email}</span>
                  </a>
                </div>
              </div>

              <div className="rd-card border-l-[3px] border-l-[var(--rd-blue)] p-6">
                <h2 className="text-[clamp(1.8rem,3vw,2.5rem)]">Wat je mag verwachten</h2>

                <div className="mt-6 space-y-4">
                  <div className="border-b border-[var(--rd-border)] pb-4">
                    <h3 className="flex items-center gap-3">
                      <span className="rd-icon-square h-10 w-10">
                        <ClockIcon />
                      </span>
                      Snelle eerste reactie
                    </h3>
                    <p className="mt-3 text-sm leading-7 sm:text-base">
                      We nemen zo snel mogelijk contact met je op om jouw vraag te bespreken.
                    </p>
                  </div>

                  <div>
                    <h3 className="flex items-center gap-3">
                      <span className="rd-icon-square h-10 w-10 text-[var(--rd-purple)]">
                        <SparkIcon />
                      </span>
                      Helder advies
                    </h3>
                    <p className="mt-3 text-sm leading-7 sm:text-base">
                      Je krijgt een realistische inschatting van aanpak, timing en budget.
                    </p>
                  </div>
                </div>

                <div className="mt-6 border-t border-[var(--rd-border)] pt-6">
                  <h3>Nog aan het oriënteren?</h3>
                  <p className="mt-3 text-sm leading-7 sm:text-base">
                    Bekijk eerst onze diensten en prijsstructuur als je jouw project nog scherper
                    wilt definiëren.
                  </p>
                  <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                    <ButtonLink href="/diensten" variant="secondary" className="flex-1">
                      Diensten
                    </ButtonLink>
                    <ButtonLink href="/prijzen" variant="secondary" className="flex-1">
                      Prijzen
                    </ButtonLink>
                  </div>
                </div>
              </div>
            </div>

            <div className="min-w-0">
              <p className="mono-label">Aanvraagformulier</p>
              <div className="mt-5 section-divider" />
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      <PageLinks currentPath="/contact" />
    </>
  );
}
