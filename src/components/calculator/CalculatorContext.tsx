"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type UnitSystem = "metric" | "imperial";

// Initial state structures for each module
export interface CalculatorState {
  system: UnitSystem;
  material: {
    shape: "rectangle" | "circle" | "triangle" | "ellipse";
    dim1: string; // length / diameter / base
    dim2: string; // width / height
    dim3: string; // second base for trapezoid if needed
    depth: string;
    materialType: string;
  };
  paver: {
    area: string;
    paverLength: string;
    paverWidth: string;
    jointWidth: string; // New: Grout/Sand joint width
    wastage: number;
    baseDepth: string; // New: Sub-base depth for aggregate
  };
  retainingWall: {
    length: string;
    height: string;
    blockLength: string;
    blockHeight: string;
    blockDepth: string; // New: Block depth for volume
    drainageWidth: string; // New: Width of gravel behind wall
  };
  planting: {
    area: string;
    spacing: string;
    layout: "square" | "triangular";
    potSize: string; // New: Diameter of pot for soil calc
  };
  irrigation: {
    pipeLength: string;
    internalDiameter: string;
    flowRate: string; // L/min or GPM
    materialC: string;
    inletPressure: string; // New: Starting pressure
  };
  fertiliser: {
    area: string;
    npkType: string;
    applicationRate: string;
    bagWeight: string;
    bagCost: string; // New: For cost per area calc
  };
  costEstimator: {
    materialCost: string;
    labourHours: string;
    hourlyRate: string;
    markupPercent: string;
    contingency: string; // New: Buffer for unexpected costs
    equipmentHire: string; // New: Daily hire fees
  };
}

const initialState: CalculatorState = {
  system: "metric",
  material: { shape: "rectangle", dim1: "", dim2: "", dim3: "", depth: "", materialType: "mulch" },
  paver: { area: "", paverLength: "", paverWidth: "", jointWidth: "3", wastage: 10, baseDepth: "100" },
  retainingWall: { length: "", height: "", blockLength: "", blockHeight: "", blockDepth: "200", drainageWidth: "300" },
  planting: { area: "", spacing: "", layout: "triangular", potSize: "150" },
  irrigation: { pipeLength: "", internalDiameter: "19", flowRate: "25", materialC: "140", inletPressure: "350" },
  fertiliser: { area: "", npkType: "10-10-10", applicationRate: "35", bagWeight: "20", bagCost: "45" },
  costEstimator: { materialCost: "", labourHours: "", hourlyRate: "80", markupPercent: "20", contingency: "10", equipmentHire: "" },
};

interface CalculatorContextType {
  state: CalculatorState;
  updateState: <K extends keyof CalculatorState>(
    module: K,
    key: keyof CalculatorState[K],
    value: any
  ) => void;
  toggleSystem: () => void;
}

const CalculatorContext = createContext<CalculatorContextType | undefined>(undefined);

export function CalculatorProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<CalculatorState>(initialState);

  // Load from local storage if available
  useEffect(() => {
    const saved = localStorage.getItem("calculatorState");
    if (saved) {
      try {
        setState(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);

  // Save to local storage on change
  useEffect(() => {
    localStorage.setItem("calculatorState", JSON.stringify(state));
  }, [state]);

  const updateState = <K extends keyof CalculatorState>(
    module: K,
    key: keyof CalculatorState[K],
    value: any
  ) => {
    setState((prev) => ({
      ...prev,
      [module]: {
        ...(prev[module] as object),
        [key]: value,
      },
    }));
  };

  const toggleSystem = () => {
    setState((prev) => ({
      ...prev,
      system: prev.system === "metric" ? "imperial" : "metric",
    }));
  };

  return (
    <CalculatorContext.Provider value={{ state, updateState, toggleSystem }}>
      {children}
    </CalculatorContext.Provider>
  );
}

export function useCalculator() {
  const context = useContext(CalculatorContext);
  if (context === undefined) {
    throw new Error("useCalculator must be used within a CalculatorProvider");
  }
  return context;
}
