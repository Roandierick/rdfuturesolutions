import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  centered?: boolean;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  centered = false,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-3xl min-w-0", centered && "mx-auto text-center", className)}>
      {eyebrow ? (
        <span className="mb-4 inline-flex max-w-full rounded-full border border-[var(--rd-border-accent)] bg-[rgba(41,82,204,0.08)] px-4 py-1 text-sm font-medium text-[var(--rd-blue)]">
          {eyebrow}
        </span>
      ) : null}
      <h2 className="text-3xl font-semibold leading-tight text-balance sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-7 text-[var(--rd-text-body)] sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
