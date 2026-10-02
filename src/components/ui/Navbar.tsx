"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ArrowRight,
  Code2,
  Layers,
  Sparkles,
  Workflow,
  TrendingUp,
  HelpCircle,
  Mail,
  MessageCircle,
  ChevronRight,
} from "lucide-react";

interface NavbarProps {
  whatsappNumber?: string;
  contactEmail?: string;
}

export function Navbar({
  whatsappNumber = "0704692220",
  contactEmail = "raveliantcontact@gmail.com",
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cleanNumber = whatsappNumber.replace(/[^0-9]/g, "");
  const waNumber = cleanNumber.startsWith("0") ? `94${cleanNumber.slice(1)}` : cleanNumber;
  const waUrl = `https://wa.me/${waNumber}?text=Hello%20Raveliant%20team%2C%20I%20would%20like%20to%20inquire%20about%20your%20services.`;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll and listen for Escape key when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setMobileMenuOpen(false);
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "unset";
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "unset";
    }
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: "Services", href: "/#services" },
    { name: "Portfolio", href: "/#portfolio" },
    { name: "Why Us", href: "/#why-us" },
    { name: "Process", href: "/#process" },
    { name: "Case Studies", href: "/#case-studies" },
    { name: "FAQ", href: "/#faq" },
    { name: "Contact", href: "/#contact" },
  ];

  const mobileNavItems = [
    {
      name: "Services",
      href: "/#services",
      desc: "Web development, AI chatbots & paid social ads",
      icon: Code2,
    },
    {
      name: "Portfolio",
      href: "/#portfolio",
      desc: "Live client websites & digital systems",
      icon: Layers,
    },
    {
      name: "Why Us",
      href: "/#why-us",
      desc: "The strategic engineering & growth partner",
      icon: Sparkles,
    },
    {
      name: "Process",
      href: "/#process",
      desc: "Our 4-step framework for business scale",
      icon: Workflow,
    },
    {
      name: "Case Studies",
      href: "/#case-studies",
      desc: "Verified performance & client growth metrics",
      icon: TrendingUp,
    },
    {
      name: "FAQ",
      href: "/#faq",
      desc: "Answers to common questions about our work",
      icon: HelpCircle,
    },
    {
      name: "Contact",
      href: "/#contact",
      desc: "Schedule your free 30-min growth consultation",
      icon: Mail,
    },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs"
            : "bg-white/70 backdrop-blur-sm border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Brand Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-9 h-9 rounded-lg overflow-hidden border border-slate-200 bg-white shadow-xs flex items-center justify-center p-0.5">
                <Image
                  src="/logo.jpg"
                  alt="Raveliant Logo"
                  width={36}
                  height={36}
                  className="object-cover rounded-md"
                  priority
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

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1 bg-slate-50 border border-slate-200/80 px-3 py-1 rounded-full">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-xs font-semibold text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-full transition-colors hover:bg-white"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Right Action CTA */}
            <div className="hidden sm:flex items-center gap-3">
              <Link
                href="/#contact"
                className="px-4 py-2 rounded-lg font-semibold text-xs sm:text-sm bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-colors flex items-center gap-1.5 active:scale-[0.99]"
              >
                <span>Get Free Growth Audit</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex lg:hidden items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 hover:text-blue-600 hover:border-blue-200 shadow-xs transition-colors"
                aria-label="Toggle Navigation"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Professional Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-50">
            {/* Dark Frosted Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-md"
            />

            {/* Slide-Down Mobile Drawer Panel */}
            <motion.div
              initial={{ opacity: 0, y: -24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative bg-white border-b border-slate-200 shadow-2xl rounded-b-3xl max-h-[92vh] flex flex-col overflow-hidden"
            >
              {/* Header inside Drawer */}
              <div className="flex items-center justify-between px-5 h-16 sm:h-20 border-b border-slate-100 bg-slate-50/50">
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2.5"
                >
                  <div className="w-8 h-8 rounded-lg overflow-hidden border border-slate-200 bg-white p-0.5">
                    <Image
                      src="/logo.jpg"
                      alt="Raveliant Logo"
                      width={32}
                      height={32}
                      className="object-cover rounded"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-base font-bold text-slate-900 leading-none">
                      RAVELIANT
                    </span>
                    <span className="text-[8px] font-mono tracking-widest text-blue-600 font-bold mt-0.5">
                      DIGITAL SOLUTIONS
                    </span>
                  </div>
                </Link>

                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-200/60 transition-colors"
                  aria-label="Close navigation"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Items (Scrollable List) */}
              <div className="overflow-y-auto px-4 py-4 space-y-1.5 divide-y divide-slate-100/80">
                <div className="space-y-1">
                  {mobileNavItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="group flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 active:bg-blue-50/60 transition-all duration-150 border border-transparent hover:border-slate-200"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-200">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                              {item.name}
                            </div>
                            <div className="text-xs text-slate-500 font-normal leading-tight">
                              {item.desc}
                            </div>
                          </div>
                        </div>

                        <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 transition-colors shrink-0" />
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Drawer Footer with High-Impact CTA & Quick Contacts */}
              <div className="p-4 bg-slate-50/90 border-t border-slate-200 space-y-3">
                <Link
                  href="/#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 active:scale-[0.99] transition-all"
                >
                  <span>Get Free Growth Audit</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-white border border-slate-200 text-slate-700 font-semibold hover:border-emerald-300 hover:text-emerald-700 transition-colors shadow-2xs"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                    <span>WhatsApp</span>
                  </a>

                  <a
                    href={`mailto:${contactEmail}`}
                    className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-white border border-slate-200 text-slate-700 font-semibold hover:border-blue-300 hover:text-blue-700 transition-colors shadow-2xs"
                  >
                    <Mail className="w-3.5 h-3.5 text-blue-600" />
                    <span>Email Us</span>
                  </a>
                </div>

                <div className="flex items-center justify-center gap-1.5 text-[11px] font-semibold text-slate-500 pt-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>Available for select client projects</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
