"use client";

import React, { useState } from "react";
import { Plus, Trash2, Edit, X, Save } from "lucide-react";
import { useProjects } from "@/lib/useAdminData";
import type { AdminProject } from "@/lib/adminStore";

const emptyProject: Omit<AdminProject, "id" | "createdAt"> = {
  name: "", suburb: "", description: "", beforeImage: "", afterImage: "", images: [],
};

export default function ProjectsPage() {
  const { projects, isLoading, isSaving, save, remove } = useProjects();
  const [editing, setEditing] = useState<AdminProject | null>(null);
  const [isNew, setIsNew] = useState(false);

  const openNew = () => {
    setEditing({ ...emptyProject, id: crypto.randomUUID(), createdAt: new Date().toISOString() });
    setIsNew(true);
  };

  const openEdit = (p: AdminProject) => {
    setEditing({ ...p, images: p.images || [] });
    setIsNew(false);
  };

  const handleSave = async () => {
    if (!editing || !editing.name.trim()) return;
    await save(editing);
    setEditing(null);
    setIsNew(false);
  };

  const resizeImage = (base64: string): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;
        const max = 1200; // Max width/height
        
        if (width > height && width > max) {
          height *= max / width;
          width = max;
        } else if (height > max) {
          width *= max / height;
          height = max;
        }
        
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", 0.8)); // 80% quality JPEG
      };
      img.src = base64;
    });
  };

  const addImages = (files: FileList | null) => {
    if (!files || !editing) return;
    
    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const originalBase64 = reader.result as string;
        const resizedBase64 = await resizeImage(originalBase64);
        
        setEditing(prev => {
          if (!prev) return null;
          const newImages = [...(prev.images || []), resizedBase64];
          
          let { beforeImage, afterImage } = prev;
          if (!beforeImage) beforeImage = resizedBase64;
          else if (!afterImage) afterImage = resizedBase64;
          
          return { ...prev, images: newImages, beforeImage, afterImage };
        });
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setEditing(prev => {
      if (!prev) return null;
      const newImages = [...prev.images];
      const removedUrl = newImages[index];
      newImages.splice(index, 1);
      
      let { beforeImage, afterImage } = prev;
      if (beforeImage === removedUrl) beforeImage = newImages[0] || "";
      if (afterImage === removedUrl) afterImage = newImages[1] || newImages[0] || "";
      
      return { ...prev, images: newImages, beforeImage, afterImage };
    });
  };

  const setAsBefore = (img: string) => {
    setEditing(prev => prev ? ({ ...prev, beforeImage: img }) : null);
  };

  const setAsAfter = (img: string) => {
    setEditing(prev => prev ? ({ ...prev, afterImage: img }) : null);
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl text-foreground">Portfolio Manager</h1>
          <p className="text-muted-foreground text-sm mt-1">{projects.length} projects</p>
        </div>
        <button onClick={openNew} className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium text-sm hover:bg-gold-hover transition-colors">
          <Plus size={16} /> Add Project
        </button>
      </div>

      {/* Edit Modal */}
      {editing && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-panel rounded-2xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading text-2xl text-foreground">{isNew ? "New Project" : "Edit Project"}</h2>
              <button onClick={() => setEditing(null)} className="text-muted-foreground hover:text-foreground"><X size={20} /></button>
            </div>
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <input placeholder="Project Name" value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} className="h-12 bg-white/5 border border-white/10 rounded-lg px-4 text-foreground focus:border-primary focus:outline-none" />
                <input placeholder="Suburb" value={editing.suburb} onChange={(e) => setEditing({ ...editing, suburb: e.target.value })} className="h-12 bg-white/5 border border-white/10 rounded-lg px-4 text-foreground focus:border-primary focus:outline-none" />
              </div>
              <textarea placeholder="Description" rows={3} value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-foreground focus:border-primary focus:outline-none resize-none" />
              
              <div className="mt-4">
                <label className="text-sm font-medium text-foreground mb-2 block">Project Images</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-4">
                  {(editing.images || []).map((img, idx) => (
                    <div key={idx} className="flex flex-col gap-2 glass-panel p-3 rounded-xl border border-white/10">
                      <div className="relative aspect-video rounded-lg overflow-hidden">
                        <img src={img} alt="Project" className="w-full h-full object-cover" />
                        {editing.beforeImage === img && <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-[10px] font-bold px-2 py-1 rounded shadow-lg">BEFORE</div>}
                        {editing.afterImage === img && <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-[10px] font-bold px-2 py-1 rounded shadow-lg">AFTER</div>}
                      </div>
                      
                      <div className="flex flex-col gap-2">
                        <div className="flex gap-2">
                          <button 
                            onClick={() => setAsBefore(img)}
                            className={`flex-1 py-2 rounded-lg font-medium text-xs transition-all ${editing.beforeImage === img ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20' : 'bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-foreground'}`}
                          >
                            Set Before
                          </button>
                          <button 
                            onClick={() => setAsAfter(img)}
                            className={`flex-1 py-2 rounded-lg font-medium text-xs transition-all ${editing.afterImage === img ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20' : 'bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-foreground'}`}
                          >
                            Set After
                          </button>
                        </div>
                        <button 
                          onClick={() => removeImage(idx)} 
                          className="flex items-center justify-center gap-2 py-2 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20 transition-all text-xs font-medium"
                        >
                          <Trash2 size={14} /> Remove Photo
                        </button>
                      </div>
                    </div>
                  ))}
                  <label className="aspect-video rounded-xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 transition-colors bg-white/5 group">
                    <Plus size={32} className="text-muted-foreground group-hover:text-primary transition-colors" />
                    <span className="text-sm text-muted-foreground mt-2 group-hover:text-foreground">Add More Photos</span>
                    <input type="file" multiple accept="image/*" onChange={(e) => addImages(e.target.files)} className="hidden" />
                  </label>
                </div>
                <p className="text-[10px] text-muted-foreground">Tip: Upload as many photos as you want. Select which ones should be the "Before" and "After" transformation photos.</p>
              </div>

              <button 
                onClick={handleSave} 
                disabled={isSaving}
                className={`flex items-center justify-center gap-2 h-12 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-gold-hover transition-colors mt-4 ${isSaving ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <Save size={16} /> {isSaving ? "Saving project..." : "Save Project"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Project Grid */}
      {isLoading ? (
        <div className="glass-panel rounded-2xl p-12 text-center">
          <p className="text-muted-foreground font-serif italic text-lg">Loading projects...</p>
        </div>
      ) : projects.length === 0 ? (
        <div className="glass-panel rounded-2xl p-12 text-center">
          <p className="text-muted-foreground font-serif italic text-lg">No projects yet. Click &quot;Add Project&quot; to create your first portfolio entry.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="glass-panel rounded-2xl overflow-hidden group">
              <div className="h-40 bg-forest-mid flex items-center justify-center text-muted-foreground text-sm">
                {project.afterImage ? (
                  <img src={project.afterImage} alt={project.name} className="w-full h-full object-cover" />
                ) : (
                  "No image"
                )}
              </div>
              <div className="p-5">
                <h3 className="font-heading text-lg text-foreground">{project.name}</h3>
                <p className="text-xs text-primary uppercase tracking-wider mt-1">{project.suburb}</p>
                <p className="text-muted-foreground text-sm mt-2 line-clamp-2">{project.description}</p>
                <div className="flex gap-3 mt-4 pt-4 border-t border-white/10">
                  <button onClick={() => openEdit(project)} className="flex items-center gap-1 text-sm text-foreground/70 hover:text-primary transition-colors">
                    <Edit size={14} /> Edit
                  </button>
                  <button onClick={() => { if (confirm("Delete this project?")) remove(project.id); }} className="flex items-center gap-1 text-sm text-foreground/70 hover:text-destructive transition-colors">
                    <Trash2 size={14} /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
