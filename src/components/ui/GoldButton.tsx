"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface GoldButtonProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode;
  variant?: "filled" | "ghost";
  className?: string;
}

export function GoldButton({
  children,
  variant = "filled",
  className,
  ...props
}: GoldButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "rounded-full px-8 py-3 text-sm font-medium tracking-wide transition-colors duration-300",
        variant === "filled"
          ? "bg-primary text-primary-foreground hover:bg-gold-hover shadow-lg shadow-gold-accent/20"
          : "border-2 border-primary text-primary hover:bg-primary/10",
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
}
