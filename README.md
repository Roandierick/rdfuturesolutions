## RD Future Solutions

Productieklaar Next.js 14-project voor RD Future Solutions, een Belgische web-, app- en softwarepartner uit Diest.

## Design System

De visuele laag is opgebouwd als een premium light editorial systeem:

- `Playfair Display` voor H1/H2
- `DM Sans` voor body, navigatie en CTA's
- `JetBrains Mono` voor labels, sectienummers en technische details
- Witte en lichtgrijze basis met vaste RD-kleurtokens in `app/globals.css`
- Alleen decoratieve achtergrondanimaties via CSS en `components/hero-background.tsx`
- Geen content reveal-animaties: alle tekst en UI zijn meteen zichtbaar bij het laden

Belangrijke design primitives:

- `app/globals.css` bevat spacing, kleuren, buttons, kaarten, dot-grid textuur en hero-animaties
- `components/page-hero.tsx` levert de gedeelde page hero-opbouw
- `components/site-header.tsx` bevat sticky navigatie, glass state op scroll en mobiel overlaymenu
- `components/service-accordions.tsx` en `components/faq-accordion.tsx` verzorgen de interactieve secties

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

## Resend

De contactroute gebruikt de officiële `resend` SDK. De afzender staat standaard ingesteld op `onboarding@resend.dev` voor development. Voor productie vervang je die best door een geverifieerd domein in `app/api/contact/route.ts`.

## Scripts

- `npm run dev` start de lokale development server
- `npm run build` maakt een productiebuild
- `npm run start` start de productiebuild lokaal
- `npm run lint` voert de Next.js linting uit

## Structuur

- `app/` bevat alle pagina's, globale styles en de API-route
- `components/` bevat de herbruikbare UI-componenten en interactieve secties
- `lib/` bevat siteconfiguratie en SEO-helpers
- `public/` bevat statische assets zoals logo, favicon en OG-image
