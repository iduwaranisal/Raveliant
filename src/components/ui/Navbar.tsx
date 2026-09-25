"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, ArrowRight, MessageCircle, Mail } from "lucide-react";

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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Services", href: "#services" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Why Us", href: "#why-us" },
    { name: "Our Process", href: "#process" },
    { name: "Case Studies", href: "#case-studies" },
    { name: "Contact", href: "#contact" },
  ];

  const cleanNumber = whatsappNumber.replace(/[^0-9]/g, "");
  const waNumber = cleanNumber.startsWith("0") ? `94${cleanNumber.slice(1)}` : cleanNumber;
  const waUrl = `https://wa.me/${waNumber}?text=Hello%20Raveliant%20team%2C%20I%20would%20like%20to%20inquire%20about%20your%20services.`;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#040816]/90 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/40"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-xl overflow-hidden p-0.5 bg-gradient-to-tr from-cyan-400 to-purple-500 shadow-[0_0_15px_rgba(0,245,255,0.3)] group-hover:shadow-[0_0_25px_rgba(0,245,255,0.6)] transition-all">
              <div className="w-full h-full rounded-[10px] overflow-hidden bg-[#040816] flex items-center justify-center">
                <Image
                  src="/logo.jpg"
                  alt="Raveliant Logo"
                  width={40}
                  height={40}
                  className="object-cover scale-110"
                  priority
                />
              </div>
            </div>
            
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-wider text-white font-sans flex items-center gap-1.5">
                RAVELIANT
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              </span>
              <span className="text-[9px] font-mono tracking-[0.2em] text-cyan-400 font-semibold -mt-1">
                DIGITAL SOLUTIONS
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 bg-white/[0.04] border border-white/10 px-5 py-2 rounded-full backdrop-blur-md">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-slate-300 hover:text-white px-3.5 py-1.5 rounded-full transition-colors hover:bg-white/5"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action CTA */}
          <div className="hidden sm:flex items-center">
            <a
              href="#contact"
              className="px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-cyan-400 to-cyan-300 hover:from-cyan-300 hover:to-white text-slate-950 shadow-[0_0_20px_rgba(0,245,255,0.3)] hover:shadow-[0_0_25px_rgba(0,245,255,0.5)] transition-all flex items-center gap-1.5"
            >
              <span>Free Growth Audit</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#040816]/98 border-b border-white/10 backdrop-blur-2xl px-5 pt-3 pb-6 space-y-3 max-h-[calc(100vh-5rem)] overflow-y-auto">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-slate-200 hover:text-cyan-400 px-3 py-2.5 rounded-xl transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-white/10">
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-cyan-300 text-slate-950 font-bold text-sm shadow-lg flex items-center justify-center gap-1.5"
            >
              <span>Get Free Growth Audit</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
