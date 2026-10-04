import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Pill({ tone = "neutral", children }: { tone?: "neutral" | "accent" | "pause"; children: ReactNode }) {
  return (
    <span
      className={cn(
        "inline-block whitespace-nowrap rounded-full border px-2.5 py-[3px] text-[12.5px] font-medium",
        tone === "neutral" && "border-line-strong text-muted",
        tone === "accent" && "border-accent-line bg-accent-soft text-accent",
        tone === "pause" && "border-pause-line bg-pause-soft text-pause",
      )}
    >
      {children}
    </span>
  );
}
