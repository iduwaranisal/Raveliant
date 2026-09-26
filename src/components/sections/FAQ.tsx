"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle, Sparkles, ArrowRight } from "lucide-react";
import { FAQSchema } from "@/components/seo/JsonLd";

export const defaultFaqs = [
  {
    question: "What digital services does Raveliant provide to scale businesses?",
    answer:
      "Raveliant specializes in an integrated digital growth stack: high-performance custom websites & web applications built on Next.js, intelligent 24/7 conversational AI chatbots for customer inquiry automation, and targeted paid advertising campaigns across Instagram, Facebook, and TikTok designed to consistently generate qualified customer leads.",
  },
  {
    question: "How do your AI chatbots automate customer inquiries and bookings?",
    answer:
      "Our AI chatbots are custom-trained on your specific business knowledge, services, and pricing. They engage website visitors instantly 24/7, answer common customer questions in seconds, qualify prospects, and can automatically schedule consultations directly onto your calendar, saving your team over 20+ hours of repetitive manual communication each week.",
  },
  {
    question: "How fast can you build and launch a custom high-converting website?",
    answer:
      "Most custom website projects are designed, engineered, and launched within 2 to 3 weeks. Every website we build is optimized for sub-second load times on mobile devices, clean UX navigation, search engine optimization (SEO), and conversion architecture to turn visitors into paying clients.",
  },
  {
    question: "Why should I choose Raveliant instead of hiring separate freelancers?",
    answer:
      "Traditional setups require coordinating between a web designer, an ad media buyer, and an automation developer who often blame each other when campaigns stall. Raveliant unifies engineering, AI automation, and customer acquisition under one roof, providing a cohesive strategy with a single accountable partner focused on real revenue growth.",
  },
  {
    question: "How do you track and verify the ROI of our marketing campaigns?",
    answer:
      "We avoid empty vanity metrics like impressions and arbitrary page views. We implement transparent conversion tracking directly tied to confirmed phone inquiries, booked consultations, and form submissions, delivering clear weekly reporting so you always know your exact cost per inquiry.",
  },
  {
    question: "Do you offer ongoing website maintenance, SEO, and support?",
    answer:
      "Yes. We provide continuous support, server uptime monitoring, SEO optimizations, and ad campaign iteration to guarantee your digital systems remain fast, secure, and consistently acquiring new customers as your business expands.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="relative py-20 sm:py-24 bg-slate-50/70 border-t border-slate-200">
      {/* Search Engine FAQ Schema Injection */}
      <FAQSchema faqs={defaultFaqs} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-blue-200 bg-blue-50 text-blue-700 text-xs font-semibold mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
            <span>FREQUENTLY ASKED QUESTIONS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Everything You Need To Know About Scaling With Us
          </h2>

          <p className="mt-3 text-slate-600 text-base sm:text-lg">
            Answers to common questions about our web development, AI automation, and customer acquisition systems.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3.5">
          {defaultFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.question}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? "bg-white border-blue-300 shadow-md ring-1 ring-blue-100"
                    : "bg-white border-slate-200 hover:border-slate-300 shadow-xs"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 font-semibold text-slate-900 focus:outline-none cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg leading-snug">
                    {faq.question}
                  </span>
                  <div
                    className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-200 ${
                      isOpen
                        ? "bg-blue-50 text-blue-600 rotate-180"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="px-5 pb-6 sm:px-6 sm:pb-6 pt-1 text-slate-600 text-sm sm:text-base leading-relaxed border-t border-slate-100 mt-1">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Quick CTA bottom pill */}
        <div className="mt-12 text-center">
          <p className="text-sm text-slate-600 mb-3">
            Have a specific question about your business or project?
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-all shadow-xs hover:shadow-md"
          >
            <span>Ask Our Growth Specialists</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
}
