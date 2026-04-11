"use client";

import { useState } from "react";
import { ChevronDownIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

type FaqItem = {
  question: string;
  answer: string;
};

type FaqAccordionProps = {
  items: FaqItem[];
};

export function FaqAccordion({ items }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <div className="space-y-4">
      {items.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <div key={item.question} className="rd-card overflow-hidden">
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
              className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left sm:px-8"
              aria-expanded={isOpen}
            >
              <span className="text-lg font-semibold text-[var(--rd-text)]">{item.question}</span>
              <ChevronDownIcon
                className={cn(
                  "h-5 w-5 flex-none text-[var(--rd-blue)] transition-transform duration-200",
                  isOpen && "rotate-180",
                )}
              />
            </button>
            <div
              className={cn(
                "grid transition-[grid-template-rows] duration-300 ease-out",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden">
                <p className="px-6 pb-6 leading-7 sm:px-8">{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
