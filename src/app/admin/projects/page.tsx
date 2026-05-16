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

  const addImages = (files: FileList | null) => {
    if (!files || !editing) return;
    
    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditing(prev => {
          if (!prev) return null;
          const newImages = [...(prev.images || []), reader.result as string];
          // Auto-set before/after if they are empty
          let { beforeImage, afterImage } = prev;
          if (!beforeImage) beforeImage = reader.result as string;
          else if (!afterImage) afterImage = reader.result as string;
          
          return { ...prev, images: newImages, beforeImage, afterImage };
        });
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    if (!editing) return;
    const newImages = [...editing.images];
    const removedUrl = newImages[index];
    newImages.splice(index, 1);
    
    let { beforeImage, afterImage } = editing;
    if (beforeImage === removedUrl) beforeImage = newImages[0] || "";
    if (afterImage === removedUrl) afterImage = newImages[1] || newImages[0] || "";
    
    setEditing({ ...editing, images: newImages, beforeImage, afterImage });
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
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
                  {(editing.images || []).map((img, idx) => (
                    <div key={idx} className="relative aspect-video rounded-lg overflow-hidden border border-white/10 group">
                      <img src={img} alt="Project" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-2">
                        <div className="flex gap-1 w-full">
                          <button 
                            onClick={() => setEditing({ ...editing, beforeImage: img })}
                            className={`flex-1 text-[10px] py-1 rounded ${editing.beforeImage === img ? 'bg-primary text-primary-foreground' : 'bg-white/20 text-white'}`}
                          >
                            Before
                          </button>
                          <button 
                            onClick={() => setEditing({ ...editing, afterImage: img })}
                            className={`flex-1 text-[10px] py-1 rounded ${editing.afterImage === img ? 'bg-primary text-primary-foreground' : 'bg-white/20 text-white'}`}
                          >
                            After
                          </button>
                        </div>
                        <button onClick={() => removeImage(idx)} className="text-destructive hover:bg-destructive/20 p-1 rounded-full transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </div>
                      {editing.beforeImage === img && <div className="absolute top-1 left-1 bg-primary text-primary-foreground text-[8px] font-bold px-1.5 py-0.5 rounded">BEFORE</div>}
                      {editing.afterImage === img && <div className="absolute top-1 right-1 bg-primary text-primary-foreground text-[8px] font-bold px-1.5 py-0.5 rounded">AFTER</div>}
                    </div>
                  ))}
                  <label className="aspect-video rounded-lg border-2 border-dashed border-white/10 flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 transition-colors bg-white/5">
                    <Plus size={24} className="text-muted-foreground" />
                    <span className="text-[10px] text-muted-foreground mt-1">Add Photos</span>
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
