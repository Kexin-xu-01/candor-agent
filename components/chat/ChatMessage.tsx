"use client";

import type { ChatMessageModel, Feedback } from "@/types";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { DecisionBadge } from "./DecisionBadge";
import { ConfidenceIndicator } from "./ConfidenceIndicator";
import { EvidencePanel } from "./EvidencePanel";
import { DecisionFactors } from "./DecisionFactors";
import { FeedbackButtons } from "./FeedbackButtons";

interface Props {
  message: ChatMessageModel;
  onFeedback: (messageId: string, patch: Partial<Feedback>) => void;
}

export function ChatMessage({ message, onFeedback }: Props) {
  if (message.role === "user") {
    return (
      <div className="mb-3.5 mt-[22px] flex justify-end animate-rise">
        <div className="max-w-[84%] overflow-wrap-anywhere rounded-[18px_18px_4px_18px] bg-accent px-4 py-2.5 text-accent-foreground [overflow-wrap:anywhere]">
          {message.text}
        </div>
      </div>
    );
  }

  // A real failure (e.g. network). Visually and semantically distinct from abstaining.
  if (message.error || !message.response) {
    return (
      <div className="mb-6 mt-1.5 animate-rise">
        <Card className="border-bad p-5" role="alert">
          <b className="text-bad">Something went wrong</b>
          <p className="mt-1 text-sm text-muted">{message.error ?? "No response received."} Try asking again.</p>
        </Card>
      </div>
    );
  }

  const r = message.response;
  return (
    <div className="mb-6 mt-1.5 animate-rise">
      <Card className={cn("p-5", r.kind === "answer" ? "border-accent-line" : "border-[1.5px] border-dashed border-pause-line")}>
        <DecisionBadge kind={r.kind} />
        <p
          className={cn(
            "mb-1 mt-3.5 max-w-[62ch]",
            r.kind === "answer"
              ? "text-[16.5px]"
              : "font-display text-xl font-semibold leading-[1.3] tracking-tight",
          )}
        >
          {r.text}
        </p>
        <ConfidenceIndicator response={r} />
        <EvidencePanel response={r} />
        <DecisionFactors response={r} />
        <FeedbackButtons response={r} feedback={message.feedback} onChange={(patch) => onFeedback(message.id, patch)} />
      </Card>
    </div>
  );
}
