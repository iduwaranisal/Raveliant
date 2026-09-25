"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { TechGrowthGraphic } from "@/components/ui/TechGrowthGraphic";

interface HeroProps {
  heroData?: any;
}

export function Hero({ heroData }: HeroProps) {
  const highlights = heroData?.highlights || [
    { title: "Fast Websites & Web Apps", desc: "Engineered to convert visitors into booked clients" },
    { title: "Intelligent AI Chatbots", desc: "Automating customer inquiries & scheduling 24/7" },
    { title: "Targeted Social Ads", desc: "Reaching high-intent clients on Meta & TikTok" },
    { title: "Measurable Results", desc: "Transparent tracking focused on actual inquiries" },
  ];

  return (
    <section className="relative pt-28 pb-16 sm:pt-36 sm:pb-20 overflow-hidden bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Crisp Eyebrow Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-blue-200/80 bg-blue-50 text-blue-700 text-xs font-semibold shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
            <span>{heroData?.badgeText || "Websites • AI Chatbots • Social Media Ads"}</span>
          </div>
        </div>

        {/* Main Headline */}
        <div className="text-center max-w-4xl mx-auto mb-10">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12]">
            {heroData?.headlineMain || "We Don't Just Build Software."}{" "}
            <span className="text-gradient-brand block mt-1 sm:mt-2">
              {heroData?.headlineGradient || "We Scale Businesses."}
            </span>
          </h1>

          <p className="mt-5 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {heroData?.subheadline ||
              "We build fast modern websites, set up smart AI chatbots that save you hours of manual work, and run social media ads that bring a steady stream of new clients directly to your business."}
          </p>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="#contact"
              className="w-full sm:w-auto px-6 py-3 rounded-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm flex items-center justify-center gap-2 text-sm sm:text-base active:scale-[0.99]"
            >
              <span>{heroData?.primaryCta || "Get Your Free Growth Audit"}</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="#services"
              className="w-full sm:w-auto px-6 py-3 rounded-lg font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 shadow-xs transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              <span>See How We Help</span>
            </a>
          </div>
        </div>

        {/* Clean Growth Graphic */}
        <div className="mt-6">
          <TechGrowthGraphic />
        </div>

        {/* Clear, simple benefit pills */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 max-w-5xl mx-auto">
          {highlights.map((item: any, idx: number) => (
            <div
              key={item.title || idx}
              className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-xs text-left"
            >
              <div className="text-xs sm:text-sm font-bold text-slate-900">{item.title}</div>
              <div className="text-xs text-slate-500 mt-1 leading-relaxed">{item.desc}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
