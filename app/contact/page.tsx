import { ContactForm } from "@/components/contact-form";
import { ButtonLink } from "@/components/button-link";
import { ClockIcon, MailIcon, PhoneIcon, SparkIcon } from "@/components/icons";
import { PageHero } from "@/components/page-hero";
import { PageLinks } from "@/components/page-links";
import { Reveal } from "@/components/reveal";
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

      <section id="lead-form" className="section-space scroll-mt-28">
        <div className="section-shell">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <Reveal>
              <div>
                <SectionHeading
                  eyebrow="Gratis offerte"
                  title="Vraag vandaag nog jouw project aan"
                  description="Vul het formulier in met zoveel mogelijk context. Hoe duidelijker je idee, hoe gerichter we kunnen antwoorden."
                />
                <div className="mt-8">
                  <ContactForm />
                </div>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="space-y-6">
                <div className="rd-card p-6 sm:p-8">
                  <h2 className="text-2xl font-semibold">Rechtstreeks bereikbaar</h2>
                  <div className="mt-6 space-y-4">
                    <a
                      href={`tel:${siteConfig.phone}`}
                      className="flex items-start gap-4 rounded-2xl bg-[var(--rd-bg-soft)] p-4"
                    >
                      <span className="icon-chip h-10 w-10 flex-none">
                        <PhoneIcon />
                      </span>
                      <div>
                        <h3 className="text-lg font-semibold">Telefonisch contact</h3>
                        <p className="mt-1 text-sm leading-7 sm:text-base">{siteConfig.phoneDisplay}</p>
                      </div>
                    </a>
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="flex items-start gap-4 rounded-2xl bg-[var(--rd-bg-soft)] p-4"
                    >
                      <span className="icon-chip h-10 w-10 flex-none">
                        <MailIcon />
                      </span>
                      <div>
                        <h3 className="text-lg font-semibold">E-mail</h3>
                        <p className="mt-1 text-sm leading-7 sm:text-base">{siteConfig.email}</p>
                      </div>
                    </a>
                  </div>
                </div>

                <div className="rd-card p-6 sm:p-8">
                  <h2 className="text-2xl font-semibold">Wat je mag verwachten</h2>
                  <div className="mt-6 space-y-4">
                    <div className="rounded-2xl bg-[var(--rd-bg-soft)] p-4">
                      <h3 className="flex items-center gap-3 text-lg font-semibold">
                        <ClockIcon className="text-[var(--rd-blue)]" />
                        Snelle eerste reactie
                      </h3>
                      <p className="mt-2 text-sm leading-7 sm:text-base">
                        We nemen zo snel mogelijk contact met je op om jouw vraag te bespreken.
                      </p>
                    </div>
                    <div className="rounded-2xl bg-[var(--rd-bg-soft)] p-4">
                      <h3 className="flex items-center gap-3 text-lg font-semibold">
                        <SparkIcon className="text-[var(--rd-purple)]" />
                        Helder advies
                      </h3>
                      <p className="mt-2 text-sm leading-7 sm:text-base">
                        Je krijgt een realistische inschatting van aanpak, timing en budget.
                      </p>
                    </div>
                  </div>
                  <div className="mt-6 rounded-2xl border border-[var(--rd-border)] p-4">
                    <h3 className="text-lg font-semibold">Nog aan het oriënteren?</h3>
                    <p className="mt-2 text-sm leading-7 sm:text-base">
                      Bekijk eerst onze diensten en prijsstructuur als je jouw project nog scherper
                      wilt definiëren.
                    </p>
                    <div className="mt-4 flex flex-col gap-3 sm:flex-row">
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
            </Reveal>
          </div>
        </div>
      </section>

      <PageLinks currentPath="/contact" />
    </>
  );
}
