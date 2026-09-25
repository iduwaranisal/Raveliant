"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  TrendingUp,
  ArrowRight,
  Quote,
} from "lucide-react";

interface CaseStudiesProps {
  caseStudiesData?: any[];
}

export function CaseStudies({ caseStudiesData }: CaseStudiesProps) {
  const [activeTab, setActiveTab] = useState(0);

  const defaultStudies = [
    {
      client: "AuraPay",
      tag: "Software & Technology",
      image: "/images/case_aurapay.svg",
      headline: "From Low Web Traffic to 450+ Qualified Monthly Inquiries",
      story:
        "AuraPay had an outdated, slow website where visitors clicked away before reaching out. We built a fast, clean website, added an AI assistant that answered questions around the clock, and ran targeted ads that brought in serious, qualified prospects.",
      metrics: [
        { label: "Monthly Inquiries", value: "+310% More Leads" },
        { label: "Page Load Speed", value: "320ms (<1s Load)" },
        { label: "Booking Rate", value: "4.8x Increase" },
      ],
      quote:
        "Raveliant gave us a website that actually works, and their campaigns have kept our calendar full of new clients.",
      author: "Marcus Vance, Founder of AuraPay",
    },
    {
      client: "Solari",
      tag: "Online Store & Retail",
      image: "/images/case_solari.svg",
      headline: "+230% Increase in Order Volume & 68% Customer Questions Handled by AI",
      story:
        "Solari was losing mobile shoppers because their old checkout was slow and clunky. Also, their small team spent all day answering the same support questions. We built a lightning-fast store and an AI assistant that solves customer questions immediately.",
      metrics: [
        { label: "Mobile Orders", value: "+230% More Orders" },
        { label: "Support Handled", value: "68% Handled by AI" },
        { label: "Checkout Drop-off", value: "-45% Reduction" },
      ],
      quote:
        "Our website loads instantly now, and our customers get help in seconds even in the middle of the night.",
      author: "Elena Rostova, Marketing Director at Solari",
    },
    {
      client: "Nexus",
      tag: "Business Logistics",
      image: "/images/case_nexus.svg",
      headline: "14 Large Client Accounts Won & 70 Hours Saved Every Week",
      story:
        "Nexus relied on manual spreadsheets and had no way for new clients to find them online. We built an easy-to-use client dashboard and ran targeted social media ads reaching local business owners who needed their services.",
      metrics: [
        { label: "New Clients Won", value: "14 Large Accounts" },
        { label: "Time Saved", value: "70 hrs / week saved" },
        { label: "System Uptime", value: "99.9% Reliable" },
      ],
      quote:
        "The automated portal took hours of work off our team, and the marketing filled our pipeline with great clients.",
      author: "David Chen, Operations Manager at Nexus",
    },
  ];

  const studies = caseStudiesData?.length ? caseStudiesData : defaultStudies;
  const currentStudy = studies[activeTab] || studies[0] || defaultStudies[0];

  return (
    <section id="case-studies" className="relative py-24 sm:py-28 bg-[#030614] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/25 bg-cyan-950/40 text-cyan-300 text-xs font-semibold mb-4">
            <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
            <span>REAL CLIENT RESULTS</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Client Success Stories
          </h2>

          <p className="mt-4 text-slate-300 text-base sm:text-lg">
            See how combining a fast website, smart AI assistance, and targeted social
            media ads helped these businesses increase customer volume and save time.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10">
          {studies.map((item, idx) => (
            <button
              key={item.client ? `${item.client}-${idx}` : idx}
              onClick={() => setActiveTab(idx)}
              className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all border ${
                activeTab === idx
                  ? "bg-cyan-500 text-slate-950 border-cyan-400 shadow-md shadow-cyan-500/20"
                  : "bg-white/[0.03] text-slate-400 border-white/10 hover:text-white"
              }`}
            >
              {item.client}
            </button>
          ))}
        </div>

        {/* Selected Case Study Card */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25 }}
          className="rounded-3xl border border-white/10 bg-[#080f28]/90 backdrop-blur-xl p-5 sm:p-10 max-w-5xl mx-auto shadow-2xl"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Visual Mockup Image */}
            <div className="lg:col-span-6 space-y-4">
              <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-white/10 bg-[#040816] shadow-xl">
                <Image
                  src={currentStudy.image || "/images/case_aurapay.svg"}
                  alt={currentStudy.client || "Case Study"}
                  fill
                  className="object-cover"
                />
              </div>

              {/* 3 Metric Pills */}
              {currentStudy.metrics && (
                <div className="grid grid-cols-3 gap-1.5 sm:gap-2.5">
                  {currentStudy.metrics.map((m: any, idx: number) => (
                    <div
                      key={m.label || idx}
                      className="p-2 sm:p-3 rounded-xl bg-white/[0.03] border border-white/10 text-center"
                    >
                      <div className="text-xs sm:text-base font-black text-cyan-400">
                        {m.value}
                      </div>
                      <div className="text-[9px] sm:text-[10px] text-slate-400 font-medium mt-0.5 line-clamp-1">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right Column: Story & Testimonial */}
            <div className="lg:col-span-6 space-y-5">
              <div>
                <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                  {currentStudy.tag}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1 leading-snug">
                  {currentStudy.headline}
                </h3>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">
                {currentStudy.story}
              </p>

              {/* Quote */}
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex items-start gap-3">
                <Quote className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs sm:text-sm italic text-slate-300">
                    &ldquo;{currentStudy.quote}&rdquo;
                  </p>
                  <p className="text-xs text-cyan-400 font-semibold mt-1">
                    — {currentStudy.author}
                  </p>
                </div>
              </div>

              <div className="pt-2 flex justify-start">
                <a
                  href="#contact"
                  className="text-xs font-bold text-cyan-400 hover:text-white flex items-center gap-1 group"
                >
                  <span>Want results like this? Request your free review</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
