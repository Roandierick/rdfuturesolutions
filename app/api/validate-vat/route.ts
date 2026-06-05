import { NextResponse } from "next/server";

export const runtime = "nodejs";

type ValidateVatPayload = {
  vatNumber: string;
};

function normalizeVatNumber(value: string) {
  return value.toUpperCase().replace(/[.\-\s]/g, "");
}

function decodeXmlValue(value: string) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<ValidateVatPayload>;
    const rawVatNumber = body.vatNumber?.trim() ?? "";
    const vatNumber = normalizeVatNumber(rawVatNumber);

    if (!vatNumber || !/^[A-Z]{2}[0-9]+$/.test(vatNumber)) {
      return NextResponse.json({ valid: false });
    }

    const countryCode = vatNumber.slice(0, 2);
    const vatDigits = vatNumber.slice(2);
    const soapBody = `<?xml version="1.0" encoding="UTF-8"?>
<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
  <Body>
    <checkVat xmlns="urn:ec.europa.eu:taxud:vies:services:checkVat:types">
      <countryCode>${countryCode}</countryCode>
      <vatNumber>${vatDigits}</vatNumber>
    </checkVat>
  </Body>
</Envelope>`;

    const response = await fetch(
      "https://ec.europa.eu/taxation_customs/vies/services/checkVatService",
      {
        method: "POST",
        headers: {
          "Content-Type": "text/xml; charset=UTF-8",
          Accept: "text/xml",
        },
        body: soapBody,
        cache: "no-store",
      },
    );

    const xml = await response.text();

    if (!response.ok) {
      return NextResponse.json({
        valid: false,
        error: "Validatie tijdelijk niet beschikbaar",
      });
    }

    const isValid = /<valid>\s*true\s*<\/valid>/i.test(xml);

    if (!isValid) {
      return NextResponse.json({ valid: false });
    }

    const companyNameMatch = xml.match(/<name>([\s\S]*?)<\/name>/i);
    const companyName = companyNameMatch
      ? decodeXmlValue(companyNameMatch[1].trim())
      : "";

    return NextResponse.json({
      valid: true,
      companyName,
    });
  } catch (error) {
    console.error("VAT validation error:", error);

    return NextResponse.json({
      valid: false,
      error: "Validatie tijdelijk niet beschikbaar",
    });
  }
}
