"use client";

import React from "react";
import Link from "next/link";
import { Leaf, LayoutGrid } from "lucide-react";
import { SITE_CONTENT } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-background border-t border-primary/20 pt-20 pb-8 text-foreground/80">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Column 1: Brand */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-2">
              <Leaf className="text-primary" />
              <span className="font-heading text-2xl font-semibold tracking-wide text-foreground">
                {SITE_CONTENT.global.brandName}
              </span>
            </Link>
            <p className="font-serif italic text-lg max-w-sm leading-relaxed">
              {SITE_CONTENT.global.tagline}
            </p>
            <div className="flex gap-4 mt-2">
              <a href={SITE_CONTENT.global.socials.instagram} className="hover:text-primary transition-colors" aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href={SITE_CONTENT.global.socials.facebook} className="hover:text-primary transition-colors" aria-label="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href={SITE_CONTENT.global.socials.houzz} className="hover:text-primary transition-colors" aria-label="Houzz">
                <LayoutGrid size={20} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col gap-6 md:px-12">
            <h4 className="font-heading text-lg font-semibold tracking-wider uppercase text-foreground">
              Navigation
            </h4>
            <nav className="flex flex-col gap-3">
              {SITE_CONTENT.global.navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="w-fit hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Column 3: Contact */}
          <div className="flex flex-col gap-6">
            <h4 className="font-heading text-lg font-semibold tracking-wider uppercase text-foreground">
              Contact Us
            </h4>
            <div className="flex flex-col gap-3">
              <a href={`tel:${SITE_CONTENT.global.phone.replace(/\s+/g, '')}`} className="hover:text-primary transition-colors">
                {SITE_CONTENT.global.phone}
              </a>
              <a href={`mailto:${SITE_CONTENT.global.email}`} className="hover:text-primary transition-colors">
                {SITE_CONTENT.global.email}
              </a>
              <p>{SITE_CONTENT.global.address}</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-foreground/60">
          <p>© {new Date().getFullYear()} {SITE_CONTENT.global.brandName}. All rights reserved.</p>
          <p>{SITE_CONTENT.global.abn}</p>
        </div>
      </div>
    </footer>
  );
}
