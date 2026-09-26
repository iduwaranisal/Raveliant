import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, TrendingUp, Sparkles } from "lucide-react";
import { Navbar } from "@/components/ui/Navbar";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/ui/Footer";
import { getSiteContent } from "@/actions/contentActions";
import { BreadcrumbSchema } from "@/components/seo/JsonLd";

export const dynamic = "force-dynamic";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://raveliant.com";

export const metadata: Metadata = {
  title: "Client Case Studies & Documented ROI",
  description:
    "Explore verified client case studies, performance benchmarks, and measurable business growth achieved through Raveliant's custom websites, 24/7 AI chatbots, and ad campaigns.",
  alternates: {
    canonical: `${siteUrl}/case-studies`,
  },
  openGraph: {
    title: "Client Case Studies & Documented ROI | Raveliant Digital Solutions",
    description:
      "Explore verified client case studies, performance benchmarks, and measurable business growth achieved through Raveliant's custom websites, 24/7 AI chatbots, and ad campaigns.",
    url: `${siteUrl}/case-studies`,
    type: "website",
    images: [
      {
        url: "/logo.jpg",
        width: 1024,
        height: 1024,
        alt: "Raveliant Digital Solutions Case Studies",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Client Case Studies & Documented ROI | Raveliant Digital Solutions",
    description:
      "Real metrics, speed tests, and verified client acquisition growth engineered by Raveliant Digital Solutions.",
    images: ["/logo.jpg"],
  },
};

export default async function CaseStudiesPage() {
  const contentRes = await getSiteContent();
  const content = contentRes?.data || {};

  const whatsappNumber = content.siteSettings?.whatsappNumber || "0704692220";
  const contactEmail = content.siteSettings?.contactEmail || "raveliantcontact@gmail.com";

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col selection:bg-blue-600 selection:text-white">
      {/* Search Engine Breadcrumb Schema */}
      <BreadcrumbSchema
        items={[
          { name: "Home", url: siteUrl },
          { name: "Case Studies", url: `${siteUrl}/case-studies` },
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
                <span>VERIFIED CASE STUDIES</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Client Success Stories &amp; Documented Growth
              </h1>

              <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
                See the exact metrics, technological solutions, and client feedback from our deployments.
                We eliminate guesswork by engineering platforms that directly drive revenue and save hours every week.
              </p>

              {/* Factual Highlights */}
              <div className="mt-8 flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm font-semibold text-slate-700">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-blue-600" />
                  <span>Transparent Performance Metrics</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Real Client Feedback</span>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Complete Case Studies (All items without limit) */}
        <CaseStudies caseStudiesData={content.caseStudies} limit={undefined} showViewAll={false} />

        {/* Contact & Consultation Section */}
        <Contact whatsappNumber={whatsappNumber} contactEmail={contactEmail} />
      </main>

      {/* Footer */}
      <Footer whatsappNumber={whatsappNumber} contactEmail={contactEmail} />
    </div>
  );
}
