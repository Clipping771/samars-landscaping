"use client";

import React, { useState } from "react";
import { useProjects } from "@/lib/useAdminData";
import { ArrowLeftRight, Image as ImageIcon, X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function GalleryClient() {
  const { projects, isLoading } = useProjects();
  const [showBefore, setShowBefore] = useState<Record<string, boolean>>({});
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const toggleImage = (id: string) => {
    setShowBefore((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Close on Escape key & Lock body scroll
  React.useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
    };
    
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [selectedProject]);

  const openLightbox = (projectId: string, index: number = 0) => {
    setSelectedProject(projectId);
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setSelectedProject(null);
  };

  const nextImage = (images: string[]) => {
    setLightboxIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (images: string[]) => {
    setLightboxIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center">
        <h2 className="font-heading text-2xl text-foreground mb-4">Loading Gallery...</h2>
      </div>
    );
  }

  const activeProject = projects.find(p => p.id === selectedProject);

  return (
    <div className="container mx-auto px-6 py-20 lg:py-32">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="font-heading text-4xl lg:text-5xl text-foreground mb-6">
          Project Gallery
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Explore our transformations. Click on the images to switch between the "Before" and "After" states. 
          Use the arrows to browse all project photos.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <ProjectCard 
            key={project.id}
            project={project}
            index={index}
            showingBefore={showBefore[project.id] || false}
            onToggle={() => toggleImage(project.id)}
            onOpenLightbox={(idx) => openLightbox(project.id, idx)}
          />
        ))}
      </div>

              <div className="p-6 md:p-8 flex-1 flex flex-col bg-gradient-to-b from-white/5 to-transparent">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-heading text-2xl text-foreground">
                    {project.name}
                  </h3>
                  {totalImages > 0 && (
                    <span className="text-[10px] text-muted-foreground uppercase tracking-widest mt-2">
                      {totalImages} Photos
                    </span>
                  )}
                </div>
                <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-4">
                  {project.suburb}
                </p>
                <p className="text-muted-foreground text-base leading-relaxed flex-1 line-clamp-2">
                  {project.description}
                </p>
                {totalImages > 0 && (
                  <button 
                    onClick={() => openLightbox(project.id)}
                    className="mt-6 flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors group/btn"
                  >
                    View All Photos <ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[40] bg-black/95 flex flex-col items-center justify-center p-4 cursor-pointer"
            onClick={closeLightbox}
          >
            <button 
              onClick={(e) => {
                e.stopPropagation();
                closeLightbox();
              }}
              className="absolute top-6 right-6 flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-5 py-2.5 rounded-full border border-white/20 transition-all z-10 group"
            >
              <span className="text-sm font-medium">Close</span>
              <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
            </button>

            <div 
              className="relative w-full max-w-5xl aspect-video sm:aspect-auto sm:h-[70vh] flex items-center justify-center cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => prevImage(activeProject.images)}
                className="absolute left-0 sm:-left-16 text-white/50 hover:text-white transition-colors"
              >
                <ChevronLeft size={48} />
              </button>

              <img 
                src={activeProject.images[lightboxIndex]} 
                alt={`${activeProject.name} project photo ${lightboxIndex + 1}`}
                className="max-w-full max-h-full object-contain rounded-lg"
              />

              <button 
                onClick={() => nextImage(activeProject.images)}
                className="absolute right-0 sm:-right-16 text-white/50 hover:text-white transition-colors"
              >
                <ChevronRight size={48} />
              </button>
            </div>

            <div className="mt-8 text-center">
              <h4 className="font-heading text-2xl text-white mb-2">{activeProject.name}</h4>
              <p className="text-white/60 text-sm">
                Photo {lightboxIndex + 1} of {activeProject.images.length}
              </p>
              <div className="flex gap-2 mt-4 overflow-x-auto max-w-md mx-auto p-2 scrollbar-hide">
                {activeProject.images.map((img, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setLightboxIndex(idx)}
                    className={`relative w-16 h-12 rounded-md overflow-hidden flex-shrink-0 border-2 transition-all ${lightboxIndex === idx ? 'border-primary' : 'border-transparent opacity-50 hover:opacity-100'}`}
                  >
                    <img src={img} className="w-full h-full object-cover" alt="thumbnail" />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ProjectCard({ project, index, showingBefore, onToggle, onOpenLightbox }: any) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalImages = project.images?.length || 0;
  const hasBothImages = project.beforeImage && project.afterImage;
  
  const currentImage = hasBothImages && showingBefore 
    ? project.beforeImage 
    : (project.images?.[currentIndex] || project.afterImage || project.beforeImage);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % totalImages);
    if (showingBefore) onToggle();
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + totalImages) % totalImages);
    if (showingBefore) onToggle();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="group flex flex-col glass-panel rounded-2xl overflow-hidden hover:-translate-y-2 transition-all duration-300 shadow-xl shadow-black/20 border border-white/10"
    >
      <div 
        className="relative h-64 sm:h-80 w-full overflow-hidden bg-forest-mid flex items-center justify-center cursor-pointer"
        onClick={() => hasBothImages && onToggle()}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImage}
            src={currentImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            alt={`${project.name} photo`}
            className="w-full h-full object-cover"
          />
        </AnimatePresence>

        {/* Slider Controls */}
        {totalImages > 1 && (
          <>
            <button 
              onClick={handlePrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary z-10"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={handleNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary z-10"
            >
              <ChevronRight size={20} />
            </button>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 px-2 py-1 rounded-full bg-black/20 backdrop-blur-sm z-10">
              {project.images.map((_: any, i: number) => (
                <div 
                  key={i} 
                  className={`w-1.5 h-1.5 rounded-full transition-all ${currentIndex === i ? 'bg-primary w-3' : 'bg-white/40'}`}
                />
              ))}
            </div>
          </>
        )}

        {hasBothImages && (
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
            <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md text-white px-4 py-2 rounded-full font-medium text-sm border border-white/20">
              <ArrowLeftRight size={16} />
              {showingBefore ? "See After" : "See Before"}
            </div>
          </div>
        )}
        
        {hasBothImages && (
          <div className="absolute top-4 left-4">
            <span className="bg-primary text-primary-foreground text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-lg">
              {showingBefore ? "Before" : "After"}
            </span>
          </div>
        )}

        {totalImages > 0 && (
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onOpenLightbox(currentIndex);
            }}
            className="absolute top-4 right-4 bg-black/50 backdrop-blur-md text-white p-2 rounded-full border border-white/10 hover:bg-primary transition-colors opacity-0 group-hover:opacity-100 z-10"
          >
            <Maximize2 size={16} />
          </button>
        )}
      </div>

      <div className="p-6 md:p-8 flex-1 flex flex-col bg-gradient-to-b from-white/5 to-transparent">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-heading text-2xl text-foreground">
            {project.name}
          </h3>
          {totalImages > 0 && (
            <span className="text-[10px] text-muted-foreground uppercase tracking-widest mt-2">
              {totalImages} Photos
            </span>
          )}
        </div>
        <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-4">
          {project.suburb}
        </p>
        <p className="text-muted-foreground text-base leading-relaxed flex-1 line-clamp-2">
          {project.description}
        </p>
        {totalImages > 0 && (
          <button 
            onClick={() => onOpenLightbox(currentIndex)}
            className="mt-6 flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors group/btn"
          >
            View All Photos <ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
          </button>
        )}
      </div>
    </motion.div>
  );
}
