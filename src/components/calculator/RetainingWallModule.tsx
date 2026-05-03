"use client";

import React, { useMemo } from "react";
import { Printer, Info } from "lucide-react";
import { useCalculator } from "./CalculatorContext";
import { CalcInput } from "@/components/ui/CalcInput";
import { AnimatedResult } from "@/components/ui/AnimatedResult";

export function RetainingWallModule() {
  const { state, updateState } = useCalculator();
  const { system, retainingWall } = state;
  const isMetric = system === "metric";

  const length = parseFloat(retainingWall.length);
  const height = parseFloat(retainingWall.height);
  const bLen = parseFloat(retainingWall.blockLength);
  const bHgt = parseFloat(retainingWall.blockHeight);
  const bDep = parseFloat(retainingWall.blockDepth);
  const drainWidth = parseFloat(retainingWall.drainageWidth);

  const isValid = !isNaN(length) && length > 0 && !isNaN(height) && height > 0 && !isNaN(bLen) && bLen > 0 && !isNaN(bHgt) && bHgt > 0;

  const results = useMemo(() => {
    if (!isValid) return { blocks: "—", courses: "—", drainageVol: "—", baseVol: "—" };

    // 1. Number of blocks
    const bLenM = isMetric ? bLen / 1000 : (bLen / 12) * 0.3048;
    const bHgtM = isMetric ? bHgt / 1000 : (bHgt / 12) * 0.3048;
    
    const wallArea = length * height;
    const blockArea = bLenM * bHgtM;
    const totalBlocks = Math.ceil(wallArea / blockArea);
    const courses = Math.ceil(height / bHgtM);

    // 2. Drainage Gravel behind wall (300mm standard width)
    const dWidthM = isMetric ? drainWidth / 1000 : (drainWidth / 12) * 0.3048;
    const drainageVolM3 = length * height * dWidthM;
    const drainageVol = isMetric ? drainageVolM3 : drainageVolM3 * 1.30795;

    // 3. Base foundation aggregate (assuming 200mm deep, double block width)
    const bDepM = isMetric ? bDep / 1000 : (bDep / 12) * 0.3048;
    const baseVolM3 = length * (bDepM * 2) * 0.2; 
    const baseVol = isMetric ? baseVolM3 : baseVolM3 * 1.30795;

    return {
      blocks: totalBlocks.toLocaleString(),
      courses: courses.toString(),
      drainageVol: drainageVol.toFixed(2),
      baseVol: baseVol.toFixed(2),
    };
  }, [length, height, bLen, bHgt, bDep, drainWidth, isMetric, isValid]);

  return (
    <div className="flex flex-col gap-8 print-container">
      <div className="flex items-center justify-between no-print">
        <h3 className="text-2xl font-heading text-primary">Advanced Retaining Wall</h3>
        <button onClick={() => window.print()} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <Printer size={16} /> Print Quote
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-2 gap-4">
            <CalcInput
              label="Wall Length"
              unit={isMetric ? "m" : "ft"}
              type="number"
              value={retainingWall.length}
              onChange={(e) => updateState("retainingWall", "length", e.target.value)}
            />
            <CalcInput
              label="Wall Height"
              unit={isMetric ? "m" : "ft"}
              type="number"
              value={retainingWall.height}
              onChange={(e) => updateState("retainingWall", "height", e.target.value)}
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <CalcInput
              label="Block Length"
              unit={isMetric ? "mm" : "in"}
              type="number"
              value={retainingWall.blockLength}
              onChange={(e) => updateState("retainingWall", "blockLength", e.target.value)}
            />
            <CalcInput
              label="Block Height"
              unit={isMetric ? "mm" : "in"}
              type="number"
              value={retainingWall.blockHeight}
              onChange={(e) => updateState("retainingWall", "blockHeight", e.target.value)}
            />
            <CalcInput
              label="Block Depth"
              unit={isMetric ? "mm" : "in"}
              type="number"
              value={retainingWall.blockDepth}
              onChange={(e) => updateState("retainingWall", "blockDepth", e.target.value)}
            />
          </div>

          <CalcInput
            label="Drainage Backfill Width"
            unit={isMetric ? "mm" : "in"}
            type="number"
            value={retainingWall.drainageWidth}
            onChange={(e) => updateState("retainingWall", "drainageWidth", e.target.value)}
          />
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col justify-center gap-6 shadow-inner">
          <div className="grid grid-cols-2 gap-6">
            <AnimatedResult
              label="Total Blocks"
              value={results.blocks}
              unit="pcs"
            />
            <AnimatedResult
              label="Horizontal Courses"
              value={results.courses}
              unit="rows"
            />
            <AnimatedResult
              label={`Drainage Aggregate (${isMetric ? "m³" : "yd³"})`}
              value={results.drainageVol}
              unit={isMetric ? "m³" : "yd³"}
            />
            <AnimatedResult
              label={`Base Crushed Rock (${isMetric ? "m³" : "yd³"})`}
              value={results.baseVol}
              unit={isMetric ? "m³" : "yd³"}
            />
          </div>

          <div className="pt-6 border-t border-white/10 text-xs text-muted-foreground flex gap-3">
            <Info size={16} className="text-primary shrink-0" />
            <p>
              Calculates total block count, drainage gravel (blue metal) volume behind the wall, 
              and foundational sub-base requirements. Foundation estimate assumes a trench 
              double the block width and 200mm depth.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
