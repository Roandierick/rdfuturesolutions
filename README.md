## RD Future Solutions

Productieklaar Next.js 14-project voor RD Future Solutions, een Belgische web-, app- en softwarepartner uit Diest.

## Installatie

Installeer de dependencies:

```bash
npm install
```

Maak daarna een `.env.local` bestand aan in de projectroot:

```bash
RESEND_API_KEY=
NEXT_PUBLIC_SITE_URL=https://www.rdfs.be
```

Start de development server:

```bash
npm run dev
```

Open daarna `http://localhost:3000` in je browser.

## Builden

Voor een productiebuild:

```bash
npm run build
```

Tijdens de build worden `sitemap.xml` en `robots.txt` automatisch gegenereerd via `next-sitemap`.

## Logo en favicon

Plaats je logo als transparante PNG op:

```bash
public/logo.png
```

De navigatie en footer tonen automatisch een tekstfallback zolang het logo nog niet aanwezig is.

Voor de favicon:

```bash
public/favicon.ico
```

Gebruik bij voorkeur een favicon die gemaakt is op basis van het logo, bijvoorbeeld via `realfavicongenerator.net`.

## Resend

De contactroute gebruikt de officiële `resend` SDK. De afzender staat standaard ingesteld op `onboarding@resend.dev` voor development. Voor productie vervang je die best door een geverifieerd domein in `app/api/contact/route.ts`.

## Scripts

- `npm run dev` start de lokale development server
- `npm run build` maakt een productiebuild
- `npm run start` start de productiebuild lokaal
- `npm run lint` voert de Next.js linting uit

## Structuur

- `app/` bevat alle pagina's en de API-route
- `components/` bevat alle herbruikbare UI-componenten
- `lib/` bevat siteconfiguratie en SEO-helpers
- `public/` bevat statische assets zoals logo, favicon en OG-image
