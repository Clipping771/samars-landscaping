"use client";

import { useState, useEffect, useCallback } from "react";
import {
  getLeads, Lead, saveLead, updateLeadStatus, deleteLead,
  getProjects, AdminProject, saveProject, deleteProject,
  getTestimonials, AdminTestimonial, saveTestimonial, deleteTestimonial,
  getSiteSettings, SiteSettings, saveSiteSettings,
  getQuoteLogs, QuoteLog, deleteQuoteLog,
} from "./adminStore";

function useStorageData<T>(getter: () => T, deps?: unknown[]): [T, () => void] {
  const [data, setData] = useState<T>(getter);
  const refresh = useCallback(() => setData(getter()), [getter]);

  useEffect(() => {
    refresh();
  }, deps || []); // eslint-disable-line react-hooks/exhaustive-deps

  return [data, refresh];
}

export function useLeads() {
  const [leads, refresh] = useStorageData(getLeads);

  return {
    leads,
    refresh,
    addLead: (lead: Lead) => { saveLead(lead); refresh(); },
    setStatus: (id: string, status: Lead["status"]) => { updateLeadStatus(id, status); refresh(); },
    remove: (id: string) => { deleteLead(id); refresh(); },
  };
}

export function useProjects() {
  const [projects, setProjects] = useState<AdminProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProjects = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/projects");
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
      }
    } catch (e) {
      console.error("Failed to fetch projects", e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return {
    projects,
    isLoading,
    refresh: fetchProjects,
    save: async (p: AdminProject) => {
      try {
        await fetch("/api/projects", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(p),
        });
        await fetchProjects();
      } catch (e) {
        console.error("Failed to save project", e);
      }
    },
    remove: async (id: string) => {
      try {
        await fetch(`/api/projects?id=${id}`, { method: "DELETE" });
        await fetchProjects();
      } catch (e) {
        console.error("Failed to delete project", e);
      }
    },
  };
}

export function useTestimonials() {
  const [testimonials, refresh] = useStorageData(getTestimonials);

  return {
    testimonials,
    refresh,
    save: (t: AdminTestimonial) => { saveTestimonial(t); refresh(); },
    remove: (id: string) => { deleteTestimonial(id); refresh(); },
  };
}

export function useSettings() {
  const [settings, refresh] = useStorageData(getSiteSettings);

  return {
    settings,
    refresh,
    save: (s: SiteSettings) => { saveSiteSettings(s); refresh(); },
  };
}

export function useQuoteLogs() {
  const [logs, refresh] = useStorageData(getQuoteLogs);

  return {
    logs,
    refresh,
    remove: (id: string) => { deleteQuoteLog(id); refresh(); },
  };
}
