import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

type ContactPayload = {
  naam?: string;
  email?: string;
  telefoon?: string;
  typeProject?: string;
  budget?: string;
  omschrijving?: string;
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function buildRow(label: string, value?: string) {
  return `
    <tr>
      <td style="padding: 12px 0; color: #7A87A8; font-size: 14px; width: 180px; vertical-align: top;">${label}</td>
      <td style="padding: 12px 0; color: #0F1526; font-size: 15px; line-height: 1.7;">
        ${value ? escapeHtml(value).replace(/\n/g, "<br />") : "Niet ingevuld"}
      </td>
    </tr>
  `;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactPayload;
    const naam = body.naam?.trim();
    const email = body.email?.trim();
    const telefoon = body.telefoon?.trim();
    const typeProject = body.typeProject?.trim() || "Andere";
    const budget = body.budget?.trim();
    const omschrijving = body.omschrijving?.trim();

    if (!naam || !email || !omschrijving) {
      return NextResponse.json(
        { message: "Vul minstens naam, e-mailadres en projectomschrijving in." },
        { status: 400 },
      );
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      return NextResponse.json(
        { message: "Geef een geldig e-mailadres op." },
        { status: 400 },
      );
    }

    if (!resend) {
      return NextResponse.json(
        { message: "Er ging iets mis. Probeer het opnieuw of mail ons rechtstreeks." },
        { status: 500 },
      );
    }

    const subject = `Nieuwe aanvraag — ${naam} | ${typeProject}`;
    const html = `
      <div style="background: #F5F7FF; padding: 32px; font-family: Arial, Helvetica, sans-serif;">
        <div style="max-width: 680px; margin: 0 auto; background: #FFFFFF; border: 1px solid #E2E7F5; border-radius: 16px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #00C8FF 0%, #2952CC 50%, #7B35E8 100%); padding: 24px 28px; color: white;">
            <p style="margin: 0; font-size: 13px; letter-spacing: 0.08em; text-transform: uppercase;">RD Future Solutions</p>
            <h1 style="margin: 10px 0 0; font-size: 28px; line-height: 1.2;">Nieuwe lead via de website</h1>
          </div>
          <div style="padding: 28px;">
            <p style="margin: 0 0 20px; color: #3D4A6B; font-size: 15px; line-height: 1.8;">
              Er is een nieuwe aanvraag binnengekomen via het contactformulier van RD Future Solutions.
            </p>
            <table style="width: 100%; border-collapse: collapse;">
              ${buildRow("Naam", naam)}
              ${buildRow("E-mailadres", email)}
              ${buildRow("Telefoonnummer", telefoon)}
              ${buildRow("Type project", typeProject)}
              ${buildRow("Budget", budget)}
              ${buildRow("Projectomschrijving", omschrijving)}
            </table>
          </div>
        </div>
      </div>
    `;

    const { error } = await resend.emails.send({
      from: "RD Future Solutions <onboarding@resend.dev>",
      to: "dierick.roan@gmail.com",
      replyTo: email,
      subject,
      html,
    });

    if (error) {
      return NextResponse.json(
        { message: "Er ging iets mis. Probeer het opnieuw of mail ons rechtstreeks." },
        { status: 500 },
      );
    }

    return NextResponse.json({
      message: "Bedankt! We nemen zo snel mogelijk contact met je op.",
    });
  } catch {
    return NextResponse.json(
      { message: "Er ging iets mis. Probeer het opnieuw of mail ons rechtstreeks." },
      { status: 500 },
    );
  }
}
