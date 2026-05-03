"use client";

import React, { useState, useEffect } from "react";
import { Save, Plus, X } from "lucide-react";
import { useSettings } from "@/lib/useAdminData";
import { SITE_CONTENT } from "@/lib/constants";
import type { SiteSettings } from "@/lib/adminStore";

export default function SettingsPage() {
  const { settings, save } = useSettings();
  const [form, setForm] = useState<SiteSettings>({
    phone: SITE_CONTENT.global.phone,
    email: SITE_CONTENT.global.email,
    abn: SITE_CONTENT.global.abn,
    heroHeadline: SITE_CONTENT.hero.headline,
    heroSubheading: SITE_CONTENT.hero.subheading,
    serviceAreas: [...SITE_CONTENT.global.serviceAreas],
  });
  const [saved, setSaved] = useState(false);
  const [newArea, setNewArea] = useState("");

  useEffect(() => {
    if (settings) {
      setForm(settings);
    }
  }, [settings]);

  const handleSave = () => {
    save(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const addArea = () => {
    if (newArea.trim() && !form.serviceAreas.includes(newArea.trim())) {
      setForm({ ...form, serviceAreas: [...form.serviceAreas, newArea.trim()] });
      setNewArea("");
    }
  };

  const removeArea = (area: string) => {
    setForm({ ...form, serviceAreas: form.serviceAreas.filter((a) => a !== area) });
  };

  const inputClass = "w-full h-12 bg-white/5 border border-white/10 rounded-lg px-4 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all";

  return (
    <div className="flex flex-col gap-8 max-w-2xl">
      <div>
        <h1 className="font-heading text-3xl text-foreground">Site Settings</h1>
        <p className="text-muted-foreground text-sm mt-1">Edit key site information without touching code.</p>
      </div>

      <div className="glass-panel rounded-2xl p-8 flex flex-col gap-6">
        <h2 className="font-heading text-xl text-foreground border-b border-white/10 pb-4">Contact Details</h2>
        <div className="flex flex-col gap-4">
          <label className="flex flex-col gap-2">
            <span className="text-sm text-foreground/80 font-medium">Phone Number</span>
            <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputClass} />
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-sm text-foreground/80 font-medium">Email</span>
            <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} />
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-sm text-foreground/80 font-medium">ABN</span>
            <input value={form.abn} onChange={(e) => setForm({ ...form, abn: e.target.value })} className={inputClass} />
          </label>
        </div>
      </div>

      <div className="glass-panel rounded-2xl p-8 flex flex-col gap-6">
        <h2 className="font-heading text-xl text-foreground border-b border-white/10 pb-4">Hero Section</h2>
        <div className="flex flex-col gap-4">
          <label className="flex flex-col gap-2">
            <span className="text-sm text-foreground/80 font-medium">Headline</span>
            <input value={form.heroHeadline} onChange={(e) => setForm({ ...form, heroHeadline: e.target.value })} className={inputClass} />
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-sm text-foreground/80 font-medium">Subheading</span>
            <input value={form.heroSubheading} onChange={(e) => setForm({ ...form, heroSubheading: e.target.value })} className={inputClass} />
          </label>
        </div>
      </div>

      <div className="glass-panel rounded-2xl p-8 flex flex-col gap-6">
        <h2 className="font-heading text-xl text-foreground border-b border-white/10 pb-4">Service Areas</h2>
        <div className="flex flex-wrap gap-2">
          {form.serviceAreas.map((area) => (
            <span key={area} className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-foreground/80">
              {area}
              <button onClick={() => removeArea(area)} className="text-muted-foreground hover:text-destructive transition-colors">
                <X size={14} />
              </button>
            </span>
          ))}
        </div>
        <div className="flex gap-3">
          <input
            value={newArea}
            onChange={(e) => setNewArea(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addArea()}
            placeholder="Add new suburb..."
            className={`${inputClass} flex-1`}
          />
          <button onClick={addArea} className="px-4 bg-white/10 border border-white/10 rounded-lg hover:border-primary/50 transition-colors">
            <Plus size={18} className="text-primary" />
          </button>
        </div>
      </div>

      {/* Save */}
      <button
        onClick={handleSave}
        className={`flex items-center justify-center gap-2 h-12 rounded-lg font-medium text-sm transition-all ${
          saved
            ? "bg-green-500/20 text-green-400 border border-green-500/30"
            : "bg-primary text-primary-foreground hover:bg-gold-hover"
        }`}
      >
        <Save size={16} />
        {saved ? "Saved Successfully!" : "Save All Settings"}
      </button>
    </div>
  );
}
