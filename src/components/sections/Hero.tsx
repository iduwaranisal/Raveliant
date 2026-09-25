"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { TechGrowthGraphic } from "@/components/ui/TechGrowthGraphic";

interface HeroProps {
  heroData?: any;
}

export function Hero({ heroData }: HeroProps) {
  const highlights = heroData?.highlights || [
    { title: "Fast Websites & Apps", desc: "Built to turn visitors into active clients" },
    { title: "Smart AI Chatbots", desc: "Answering questions & booking calls 24/7" },
    { title: "Social Media Ads", desc: "Reaching your ideal audience accurately" },
    { title: "Measurable Growth", desc: "We focus on verified client inquiries" },
  ];

  return (
    <section className="relative pt-32 pb-20 sm:pt-36 sm:pb-24 overflow-hidden bg-gradient-to-b from-blue-50/40 via-slate-50 to-slate-50">
      {/* Soft, calm background gradient accents - easy on the eyes */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-blue-100/50 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[300px] bg-indigo-100/40 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Simple top badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="flex justify-center mb-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-200 bg-white/90 shadow-sm backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-blue-600" />
            <span className="text-xs font-semibold text-blue-700">
              {heroData?.badgeText || "Websites • AI Chatbots • Social Media Ads"}
            </span>
          </div>
        </motion.div>

        {/* Main Headline */}
        <div className="text-center max-w-4xl mx-auto mb-10">
          <motion.h1
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="text-3xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.15]"
          >
            {heroData?.headlineMain || "We Don't Just Build Software."}{" "}
            <span className="text-gradient-cyan-purple block mt-1 sm:mt-2">
              {heroData?.headlineGradient || "We Scale Businesses."}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mt-6 text-sm sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed"
          >
            {heroData?.subheadline ||
              "We build fast modern websites, set up smart AI chatbots that save you hours of manual work, and run social media ads that bring a steady stream of new clients directly to your business."}
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5"
          >
            <a
              href="#contact"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-md shadow-blue-500/20 hover:shadow-lg flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              <Sparkles className="w-4 h-4 text-white" />
              <span>{heroData?.primaryCta || "Get Your Free Growth Audit"}</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="#services"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 shadow-sm transition-all flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              <span>See How We Help</span>
            </a>
          </motion.div>
        </div>

        {/* Clean Growth Graphic */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6"
        >
          <TechGrowthGraphic />
        </motion.div>

        {/* Clear, simple benefit pills */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-3.5 max-w-4xl mx-auto">
          {highlights.map((item: any, idx: number) => (
            <div
              key={item.title || idx}
              className="p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200/90 shadow-sm text-center"
            >
              <div className="text-xs sm:text-sm font-bold text-slate-900">{item.title}</div>
              <div className="text-[11px] sm:text-xs text-slate-500 mt-1">{item.desc}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
