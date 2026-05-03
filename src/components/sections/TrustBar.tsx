"use client";

import React from "react";
import { SITE_CONTENT } from "@/lib/constants";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

export function TrustBar() {
  return (
    <section className="bg-forest-deep border-y border-primary/20 relative z-30">
      <div className="container mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-primary/30">
          {SITE_CONTENT.trustBar.map((item, index) => (
            <div key={index} className="flex flex-col items-center justify-center text-center py-6 md:py-0 px-4">
              <div className="text-4xl md:text-5xl lg:text-6xl font-heading text-primary mb-3">
                <AnimatedCounter
                  value={item.value}
                  suffix={item.suffix}
                  decimals={item.decimals}
                />
              </div>
              <span className="text-foreground/80 font-medium tracking-wider uppercase text-sm md:text-base">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
