import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Leaderboard",
  description:
    "See who's leading Tony's Bracket 2026 March Madness tournament. View scores, picks, and standings. Ran by Tony the OpenClaw agent.",
};

export default function LeaderboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
