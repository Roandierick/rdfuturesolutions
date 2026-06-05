"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { type FormEvent, useMemo, useState } from "react";
import { ButtonLink, buttonClassName } from "@/components/button-link";
import { PageHero } from "@/components/page-hero";
import { formatEbookPrice, getEbookBySlug } from "@/lib/ebooks";

type CustomerType = "particulier" | "bedrijf";

type CheckoutFormState = {
  voornaam: string;
  achternaam: string;
  bedrijfsnaam: string;
  btwNummer: string;
  email: string;
  telefoon: string;
  straat: string;
  postcode: string;
  gemeente: string;
  land: string;
  privacyAkkoord: boolean;
};

type CheckoutResponse = {
  url?: string;
  message?: string;
};

type VatValidationResponse = {
  valid: boolean;
  companyName?: string;
  error?: string;
};

type VatValidationState = {
  status: "idle" | "checking" | "valid" | "invalid" | "error";
  checkedVatNumber: string;
  message: string;
};

const countryOptions = ["België", "Nederland", "Luxemburg", "Duitsland", "Frankrijk"] as const;

const initialFormState: CheckoutFormState = {
  voornaam: "",
  achternaam: "",
  bedrijfsnaam: "",
  btwNummer: "",
  email: "",
  telefoon: "",
  straat: "",
  postcode: "",
  gemeente: "",
  land: "België",
  privacyAkkoord: false,
};

