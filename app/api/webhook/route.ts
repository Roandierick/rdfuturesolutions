import { NextResponse } from "next/server";
import { Resend } from "resend";
import Stripe from "stripe";
import { createSignedDownloadUrl, DOWNLOAD_LINK_VALIDITY_MS } from "@/lib/download-links";
import { siteConfig } from "@/lib/site";

export const runtime = "nodejs";

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY)
  : null;
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const INTERNAL_EMAIL = "dierick.roan@gmail.com";
const FROM_EMAIL = "RD Future Solutions <onboarding@resend.dev>";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function buildEmailLayout({
  title,
  introHtml,
  contentHtml,
}: {
  title: string;
  introHtml: string;
  contentHtml: string;
}) {
  return `
    <div style="background: #F5F7FF; padding: 16px; font-family: Arial, Helvetica, sans-serif;">
      <div style="max-width: 680px; width: 100%; box-sizing: border-box; margin: 0 auto; background: #FFFFFF; border: 1px solid #E2E7F5; border-radius: 18px; overflow: hidden;">
        <div style="background: linear-gradient(135deg, #00C8FF 0%, #2952CC 50%, #7B35E8 100%); padding: 22px 22px; color: white;">
          <p style="margin: 0; font-size: 13px; letter-spacing: 0.08em; text-transform: uppercase;">RD Future Solutions</p>
          <h1 style="margin: 10px 0 0; font-size: 28px; line-height: 1.2;">${escapeHtml(title)}</h1>
        </div>
        <div style="padding: 28px;">
          ${introHtml}
          ${contentHtml}
        </div>
      </div>
    </div>
  `;
}

function buildInfoRow(label: string, value: string) {
  return `
    <div style="padding: 10px 0; border-bottom: 1px solid #E2E7F5;">
      <div style="color: #7A87A8; font-size: 13px; margin-bottom: 4px;">${escapeHtml(label)}</div>
      <div style="color: #0F1526; font-size: 15px; line-height: 1.7; word-break: break-word;">${escapeHtml(value)}</div>
    </div>
  `;
}

function buildCustomerEmailHtml({
  ebookTitle,
  downloadUrl,
}: {
  ebookTitle: string;
  downloadUrl: string;
}) {
  return buildEmailLayout({
    title: "Je download is klaar",
    introHtml: `
      <p style="margin: 0 0 16px; color: #3D4A6B; font-size: 15px; line-height: 1.8;">
        Bedankt voor je aankoop van <strong style="color: #0F1526;">${escapeHtml(ebookTitle)}</strong>.
      </p>
      <p style="margin: 0 0 20px; color: #3D4A6B; font-size: 15px; line-height: 1.8;">
        Je beveiligde downloadlink staat klaar. Deze link blijft 48 uur geldig.
      </p>
    `,
    contentHtml: `
      <div style="margin: 24px 0;">
        <a
          href="${escapeHtml(downloadUrl)}"
          style="display: inline-block; padding: 14px 22px; border-radius: 999px; background: linear-gradient(135deg, #00C8FF 0%, #2952CC 50%, #7B35E8 100%); color: #FFFFFF; font-size: 15px; font-weight: 700; text-decoration: none;"
        >
          Download je ebook
        </a>
      </div>

      <div style="margin: 24px 0; padding: 20px; background: #F8FAFF; border: 1px solid #E2E7F5; border-radius: 14px;">
        ${buildInfoRow("Downloadlink", "48 uur geldig")}
        ${buildInfoRow("Toegang", "Directe PDF download na betaling")}
        ${buildInfoRow("Abonnement", "Geen abonnement of terugkerende kosten")}
      </div>

      <p style="margin: 0 0 16px; color: #3D4A6B; font-size: 15px; line-height: 1.8;">
        Werkt de downloadlink niet of heb je een vraag? Antwoord gewoon op deze mail of contacteer ons rechtstreeks.
      </p>

      <div style="margin-top: 28px; padding-top: 20px; border-top: 1px solid #E2E7F5;">
        <p style="margin: 0 0 8px; color: #0F1526; font-size: 15px; font-weight: 700;">RD Future Solutions</p>
        <p style="margin: 0; color: #3D4A6B; font-size: 14px; line-height: 1.8; word-break: break-word;">
          ${escapeHtml(siteConfig.email)}<br />
          ${escapeHtml(siteConfig.phoneDisplay)}<br />
          ${escapeHtml(siteConfig.addressDisplay)}
        </p>
      </div>
    `,
  });
}

