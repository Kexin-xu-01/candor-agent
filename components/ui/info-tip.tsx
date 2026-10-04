"use client";

import { useState } from "react";
import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

/** Small (i) icon with an explanatory tooltip. Tap-friendly on touch screens. */
export function InfoTip({ text, className }: { text: string; className?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <Tooltip open={open} onOpenChange={setOpen}>
      <TooltipTrigger asChild>
        <button
          type="button"
          aria-label={text}
          onClick={() => setOpen((o) => !o)}
          className={cn("inline-grid shrink-0 cursor-help place-items-center opacity-70 hover:opacity-100", className)}
        >
          <Info size={14} />
        </button>
      </TooltipTrigger>
      <TooltipContent>{text}</TooltipContent>
    </Tooltip>
  );
}
