"use client";

import React, { useMemo } from "react";
import { Printer, Info } from "lucide-react";
import { useCalculator } from "./CalculatorContext";
import { CalcInput } from "@/components/ui/CalcInput";
import { AnimatedResult } from "@/components/ui/AnimatedResult";

export function PaverModule() {
  const { state, updateState } = useCalculator();
  const { system, paver } = state;
  const isMetric = system === "metric";

  const area = parseFloat(paver.area);
  const pLen = parseFloat(paver.paverLength);
  const pWid = parseFloat(paver.paverWidth);
  const joint = parseFloat(paver.jointWidth) || 0;
  const baseDepth = parseFloat(paver.baseDepth) || 0;

  const isValid = !isNaN(area) && area > 0 && !isNaN(pLen) && pLen > 0 && !isNaN(pWid) && pWid > 0;

  const results = useMemo(() => {
    if (!isValid) return { units: "—", baseVolume: "—", sandVolume: "—", perimeter: "—" };

    // 1. Calculate units including joint width
    const pLenWithJoint = isMetric ? (pLen + joint) / 1000 : (pLen + joint) / 12;
    const pWidWithJoint = isMetric ? (pWid + joint) / 1000 : (pWid + joint) / 12;
    const unitCoverage = pLenWithJoint * pWidWithJoint;
    
    const exactUnits = area / unitCoverage;
    const unitsWithWastage = Math.ceil(exactUnits * (1 + paver.wastage / 100));

    // 2. Sub-base aggregate volume (usually 100mm-150mm)
    const baseVolM3 = isMetric ? area * (baseDepth / 1000) : (area * (baseDepth / 12)) * 0.0283168;
    const baseVol = isMetric ? baseVolM3 : baseVolM3 * 1.30795;

    // 3. Bedding sand (usually fixed 30mm)
    const sandVolM3 = isMetric ? area * 0.03 : (area * (1.2 / 12)) * 0.0283168;
    const sandVol = isMetric ? sandVolM3 : sandVolM3 * 1.30795;

    // 4. Perimeter (Estimated as square)
    const perimeter = 4 * Math.sqrt(area);

    return {
      units: unitsWithWastage.toLocaleString(),
      baseVolume: baseVol.toFixed(2),
      sandVolume: sandVol.toFixed(2),
      perimeter: perimeter.toFixed(1),
    };
  }, [area, pLen, pWid, joint, baseDepth, paver.wastage, isMetric, isValid]);

  return (
    <div className="flex flex-col gap-8 print-container">
      <div className="flex items-center justify-between no-print">
        <h3 className="text-2xl font-heading text-primary">Advanced Paver & Decking</h3>
        <button onClick={() => window.print()} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <Printer size={16} /> Print Quote
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="flex flex-col gap-6">
          <CalcInput
            label="Total Project Area"
            unit={isMetric ? "m²" : "sq ft"}
            type="number"
            value={paver.area}
            onChange={(e) => updateState("paver", "area", e.target.value)}
          />
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <CalcInput
              label="Unit Length"
              unit={isMetric ? "mm" : "in"}
              type="number"
              value={paver.paverLength}
              onChange={(e) => updateState("paver", "paverLength", e.target.value)}
            />
            <CalcInput
              label="Unit Width"
              unit={isMetric ? "mm" : "in"}
              type="number"
              value={paver.paverWidth}
              onChange={(e) => updateState("paver", "paverWidth", e.target.value)}
            />
            <CalcInput
              label="Joint Width"
              unit={isMetric ? "mm" : "in"}
              type="number"
              value={paver.jointWidth}
              onChange={(e) => updateState("paver", "jointWidth", e.target.value)}
            />
          </div>

          <CalcInput
            label="Base Aggregate Depth"
            unit={isMetric ? "mm" : "in"}
            type="number"
            value={paver.baseDepth}
            onChange={(e) => updateState("paver", "baseDepth", e.target.value)}
          />

          <div className="flex flex-col gap-3 pt-4 border-t border-white/10">
            <div className="flex justify-between items-center text-sm font-medium text-foreground/80">
              <label>Wastage Factor</label>
              <span className="text-primary">{paver.wastage}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="30"
              step="1"
              value={paver.wastage}
              onChange={(e) => updateState("paver", "wastage", parseInt(e.target.value))}
              className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary"
            />
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col justify-center gap-6 shadow-inner">
          <div className="grid grid-cols-2 gap-6">
            <AnimatedResult
              label="Total Units"
              value={results.units}
              unit="pcs"
            />
            <AnimatedResult
              label={`Base Rock (${isMetric ? "m³" : "yd³"})`}
              value={results.baseVolume}
              unit={isMetric ? "m³" : "yd³"}
            />
            <AnimatedResult
              label={`Bedding Sand (${isMetric ? "m³" : "yd³"})`}
              value={results.sandVolume}
              unit={isMetric ? "m³" : "yd³"}
            />
            <AnimatedResult
              label="Perimeter Edge"
              value={results.perimeter}
              unit={isMetric ? "m" : "ft"}
            />
          </div>

          <div className="pt-6 border-t border-white/10 text-xs text-muted-foreground flex gap-3">
            <Info size={16} className="text-primary shrink-0" />
            <p>
              Calculations include joint spacing and sub-base material volumes. 
              Bedding sand estimated at {isMetric ? "30mm" : "1.2 inches"} thickness. 
              Header course (perimeter) estimated assuming a standard rectangular layout.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
