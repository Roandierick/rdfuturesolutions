import { ButtonLink } from "@/components/button-link";
import { ClockIcon, HandshakeIcon, LocationIcon } from "@/components/icons";
import { InfoCard } from "@/components/info-card";
import { PageHero } from "@/components/page-hero";
import { PageLinks } from "@/components/page-links";
import { SectionHeading } from "@/components/section-heading";
import { createMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

const values = [
  {
    title: "Eerlijke communicatie",
    description:
      "Je weet altijd waar je staat: qua planning, budget en technische keuzes. Geen verborgen kosten en geen wollige bureaupraat.",
    icon: <HandshakeIcon />,
  },
  {
    title: "Snel schakelen",
    description:
      "Korte communicatielijnen zorgen ervoor dat feedback snel verwerkt wordt en beslissingen niet blijven hangen.",
    icon: <ClockIcon />,
  },
  {
    title: "Lokaal verankerd",
    description:
      "Vanuit Diest werken we voor ondernemingen in Vlaams-Brabant en de rest van Vlaanderen, met aandacht voor lokale zichtbaarheid en groei.",
    icon: <LocationIcon />,
  },
] as const;

const storyMoments = [
  {
    label: "Fase 01",
    description:
      "Vanaf zijn 15e bouwde hij websites en applicaties, eerst uit pure nieuwsgierigheid en al snel met een professionele ambitie. Die jaren van experimenteren en bouwen groeiden uit tot meer dan 5 jaar hands-on ervaring met onder meer Next.js, React, React Native, TypeScript en Supabase.",
  },
  {
    label: "Fase 02",
    description:
      "Die technische basis vormde de aanleiding om iets groters neer te zetten: een eerlijk, transparant en betaalbaar alternatief voor KMO's en zelfstandigen in Vlaanderen die professioneel online willen gaan, zonder de typische overhead van grote bureaus.",
  },
  {
    label: "Vandaag",
    description:
      "Vandaag werkt RD Future Solutions vanuit Diest voor klanten in heel Vlaanderen. De focus ligt op performante websites, slimme apps en software op maat die echt aansluiten op de dagelijkse realiteit van ondernemers.",
  },
] as const;

const techStack = ["Next.js", "React", "React Native", "TypeScript", "Supabase"] as const;

export const metadata = createMetadata({
  title: "Over ons",
  description:
    "Lees het verhaal van Roan Dierick en ontdek waarom RD Future Solutions een eerlijk en betaalbaar alternatief is voor ondernemers in Vlaanderen.",
  path: "/over-ons",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Over ons"
        title="Technische expertise met een persoonlijke aanpak"
        description="RD Future Solutions werd opgericht door Roan Dierick in Diest. Het doel: ondernemers in Vlaanderen helpen met professionele websites, apps en software op maat zonder de trage communicatie en verborgen kosten van grote bureaus."
        primaryCta={{ href: "/contact", label: "Plan een kennismaking" }}
        secondaryCta={{ href: "/diensten", label: "Bekijk onze diensten" }}
      />

      <section className="section-space pt-10">
        <div className="section-shell">
          <h2 className="mx-auto max-w-5xl text-center text-[clamp(2.2rem,4.8vw,4.4rem)] italic leading-[1.15] text-[var(--rd-text)]">
            &quot;Ik geloof dat elk bedrijf, hoe klein ook, een{" "}
            <span className="gradient-text">professionele digitale aanwezigheid</span> verdient.
            Daar werk ik elke dag aan.&quot;
          </h2>
        </div>
      </section>

      <section className="section-space">
        <div className="section-shell">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)]">
            <div className="min-w-0">
              <SectionHeading
                eyebrow="Het verhaal"
                title="Van eerste websites op 15-jarige leeftijd tot een eigen bedrijf op 20"
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
                <p className="mono-label">Tech stack</p>
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
            description="Techniek is belangrijk, maar samenwerking minstens even hard. Daarom bouwen we elk project op een manier die duidelijk, haalbaar en professioneel aanvoelt."
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
                    RD Future Solutions is gevestigd in {siteConfig.addressDisplay}. KBO:{" "}
                    {siteConfig.kboDisplay}. Dankzij een flexibele en digitale werkwijze ondersteunen
                    we klanten in heel Vlaanderen, van starters en freelancers tot gevestigde
                    KMO&apos;s.
                  </p>
                </div>

                <div>
                  <h3>Wat dat voor jou betekent</h3>
                  <p className="mt-3 text-sm leading-7 sm:text-base">
                    Je krijgt een partner die meedenkt, snel antwoordt en de technische uitvoering
                    zelf in handen heeft. Dat levert meer grip op, minder vertraging en een
                    eindresultaat dat echt past bij je onderneming.
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

      <PageLinks currentPath="/over-ons" />
    </>
  );
}
