import type { AgentResponse } from "@/types";
import { cn } from "@/lib/utils";

export function EvidencePanel({ response }: { response: Pick<AgentResponse, "kind" | "evidence"> }) {
  const isAnswer = response.kind === "answer";
  const title = isAnswer ? "Evidence and sources" : "Available evidence";

  return (
    <section className="mt-5">
      <h3 className="mb-2 font-sans text-sm font-semibold tracking-normal text-muted">{title}</h3>
      {response.evidence.length === 0 ? (
        <div className="rounded-xl border border-dashed border-line-strong p-3.5 text-sm text-muted">
          No relevant documents were found for this question.
        </div>
      ) : (
        <ul className="overflow-hidden rounded-xl border border-line">
          {response.evidence.map((e) => (
            <li
              key={e.title}
              className="grid grid-cols-[1fr_auto] gap-x-3.5 gap-y-0.5 border-t border-line bg-surface-2 px-3.5 py-2.5 first:border-t-0"
            >
              <b className="text-sm font-medium">{e.title}</b>
              <span className="tnum row-span-2 col-start-2 row-start-1 flex items-center gap-2 self-center text-[12.5px] text-muted">
                <span className="relative block h-[5px] w-11 overflow-hidden rounded-full bg-line">
                  <span
                    className={cn("absolute inset-y-0 left-0 rounded-full", isAnswer ? "bg-accent" : "bg-faint")}
                    style={{ width: `${Math.round(e.relevance * 100)}%` }}
                  />
                </span>
                {e.relevance.toFixed(2)}
              </span>
              <small className="text-[12.5px] text-faint">
                {e.source}
                {e.note ? ` · ${e.note}` : ""}
              </small>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
