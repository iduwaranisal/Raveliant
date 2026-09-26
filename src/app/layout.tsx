import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import {
  OrganizationSchema,
  WebSiteSchema,
  ProfessionalServiceSchema,
} from "@/components/seo/JsonLd";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#2563eb",
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://raveliant.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Raveliant Digital Solutions | AI, Software & Growth Agency",
    template: "%s | Raveliant Digital Solutions",
  },
  description:
    "We Don't Just Build Software. We Scale Businesses. High-performance Next.js websites, intelligent 24/7 AI chatbots, and targeted social media marketing engineered for exponential business growth.",
  keywords: [
    "Raveliant",
    "Raveliant Digital Solutions",
    "Digital Growth Agency",
    "Custom Software Engineering",
    "Next.js Web Development",
    "AI Chatbots for Business",
    "AI Automation Agency",
    "Social Media Marketing Agency",
    "Paid Advertising Meta TikTok",
    "Customer Acquisition Agency",
    "High Converting Websites",
    "Business Automation Services",
    "Lead Generation Systems",
    "Full Stack Web Agency",
    "AI Customer Service Automation",
  ],
  authors: [{ name: "Raveliant Digital Solutions", url: siteUrl }],
  creator: "Raveliant Digital Solutions",
  publisher: "Raveliant Digital Solutions",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: [
      { url: "/logo.jpg", sizes: "any" },
      { url: "/icon.jpg", type: "image/jpeg" },
      { url: "/favicon.ico", sizes: "32x32" },
    ],
    apple: [{ url: "/logo.jpg", sizes: "180x180", type: "image/jpeg" }],
    shortcut: "/logo.jpg",
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Raveliant Digital Solutions",
    title: "Raveliant Digital Solutions | AI, Software & Growth Agency",
    description:
      "Modern websites, intelligent 24/7 AI chatbots, and targeted social media ads engineered to scale your business and multiply customer inquiries.",
    images: [
      {
        url: "/logo.jpg",
        width: 1024,
        height: 1024,
        alt: "Raveliant Digital Solutions - AI, Software & Growth Agency",
        type: "image/jpeg",
      },
      {
        url: "/images/hero_showcase.jpg",
        width: 1200,
        height: 630,
        alt: "Raveliant Digital Solutions Showcase",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Raveliant Digital Solutions | AI, Software & Growth Agency",
    description:
      "High-performance Next.js websites, intelligent 24/7 AI chatbots, and targeted social media marketing engineered for exponential business growth.",
    images: ["/logo.jpg"],
    creator: "@raveliant",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "technology",
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
        <OrganizationSchema />
        <WebSiteSchema />
        <ProfessionalServiceSchema />
      </head>
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased font-sans selection:bg-blue-600 selection:text-white relative">
        {children}
      </body>
    </html>
  );
}
