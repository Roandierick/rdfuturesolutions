"use client";

import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import { buttonClassName } from "@/components/button-link";

const stripePromise = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  ? loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
  : null;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type CheckoutResponse = {
  url?: string;
  sessionId?: string;
  message?: string;
};

type EbookCheckoutButtonProps = {
  slug: string;
  label: string;
  className?: string;
};

export function EbookCheckoutButton({
  slug,
  label,
  className,
}: EbookCheckoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");

  async function handleCheckout() {
    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail) {
      setError("Vul je e-mailadres in om je downloadlink te ontvangen.");
      return;
    }

    if (!emailPattern.test(normalizedEmail)) {
      setError("Geef een geldig e-mailadres op.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          slug,
          email: normalizedEmail,
        }),
      });

      const data = (await response.json().catch(() => null)) as CheckoutResponse | null;

      if (!response.ok) {
        throw new Error(data?.message ?? "De checkout kon niet worden gestart.");
      }

      if (stripePromise) {
        await stripePromise;
      }

      if (data?.url) {
        window.location.assign(data.url);
        return;
      }

      throw new Error("De checkout kon niet worden gestart.");
    } catch (checkoutError) {
      const message =
        checkoutError instanceof Error
          ? checkoutError.message
          : "Er ging iets mis. Probeer het opnieuw.";

      setError(message);
      setIsLoading(false);
    }
  }

  return (
    <form
      className="space-y-4"
      onSubmit={(event) => {
        event.preventDefault();
        void handleCheckout();
      }}
    >
      <label className="block">
        <span className="mb-2 block text-sm font-medium text-[var(--rd-text)]">
          E-mailadres voor je downloadlink
        </span>
        <input
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="jij@bedrijf.be"
          className="w-full rounded-[1.25rem] border border-[var(--rd-border)] bg-white px-4 py-3 text-sm text-[var(--rd-text)] outline-none transition placeholder:text-[var(--rd-text-muted)] focus:border-[var(--rd-blue)] sm:text-base"
        />
      </label>

      <button
        type="submit"
        disabled={isLoading}
        className={buttonClassName("primary", "lg", className)}
      >
        {isLoading ? "Bezig met doorsturen..." : label}
      </button>

      {error ? (
        <p aria-live="polite" className="mt-3 text-sm text-[var(--rd-purple)]">
          {error}
        </p>
      ) : null}
    </form>
  );
}
