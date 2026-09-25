"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Code,
  TrendingUp,
  Workflow,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  XCircle,
} from "lucide-react";

interface WhyChooseUsProps {
  whyUsData?: any;
}

export function WhyChooseUs({ whyUsData }: WhyChooseUsProps) {
  const defaultPoints = [
    {
      title: "Tech Meets Marketing",
      subtitle: "Websites that look great AND bring in leads",
      description:
        "Most web developers don't know how customer acquisition works, and most marketing agencies don't know how to code. We do both. Your website will look clean, load fast, and be designed to turn visitors into active clients.",
      icon: Code,
      badge: "No Confusion",
    },
    {
      title: "Focused on Real Results",
      subtitle: "Zero vanity metrics. We focus on verified client inquiries.",
      description:
        "We don't care about meaningless social media likes or empty website clicks. We focus strictly on what moves your business forward: how many qualified phone calls, consultation bookings, and customer inquiries you receive.",
      icon: TrendingUp,
      badge: "Pure Facts",
    },
    {
      title: "One Team For Everything",
      subtitle: "No juggling 3 different freelancers",
      description:
        "Managing a separate web designer, an ad copywriter, and an IT consultant is stressful and slow. With Raveliant, you get one dedicated team that handles your website, AI tools, and social media ads under one roof.",
      icon: Workflow,
      badge: "All-in-One",
    },
  ];

  const pointsList = whyUsData?.points?.length ? whyUsData.points : defaultPoints;
  const oldWayList = whyUsData?.oldWay?.length
    ? whyUsData.oldWay
    : [
        "Web designers make a site that doesn't bring any client calls.",
        "Ad agencies blame your website when their ads get no response.",
        "You lose hours every week managing multiple different freelancers.",
        "Vague reports with no clear proof of actual customer inquiries.",
      ];
  const raveliantWayList = whyUsData?.raveliantWay?.length
    ? whyUsData.raveliantWay
    : [
        "Fast websites designed specifically to get customer inquiries.",
        "Smart AI assistants answering customer questions 24 hours a day.",
        "Targeted social media ads that reach people who actively need your service.",
        "One reliable team that handles everything and focuses on real client growth.",
      ];

  const iconMap: Record<number, any> = {
    0: Code,
    1: TrendingUp,
    2: Workflow,
  };

  return (
    <section id="why-us" className="relative py-24 sm:py-28 bg-[#040816] overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-purple-500/25 bg-purple-950/40 text-purple-300 text-xs font-semibold mb-4">
            <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
            <span>{whyUsData?.badgeText || "THE STRATEGIC PARTNER"}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            {whyUsData?.heading || "Why Work With Us?"}
          </h2>

          <p className="mt-4 text-slate-300 text-base sm:text-lg">
            {whyUsData?.subheading ||
              "Stop wasting time managing disconnected agencies. We give you a single, reliable team dedicated to bringing you more customer inquiries every month."}
          </p>
        </div>

        {/* 3 Core Points */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {pointsList.map((p: any, idx: number) => {
            const Icon = p.icon || iconMap[idx % 3] || ShieldCheck;
            return (
              <motion.div
                key={p.title || idx}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                className="rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-white/[0.05] to-white/[0.01] border border-white/10 hover:border-cyan-500/30 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-cyan-950/80 border border-cyan-500/20 text-cyan-400 flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                    {p.badge && (
                      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                        {p.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-white mb-1.5">
                    {p.title}
                  </h3>
                  {p.subtitle && (
                    <p className="text-xs font-medium text-cyan-400 mb-4">
                      {p.subtitle}
                    </p>
                  )}
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {p.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Clean Before / After Comparison */}
        <div className="rounded-3xl border border-white/10 bg-[#080f28]/80 backdrop-blur-xl p-5 sm:p-10 max-w-4xl mx-auto shadow-xl">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white">
              The Difference Is Simple
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              How Raveliant compares to hiring typical agencies
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* The Old Way */}
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3.5">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <XCircle className="w-4 h-4 text-red-400" />
                <span>The Traditional Way</span>
              </div>
              {oldWayList.map((item: string, i: number) => (
                <p key={i} className="text-xs text-slate-400">
                  • {item}
                </p>
              ))}
            </div>

            {/* The Raveliant Way */}
            <div className="p-6 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 space-y-3.5 shadow-md">
              <div className="text-xs font-bold uppercase tracking-wider text-cyan-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                <span>The Raveliant Way</span>
              </div>
              {raveliantWayList.map((item: string, i: number) => (
                <p key={i} className="text-xs text-slate-200">
                  ✓ {item}
                </p>
              ))}
            </div>

          </div>

          <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <span className="text-xs text-slate-400">
              Want to see what we can do for your business?
            </span>
            <a
              href="#contact"
              className="px-5 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs transition-all flex items-center gap-1.5"
            >
              <span>Get Your Free Growth Audit</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
