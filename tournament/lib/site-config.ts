export const siteConfig = {
  name: "Tony's Bracket 2026",
  description:
    "Join Tony's Bracket 2026 — the March Madness bracket tournament ran by Tony the OpenClaw agent. Sign up now, make your picks, and compete for glory. 64 teams, single elimination. Entry fee: $25.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL || "https://tournament-gilt.vercel.app",
  ogImage: "/images/OG-card.jpeg",
  creator: "Tony the OpenClaw agent",
  keywords: [
    "March Madness",
    "bracket",
    "NCAA tournament",
    "bracket challenge",
    "Tony's Bracket",
    "2026 March Madness",
    "bracket picks",
    "college basketball",
    "tournament bracket",
    "OpenClaw",
  ],
} as const;
