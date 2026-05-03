"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Menu, X, LayoutDashboard, MessageSquare, FolderOpen, Star, Settings, FileText, LogOut, Leaf,
} from "lucide-react";

const links = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Leads", href: "/admin/leads", icon: MessageSquare },
  { label: "Projects", href: "/admin/projects", icon: FolderOpen },
  { label: "Testimonials", href: "/admin/testimonials", icon: Star },
  { label: "Settings", href: "/admin/settings", icon: Settings },
  { label: "Quotes", href: "/admin/quotes", icon: FileText },
];

export function AdminHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const currentLabel = links.find((l) => l.href === pathname)?.label || "Admin";

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <header className="lg:hidden sticky top-0 z-50 bg-forest-deep border-b border-white/10 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Leaf size={20} className="text-primary" />
          <span className="font-heading text-lg text-foreground">{currentLabel}</span>
        </div>
        <button onClick={() => setOpen(!open)} className="text-foreground" aria-label="Toggle admin menu">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <nav className="absolute top-full left-0 w-full bg-forest-deep border-b border-white/10 flex flex-col p-4 gap-1 shadow-xl">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? "bg-primary/15 text-primary"
                    : "text-foreground/70 hover:bg-white/5"
                }`}
              >
                <Icon size={18} />
                {link.label}
              </Link>
            );
          })}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-foreground/70 hover:bg-destructive/10 hover:text-destructive mt-2 border-t border-white/10 pt-4"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </nav>
      )}
    </header>
  );
}
