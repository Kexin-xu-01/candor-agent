import { Check, Minus } from "lucide-react";
import type { AgentResponse } from "@/types";

/** Short explanation of why the agent answered or abstained. */
export function DecisionFactors({ response }: { response: Pick<AgentResponse, "kind" | "reason" | "factors"> }) {
  const isAnswer = response.kind === "answer";
  return (
    <section className="mt-5">
      <h3 className="mb-2 font-sans text-sm font-semibold tracking-normal text-muted">
        {isAnswer ? "Why the agent answered" : "Why the agent abstained"}
      </h3>
      {response.reason && <p className="mb-3 rounded-xl bg-pause-soft px-3.5 py-3 text-[14.5px]">{response.reason}</p>}
      <ul className="flex flex-col gap-[7px] text-[14.5px]">
        {response.factors.map((f) => (
          <li key={f.label} className="flex items-start gap-2.5">
            {f.positive ? (
              <Check size={15} strokeWidth={2.6} className="mt-[3px] shrink-0 text-ok" />
            ) : (
              <Minus size={15} strokeWidth={2.6} className="mt-[3px] shrink-0 text-faint" />
            )}
            <span>{f.label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
