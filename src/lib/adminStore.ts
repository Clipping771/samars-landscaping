// localStorage helpers for admin data persistence

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  suburb: string;
  projectType: string;
  message: string;
  status: "new" | "contacted" | "quoted" | "won" | "lost";
  createdAt: string;
}

export interface AdminProject {
  id: string;
  name: string;
  suburb: string;
  description: string;
  beforeImage: string;
  afterImage: string;
  createdAt: string;
}

export interface AdminTestimonial {
  id: string;
  quote: string;
  author: string;
  suburb: string;
  rating: number;
  visible: boolean;
  createdAt: string;
}

export interface SiteSettings {
  phone: string;
  email: string;
  abn: string;
  heroHeadline: string;
  heroSubheading: string;
  serviceAreas: string[];
}

export interface QuoteLog {
  id: string;
  module: string;
  inputs: Record<string, string | number>;
  outputs: Record<string, string | number>;
  createdAt: string;
}

const KEYS = {
  leads: "sl_admin_leads",
  projects: "sl_admin_projects",
  testimonials: "sl_admin_testimonials",
  settings: "sl_admin_settings",
  quotes: "sl_admin_quotes",
} as const;

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, data: T): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(data));
}

// --- Leads ---
export function getLeads(): Lead[] {
  return read<Lead[]>(KEYS.leads, []);
}

export function saveLead(lead: Lead): void {
  const leads = getLeads();
  leads.unshift(lead);
  write(KEYS.leads, leads);
}

export function updateLeadStatus(id: string, status: Lead["status"]): void {
  const leads = getLeads().map((l) => (l.id === id ? { ...l, status } : l));
  write(KEYS.leads, leads);
}

export function deleteLead(id: string): void {
  write(KEYS.leads, getLeads().filter((l) => l.id !== id));
}

// --- Projects ---
export function getProjects(): AdminProject[] {
  return read<AdminProject[]>(KEYS.projects, []);
}

export function saveProject(project: AdminProject): void {
  const projects = getProjects();
  const idx = projects.findIndex((p) => p.id === project.id);
  if (idx >= 0) {
    projects[idx] = project;
  } else {
    projects.unshift(project);
  }
  write(KEYS.projects, projects);
}

export function deleteProject(id: string): void {
  write(KEYS.projects, getProjects().filter((p) => p.id !== id));
}

// --- Testimonials ---
export function getTestimonials(): AdminTestimonial[] {
  return read<AdminTestimonial[]>(KEYS.testimonials, []);
}

export function saveTestimonial(t: AdminTestimonial): void {
  const list = getTestimonials();
  const idx = list.findIndex((x) => x.id === t.id);
  if (idx >= 0) {
    list[idx] = t;
  } else {
    list.unshift(t);
  }
  write(KEYS.testimonials, list);
}

export function deleteTestimonial(id: string): void {
  write(KEYS.testimonials, getTestimonials().filter((t) => t.id !== id));
}

export function reorderTestimonials(ids: string[]): void {
  const list = getTestimonials();
  const ordered = ids.map((id) => list.find((t) => t.id === id)!).filter(Boolean);
  write(KEYS.testimonials, ordered);
}

// --- Site Settings ---
export function getSiteSettings(): SiteSettings | null {
  return read<SiteSettings | null>(KEYS.settings, null);
}

export function saveSiteSettings(settings: SiteSettings): void {
  write(KEYS.settings, settings);
}

// --- Quote Logs ---
export function getQuoteLogs(): QuoteLog[] {
  return read<QuoteLog[]>(KEYS.quotes, []);
}

export function saveQuoteLog(log: QuoteLog): void {
  const logs = getQuoteLogs();
  logs.unshift(log);
  write(KEYS.quotes, logs);
}

export function deleteQuoteLog(id: string): void {
  write(KEYS.quotes, getQuoteLogs().filter((q) => q.id !== id));
}
