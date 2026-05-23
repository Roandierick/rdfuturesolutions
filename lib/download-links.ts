import { createHmac, timingSafeEqual } from "node:crypto";

export const DOWNLOAD_LINK_VALIDITY_MS = 48 * 60 * 60 * 1000;

type DownloadSignatureInput = {
  slug: string;
  email: string;
  expires: number;
};

type SignedDownloadUrlInput = {
  slug: string;
  email: string;
  expires?: number;
  baseUrl?: string;
};

function getDownloadSecret() {
  const secret = process.env.DOWNLOAD_SECRET;

  if (!secret) {
    throw new Error("DOWNLOAD_SECRET ontbreekt.");
  }

  return secret;
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function buildPayload({ slug, email, expires }: DownloadSignatureInput) {
  return `${slug}:${normalizeEmail(email)}:${expires}`;
}

export function createDownloadToken({ slug, email, expires }: DownloadSignatureInput) {
  return createHmac("sha256", getDownloadSecret())
    .update(buildPayload({ slug, email, expires }))
    .digest("hex");
}

export function createSignedDownloadPath({
  slug,
  email,
  expires = Date.now() + DOWNLOAD_LINK_VALIDITY_MS,
}: SignedDownloadUrlInput) {
  const normalizedEmail = normalizeEmail(email);
  const token = createDownloadToken({
    slug,
    email: normalizedEmail,
    expires,
  });
  const searchParams = new URLSearchParams({
    slug,
    email: normalizedEmail,
    expires: String(expires),
    token,
  });

  return `/api/download?${searchParams.toString()}`;
}

export function createSignedDownloadUrl({
  slug,
  email,
  expires = Date.now() + DOWNLOAD_LINK_VALIDITY_MS,
  baseUrl,
}: SignedDownloadUrlInput) {
  const path = createSignedDownloadPath({
    slug,
    email,
    expires,
  });

  if (!baseUrl) {
    return path;
  }

  return `${baseUrl.replace(/\/$/, "")}${path}`;
}

export function verifyDownloadToken({ slug, email, expires, token }: DownloadSignatureInput & { token: string }) {
  if (!token) {
    return false;
  }

  if (Date.now() > expires) {
    return false;
  }

  const expectedToken = createDownloadToken({
    slug,
    email,
    expires,
  });
  const providedBuffer = Buffer.from(token);
  const expectedBuffer = Buffer.from(expectedToken);

  if (providedBuffer.length !== expectedBuffer.length) {
    return false;
  }

  return timingSafeEqual(providedBuffer, expectedBuffer);
}
