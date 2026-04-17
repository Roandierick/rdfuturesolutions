import { ButtonLink } from "@/components/button-link";
import { ClockIcon, HandshakeIcon, LocationIcon } from "@/components/icons";
import { InfoCard } from "@/components/info-card";
import { PageHero } from "@/components/page-hero";
import { PageLinks } from "@/components/page-links";
import { Reveal } from "@/components/reveal";
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

      <section className="section-space">
        <div className="section-shell">
          <Reveal>
            <div className="mx-auto max-w-5xl">
              <SectionHeading
                eyebrow="Het verhaal"
                title="Van eerste websites op 15-jarige leeftijd tot een eigen bedrijf op 20"
                description="Roan Dierick is de oprichter van RD Future Solutions. Hij startte het bedrijf op zijn 20e vanuit Diest, maar zijn passie voor technologie begon al veel vroeger."
              />
              <div className="mt-6 space-y-5 text-base leading-8 text-[var(--rd-text-body)]">
                <p>
                  Vanaf zijn 15e bouwde hij websites en applicaties, eerst uit pure nieuwsgierigheid
                  en al snel met een professionele ambitie. Die jaren van experimenteren en
                  bouwen groeiden uit tot meer dan 5 jaar hands-on ervaring met onder meer Next.js,
                  React, React Native, TypeScript en Supabase.
                </p>
                <p>
                  Die technische basis vormde de aanleiding om iets groters neer te zetten: een
                  eerlijk, transparant en betaalbaar alternatief voor KMO&apos;s en zelfstandigen in
                  Vlaanderen die professioneel online willen gaan, zonder de typische overhead van
                  grote bureaus.
                </p>
                <p>
                  Vandaag werkt RD Future Solutions vanuit {siteConfig.city} voor klanten in heel
                  Vlaanderen. De focus ligt op performante websites, slimme apps en software op maat
                  die echt aansluiten op de dagelijkse realiteit van ondernemers.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-space bg-[var(--rd-bg-soft)]">
        <div className="section-shell">
          <Reveal>
            <SectionHeading
              eyebrow="Onze aanpak"
              title="Waar RD Future Solutions voor staat"
              description="Techniek is belangrijk, maar samenwerking minstens even hard. Daarom bouwen we elk project op een manier die duidelijk, haalbaar en professioneel aanvoelt."
            />
          </Reveal>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {values.map((value, index) => (
              <Reveal key={value.title} delay={index * 90}>
                <InfoCard {...value} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="section-shell">
          <Reveal>
            <div className="rd-card p-6 sm:p-8 lg:p-10">
              <h2 className="text-2xl font-semibold sm:text-3xl">Een duidelijke visie op digitale groei</h2>
              <blockquote className="mt-6 border-l-4 border-[var(--rd-blue)] pl-4 text-lg leading-8 text-[var(--rd-text)] sm:pl-6 sm:text-xl sm:leading-9">
                &quot;Ik geloof dat elk bedrijf, hoe klein ook, een professionele digitale
                aanwezigheid verdient. Daar werk ik elke dag aan.&quot;
              </blockquote>
              <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                <div>
                  <h3 className="text-xl font-semibold">Lokaal aanwezig, breed inzetbaar</h3>
                  <p className="mt-3 leading-7">
                    RD Future Solutions is gevestigd in {siteConfig.addressDisplay}. KBO:
                    {" "}
                    {siteConfig.kboDisplay}. Dankzij een flexibele en digitale werkwijze ondersteunen
                    we klanten in heel Vlaanderen, van starters en freelancers tot gevestigde KMO&apos;s.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Wat dat voor jou betekent</h3>
                  <p className="mt-3 leading-7">
                    Je krijgt een partner die meedenkt, snel antwoordt en de technische uitvoering
                    zelf in handen heeft. Dat levert meer grip op, minder vertraging en een eindresultaat
                    dat echt past bij je onderneming.
                  </p>
                </div>
              </div>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <ButtonLink href="/prijzen">Bekijk de prijzen</ButtonLink>
                <ButtonLink href="/contact" variant="secondary">
                  Neem contact op
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <PageLinks currentPath="/over-ons" />
    </>
  );
}
