import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  index?: string;
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  centered?: boolean;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
};

export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  centered = false,
  className,
  titleClassName,
  descriptionClassName,
}: SectionHeadingProps) {
  const label = eyebrow ? `${index ? `${index} · ` : ""}${eyebrow.toUpperCase()}` : index;

  return (
    <div className={cn("min-w-0", centered && "mx-auto text-center", className)}>
      {label ? <p className={cn("mono-label", centered && "justify-center")}>{label}</p> : null}
      <h2 className={cn("mt-4", titleClassName)}>{title}</h2>
      {description ? (
        <div
          className={cn(
            "mt-5 max-w-2xl text-base leading-8 text-[var(--rd-text-body)] sm:text-lg",
            centered && "mx-auto",
            descriptionClassName,
          )}
        >
          {description}
        </div>
      ) : null}
    </div>
  );
}