const initialVatValidationState: VatValidationState = {
  status: "idle",
  checkedVatNumber: "",
  message: "",
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isFilled(value: string) {
  return value.trim().length > 0;
}

function normalizeVatNumber(value: string) {
  return value.toUpperCase().replace(/[.\-\s]/g, "");
}

function isVatFormatValid(value: string) {
  return /^[A-Z]{2}[0-9]+$/.test(value);
}

export default function EbookCheckoutPage() {
  const params = useParams<{ slug: string }>();
  const slugParam = params?.slug;
  const slug = Array.isArray(slugParam) ? slugParam[0] : slugParam ?? "";
  const ebook = useMemo(() => getEbookBySlug(slug), [slug]);

  const [customerType, setCustomerType] = useState<CustomerType | null>(null);
  const [formData, setFormData] = useState<CheckoutFormState>(initialFormState);
  const [vatValidation, setVatValidation] = useState<VatValidationState>(initialVatValidationState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  if (!ebook) {
    return (
      <>
        <PageHero
          eyebrow="Ebook kopen"
          title="Dit ebook werd niet gevonden"
          description="Controleer de link of ga terug naar het overzicht van onze ebooks."
        />

        <section className="section-space pt-4">
          <div className="section-shell">
            <div className="rd-card max-w-3xl border-l-[3px] border-l-[var(--rd-blue)] p-6 sm:p-8">
              <p className="text-base leading-8 text-[var(--rd-text-body)] sm:text-lg">
                Het ebook dat je wil kopen bestaat niet of is niet langer beschikbaar.
              </p>

              <div className="mt-8">
                <ButtonLink href="/ebooks" size="lg">
                  Terug naar ebooks
                </ButtonLink>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  function updateField<K extends keyof CheckoutFormState>(key: K, value: CheckoutFormState[K]) {
    setFormData((current) => ({
      ...current,
      [key]: value,
    }));
    setSubmitError("");

    if (key === "btwNummer") {
      const normalizedValue = normalizeVatNumber(String(value));

      if (normalizedValue !== vatValidation.checkedVatNumber) {
        setVatValidation(initialVatValidationState);
      }
    }
  }

  function selectCustomerType(type: CustomerType) {
    setCustomerType(type);
    setSubmitError("");

    if (type === "particulier") {
      setFormData((current) => ({
        ...current,
        bedrijfsnaam: "",
        btwNummer: "",
      }));
      setVatValidation(initialVatValidationState);
    }
  }

  async function validateVatNumber() {
    const normalizedVatNumber = normalizeVatNumber(formData.btwNummer);

    if (!normalizedVatNumber) {
      setVatValidation(initialVatValidationState);
      return;
    }

    if (!isVatFormatValid(normalizedVatNumber)) {
      setVatValidation({
        status: "invalid",
        checkedVatNumber: normalizedVatNumber,
        message: "BTW-nummer niet gevonden of ongeldig",
      });
      return;
    }

    if (
      vatValidation.checkedVatNumber === normalizedVatNumber &&
      vatValidation.status === "valid"
    ) {
      return;
    }

    setVatValidation({
      status: "checking",
      checkedVatNumber: normalizedVatNumber,
      message: "",
    });

    try {
      const response = await fetch("/api/validate-vat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          vatNumber: normalizedVatNumber,
        }),
      });

      const data = (await response.json()) as VatValidationResponse;

      if (!response.ok) {
        throw new Error(data.error ?? "Validatie tijdelijk niet beschikbaar");
      }

      if (data.valid) {
        setVatValidation({
          status: "valid",
          checkedVatNumber: normalizedVatNumber,
          message: "BTW-nummer geldig",
        });
        return;
      }

      setVatValidation({
        status: data.error ? "error" : "invalid",
        checkedVatNumber: normalizedVatNumber,
        message: data.error ?? "BTW-nummer niet gevonden of ongeldig",
      });
    } catch (error) {
      setVatValidation({
        status: "error",
        checkedVatNumber: normalizedVatNumber,
        message:
          error instanceof Error ? error.message : "Validatie tijdelijk niet beschikbaar",
      });
    }
  }

  const commonFieldsValid =
    isFilled(formData.voornaam) &&
    isFilled(formData.achternaam) &&
    emailPattern.test(formData.email.trim()) &&
    isFilled(formData.telefoon) &&
    isFilled(formData.straat) &&
    isFilled(formData.postcode) &&
    isFilled(formData.gemeente) &&
    isFilled(formData.land) &&
    formData.privacyAkkoord;

  const vatIsValid =
    vatValidation.status === "valid" &&
    vatValidation.checkedVatNumber === normalizeVatNumber(formData.btwNummer);

  const canSubmit =
    customerType === "particulier"
      ? commonFieldsValid
      : customerType === "bedrijf"
        ? commonFieldsValid &&
          isFilled(formData.bedrijfsnaam) &&
          isFilled(formData.btwNummer) &&
          vatIsValid
        : false;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const currentEbook = ebook;

    if (!currentEbook || !customerType || !canSubmit) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const payload = {
        slug: currentEbook.slug,
        customerType,
        voornaam: formData.voornaam.trim(),
        achternaam: formData.achternaam.trim(),
        email: formData.email.trim(),
        telefoon: formData.telefoon.trim(),
        straat: formData.straat.trim(),
        postcode: formData.postcode.trim(),
        gemeente: formData.gemeente.trim(),
        land: formData.land.trim(),
        privacyAkkoord: formData.privacyAkkoord,
        ...(customerType === "bedrijf"
          ? {
              bedrijfsnaam: formData.bedrijfsnaam.trim(),
              btwNummer: normalizeVatNumber(formData.btwNummer),
            }
          : {}),
      };

      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = (await response.json().catch(() => null)) as CheckoutResponse | null;

      if (!response.ok) {
        throw new Error(data?.message ?? "De checkout kon niet worden gestart.");
      }

      if (!data?.url) {
        throw new Error("De checkout kon niet worden gestart.");
      }

      window.location.assign(data.url);
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "Er ging iets mis. Probeer het opnieuw.",
      );
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <PageHero
        eyebrow="Ebook kopen"
        title="Jouw gegevens"
        description="Vul je gegevens in. Je wordt daarna doorgestuurd naar de beveiligde betaalpagina."
      />

      <section className="section-space pt-4">
        <div className="section-shell">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start">
            <div className="space-y-8">
              <div className="rd-card border-l-[3px] border-l-[var(--rd-blue)] p-6 md:p-8">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="mono-label">Stap 1</p>
                    <h2 className="mt-3 text-[clamp(1.9rem,3vw,2.8rem)]">Kies hoe je koopt</h2>
                  </div>
                  <p className="text-sm text-[var(--rd-text-muted)] sm:text-base">
                    Selecteer particulier of bedrijf om verder te gaan.
                  </p>
                </div>

                <div className="mt-8 grid gap-4 md:grid-cols-2">
                  <button
                    type="button"
                    onClick={() => selectCustomerType("particulier")}
                    aria-pressed={customerType === "particulier"}
                    className={`rd-card p-6 text-left transition ${
                      customerType === "particulier"
                        ? "border-[var(--rd-purple)] bg-[rgba(123,53,232,0.08)] shadow-[0_18px_40px_rgba(123,53,232,0.12)]"
                        : "hover:border-[var(--rd-blue)] hover:bg-[var(--rd-bg-soft)]"
                    }`}
                  >
                    <p className="mono-label">Particulier</p>
                    <h3 className="mt-4">Particulier</h3>
                    <p className="mt-3 text-sm leading-7 sm:text-base">
                      Ik koop voor persoonlijk gebruik
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => selectCustomerType("bedrijf")}
                    aria-pressed={customerType === "bedrijf"}
                    className={`rd-card p-6 text-left transition ${
                      customerType === "bedrijf"
                        ? "border-[var(--rd-purple)] bg-[rgba(123,53,232,0.08)] shadow-[0_18px_40px_rgba(123,53,232,0.12)]"
                        : "hover:border-[var(--rd-blue)] hover:bg-[var(--rd-bg-soft)]"
                    }`}
                  >
                    <p className="mono-label">Bedrijf</p>
                    <h3 className="mt-4">Bedrijf</h3>
                    <p className="mt-3 text-sm leading-7 sm:text-base">
                      Ik koop voor mijn onderneming en wil een factuur
                    </p>
                  </button>
                </div>
              </div>

              {customerType ? (
                <form
                  onSubmit={handleSubmit}
                  className="rd-card border-l-[3px] border-l-[var(--rd-purple)] p-6 md:p-8"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <p className="mono-label">Stap 2</p>
                      <h2 className="mt-3 text-[clamp(1.9rem,3vw,2.8rem)]">Vul je gegevens in</h2>
                    </div>
                    <p className="text-sm text-[var(--rd-text-muted)] sm:text-base">
                      {customerType === "bedrijf"
                        ? "Facturatiegegevens voor je onderneming"
                        : "Gegevens voor je aankoop en downloadmail"}
                    </p>
                  </div>

                  <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <label className="block">
                      <span className="block text-[0.85rem] font-medium text-[var(--rd-text-body)]">
                        Voornaam
                      </span>
                      <input
                        className="rd-underline-input"
                        type="text"
                        required
                        value={formData.voornaam}
                        onChange={(event) => updateField("voornaam", event.target.value)}
                      />
                    </label>

                    <label className="block">
                      <span className="block text-[0.85rem] font-medium text-[var(--rd-text-body)]">
                        Achternaam
                      </span>
                      <input
                        className="rd-underline-input"
                        type="text"
                        required
                        value={formData.achternaam}
                        onChange={(event) => updateField("achternaam", event.target.value)}
                      />
                    </label>

                    {customerType === "bedrijf" ? (
                      <>
                        <label className="block sm:col-span-2">
                          <span className="block text-[0.85rem] font-medium text-[var(--rd-text-body)]">
                            Bedrijfsnaam
                          </span>
                          <input
                            className="rd-underline-input"
                            type="text"
                            required
                            value={formData.bedrijfsnaam}
                            onChange={(event) => updateField("bedrijfsnaam", event.target.value)}
                          />
                        </label>

                        <label className="block sm:col-span-2">
                          <span className="block text-[0.85rem] font-medium text-[var(--rd-text-body)]">
                            BTW-nummer
                          </span>
                          <input
                            className="rd-underline-input"
                            type="text"
                            required
                            placeholder="BE0123456789"
                            value={formData.btwNummer}
                            onChange={(event) => updateField("btwNummer", event.target.value)}
                            onBlur={() => {
                              void validateVatNumber();
                            }}
                          />
                          {vatValidation.status !== "idle" ? (
                            <p
                              className={`mt-3 text-sm ${
                                vatValidation.status === "valid"
                                  ? "text-[var(--rd-blue)]"
                                  : vatValidation.status === "checking"
                                    ? "text-[var(--rd-text-muted)]"
                                    : "text-[var(--rd-purple)]"
                              }`}
                            >
                              {vatValidation.status === "checking"
                                ? "BTW-nummer wordt gecontroleerd..."
                                : vatValidation.message}
                            </p>
                          ) : null}
                        </label>
                      </>
                    ) : null}

                    <label className="block">
                      <span className="block text-[0.85rem] font-medium text-[var(--rd-text-body)]">
                        E-mailadres
                      </span>
                      <input
                        className="rd-underline-input"
                        type="email"
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
                        type="tel"
                        required
                        value={formData.telefoon}
                        onChange={(event) => updateField("telefoon", event.target.value)}
                      />
                    </label>

                    <label className="block sm:col-span-2">
                      <span className="block text-[0.85rem] font-medium text-[var(--rd-text-body)]">
                        Straat en huisnummer
                      </span>
                      <input
                        className="rd-underline-input"
                        type="text"
                        required
                        value={formData.straat}
                        onChange={(event) => updateField("straat", event.target.value)}
                      />
                    </label>

                    <label className="block">
                      <span className="block text-[0.85rem] font-medium text-[var(--rd-text-body)]">
                        Postcode
                      </span>
                      <input
                        className="rd-underline-input"
                        type="text"
                        required
                        value={formData.postcode}
                        onChange={(event) => updateField("postcode", event.target.value)}
                      />
                    </label>

                    <label className="block">
                      <span className="block text-[0.85rem] font-medium text-[var(--rd-text-body)]">
                        Gemeente
                      </span>
                      <input
                        className="rd-underline-input"
                        type="text"
                        required
                        value={formData.gemeente}
                        onChange={(event) => updateField("gemeente", event.target.value)}
                      />
                    </label>

                    <label className="block sm:col-span-2">
                      <span className="block text-[0.85rem] font-medium text-[var(--rd-text-body)]">
                        Land
                      </span>
                      <select
                        className="rd-underline-input"
                        required
                        value={formData.land}
                        onChange={(event) => updateField("land", event.target.value)}
                      >
                        {countryOptions.map((country) => (
                          <option key={country} value={country}>
                            {country}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>

                  <label className="mt-8 flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={formData.privacyAkkoord}
                      onChange={(event) => updateField("privacyAkkoord", event.target.checked)}
                      className="mt-1 h-4 w-4 rounded border-[var(--rd-border)] text-[var(--rd-purple)] focus:ring-[var(--rd-purple)]"
                    />
                    <span className="text-sm leading-7 text-[var(--rd-text-body)]">
                      Ik heb de{" "}
                      <Link
                        href="/privacy"
                        target="_blank"
                        rel="noreferrer"
                        className="font-medium text-[var(--rd-blue)] hover:underline"
                      >
                        privacyverklaring
                      </Link>{" "}
                      gelezen en ga akkoord met de verwerking van mijn gegevens.
                    </span>
                  </label>

                  <button
                    type="submit"
                    disabled={!canSubmit || isSubmitting}
                    className={buttonClassName(
                      "primary",
                      "lg",
                      "mt-8 w-full disabled:cursor-not-allowed disabled:opacity-70",
                    )}
                  >
                    {isSubmitting ? "Bezig met doorsturen..." : "Verder naar betaling"}
                  </button>

                  {submitError ? (
                    <p className="mt-4 border-l-[3px] border-l-[var(--rd-purple)] bg-[rgba(123,53,232,0.08)] px-4 py-3 text-sm leading-6 text-[var(--rd-purple)]">
                      {submitError}
                    </p>
                  ) : null}
                </form>
              ) : null}
            </div>

            <aside className="rd-card border-l-[3px] border-l-[var(--rd-blue)] p-6 sm:p-7 lg:sticky lg:top-32">
              <p className="mono-label">Je bestelling</p>
              <h2 className="mt-4 text-[2rem] sm:text-[2.3rem]">{ebook.title}</h2>
              <p className="mt-3 text-base font-medium leading-7 text-[var(--rd-text)] sm:text-lg">
                {ebook.subtitle}
              </p>

              <div className="mt-6 grid gap-4 border-t border-[var(--rd-border)] pt-6">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="mono-label">Prijs</p>
                    <p className="mt-2 text-[2.25rem] font-semibold leading-none text-[var(--rd-text)]">
                      {formatEbookPrice(ebook.price)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="mono-label">Inhoud</p>
                    <p className="mt-2 text-base font-medium text-[var(--rd-text)]">
                      50+ pagina’s
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-3 text-sm leading-7 text-[var(--rd-text-body)] sm:text-base">
                <p>Je wordt na het invullen doorgestuurd naar de beveiligde Stripe betaalpagina.</p>
                <p>Na betaling ontvang je automatisch je downloadmail op het opgegeven e-mailadres.</p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
