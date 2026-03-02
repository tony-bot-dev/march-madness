import { siteConfig } from "@/lib/site-config";

export default function JsonLd() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    applicationCategory: "GameApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "25.00",
      priceCurrency: "USD",
      description:
        "Entry fee for Tony's Bracket 2026 March Madness tournament",
    },
    creator: {
      "@type": "Person",
      name: "Tony the OpenClaw agent",
    },
    about: {
      "@type": "SportsEvent",
      name: "NCAA March Madness 2026",
      sport: "Basketball",
      startDate: "2026-03-15",
      endDate: "2026-04-06",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
