"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin } from "lucide-react";
import { SITE_CONTENT } from "@/lib/constants";
import { FADE_UP_ANIMATION_VARIANTS, STAGGER_CONTAINER } from "@/lib/animations";
import { GoldButton } from "@/components/ui/GoldButton";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { saveLead } from "@/lib/adminStore";

export function ContactCTA() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    suburb: "",
    projectType: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveLead({
      id: crypto.randomUUID(),
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      suburb: formData.suburb,
      projectType: formData.projectType,
      message: formData.message,
      status: "new",
      createdAt: new Date().toISOString(),
    });
    alert("Thank you! We will contact you shortly.");
    setFormData({ name: "", email: "", phone: "", suburb: "", projectType: "", message: "" });
  };

  const inputClasses = "w-full bg-white/5 border border-white/10 rounded-lg px-4 pt-6 pb-2 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all peer placeholder-transparent";
  const labelClasses = "absolute left-4 top-4 text-muted-foreground text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-primary peer-focus:bg-forest-deep px-1";
  // Value check for floating label hack
  const getLabelClass = (value: string) => value ? "top-2 text-xs text-primary" : "";

  return (
    <section id="contact" className="py-24 md:py-32 bg-forest-deep relative z-10 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-forest-deep via-forest-deep to-primary/20 opacity-80 pointer-events-none" />
      <div className="absolute inset-0 bg-noise opacity-30 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-20">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* Left: Contact Info */}
          <motion.div
            variants={STAGGER_CONTAINER}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="w-full lg:w-5/12 flex flex-col gap-10"
          >
            <div>
              <SectionHeading title={SITE_CONTENT.contact.heading} centered={false} className="mb-6" />
              <motion.p variants={FADE_UP_ANIMATION_VARIANTS} className="text-xl text-foreground/80 leading-relaxed font-serif italic">
                {SITE_CONTENT.contact.subtext}
              </motion.p>
            </div>

            <motion.div variants={FADE_UP_ANIMATION_VARIANTS} className="flex flex-col gap-6 mt-4">
              <a href={`tel:${SITE_CONTENT.global.phone.replace(/\s+/g, '')}`} className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                  <Phone size={20} />
                </div>
                <span className="text-xl font-heading text-foreground group-hover:text-primary transition-colors">
                  {SITE_CONTENT.global.phone}
                </span>
              </a>

              <a href={`mailto:${SITE_CONTENT.global.email}`} className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                  <Mail size={20} />
                </div>
                <span className="text-lg text-foreground group-hover:text-primary transition-colors">
                  {SITE_CONTENT.global.email}
                </span>
              </a>
            </motion.div>

            <motion.div variants={FADE_UP_ANIMATION_VARIANTS} className="mt-8 pt-8 border-t border-white/10">
              <div className="flex items-center gap-3 mb-4 text-primary">
                <MapPin size={24} />
                <h4 className="font-heading text-xl">Service Areas</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {SITE_CONTENT.global.serviceAreas.map((area) => (
                  <span key={area} className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-foreground/80">
                    {area}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            variants={FADE_UP_ANIMATION_VARIANTS}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="w-full lg:w-7/12"
          >
            <form onSubmit={handleSubmit} className="glass-panel p-8 md:p-12 rounded-3xl flex flex-col gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Full Name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className={inputClasses}
                  />
                  <label htmlFor="name" className={`${labelClasses} ${getLabelClass(formData.name)}`}>
                    Full Name
                  </label>
                </div>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email Address"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className={inputClasses}
                  />
                  <label htmlFor="email" className={`${labelClasses} ${getLabelClass(formData.email)}`}>
                    Email Address
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    className={inputClasses}
                  />
                  <label htmlFor="phone" className={`${labelClasses} ${getLabelClass(formData.phone)}`}>
                    Phone Number
                  </label>
                </div>
                <div className="relative">
                  <select
                    name="suburb"
                    id="suburb"
                    required
                    value={formData.suburb}
                    onChange={handleChange}
                    className={`${inputClasses} appearance-none cursor-pointer ${formData.suburb ? '' : 'text-transparent'}`}
                  >
                    <option value="" disabled hidden></option>
                    {[...SITE_CONTENT.global.serviceAreas, "Other"].map((area) => (
                      <option key={area} value={area} className="text-foreground bg-forest-deep">{area}</option>
                    ))}
                  </select>
                  <label htmlFor="suburb" className={`${labelClasses} ${getLabelClass(formData.suburb)}`}>
                    Select Suburb
                  </label>
                </div>
              </div>

              <div className="relative">
                <select
                  name="projectType"
                  id="projectType"
                  required
                  value={formData.projectType}
                  onChange={handleChange}
                  className={`${inputClasses} appearance-none cursor-pointer ${formData.projectType ? '' : 'text-transparent'}`}
                >
                  <option value="" disabled hidden></option>
                  {SITE_CONTENT.contact.projectTypes.map((type) => (
                    <option key={type} value={type} className="text-foreground bg-forest-deep">{type}</option>
                  ))}
                </select>
                <label htmlFor="projectType" className={`${labelClasses} ${getLabelClass(formData.projectType)}`}>
                  Project Type
                </label>
              </div>

              <div className="relative">
                <textarea
                  name="message"
                  id="message"
                  rows={4}
                  placeholder="Tell us about your vision..."
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className={`${inputClasses} resize-none`}
                />
                <label htmlFor="message" className={`${labelClasses} ${getLabelClass(formData.message)}`}>
                  Tell us about your vision...
                </label>
              </div>

              <GoldButton type="submit" className="w-full mt-4 py-4 text-base">
                Book My Free Consultation
              </GoldButton>
            </form>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
