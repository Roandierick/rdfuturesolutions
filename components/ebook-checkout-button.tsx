"use client";

import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import { buttonClassName } from "@/components/button-link";

const stripePromise = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  ? loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
  : null;

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

  async function handleCheckout() {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ slug }),
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
    <div>
      <button
        type="button"
        onClick={() => {
          void handleCheckout();
        }}
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
    </div>
  );
}
