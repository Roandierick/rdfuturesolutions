export const siteConfig = {
  name: "RD Future Solutions",
  description:
    "Professionele websites, apps en software op maat voor KMO's en ondernemers in Vlaanderen.",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.rdfs.be",
  email: "dierick.roan@gmail.com",
  phone: "+32468414555",
  phoneDisplay: "+32 468 41 45 55",
  city: "Diest",
  region: "Vlaams-Brabant",
  country: "België",
  addressDisplay: "Diest, Vlaams-Brabant, België",
  areaServed: "Vlaanderen",
  vatId: "BE1027147747",
  kboDisplay: "1027.147.747",
  keywords: [
    "website laten maken vlaanderen",
    "website laten maken",
    "website laten maken belgie",
    "webdesign vlaanderen",
    "app laten maken vlaanderen",
    "software op maat vlaanderen",
    "webdesign diest",
    "website laten maken vlaams brabant",
  ],
};

export const navigation = [
  {
    href: "/",
    label: "Home",
    description: "Overzicht van websites, apps en software op maat in Vlaanderen.",
  },
  {
    href: "/diensten",
    label: "Diensten",
    description: "Bekijk onze diensten voor webdesign, apps en softwareontwikkeling.",
  },
  {
    href: "/prijzen",
    label: "Prijzen",
    description: "Transparante tarieven voor websites, hosting en maatwerktrajecten.",
  },
  {
    href: "/over-ons",
    label: "Over ons",
    description: "Leer Roan Dierick en het verhaal achter RD Future Solutions kennen.",
  },
  {
    href: "/contact",
    label: "Contact",
    description: "Vraag een gratis offerte aan voor jouw website, app of softwareproject.",
  },
] as const;
