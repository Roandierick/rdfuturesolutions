import Link from "next/link";
import { cn } from "@/lib/utils";

type SiteLogoProps = {
  dark?: boolean;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
};

export function SiteLogo(props: SiteLogoProps) {
  const { dark = false, className } = props;

  return (
    <Link
      href="/"
      className={cn("inline-flex min-w-0 items-center gap-3", className)}
      aria-label="Ga naar de homepage van RD Future Solutions"
    >
      <span
        className={cn(
          "inline-flex h-12 w-12 items-center justify-center border",
          dark
            ? "border-white/12 bg-white/[0.05] text-white"
            : "border-[var(--rd-border-blue)] bg-[var(--rd-gradient-soft)] text-[var(--rd-blue)]",
        )}
      >
        <span
          className={cn(
            "font-display text-xl font-bold tracking-[-0.06em]",
            dark ? "text-white" : "gradient-text",
          )}
        >
          RD
        </span>
      </span>

      <span className="min-w-0">
        <span className={cn("block font-mono text-[0.68rem] uppercase tracking-[0.18em]", dark ? "text-white/55" : "text-[var(--rd-blue)]")}>
          Webbureau
        </span>
        <span
          className={cn(
            "block text-sm font-semibold leading-tight sm:text-base",
            dark ? "text-white" : "text-[var(--rd-text)]",
          )}
        >
          RD Future Solutions
        </span>
      </span>
    </Link>
  );
}
