"use client";

import { useState, useTransition } from "react";
import { buttonClassName } from "@/components/button-link";
import { MailIcon } from "@/components/icons";
import { siteConfig } from "@/lib/site";

type FormState = {
  naam: string;
  email: string;
  telefoon: string;
  typeProject: string;
  budget: string;
  omschrijving: string;
};

const initialFormState: FormState = {
  naam: "",
  email: "",
  telefoon: "",
  typeProject: "Website",
  budget: "Nog niet zeker",
  omschrijving: "",
};

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
          body: JSON.stringify(formData),
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
    <form onSubmit={handleSubmit} className="rd-card w-full p-5 sm:p-6 lg:p-8">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-[var(--rd-text)]">Naam</span>
          <input
            className="rd-input"
            name="naam"
            required
            value={formData.naam}
            onChange={(event) => updateField("naam", event.target.value)}
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-[var(--rd-text)]">E-mailadres</span>
          <input
            className="rd-input"
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={(event) => updateField("email", event.target.value)}
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-[var(--rd-text)]">Telefoonnummer</span>
          <input
            className="rd-input"
            name="telefoon"
            value={formData.telefoon}
            onChange={(event) => updateField("telefoon", event.target.value)}
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-[var(--rd-text)]">Type project</span>
          <select
            className="rd-input"
            name="typeProject"
            value={formData.typeProject}
            onChange={(event) => updateField("typeProject", event.target.value)}
          >
            <option>Website</option>
            <option>App</option>
            <option>Software</option>
            <option>Andere</option>
          </select>
        </label>
        <label className="block sm:col-span-2">
          <span className="mb-2 block text-sm font-medium text-[var(--rd-text)]">Budget</span>
          <select
            className="rd-input"
            name="budget"
            value={formData.budget}
            onChange={(event) => updateField("budget", event.target.value)}
          >
            <option>Minder dan €600</option>
            <option>€600 – €1.200</option>
            <option>€1.200 – €2.500</option>
            <option>€2.500+</option>
            <option>Nog niet zeker</option>
          </select>
        </label>
        <label className="block sm:col-span-2">
          <span className="mb-2 block text-sm font-medium text-[var(--rd-text)]">
            Omschrijving van het project
          </span>
          <textarea
            className="rd-input min-h-[160px] resize-y"
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
          "mt-6 w-full disabled:cursor-not-allowed disabled:opacity-80",
        )}
      >
        {isPending ? "Aanvraag wordt verstuurd..." : "Verstuur aanvraag"}
      </button>

      {feedback ? (
        <p
          className={`mt-4 rounded-xl px-4 py-3 text-sm leading-6 ${
            feedback.type === "success"
              ? "bg-[rgba(41,82,204,0.08)] text-[var(--rd-blue)]"
              : "bg-[rgba(123,53,232,0.08)] text-[var(--rd-purple)]"
          }`}
        >
          {feedback.message}
        </p>
      ) : null}

      <p className="mt-5 flex flex-col items-start gap-1 text-sm text-[var(--rd-text-muted)] sm:flex-row sm:items-center sm:gap-2">
        <MailIcon className="h-4 w-4 flex-none" />
        Liever rechtstreeks mailen? Dat kan via{" "}
        <a
          href={`mailto:${siteConfig.email}`}
          className="break-all font-medium text-[var(--rd-blue)] hover:underline"
        >
          {siteConfig.email}
        </a>
        .
      </p>
    </form>
  );
}
