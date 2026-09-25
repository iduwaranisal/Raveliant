import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#f8fafc",
};

export const metadata: Metadata = {
  title: "Raveliant Digital Solutions | AI Architecture, Software & Growth Agency",
  description:
    "We Don't Just Build Software. We Scale Businesses. High-end software engineering, intelligent AI architectures, and data-driven Social Media Marketing built for exponential growth.",
  keywords: [
    "Raveliant",
    "Digital Growth Agency",
    "AI Architecture",
    "Custom Software Engineering",
    "Social Media Marketing",
    "Next.js Development",
    "AI Automation",
    "Scale Business",
  ],
  authors: [{ name: "Raveliant Digital Solutions" }],
  metadataBase: new URL("https://raveliant.com"),
  icons: {
    icon: [
      { url: "/logo.jpg", sizes: "any" },
      { url: "/icon.jpg", type: "image/jpeg" },
    ],
    apple: "/logo.jpg",
    shortcut: "/logo.jpg",
  },
  openGraph: {
    title: "Raveliant Digital Solutions | End-to-End Digital Growth Agency",
    description:
      "Modern websites, smart AI chatbots, and targeted social media ads engineered to scale your business.",
    images: [{ url: "/logo.jpg", width: 1024, height: 1024, alt: "Raveliant Logo" }],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jakarta.variable} ${mono.variable} scroll-smooth`}>
      <head>
        <link rel="icon" href="/logo.jpg" type="image/jpeg" />
      </head>
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased font-sans selection:bg-blue-600 selection:text-white relative">
        {children}
      </body>
    </html>
  );
}
