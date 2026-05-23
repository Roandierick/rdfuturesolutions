import { NextResponse } from "next/server";
import { google } from "googleapis";
import { Resend } from "resend";
import { siteConfig } from "@/lib/site";

export const runtime = "nodejs";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const TIME_ZONE = "Europe/Brussels";
const LOOKAHEAD_DAYS = 14;
const SLOT_DURATION_MINUTES = 60;
const SLOT_COUNT = 3;
const WORKDAY_START_HOUR = 9;
const WORKDAY_END_HOUR = 17;
const INTERNAL_EMAIL = "dierick.roan@gmail.com";
const FROM_EMAIL = "RD Future Solutions <onboarding@resend.dev>";
const ANTHROPIC_MODEL = "claude-sonnet-4-20250514";

type ContactPayload = {
  naam?: string;
  email?: string;
  telefoon?: string;
  typeProject?: string;
  dienst?: string;
  bedrijfsnaam?: string;
  locatie?: string;
  budget?: string;
  omschrijving?: string;
};

type ContactData = {
  naam: string;
  email: string;
  telefoon: string;
  dienst: string;
  bedrijfsnaam: string;
  locatie: string;
  omschrijving: string;
};

type LocalDate = {
  year: number;
  month: number;
  day: number;
};

type BusyInterval = {
  startMs: number;
  endMs: number;
};

