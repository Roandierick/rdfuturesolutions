import { jsPDF } from "jspdf";
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
const FROM_EMAIL = "RD Future Solutions <info@rdfuturesolutions.be>";
const processedSessions = new Set<string>();

type GenerateInvoicePdfInput = {
  amountTotal: number;
  customerEmail: string;
  ebookTitle: string;
  invoiceDate: Date;
  invoiceNumber: string;
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatBelgianDate(date: Date) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear());

  return `${day}/${month}/${year}`;
}

function roundCurrency(value: number) {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

function formatEuroAmount(value: number) {
  return `€ ${value.toFixed(2).replace(".", ",")}`;
}

function generateInvoiceNumber(sessionId: string, invoiceDate: Date) {
  const year = invoiceDate.getFullYear();
  const sessionSuffix = sessionId.slice(-6);

  return `RDFS-${year}-${sessionSuffix}`;
}

function generateInvoicePdf({
  amountTotal,
  customerEmail,
  ebookTitle,
  invoiceDate,
  invoiceNumber,
}: GenerateInvoicePdfInput) {
  const totalInclVat = roundCurrency(amountTotal / 100);
  const subtotalExclVat = roundCurrency(totalInclVat / 1.06);
  const vatAmount = roundCurrency(totalInclVat - subtotalExclVat);
  const invoiceDateLabel = formatBelgianDate(invoiceDate);
  const doc = new jsPDF({
    format: "a4",
    unit: "mm",
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const left = 18;
  const right = 192;
  const purple = [123, 53, 232] as const;
  const dark = [15, 21, 38] as const;
  const muted = [102, 112, 133] as const;
  const border = [226, 231, 245] as const;
  const light = [248, 250, 255] as const;
  const headerFill = [244, 246, 255] as const;
  const green = [22, 163, 74] as const;
  const greenFill = [236, 253, 243] as const;
  const greenBorder = [166, 244, 197] as const;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(dark[0], dark[1], dark[2]);
  doc.text("RD Future Solutions", left, 20);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(purple[0], purple[1], purple[2]);
  doc.text("FACTUUR", right, 20, { align: "right" });

  doc.setDrawColor(border[0], border[1], border[2]);
  doc.line(left, 26, right, 26);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(muted[0], muted[1], muted[2]);
  doc.text("Factuurnummer", 145, 36);
  doc.text("Factuurdatum", 145, 43);
  doc.text("Vervaldatum", 145, 50);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(dark[0], dark[1], dark[2]);
  doc.text(invoiceNumber, right, 36, { align: "right" });
  doc.text(invoiceDateLabel, right, 43, { align: "right" });
  doc.text(invoiceDateLabel, right, 50, { align: "right" });

  doc.setFillColor(light[0], light[1], light[2]);
  doc.setDrawColor(border[0], border[1], border[2]);
  doc.rect(left, 60, 83, 38, "FD");
  doc.rect(109, 60, 83, 38, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(muted[0], muted[1], muted[2]);
  doc.text("Verkoper", left + 4, 68);
  doc.text("Gefactureerd aan:", 113, 68);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(dark[0], dark[1], dark[2]);
  doc.text("RD Future Solutions", left + 4, 77);
  doc.text(customerEmail, 113, 77);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  const sellerLines = [
    siteConfig.addressDisplay,
    siteConfig.email,
    `KBO: ${siteConfig.kboDisplay}`,
  ];
  doc.text(sellerLines, left + 4, 84);

  const tableTop = 110;
  const columns = [left, 88, 107, 146, 163, right];

  doc.setFillColor(headerFill[0], headerFill[1], headerFill[2]);
  doc.setDrawColor(border[0], border[1], border[2]);
  doc.rect(left, tableTop, right - left, 12, "FD");
  doc.rect(left, tableTop + 12, right - left, 18, "S");

  doc.line(columns[1], tableTop, columns[1], tableTop + 30);
  doc.line(columns[2], tableTop, columns[2], tableTop + 30);
  doc.line(columns[3], tableTop, columns[3], tableTop + 30);
  doc.line(columns[4], tableTop, columns[4], tableTop + 30);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.setTextColor(muted[0], muted[1], muted[2]);
  doc.text("Omschrijving", left + 3, tableTop + 7.5);
  doc.text("Aantal", columns[2] - 3, tableTop + 7.5, { align: "right" });
  doc.text("Eenheidsprijs excl. BTW", columns[3] - 3, tableTop + 7.5, { align: "right" });
  doc.text("BTW %", columns[4] - 3, tableTop + 7.5, { align: "right" });
  doc.text("Totaal incl. BTW", right - 3, tableTop + 7.5, { align: "right" });

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(dark[0], dark[1], dark[2]);
  doc.text(ebookTitle, left + 3, tableTop + 22);

  doc.setFont("helvetica", "normal");
  doc.text("1", columns[2] - 3, tableTop + 22, { align: "right" });
  doc.text(formatEuroAmount(subtotalExclVat), columns[3] - 3, tableTop + 22, { align: "right" });
  doc.text("6%", columns[4] - 3, tableTop + 22, { align: "right" });
  doc.text(formatEuroAmount(totalInclVat), right - 3, tableTop + 22, { align: "right" });

  doc.setFillColor(light[0], light[1], light[2]);
  doc.setDrawColor(border[0], border[1], border[2]);
  doc.rect(125, 150, 67, 34, "FD");

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(muted[0], muted[1], muted[2]);
  doc.text("Subtotaal excl. BTW", 129, 160);
  doc.text("BTW 6%", 129, 168);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(9.5);
  doc.setTextColor(dark[0], dark[1], dark[2]);
  doc.text(formatEuroAmount(subtotalExclVat), 188, 160, { align: "right" });
  doc.text(formatEuroAmount(vatAmount), 188, 168, { align: "right" });

  doc.setDrawColor(border[0], border[1], border[2]);
  doc.line(129, 173, 188, 173);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10.5);
  doc.text("Totaal incl. BTW", 129, 180);
  doc.text(formatEuroAmount(totalInclVat), 188, 180, { align: "right" });

  doc.setFillColor(greenFill[0], greenFill[1], greenFill[2]);
  doc.setDrawColor(greenBorder[0], greenBorder[1], greenBorder[2]);
  doc.rect(left, 150, 36, 12, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(green[0], green[1], green[2]);
  doc.text("BETAALD", left + 18, 158, { align: "center" });

  doc.setDrawColor(border[0], border[1], border[2]);
  doc.line(left, pageHeight - 22, right, pageHeight - 22);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(muted[0], muted[1], muted[2]);
  doc.text(
    `Bedankt voor je aankoop. Voor vragen: ${siteConfig.email}`,
    pageWidth / 2,
    pageHeight - 14,
    { align: "center" },
  );

  return Buffer.from(doc.output("arraybuffer"));
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
          href="${downloadUrl}"
          style="display: inline-block; padding: 14px 22px; border-radius: 999px; background: linear-gradient(135deg, #00C8FF 0%, #2952CC 50%, #7B35E8 100%); color: #FFFFFF; font-size: 15px; font-weight: 700; text-decoration: none;"
        >
          Download je ebook
        </a>
      </div>

      <p style="margin: -8px 0 20px; color: #3D4A6B; font-size: 15px; line-height: 1.8;">
        Je factuur vind je als bijlage in deze e-mail.
      </p>

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

      if (processedSessions.has(session.id)) {
        console.log("Sessie al verwerkt, skip:", session.id);
        return NextResponse.json({ received: true });
      }

      processedSessions.add(session.id);

      const customerEmail =
        session.customer_details?.email ??
        session.customer_email ??
        session.metadata?.customer_email ??
        "";
      const slug = session.metadata?.slug;
      const ebookTitle = session.metadata?.ebook_title ?? "Je ebook";
      const amountTotal = session.amount_total;

      console.log("Stripe webhook gevonden e-mailadres:", customerEmail);

      if (!slug) {
        throw new Error("Ebook slug ontbreekt in Stripe metadata.");
      }

      if (!customerEmail) {
        throw new Error("Geen klant e-mailadres gevonden in de Stripe sessie.");
      }

      if (typeof amountTotal !== "number") {
        throw new Error("Geen bedrag gevonden in de Stripe sessie.");
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
      const invoiceDate = new Date();
      const invoiceNumber = generateInvoiceNumber(session.id, invoiceDate);
      const invoiceBuffer = generateInvoicePdf({
        amountTotal,
        customerEmail,
        ebookTitle,
        invoiceDate,
        invoiceNumber,
      });

      console.log("Gegenereerde factuur:", invoiceNumber);

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
      const invoiceAttachment = {
        filename: `factuur-${invoiceNumber}.pdf`,
        content: invoiceBuffer,
        contentType: "application/pdf",
      };

      const internalResult = await resend.emails.send({
        from: FROM_EMAIL,
        to: INTERNAL_EMAIL,
        replyTo: siteConfig.email,
        subject: `Nieuwe ebook verkoop — ${ebookTitle}`,
        html: internalHtml,
        attachments: [invoiceAttachment],
      });

      console.log("Resend internal result:", JSON.stringify(internalResult, null, 2));

      const customerResult = await resend.emails.send({
        from: FROM_EMAIL,
        to: customerEmail,
        replyTo: siteConfig.email,
        subject: `Je download is klaar — ${ebookTitle}`,
        html: customerHtml,
        attachments: [invoiceAttachment],
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
