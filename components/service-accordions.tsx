"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDownIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

export type ServiceAccordionItem = {
  number: string;
  title: string;
  description: string;
  features: readonly string[];
  audienceTitle: string;
  audienceText: string;
  noteTitle: string;
  noteText: string;
  ctaHref: string;
  ctaLabel: string;
};

type ServiceAccordionsProps = {
  items: readonly ServiceAccordionItem[];
};

export function ServiceAccordions({ items }: ServiceAccordionsProps) {
  const [openIndexes, setOpenIndexes] = useState<number[]>(items.map((_, index) => index));

  function toggleIndex(index: number) {
    setOpenIndexes((current) =>
      current.includes(index)
        ? current.filter((itemIndex) => itemIndex !== index)
        : [...current, index].sort((left, right) => left - right),
    );
  }

  return (
    <div className="border-y border-[var(--rd-border)]">
      {items.map((item, index) => {
        const isOpen = openIndexes.includes(index);

        return (
          <section
            key={item.title}
            className={cn(
              index % 2 === 1 ? "rd-soft-section" : "bg-white",
              index > 0 && "border-t border-[var(--rd-border)]",
            )}
          >
            <div className="section-shell py-10 md:py-12">
              <button
                type="button"
                onClick={() => toggleIndex(index)}
                aria-expanded={isOpen}
                aria-controls={`service-panel-${index}`}
                className="flex w-full flex-col gap-4 text-left lg:flex-row lg:items-start lg:justify-between"
              >
                <div className="min-w-0">
                  <p className="mono-label">
                    {item.number} {"\u00b7"} Dienst
                  </p>
                  <h2 className="mt-4 text-[clamp(1.9rem,4vw,3rem)]">{item.title}</h2>
                </div>

                <ChevronDownIcon
                  className={cn(
                    "mt-2 h-6 w-6 flex-none text-[var(--rd-blue)] transition duration-300",
                    isOpen && "rotate-180",
                  )}
                />
              </button>

              <div
                id={`service-panel-${index}`}
                className={cn(
                  "overflow-hidden transition-[max-height] duration-300 ease-out",
                  isOpen ? "max-h-[120rem]" : "max-h-0",
                )}
              >
                <div className="grid gap-8 pt-8 lg:grid-cols-[minmax(0,0.68fr)_minmax(0,0.32fr)] lg:gap-10">
                  <div className="min-w-0">
                    <p className="max-w-2xl text-base leading-8 text-[var(--rd-text-body)] sm:text-lg">
                      {item.description}
                    </p>

                    <ul className="mt-8 space-y-4">
                      {item.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-3 text-sm leading-7 text-[var(--rd-text-body)] sm:text-base"
                        >
                          <span className="mt-0.5 text-[var(--rd-blue)]">{"\u2192"}</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Link
                      href={item.ctaHref}
                      className="mt-8 inline-flex items-center text-sm font-semibold text-[var(--rd-blue)] transition hover:text-[var(--rd-purple)]"
                    >
                      {item.ctaLabel}
                    </Link>
                  </div>

                  <div className="space-y-4">
                    <div className="rd-card border-l-[3px] border-l-[var(--rd-blue)] p-5">
                      <p className="mono-label">{item.audienceTitle}</p>
                      <p className="mt-3 text-sm leading-7 sm:text-base">{item.audienceText}</p>
                    </div>

                    <div className="rd-card border-l-[3px] border-l-[var(--rd-purple)] p-5">
                      <p className="mono-label">{item.noteTitle}</p>
                      <p className="mt-3 text-sm leading-7 sm:text-base">{item.noteText}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
