"use client";

import React, { useMemo } from "react";
import { Printer, Shapes } from "lucide-react";
import { useCalculator } from "./CalculatorContext";
import { CalcInput, CalcSelect } from "@/components/ui/CalcInput";
import { AnimatedResult } from "@/components/ui/AnimatedResult";

const MATERIALS = [
  { value: "mulch", label: "Pine Bark Mulch (350 kg/m³)", density: 350 },
  { value: "topsoil", label: "Premium Topsoil (1200 kg/m³)", density: 1200 },
  { value: "sand", label: "Washed Sand (1600 kg/m³)", density: 1600 },
  { value: "gravel", label: "Blue Metal Gravel (1450 kg/m³)", density: 1450 },
  { value: "river_rock", label: "River Rock (1500 kg/m³)", density: 1500 },
  { value: "concrete", label: "Standard Concrete (2400 kg/m³)", density: 2400 },
];

const SHAPES = [
  { value: "rectangle", label: "Rectangle / Square" },
  { value: "circle", label: "Circle" },
  { value: "triangle", label: "Triangle" },
  { value: "ellipse", label: "Ellipse / Oval" },
];

export function MaterialModule() {
  const { state, updateState } = useCalculator();
  const { system, material } = state;
  const isMetric = system === "metric";

  const d1 = parseFloat(material.dim1);
  const d2 = parseFloat(material.dim2);
  const d3 = parseFloat(material.dim3);
  const depth = parseFloat(material.depth);

  const isValid = !isNaN(d1) && d1 > 0 && !isNaN(depth) && depth > 0;

  const results = useMemo(() => {
    if (!isValid) return { area: "—", volume: "—", weight: "—" };

    let areaSqUnits = 0;

    switch (material.shape) {
      case "rectangle":
        if (!isNaN(d2)) areaSqUnits = d1 * d2;
        break;
      case "circle":
        // d1 is diameter
        const radius = d1 / 2;
        areaSqUnits = Math.PI * Math.pow(radius, 2);
        break;
      case "triangle":
        // d1 is base, d2 is height
        if (!isNaN(d2)) areaSqUnits = (d1 * d2) / 2;
        break;
      case "ellipse":
        // d1 is major axis (width), d2 is minor axis (height)
        if (!isNaN(d2)) areaSqUnits = Math.PI * (d1 / 2) * (d2 / 2);
        break;
      default:
        areaSqUnits = 0;
    }

    if (areaSqUnits <= 0) return { area: "—", volume: "—", weight: "—" };

    let volM3 = 0;
    if (isMetric) {
      // Area(m2) * Depth(mm)
      volM3 = areaSqUnits * (depth / 1000);
    } else {
      // Area(ft2) * Depth(in)
      const volFt3 = areaSqUnits * (depth / 12);
      volM3 = volFt3 * 0.0283168;
    }

    const volYd3 = volM3 * 1.30795;
    const density = MATERIALS.find((m) => m.value === material.materialType)?.density || 1000;
    const weightTonnes = (volM3 * density) / 1000;

    return {
      area: areaSqUnits.toFixed(2),
      volume: isMetric ? volM3.toFixed(2) : volYd3.toFixed(2),
      weight: weightTonnes.toFixed(2),
    };
  }, [d1, d2, d3, depth, material.shape, material.materialType, isMetric, isValid]);

  return (
    <div className="flex flex-col gap-8 print-container">
      <div className="flex items-center justify-between no-print">
        <h3 className="text-2xl font-heading text-primary">Area & Material</h3>
        <button onClick={() => window.print()} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <Printer size={16} /> Print Quote
        </button>
      </div>

      <div className="print-only hidden mb-8 border-b border-primary/20 pb-4">
        <h2 className="text-3xl font-heading text-primary">Samar's Landscaping - Material Estimate</h2>
        <p className="text-muted-foreground mt-2">Professional Area & Material Calculation</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Inputs */}
        <div className="flex flex-col gap-6">
          <CalcSelect
            label="Area Shape"
            options={SHAPES}
            value={material.shape}
            onChange={(e) => updateState("material", "shape", e.target.value)}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <CalcInput
              label={material.shape === "circle" ? "Diameter" : material.shape === "triangle" ? "Base" : "Length / Width"}
              unit={isMetric ? "m" : "ft"}
              type="number"
              min="0"
              value={material.dim1}
              onChange={(e) => updateState("material", "dim1", e.target.value)}
            />
            {material.shape !== "circle" && (
              <CalcInput
                label={material.shape === "triangle" ? "Height" : "Width / Height"}
                unit={isMetric ? "m" : "ft"}
                type="number"
                min="0"
                value={material.dim2}
                onChange={(e) => updateState("material", "dim2", e.target.value)}
              />
            )}
          </div>

          <CalcInput
            label="Desired Depth"
            unit={isMetric ? "mm" : "inches"}
            type="number"
            min="0"
            value={material.depth}
            onChange={(e) => updateState("material", "depth", e.target.value)}
          />

          <CalcSelect
            label="Material Type"
            options={MATERIALS}
            value={material.materialType}
            onChange={(e) => updateState("material", "materialType", e.target.value)}
          />
        </div>

        {/* Outputs */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col justify-center gap-8 shadow-inner">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <AnimatedResult
              label={`Total Area (${isMetric ? "m²" : "sq ft"})`}
              value={results.area}
              unit={isMetric ? "m²" : "ft²"}
            />
            <AnimatedResult
              label={`Total Volume (${isMetric ? "m³" : "yd³"})`}
              value={results.volume}
              unit={isMetric ? "m³" : "yd³"}
            />
            <AnimatedResult
              label="Total Weight"
              value={results.weight}
              unit="t"
            />
          </div>
          
          <div className="pt-6 border-t border-white/10 text-sm text-muted-foreground">
            <p className="flex items-center gap-2 mb-2 text-primary">
              <Shapes size={14} />
              <span className="font-medium uppercase tracking-wider">Formula Used:</span>
            </p>
            {material.shape === "rectangle" && "Area = Length × Width"}
            {material.shape === "circle" && "Area = π × (Diameter / 2)²"}
            {material.shape === "triangle" && "Area = (Base × Height) / 2"}
            {material.shape === "ellipse" && "Area = π × (Width / 2) × (Height / 2)"}
            <p className="mt-2 text-xs italic">
              * Order 10% extra for settling and wastage. Weight estimates are based on dry density.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
