"use client";

import React from "react";
import {
  Search,
  Code2,
  Megaphone,
  TrendingUp,
  CheckCircle2,
} from "lucide-react";

interface ProcessProps {
  processData?: any[];
}

export function Process({ processData }: ProcessProps) {
  const defaultSteps = [
    {
      number: "01",
      title: "Look At What's Not Working",
      subtitle: "Free Business Review",
      icon: Search,
      description:
        "We review your current website, how visitors find you, and where people might be leaving without reaching out. Then we create a simple plan to increase your inquiries.",
      deliverable: "Custom 90-day action plan",
    },
    {
      number: "02",
      title: "Build Website & AI Tools",
      subtitle: "Fast & Stress-Free Build",
      icon: Code2,
      description:
        "We design your fast new website and set up a smart AI chatbot that answers customer questions and books calls onto your calendar automatically.",
      deliverable: "Live website & 24/7 AI chatbot",
    },
    {
      number: "03",
      title: "Launch Targeted Social Ads",
      subtitle: "Bring In Real Inquiries",
      icon: Megaphone,
      description:
        "We create short, engaging video ads that show up on Instagram, Facebook, and TikTok directly in front of people looking for your exact service.",
      deliverable: "Active ads bringing new inquiries",
    },
    {
      number: "04",
      title: "Review & Keep Growing",
      subtitle: "Continuous Monthly Inquiries",
      icon: TrendingUp,
      description:
        "We monitor your results weekly. We keep what works best, improve ad reach, and help your customer base expand smoothly month after month.",
      deliverable: "Steady, reliable client growth",
    },
  ];

  const iconMap: Record<number, any> = {
    0: Search,
    1: Code2,
    2: Megaphone,
    3: TrendingUp,
  };

  const steps = processData?.length ? processData : defaultSteps;

  return (
    <section id="process" className="relative py-20 sm:py-24 bg-slate-50/70 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-blue-200 bg-blue-50 text-blue-700 text-xs font-semibold mb-3">
            <span>SIMPLE &amp; TRANSPARENT</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            How We Work With You
          </h2>

          <p className="mt-4 text-slate-600 text-base sm:text-lg">
            A simple, 4-step process designed to take the stress out of getting new customer inquiries online.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step: any, idx: number) => {
            const Icon = (typeof step.icon === "function" ? step.icon : null) || iconMap[idx % 4] || Search;
            return (
              <div
                key={step.number}
                className="rounded-2xl p-6 bg-white border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-black text-blue-600 font-mono">
                      {step.number}
                    </span>
                    <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mb-1">
                    {step.title}
                  </h3>

                  <p className="text-xs font-semibold text-blue-600 mb-2.5">
                    {step.subtitle}
                  </p>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                    {step.description}
                  </p>
                </div>

                <div className="pt-3.5 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="text-xs font-semibold text-emerald-700">{step.deliverable}</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
