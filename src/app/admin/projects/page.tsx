"use client";

import React, { useState } from "react";
import { Plus, Trash2, Edit, X, Save } from "lucide-react";
import { useProjects } from "@/lib/useAdminData";
import type { AdminProject } from "@/lib/adminStore";

const emptyProject: Omit<AdminProject, "id" | "createdAt"> = {
  name: "", suburb: "", description: "", beforeImage: "", afterImage: "",
};

export default function ProjectsPage() {
  const { projects, isLoading, save, remove } = useProjects();
  const [editing, setEditing] = useState<AdminProject | null>(null);
  const [isNew, setIsNew] = useState(false);

  const openNew = () => {
    setEditing({ ...emptyProject, id: crypto.randomUUID(), createdAt: new Date().toISOString() });
    setIsNew(true);
  };

  const openEdit = (p: AdminProject) => {
    setEditing({ ...p });
    setIsNew(false);
  };

  const handleSave = () => {
    if (!editing || !editing.name.trim()) return;
    save(editing);
    setEditing(null);
    setIsNew(false);
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
          <div className="glass-panel rounded-2xl p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading text-2xl text-foreground">{isNew ? "New Project" : "Edit Project"}</h2>
              <button onClick={() => setEditing(null)} className="text-muted-foreground hover:text-foreground"><X size={20} /></button>
            </div>
            <div className="flex flex-col gap-4">
              <input placeholder="Project Name" value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} className="h-12 bg-white/5 border border-white/10 rounded-lg px-4 text-foreground focus:border-primary focus:outline-none" />
              <input placeholder="Suburb" value={editing.suburb} onChange={(e) => setEditing({ ...editing, suburb: e.target.value })} className="h-12 bg-white/5 border border-white/10 rounded-lg px-4 text-foreground focus:border-primary focus:outline-none" />
              <textarea placeholder="Description" rows={3} value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-foreground focus:border-primary focus:outline-none resize-none" />
              <div className="flex flex-col gap-1">
                <label className="text-sm text-muted-foreground ml-1">Before Image</label>
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        if (editing) setEditing({ ...editing, beforeImage: reader.result as string });
                      };
                      reader.readAsDataURL(file);
                    }
                  }} 
                  className="w-full text-sm text-foreground file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-white/10 file:text-foreground hover:file:bg-white/20 transition-colors" 
                />
                {editing.beforeImage && (
                  <img src={editing.beforeImage} alt="Before preview" className="h-24 w-32 object-cover rounded-lg mt-2 border border-white/10" />
                )}
              </div>
              
              <div className="flex flex-col gap-1">
                <label className="text-sm text-muted-foreground ml-1">After Image</label>
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        if (editing) setEditing({ ...editing, afterImage: reader.result as string });
                      };
                      reader.readAsDataURL(file);
                    }
                  }} 
                  className="w-full text-sm text-foreground file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-white/10 file:text-foreground hover:file:bg-white/20 transition-colors" 
                />
                {editing.afterImage && (
                  <img src={editing.afterImage} alt="After preview" className="h-24 w-32 object-cover rounded-lg mt-2 border border-white/10" />
                )}
              </div>
              <button onClick={handleSave} className="flex items-center justify-center gap-2 h-12 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-gold-hover transition-colors mt-2">
                <Save size={16} /> Save Project
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
