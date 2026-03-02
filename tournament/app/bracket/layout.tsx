import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Bracket",
  description:
    "Make your March Madness bracket picks for Tony's Bracket 2026. Choose winners for all 63 games across 6 rounds.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function BracketLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
