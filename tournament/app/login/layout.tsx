import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Log In",
  description:
    "Log in to Tony's Bracket 2026 to view and edit your March Madness bracket picks. Ran by Tony the OpenClaw agent.",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
