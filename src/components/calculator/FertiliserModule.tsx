"use client";

import React, { useMemo } from "react";
import { Printer, Info, DollarSign } from "lucide-react";
import { useCalculator } from "./CalculatorContext";
import { CalcInput, CalcSelect } from "@/components/ui/CalcInput";
import { AnimatedResult } from "@/components/ui/AnimatedResult";

export function FertiliserModule() {
  const { state, updateState } = useCalculator();
  const { system, fertiliser } = state;
  const isMetric = system === "metric";

  const area = parseFloat(fertiliser.area);
  const rate = parseFloat(fertiliser.applicationRate);
  const bagWeight = parseFloat(fertiliser.bagWeight);
  const bagCost = parseFloat(fertiliser.bagCost);

  const isValid = !isNaN(area) && area > 0 && !isNaN(rate) && rate > 0 && !isNaN(bagWeight) && bagWeight > 0;

  const results = useMemo(() => {
    if (!isValid) return { totalKg: "—", bags: "—", totalCost: "—", nitrogen: "—" };

    // 1. Total product weight
    // rate is g/m2 or lbs/1000sqft
    let totalKg = 0;
    if (isMetric) {
      totalKg = (area * rate) / 1000;
    } else {
      totalKg = (area / 1000) * rate * 0.453592; // lbs to kg
    }
    
    const bags = Math.ceil(totalKg / bagWeight);

    // 2. Cost
    const totalCost = bags * bagCost;

    // 3. Nitrogen delivery (based on NPK type)
    const nPercentage = parseInt(fertiliser.npkType.split("-")[0]) || 0;
    const actualN = totalKg * (nPercentage / 100);

    return {
      totalKg: totalKg.toFixed(1),
      bags: bags.toString(),
      totalCost: totalCost.toFixed(2),
      nitrogen: actualN.toFixed(2),
    };
  }, [area, rate, bagWeight, bagCost, fertiliser.npkType, isMetric, isValid]);

  return (
    <div className="flex flex-col gap-8 print-container">
      <div className="flex items-center justify-between no-print">
        <h3 className="text-2xl font-heading text-primary">Lawn & Fertiliser Nutrition</h3>
        <button onClick={() => window.print()} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <Printer size={16} /> Print Schedule
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="flex flex-col gap-6">
          <CalcInput
            label="Total Lawn Area"
            unit={isMetric ? "m²" : "sq ft"}
            type="number"
            value={fertiliser.area}
            onChange={(e) => updateState("fertiliser", "area", e.target.value)}
          />
          <div className="grid grid-cols-2 gap-4">
            <CalcSelect
              label="NPK Analysis"
              options={[
                { value: "20-0-10", label: "High Nitrogen (20-0-10)" },
                { value: "10-10-10", label: "Balanced (10-10-10)" },
                { value: "5-10-20", label: "Winter/Root (5-10-20)" },
              ]}
              value={fertiliser.npkType}
              onChange={(e) => updateState("fertiliser", "npkType", e.target.value)}
            />
            <CalcInput
              label="Application Rate"
              unit={isMetric ? "g/m²" : "lbs/1k sq ft"}
              type="number"
              value={fertiliser.applicationRate}
              onChange={(e) => updateState("fertiliser", "applicationRate", e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <CalcInput
              label="Bag Weight"
              unit={isMetric ? "kg" : "lbs"}
              type="number"
              value={fertiliser.bagWeight}
              onChange={(e) => updateState("fertiliser", "bagWeight", e.target.value)}
            />
            <CalcInput
              label="Cost per Bag"
              unit="$"
              type="number"
              value={fertiliser.bagCost}
              onChange={(e) => updateState("fertiliser", "bagCost", e.target.value)}
            />
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col justify-center gap-6 shadow-inner">
          <div className="grid grid-cols-2 gap-6">
            <AnimatedResult
              label="Product Required"
              value={results.totalKg}
              unit="kg"
            />
            <AnimatedResult
              label="Total Bags"
              value={results.bags}
              unit="pcs"
            />
            <div className="p-4 bg-primary/10 rounded-xl border border-primary/20 flex flex-col items-center justify-center">
               <span className="text-xs text-primary uppercase tracking-widest font-bold">Total Job Cost</span>
               <span className="text-3xl font-heading text-foreground mt-1">${results.totalCost}</span>
            </div>
            <AnimatedResult
              label="Actual N Delivered"
              value={results.nitrogen}
              unit="kg"
            />
          </div>

          <div className="pt-4 border-t border-white/10 text-xs text-muted-foreground flex gap-3">
            <Info size={16} className="text-primary shrink-0" />
            <p>
              Professional nutrition management. Actual N shows the total elemental Nitrogen 
              applied to the lawn based on the product analysis.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
