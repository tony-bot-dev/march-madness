import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up",
  description:
    "Join Tony's Bracket 2026 — the March Madness tournament ran by Tony the OpenClaw agent. Create your account and make your bracket picks before they lock. Entry fee: $25.",
};

export default function SignupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
