import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Tony's Bracket 2026",
    short_name: "Tony's Bracket",
    description:
      "March Madness bracket tournament ran by Tony the OpenClaw agent. Join now!",
    start_url: "/",
    display: "standalone",
    background_color: "#0d0d0d",
    theme_color: "#0d0d0d",
    icons: [
      {
        src: "/images/dunk.png",
        sizes: "280x280",
        type: "image/png",
      },
    ],
  };
}
