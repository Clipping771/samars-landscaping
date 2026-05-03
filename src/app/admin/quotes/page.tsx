"use client";

import React from "react";
import { Trash2, FileText } from "lucide-react";
import { useQuoteLogs } from "@/lib/useAdminData";

export default function QuotesPage() {
  const { logs, remove } = useQuoteLogs();

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-heading text-3xl text-foreground">Quote History</h1>
        <p className="text-muted-foreground text-sm mt-1">{logs.length} calculator exports logged</p>
      </div>

      {logs.length === 0 ? (
        <div className="glass-panel rounded-2xl p-12 text-center">
          <FileText size={48} className="mx-auto mb-4 text-muted-foreground/30" />
          <p className="text-muted-foreground font-serif italic text-lg">
            No quote exports yet. When you use the Print Quote button in the calculator, a record will appear here.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {logs.map((log) => (
            <div key={log.id} className="glass-panel rounded-2xl p-6">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h3 className="font-heading text-lg text-primary">{log.module} Calculator</h3>
                  <p className="text-xs text-muted-foreground">{new Date(log.createdAt).toLocaleString()}</p>
                </div>
                <button onClick={() => { if (confirm("Delete?")) remove(log.id); }} className="text-muted-foreground hover:text-destructive transition-colors">
                  <Trash2 size={16} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Inputs</p>
                  <div className="bg-white/5 rounded-lg p-3 text-sm space-y-1">
                    {Object.entries(log.inputs).map(([k, v]) => (
                      <div key={k} className="flex justify-between">
                        <span className="text-muted-foreground">{k}:</span>
                        <span className="text-foreground">{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Results</p>
                  <div className="bg-white/5 rounded-lg p-3 text-sm space-y-1">
                    {Object.entries(log.outputs).map(([k, v]) => (
                      <div key={k} className="flex justify-between">
                        <span className="text-muted-foreground">{k}:</span>
                        <span className="text-primary font-medium">{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
