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
};

export function InfoCard({
  icon,
  title,
  description,
  href,
  linkLabel = "Meer lezen",
  children,
  className,
}: InfoCardProps) {
  const content = (
    <>
      <div className="icon-chip">{icon}</div>
      <h3 className="mt-6 text-xl font-semibold sm:text-2xl">{title}</h3>
      <p className="mt-3 text-sm leading-7 sm:text-base">{description}</p>
      {children ? <div className="mt-5">{children}</div> : null}
      {href ? (
        <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[var(--rd-blue)]">
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
        className={cn("rd-card block h-full w-full min-w-0 p-5 sm:p-6 lg:p-8", className)}
        aria-label={`${linkLabel}: ${title}`}
      >
        {content}
      </Link>
    );
  }

  return <div className={cn("rd-card h-full w-full min-w-0 p-5 sm:p-6 lg:p-8", className)}>{content}</div>;
}
