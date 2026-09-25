"use client";

import React from "react";
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
    <section id="why-us" className="relative py-20 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-indigo-200 bg-indigo-50 text-indigo-700 text-xs font-semibold mb-3">
            <span>{whyUsData?.badgeText || "THE STRATEGIC PARTNER"}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            {whyUsData?.heading || "Why Work With Us?"}
          </h2>

          <p className="mt-4 text-slate-600 text-base sm:text-lg">
            {whyUsData?.subheading ||
              "Stop wasting time managing disconnected agencies. We give you a single, reliable team dedicated to bringing you more customer inquiries every month."}
          </p>
        </div>

        {/* 3 Core Points */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {pointsList.map((p: any, idx: number) => {
            const Icon = p.icon || iconMap[idx % 3] || ShieldCheck;
            return (
              <div
                key={p.title || idx}
                className="rounded-2xl p-6 sm:p-7 bg-slate-50/70 border border-slate-200 hover:border-slate-300 hover:bg-white transition-all flex flex-col justify-between shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-11 h-11 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    {p.badge && (
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-white text-indigo-700 border border-indigo-200 shadow-xs">
                        {p.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-1">
                    {p.title}
                  </h3>
                  {p.subtitle && (
                    <p className="text-xs font-semibold text-indigo-600 mb-3">
                      {p.subtitle}
                    </p>
                  )}
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {p.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Clean Before / After Comparison */}
        <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6 sm:p-10 max-w-4xl mx-auto shadow-xs">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-slate-900">
              The Difference Is Simple
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              How Raveliant compares to hiring typical agencies
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* The Old Way */}
            <div className="p-6 rounded-xl bg-white border border-rose-200 space-y-3 shadow-xs">
              <div className="text-xs font-bold uppercase tracking-wider text-rose-800 flex items-center gap-2">
                <XCircle className="w-4 h-4 text-rose-500" />
                <span>The Traditional Way</span>
              </div>
              {oldWayList.map((item: string, i: number) => (
                <p key={i} className="text-xs text-slate-700 leading-relaxed">
                  • {item}
                </p>
              ))}
            </div>

            {/* The Raveliant Way */}
            <div className="p-6 rounded-xl bg-blue-50/50 border border-blue-200 space-y-3 shadow-xs">
              <div className="text-xs font-bold uppercase tracking-wider text-blue-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                <span>The Raveliant Way</span>
              </div>
              {raveliantWayList.map((item: string, i: number) => (
                <p key={i} className="text-xs text-slate-800 leading-relaxed font-medium">
                  ✓ {item}
                </p>
              ))}
            </div>

          </div>

          <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <span className="text-xs text-slate-600 font-medium">
              Want to see what we can do for your business?
            </span>
            <a
              href="#contact"
              className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 shadow-xs"
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
