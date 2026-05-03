"use client";

import React from "react";
import { motion } from "framer-motion";

interface KPICardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  accent?: boolean;
}

export function KPICard({ label, value, icon, accent }: KPICardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`glass-panel rounded-2xl p-6 flex items-center gap-5 ${accent ? "border-primary/30" : ""}`}
    >
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${accent ? "bg-primary/20 text-primary" : "bg-white/10 text-foreground/60"}`}>
        {icon}
      </div>
      <div>
        <p className="text-2xl font-heading font-semibold text-foreground">{value}</p>
        <p className="text-sm text-muted-foreground">{label}</p>
      </div>
    </motion.div>
  );
}
