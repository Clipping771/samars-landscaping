"use client";

import React, { useState } from "react";
import { Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { useLeads } from "@/lib/useAdminData";
import type { Lead } from "@/lib/adminStore";

const statuses: Lead["status"][] = ["new", "contacted", "quoted", "won", "lost"];

export default function LeadsPage() {
  const { leads, setStatus, remove } = useLeads();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<Lead["status"] | "all">("all");

  const filtered = filterStatus === "all" ? leads : leads.filter((l) => l.status === filterStatus);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl text-foreground">Lead Manager</h1>
          <p className="text-muted-foreground text-sm mt-1">{leads.length} total leads</p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">Filter:</span>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as Lead["status"] | "all")}
            className="h-10 bg-white/5 border border-white/10 rounded-lg px-3 text-sm text-foreground focus:outline-none focus:border-primary appearance-none cursor-pointer"
          >
            <option value="all">All Statuses</option>
            {statuses.map((s) => (
              <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
            ))}
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="glass-panel rounded-2xl p-12 text-center">
          <p className="text-muted-foreground font-serif italic text-lg">
            {leads.length === 0
              ? "No leads yet. Contact form submissions will appear here."
              : "No leads with this status."}
          </p>
        </div>
      ) : (
        <div className="glass-panel rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-muted-foreground border-b border-white/10 bg-white/5">
                  <th className="p-4">Name</th>
                  <th className="p-4 hidden md:table-cell">Email</th>
                  <th className="p-4 hidden lg:table-cell">Suburb</th>
                  <th className="p-4 hidden lg:table-cell">Type</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 hidden md:table-cell">Date</th>
                  <th className="p-4 w-24">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((lead) => (
                  <React.Fragment key={lead.id}>
                    <tr
                      className="border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer"
                      onClick={() => setExpandedId(expandedId === lead.id ? null : lead.id)}
                    >
                      <td className="p-4 text-foreground font-medium">{lead.name}</td>
                      <td className="p-4 text-muted-foreground hidden md:table-cell">{lead.email}</td>
                      <td className="p-4 text-muted-foreground hidden lg:table-cell">{lead.suburb}</td>
                      <td className="p-4 text-muted-foreground hidden lg:table-cell">{lead.projectType}</td>
                      <td className="p-4"><StatusBadge status={lead.status} /></td>
                      <td className="p-4 text-muted-foreground hidden md:table-cell">
                        {new Date(lead.createdAt).toLocaleDateString()}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          {expandedId === lead.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              if (confirm("Delete this lead?")) remove(lead.id);
                            }}
                            className="text-destructive/60 hover:text-destructive transition-colors"
                            aria-label="Delete lead"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>

                    {/* Expanded Row */}
                    {expandedId === lead.id && (
                      <tr>
                        <td colSpan={7} className="p-6 bg-white/5 border-b border-white/10">
                          <div className="flex flex-col gap-4 max-w-2xl">
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div><span className="text-muted-foreground">Phone:</span> <span className="text-foreground ml-2">{lead.phone || "—"}</span></div>
                              <div><span className="text-muted-foreground">Suburb:</span> <span className="text-foreground ml-2">{lead.suburb}</span></div>
                            </div>
                            <div>
                              <p className="text-muted-foreground text-sm mb-1">Message:</p>
                              <p className="text-foreground bg-white/5 rounded-lg p-4 text-sm leading-relaxed">{lead.message}</p>
                            </div>
                            <div className="flex items-center gap-3 pt-2">
                              <span className="text-sm text-muted-foreground">Set status:</span>
                              {statuses.map((s) => (
                                <button
                                  key={s}
                                  onClick={() => setStatus(lead.id, s)}
                                  className={`px-3 py-1 rounded-full text-xs font-medium border transition-all ${
                                    lead.status === s
                                      ? "bg-primary/20 text-primary border-primary/30"
                                      : "bg-white/5 text-muted-foreground border-white/10 hover:border-primary/30"
                                  }`}
                                >
                                  {s}
                                </button>
                              ))}
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