function buildInternalEmailHtml({
  ebookTitle,
  customerEmail,
  downloadUrl,
  sessionId,
}: {
  ebookTitle: string;
  customerEmail: string;
  downloadUrl: string;
  sessionId: string;
}) {
  return buildEmailLayout({
    title: "Nieuwe ebook verkoop",
    introHtml: `
      <p style="margin: 0 0 20px; color: #3D4A6B; font-size: 15px; line-height: 1.8;">
        Er is een nieuwe ebook aankoop binnengekomen via Stripe.
      </p>
    `,
    contentHtml: `
      <div style="width: 100%;">
        ${buildInfoRow("Ebook", ebookTitle)}
        ${buildInfoRow("Klant", customerEmail || "Niet gevonden")}
        ${buildInfoRow("Downloadlink", downloadUrl)}
        ${buildInfoRow("Stripe sessie", sessionId)}
      </div>
    `,
  });
}

export async function POST(request: Request) {
  if (!stripe || !resend || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json(
      { message: "Stripe webhook is nog niet volledig geconfigureerd." },
      { status: 500 },
    );
  }

  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { message: "Stripe signature ontbreekt." },
      { status: 400 },
    );
  }

  const rawBody = await request.text();

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (error) {
    console.error("Stripe webhook signature error:", error);

    return NextResponse.json(
      { message: "Webhook verificatie mislukt." },
      { status: 400 },
    );
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      console.log("Stripe webhook session object:", JSON.stringify(session, null, 2));

      const customerEmail =
        session.customer_details?.email ??
        session.customer_email ??
        session.metadata?.customer_email ??
        "";
      const slug = session.metadata?.slug;
      const ebookTitle = session.metadata?.ebook_title ?? "Je ebook";

      console.log("Stripe webhook gevonden e-mailadres:", customerEmail);

      if (!slug) {
        throw new Error("Ebook slug ontbreekt in Stripe metadata.");
      }

      if (!customerEmail) {
        throw new Error("Geen klant e-mailadres gevonden in de Stripe sessie.");
      }

      const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? siteConfig.siteUrl;
      const expires = session.created
        ? session.created * 1000 + DOWNLOAD_LINK_VALIDITY_MS
        : Date.now() + DOWNLOAD_LINK_VALIDITY_MS;
      const downloadUrl = createSignedDownloadUrl({
        slug,
        email: customerEmail,
        expires,
        baseUrl,
      });
      const customerHtml = buildCustomerEmailHtml({
        ebookTitle,
        downloadUrl,
      });
      const internalHtml = buildInternalEmailHtml({
        ebookTitle,
        customerEmail,
        downloadUrl,
        sessionId: session.id,
      });

      const internalResult = await resend.emails.send({
        from: FROM_EMAIL,
        to: INTERNAL_EMAIL,
        replyTo: siteConfig.email,
        subject: `Nieuwe ebook verkoop — ${ebookTitle}`,
        html: internalHtml,
      });

      console.log("Resend internal result:", JSON.stringify(internalResult, null, 2));

      const customerResult = await resend.emails.send({
        from: FROM_EMAIL,
        to: customerEmail,
        replyTo: siteConfig.email,
        subject: `Je download is klaar — ${ebookTitle}`,
        html: customerHtml,
      });

      console.log("Resend customer result:", JSON.stringify(customerResult, null, 2));

      if (internalResult.error || customerResult.error) {
        throw new Error(
          `Webhook e-mailverzending mislukt: ${JSON.stringify({
            internalResult,
            customerResult,
          })}`,
        );
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Stripe webhook processing error:", error);

    return NextResponse.json(
      { message: "Webhook verwerking mislukt." },
      { status: 500 },
    );
  }
}
