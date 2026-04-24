"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { SiteLogo } from "@/components/site-logo";
import { navigation } from "@/lib/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 60);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

    function syncState(matches: boolean) {
      if (matches) {
        setIsOpen(false);
      }
    }

    function handleChange(event: MediaQueryListEvent) {
      syncState(event.matches);
    }

    syncState(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <>
      <header
        className={cn(
          "site-header fixed inset-x-0 top-0 z-[80] border-b border-transparent",
          isScrolled && "scrolled",
        )}
      >
        <div className="section-shell">
          <div className="flex h-24 items-center justify-between gap-6 md:h-28">
            <SiteLogo className="min-w-0" />

            <nav className="hidden items-center gap-7 md:flex">
              {navigation
                .filter((item) => item.href !== "/contact")
                .map((item) => {
                  const isActive = pathname === item.href;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "group relative inline-flex min-h-[44px] items-center text-sm font-medium text-[var(--rd-text)] transition hover:text-[var(--rd-blue)]",
                        isActive && "text-[var(--rd-blue)]",
                      )}
                    >
                      <span>{item.label}</span>
                      <span
                        className={cn(
                          "absolute -bottom-1 left-1/2 h-0.5 w-0 -translate-x-1/2 bg-[image:var(--rd-gradient)] transition-all duration-300",
                          isActive ? "w-8" : "group-hover:w-6",
                        )}
                      />
                    </Link>
                  );
                })}

              <Link
                href="/contact"
                className="inline-flex min-h-[48px] items-center justify-center rounded-full border-2 border-transparent bg-[linear-gradient(#fff,#fff)_padding-box,var(--rd-gradient)_border-box] px-5 py-3 text-sm font-semibold text-[var(--rd-text)] transition hover:text-[var(--rd-blue)]"
              >
                Contact
              </Link>
            </nav>

            <button
              type="button"
              onClick={() => setIsOpen((current) => !current)}
              className="relative inline-flex h-12 w-12 flex-none items-center justify-center md:hidden"
              aria-label={isOpen ? "Sluit navigatiemenu" : "Open navigatiemenu"}
              aria-expanded={isOpen}
              aria-controls="mobile-navigation"
            >
              <span
                className={cn(
                  "absolute h-0.5 w-6 bg-[var(--rd-text)] transition duration-300",
                  isOpen ? "rotate-45" : "-translate-y-[7px]",
                )}
              />
              <span
                className={cn(
                  "absolute h-0.5 w-6 bg-[var(--rd-text)] transition duration-300",
                  isOpen ? "opacity-0" : "opacity-100",
                )}
              />
              <span
                className={cn(
                  "absolute h-0.5 w-6 bg-[var(--rd-text)] transition duration-300",
                  isOpen ? "-rotate-45" : "translate-y-[7px]",
                )}
              />
            </button>
          </div>
        </div>
      </header>

      <div
        className={cn(
          "fixed inset-0 z-[70] bg-white transition duration-300 md:hidden",
          isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={() => setIsOpen(false)}
      >
        <div className="section-shell flex h-full min-h-screen items-center justify-center py-28">
          <nav
            id="mobile-navigation"
            className="flex w-full max-w-xl flex-col gap-3"
            onClick={(event) => event.stopPropagation()}
          >
            {navigation.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "group relative flex min-h-[56px] items-center overflow-hidden border border-[var(--rd-border)] bg-white px-6 py-5 text-[1.75rem] font-semibold leading-none text-[var(--rd-text)] transition hover:text-[var(--rd-blue)]",
                    isActive && "text-[var(--rd-blue)]",
                  )}
                >
                  <span className="absolute inset-y-0 left-0 w-1 bg-transparent transition group-hover:bg-[image:var(--rd-gradient)]" />
                  <span
                    className={cn(
                      "absolute inset-y-0 left-0 w-1 bg-[image:var(--rd-gradient)]",
                      !isActive && "hidden",
                    )}
                  />
                  <span className="relative">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
}
