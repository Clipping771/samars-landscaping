"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  MessageSquare,
  FolderOpen,
  Star,
  Settings,
  FileText,
  Leaf,
  LogOut,
} from "lucide-react";

const sidebarLinks = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Leads", href: "/admin/leads", icon: MessageSquare },
  { label: "Projects", href: "/admin/projects", icon: FolderOpen },
  { label: "Testimonials", href: "/admin/testimonials", icon: Star },
  { label: "Settings", href: "/admin/settings", icon: Settings },
  { label: "Quote Logs", href: "/admin/quotes", icon: FileText },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <aside className="hidden lg:flex flex-col w-64 xl:w-72 bg-forest-deep border-r border-white/10 min-h-screen fixed left-0 top-0 z-40">
      {/* Brand */}
      <div className="flex items-center gap-3 px-6 py-6 border-b border-white/10">
        <Leaf size={24} className="text-primary" />
        <div>
          <h2 className="font-heading text-lg text-foreground tracking-wide">Admin Panel</h2>
          <p className="text-xs text-muted-foreground">Samar&apos;s Landscaping</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 flex flex-col gap-1 px-3 py-6">
        {sidebarLinks.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? "bg-primary/15 text-primary"
                  : "text-foreground/70 hover:bg-white/5 hover:text-foreground"
              }`}
            >
              <Icon size={18} />
              {link.label}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="px-3 py-6 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-medium text-foreground/70 hover:bg-destructive/10 hover:text-destructive transition-all"
        >
          <LogOut size={18} />
          Sign Out
        </button>
        <Link
          href="/"
          className="flex items-center gap-3 w-full px-4 py-3 mt-1 rounded-lg text-sm font-medium text-foreground/70 hover:bg-white/5 hover:text-foreground transition-all"
        >
          ← Back to Site
        </Link>
      </div>
    </aside>
  );
}
