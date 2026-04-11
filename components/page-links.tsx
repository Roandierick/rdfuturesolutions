import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { navigation } from "@/lib/site";

type PageLinksProps = {
  currentPath: string;
};

export function PageLinks({ currentPath }: PageLinksProps) {
  const links = navigation.filter((item) => item.href !== currentPath);

  return (
    <section className="section-space bg-[var(--rd-bg-soft)]">
      <div className="section-shell">
        <Reveal>
          <SectionHeading
            eyebrow="Meer ontdekken"
            title="Verken de rest van RD Future Solutions"
            description="Wil je prijzen vergelijken, onze diensten bekijken of meteen een offerte aanvragen? Hieronder vind je snel de juiste pagina."
          />
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {links.map((item, index) => (
            <Reveal key={item.href} delay={index * 80}>
              <Link href={item.href} className="rd-card block h-full p-6">
                <h3 className="text-2xl font-semibold">{item.label}</h3>
                <p className="mt-3 leading-7">{item.description}</p>
                <span className="mt-5 inline-flex text-sm font-medium text-[var(--rd-blue)]">
                  Naar {item.label.toLowerCase()}
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
