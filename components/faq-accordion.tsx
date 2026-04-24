"use client";

import { useState } from "react";
import { ChevronDownIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

type FaqItem = {
  question: string;
  answer: string;
};

type FaqAccordionProps = {
  items: readonly FaqItem[];
};

export function FaqAccordion({ items }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <div className="space-y-4">
      {items.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <div
            key={item.question}
            className="rd-card overflow-hidden border-l-[3px] border-l-[var(--rd-blue)] bg-white"
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
              className="flex w-full items-start justify-between gap-4 px-5 py-5 text-left sm:px-7"
              aria-expanded={isOpen}
            >
              <span className="min-w-0">
                <span className="mono-label">{String(index + 1).padStart(2, "0")}</span>
                <span className="mt-3 block text-base font-semibold text-[var(--rd-text)] sm:text-lg">
                  {item.question}
                </span>
              </span>

              <ChevronDownIcon
                className={cn(
                  "mt-1 h-5 w-5 flex-none text-[var(--rd-blue)] transition duration-300",
                  isOpen && "rotate-180",
                )}
              />
            </button>

            <div
              className={cn(
                "overflow-hidden px-5 transition-[max-height] duration-300 ease-out sm:px-7",
                isOpen ? "max-h-80 pb-6" : "max-h-0",
              )}
            >
              <p className="text-sm leading-7 sm:text-base">{item.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
