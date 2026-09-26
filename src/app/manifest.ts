import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Raveliant Digital Solutions",
    short_name: "Raveliant",
    description:
      "High-end software engineering, intelligent AI architectures, and data-driven social media marketing built for exponential business growth.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#2563eb",
    icons: [
      {
        src: "/logo.jpg",
        sizes: "192x192 512x512",
        type: "image/jpeg",
      },
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
