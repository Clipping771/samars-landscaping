"use client";

import React, { useState } from "react";
import { useProjects } from "@/lib/useAdminData";
import { ArrowLeftRight, Image as ImageIcon } from "lucide-react";
import { motion } from "framer-motion";

export function GalleryClient() {
  const { projects, isLoading } = useProjects();
  const [showBefore, setShowBefore] = useState<Record<string, boolean>>({});

  const toggleImage = (id: string) => {
    setShowBefore((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center">
        <h2 className="font-heading text-2xl text-foreground mb-4">Loading Gallery...</h2>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center">
        <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
          <ImageIcon className="text-muted-foreground w-10 h-10" />
        </div>
        <h2 className="font-heading text-3xl text-foreground mb-4">Our Gallery is Growing</h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          We are currently curating our portfolio. Please check back soon to see our latest timeless outdoor sanctuaries.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-20 lg:py-32">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="font-heading text-4xl lg:text-5xl text-foreground mb-6">
          Project Gallery
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Explore our transformations. Click on the images to switch between the "Before" and "After" states of these meticulously crafted landscapes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => {
          const showingBefore = showBefore[project.id] || false;
          const hasBothImages = project.beforeImage && project.afterImage;
          const currentImage = showingBefore ? project.beforeImage : (project.afterImage || project.beforeImage);

          return (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              key={project.id}
              className="group flex flex-col glass-panel rounded-2xl overflow-hidden hover:-translate-y-2 transition-all duration-300 shadow-xl shadow-black/20 border border-white/10"
            >
              <div 
                className="relative h-64 sm:h-80 w-full overflow-hidden bg-forest-mid flex items-center justify-center cursor-pointer"
                onClick={() => hasBothImages && toggleImage(project.id)}
              >
                {currentImage ? (
                  <img
                    src={currentImage}
                    alt={`${project.name} ${showingBefore ? "Before" : "After"}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-muted-foreground/50">
                    <ImageIcon className="w-12 h-12 mb-2" />
                    <span>No image available</span>
                  </div>
                )}

                {hasBothImages && (
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md text-white px-4 py-2 rounded-full font-medium text-sm border border-white/20">
                      <ArrowLeftRight size={16} />
                      View {showingBefore ? "After" : "Before"}
                    </div>
                  </div>
                )}
                
                {hasBothImages && (
                  <div className="absolute top-4 left-4">
                    <span className="bg-black/70 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider border border-white/10">
                      {showingBefore ? "Before" : "After"}
                    </span>
                  </div>
                )}
              </div>

              <div className="p-6 md:p-8 flex-1 flex flex-col bg-gradient-to-b from-white/5 to-transparent">
                <h3 className="font-heading text-2xl text-foreground mb-2">
                  {project.name}
                </h3>
                <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-4">
                  {project.suburb}
                </p>
                <p className="text-muted-foreground text-base leading-relaxed flex-1 line-clamp-3">
                  {project.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