type TimeSlot = {
  start: Date;
  end: Date;
  display: string;
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function normalizeMultiline(value?: string) {
  if (!value) {
    return "Niet ingevuld";
  }

  return escapeHtml(value).replace(/\n/g, "<br />");
}

function buildRow(label: string, value?: string, allowHtml = false) {
  return `
    <div style="padding: 10px 0; border-bottom: 1px solid #E2E7F5;">
      <div style="color: #7A87A8; font-size: 13px; margin-bottom: 4px;">${escapeHtml(label)}</div>
      <div style="color: #0F1526; font-size: 15px; line-height: 1.7; word-break: break-word;">
        ${value ? (allowHtml ? value : normalizeMultiline(value)) : "Niet ingevuld"}
      </div>
    </div>
  `;
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
      <div style="max-width: 680px; width: 100%; box-sizing: border-box; margin: 0 auto; background: #FFFFFF; border: 1px solid #E2E7F5; border-radius: 16px; overflow: hidden;">
        <div style="background: linear-gradient(135deg, #00C8FF 0%, #2952CC 50%, #7B35E8 100%); padding: 20px 20px; color: white;">
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

function buildParagraphsHtml(text: string) {
  const normalized = text.replace(/\r\n/g, "\n").trim().replace(/^["']|["']$/g, "");
  const paragraphs = normalized.split(/\n\s*\n/).filter(Boolean);

  if (paragraphs.length === 0) {
    return "";
  }

  return paragraphs
    .map(
      (paragraph) => `
        <p style="margin: 0 0 16px; color: #3D4A6B; font-size: 15px; line-height: 1.8;">
          ${escapeHtml(paragraph).replace(/\n/g, "<br />")}
        </p>
      `,
    )
    .join("");
}

function capitalize(value: string) {
  if (!value) {
    return value;
  }

  return value.charAt(0).toUpperCase() + value.slice(1);
}

function getTimeZoneParts(date: Date, timeZone: string) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);

  const values = Object.fromEntries(
    parts
      .filter((part) => part.type !== "literal")
      .map((part) => [part.type, part.value]),
  ) as Record<string, string>;

  return {
    year: Number(values.year),
    month: Number(values.month),
    day: Number(values.day),
    hour: Number(values.hour),
    minute: Number(values.minute),
    second: Number(values.second),
  };
}

function getCurrentLocalDate(timeZone: string): LocalDate {
  const parts = getTimeZoneParts(new Date(), timeZone);

  return {
    year: parts.year,
    month: parts.month,
    day: parts.day,
  };
}

function addDaysToLocalDate(localDate: LocalDate, days: number): LocalDate {
  const date = new Date(Date.UTC(localDate.year, localDate.month - 1, localDate.day + days));

  return {
    year: date.getUTCFullYear(),
    month: date.getUTCMonth() + 1,
    day: date.getUTCDate(),
  };
}

function makeDateInTimeZone(
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number,
  timeZone: string,
) {
  const utcGuess = new Date(Date.UTC(year, month - 1, day, hour, minute, 0));
  const localParts = getTimeZoneParts(utcGuess, timeZone);
  const guessAsLocalMs = Date.UTC(
    localParts.year,
    localParts.month - 1,
    localParts.day,
    localParts.hour,
    localParts.minute,
    localParts.second,
  );
  const desiredLocalMs = Date.UTC(year, month - 1, day, hour, minute, 0);

  return new Date(utcGuess.getTime() - (guessAsLocalMs - desiredLocalMs));
}

function isWeekday(localDate: LocalDate) {
  const midday = makeDateInTimeZone(
    localDate.year,
    localDate.month,
    localDate.day,
    12,
    0,
    TIME_ZONE,
  );
  const weekday = new Intl.DateTimeFormat("en-US", {
    timeZone: TIME_ZONE,
    weekday: "short",
  }).format(midday);

  return weekday !== "Sat" && weekday !== "Sun";
}

function formatSlotForDisplay(start: Date, end: Date) {
  const startLabel = new Intl.DateTimeFormat("nl-BE", {
    timeZone: TIME_ZONE,
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).format(start);

  const endLabel = new Intl.DateTimeFormat("nl-BE", {
    timeZone: TIME_ZONE,
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).format(end);

  return `${capitalize(startLabel)} tot ${endLabel}`;
}

function slotOverlapsBusyInterval(start: Date, end: Date, busyIntervals: BusyInterval[]) {
  const startMs = start.getTime();
  const endMs = end.getTime();

  return busyIntervals.some(
    (interval) => startMs < interval.endMs && endMs > interval.startMs,
  );
}

function parseGoogleEventBoundary(value: string, isDateOnly: boolean) {
  if (!isDateOnly) {
    return new Date(value);
  }

  const [year, month, day] = value.split("-").map(Number);
  return makeDateInTimeZone(year, month, day, 0, 0, TIME_ZONE);
}

async function getAvailableSlots() {
  const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");
  const calendarId = process.env.GOOGLE_CALENDAR_ID;

  if (!serviceAccountEmail || !privateKey || !calendarId) {
    throw new Error("Google Calendar configuratie ontbreekt.");
  }

  const auth = new google.auth.JWT({
    email: serviceAccountEmail,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/calendar.readonly"],
  });

  await auth.authorize();

  const calendar = google.calendar({
    version: "v3",
    auth,
  });

  const now = new Date();
  const rangeEnd = new Date(now.getTime() + LOOKAHEAD_DAYS * 24 * 60 * 60 * 1000);
  const eventsResponse = await calendar.events.list({
    calendarId,
    singleEvents: true,
    orderBy: "startTime",
    timeMin: now.toISOString(),
    timeMax: rangeEnd.toISOString(),
    maxResults: 2500,
  });

  const busyIntervals: BusyInterval[] = (eventsResponse.data.items ?? [])
    .filter((event) => event.status !== "cancelled" && event.start && event.end)
    .map((event) => {
      const startValue = event.start?.dateTime ?? event.start?.date;
      const endValue = event.end?.dateTime ?? event.end?.date;

      if (!startValue || !endValue) {
        return null;
      }

      const isDateOnly = !event.start?.dateTime || !event.end?.dateTime;
      const start = parseGoogleEventBoundary(startValue, isDateOnly);
      const end = parseGoogleEventBoundary(endValue, isDateOnly);

      return {
        startMs: start.getTime(),
        endMs: end.getTime(),
      };
    })
    .filter((interval): interval is BusyInterval => Boolean(interval));

  const firstLocalDate = getCurrentLocalDate(TIME_ZONE);
  const slots: TimeSlot[] = [];

  for (let dayOffset = 0; dayOffset < LOOKAHEAD_DAYS && slots.length < SLOT_COUNT; dayOffset += 1) {
    const localDate = addDaysToLocalDate(firstLocalDate, dayOffset);

    if (!isWeekday(localDate)) {
      continue;
    }

    for (
      let hour = WORKDAY_START_HOUR;
      hour < WORKDAY_END_HOUR && slots.length < SLOT_COUNT;
      hour += 1
    ) {
      const slotStart = makeDateInTimeZone(
        localDate.year,
        localDate.month,
        localDate.day,
        hour,
        0,
        TIME_ZONE,
      );
      const slotEnd = new Date(slotStart.getTime() + SLOT_DURATION_MINUTES * 60 * 1000);

      if (slotStart <= now || slotEnd > rangeEnd) {
        continue;
      }

      if (slotOverlapsBusyInterval(slotStart, slotEnd, busyIntervals)) {
        continue;
      }

      slots.push({
        start: slotStart,
        end: slotEnd,
        display: formatSlotForDisplay(slotStart, slotEnd),
      });
    }
  }

  if (slots.length < SLOT_COUNT) {
    throw new Error("Er zijn onvoldoende vrije tijdsslots gevonden in de komende 14 dagen.");
  }

  return slots;
}

async function generateAnthropicConfirmationText({
  naam,
  dienst,
  slots,
}: {
  naam: string;
  dienst: string;
  slots: TimeSlot[];
}) {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    throw new Error("Anthropic configuratie ontbreekt.");
  }

  const slotSummary = slots
    .map((slot, index) => `${index + 1}. ${slot.display}`)
    .join("\n");

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: ANTHROPIC_MODEL,
      max_tokens: 500,
      temperature: 0.4,
      system:
        "Je schrijft voor RD Future Solutions. Je toon is professioneel, persoonlijk en no-nonsense. Je schrijft helder Nederlands voor Belgische ondernemers.",
      messages: [
        {
          role: "user",
          content: `
Schrijf een korte persoonlijke bevestigingsmail in het Nederlands voor deze websiteaanvraag.

Naam klant: ${naam}
Dienst of projecttype: ${dienst}
Voorgestelde tijdsslots:
${slotSummary}

Vereisten:
- Spreek de klant rechtstreeks aan.
- Vermeld dat Roan persoonlijk bij de klant ter plaatse komt voor het gesprek.
- Vraag de klant om per reply op deze mail of via ${siteConfig.email} één van de drie slots te bevestigen.
- Verwerk de gekozen dienst op een natuurlijke manier.
- Houd het professioneel, persoonlijk en no-nonsense.
- Geef uitsluitend de mailbody als platte tekst.
- Geen onderwerpregel.
- Geen markdown.
- Geen opsommingstekens.
          `.trim(),
        },
      ],
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Anthropic request mislukt (${response.status}): ${errorText}`);
  }

  const data = (await response.json()) as {
    content?: Array<{
      type?: string;
      text?: string;
    }>;
  };

  const text = (data.content ?? [])
    .filter((part) => part.type === "text" && part.text)
    .map((part) => part.text?.trim() ?? "")
    .join("\n\n")
    .trim();

  if (!text) {
    throw new Error("Anthropic gaf geen bruikbare mailtekst terug.");
  }

  return text;
}

function buildSlotListHtml(slots: TimeSlot[]) {
  return `
    <div style="margin: 24px 0; padding: 20px; background: #F8FAFF; border: 1px solid #E2E7F5; border-radius: 14px;">
      <p style="margin: 0 0 16px; color: #0F1526; font-size: 15px; font-weight: 700;">
        Voorgestelde momenten
      </p>
      ${slots
        .map(
          (slot, index) => `
            <div style="padding: 14px 16px; border-radius: 12px; background: #FFFFFF; border: 1px solid #E2E7F5; ${index > 0 ? "margin-top: 10px;" : ""}">
              <p style="margin: 0 0 4px; color: #2952CC; font-size: 13px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase;">
                Optie ${index + 1}
              </p>
              <p style="margin: 0; color: #0F1526; font-size: 15px; line-height: 1.7; word-break: break-word;">
                ${escapeHtml(slot.display)}
              </p>
            </div>
          `,
        )
        .join("")}
    </div>
  `;
}

function buildContactDetailsHtml() {
  return `
    <div style="margin-top: 28px; padding-top: 20px; border-top: 1px solid #E2E7F5;">
      <p style="margin: 0 0 8px; color: #0F1526; font-size: 15px; font-weight: 700;">
        RD Future Solutions
      </p>
      <p style="margin: 0; color: #3D4A6B; font-size: 14px; line-height: 1.8; word-break: break-word;">
        ${escapeHtml(siteConfig.email)}<br />
        ${escapeHtml(siteConfig.phoneDisplay)}<br />
        ${escapeHtml(siteConfig.addressDisplay)}
      </p>
    </div>
  `;
}

function buildFallbackConfirmationText(naam: string, dienst: string) {
  return [
    `Dag ${naam},`,
    "",
    `Bedankt voor je aanvraag rond ${dienst}. We hebben je bericht goed ontvangen.`,
    "",
    "Wij nemen zo snel mogelijk contact met je op om een geschikt moment voor het gesprek vast te leggen.",
    "",
    `Als je intussen nog iets wilt aanvullen, mag je gewoon antwoorden op deze mail of mailen naar ${siteConfig.email}.`,
  ].join("\n");
}

async function processContactForm(data: ContactData) {
  if (!resend) {
    console.error("Contact route background error: RESEND_API_KEY ontbreekt.");
    return;
  }

  let suggestedSlots: TimeSlot[] = [];
  let customerMailText = "";
  let includeSlotsInCustomerMail = false;
  let planningNote =
    "Roan neemt persoonlijk contact op om een geschikt moment voor het gesprek vast te leggen.";

  try {
    suggestedSlots = await getAvailableSlots();
    customerMailText = await generateAnthropicConfirmationText({
      naam: data.naam,
      dienst: data.dienst,
      slots: suggestedSlots,
    });
    includeSlotsInCustomerMail = true;
    planningNote = suggestedSlots
      .map((slot, index) => `Optie ${index + 1}: ${slot.display}`)
      .join("\n");
  } catch (error) {
    console.error("Contact route planning fallback:", error);
    customerMailText = buildFallbackConfirmationText(data.naam, data.dienst);
    includeSlotsInCustomerMail = false;
    suggestedSlots = [];
  }

  const internalSubject = `Nieuwe aanvraag — ${data.naam} | ${data.dienst}`;
  const internalIntroHtml = `
    <p style="margin: 0 0 20px; color: #3D4A6B; font-size: 15px; line-height: 1.8;">
      Er is een nieuwe aanvraag binnengekomen via het contactformulier van RD Future Solutions.
    </p>
  `;
  const internalRowsHtml = `
    <div style="width: 100%;">
      ${buildRow("Naam", data.naam)}
      ${buildRow("E-mailadres", data.email)}
      ${buildRow("Telefoonnummer", data.telefoon)}
      ${buildRow("Bedrijf", data.bedrijfsnaam)}
      ${buildRow("Locatie / gemeente", data.locatie)}
      ${buildRow("Dienst", data.dienst)}
      ${buildRow("Projectomschrijving", data.omschrijving)}
      ${buildRow("Afspraakvoorstel", planningNote)}
    </div>
  `;
  const internalHtml = buildEmailLayout({
    title: "Nieuwe lead via de website",
    introHtml: internalIntroHtml,
    contentHtml: internalRowsHtml,
  });

  const customerSubject = "We hebben je aanvraag goed ontvangen — RD Future Solutions";
  const customerIntroHtml = buildParagraphsHtml(customerMailText);
  const customerRowsHtml = `
    <div style="width: 100%; margin-top: 8px;">
      ${buildRow("Naam", data.naam)}
      ${buildRow("Bedrijf", data.bedrijfsnaam)}
      ${buildRow("Locatie / gemeente", data.locatie)}
      ${buildRow("Dienst", data.dienst)}
      ${buildRow("E-mailadres", data.email)}
      ${buildRow("Telefoonnummer", data.telefoon)}
    </div>
  `;
  const customerFollowUpHtml = includeSlotsInCustomerMail
    ? `
        ${buildSlotListHtml(suggestedSlots)}
        <p style="margin: 0; color: #3D4A6B; font-size: 15px; line-height: 1.8;">
          Bevestig gerust één van deze momenten door simpelweg te antwoorden op deze mail of te mailen naar
          <a href="mailto:${escapeHtml(siteConfig.email)}" style="color: #2952CC; text-decoration: none;"> ${escapeHtml(siteConfig.email)}</a>.
        </p>
      `
    : `
        <div style="margin: 24px 0; padding: 20px; background: #F8FAFF; border: 1px solid #E2E7F5; border-radius: 14px;">
          <p style="margin: 0; color: #3D4A6B; font-size: 15px; line-height: 1.8;">
            Roan neemt zelf contact met je op om samen een geschikt moment vast te leggen voor het gesprek.
          </p>
        </div>
      `;
  const customerHtml = buildEmailLayout({
    title: "Bevestiging van je aanvraag",
    introHtml: customerIntroHtml,
    contentHtml: `
      ${customerRowsHtml}
      ${customerFollowUpHtml}
      ${buildContactDetailsHtml()}
    `,
  });

  const sendResults = await Promise.allSettled([
    resend.emails.send({
      from: FROM_EMAIL,
      to: INTERNAL_EMAIL,
      replyTo: data.email,
      subject: internalSubject,
      html: internalHtml,
    }),
    resend.emails.send({
      from: FROM_EMAIL,
      to: data.email,
      replyTo: siteConfig.email,
      subject: customerSubject,
      html: customerHtml,
    }),
  ]);

  const hasFailedSend = sendResults.some((result) => {
    if (result.status === "rejected") {
      return true;
    }

    return Boolean(result.value.error);
  });

  if (hasFailedSend) {
    throw new Error(`Contact route email send failure: ${JSON.stringify(sendResults)}`);
  }
}

function startContactFormProcessing(data: ContactData) {
  setTimeout(() => {
    void processContactForm(data).catch((error) => {
      console.error("Contact route background error:", error);
    });
  }, 0);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactPayload;
    const naam = body.naam?.trim();
    const email = body.email?.trim();
    const telefoon = body.telefoon?.trim() ?? "";
    const dienst = body.dienst?.trim() || body.typeProject?.trim() || "Nog niet zeker";
    const bedrijfsnaam = body.bedrijfsnaam?.trim() ?? "";
    const locatie = body.locatie?.trim();
    const omschrijving = body.omschrijving?.trim();

    if (!naam || !email || !locatie || !omschrijving) {
      return NextResponse.json(
        { message: "Vul minstens naam, e-mailadres, locatie en projectomschrijving in." },
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

    startContactFormProcessing({
      naam,
      email,
      telefoon,
      dienst,
      bedrijfsnaam,
      locatie,
      omschrijving,
    });

    return NextResponse.json({
      message: "Bedankt! We nemen zo snel mogelijk contact met je op.",
    });
  } catch (error) {
    console.error("Contact route unexpected error:", error);

    return NextResponse.json(
      { message: "Er ging iets mis. Probeer het opnieuw of mail ons rechtstreeks." },
      { status: 500 },
    );
  }
}
