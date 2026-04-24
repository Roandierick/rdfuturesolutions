import { ButtonLink } from "@/components/button-link";
import { CheckIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

type PricingCardProps = {
  title: string;
  price: string;
  description: string;
  features: string[];
  badge?: string;
  highlighted?: boolean;
  ctaHref?: string;
  ctaLabel?: string;
};

export function PricingCard({
  title,
  price,
  description,
  features,
  badge,
  highlighted = false,
  ctaHref = "/contact",
  ctaLabel = "Offerte aanvragen",
}: PricingCardProps) {
  return (
    <div
      className={cn(
        "rd-card relative flex h-full w-full min-w-0 flex-col border-l-[3px] border-l-[var(--rd-blue)] p-5 sm:p-6 lg:p-8",
        highlighted && "border-2 border-[var(--rd-blue)] shadow-editorial-lg",
      )}
    >
      {badge ? (
        <span className="mb-6 inline-flex w-fit rounded-full bg-[image:var(--rd-gradient)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-white">
          {badge}
        </span>
      ) : (
        <div className="mb-8 h-6" />
      )}

      <h3>{title}</h3>
      <p className="gradient-text mt-4 text-3xl font-semibold leading-none sm:text-[2.5rem]">
        {price}
      </p>
      <p className="mt-4 text-sm leading-7 sm:text-base">{description}</p>

      <ul className="mt-8 space-y-4 text-sm sm:text-base">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-[var(--rd-text-body)]">
            <span className="mt-0.5 inline-flex h-6 w-6 flex-none items-center justify-center bg-[rgba(41,82,204,0.08)] text-[var(--rd-blue)]">
              <CheckIcon className="h-4 w-4" />
            </span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <div className="mt-8">
        <ButtonLink href={ctaHref} variant={highlighted ? "primary" : "secondary"} className="w-full">
          {ctaLabel}
        </ButtonLink>
      </div>
    </div>
  );
}
