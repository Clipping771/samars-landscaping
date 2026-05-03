"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { FADE_UP_ANIMATION_VARIANTS } from "@/lib/animations";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export function SectionHeading({
  title,
  subtitle,
  centered = true,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-16 flex flex-col gap-4",
        centered ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      <motion.div
        variants={FADE_UP_ANIMATION_VARIANTS}
        className="flex flex-col gap-2 items-center"
      >
        <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-foreground">
          {title}
        </h2>
        <div className="h-[2px] w-24 bg-primary mt-2" />
      </motion.div>
      {subtitle && (
        <motion.p
          variants={FADE_UP_ANIMATION_VARIANTS}
          className="font-serif italic text-xl md:text-2xl text-muted-foreground mt-4 max-w-2xl"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
