import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";

export const metadata: Metadata = {
  title: "Professional Calculator | Samar's Landscaping",
  description:
    "Advanced scientific and commercial calculators for landscaping professionals — volume, pavers, retaining walls, irrigation, fertiliser, and project costing.",
};

export default function CalculatorPage() {
  return (
    <>
      <Navbar />
      <main className="flex flex-col min-h-screen pt-20">
        <CalculatorLayout />
      </main>
      <div className="no-print">
        <Footer />
      </div>
    </>
  );
}
