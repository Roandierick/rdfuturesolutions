import type { Metadata, Viewport } from "next";
import { DM_Sans, JetBrains_Mono, Playfair_Display } from "next/font/google";
import DotGridTrail from "@/components/DotGridTrail";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "700"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"],
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400"],
});

const rootDescription =
  "RD Future Solutions bouwt professionele websites, apps, software en AI-integraties op maat voor KMO's en zelfstandigen in Vlaanderen. Gevestigd in Diest, actief in heel Vlaanderen.";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: "RD Future Solutions | Websites, apps en software op maat in Vlaanderen",
    template: "%s | RD Future Solutions",
  },
  description: rootDescription,
  keywords: siteConfig.keywords,
  applicationName: siteConfig.name,
  verification: {
    google: "tP-vpRH9Cr2QZbLbwvusSC7SctmulV9FSCrD6IIpBlw",
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "RD Future Solutions | Websites, apps en software op maat in Vlaanderen",
    description: rootDescription,
    url: "/",
    siteName: siteConfig.name,
    locale: "nl_BE",
    type: "website",
    images: [
      {
        url: `${siteConfig.siteUrl}/og-image.svg`,
        width: 1200,
        height: 630,
        alt: "RD Future Solutions - websites, apps en software op maat in Vlaanderen",
      },
    ],
  },
  icons: {
    icon: "/favicon.ico",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl-BE">
      <body
        className={`${playfairDisplay.variable} ${dmSans.variable} ${jetBrainsMono.variable}`}
      >
        <DotGridTrail />
        <div className="relative z-[1] flex min-h-screen flex-col overflow-x-clip">
          <SiteHeader />
          <main className="relative z-[1] flex-1 overflow-x-clip pt-24 md:pt-28">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
