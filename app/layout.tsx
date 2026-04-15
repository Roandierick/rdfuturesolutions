import type { Metadata } from "next";
import type { Viewport } from "next";
import { DM_Sans, Syne } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["600", "700"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: "RD Future Solutions | Websites, apps en software op maat in Vlaanderen",
    template: "%s | RD Future Solutions",
  },
  description: siteConfig.description,
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
    description: siteConfig.description,
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
      <body className={`${syne.variable} ${dmSans.variable} antialiased`}>
        <div className="relative flex min-h-screen flex-col bg-[var(--rd-bg)]">
          <SiteHeader />
          <main className="flex-1 pt-24">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
