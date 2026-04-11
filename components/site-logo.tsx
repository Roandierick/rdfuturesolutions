"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type SiteLogoProps = {
  dark?: boolean;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
};

export function SiteLogo({
  dark = false,
  width = 160,
  height = 48,
  className,
  priority = false,
}: SiteLogoProps) {
  const [hasLogo, setHasLogo] = useState(false);

  useEffect(() => {
    let mounted = true;

    fetch("/logo.png", { method: "HEAD" })
      .then((response) => {
        if (mounted) {
          setHasLogo(response.ok);
        }
      })
      .catch(() => {
        if (mounted) {
          setHasLogo(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <Link
      href="/"
      className={cn("inline-flex items-center gap-3", className)}
      aria-label="Ga naar de homepage van RD Future Solutions"
    >
      {hasLogo ? (
        <Image
          src="/logo.png"
          alt="RD Future Solutions logo"
          width={width}
          height={height}
          priority={priority}
          className="h-auto w-auto object-contain"
          onError={() => setHasLogo(false)}
        />
      ) : (
        <span className="inline-flex items-center gap-2">
          <span className="gradient-text text-2xl font-semibold leading-none">RD</span>
          <span
            className={cn(
              "text-sm font-medium sm:text-base",
              dark ? "text-white" : "text-[var(--rd-text)]",
            )}
          >
            Future Solutions
          </span>
        </span>
      )}
    </Link>
  );
}
