"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { BarChart3, Check, MessageSquare, Moon, Plus, Sun } from "lucide-react";
import { useConversations } from "@/components/providers/ConversationProvider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function toggleTheme() {
  const root = document.documentElement;
  const dark =
    root.dataset.theme === "dark" || (!root.dataset.theme && matchMedia("(prefers-color-scheme: dark)").matches);
  root.dataset.theme = dark ? "light" : "dark";
}

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { conversations, activeId, newConversation, selectConversation } = useConversations();
  const onAgent = pathname === "/";

  const nav = [
    { href: "/", label: "Agent", icon: MessageSquare, current: onAgent },
    { href: "/dashboard", label: "Dashboard", icon: BarChart3, current: pathname.startsWith("/dashboard") },
  ];

  return (
    <div className="flex h-full flex-col gap-[18px]">
      <div className="flex items-center gap-2.5 px-2 font-display text-[19px] font-bold tracking-tight">
        <span className="grid h-7 w-7 place-items-center rounded-[9px] bg-accent text-accent-foreground">
          <Check size={16} strokeWidth={2.6} />
        </span>
        Candor
      </div>

      <Button
        variant="outline"
        className="h-11 w-full rounded-xl"
        onClick={() => {
          newConversation();
          if (!onAgent) router.push("/");
        }}
      >
        <Plus size={16} /> New conversation
      </Button>

      <nav aria-label="Main" className="flex flex-col gap-0.5">
        {nav.map(({ href, label, icon: Icon, current }) => (
          <Link
            key={href}
            href={href}
            aria-current={current ? "page" : undefined}
            className={cn(
              "flex items-center gap-2.5 rounded-[10px] px-2.5 py-2 font-medium text-muted transition-colors hover:bg-surface-2 hover:text-foreground",
              current && "bg-accent-soft text-accent hover:bg-accent-soft hover:text-accent",
            )}
          >
            <Icon size={18} /> {label}
          </Link>
        ))}
      </nav>

      <div className="px-2.5 text-[13px] font-medium text-faint">Recent</div>
      <div className="-mt-3 flex min-h-0 flex-1 flex-col gap-0.5 overflow-auto">
        {conversations.length === 0 && <span className="px-2.5 text-[13px] text-faint">No conversations yet</span>}
        {[...conversations].reverse().map((c) => (
          <button
            key={c.id}
            onClick={() => {
              selectConversation(c.id);
              if (!onAgent) router.push("/");
            }}
            className={cn(
              "truncate rounded-[9px] px-2.5 py-2 text-left text-muted hover:bg-surface-2 hover:text-foreground",
              onAgent && c.id === activeId && "bg-surface-2 font-medium text-foreground",
            )}
          >
            {c.title}
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between px-2.5 text-xs text-faint">
        <span>Prototype · mock agent</span>
        <button
          onClick={toggleTheme}
          aria-label="Toggle colour theme"
          className="grid h-7 w-7 place-items-center rounded-lg border border-line text-muted hover:bg-surface-2"
        >
          <Sun size={14} className="hidden [:root[data-theme=dark]_&]:block" />
          <Moon size={14} className="block [:root[data-theme=dark]_&]:hidden" />
        </button>
      </div>
    </div>
  );
}
