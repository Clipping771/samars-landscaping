"use client";

import React from "react";
import type { Lead } from "@/lib/adminStore";

const statusColors: Record<Lead["status"], string> = {
  new: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  contacted: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  quoted: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  won: "bg-green-500/20 text-green-400 border-green-500/30",
  lost: "bg-red-500/20 text-red-400 border-red-500/30",
};

export function StatusBadge({ status }: { status: Lead["status"] }) {
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border ${statusColors[status]}`}>
      {status}
    </span>
  );
}
