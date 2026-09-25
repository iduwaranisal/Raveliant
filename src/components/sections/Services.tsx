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
  TrendingUp,
} from "lucide-react";

interface ServicesProps {
  servicesData?: any[];
}

export function Services({ servicesData }: ServicesProps) {
  const defaultServices = [
    {
      title: "Websites & Web Apps",
      tagline: "Fast, high-converting platforms built to turn visitors into active clients.",
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
    <section id="services" className="relative py-20 sm:py-24 bg-white border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-blue-200 bg-blue-50 text-blue-700 text-xs font-semibold mb-3">
            <span>WHAT WE DO</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Everything Your Business Needs To Grow Online
          </h2>

          <p className="mt-4 text-slate-600 text-base sm:text-lg">
            We handle your website, customer automations, and targeted social media ads
            together so you can focus on serving your clients.
          </p>
        </motion.div>

        {/* 3 Core Services Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {(servicesData && servicesData.length > 0 ? servicesData : defaultServices).map((srv, idx) => {
            const Icon = srv.icon || (idx === 0 ? Code2 : idx === 1 ? Bot : Megaphone);
            return (
              <motion.div
                key={srv.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: idx * 0.1, ease: "easeOut" }}
                className="rounded-2xl p-6 sm:p-7 bg-slate-50/70 border border-slate-200 hover:border-blue-300 hover:bg-white hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300 flex flex-col justify-between shadow-xs group"
              >
                <div>
                  {/* Top Bar with Icon & Badge */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-11 h-11 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-white text-slate-700 border border-slate-200 shadow-xs">
                      {srv.badge}
                    </span>
                  </div>

                  {/* Visual Image Preview with subtle zoom on hover */}
                  <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden border border-slate-200 mb-5 bg-slate-100">
                    <Image
                      src={srv.image}
                      alt={srv.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-1.5 group-hover:text-blue-600 transition-colors">
                    {srv.title}
                  </h3>

                  <p className="text-xs sm:text-sm font-semibold text-blue-600 mb-3">
                    {srv.tagline}
                  </p>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                    {srv.description}
                  </p>

                  <div className="space-y-2.5 mb-8">
                    {srv.features?.map((feat: string, fIdx: number) => (
                      <div key={feat || fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 shrink-0" />
                    <span>{srv.impact}</span>
                  </div>
                  <a
                    href="#contact"
                    className="text-xs font-bold text-slate-700 hover:text-blue-600 flex items-center gap-1 transition-colors self-start sm:self-auto group/btn"
                  >
                    <span>Get Started</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
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
