"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calculator,
  Box,
  Grid3X3,
  Ruler,
  Sprout,
  Droplets,
  Leaf,
  DollarSign,
  ArrowRightLeft
} from "lucide-react";
import { CalculatorProvider, useCalculator } from "./CalculatorContext";
import { MaterialModule } from "./MaterialModule";
import { PaverModule } from "./PaverModule";
import { RetainingWallModule } from "./RetainingWallModule";
import { PlantingModule } from "./PlantingModule";
import { IrrigationModule } from "./IrrigationModule";
import { FertiliserModule } from "./FertiliserModule";
import { CostEstimatorModule } from "./CostEstimatorModule";

const modules = [
  { id: "material", label: "Area & Material", icon: Box, component: MaterialModule },
  { id: "paver", label: "Pavers", icon: Grid3X3, component: PaverModule },
  { id: "wall", label: "Wall", icon: Ruler, component: RetainingWallModule },
  { id: "planting", label: "Planting", icon: Sprout, component: PlantingModule },
  { id: "irrigation", label: "Water", icon: Droplets, component: IrrigationModule },
  { id: "fertiliser", label: "Fertiliser", icon: Leaf, component: FertiliserModule },
  { id: "cost", label: "Cost", icon: DollarSign, component: CostEstimatorModule },
];

function CalculatorContent() {
  const [activeModule, setActiveModule] = useState(modules[0].id);
  const { state, toggleSystem } = useCalculator();

  const ActiveComponent = modules.find((m) => m.id === activeModule)?.component || MaterialModule;

  return (
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-80px)] bg-background">
      {/* Desktop Sidebar / Mobile Bottom Nav */}
      <nav className="no-print fixed bottom-0 left-0 right-0 lg:relative lg:w-64 xl:w-72 bg-forest-deep border-t lg:border-t-0 lg:border-r border-white/10 z-40 flex lg:flex-col p-2 lg:p-6 overflow-x-auto lg:overflow-visible">
        <div className="hidden lg:flex items-center gap-3 mb-10 text-primary px-4">
          <Calculator size={24} />
          <h2 className="font-heading text-xl tracking-wide uppercase">Pro Tools</h2>
        </div>

        <div className="flex lg:flex-col gap-2 min-w-max lg:min-w-0">
          {modules.map((module) => {
            const Icon = module.icon;
            const isActive = activeModule === module.id;
            return (
              <button
                key={module.id}
                onClick={() => setActiveModule(module.id)}
                className={`flex flex-col lg:flex-row items-center lg:justify-start gap-1 lg:gap-4 p-3 lg:px-4 lg:py-3 rounded-lg transition-all min-w-[72px] lg:min-w-0 ${isActive
                    ? "bg-primary/20 text-primary"
                    : "text-foreground/70 hover:bg-white/5 hover:text-foreground"
                  }`}
              >
                <Icon size={isActive ? 24 : 20} className="lg:w-5 lg:h-5 transition-all" />
                <span className="text-[10px] lg:text-sm font-medium uppercase tracking-wider">
                  {module.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col pb-24 lg:pb-0 overflow-y-auto">
        {/* Header / Global Controls */}
        <header className="no-print p-6 lg:p-10 border-b border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-heading text-3xl md:text-4xl text-foreground">
              {modules.find((m) => m.id === activeModule)?.label} Calculator
            </h1>
            <p className="text-muted-foreground font-serif italic mt-2">
              Professional precision for premium landscapes.
            </p>
          </div>

          {/* Unit Toggle */}
          <button
            onClick={toggleSystem}
            className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:border-primary/50 transition-colors"
          >
            <ArrowRightLeft size={16} className="text-primary" />
            <span className="text-sm font-medium tracking-wide uppercase">
              {state.system === "metric" ? "Metric System" : "Imperial System"}
            </span>
          </button>
        </header>

        {/* Module Render */}
        <div className="flex-1 p-6 lg:p-10 relative">
          <div className="absolute inset-0 bg-noise opacity-30 pointer-events-none no-print" />
          <div className="relative z-10 max-w-5xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeModule}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <ActiveComponent />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
}

export function CalculatorLayout() {
  return (
    <CalculatorProvider>
      <CalculatorContent />
    </CalculatorProvider>
  );
}
