"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, MessageCircle, Mail, Loader2 } from "lucide-react";
import { subscribeNewsletter } from "@/actions/newsletterActions";

interface FooterProps {
  whatsappNumber?: string;
  contactEmail?: string;
}

export function Footer({
  whatsappNumber = "0704692220",
  contactEmail = "raveliantcontact@gmail.com",
}: FooterProps) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const cleanNumber = whatsappNumber.replace(/[^0-9]/g, "");
  const waNumber = cleanNumber.startsWith("0") ? `94${cleanNumber.slice(1)}` : cleanNumber;
  const waUrl = `https://wa.me/${waNumber}?text=Hello%20Raveliant%20team%2C%20I%20would%20like%20to%20inquire%20about%20your%20services.`;

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedEmail = email.trim();
    if (!trimmedEmail || loading) return;

    // Basic client-side email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      const res = await subscribeNewsletter(trimmedEmail);
      if (res.success) {
        setSubscribed(true);
        setSuccessMessage(res.message || "Thank you for subscribing!");
        setEmail("");
      } else {
        setErrorMessage(res.error || "Failed to subscribe. Please try again.");
      }
    } catch {
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="relative bg-white border-t border-slate-200 pt-16 pb-12 overflow-hidden text-slate-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3 group inline-block">
              <div className="relative w-9 h-9 rounded-lg overflow-hidden border border-slate-200 bg-white p-0.5 shadow-xs flex items-center justify-center">
                <Image
                  src="/logo.jpg"
                  alt="Raveliant Logo"
                  width={36}
                  height={36}
                  className="object-cover rounded-md"
                />
              </div>
              
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-tight text-slate-900 flex items-center gap-1.5 leading-none">
                  RAVELIANT
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                </span>
                <span className="text-[9px] font-mono tracking-widest text-blue-600 font-bold mt-0.5">
                  DIGITAL SOLUTIONS
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-slate-600 max-w-sm leading-relaxed">
              We Don&apos;t Just Build Software. We Scale Businesses.
              We build fast modern websites, set up smart AI chatbots that save you hours of work,
              and run social media ads that bring you a steady stream of new clients.
            </p>

            {/* Direct Contact Links */}
            <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 hover:text-emerald-700 hover:border-emerald-300 text-xs font-medium transition-colors shadow-xs"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>WhatsApp: {whatsappNumber}</span>
              </a>

              <a
                href={`mailto:${contactEmail}`}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 hover:text-blue-700 hover:border-blue-300 text-xs font-medium transition-colors shadow-xs"
              >
                <Mail className="w-3.5 h-3.5 text-blue-600" />
                <span>{contactEmail}</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
              Explore
            </h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li>
                <Link href="/#services" className="hover:text-blue-600 transition-colors">
                  Websites &amp; Web Apps
                </Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-blue-600 transition-colors">
                  AI Chatbots &amp; Automation
                </Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-blue-600 transition-colors">
                  Social Media Ads
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="hover:text-blue-600 transition-colors">
                  Project Portfolio
                </Link>
              </li>
              <li>
                <Link href="/case-studies" className="hover:text-blue-600 transition-colors">
                  Client Case Studies
                </Link>
              </li>
              <li>
                <Link href="/#process" className="hover:text-blue-600 transition-colors">
                  How We Work
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="hover:text-blue-600 transition-colors">
                  FAQs &amp; Answers
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
              Growth Newsletter
            </h4>
            <p className="text-xs text-slate-600 mb-3 leading-relaxed">
              Get simple tips on getting more customers and saving time in your business.
            </p>

            {subscribed ? (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-start gap-2 shadow-xs">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="leading-snug">{successMessage || "Thank you for subscribing!"}</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  required
                  placeholder="yourname@company.com"
                  value={email}
                  disabled={loading}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder:text-slate-400 transition-all disabled:opacity-60"
                />

                {errorMessage && (
                  <p className="text-[11px] text-red-600 leading-tight">
                    {errorMessage}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Subscribing...</span>
                    </>
                  ) : (
                    <>
                      <span>Subscribe</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom */}
        <div className="border-t border-slate-200 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} Raveliant Digital Solutions. All rights reserved.
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/#contact" className="hover:text-slate-800 transition-colors">Privacy</Link>
            <Link href="/#contact" className="hover:text-slate-800 transition-colors">Terms</Link>
            <Link href="/#contact" className="hover:text-slate-800 transition-colors">Contact Us</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
