import { createReadStream, existsSync } from "node:fs";
import { stat } from "node:fs/promises";
import path from "node:path";
import { Readable } from "node:stream";
import { NextResponse } from "next/server";
import { verifyDownloadToken } from "@/lib/download-links";

export const runtime = "nodejs";

function createForbiddenResponse() {
  return NextResponse.json(
    { message: "Deze downloadlink is ongeldig of verlopen." },
    { status: 403 },
  );
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug")?.trim();
    const email = searchParams.get("email")?.trim();
    const expiresRaw = searchParams.get("expires")?.trim();
    const token = searchParams.get("token")?.trim();

    if (!slug || !email || !expiresRaw || !token) {
      return createForbiddenResponse();
    }

    const expires = Number(expiresRaw);

    if (!Number.isFinite(expires)) {
      return createForbiddenResponse();
    }

    const isValid = verifyDownloadToken({
      slug,
      email,
      expires,
      token,
    });

    if (!isValid) {
      return createForbiddenResponse();
    }

    const filePath = path.join(process.cwd(), "public", "downloads", `${slug}.pdf`);

    if (!existsSync(filePath)) {
      return NextResponse.json(
        { message: "Het ebookbestand werd niet gevonden." },
        { status: 404 },
      );
    }

    const fileStats = await stat(filePath);
    const fileStream = createReadStream(filePath);
    const webStream = Readable.toWeb(fileStream) as ReadableStream<Uint8Array>;

    return new NextResponse(webStream, {
      headers: {
        "Content-Type": "application/pdf",
        "content-length": String(fileStats.size),
        "Content-Disposition": `attachment; filename="${slug}.pdf"`,
        "cache-control": "private, max-age=0, must-revalidate",
      },
    });
  } catch (error) {
    console.error("Download route error:", error);

    return NextResponse.json(
      { message: "De download kon niet worden gestart." },
      { status: 500 },
    );
  }
}
