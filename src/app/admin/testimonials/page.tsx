"use client";

import React, { useState } from "react";
import { Plus, Trash2, Eye, EyeOff, X, Save, Star } from "lucide-react";
import { useTestimonials } from "@/lib/useAdminData";
import type { AdminTestimonial } from "@/lib/adminStore";

export default function TestimonialsPage() {
  const { testimonials, save, remove } = useTestimonials();
  const [editing, setEditing] = useState<AdminTestimonial | null>(null);
  const [isNew, setIsNew] = useState(false);

  const openNew = () => {
    setEditing({
      id: crypto.randomUUID(),
      quote: "", author: "", suburb: "", rating: 5, visible: true,
      createdAt: new Date().toISOString(),
    });
    setIsNew(true);
  };

  const handleSave = () => {
    if (!editing || !editing.quote.trim()) return;
    save(editing);
    setEditing(null);
    setIsNew(false);
  };

  const toggleVisibility = (t: AdminTestimonial) => {
    save({ ...t, visible: !t.visible });
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl text-foreground">Testimonials</h1>
          <p className="text-muted-foreground text-sm mt-1">{testimonials.length} reviews</p>
        </div>
        <button onClick={openNew} className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium text-sm hover:bg-gold-hover transition-colors">
          <Plus size={16} /> Add Testimonial
        </button>
      </div>

      {/* Edit Modal */}
      {editing && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-panel rounded-2xl p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading text-2xl text-foreground">{isNew ? "New Testimonial" : "Edit Testimonial"}</h2>
              <button onClick={() => setEditing(null)} className="text-muted-foreground hover:text-foreground"><X size={20} /></button>
            </div>
            <div className="flex flex-col gap-4">
              <textarea placeholder="Client's testimonial..." rows={4} value={editing.quote} onChange={(e) => setEditing({ ...editing, quote: e.target.value })} className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-foreground focus:border-primary focus:outline-none resize-none" />
              <div className="grid grid-cols-2 gap-4">
                <input placeholder="Client Name" value={editing.author} onChange={(e) => setEditing({ ...editing, author: e.target.value })} className="h-12 bg-white/5 border border-white/10 rounded-lg px-4 text-foreground focus:border-primary focus:outline-none" />
                <input placeholder="Suburb" value={editing.suburb} onChange={(e) => setEditing({ ...editing, suburb: e.target.value })} className="h-12 bg-white/5 border border-white/10 rounded-lg px-4 text-foreground focus:border-primary focus:outline-none" />
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">Rating:</span>
                {[1, 2, 3, 4, 5].map((n) => (
                  <button key={n} onClick={() => setEditing({ ...editing, rating: n })}>
                    <Star size={20} className={n <= editing.rating ? "fill-primary text-primary" : "text-muted-foreground"} />
                  </button>
                ))}
              </div>
              <button onClick={handleSave} className="flex items-center justify-center gap-2 h-12 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-gold-hover transition-colors mt-2">
                <Save size={16} /> Save Testimonial
              </button>
            </div>
          </div>
        </div>
      )}

      {/* List */}
      {testimonials.length === 0 ? (
        <div className="glass-panel rounded-2xl p-12 text-center">
          <p className="text-muted-foreground font-serif italic text-lg">No testimonials yet.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {testimonials.map((t) => (
            <div key={t.id} className={`glass-panel rounded-2xl p-6 flex flex-col md:flex-row md:items-start gap-5 transition-opacity ${!t.visible ? "opacity-50" : ""}`}>
              <div className="flex-1">
                <p className="text-foreground font-serif italic leading-relaxed mb-3">&quot;{t.quote}&quot;</p>
                <div className="flex items-center gap-3">
                  <span className="text-foreground font-medium">{t.author}</span>
                  <span className="text-muted-foreground text-sm">{t.suburb}</span>
                  <div className="flex gap-0.5 ml-auto">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <Star key={n} size={14} className={n <= t.rating ? "fill-primary text-primary" : "text-muted"} />
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <button onClick={() => toggleVisibility(t)} className="p-2 rounded-lg hover:bg-white/10 transition-colors" title={t.visible ? "Hide from site" : "Show on site"}>
                  {t.visible ? <Eye size={18} className="text-primary" /> : <EyeOff size={18} className="text-muted-foreground" />}
                </button>
                <button onClick={() => { setEditing({ ...t }); setIsNew(false); }} className="p-2 rounded-lg hover:bg-white/10 transition-colors text-muted-foreground hover:text-foreground">
                  <Star size={18} />
                </button>
                <button onClick={() => { if (confirm("Delete?")) remove(t.id); }} className="p-2 rounded-lg hover:bg-destructive/20 transition-colors text-muted-foreground hover:text-destructive">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
