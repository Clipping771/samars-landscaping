"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { SITE_CONTENT } from "@/lib/constants";
import { HERO_STAGGER_CONTAINER, FADE_UP_ANIMATION_VARIANTS } from "@/lib/animations";
import { FloatingLeaf } from "@/components/ui/FloatingLeaf";
import { GoldButton } from "@/components/ui/GoldButton";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const leaves = [
    { startX: "10%", startY: "-10%", delay: 0, duration: 18, size: 24 },
    { startX: "30%", startY: "20%", delay: 3, duration: 20, size: 16 },
    { startX: "70%", startY: "10%", delay: 1, duration: 15, size: 32 },
    { startX: "85%", startY: "50%", delay: 5, duration: 22, size: 20 },
    { startX: "15%", startY: "60%", delay: 2, duration: 16, size: 28 },
    { startX: "50%", startY: "40%", delay: 4, duration: 19, size: 22 },
    { startX: "90%", startY: "80%", delay: 6, duration: 25, size: 18 },
    { startX: "25%", startY: "85%", delay: 2.5, duration: 17, size: 26 },
  ];

  return (
    <section ref={ref} id="home" className="relative h-screen w-full overflow-hidden bg-background">
      {/* Parallax Background */}
      <motion.div
        className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,var(--color-forest-mid)_0%,var(--color-background)_100%)]"
        style={{ y: backgroundY }}
      />
      
      {/* Noise Grain */}
      <div className="absolute inset-0 z-0 bg-noise pointer-events-none" />

      {/* Floating Leaves */}
      <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
        {leaves.map((leaf, i) => (
          <FloatingLeaf key={i} {...leaf} />
        ))}
      </div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4"
      >
        <motion.div
          variants={HERO_STAGGER_CONTAINER}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center max-w-5xl"
        >
          <motion.span
            variants={FADE_UP_ANIMATION_VARIANTS}
            className="font-heading uppercase tracking-[0.2em] text-primary text-sm md:text-base font-semibold mb-6"
          >
            {SITE_CONTENT.hero.eyebrow}
          </motion.span>
          
          <motion.h1
            variants={FADE_UP_ANIMATION_VARIANTS}
            className="font-heading text-5xl md:text-7xl lg:text-8xl text-foreground mb-6 leading-tight drop-shadow-2xl"
          >
            {SITE_CONTENT.hero.headline}
          </motion.h1>
          
          <motion.p
            variants={FADE_UP_ANIMATION_VARIANTS}
            className="font-serif italic text-2xl md:text-3xl lg:text-4xl text-foreground/80 mb-12"
          >
            {SITE_CONTENT.hero.subheading}
          </motion.p>
          
          <motion.div
            variants={FADE_UP_ANIMATION_VARIANTS}
            className="flex flex-col sm:flex-row gap-6 items-center"
          >
            <GoldButton onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}>
              {SITE_CONTENT.hero.primaryCTA}
            </GoldButton>
            <GoldButton variant="ghost">
              {SITE_CONTENT.hero.secondaryCTA}
            </GoldButton>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 text-primary cursor-pointer"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
      >
        <ChevronDown size={32} />
      </motion.div>
    </section>
  );
}
