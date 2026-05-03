"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { ArrowLeftRight } from "lucide-react";
import { FADE_UP_ANIMATION_VARIANTS } from "@/lib/animations";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  alt: string;
}

export function BeforeAfterSlider({ beforeImage, afterImage, alt }: BeforeAfterSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  
  // Start slider at 50%
  const dragX = useMotionValue(0);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
      dragX.set(containerRef.current.offsetWidth / 2);
    }

    const handleResize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
        // Reset to 50% on resize
        dragX.set(containerRef.current.offsetWidth / 2);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [dragX]);

  // Convert pixel drag value to percentage for clip-path
  const clipPercentage = useTransform(dragX, [0, containerWidth || 1000], [0, 100]);
  const clipPathValue = useTransform(clipPercentage, (val) => `inset(0 ${100 - val}% 0 0)`);

  return (
    <motion.div variants={FADE_UP_ANIMATION_VARIANTS} className="flex flex-col gap-4">
      <div 
        ref={containerRef}
        className="relative w-full aspect-[4/3] sm:aspect-video rounded-xl overflow-hidden cursor-ew-resize group"
        onPointerDown={(e) => {
          if (!containerRef.current) return;
          const rect = containerRef.current.getBoundingClientRect();
          const x = e.clientX - rect.left;
          dragX.set(x);
        }}
      >
        {/* After Image (Base) */}
        <div className="absolute inset-0 select-none pointer-events-none">
          <Image
            src={afterImage}
            alt={`${alt} After`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute bottom-4 right-4 bg-background/80 backdrop-blur px-3 py-1 text-xs uppercase tracking-widest rounded shadow">
            After
          </div>
        </div>

        {/* Before Image (Top Layer) */}
        <motion.div 
          className="absolute inset-0 select-none pointer-events-none z-10"
          style={{ clipPath: clipPathValue }}
        >
          <Image
            src={beforeImage}
            alt={`${alt} Before`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute bottom-4 left-4 bg-background/80 backdrop-blur px-3 py-1 text-xs uppercase tracking-widest rounded shadow">
            Before
          </div>
        </motion.div>

        {/* Draggable Handle */}
        <motion.div
          className="absolute inset-y-0 z-20 flex items-center justify-center -ml-[18px]"
          style={{ x: dragX }}
          drag="x"
          dragConstraints={containerRef}
          dragElastic={0}
          dragMomentum={false}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => setIsDragging(false)}
        >
          {/* Vertical Line */}
          <div className="absolute inset-y-0 w-[2px] bg-primary shadow-[0_0_10px_rgba(212,175,55,0.5)]" />
          
          {/* Handle Button */}
          <div className={`relative w-9 h-9 rounded-full bg-primary flex items-center justify-center text-primary-foreground shadow-lg transition-transform ${isDragging ? 'scale-90' : 'scale-100 group-hover:scale-110'}`}>
            <ArrowLeftRight size={16} />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
