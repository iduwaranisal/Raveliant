"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  Briefcase,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Filter,
} from "lucide-react";

export interface ProjectItem {
  _id?: string;
  title: string;
  category:
    | "All-in-One Digital Growth"
    | "Get More Customer Calls & Inquiries"
    | "Build a Fast Modern Website"
    | "Save Time with AI Chatbots"
    | "Reach More People with Social Ads"
    | string;
  description: string;
  client: string;
  image: string;
  liveUrl?: string;
  tags?: string[];
  highlight?: string;
  featured?: boolean;
}

interface PortfolioProps {
  initialProjects?: ProjectItem[];
}

export function Portfolio({ initialProjects = [] }: PortfolioProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = [
    "All",
    "All-in-One Digital Growth",
    "Get More Customer Calls & Inquiries",
    "Build a Fast Modern Website",
    "Save Time with AI Chatbots",
    "Reach More People with Social Ads",
  ];

  const matchCategory = (projectCategory: string, filter: string) => {
    if (filter === "All") return true;
    if (projectCategory === filter) return true;

    // Normalization & backwards compatibility
    const catLower = (projectCategory || "").toLowerCase();
    if (filter === "Build a Fast Modern Website") {
      return (
        catLower.includes("website") ||
        catLower.includes("web app") ||
        catLower === "websites" ||
        catLower === "web apps"
      );
    }
    if (filter === "Save Time with AI Chatbots") {
      return (
        catLower.includes("chatbot") ||
        catLower.includes("ai assistant") ||
        catLower === "ai chatbots"
      );
    }
    if (filter === "Reach More People with Social Ads") {
      return (
        catLower.includes("social ads") ||
        catLower.includes("ads") ||
        catLower.includes("instagram") ||
        catLower.includes("tiktok")
      );
    }
    if (filter === "Get More Customer Calls & Inquiries") {
      return (
        catLower.includes("inquir") ||
        catLower.includes("calls") ||
        catLower.includes("lead") ||
        catLower.includes("funnel")
      );
    }
    if (filter === "All-in-One Digital Growth") {
      return (
        catLower.includes("growth") ||
        catLower.includes("all-in-one") ||
        catLower.includes("suite")
      );
    }

    return false;
  };

  const filteredProjects = initialProjects.filter((p) =>
    matchCategory(p.category, selectedCategory)
  );

  return (
    <section id="portfolio" className="relative py-24 sm:py-28 bg-[#040816] overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/25 bg-cyan-950/40 text-cyan-300 text-xs font-semibold mb-4">
            <Briefcase className="w-3.5 h-3.5 text-cyan-400" />
            <span>SELECTED CLIENT WORK</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Our Project Portfolio
          </h2>

          <p className="mt-4 text-slate-300 text-base sm:text-lg">
            Explore recent websites, conversational AI tools, and targeted advertising
            campaigns built to scale client operations.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-2.5 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all border ${
                selectedCategory === cat
                  ? "bg-cyan-500 text-slate-950 border-cyan-400 shadow-md shadow-cyan-500/20 font-bold"
                  : "bg-white/[0.03] text-slate-400 border-white/10 hover:text-white hover:border-white/20"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <AnimatePresence>
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project._id || project.title}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="rounded-3xl p-5 sm:p-6 bg-gradient-to-b from-white/[0.05] to-white/[0.01] border border-white/10 hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between group shadow-xl hover:shadow-cyan-500/10"
              >
                <div>
                  {/* Image Container */}
                  <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-white/10 bg-[#040816] mb-5 group-hover:border-cyan-500/30 transition-colors">
                    <Image
                      src={project.image || "/images/service_web.jpg"}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#040816]/80 via-transparent to-transparent pointer-events-none" />

                    {/* Top Floating Badge */}
                    <div className="absolute top-3 left-3 bg-[#040816]/85 backdrop-blur-md border border-white/15 px-3 py-1 rounded-lg text-[11px] font-semibold text-cyan-300 max-w-[85%] truncate">
                      {project.category}
                    </div>

                    {project.highlight && (
                      <div className="absolute bottom-3 left-3 bg-cyan-950/80 backdrop-blur-md border border-cyan-500/40 px-2.5 py-1 rounded-lg text-[10px] font-bold text-cyan-200">
                        ★ {project.highlight}
                      </div>
                    )}
                  </div>

                  {/* Client & Title */}
                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                    {project.client}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {/* Tags */}
                  {project.tags && project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-0.5 rounded-md bg-white/[0.03] border border-white/5 text-[10px] text-slate-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Bottom CTA */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs text-slate-400">Live Client Project</span>
                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-cyan-300 hover:text-white flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                    >
                      <span>Explore</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <a
                      href="#contact"
                      className="text-xs font-bold text-cyan-300 hover:text-white flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                    >
                      <span>Inquire</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Portfolio Bottom Banner */}
        <div className="mt-14 p-5 sm:p-8 rounded-3xl bg-gradient-to-r from-cyan-950/60 via-[#0a1330] to-purple-950/60 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="text-lg font-bold text-white">
              Have a project or custom requirements in mind?
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              We design and engineer bespoke web platforms and AI tools tailored to your business model.
            </p>
          </div>

          <a
            href="#contact"
            className="px-6 py-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-1.5 shrink-0 transition-all shadow-md shadow-cyan-400/20"
          >
            <span>Start Your Project</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
}
