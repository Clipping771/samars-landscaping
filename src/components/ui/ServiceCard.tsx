"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, PenTool, Hammer, Sofa, Droplets, Lightbulb, Leaf } from "lucide-react";
import { FADE_UP_ANIMATION_VARIANTS } from "@/lib/animations";

const iconMap: Record<string, React.ElementType> = {
  PenTool,
  Hammer,
  Sofa,
  Droplets,
  Lightbulb,
  Leaf,
};

interface ServiceCardProps {
  title: string;
  description: string;
  iconName: string;
}

export function ServiceCard({ title, description, iconName }: ServiceCardProps) {
  const Icon = iconMap[iconName] || Leaf;

  return (
    <motion.div
      variants={FADE_UP_ANIMATION_VARIANTS}
      whileHover="hover"
      className="group glass-panel rounded-2xl p-8 flex flex-col gap-6 transition-all duration-300 hover:-translate-y-2 hover:border-primary/50 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <motion.div
        variants={{
          hover: { scale: 1.1, color: "var(--color-gold-hover)" },
        }}
        className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center text-primary"
      >
        <Icon strokeWidth={1.5} size={28} />
      </motion.div>

      <div className="flex flex-col gap-3 relative z-10">
        <h3 className="font-heading text-2xl text-foreground group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-muted-foreground leading-relaxed line-clamp-2">
          {description}
        </p>
      </div>

      <div className="mt-auto pt-4 relative z-10">
        <span className="inline-flex items-center gap-2 text-primary font-medium group-hover:text-gold-hover transition-colors">
          Learn More
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </span>
      </div>
    </motion.div>
  );
}
