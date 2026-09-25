"use client";

import React from "react";
import Image from "next/image";
import {
  Code2,
  Bot,
  Megaphone,
} from "lucide-react";

export function TechGrowthGraphic() {
  return (
    <div className="relative w-full max-w-5xl mx-auto">
      {/* Main Container Card - Sharp, professional elevation */}
      <div className="relative rounded-2xl border border-slate-200/90 bg-white shadow-sm p-4 sm:p-7 overflow-hidden">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Verified Client Performance
              </span>
            </div>
            <div className="flex flex-wrap items-baseline gap-x-2 mt-1">
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">180+</span>
              <span className="text-xs sm:text-sm font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
                Custom Platforms &amp; Campaigns Launched
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-semibold">
              Websites • AI Chatbots • Social Ads
            </span>
          </div>
        </div>

        {/* Hero Showcase Image Display */}
        <div className="relative w-full my-5 rounded-xl overflow-hidden border border-slate-200/90 bg-slate-100 shadow-xs">
          <div className="relative aspect-[16/9] w-full max-h-[420px] overflow-hidden">
            <Image
              src="/images/hero_showcase.jpg"
              alt="Raveliant Growth Dashboard & Mobile App Showcase"
              fill
              className="object-cover object-center"
              priority
            />
          </div>

          {/* Floating Live Badge */}
          <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-white/95 backdrop-blur-md border border-slate-200/90 px-3 py-1 rounded-md flex items-center gap-2 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-xs font-semibold text-slate-800">Live Client Showcase</span>
          </div>
        </div>

        {/* 3 Core Cards - Harmonized & Unified Color Palette */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-1">
          <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/80 hover:border-slate-300 transition-colors">
            <div className="flex items-center gap-2.5 mb-1.5">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 border border-blue-100/80 flex items-center justify-center shrink-0">
                <Code2 className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-slate-900">Fast, Modern Website</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Loads in under a second so visitors stay, explore, and convert into clients.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/80 hover:border-slate-300 transition-colors">
            <div className="flex items-center gap-2.5 mb-1.5">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 border border-blue-100/80 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-slate-900">Smart AI Assistant</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Answers customer questions 24/7 and books appointments onto your calendar.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/80 hover:border-slate-300 transition-colors">
            <div className="flex items-center gap-2.5 mb-1.5">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 border border-blue-100/80 flex items-center justify-center shrink-0">
                <Megaphone className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-slate-900">Targeted Social Ads</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Shows your business directly to qualified prospects actively looking for your service.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
