"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface CalcInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  unit?: string;
}

export function CalcInput({ label, error, unit, className, ...props }: CalcInputProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm text-foreground/80 font-medium tracking-wide">
        {label}
      </label>
      <div className="relative">
        <input
          {...props}
          className={cn(
            "w-full h-12 bg-white/5 border rounded-lg px-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 transition-all",
            error
              ? "border-destructive focus:border-destructive focus:ring-destructive"
              : "border-white/10 focus:border-primary focus:ring-primary",
            unit ? "pr-12" : "",
            className
          )}
        />
        {unit && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
            {unit}
          </span>
        )}
      </div>
      {error && <span className="text-xs text-destructive">{error}</span>}
    </div>
  );
}

interface CalcSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: { value: string; label: string }[];
}

export function CalcSelect({ label, options, className, ...props }: CalcSelectProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm text-foreground/80 font-medium tracking-wide">
        {label}
      </label>
      <select
        {...props}
        className={cn(
          "w-full h-12 bg-[#0f1f0f] border border-white/10 rounded-lg px-4 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all appearance-none cursor-pointer",
          className
        )}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
