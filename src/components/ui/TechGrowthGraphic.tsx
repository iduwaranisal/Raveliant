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
      {/* Ambient background glow - soft and calm */}
      <div className="absolute -inset-2 bg-gradient-to-r from-blue-200/30 via-indigo-200/20 to-sky-200/30 rounded-3xl blur-2xl opacity-60 pointer-events-none" />

      {/* Main Container Card */}
      <div className="relative rounded-3xl border border-slate-200 bg-white shadow-xl p-4 sm:p-8 overflow-hidden">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 sm:pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-xs font-semibold text-slate-500">
                Verified Client Performance
              </span>
            </div>
            <div className="flex flex-wrap items-baseline gap-x-2 mt-1">
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">180+</span>
              <span className="text-xs sm:text-sm font-semibold text-emerald-700">
                Custom Platforms &amp; Campaigns Launched
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-[11px] sm:text-xs font-semibold">
              Website + AI + Social Ads
            </span>
          </div>
        </div>

        {/* Hero Showcase Image Display */}
        <div className="relative w-full my-5 sm:my-6 rounded-2xl overflow-hidden border border-slate-200 shadow-md group">
          <div className="relative aspect-[16/9] w-full max-h-[420px] overflow-hidden bg-slate-100">
            <Image
              src="/images/hero_showcase.jpg"
              alt="Raveliant Growth Dashboard & Mobile App Showcase"
              fill
              className="object-cover object-center"
              priority
            />
          </div>

          {/* Floating Live Badge */}
          <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-white/95 backdrop-blur-md border border-slate-200 px-3 py-1.5 rounded-xl flex items-center gap-2 shadow-md">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-xs font-bold text-slate-800">Live Platform Experience</span>
          </div>
        </div>

        {/* 3 Core Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-blue-300 transition-colors shadow-sm">
            <div className="flex items-center gap-2.5 mb-1.5">
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
                <Code2 className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-slate-900">Fast, Modern Website</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Loads in under a second so visitors stay, explore, and get in touch.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-indigo-300 transition-colors shadow-sm">
            <div className="flex items-center gap-2.5 mb-1.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center">
                <Bot className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-slate-900">Smart AI Assistant</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Answers customer questions 24/7 and schedules appointments automatically.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-emerald-300 transition-colors shadow-sm">
            <div className="flex items-center gap-2.5 mb-1.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <Megaphone className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-slate-900">Targeted Social Ads</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Shows your business directly to people looking for your exact service.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
