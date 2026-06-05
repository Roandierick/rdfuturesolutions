import { ButtonLink } from "@/components/button-link";
import { ContactForm } from "@/components/contact-form";
import { ClockIcon, MailIcon, PhoneIcon, SparkIcon } from "@/components/icons";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { createMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

function VideoCameraIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <rect x="3" y="7" width="12" height="10" rx="2" />
      <path d="m15 10 6-3v10l-6-3" />
    </svg>
  );
}

export const metadata = createMetadata({
  title: "Contact | Boek een gratis AI-adviesgesprek — RD Future Solutions",
  description:
    "Boek een gratis en vrijblijvend AI-adviesgesprek met RD Future Solutions. Wij komen bij jou ter plaatse en bekijken samen waar AI waarde kan toevoegen.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Boek een gratis AI-adviesgesprek"
        description="Vertel ons wat je wilt bereiken. We plannen een gratis videogesprek via Google Meet en bekijken samen wat AI concreet kan betekenen voor jouw bedrijf — zonder verplichtingen."
        primaryCta={{ href: "#lead-form", label: "Start je aanvraag" }}
        secondaryCta={{ href: "/prijzen", label: "Bekijk de prijzen" }}
      />

      <section id="lead-form" className="section-space scroll-mt-32">
        <div className="section-shell">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.4fr)_minmax(0,0.6fr)] lg:items-start">
            <div className="space-y-8">
              <SectionHeading
                eyebrow="Gratis gesprek"
                title="Vertel ons over jouw bedrijf"
                description="Vul het formulier in en boek meteen een gratis kennismakingsgesprek. Na het boeken ontvang je een bevestigingsmail met de Google Meet link."
              />

              <div className="relative overflow-hidden bg-[var(--rd-bg-soft)] px-6 py-7 sm:px-7">
                <span className="absolute inset-y-0 left-0 w-[3px] bg-[image:var(--rd-gradient)]" />
                <p className="mono-label">Rechtstreeks bereikbaar</p>

                <div className="mt-5 space-y-4 text-sm leading-7 text-[var(--rd-text-body)] sm:text-base">
                  <p>{siteConfig.name}</p>
                  <a
                    href={`tel:${siteConfig.phone}`}
                    className="flex items-start gap-3 hover:text-[var(--rd-blue)]"
                  >
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
                        <VideoCameraIcon />
                      </span>
                      Online videogesprek via Google Meet
                    </h3>
                    <p className="mt-3 text-sm leading-7 sm:text-base">
                      Roan plant een videogesprek met jou via Google Meet. Geen verplaatsing nodig
                      — gewoon een eerlijk gesprek over wat AI voor jouw bedrijf kan doen.
                    </p>
                  </div>

                  <div className="border-b border-[var(--rd-border)] pb-4">
                    <h3 className="flex items-center gap-3">
                      <span className="rd-icon-square h-10 w-10">
                        <ClockIcon />
                      </span>
                      Kies zelf je moment
                    </h3>
                    <p className="mt-3 text-sm leading-7 sm:text-base">
                      Na het invullen van het formulier kies je meteen een beschikbaar tijdstip. Je
                      ontvangt een bevestigingsmail met de Google Meet link die je direct in je
                      agenda kunt zetten.
                    </p>
                  </div>

                  <div>
                    <h3 className="flex items-center gap-3">
                      <span className="rd-icon-square h-10 w-10 text-[var(--rd-purple)]">
                        <SparkIcon />
                      </span>
                      Concreet advies, geen verkoopspraatje
                    </h3>
                    <p className="mt-3 text-sm leading-7 sm:text-base">
                      Je verlaat het gesprek met een helder beeld van wat AI voor jouw bedrijf kan
                      betekenen en wat het kost. Geen vage beloftes.
                    </p>
                  </div>
                </div>

                <div className="mt-6 border-t border-[var(--rd-border)] pt-6">
                  <h3>Nog niet zeker?</h3>
                  <p className="mt-3 text-sm leading-7 sm:text-base">
                    Bekijk eerst onze diensten en prijsstructuur als je meer context wilt voor het
                    gesprek.
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
    </>
  );
}
