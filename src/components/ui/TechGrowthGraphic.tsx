"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Code2,
  Bot,
  Megaphone,
  CheckCircle,
} from "lucide-react";

export function TechGrowthGraphic() {
  return (
    <div className="relative w-full max-w-5xl mx-auto">
      {/* Ambient background glow */}
      <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500/15 via-blue-500/15 to-purple-500/15 rounded-3xl blur-2xl opacity-70 pointer-events-none" />

      {/* Main Container Card */}
      <div className="relative rounded-3xl border border-white/10 bg-[#070e24]/85 backdrop-blur-xl shadow-2xl p-4 sm:p-8 overflow-hidden">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 sm:pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-xs font-semibold text-slate-300">
                Verified Client Performance
              </span>
            </div>
            <div className="flex flex-wrap items-baseline gap-x-2 mt-1">
              <span className="text-2xl sm:text-3xl font-extrabold text-white">180+</span>
              <span className="text-xs sm:text-sm font-medium text-emerald-400">
                Custom Platforms &amp; Campaigns Launched
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-[11px] sm:text-xs font-semibold">
              Website + AI + Social Ads
            </span>
          </div>
        </div>

        {/* Hero Showcase Image Display */}
        <div className="relative w-full my-5 sm:my-6 rounded-2xl overflow-hidden border border-white/10 shadow-2xl group">
          <div className="relative aspect-[16/9] w-full max-h-[420px] overflow-hidden bg-[#040816]">
            <Image
              src="/images/hero_showcase.jpg"
              alt="Raveliant Growth Dashboard & Mobile App Showcase"
              fill
              className="object-cover object-center"
              priority
            />
            {/* Soft gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#070e24] via-transparent to-transparent opacity-60 pointer-events-none" />
          </div>

          {/* Floating Live Badge */}
          <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-[#040816]/85 backdrop-blur-md border border-cyan-500/30 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-xl flex items-center gap-2 shadow-lg">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-cyan-400" />
            <span className="text-[10px] sm:text-xs font-bold text-white">Live Platform Experience</span>
          </div>
        </div>

        {/* 3 Core Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-cyan-500/40 transition-colors">
            <div className="flex items-center gap-2.5 mb-1.5">
              <div className="w-8 h-8 rounded-lg bg-cyan-950/80 text-cyan-400 flex items-center justify-center">
                <Code2 className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-white">Fast, Modern Website</span>
            </div>
            <p className="text-xs text-slate-300">
              Loads in under a second so visitors stay, explore, and get in touch.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-purple-500/40 transition-colors">
            <div className="flex items-center gap-2.5 mb-1.5">
              <div className="w-8 h-8 rounded-lg bg-purple-950/80 text-purple-400 flex items-center justify-center">
                <Bot className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-white">Smart AI Assistant</span>
            </div>
            <p className="text-xs text-slate-300">
              Answers customer questions 24/7 and schedules appointments automatically.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-emerald-500/40 transition-colors">
            <div className="flex items-center gap-2.5 mb-1.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-950/80 text-emerald-400 flex items-center justify-center">
                <Megaphone className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-white">Targeted Social Ads</span>
            </div>
            <p className="text-xs text-slate-300">
              Shows your business directly to people looking for your exact service.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
