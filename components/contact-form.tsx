"use client";

import { useState, useTransition } from "react";
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

function buildOmschrijving(formData: FormState) {
  const introLines = [
    formData.bedrijfsnaam ? `Bedrijfsnaam: ${formData.bedrijfsnaam}` : null,
    `Locatie / gemeente: ${formData.locatie}`,
  ].filter((value): value is string => Boolean(value));

  return [...introLines, "", formData.omschrijving.trim()].join("\n");
}

function buildPayload(formData: FormState) {
  return {
    naam: formData.naam,
    email: formData.email,
    telefoon: formData.telefoon,
    typeProject: formData.dienst,
    dienst: formData.dienst,
    bedrijfsnaam: formData.bedrijfsnaam,
    locatie: formData.locatie,
    omschrijving: buildOmschrijving(formData),
  };
}

export function ContactForm() {
  const [formData, setFormData] = useState<FormState>(initialFormState);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(
    null,
  );
  const [isPending, startTransition] = useTransition();

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setFormData((current) => ({ ...current, [key]: value }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFeedback(null);

    startTransition(async () => {
      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(buildPayload(formData)),
        });

        const data = (await response.json()) as { message?: string };

        if (!response.ok) {
          throw new Error(
            data.message ?? "Er ging iets mis. Probeer het opnieuw of mail ons rechtstreeks.",
          );
        }

        setFeedback({
          type: "success",
          message: "Bedankt! We nemen zo snel mogelijk contact met je op.",
        });
        setFormData(initialFormState);
      } catch (error) {
        setFeedback({
          type: "error",
          message:
            error instanceof Error
              ? error.message
              : "Er ging iets mis. Probeer het opnieuw of mail ons rechtstreeks.",
        });
      }
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rd-card border-l-[3px] border-l-[var(--rd-blue)] p-6 md:p-8"
    >
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
        type="submit"
        disabled={isPending}
        className={buttonClassName(
          "primary",
          "lg",
          "mt-8 w-full disabled:cursor-not-allowed disabled:opacity-80",
        )}
      >
        {isPending ? "Aanvraag wordt verstuurd..." : "Verstuur aanvraag"}
      </button>

      {feedback ? (
        <p
          className={cn(
            "mt-6 border-l-[3px] px-4 py-3 text-sm leading-6",
            feedback.type === "success"
              ? "border-l-[var(--rd-blue)] bg-[rgba(41,82,204,0.08)] text-[var(--rd-blue)]"
              : "border-l-[var(--rd-purple)] bg-[rgba(123,53,232,0.08)] text-[var(--rd-purple)]",
          )}
        >
          {feedback.message}
        </p>
      ) : null}

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
    </form>
  );
}
