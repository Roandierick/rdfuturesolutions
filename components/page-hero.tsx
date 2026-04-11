import { ButtonLink } from "@/components/button-link";
import { Reveal } from "@/components/reveal";

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
    <section className="relative overflow-hidden">
      <div className="absolute left-[-10%] top-0 h-72 w-72 rounded-full bg-[radial-gradient(circle,_rgba(0,200,255,0.16)_0%,_rgba(255,255,255,0)_70%)]" />
      <div className="absolute right-[-5%] top-[-5%] h-96 w-96 rounded-full bg-[radial-gradient(circle,_rgba(123,53,232,0.13)_0%,_rgba(255,255,255,0)_70%)]" />
      <div className="section-shell relative py-10 sm:py-14">
        <Reveal className="max-w-4xl">
          <span className="inline-flex rounded-full border border-[var(--rd-border-accent)] bg-[rgba(41,82,204,0.08)] px-4 py-1 text-sm font-medium text-[var(--rd-blue)]">
            {eyebrow}
          </span>
          <h1 className="mt-6 text-4xl font-semibold leading-tight text-balance sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--rd-text-body)]">
            {description}
          </p>
          {primaryCta || secondaryCta ? (
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
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
        </Reveal>
      </div>
    </section>
  );
}
