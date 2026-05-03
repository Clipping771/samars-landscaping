"use client";

import React from "react";
import Link from "next/link";
import { MessageSquare, FolderOpen, Star, FileText } from "lucide-react";
import { KPICard } from "@/components/admin/KPICard";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { useLeads, useProjects, useTestimonials, useQuoteLogs } from "@/lib/useAdminData";

export default function AdminDashboard() {
  const { leads } = useLeads();
  const { projects } = useProjects();
  const { testimonials } = useTestimonials();
  const { logs } = useQuoteLogs();

  const newLeads = leads.filter((l) => l.status === "new").length;
  const recentLeads = leads.slice(0, 5);

  return (
    <div className="flex flex-col gap-10">
      <div>
        <h1 className="font-heading text-3xl md:text-4xl text-foreground mb-2">Dashboard</h1>
        <p className="text-muted-foreground font-serif italic">Welcome back, Samar.</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard label="Total Leads" value={leads.length} icon={<MessageSquare size={20} />} accent />
        <KPICard label="New (Unread)" value={newLeads} icon={<MessageSquare size={20} />} />
        <KPICard label="Projects" value={projects.length} icon={<FolderOpen size={20} />} />
        <KPICard label="Testimonials" value={testimonials.length} icon={<Star size={20} />} />
      </div>

      {/* Recent Activity */}
      <div className="glass-panel rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-heading text-xl text-foreground">Recent Leads</h2>
          <Link href="/admin/leads" className="text-sm text-primary hover:text-gold-hover transition-colors">
            View All →
          </Link>
        </div>

        {recentLeads.length === 0 ? (
          <p className="text-muted-foreground text-center py-12 font-serif italic">
            No leads yet. Submissions from the contact form will appear here.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-muted-foreground border-b border-white/10">
                  <th className="pb-3 px-2">Name</th>
                  <th className="pb-3 px-2 hidden md:table-cell">Suburb</th>
                  <th className="pb-3 px-2 hidden md:table-cell">Project</th>
                  <th className="pb-3 px-2">Status</th>
                  <th className="pb-3 px-2 hidden lg:table-cell">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentLeads.map((lead) => (
                  <tr key={lead.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="py-3 px-2 text-foreground font-medium">{lead.name}</td>
                    <td className="py-3 px-2 text-muted-foreground hidden md:table-cell">{lead.suburb}</td>
                    <td className="py-3 px-2 text-muted-foreground hidden md:table-cell">{lead.projectType}</td>
                    <td className="py-3 px-2"><StatusBadge status={lead.status} /></td>
                    <td className="py-3 px-2 text-muted-foreground hidden lg:table-cell">
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link href="/admin/projects" className="glass-panel rounded-xl p-5 hover:border-primary/50 transition-all text-center group">
          <FolderOpen size={24} className="mx-auto mb-3 text-primary group-hover:scale-110 transition-transform" />
          <p className="font-heading text-foreground">Manage Projects</p>
        </Link>
        <Link href="/admin/testimonials" className="glass-panel rounded-xl p-5 hover:border-primary/50 transition-all text-center group">
          <Star size={24} className="mx-auto mb-3 text-primary group-hover:scale-110 transition-transform" />
          <p className="font-heading text-foreground">Manage Testimonials</p>
        </Link>
        <Link href="/admin/quotes" className="glass-panel rounded-xl p-5 hover:border-primary/50 transition-all text-center group">
          <FileText size={24} className="mx-auto mb-3 text-primary group-hover:scale-110 transition-transform" />
          <p className="font-heading text-foreground">Quote History</p>
        </Link>
      </div>
    </div>
  );
}
