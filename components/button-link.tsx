import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  ariaLabel?: string;
};

export function buttonClassName(
  variant: ButtonVariant = "primary",
  size: ButtonSize = "md",
  className?: string,
) {
  return cn(
    "rd-button",
    size === "sm" && "px-4 py-2 text-sm",
    size === "md" && "px-5 py-3 text-sm sm:text-base",
    size === "lg" && "px-6 py-3.5 text-base",
    variant === "primary" && "rd-button-primary",
    variant === "secondary" && "rd-button-secondary",
    variant === "ghost" && "rd-button-ghost",
    className,
  );
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
  ariaLabel,
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      className={buttonClassName(variant, size, className)}
    >
      {children}
    </Link>
  );
}
