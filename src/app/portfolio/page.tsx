import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Sparkles, Layers, ShieldCheck } from "lucide-react";
import { Navbar } from "@/components/ui/Navbar";
import { Portfolio } from "@/components/sections/Portfolio";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/ui/Footer";
import { getSiteContent } from "@/actions/contentActions";
import { getProjects } from "@/actions/portfolioActions";
import { BreadcrumbSchema } from "@/components/seo/JsonLd";

export const dynamic = "force-dynamic";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://raveliant.com";

export const metadata: Metadata = {
  title: "Client Portfolio & Web Systems",
  description:
    "Explore our complete showcase of fast modern websites, intelligent conversational AI chatbots, and high-converting client acquisition funnels engineered by Raveliant.",
  alternates: {
    canonical: `${siteUrl}/portfolio`,
  },
  openGraph: {
    title: "Client Portfolio & Web Systems | Raveliant Digital Solutions",
    description:
      "Explore our complete showcase of fast modern websites, intelligent conversational AI chatbots, and high-converting client acquisition funnels engineered by Raveliant.",
    url: `${siteUrl}/portfolio`,
    type: "website",
    images: [
      {
        url: "/logo.jpg",
        width: 1024,
        height: 1024,
        alt: "Raveliant Digital Solutions Portfolio Showcase",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Client Portfolio & Web Systems | Raveliant Digital Solutions",
    description:
      "Explore high-converting modern websites, intelligent AI chatbots, and customer acquisition campaigns engineered to scale businesses.",
    images: ["/logo.jpg"],
  },
};

export default async function PortfolioPage() {
  const [contentRes, projectsRes] = await Promise.all([
    getSiteContent(),
    getProjects(),
  ]);

  const content = contentRes?.data || {};
  const projects = Array.isArray(projectsRes?.data) ? projectsRes.data : [];

  const whatsappNumber = content.siteSettings?.whatsappNumber || "0704692220";
  const contactEmail = content.siteSettings?.contactEmail || "raveliantcontact@gmail.com";

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col selection:bg-blue-600 selection:text-white">
      {/* Search Engine Breadcrumb Schema */}
      <BreadcrumbSchema
        items={[
          { name: "Home", url: siteUrl },
          { name: "Portfolio", url: `${siteUrl}/portfolio` },
        ]}
      />

      {/* Sticky Navbar */}
      <Navbar />

      <main className="flex-1 pt-24 sm:pt-28">
        {/* Dedicated Page Hero Header */}
        <section className="relative py-14 sm:py-20 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Back link */}
            <div className="mb-6">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Home</span>
              </Link>
            </div>

            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-blue-200 bg-blue-50 text-blue-700 text-xs font-semibold mb-4">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>COMPLETE PROJECT SHOWCASE</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                All Client Projects &amp; Digital Solutions
              </h1>

              <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
                Explore our full archive of fast web platforms, conversational AI chatbots, and
                targeted social ad funnels. Every build is customized to turn visitors into paying clients.
              </p>

              {/* Factual Highlights */}
              <div className="mt-8 flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm font-semibold text-slate-700">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-blue-600" />
                  <span>{projects.length}+ Live Client Systems</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                  <span>100% Production Ready</span>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Full Portfolio Grid (All items, with categories) */}
        <Portfolio initialProjects={projects} limit={undefined} showViewAll={false} />

        {/* Contact & Consultation Section */}
        <Contact whatsappNumber={whatsappNumber} contactEmail={contactEmail} />
      </main>

      {/* Footer */}
      <Footer whatsappNumber={whatsappNumber} contactEmail={contactEmail} />
    </div>
  );
}
