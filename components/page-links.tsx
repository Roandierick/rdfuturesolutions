import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";
import { navigation } from "@/lib/site";

type PageLinksProps = {
  currentPath: string;
};

export function PageLinks({ currentPath }: PageLinksProps) {
  const links = navigation.filter((item) => item.href !== currentPath);

  return (
    <section className="section-space rd-soft-section">
      <div className="section-shell">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.65fr)_minmax(0,1fr)] lg:gap-14">
          <SectionHeading
            eyebrow="Meer ontdekken"
            title="Verken de rest van RD Future Solutions"
            description="Wil je prijzen vergelijken, onze diensten bekijken of meteen een offerte aanvragen? Hieronder vind je snel de juiste pagina."
          />

          <div className="grid gap-px bg-[var(--rd-border)] md:grid-cols-2">
            {links.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group bg-white p-6 transition hover:bg-[var(--rd-bg)] sm:p-7"
              >
                <p className="mono-label">{item.label}</p>
                <h3 className="mt-4 transition group-hover:text-[var(--rd-blue)]">{item.label}</h3>
                <p className="mt-3 text-sm leading-7 sm:text-base">{item.description}</p>
                <span className="mt-5 inline-flex text-sm font-semibold text-[var(--rd-blue)]">
                  Naar {item.label.toLowerCase()}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
