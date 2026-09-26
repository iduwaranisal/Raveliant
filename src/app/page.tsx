import { Navbar } from "@/components/ui/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Portfolio } from "@/components/sections/Portfolio";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { Process } from "@/components/sections/Process";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/ui/Footer";
import { getSiteContent } from "@/actions/contentActions";
import { getProjects } from "@/actions/portfolioActions";

export const dynamic = "force-dynamic";

export default async function Home() {
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
      {/* Sticky Clean Navbar */}
      <Navbar />

      {/* Main Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero heroData={content.hero} />

        {/* 3 Core Services: Software, AI, Social Media Marketing */}
        <Services servicesData={content.services} />

        {/* Dynamic Project Portfolio Section - Limited to 3 on Homepage */}
        <Portfolio initialProjects={projects} limit={3} showViewAll={true} />

        {/* Why Choose Us - The Strategic Growth Partner */}
        <WhyChooseUs whyUsData={content.whyUs} />

        {/* 4-Step Proven Process */}
        <Process processData={content.process} />

        {/* Real-World Case Studies - Limited to 3 on Homepage */}
        <CaseStudies caseStudiesData={content.caseStudies} limit={3} showViewAll={true} />

        {/* Clean Contact & Free Audit Application */}
        <Contact whatsappNumber={whatsappNumber} contactEmail={contactEmail} />
      </main>

      {/* Simplified Footer */}
      <Footer whatsappNumber={whatsappNumber} contactEmail={contactEmail} />
    </div>
  );
}
