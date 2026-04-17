"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { buttonClassName } from "@/components/button-link";
import { CloseIcon, MenuIcon } from "@/components/icons";
import { SiteLogo } from "@/components/site-logo";
import { navigation } from "@/lib/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

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

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");

    function syncMenuState(matches: boolean) {
      if (matches) {
        setIsOpen(false);
      }
    }

    function handleChange(event: MediaQueryListEvent) {
      syncMenuState(event.matches);
    }

    syncMenuState(mediaQuery.matches);

    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-[70] border-b border-[var(--rd-border)] bg-white/90 backdrop-blur-[8px]">
      <div className="section-shell">
        <div className="flex h-20 items-center justify-between gap-4 sm:h-24">
          <SiteLogo priority className="min-w-0" />

          <nav className="hidden items-center gap-2 md:flex">
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
            <Link href="/contact" className={buttonClassName("primary", "sm")}>
              Contact
            </Link>
          </nav>

          <button
            type="button"
            onClick={() => setIsOpen((current) => !current)}
            className="inline-flex h-11 w-11 flex-none items-center justify-center rounded-full border border-[var(--rd-border)] text-[var(--rd-text)] md:hidden"
            aria-label={isOpen ? "Sluit navigatiemenu" : "Open navigatiemenu"}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
          >
            {isOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      <div className={cn("md:hidden", isOpen ? "pointer-events-auto" : "pointer-events-none")}>
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          aria-label="Sluit mobiel menu"
          className={cn(
            "fixed inset-0 top-20 z-[71] bg-[rgba(15,21,38,0.24)] transition-opacity sm:top-24",
            isOpen ? "opacity-100" : "opacity-0",
          )}
        />

        <div
          className={cn(
            "absolute inset-x-0 top-full z-[72] border-t border-[var(--rd-border)] bg-white shadow-2xl transition-all duration-300",
            isOpen ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0",
          )}
        >
          <div className="section-shell py-4">
            <nav
              id="mobile-navigation"
              className="flex max-h-[calc(100vh-5rem)] flex-col gap-3 overflow-y-auto pb-4 sm:max-h-[calc(100vh-6rem)]"
            >
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                const isContact = item.href === "/contact";

                if (isContact) {
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={buttonClassName("primary", "lg", "w-full justify-center")}
                    >
                      {item.label}
                    </Link>
                  );
                }

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "block rounded-2xl border px-4 py-4 text-base font-medium transition",
                      isActive
                        ? "border-[var(--rd-blue)] bg-[rgba(41,82,204,0.08)] text-[var(--rd-blue)]"
                        : "border-[var(--rd-border)] text-[var(--rd-text)]",
                    )}
                  >
                    <span className="block">{item.label}</span>
                    <span className="mt-1 block text-sm leading-6 text-[var(--rd-text-muted)]">
                      {item.description}
                    </span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
