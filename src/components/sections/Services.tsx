"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Code2,
  Bot,
  Megaphone,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  TrendingUp,
} from "lucide-react";

interface ServicesProps {
  servicesData?: any[];
}

export function Services({ servicesData }: ServicesProps) {
  const defaultServices = [
    {
      title: "Websites & Web Apps",
      tagline: "Fast, beautiful sites built to turn visitors into active clients.",
      image: "/images/service_web.jpg",
      description:
        "If your website is slow, outdated, or confusing, visitors leave before contacting you. We build fast, modern websites that look clean on phones and make it super easy for people to reach out or book a call.",
      icon: Code2,
      badge: "Web Development",
      features: [
        "Loads in under a second on any smartphone or laptop",
        "Clear, simple layout that guides visitors to take action",
        "Easy online inquiry and appointment booking built right in",
        "Optimized properly so local customers find you on Google",
      ],
      impact: "Get 2x to 3x more customer inquiries",
    },
    {
      title: "AI Chatbots & Automation",
      tagline: "Smart assistants that answer questions and book calls 24/7.",
      image: "/images/service_ai.jpg",
      description:
        "Never miss a potential client when you are busy or out of the office. We add a smart AI assistant to your website that talks to visitors, answers questions in seconds, and schedules meetings directly on your calendar.",
      icon: Bot,
      badge: "AI Automation",
      features: [
        "Replies to website visitors instantly, day or night",
        "Screens inquiries and books serious prospects onto your calendar",
        "Sends automatic text and email confirmations",
        "Saves your team 20+ hours of repetitive manual tasks every week",
      ],
      impact: "Zero missed client inquiries after hours",
    },
    {
      title: "Social Media Ads",
      tagline: "Targeted campaigns that bring real customer inquiries.",
      image: "/images/service_social.svg",
      description:
        "Tired of running ads that get views but no customer calls? We create engaging video and image ads on Instagram, Facebook, and TikTok that reach people who actively need your service.",
      icon: Megaphone,
      badge: "Paid Advertising",
      features: [
        "Short, engaging video ads that grab customer attention",
        "Targets the exact people most interested in your service",
        "Simple, transparent reporting on customer responses",
        "Tested and improved weekly to maximize your lead volume",
      ],
      impact: "Steady, predictable customer inquiry flow",
    },
  ];

  return (
    <section id="services" className="relative py-24 sm:py-28 bg-[#040816] overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/25 bg-cyan-950/40 text-cyan-300 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>WHAT WE DO</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Everything Your Business Needs To Grow Online
          </h2>

          <p className="mt-4 text-slate-300 text-base sm:text-lg">
            We handle your website, customer automations, and targeted social media ads
            together so you can focus on serving your clients.
          </p>
        </div>

        {/* 3 Core Services Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {(servicesData && servicesData.length > 0 ? servicesData : defaultServices).map((srv, idx) => {
            const Icon = srv.icon || (idx === 0 ? Code2 : idx === 1 ? Bot : Megaphone);
            return (
              <motion.div
                key={srv.title}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                className="rounded-3xl p-5 sm:p-7 bg-gradient-to-b from-white/[0.05] to-white/[0.01] border border-white/10 hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between group shadow-xl hover:shadow-cyan-500/10"
              >
                <div>
                  {/* Top Bar with Icon & Badge */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-cyan-950/80 border border-cyan-500/20 text-cyan-400 flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/5 text-slate-300 border border-white/10">
                      {srv.badge}
                    </span>
                  </div>

                  {/* Visual Image Preview */}
                  <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-white/10 mb-6 bg-[#040816] group-hover:border-cyan-500/30 transition-colors">
                    <Image
                      src={srv.image}
                      alt={srv.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#040816]/70 via-transparent to-transparent pointer-events-none" />
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                    {srv.title}
                  </h3>

                  <p className="text-xs font-semibold text-cyan-400 mb-4">
                    {srv.tagline}
                  </p>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                    {srv.description}
                  </p>

                  <div className="space-y-3 mb-8">
                    {srv.features?.map((feat: string, fIdx: number) => (
                      <div key={feat || fIdx} className="flex items-start gap-2.5 text-xs text-slate-200">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-5 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 shrink-0" />
                    <span>{srv.impact}</span>
                  </div>
                  <a
                    href="#contact"
                    className="text-xs font-bold text-slate-300 hover:text-white flex items-center gap-1 group-hover:translate-x-1 transition-transform self-start sm:self-auto"
                  >
                    <span>Get Started</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
