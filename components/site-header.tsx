"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ButtonLink } from "@/components/button-link";
import { CloseIcon, MenuIcon } from "@/components/icons";
import { SiteLogo } from "@/components/site-logo";
import { navigation } from "@/lib/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[var(--rd-border)] bg-white/90 backdrop-blur-[8px]">
      <div className="section-shell">
        <div className="flex h-24 items-center justify-between gap-6">
          <SiteLogo priority />
          <nav className="hidden items-center gap-2 lg:flex">
            {navigation
              .filter((item) => item.href !== "/contact")
              .map((item) => {
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "rounded-full px-4 py-2 text-sm font-medium transition",
                      isActive
                        ? "text-[var(--rd-blue)]"
                        : "text-[var(--rd-text-body)] hover:text-[var(--rd-blue)]",
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            <ButtonLink href="/contact" size="sm">
              Contact
            </ButtonLink>
          </nav>
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--rd-border)] text-[var(--rd-text)] lg:hidden"
            aria-label="Open navigatiemenu"
          >
            <MenuIcon />
          </button>
        </div>
      </div>

      <div
        className={cn(
          "fixed inset-0 z-50 bg-[rgba(15,21,38,0.22)] transition lg:hidden",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <div
          className={cn(
            "absolute right-0 top-0 flex h-full w-full max-w-sm flex-col bg-white p-6 shadow-2xl transition-transform duration-300",
            isOpen ? "translate-x-0" : "translate-x-full",
          )}
        >
          <div className="flex items-center justify-between">
            <SiteLogo />
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--rd-border)] text-[var(--rd-text)]"
              aria-label="Sluit navigatiemenu"
            >
              <CloseIcon />
            </button>
          </div>
          <div className="mt-10 flex flex-col gap-3">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              const isContact = item.href === "/contact";

              if (isContact) {
                return (
                  <ButtonLink key={item.href} href={item.href} className="w-full justify-center">
                    {item.label}
                  </ButtonLink>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-2xl border px-4 py-4 text-base font-medium",
                    isActive
                      ? "border-[var(--rd-blue)] bg-[rgba(41,82,204,0.08)] text-[var(--rd-blue)]"
                      : "border-[var(--rd-border)] text-[var(--rd-text)]",
                  )}
                >
                  <span className="block">{item.label}</span>
                  <span className="mt-1 block text-sm text-[var(--rd-text-muted)]">
                    {item.description}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
}
