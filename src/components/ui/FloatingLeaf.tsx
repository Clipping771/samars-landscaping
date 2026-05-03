"use client";

import React from "react";
import { motion } from "framer-motion";

interface FloatingLeafProps {
  delay?: number;
  duration?: number;
  size?: number;
  className?: string;
  startX?: string | number;
  startY?: string | number;
}

export function FloatingLeaf({
  delay = 0,
  duration = 15,
  size = 24,
  className,
  startX = "0%",
  startY = "0%",
}: FloatingLeafProps) {
  return (
    <motion.div
      className={`absolute pointer-events-none ${className}`}
      style={{ left: startX, top: startY }}
      animate={{
        y: ["0vh", "20vh", "-10vh", "30vh", "0vh"],
        x: ["0vw", "10vw", "-5vw", "15vw", "0vw"],
        rotate: [0, 90, 180, 270, 360],
        opacity: [0, 0.6, 0.3, 0.8, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
        delay,
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-primary/60"
      >
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
        <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
      </svg>
    </motion.div>
  );
}
