"use client";

import React, { useMemo } from "react";
import { Printer, AlertTriangle, Info } from "lucide-react";
import { useCalculator } from "./CalculatorContext";
import { CalcInput, CalcSelect } from "@/components/ui/CalcInput";
import { AnimatedResult } from "@/components/ui/AnimatedResult";

const PIPE_MATERIALS = [
  { value: "150", label: "PVC / Plastic (C=150)" },
  { value: "140", label: "Polyethylene (C=140)" },
  { value: "100", label: "Copper / Galvanised (C=100)" },
];

export function IrrigationModule() {
  const { state, updateState } = useCalculator();
  const { system, irrigation } = state;
  const isMetric = system === "metric";

  const length = parseFloat(irrigation.pipeLength);
  const id = parseFloat(irrigation.internalDiameter);
  const flow = parseFloat(irrigation.flowRate);
  const c = parseFloat(irrigation.materialC);
  const inletP = parseFloat(irrigation.inletPressure);

  const isValid = !isNaN(length) && length > 0 && !isNaN(id) && id > 0 && !isNaN(flow) && flow > 0;

  const results = useMemo(() => {
    if (!isValid) return { pressureDrop: "—", velocity: "—", endPressure: "—", status: "ok" };

    // Hazen-Williams Equation
    // hf = 10.67 * L * (Q/C)^1.852 * D^-4.87 (Metric: L in m, Q in m3/s, D in m)
    
    const dM = id / 1000;
    const qM3s = isMetric ? (flow / 60) / 1000 : (flow * 0.00006309); // flow: L/min or GPM
    
    const headLossM = 10.67 * length * Math.pow(qM3s / c, 1.852) * Math.pow(dM, -4.87);
    const dropKpa = headLossM * 9.81;
    const dropPsi = dropKpa * 0.145038;

    // Velocity = Q / A
    const area = Math.PI * Math.pow(dM / 2, 2);
    const velocity = qM3s / area;

    const endP = inletP - (isMetric ? dropKpa : dropPsi);

    return {
      pressureDrop: isMetric ? dropKpa.toFixed(1) : dropPsi.toFixed(1),
      velocity: velocity.toFixed(2),
      endPressure: endP.toFixed(1),
      status: velocity > 1.5 ? "warning" : velocity > 2.0 ? "danger" : "ok",
    };
  }, [length, id, flow, c, inletP, isMetric, isValid]);

  return (
    <div className="flex flex-col gap-8 print-container">
      <div className="flex items-center justify-between no-print">
        <h3 className="text-2xl font-heading text-primary">Hydraulics & Irrigation</h3>
        <button onClick={() => window.print()} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <Printer size={16} /> Print Report
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-2 gap-4">
            <CalcInput
              label="Pipe Length"
              unit={isMetric ? "m" : "ft"}
              type="number"
              value={irrigation.pipeLength}
              onChange={(e) => updateState("irrigation", "pipeLength", e.target.value)}
            />
            <CalcInput
              label="Internal Diameter"
              unit={isMetric ? "mm" : "in"}
              type="number"
              value={irrigation.internalDiameter}
              onChange={(e) => updateState("irrigation", "internalDiameter", e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <CalcInput
              label="Max Flow Rate"
              unit={isMetric ? "L/min" : "GPM"}
              type="number"
              value={irrigation.flowRate}
              onChange={(e) => updateState("irrigation", "flowRate", e.target.value)}
            />
            <CalcInput
              label="Inlet Pressure"
              unit={isMetric ? "kPa" : "PSI"}
              type="number"
              value={irrigation.inletPressure}
              onChange={(e) => updateState("irrigation", "inletPressure", e.target.value)}
            />
          </div>

          <CalcSelect
            label="Pipe Material"
            options={PIPE_MATERIALS}
            value={irrigation.materialC}
            onChange={(e) => updateState("irrigation", "materialC", e.target.value)}
          />
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col justify-center gap-6 shadow-inner">
          <div className="grid grid-cols-2 gap-6">
            <AnimatedResult
              label="Total Pressure Drop"
              value={results.pressureDrop}
              unit={isMetric ? "kPa" : "PSI"}
            />
            <AnimatedResult
              label="Velocity"
              value={results.velocity}
              unit="m/s"
            />
            <div className="col-span-full">
              <AnimatedResult
                label="Residual End Pressure"
                value={results.endPressure}
                unit={isMetric ? "kPa" : "PSI"}
              />
            </div>
          </div>

          {results.status !== "ok" && (
            <div className={`p-4 rounded-xl border flex gap-3 ${results.status === "warning" ? "bg-yellow-500/10 border-yellow-500/30 text-yellow-500" : "bg-red-500/10 border-red-500/30 text-red-500"}`}>
              <AlertTriangle className="shrink-0" />
              <div className="text-sm">
                <p className="font-bold uppercase tracking-tight">{results.status === "warning" ? "High Velocity" : "Critical Velocity"}</p>
                <p className="opacity-90">Velocity exceeds {results.status === "warning" ? "1.5m/s" : "2.0m/s"}. Water hammer or pipe damage likely. Increase pipe size.</p>
              </div>
            </div>
          )}

          <div className="pt-4 border-t border-white/10 text-xs text-muted-foreground flex gap-3">
            <Info size={16} className="text-primary shrink-0" />
            <p>
              Calculated using the Hazen-Williams equation. Friction loss only; does not account 
              for elevation changes. Velocity should ideally remain below 1.5 m/s.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
