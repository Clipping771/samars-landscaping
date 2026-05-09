import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GalleryClient } from "@/components/gallery/GalleryClient";

export const metadata: Metadata = {
  title: "Project Gallery | Samar's Landscaping",
  description:
    "Explore our portfolio of timeless outdoor sanctuaries and view the transformative before and after images of our recent landscaping projects in Adelaide.",
};

export default function GalleryPage() {
  return (
    <>
      <Navbar />
      <main className="flex flex-col min-h-screen pt-20 bg-background relative overflow-hidden">
        {/* Decorative elements similar to the rest of the site */}
        <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/3 bg-forest-mid/10 blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none mix-blend-overlay" />
        
        <div className="relative z-10">
          <GalleryClient />
        </div>
      </main>
      <Footer />
    </>
  );
}
