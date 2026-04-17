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

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[var(--rd-border)] bg-white/90 backdrop-blur-[8px]">
      <div className="section-shell">
        <div className="flex h-20 items-center justify-between gap-4 sm:h-24">
          <SiteLogo priority className="min-w-0" />
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
            onClick={() => setIsOpen((current) => !current)}
            className="inline-flex h-11 w-11 flex-none items-center justify-center rounded-full border border-[var(--rd-border)] text-[var(--rd-text)] lg:hidden"
            aria-label="Open navigatiemenu"
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
          >
            <MenuIcon />
          </button>
        </div>
      </div>

      <div
        className={cn(
          "fixed inset-0 z-50 lg:hidden",
          isOpen ? "pointer-events-auto" : "pointer-events-none",
        )}
      >
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          aria-label="Sluit navigatiemenu"
          className={cn(
            "absolute inset-0 bg-[rgba(15,21,38,0.22)] transition-opacity",
            isOpen ? "opacity-100" : "opacity-0",
          )}
        />
        <div
          id="mobile-navigation"
          className={cn(
            "absolute right-0 top-0 flex h-full w-full max-w-sm flex-col bg-white p-4 shadow-2xl transition-transform duration-300 sm:p-6",
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
          <div className="mt-8 flex flex-1 flex-col gap-3 overflow-y-auto pb-6">
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
