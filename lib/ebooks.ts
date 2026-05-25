export type Ebook = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  price: number;
  pages: number;
  topics: string[];
  badge?: string;
};

export const ebooks = [
  {
    slug: "ai-voor-de-vakman",
    title: "AI voor de Vakman",
    subtitle: "Meer tijd, meer klanten, minder gedoe",
    description:
      "De praktische gids voor bakkers, loodgieters, elektriciens en andere ambachtslieden die AI willen gebruiken om hun bedrijf slimmer te runnen.",
    price: 11.99,
    pages: 48,
    topics: [
      "Professionele website",
      "Slimme agenda",
      "AI in je mailverkeer",
      "Chatbot op je website",
      "Marketing automatiseren",
      "Administratie met AI",
    ],
    badge: "Nieuw",
  },
] satisfies Ebook[];

export function getEbookBySlug(slug: string) {
  return ebooks.find((ebook) => ebook.slug === slug);
}

export function formatEbookPrice(price: number) {
  return `€${price.toFixed(2).replace(".", ",")}`;
}
