"use client";

import React from "react";
import { motion } from "framer-motion";
import { SITE_CONTENT } from "@/lib/constants";
import { STAGGER_CONTAINER } from "@/lib/animations";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCard } from "@/components/ui/ServiceCard";

export function Services() {
  return (
    <section id="services" className="py-24 md:py-32 lg:py-40 bg-background relative z-10">
      <div className="absolute inset-0 bg-noise opacity-50 pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-20">
        <SectionHeading title={SITE_CONTENT.services.heading} />
        
        <motion.div
          variants={STAGGER_CONTAINER}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16"
        >
          {SITE_CONTENT.services.items.map((service) => (
            <ServiceCard
              key={service.id}
              title={service.title}
              description={service.description}
              iconName={service.icon}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
