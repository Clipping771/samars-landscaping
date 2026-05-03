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
  const [projects, refresh] = useStorageData(getProjects);

  return {
    projects,
    refresh,
    save: (p: AdminProject) => { saveProject(p); refresh(); },
    remove: (id: string) => { deleteProject(id); refresh(); },
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
