"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Clock,
  MessageCircle,
  AlertCircle,
  Phone,
  X,
} from "lucide-react";
import { submitContactForm } from "@/actions/contactActions";

interface ContactProps {
  whatsappNumber?: string;
  contactEmail?: string;
}

export function Contact({
  whatsappNumber = "0704692220",
  contactEmail = "raveliantcontact@gmail.com",
}: ContactProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    whatsapp: "",
    businessUrl: "",
    primaryGoal: "All-in-One Digital Growth",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 5000);
  };

  const cleanNumber = whatsappNumber.replace(/[^0-9]/g, "");
  const waNumber = cleanNumber.startsWith("0") ? `94${cleanNumber.slice(1)}` : cleanNumber;
  const waUrl = `https://wa.me/${waNumber}?text=Hello%20Raveliant%20team%2C%20I%20would%20like%20to%20inquire%20about%20your%20services.`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const result = await submitContactForm(formData);

      if (result.success) {
        setSubmitted(true);
        showToast("Your inquiry has been submitted! We will be in touch shortly.", "success");
      } else {
        const errorText = result.error || "Failed to submit. Please message us on WhatsApp.";
        setErrorMessage(errorText);
        showToast(errorText, "error");
      }
    } catch {
      const errorText = "Something went wrong. Please chat with us directly on WhatsApp.";
      setErrorMessage(errorText);
      showToast(errorText, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-24 sm:py-28 bg-slate-50 overflow-hidden">
      {/* Floating Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className={`fixed top-4 left-4 right-4 sm:left-auto sm:right-6 sm:top-6 sm:max-w-md z-50 px-4 sm:px-5 py-3 sm:py-3.5 rounded-2xl border shadow-xl flex items-center gap-3 text-xs sm:text-sm font-semibold backdrop-blur-xl ${
              toast.type === "success"
                ? "bg-white border-emerald-300 text-slate-900 shadow-emerald-500/10"
                : "bg-white border-red-300 text-slate-900 shadow-red-500/10"
            }`}
          >
            {toast.type === "success" ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
            )}
            <div className="flex flex-col pr-2">
              <span className="font-bold text-slate-900">
                {toast.type === "success" ? "Request Submitted" : "Notice"}
              </span>
              <span className="text-xs text-slate-600 font-normal">{toast.message}</span>
            </div>
            <button
              type="button"
              onClick={() => setToast(null)}
              className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100 transition-colors ml-auto"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-blue-200 bg-blue-50 text-blue-700 text-xs font-semibold mb-4 shadow-sm">
            <Mail className="w-3.5 h-3.5 text-blue-600" />
            <span>TALK TO US</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Get Your Free Growth Audit
          </h2>

          <p className="mt-4 text-slate-600 text-sm sm:text-base leading-relaxed">
            Tell us about your business. We will personally review your website,
            social media presence, and customer experience, then send you a factual analysis of what to improve.
          </p>

          {/* Quick Direct Inquiries */}
          <div className="mt-6 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-emerald-300 text-emerald-700 hover:text-emerald-800 text-xs sm:text-sm font-semibold hover:bg-emerald-50 shadow-xs transition-all"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Direct WhatsApp: {whatsappNumber}</span>
            </a>

            <a
              href={`mailto:${contactEmail}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-700 hover:text-slate-900 text-xs sm:text-sm font-semibold hover:bg-slate-50 shadow-xs transition-all"
            >
              <Mail className="w-4 h-4 text-blue-600 shrink-0" />
              <span>{contactEmail}</span>
            </a>
          </div>
        </div>

        {/* Form Card */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-xl max-w-2xl mx-auto">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-10 text-center space-y-4"
            >
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <h3 className="text-2xl font-bold text-slate-900">
                We Received Your Request!
              </h3>

              <p className="text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
                Thank you, <span className="text-blue-600 font-bold">{formData.name}</span>.
                We have saved your inquiry for{" "}
                <span className="text-blue-600 font-bold">{formData.businessUrl}</span>{" "}
                into our system and will email your review to you within 4 business hours.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm shadow-emerald-600/20"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Instant Chat on WhatsApp</span>
                </a>

                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      name: "",
                      email: "",
                      phone: "",
                      whatsapp: "",
                      businessUrl: "",
                      primaryGoal: "All-in-One Digital Growth",
                      message: "",
                    });
                  }}
                  className="text-xs text-slate-500 hover:text-slate-800 underline"
                >
                  Send another message
                </button>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              
              {errorMessage && (
                <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Alex Morgan"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 placeholder:text-slate-400 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@company.com"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 placeholder:text-slate-400 transition-all"
                  />
                </div>
              </div>

              {/* Contact Number & WhatsApp Number */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Contact Number *
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. 070 123 4567"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 pl-10 text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 placeholder:text-slate-400 transition-all"
                    />
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    WhatsApp Number <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      value={formData.whatsapp}
                      onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                      placeholder="e.g. 070 123 4567"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 pl-10 text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 placeholder:text-slate-400 transition-all"
                    />
                    <MessageCircle className="w-4 h-4 text-emerald-600 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Both numbers can be the same.
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Website or Business Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.businessUrl}
                  onChange={(e) => setFormData({ ...formData, businessUrl: e.target.value })}
                  placeholder="https://yourbusiness.com"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 placeholder:text-slate-400 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  What is your main goal? *
                </label>
                <select
                  value={formData.primaryGoal}
                  onChange={(e) => setFormData({ ...formData, primaryGoal: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                >
                  <option value="Get More Customer Calls & Inquiries">Get More Customer Calls &amp; Inquiries</option>
                  <option value="Build a Fast Modern Website">Build a Fast Modern Website</option>
                  <option value="Save Time with AI Chatbots">Save Time with AI Chatbots</option>
                  <option value="Reach More People with Social Ads">Reach More People with Social Ads</option>
                  <option value="All-in-One Digital Growth">All-in-One Digital Growth</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  How can we help? (Optional)
                </label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us what your business does and what you would like to improve..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 placeholder:text-slate-400 transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm flex items-center justify-center gap-2 transition-colors shadow-sm disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Submitting Request...</span>
                ) : (
                  <>
                    <span>Request My Free Growth Audit</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="pt-2 flex items-center justify-center gap-6 text-xs text-slate-500">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span>Quick 4-Hour Response</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>100% Confidential</span>
                </span>
              </div>
            </form>
          )}
        </div>

      </div>
    </section>
  );
}
