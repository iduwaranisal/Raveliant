"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, ArrowRight } from "lucide-react";

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
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Services", href: "#services" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Why Us", href: "#why-us" },
    { name: "Process", href: "#process" },
    { name: "Results", href: "#case-studies" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
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
              <a
                key={link.name}
                href={link.href}
                className="text-xs font-semibold text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-full transition-colors hover:bg-white"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action CTA */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="#contact"
              className="px-4 py-2 rounded-lg font-semibold text-xs sm:text-sm bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-colors flex items-center gap-1.5 active:scale-[0.99]"
            >
              <span>Get Free Growth Audit</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 shadow-xl px-5 pt-3 pb-6 space-y-3">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-semibold text-slate-700 hover:text-blue-600 hover:bg-slate-50 px-3 py-2 rounded-lg transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100">
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-xs flex items-center justify-center gap-1.5"
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
