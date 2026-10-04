"use client";

import { useEffect, useState } from "react";
import type { AgentResponse } from "@/types";
import { cn } from "@/lib/utils";

export function ConfidenceIndicator({ response }: { response: Pick<AgentResponse, "kind" | "confidence" | "threshold"> }) {
  const { kind, confidence, threshold } = response;
  const isAnswer = kind === "answer";
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const id = requestAnimationFrame(() => setWidth(confidence));
    return () => cancelAnimationFrame(id);
  }, [confidence]);

  return (
    <div className="mt-[18px]">
      <div className="flex items-baseline justify-between text-[13.5px] text-muted">
        <span>{isAnswer ? "Confidence" : "Answerability score"}</span>
        <b className="tnum font-display text-[26px] font-bold tracking-tight text-foreground">{confidence}%</b>
      </div>
      <div
        role="img"
        aria-label={`${isAnswer ? "Confidence" : "Answerability"} ${confidence} percent, answer threshold ${threshold} percent`}
        className="relative mt-2 h-[9px] rounded-full bg-pause-soft"
      >
        <div
          className={cn("h-full rounded-full transition-[width] duration-700 ease-out", isAnswer ? "bg-accent" : "bg-pause")}
          style={{ width: `${width}%` }}
        />
        <span className="absolute -bottom-1 -top-1 w-0.5 rounded bg-foreground opacity-55" style={{ left: `${threshold}%` }} />
      </div>
      <div className="mt-1.5 flex justify-between text-[12.5px] text-faint">
        <span>{isAnswer ? "Above" : "Below"} the answer threshold</span>
        <span>Threshold {threshold}%</span>
      </div>
    </div>
  );
}
