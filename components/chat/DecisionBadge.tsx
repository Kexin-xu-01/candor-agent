import { Check, Pause } from "lucide-react";
import type { DecisionKind } from "@/types";
import { cn } from "@/lib/utils";

/** "ANSWER" or "I DON'T KNOW". Abstaining is a valid output, so it is neutral, not red. */
export function DecisionBadge({ kind }: { kind: DecisionKind }) {
  const isAnswer = kind === "answer";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full py-1 pl-2.5 pr-3 text-[13px] font-semibold tracking-[0.06em]",
        isAnswer ? "bg-accent text-accent-foreground" : "border border-pause-line bg-pause-soft text-pause",
      )}
    >
      {isAnswer ? <Check size={15} strokeWidth={2.6} /> : <Pause size={13} fill="currentColor" />}
      {isAnswer ? "ANSWER" : "I DON'T KNOW"}
    </span>
  );
}
