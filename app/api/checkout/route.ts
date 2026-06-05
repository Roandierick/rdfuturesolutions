import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getEbookBySlug } from "@/lib/ebooks";
import { siteConfig } from "@/lib/site";

export const runtime = "nodejs";

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY)
  : null;

type CheckoutPayload = {
  slug: string;
  customerType: "particulier" | "bedrijf";
  voornaam: string;
  achternaam: string;
  email: string;
  telefoon: string;
  straat: string;
  postcode: string;
  gemeente: string;
  land: string;
  bedrijfsnaam?: string;
  btwNummer?: string;
  privacyAkkoord: boolean;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getSiteUrl(request: Request) {
  const requestOrigin = request.headers.get("origin");
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? requestOrigin ?? siteConfig.siteUrl;

  return baseUrl.replace(/\/$/, "");
}

function normalizeVatNumber(value: string) {
  return value.toUpperCase().replace(/[.\-\s]/g, "");
}

function isFilled(value: string | undefined) {
  return Boolean(value?.trim());
}

export async function POST(request: Request) {
  try {
    if (!stripe) {
      return NextResponse.json(
        { message: "Stripe is nog niet geconfigureerd." },
        { status: 500 },
      );
    }

    const body = (await request.json()) as Partial<CheckoutPayload>;
    const slug = body.slug?.trim();
    const customerType = body.customerType;
    const voornaam = body.voornaam?.trim();
    const achternaam = body.achternaam?.trim();
    const email = body.email?.trim().toLowerCase();
    const telefoon = body.telefoon?.trim();
    const straat = body.straat?.trim();
    const postcode = body.postcode?.trim();
    const gemeente = body.gemeente?.trim();
    const land = body.land?.trim();
    const bedrijfsnaam = body.bedrijfsnaam?.trim();
    const btwNummer = body.btwNummer ? normalizeVatNumber(body.btwNummer) : "";
    const privacyAkkoord = body.privacyAkkoord === true;

    if (!slug) {
      return NextResponse.json(
        { message: "Geef een geldig ebook door." },
        { status: 400 },
      );
    }

    if (customerType !== "particulier" && customerType !== "bedrijf") {
      return NextResponse.json(
        { message: "Kies of je als particulier of bedrijf koopt." },
        { status: 400 },
      );
    }

    if (
      !isFilled(voornaam) ||
      !isFilled(achternaam) ||
      !isFilled(email) ||
      !isFilled(telefoon) ||
      !isFilled(straat) ||
      !isFilled(postcode) ||
      !isFilled(gemeente) ||
      !isFilled(land)
    ) {
      return NextResponse.json(
        { message: "Vul alle verplichte velden in." },
        { status: 400 },
      );
    }

    if (!emailPattern.test(email ?? "")) {
      return NextResponse.json(
        { message: "Geef een geldig e-mailadres op." },
        { status: 400 },
      );
    }

    if (!privacyAkkoord) {
      return NextResponse.json(
        { message: "Je moet akkoord gaan met de privacyverklaring." },
        { status: 400 },
      );
    }

    if (customerType === "bedrijf" && (!isFilled(bedrijfsnaam) || !isFilled(btwNummer))) {
      return NextResponse.json(
        { message: "Vul je bedrijfsnaam en BTW-nummer in." },
        { status: 400 },
      );
    }

    const validatedVoornaam = voornaam ?? "";
    const validatedAchternaam = achternaam ?? "";
    const validatedEmail = email ?? "";
    const validatedTelefoon = telefoon ?? "";
    const validatedStraat = straat ?? "";
    const validatedPostcode = postcode ?? "";
    const validatedGemeente = gemeente ?? "";
    const validatedLand = land ?? "";
    const validatedBedrijfsnaam = bedrijfsnaam ?? "";

    const ebook = getEbookBySlug(slug);

    if (!ebook) {
      return NextResponse.json(
        { message: "Dit ebook bestaat niet." },
        { status: 404 },
      );
    }

    const priceId = process.env.STRIPE_EBOOK_PRICE_ID;

    if (!priceId) {
      return NextResponse.json(
        { message: "Er is nog geen Stripe prijs gekoppeld aan dit ebook." },
        { status: 500 },
      );
    }

    const siteUrl = getSiteUrl(request);
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${siteUrl}/bedankt?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/ebooks/${ebook.slug}`,
      customer_email: validatedEmail,
      metadata: {
        slug: ebook.slug,
        ebook_title: ebook.title,
        customer_email: validatedEmail,
        customer_type: customerType,
        voornaam: validatedVoornaam,
        achternaam: validatedAchternaam,
        telefoon: validatedTelefoon,
        straat: validatedStraat,
        postcode: validatedPostcode,
        gemeente: validatedGemeente,
        land: validatedLand,
        bedrijfsnaam: customerType === "bedrijf" ? validatedBedrijfsnaam : "",
        btw_nummer: customerType === "bedrijf" ? btwNummer : "",
      },
    });

    if (!session.url) {
      throw new Error("Stripe gaf geen checkout URL terug.");
    }

    return NextResponse.json({
      url: session.url,
      sessionId: session.id,
    });
  } catch (error) {
    console.error("Stripe checkout error:", error);

    return NextResponse.json(
      { message: "De checkout kon niet worden gestart. Probeer het opnieuw." },
      { status: 500 },
    );
  }
}
