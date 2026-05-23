import type { Metadata } from "next";
import { ButtonLink } from "@/components/button-link";
import { ClockIcon, HandshakeIcon, LocationIcon } from "@/components/icons";
import { InfoCard } from "@/components/info-card";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { siteConfig } from "@/lib/site";

const values = [
  {
    title: "Resultaatgericht",
    description:
      "Geen vage adviezen of mooie presentaties. Wij implementeren AI-oplossingen die effectief werken en meetbare resultaten opleveren.",
    icon: <HandshakeIcon />,
  },
  {
    title: "Geen jargon",
    description:
      "AI hoeft niet complex te klinken. Wij vertalen technologie naar begrijpelijke taal en concrete toepassingen voor jouw bedrijf.",
    icon: <ClockIcon />,
  },
  {
    title: "Lokaal & persoonlijk",
    description:
      "Gevestigd in Diest, actief in heel België. Rechtstreeks contact met de expert — geen tussenpersonen, geen verloren tijd.",
    icon: <LocationIcon />,
  },
] as const;

const storyMoments = [
  {
    label: "Fase 01",
    description:
      "Vanaf zijn 15e bouwde Roan websites en applicaties — eerst uit nieuwsgierigheid, al snel professioneel. Die jaren van experimenteren groeiden uit tot meer dan 5 jaar hands-on ervaring met moderne webtechnologieën.",
  },
  {
    label: "Fase 02",
    description:
      "Die technische basis legde het fundament voor een nieuwe richting. De afgelopen jaren verdiepte Roan zich intensief in artificiële intelligentie — van large language models en prompt engineering tot praktische API-integraties met OpenAI en Anthropic.",
  },
  {
    label: "Vandaag",
    description:
      "Vandaag helpt RD Future Solutions Belgische ondernemers om AI niet als buzzword, maar als concreet werkinstrument in te zetten. Slimmer communiceren met klanten, repetitieve taken automatiseren en betere beslissingen nemen — dat is waar we elke dag aan werken.",
  },
] as const;

const techStack = [
  "AI-strategie & advies",
  "AI-automatisering",
  "AI-chatbots",
  "Prompt engineering",
  "OpenAI & Anthropic",
  "Next.js",
  "React",
  "TypeScript",
] as const;

export const metadata: Metadata = {
  title: {
    absolute: "Over ons | RD Future Solutions — AI-consultant België",
  },
  description:
    "Leer Roan Dierick kennen, oprichter van RD Future Solutions. Belgische AI-consultant die KMO's helpt groeien met concrete AI-integraties.",
  alternates: {
    canonical: "/over-ons",
  },
  openGraph: {
    title: "Over ons | RD Future Solutions — AI-consultant België",
    description:
      "Leer Roan Dierick kennen, oprichter van RD Future Solutions. Belgische AI-consultant die KMO's helpt groeien met concrete AI-integraties.",
    url: "/over-ons",
    siteName: siteConfig.name,
    locale: "nl_BE",
    type: "website",
    images: [
      {
        url: `${siteConfig.siteUrl}/og-image.svg`,
        width: 1200,
        height: 630,
        alt: "Over RD Future Solutions, AI-consultant voor Belgische ondernemers.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Over ons | RD Future Solutions — AI-consultant België",
    description:
      "Leer Roan Dierick kennen, oprichter van RD Future Solutions. Belgische AI-consultant die KMO's helpt groeien met concrete AI-integraties.",
    images: [`${siteConfig.siteUrl}/og-image.svg`],
  },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Over ons"
        title="AI-expertise met een persoonlijke aanpak"
        description="RD Future Solutions werd opgericht door Roan Dierick in Diest. Het doel: Belgische ondernemers helpen om AI concreet en winstgevend in te zetten — zonder jargon, zonder grote bureaustructuur."
        primaryCta={{ href: "/contact", label: "Plan een kennismaking" }}
        secondaryCta={{ href: "/diensten", label: "Bekijk onze diensten" }}
      />

      <section className="section-space pt-10">
        <div className="section-shell">
          <h2 className="mx-auto max-w-5xl text-center text-[clamp(2.2rem,4.8vw,4.4rem)] italic leading-[1.15] text-[var(--rd-text)]">
            "Ik geloof dat AI voor elk bedrijf, hoe klein ook, een{" "}
            <span className="gradient-text">concrete meerwaarde</span> kan zijn. Mijn job is om dat
            mogelijk te maken."
          </h2>
        </div>
      </section>

      <section className="section-space">
        <div className="section-shell">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)]">
            <div className="min-w-0">
              <SectionHeading
                eyebrow="Het verhaal"
                title="Van webdeveloper op 15 naar AI-consultant op 20"
                description="Roan Dierick is de oprichter van RD Future Solutions. Hij startte het bedrijf op zijn 20e vanuit Diest, maar zijn passie voor technologie begon al veel vroeger."
              />
            </div>

            <div className="relative pl-8">
              <span className="absolute inset-y-0 left-0 w-[2px] bg-[image:var(--rd-gradient)]" />

              <div className="space-y-8">
                {storyMoments.map((item) => (
                  <div key={item.label} className="relative">
                    <span className="absolute left-[-2.25rem] top-1 h-4 w-4 rounded-full border border-[var(--rd-border-blue)] bg-white" />
                    <p className="mono-label">{item.label}</p>
                    <p className="mt-3 text-base leading-8 text-[var(--rd-text-body)] sm:text-lg">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-10 border-t border-[var(--rd-border)] pt-8">
                <p className="mono-label">Expertise</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  {techStack.map((item) => (
                    <span
                      key={item}
                      className="inline-flex rounded-[4px] border border-[var(--rd-border-blue)] bg-[rgba(41,82,204,0.07)] px-[10px] py-[4px] font-mono text-xs text-[var(--rd-blue)]"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <p className="mt-6 font-mono text-xs uppercase tracking-[0.14em] text-[var(--rd-text-muted)]">
                  {siteConfig.city} · {siteConfig.region} · KBO {siteConfig.kboDisplay}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-space rd-soft-section">
        <div className="section-shell">
          <SectionHeading
            eyebrow="Onze aanpak"
            title="Waar RD Future Solutions voor staat"
            description="Techniek is belangrijk, maar een goede samenwerking minstens even hard. Wij werken direct, transparant en altijd met jouw resultaat als doel."
          />

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {values.map((value) => (
              <InfoCard key={value.title} {...value} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="section-shell">
          <div className="border border-transparent bg-[linear-gradient(#fff,#fff)_padding-box,var(--rd-gradient)_border-box] p-8 md:p-10 lg:p-12">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)] lg:gap-12">
              <div className="min-w-0">
                <SectionHeading eyebrow="Visie" title="Een duidelijke visie op digitale groei" />
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h3>Lokaal aanwezig, breed inzetbaar</h3>
                  <p className="mt-3 text-sm leading-7 sm:text-base">
                    RD Future Solutions is gevestigd in Diest, Vlaams-Brabant. Dankzij een digitale
                    werkwijze begeleiden we klanten in heel België — van starters en zelfstandigen
                    tot gevestigde KMO's.
                  </p>
                </div>

                <div>
                  <h3>Wat dat voor jou betekent</h3>
                  <p className="mt-3 text-sm leading-7 sm:text-base">
                    Je krijgt een AI-partner die meedenkt, snel antwoordt en de volledige uitvoering
                    zelf in handen heeft. Geen doorschuiven, geen overhead — wel resultaten.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <ButtonLink href="/prijzen">Bekijk de prijzen</ButtonLink>
              <ButtonLink href="/contact" variant="secondary">
                Neem contact op
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
