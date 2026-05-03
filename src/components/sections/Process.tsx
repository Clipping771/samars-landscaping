"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Compass, DraftingCompass, Layers, Wrench, Key } from "lucide-react";
import { SITE_CONTENT } from "@/lib/constants";
import { STAGGER_CONTAINER, FADE_UP_ANIMATION_VARIANTS } from "@/lib/animations";
import { SectionHeading } from "@/components/ui/SectionHeading";

const iconMap: Record<string, React.ElementType> = {
  Compass,
  DraftingCompass,
  Layers,
  Wrench,
  Key,
};

export function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="process" className="py-24 md:py-32 lg:py-40 bg-background relative z-10 overflow-hidden">
      <div className="absolute inset-0 bg-noise opacity-30 pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-20">
        <SectionHeading title={SITE_CONTENT.process.heading} />
        
        <div ref={containerRef} className="mt-20 relative max-w-5xl mx-auto">
          {/* Connecting Line (Mobile/Tablet Vertical) */}
          <div className="absolute left-[28px] top-[10%] bottom-[10%] w-[2px] bg-primary/20 lg:hidden" />
          <motion.div
            className="absolute left-[28px] top-[10%] w-[2px] bg-primary lg:hidden"
            style={{ height: lineHeight }}
          />

          {/* Connecting Line (Desktop Horizontal) */}
          <div className="absolute top-[45px] left-[10%] right-[10%] h-[2px] bg-primary/20 hidden lg:block" />
          <motion.div
            className="absolute top-[45px] left-[10%] h-[2px] bg-primary hidden lg:block origin-left"
            style={{ scaleX: lineHeight }}
          />

          <motion.div
            variants={STAGGER_CONTAINER}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="flex flex-col lg:flex-row gap-12 lg:gap-8 justify-between relative"
          >
            {SITE_CONTENT.process.steps.map((step, index) => {
              const Icon = iconMap[step.icon] || Compass;
              return (
                <motion.div
                  key={step.number}
                  variants={FADE_UP_ANIMATION_VARIANTS}
                  className="relative flex lg:flex-col gap-6 lg:gap-8 lg:items-center lg:text-center w-full lg:w-1/5 group"
                >
                  {/* Step Number Background */}
                  <span className="absolute -top-6 -left-4 lg:top-auto lg:-top-12 lg:left-1/2 lg:-translate-x-1/2 text-8xl font-heading font-bold text-primary/5 select-none pointer-events-none">
                    {step.number}
                  </span>

                  {/* Icon Node */}
                  <div className="relative shrink-0 w-14 h-14 rounded-full bg-forest-deep border-2 border-primary flex items-center justify-center text-primary z-10 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all duration-300">
                    <Icon size={24} />
                    {/* Inner glowing dot */}
                    <div className="absolute inset-2 rounded-full bg-primary/20 animate-pulse" />
                  </div>

                  {/* Content */}
                  <div className="flex flex-col gap-2 pt-2 lg:pt-0">
                    <h3 className="font-heading text-xl text-foreground group-hover:text-primary transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
