"use client";

import React from "react";
import { motion } from "framer-motion";
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
        
        {/* Crisp Eyebrow Badge with subtle pulse */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="flex justify-center mb-6"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-blue-200/80 bg-blue-50 text-blue-700 text-xs font-semibold shadow-xs hover:border-blue-300 transition-colors">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
            </span>
            <span>{heroData?.badgeText || "Websites • AI Chatbots • Social Media Ads"}</span>
          </div>
        </motion.div>

        {/* Main Headline & Intro */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-4xl mx-auto mb-10"
        >
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

          {/* Action Buttons with subtle hover lift */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="#contact"
              className="w-full sm:w-auto px-6 py-3 rounded-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 shadow-sm flex items-center justify-center gap-2 text-sm sm:text-base active:scale-[0.99]"
            >
              <span>{heroData?.primaryCta || "Get Your Free Growth Audit"}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>

            <a
              href="#services"
              className="w-full sm:w-auto px-6 py-3 rounded-lg font-semibold text-slate-700 bg-white hover:bg-slate-50 hover:border-slate-400 hover:-translate-y-0.5 transition-all duration-200 border border-slate-300 shadow-xs flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              <span>See How We Help</span>
            </a>
          </div>
        </motion.div>

        {/* Clean Growth Graphic with subtle fade-up */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          className="mt-6"
        >
          <TechGrowthGraphic />
        </motion.div>

        {/* Clear, interactive benefit pills */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 max-w-5xl mx-auto">
          {highlights.map((item: any, idx: number) => (
            <motion.div
              key={item.title || idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.25 + idx * 0.06, ease: "easeOut" }}
              className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-xs text-left hover:-translate-y-1 hover:shadow-md hover:border-blue-200 transition-all duration-200 cursor-default"
            >
              <div className="text-xs sm:text-sm font-bold text-slate-900">{item.title}</div>
              <div className="text-xs text-slate-500 mt-1 leading-relaxed">{item.desc}</div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
