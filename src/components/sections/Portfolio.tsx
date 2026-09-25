"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  ArrowRight,
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
    <section id="portfolio" className="relative py-20 sm:py-24 bg-slate-50/70 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-blue-200 bg-blue-50 text-blue-700 text-xs font-semibold mb-3">
            <span>SELECTED CLIENT WORK</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Our Project Portfolio
          </h2>

          <p className="mt-4 text-slate-600 text-base sm:text-lg">
            Explore recent websites, conversational AI tools, and targeted advertising
            campaigns built to scale client operations.
          </p>
        </motion.div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center items-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 border active:scale-95 ${
                selectedCategory === cat
                  ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                  : "bg-white text-slate-600 border-slate-200 hover:text-slate-900 hover:bg-slate-100 hover:border-slate-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid with gentle reveal and micro-lift */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project._id || project.title}
                layout
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, delay: idx * 0.05, ease: "easeOut" }}
                className="rounded-2xl p-5 sm:p-6 bg-white border border-slate-200 hover:border-blue-300 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between shadow-xs group"
              >
                <div>
                  {/* Image Container with subtle zoom */}
                  <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden border border-slate-200 bg-slate-100 mb-4">
                    <Image
                      src={project.image || "/images/service_web.jpg"}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Top Badge */}
                    <div className="absolute top-2.5 left-2.5 bg-white/95 backdrop-blur-md border border-slate-200 px-2.5 py-0.5 rounded-md text-[11px] font-bold text-blue-700 max-w-[85%] truncate shadow-xs">
                      {project.category}
                    </div>

                    {project.highlight && (
                      <div className="absolute bottom-2.5 left-2.5 bg-blue-600 px-2.5 py-0.5 rounded-md text-[10px] font-bold text-white shadow-xs">
                        ★ {project.highlight}
                      </div>
                    )}
                  </div>

                  {/* Client & Title */}
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                    {project.client}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1.5 group-hover:text-blue-600 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {/* Tags */}
                  {project.tags && project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-md bg-slate-100 text-[11px] text-slate-600 font-medium group-hover:bg-blue-50 group-hover:text-blue-700 transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Bottom CTA */}
                <div className="pt-3.5 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-500">Live Client Project</span>
                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors group/link"
                    >
                      <span>Explore</span>
                      <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                    </a>
                  ) : (
                    <a
                      href="#contact"
                      className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors group/link"
                    >
                      <span>Inquire</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1" />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Portfolio Bottom Banner */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="text-lg font-bold text-slate-900">
              Have a project or custom requirements in mind?
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              We design and engineer bespoke web platforms and AI tools tailored to your business model.
            </p>
          </div>

          <a
            href="#contact"
            className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm flex items-center gap-1.5 shrink-0 transition-colors shadow-xs"
          >
            <span>Start Your Project</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
}
