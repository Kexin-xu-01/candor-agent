"use client";

import { useEffect, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Sidebar } from "@/components/layout/Sidebar";
import { cn } from "@/lib/utils";

export function AppShell({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => setMenuOpen(false), [pathname]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="flex h-dvh min-h-0 pb-[env(safe-area-inset-bottom,0px)] pt-[env(safe-area-inset-top,0px)]">
      {/* Sidebar: static on desktop, slide-over drawer on mobile */}
      <aside
        aria-label="Sidebar"
        className={cn(
          "z-30 w-[272px] shrink-0 border-r border-line bg-surface p-3.5 pt-[18px]",
          "max-md:fixed max-md:inset-y-0 max-md:left-0 max-md:pt-[calc(18px+env(safe-area-inset-top,0px))] max-md:transition-transform max-md:duration-200",
          menuOpen ? "max-md:translate-x-0" : "max-md:-translate-x-[102%]",
        )}
      >
        <Sidebar />
      </aside>
      {menuOpen && (
        <div className="fixed inset-0 z-20 bg-black/45 md:hidden" onClick={() => setMenuOpen(false)} aria-hidden />
      )}

      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        <div className="flex items-center gap-2.5 border-b border-line bg-surface px-3.5 py-2.5 md:hidden">
          <button
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            className="grid h-9 w-9 place-items-center rounded-[10px] border border-line"
          >
            <Menu size={18} />
          </button>
          <strong className="font-display">Candor</strong>
        </div>
        <main className="flex min-h-0 flex-1 flex-col">{children}</main>
      </div>
    </div>
  );
}
