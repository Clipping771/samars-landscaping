"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { SITE_CONTENT } from "@/lib/constants";
import { STAGGER_CONTAINER, FADE_UP_ANIMATION_VARIANTS } from "@/lib/animations";

export function WhyChooseUs() {
  return (
    <section id="about" className="py-24 md:py-32 lg:py-40 bg-background relative z-10 overflow-hidden">
      <div className="absolute inset-0 bg-noise opacity-50 pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-20">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Left: Image Collage */}
          <div className="w-full lg:w-1/2 relative h-[500px] sm:h-[600px] md:h-[700px]">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
              whileInView={{ opacity: 1, scale: 1, rotate: -2 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8 }}
              className="absolute left-0 top-0 w-2/3 h-2/3 rounded-2xl overflow-hidden shadow-2xl z-10"
            >
              <Image
                src={SITE_CONTENT.whyChooseUs.images[0].src}
                alt={SITE_CONTENT.whyChooseUs.images[0].alt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 66vw, 33vw"
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: 3 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 3 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="absolute right-0 top-[15%] w-1/2 h-[55%] rounded-2xl overflow-hidden shadow-2xl z-20 border-4 border-background"
            >
              <Image
                src={SITE_CONTENT.whyChooseUs.images[1].src}
                alt={SITE_CONTENT.whyChooseUs.images[1].alt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="absolute left-[15%] bottom-0 w-[70%] h-[40%] rounded-2xl overflow-hidden shadow-2xl z-30 border-4 border-background"
            >
              <Image
                src={SITE_CONTENT.whyChooseUs.images[2].src}
                alt={SITE_CONTENT.whyChooseUs.images[2].alt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 70vw, 35vw"
              />
            </motion.div>
          </div>

          {/* Right: Content */}
          <div className="w-full lg:w-1/2 flex flex-col gap-8">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              variants={FADE_UP_ANIMATION_VARIANTS}
            >
              <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-foreground mb-4 leading-tight">
                {SITE_CONTENT.whyChooseUs.heading}
              </h2>
              <div className="h-[2px] w-24 bg-primary" />
            </motion.div>

            <motion.ul
              variants={STAGGER_CONTAINER}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              className="flex flex-col gap-6 mt-4"
            >
              {SITE_CONTENT.whyChooseUs.points.map((point, index) => (
                <motion.li
                  key={index}
                  variants={FADE_UP_ANIMATION_VARIANTS}
                  className="flex items-center gap-4 group"
                >
                  <div className="shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    <CheckCircle2 size={18} />
                  </div>
                  <span className="font-serif text-xl md:text-2xl text-foreground/90">
                    {point}
                  </span>
                </motion.li>
              ))}
            </motion.ul>
          </div>
          
        </div>
      </div>
    </section>
  );
}
