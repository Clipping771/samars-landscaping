"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AnimatedResultProps {
  value: string | number;
  label?: string;
  unit?: string;
  className?: string;
}

export function AnimatedResult({ value, label, unit, className = "" }: AnimatedResultProps) {
  const [key, setKey] = useState(0);

  useEffect(() => {
    // Only animate if value actually changes and is not empty/"-"
    if (value !== "—" && value !== "" && value !== 0) {
      setKey((prev) => prev + 1);
    }
  }, [value]);

  return (
    <div className={`flex flex-col ${className}`}>
      {label && <span className="text-sm text-muted-foreground uppercase tracking-wider mb-1">{label}</span>}
      <div className="flex items-baseline gap-2">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={key}
            initial={{ color: "var(--color-gold-hover)", scale: 1.1 }}
            animate={{ color: "var(--color-foreground)", scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="font-heading text-3xl md:text-4xl text-foreground font-semibold tracking-wide"
          >
            {value}
          </motion.span>
        </AnimatePresence>
        {unit && value !== "—" && (
          <span className="text-lg text-primary font-medium">{unit}</span>
        )}
      </div>
    </div>
  );
}
