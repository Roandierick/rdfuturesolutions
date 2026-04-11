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
        "rd-card relative flex h-full flex-col p-6 sm:p-8",
        highlighted && "border-[var(--rd-blue)] shadow-card-hover",
      )}
    >
      {badge ? (
        <span className="mb-5 inline-flex w-fit rounded-full bg-rd-gradient px-3 py-1 text-sm font-medium text-white">
          {badge}
        </span>
      ) : (
        <div className="mb-7 h-8" />
      )}
      <h3 className="text-2xl font-semibold">{title}</h3>
      <p className="mt-3 text-3xl font-semibold text-[var(--rd-text)]">{price}</p>
      <p className="mt-3 leading-7">{description}</p>
      <ul className="mt-6 space-y-3 text-sm text-[var(--rd-text-body)] sm:text-base">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-3">
            <span className="mt-0.5 inline-flex h-6 w-6 flex-none items-center justify-center rounded-full bg-[rgba(41,82,204,0.08)] text-[var(--rd-blue)]">
              <CheckIcon className="h-4 w-4" />
            </span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <div className="mt-8">
        <ButtonLink
          href={ctaHref}
          variant={highlighted ? "primary" : "secondary"}
          className="w-full"
        >
          {ctaLabel}
        </ButtonLink>
      </div>
    </div>
  );
}
