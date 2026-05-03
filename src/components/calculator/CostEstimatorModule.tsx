"use client";

import React, { useMemo } from "react";
import { Printer, Info, Receipt, Percent } from "lucide-react";
import { useCalculator } from "./CalculatorContext";
import { CalcInput } from "@/components/ui/CalcInput";
import { AnimatedResult } from "@/components/ui/AnimatedResult";

export function CostEstimatorModule() {
  const { state, updateState } = useCalculator();
  const { costEstimator } = state;

  const matCost = parseFloat(costEstimator.materialCost) || 0;
  const labHours = parseFloat(costEstimator.labourHours) || 0;
  const labRate = parseFloat(costEstimator.hourlyRate) || 0;
  const markup = parseFloat(costEstimator.markupPercent) || 0;
  const cont = parseFloat(costEstimator.contingency) || 0;
  const hire = parseFloat(costEstimator.equipmentHire) || 0;

  const results = useMemo(() => {
    const labourTotal = labHours * labRate;
    const directCosts = matCost + labourTotal + hire;
    const contingencyAmt = directCosts * (cont / 100);
    const subtotal = directCosts + contingencyAmt;
    const markupAmt = subtotal * (markup / 100);
    const totalExGst = subtotal + markupAmt;
    const gst = totalExGst * 0.1; // 10% GST
    const totalIncGst = totalExGst + gst;

    return {
      labour: labourTotal.toFixed(2),
      subtotal: subtotal.toFixed(2),
      markup: markupAmt.toFixed(2),
      gst: gst.toFixed(2),
      total: totalIncGst.toFixed(2),
    };
  }, [matCost, labHours, labRate, markup, cont, hire]);

  return (
    <div className="flex flex-col gap-8 print-container">
      <div className="flex items-center justify-between no-print">
        <h3 className="text-2xl font-heading text-primary">Project Quoting Engine</h3>
        <button onClick={() => window.print()} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <Printer size={16} /> Print Official Quote
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-2 gap-4">
            <CalcInput
              label="Materials Cost"
              unit="$"
              type="number"
              value={costEstimator.materialCost}
              onChange={(e) => updateState("costEstimator", "materialCost", e.target.value)}
            />
            <CalcInput
              label="Equipment Hire"
              unit="$"
              type="number"
              value={costEstimator.equipmentHire}
              onChange={(e) => updateState("costEstimator", "equipmentHire", e.target.value)}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-4">
            <CalcInput
              label="Labour Hours"
              unit="hrs"
              type="number"
              value={costEstimator.labourHours}
              onChange={(e) => updateState("costEstimator", "labourHours", e.target.value)}
            />
            <CalcInput
              label="Hourly Rate"
              unit="$"
              type="number"
              value={costEstimator.hourlyRate}
              onChange={(e) => updateState("costEstimator", "hourlyRate", e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-4">
            <CalcInput
              label="Contingency"
              unit="%"
              type="number"
              value={costEstimator.contingency}
              onChange={(e) => updateState("costEstimator", "contingency", e.target.value)}
            />
            <CalcInput
              label="Project Markup"
              unit="%"
              type="number"
              value={costEstimator.markupPercent}
              onChange={(e) => updateState("costEstimator", "markupPercent", e.target.value)}
            />
          </div>
        </div>

        <div className="glass-panel rounded-3xl p-8 flex flex-col gap-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Receipt size={120} />
          </div>
          
          <div className="flex flex-col gap-4 relative z-10">
            <div className="flex justify-between text-muted-foreground">
              <span>Labour Subtotal</span>
              <span>${results.labour}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Total Direct Costs + Contingency</span>
              <span>${results.subtotal}</span>
            </div>
            <div className="flex justify-between text-primary font-medium">
              <span>Gross Profit / Markup ({costEstimator.markupPercent}%)</span>
              <span>+${results.markup}</span>
            </div>
            <div className="flex justify-between text-muted-foreground border-t border-white/10 pt-4">
              <span>Subtotal (Ex. GST)</span>
              <span>${(parseFloat(results.total) / 1.1).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>GST (10%)</span>
              <span>${results.gst}</span>
            </div>
            <div className="flex justify-between items-end mt-4 pt-6 border-t-2 border-primary/30">
              <span className="font-heading text-2xl text-foreground">Total Project Price</span>
              <span className="font-heading text-4xl text-primary font-bold">${results.total}</span>
            </div>
          </div>

          <div className="pt-4 text-xs text-muted-foreground flex gap-3 italic">
            <Info size={16} className="text-primary shrink-0" />
            <p>
              This is a professional estimate including markup and GST. 
              Always review final site conditions before issuing a binding contract.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
