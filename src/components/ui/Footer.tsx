"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, MessageCircle, Mail } from "lucide-react";

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

  const cleanNumber = whatsappNumber.replace(/[^0-9]/g, "");
  const waNumber = cleanNumber.startsWith("0") ? `94${cleanNumber.slice(1)}` : cleanNumber;
  const waUrl = `https://wa.me/${waNumber}?text=Hello%20Raveliant%20team%2C%20I%20would%20like%20to%20inquire%20about%20your%20services.`;

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="relative bg-[#020510] border-t border-white/10 pt-16 pb-12 overflow-hidden text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3 group inline-block">
              <div className="relative w-9 h-9 rounded-xl overflow-hidden p-0.5 bg-gradient-to-tr from-cyan-400 to-purple-500 shadow-sm">
                <div className="w-full h-full rounded-[10px] overflow-hidden bg-[#040816] flex items-center justify-center">
                  <Image
                    src="/logo.jpg"
                    alt="Raveliant Logo"
                    width={36}
                    height={36}
                    className="object-cover scale-110"
                  />
                </div>
              </div>
              
              <div className="flex flex-col">
                <span className="text-lg font-extrabold tracking-wider text-white font-sans flex items-center gap-1">
                  RAVELIANT
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                </span>
                <span className="text-[8px] font-mono tracking-[0.2em] text-cyan-400 font-semibold -mt-1">
                  DIGITAL SOLUTIONS
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed">
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
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/10 text-slate-300 hover:text-white text-xs font-medium hover:border-emerald-500/40 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>WhatsApp: {whatsappNumber}</span>
              </a>

              <a
                href={`mailto:${contactEmail}`}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/10 text-slate-300 hover:text-white text-xs font-medium hover:border-cyan-500/40 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                <span>{contactEmail}</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Explore
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <a href="#services" className="hover:text-cyan-400 transition-colors">
                  Websites &amp; Web Apps
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-cyan-400 transition-colors">
                  AI Chatbots &amp; Automation
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-cyan-400 transition-colors">
                  Social Media Ads
                </a>
              </li>
              <li>
                <a href="#portfolio" className="hover:text-cyan-400 transition-colors">
                  Project Portfolio
                </a>
              </li>
              <li>
                <a href="#process" className="hover:text-cyan-400 transition-colors">
                  How We Work
                </a>
              </li>
              <li>
                <a href="#case-studies" className="hover:text-cyan-400 transition-colors">
                  Client Results
                </a>
              </li>
              <li>
                <a href="/admin" className="hover:text-cyan-400 transition-colors">
                  Admin Panel
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Growth Newsletter
            </h4>
            <p className="text-xs text-slate-400 mb-3">
              Get simple tips on getting more customers and saving time in your business.
            </p>

            {subscribed ? (
              <div className="p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Thank you for subscribing!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  required
                  placeholder="yourname@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#05091a] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400 placeholder:text-slate-500"
                />
                <button
                  type="submit"
                  className="w-full py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs transition-colors flex items-center justify-center gap-1"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} Raveliant Digital Solutions. All rights reserved.
          </div>
          <div className="flex items-center space-x-4">
            <span className="hover:text-slate-400 cursor-pointer">Privacy</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms</span>
            <a href="#contact" className="hover:text-slate-400">Contact Us</a>
            <Link href="/admin" className="hover:text-cyan-400">Admin Portal</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
