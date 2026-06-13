"use client";

import { useEffect, useState } from "react";
import { buttonClassName } from "@/components/button-link";
import { MailIcon } from "@/components/icons";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

type FormState = {
  naam: string;
  email: string;
  telefoon: string;
  dienst: string;
  bedrijfsnaam: string;
  locatie: string;
  omschrijving: string;
};

const dienstOpties = [
  "AI-strategie & advies",
  "AI-automatisering",
  "AI-chatbots & klantenservice",
  "AI Startup Assistant",
  "Custom AI Tools",
  "Nog niet zeker",
] as const;

const initialFormState: FormState = {
  naam: "",
  email: "",
  telefoon: "",
  dienst: "Nog niet zeker",
  bedrijfsnaam: "",
  locatie: "",
  omschrijving: "",
};

export function ContactForm() {
  const [formData, setFormData] = useState<FormState>(initialFormState);
  const [isValid, setIsValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const requiredFields = [
      formData.naam,
      formData.email,
      formData.locatie,
      formData.omschrijving,
    ];

    setIsValid(requiredFields.every((value) => value.trim().length > 0));
  }, [formData.email, formData.locatie, formData.naam, formData.omschrijving]);

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setFormData((current) => ({ ...current, [key]: value }));
  }

  async function handleCalendlyClick() {
    if (!isValid || isSubmitting) return;

    setIsSubmitting(true);

    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
    } catch (error) {
      console.error("Contact form request failed:", error);
    } finally {
      setIsSubmitting(false);
      window.open("https://calendly.com/rdfuturesolutions-info/30min", "_blank");
    }
  }

  return (
    <div role="form" className="rd-card border-l-[3px] border-l-[var(--rd-blue)] p-6 md:p-8">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <label className="block">
          <span className="block text-[0.85rem] font-medium text-[var(--rd-text-body)]">Naam</span>
          <input
            className="rd-underline-input"
            name="naam"
            required
            value={formData.naam}
            onChange={(event) => updateField("naam", event.target.value)}
          />
        </label>

        <label className="block">
          <span className="block text-[0.85rem] font-medium text-[var(--rd-text-body)]">
            E-mailadres
          </span>
          <input
            className="rd-underline-input"
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={(event) => updateField("email", event.target.value)}
          />
        </label>

        <label className="block">
          <span className="block text-[0.85rem] font-medium text-[var(--rd-text-body)]">
            Telefoonnummer
          </span>
          <input
            className="rd-underline-input"
            name="telefoon"
            value={formData.telefoon}
            onChange={(event) => updateField("telefoon", event.target.value)}
          />
        </label>

        <label className="block">
          <span className="block text-[0.85rem] font-medium text-[var(--rd-text-body)]">
            Welke dienst interesseert je?
          </span>
          <select
            className="rd-underline-input"
            name="dienst"
            required
            value={formData.dienst}
            onChange={(event) => updateField("dienst", event.target.value)}
          >
            {dienstOpties.map((optie) => (
              <option key={optie}>{optie}</option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="block text-[0.85rem] font-medium text-[var(--rd-text-body)]">
            Naam van je bedrijf
          </span>
          <input
            className="rd-underline-input"
            name="bedrijfsnaam"
            value={formData.bedrijfsnaam}
            onChange={(event) => updateField("bedrijfsnaam", event.target.value)}
          />
        </label>

        <label className="block">
          <span className="block text-[0.85rem] font-medium text-[var(--rd-text-body)]">
            Locatie / gemeente
          </span>
          <input
            className="rd-underline-input"
            name="locatie"
            required
            value={formData.locatie}
            onChange={(event) => updateField("locatie", event.target.value)}
          />
        </label>

        <label className="block sm:col-span-2">
          <span className="block text-[0.85rem] font-medium text-[var(--rd-text-body)]">
            Vertel ons over je bedrijf en wat je wilt bereiken
          </span>
          <textarea
            className="rd-underline-input min-h-[152px] resize-y"
            name="omschrijving"
            required
            value={formData.omschrijving}
            onChange={(event) => updateField("omschrijving", event.target.value)}
          />
        </label>
      </div>

      <button
        disabled={!isValid || isSubmitting}
        aria-disabled={!isValid || isSubmitting}
        onClick={handleCalendlyClick}
        className={buttonClassName(
          "primary",
          "lg",
          cn(
            "mt-8 w-full",
            (!isValid || isSubmitting) && "opacity-50 cursor-not-allowed pointer-events-none",
          ),
        )}
      >
        Boek gratis gesprek
      </button>

      <p className="mt-6 flex flex-col items-start gap-2 text-sm text-[var(--rd-text-muted)] sm:flex-row sm:items-center">
        <MailIcon className="h-4 w-4 flex-none" />
        <span>
          Liever rechtstreeks mailen? Dat kan via{" "}
          <a
            href={`mailto:${siteConfig.email}`}
            className="font-medium text-[var(--rd-blue)] hover:underline"
          >
            {siteConfig.email}
          </a>
          .
        </span>
      </p>
    </div>
  );
}
