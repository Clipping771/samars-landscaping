"use client";

import React, { useMemo } from "react";
import { Printer, Info } from "lucide-react";
import { useCalculator } from "./CalculatorContext";
import { CalcInput, CalcSelect } from "@/components/ui/CalcInput";
import { AnimatedResult } from "@/components/ui/AnimatedResult";

export function PlantingModule() {
  const { state, updateState } = useCalculator();
  const { system, planting } = state;
  const isMetric = system === "metric";

  const area = parseFloat(planting.area);
  const spacing = parseFloat(planting.spacing);
  const potSize = parseFloat(planting.potSize);

  const isValid = !isNaN(area) && area > 0 && !isNaN(spacing) && spacing > 0;

  const results = useMemo(() => {
    if (!isValid) return { count: "—", soilVol: "—", mulchVol: "—" };

    // 1. Plant count based on layout
    // For triangular (staggered), count is ~ Area / (spacing^2 * sin(60))
    // sin(60) approx 0.866
    const spacingM = isMetric ? spacing / 1000 : (spacing / 12) * 0.3048;
    const factor = planting.layout === "triangular" ? 0.866 : 1.0;
    const count = Math.floor(area / (Math.pow(spacingM, 2) * factor));

    // 2. Potting soil required for holes
    // Assume hole is 2x pot size in diameter and 1.5x in depth
    const potSizeM = isMetric ? potSize / 1000 : (potSize / 12) * 0.3048;
    const holeRadius = potSizeM; // 2x pot diameter = 1x pot radius * 2
    const holeDepth = potSizeM * 1.5;
    const holeVolM3 = Math.PI * Math.pow(holeRadius, 2) * holeDepth;
    const totalSoilM3 = holeVolM3 * count;
    const soilVol = isMetric ? totalSoilM3 : totalSoilM3 * 1.30795;

    // 3. Mulch volume (assuming 75mm depth across area)
    const mulchVolM3 = area * 0.075;
    const mulchVol = isMetric ? mulchVolM3 : mulchVolM3 * 1.30795;

    return {
      count: count.toLocaleString(),
      soilVol: soilVol.toFixed(2),
      mulchVol: mulchVol.toFixed(2),
    };
  }, [area, spacing, potSize, planting.layout, isMetric, isValid]);

  return (
    <div className="flex flex-col gap-8 print-container">
      <div className="flex items-center justify-between no-print">
        <h3 className="text-2xl font-heading text-primary">Advanced Planting & Grid</h3>
        <button onClick={() => window.print()} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <Printer size={16} /> Print Quote
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="flex flex-col gap-6">
          <CalcInput
            label="Total Planting Area"
            unit={isMetric ? "m²" : "sq ft"}
            type="number"
            value={planting.area}
            onChange={(e) => updateState("planting", "area", e.target.value)}
          />
          <div className="grid grid-cols-2 gap-4">
            <CalcInput
              label="Plant Spacing"
              unit={isMetric ? "mm" : "in"}
              type="number"
              value={planting.spacing}
              onChange={(e) => updateState("planting", "spacing", e.target.value)}
            />
            <CalcInput
              label="Average Pot Size"
              unit={isMetric ? "mm" : "in"}
              type="number"
              value={planting.potSize}
              onChange={(e) => updateState("planting", "potSize", e.target.value)}
            />
          </div>
          <CalcSelect
            label="Grid Pattern"
            options={[
              { value: "square", label: "Square / Rectangular" },
              { value: "triangular", label: "Triangular / Staggered" },
            ]}
            value={planting.layout}
            onChange={(e) => updateState("planting", "layout", e.target.value)}
          />
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col justify-center gap-6 shadow-inner">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <AnimatedResult
              label="Total Plants"
              value={results.count}
              unit="qty"
            />
            <AnimatedResult
              label={`Mulch (${isMetric ? "m³" : "yd³"})`}
              value={results.mulchVol}
              unit={isMetric ? "m³" : "yd³"}
            />
            <div className="col-span-full">
              <AnimatedResult
                label={`Soil for Backfilling (${isMetric ? "m³" : "yd³"})`}
                value={results.soilVol}
                unit={isMetric ? "m³" : "yd³"}
              />
            </div>
          </div>

          <div className="pt-6 border-t border-white/10 text-xs text-muted-foreground flex gap-3">
            <Info size={16} className="text-primary shrink-0" />
            <p>
              Triangular grids provide higher density coverage. Soil estimate assumes digging 
              holes 2x pot diameter and 1.5x depth. Mulch calculated at 75mm depth.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
