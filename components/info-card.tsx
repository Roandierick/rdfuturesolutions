import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRightIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

type InfoCardProps = {
  icon: ReactNode;
  title: string;
  description: string;
  href?: string;
  linkLabel?: string;
  children?: ReactNode;
  className?: string;
  accent?: "blue" | "purple";
};

export function InfoCard({
  icon,
  title,
  description,
  href,
  linkLabel = "Meer lezen",
  children,
  className,
  accent = "blue",
}: InfoCardProps) {
  const accentClass =
    accent === "purple" ? "border-l-[var(--rd-purple)]" : "border-l-[var(--rd-blue)]";

  const content = (
    <>
      <span className="rd-icon-square">{icon}</span>
      <h3 className="mt-6">{title}</h3>
      <p className="mt-3 text-sm leading-7 sm:text-base">{description}</p>
      {children ? <div className="mt-5">{children}</div> : null}
      {href ? (
        <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--rd-blue)]">
          {linkLabel}
          <ArrowRightIcon className="h-4 w-4" />
        </span>
      ) : null}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={cn(
          "rd-card block h-full w-full min-w-0 border-l-[3px] p-5 transition hover:border-[var(--rd-blue)] sm:p-6 lg:p-8",
          accentClass,
          className,
        )}
        aria-label={`${linkLabel}: ${title}`}
      >
        {content}
      </Link>
    );
  }

  return (
    <div
      className={cn(
        "rd-card h-full w-full min-w-0 border-l-[3px] p-5 sm:p-6 lg:p-8",
        accentClass,
        className,
      )}
    >
      {content}
    </div>
  );
}
