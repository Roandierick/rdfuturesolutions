import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getEbookBySlug } from "@/lib/ebooks";
import { siteConfig } from "@/lib/site";

export const runtime = "nodejs";

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY)
  : null;

type CheckoutPayload = {
  slug?: string;
};

function getSiteUrl(request: Request) {
  const requestOrigin = request.headers.get("origin");
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? requestOrigin ?? siteConfig.siteUrl;

  return baseUrl.replace(/\/$/, "");
}

export async function POST(request: Request) {
  try {
    if (!stripe) {
      return NextResponse.json(
        { message: "Stripe is nog niet geconfigureerd." },
        { status: 500 },
      );
    }

    const body = (await request.json()) as CheckoutPayload;
    const slug = body.slug?.trim();

    if (!slug) {
      return NextResponse.json(
        { message: "Geef een geldig ebook door." },
        { status: 400 },
      );
    }

    const ebook = getEbookBySlug(slug);

    if (!ebook) {
      return NextResponse.json(
        { message: "Dit ebook bestaat niet." },
        { status: 404 },
      );
    }

    if (!ebook.priceId) {
      return NextResponse.json(
        { message: "Er is nog geen Stripe prijs gekoppeld aan dit ebook." },
        { status: 500 },
      );
    }

    const siteUrl = getSiteUrl(request);
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_creation: "always",
      billing_address_collection: "auto",
      line_items: [
        {
          price: ebook.priceId,
          quantity: 1,
        },
      ],
      success_url: `${siteUrl}/bedankt?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/ebooks/${ebook.slug}`,
      customer_email: undefined,
      metadata: {
        slug: ebook.slug,
        ebook_title: ebook.title,
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
