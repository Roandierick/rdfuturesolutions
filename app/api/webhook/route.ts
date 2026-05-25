import PDFDocument from "pdfkit";
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

async function generateInvoicePdf({
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

  return await new Promise<Buffer>((resolve, reject) => {
    const doc = new PDFDocument({
      size: "A4",
      margin: 50,
      info: {
        Title: `Factuur ${invoiceNumber}`,
        Author: "RD Future Solutions",
        Subject: `Factuur voor ${ebookTitle}`,
        Creator: "RD Future Solutions",
        Producer: "RD Future Solutions",
        CreationDate: invoiceDate,
      },
    });

    const chunks: Buffer[] = [];
    const left = 50;
    const right = doc.page.width - 50;
    const contentWidth = right - left;
    const purple = "#7B35E8";
    const dark = "#0F1526";
    const muted = "#667085";
    const border = "#E2E7F5";
    const light = "#F8FAFF";
    const green = "#16A34A";

    doc.on("data", (chunk) => {
      chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
    });
    doc.on("end", () => {
      resolve(Buffer.concat(chunks));
    });
    doc.on("error", reject);

    doc.fillColor(dark).font("Helvetica-Bold").fontSize(24).text("RD Future Solutions", left, 52);
    doc
      .fillColor(purple)
      .font("Helvetica-Bold")
      .fontSize(26)
      .text("FACTUUR", right - 180, 52, { width: 180, align: "right" });

    doc
      .strokeColor(border)
      .lineWidth(1)
      .moveTo(left, 98)
      .lineTo(right, 98)
      .stroke();

    doc.fillColor(muted).font("Helvetica").fontSize(10);
    doc.text("Factuurnummer", right - 200, 116, { width: 200, align: "right" });
    doc.fillColor(dark).font("Helvetica-Bold").fontSize(11);
    doc.text(invoiceNumber, right - 200, 130, { width: 200, align: "right" });

    doc.fillColor(muted).font("Helvetica").fontSize(10);
    doc.text("Factuurdatum", right - 200, 150, { width: 200, align: "right" });
    doc.fillColor(dark).font("Helvetica-Bold").fontSize(11);
    doc.text(invoiceDateLabel, right - 200, 164, { width: 200, align: "right" });

    doc.fillColor(muted).font("Helvetica").fontSize(10);
    doc.text("Vervaldatum", right - 200, 184, { width: 200, align: "right" });
    doc.fillColor(dark).font("Helvetica-Bold").fontSize(11);
    doc.text(invoiceDateLabel, right - 200, 198, { width: 200, align: "right" });

    const blockY = 245;
    const blockWidth = (contentWidth - 20) / 2;
    const blockHeight = 120;

    doc.roundedRect(left, blockY, blockWidth, blockHeight, 12).fillAndStroke(light, border);
    doc
      .fillColor(muted)
      .font("Helvetica-Bold")
      .fontSize(10)
      .text("Verkoper", left + 16, blockY + 14);
    doc.fillColor(dark).font("Helvetica-Bold").fontSize(12).text("RD Future Solutions", left + 16, blockY + 34);
    doc
      .font("Helvetica")
      .fontSize(10.5)
      .fillColor(dark)
      .text(siteConfig.addressDisplay, left + 16, blockY + 54, { width: blockWidth - 32 });
    doc.text(siteConfig.email, left + 16, blockY + 72, { width: blockWidth - 32 });
    doc.text(`KBO: ${siteConfig.kboDisplay}`, left + 16, blockY + 90, { width: blockWidth - 32 });

    const customerBlockX = left + blockWidth + 20;

    doc.roundedRect(customerBlockX, blockY, blockWidth, blockHeight, 12).fillAndStroke(light, border);
    doc
      .fillColor(muted)
      .font("Helvetica-Bold")
      .fontSize(10)
      .text("Gefactureerd aan:", customerBlockX + 16, blockY + 14);
    doc
      .fillColor(dark)
      .font("Helvetica-Bold")
      .fontSize(12)
      .text(customerEmail, customerBlockX + 16, blockY + 40, { width: blockWidth - 32 });

    const tableY = blockY + blockHeight + 34;
    const columnWidths = [175, 55, 105, 55, 105];
    const columnLabels = [
      "Omschrijving",
      "Aantal",
      "Eenheidsprijs excl. BTW",
      "BTW %",
      "Totaal incl. BTW",
    ];
    const rowValues = [
      ebookTitle,
      "1",
      formatEuroAmount(subtotalExclVat),
      "6%",
      formatEuroAmount(totalInclVat),
    ];
    let currentX = left;

    doc.roundedRect(left, tableY, contentWidth, 30, 10).fillAndStroke("#F4F6FF", border);

    columnLabels.forEach((label, index) => {
      const width = columnWidths[index];
      const isRightAligned = index > 0;

      doc
        .fillColor(muted)
        .font("Helvetica-Bold")
        .fontSize(9)
        .text(label, currentX + 10, tableY + 10, {
          width: width - 20,
          align: isRightAligned ? "right" : "left",
        });

      currentX += width;
    });

    const rowY = tableY + 36;

    doc.roundedRect(left, rowY, contentWidth, 48, 10).fillAndStroke("#FFFFFF", border);

    currentX = left;
    rowValues.forEach((value, index) => {
      const width = columnWidths[index];
      const isRightAligned = index > 0;

      doc
        .fillColor(dark)
        .font(index === 0 ? "Helvetica-Bold" : "Helvetica")
        .fontSize(10.5)
        .text(value, currentX + 10, rowY + 15, {
          width: width - 20,
          align: isRightAligned ? "right" : "left",
        });

      currentX += width;
    });

    const summaryY = rowY + 72;
    const summaryWidth = 220;
    const summaryX = right - summaryWidth;

    doc.roundedRect(summaryX, summaryY, summaryWidth, 98, 12).fillAndStroke(light, border);

    doc.fillColor(muted).font("Helvetica").fontSize(10);
    doc.text("Subtotaal excl. BTW", summaryX + 16, summaryY + 16, { width: 110 });
    doc
      .fillColor(dark)
      .font("Helvetica-Bold")
      .text(formatEuroAmount(subtotalExclVat), summaryX + 126, summaryY + 16, {
        width: 78,
        align: "right",
      });

    doc.fillColor(muted).font("Helvetica").fontSize(10);
    doc.text("BTW 6%", summaryX + 16, summaryY + 40, { width: 110 });
    doc.fillColor(dark).font("Helvetica-Bold").text(formatEuroAmount(vatAmount), summaryX + 126, summaryY + 40, {
      width: 78,
      align: "right",
    });

    doc
      .strokeColor(border)
      .moveTo(summaryX + 16, summaryY + 64)
      .lineTo(summaryX + summaryWidth - 16, summaryY + 64)
      .stroke();

    doc.fillColor(dark).font("Helvetica-Bold").fontSize(11);
    doc.text("Totaal incl. BTW", summaryX + 16, summaryY + 74, { width: 110 });
    doc.text(formatEuroAmount(totalInclVat), summaryX + 126, summaryY + 74, {
      width: 78,
      align: "right",
    });

    const statusY = summaryY + 132;

    doc
      .roundedRect(left, statusY, 120, 30, 15)
      .fillAndStroke("#ECFDF3", "#A6F4C5");
    doc
      .fillColor(green)
      .font("Helvetica-Bold")
      .fontSize(12)
      .text("BETAALD", left, statusY + 9, {
        width: 120,
        align: "center",
      });

    doc
      .fillColor(muted)
      .font("Helvetica")
      .fontSize(10)
      .text(`Bedankt voor je aankoop. Voor vragen: ${siteConfig.email}`, left, doc.page.height - 72, {
        width: contentWidth,
        align: "center",
      });

    doc.end();
  });
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
      const invoiceBuffer = await generateInvoicePdf({
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
