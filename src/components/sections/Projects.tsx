"use client";

import React from "react";
import { motion } from "framer-motion";
import { SITE_CONTENT } from "@/lib/constants";
import { STAGGER_CONTAINER, FADE_UP_ANIMATION_VARIANTS } from "@/lib/animations";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BeforeAfterSlider } from "@/components/ui/BeforeAfterSlider";

export function Projects() {
  return (
    <section id="projects" className="py-24 md:py-32 lg:py-40 bg-forest-deep relative z-10">
      {/* Background Gradient */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      
      <div className="container mx-auto px-6 relative z-20">
        <SectionHeading title={SITE_CONTENT.portfolio.heading} />
        
        <motion.div
          variants={STAGGER_CONTAINER}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-16"
        >
          {SITE_CONTENT.portfolio.projects.map((project) => (
            <motion.div
              key={project.id}
              variants={FADE_UP_ANIMATION_VARIANTS}
              className="flex flex-col gap-6"
            >
              <BeforeAfterSlider
                beforeImage={project.beforeImage}
                afterImage={project.afterImage}
                alt={project.name}
              />
              <div className="flex flex-col gap-2 px-2">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-heading text-2xl text-foreground">
                    {project.name}
                  </h3>
                  <span className="text-xs font-semibold tracking-wider uppercase text-primary bg-primary/10 px-3 py-1 rounded-full whitespace-nowrap">
                    {project.suburb}
                  </span>
                </div>
                <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                  {project.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
