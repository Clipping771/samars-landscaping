"use client";

import React from "react";
import { Star, Quote } from "lucide-react";

interface TestimonialCardProps {
  quote: string;
  author: string;
  suburb: string;
  rating: number;
}

export function TestimonialCard({ quote, author, suburb, rating }: TestimonialCardProps) {
  return (
    <div className="flex flex-col items-center text-center px-4 md:px-12 py-8 select-none">
      <Quote size={48} className="text-primary/20 mb-6" />
      <p className="font-serif italic text-2xl md:text-3xl lg:text-4xl leading-relaxed text-foreground mb-8">
        "{quote}"
      </p>
      <div className="flex gap-1 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={20}
            className={i < rating ? "fill-primary text-primary" : "text-muted"}
          />
        ))}
      </div>
      <h4 className="font-heading text-lg font-semibold tracking-wide uppercase text-foreground">
        {author}
      </h4>
      <span className="text-sm text-muted-foreground mt-1 tracking-widest uppercase">
        {suburb}
      </span>
    </div>
  );
}
