import { ButtonLink } from "@/components/button-link";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  primaryCta?: {
    href: string;
    label: string;
  };
  secondaryCta?: {
    href: string;
    label: string;
  };
};

export function PageHero({
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
}: PageHeroProps) {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="section-shell relative py-10 md:py-14 lg:py-20">
        <div className="section-divider mb-8 md:mb-10" />

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] lg:gap-14">
          <div className="min-w-0">
            <p className="mono-label">{eyebrow}</p>
            <h1 className="mt-6 max-w-5xl">{title}</h1>
          </div>

          <div className="min-w-0 lg:translate-y-10 lg:pl-6">
            <p className="max-w-xl text-base leading-8 text-[var(--rd-text-body)] sm:text-lg">
              {description}
            </p>

            {primaryCta || secondaryCta ? (
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                {primaryCta ? (
                  <ButtonLink href={primaryCta.href} size="lg">
                    {primaryCta.label}
                  </ButtonLink>
                ) : null}
                {secondaryCta ? (
                  <ButtonLink href={secondaryCta.href} variant="secondary" size="lg">
                    {secondaryCta.label}
                  </ButtonLink>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
