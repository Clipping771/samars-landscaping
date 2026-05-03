"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Leaf, Menu, X, Calculator } from "lucide-react";
import { SITE_CONTENT } from "@/lib/constants";
import { GoldButton } from "@/components/ui/GoldButton";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  const handleMobileClose = () => {
    setMobileMenuOpen(false);
  };

  return (
    <motion.header
      className={`fixed top-0 w-full z-50 transition-colors duration-300 ${
        isScrolled
          ? "bg-[#080c08]/90 backdrop-blur-md border-b border-white/5 shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 group"
          onClick={handleMobileClose}
        >
          <Leaf className="text-primary group-hover:rotate-12 transition-transform duration-300" />
          <span className="font-heading text-2xl font-semibold tracking-wide">
            {SITE_CONTENT.global.brandName}
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {SITE_CONTENT.global.navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={handleMobileClose}
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors relative group flex items-center gap-1"
            >
              {link.label === "Calculator" && <Calculator size={14} className="mb-[2px]" />}
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:block">
          <GoldButton onClick={() => window.location.href = "/#contact"}>
            Book Consultation
          </GoldButton>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden text-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "100vh" }}
          exit={{ opacity: 0, height: 0 }}
          className="lg:hidden absolute top-20 left-0 w-full bg-[#080c08] border-t border-white/5 flex flex-col items-center pt-12 gap-8"
        >
          {SITE_CONTENT.global.navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={handleMobileClose}
              className="text-xl font-heading text-foreground/90 hover:text-primary transition-colors flex items-center gap-2"
            >
              {link.label === "Calculator" && <Calculator size={20} />}
              {link.label}
            </Link>
          ))}
          <GoldButton
            className="mt-4"
            onClick={() => {
              handleMobileClose();
              window.location.href = "/#contact";
            }}
          >
            Book Free Consultation
          </GoldButton>
        </motion.div>
      )}
    </motion.header>
  );
}
