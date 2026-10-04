"use client";

import { useMemo, useState } from "react";
import type { EvaluationCategory, EvaluationExample } from "@/types";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetTitle } from "@/components/ui/sheet";
import { Pill } from "./Pill";
import { cn } from "@/lib/utils";

const CATEGORIES: EvaluationCategory[] = [
  "Correct answer",
  "Correct abstention",
  "Incorrect answer",
  "False abstention",
  "Insufficient information",
  "Ambiguous question",
  "Outside knowledge coverage",
];

const th = "whitespace-nowrap border-b border-line px-3 py-2.5 text-left text-[13px] font-medium text-muted";

function Callout({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mt-3 rounded-xl border border-line bg-surface-2 px-3.5 py-3 text-sm">
      <b className="mb-0.5 block text-[13px] font-medium text-muted">{label}</b>
      {children}
    </div>
  );
}

export function EvaluationTable({ examples, threshold }: { examples: EvaluationExample[]; threshold: number }) {
  const [filter, setFilter] = useState<EvaluationCategory | "All">("All");
  const [selected, setSelected] = useState<EvaluationExample | null>(null);

  const rows = useMemo(() => examples.filter((e) => filter === "All" || e.category === filter), [examples, filter]);

  return (
    <div>
      <div role="group" aria-label="Filter by category" className="mb-3 flex flex-wrap gap-1.5">
        {(["All", ...CATEGORIES] as const).map((c) => (
          <Button key={c} variant="chip" size="chip" className="px-3 py-1 text-[13px]" aria-pressed={filter === c} onClick={() => setFilter(c)}>
            {c}
          </Button>
        ))}
      </div>

      <div className="-mx-1 overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr>
              <th className={th}>Question</th>
              <th className={th}>Expected behaviour</th>
              <th className={th}>Agent decision</th>
              <th className={th}>Confidence</th>
              <th className={th}>Correct</th>
              <th className={th}>Category</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((e) => (
              <tr
                key={e.id}
                tabIndex={0}
                onClick={() => setSelected(e)}
                onKeyDown={(ev) => {
                  if (ev.key === "Enter" || ev.key === " ") {
                    ev.preventDefault();
                    setSelected(e);
                  }
                }}
                className="group cursor-pointer outline-offset-[-2px]"
              >
                <td className="min-w-[240px] border-b border-line p-3 group-hover:bg-surface-2">{e.question}</td>
                <td className="border-b border-line p-3 group-hover:bg-surface-2">
                  <Pill tone={e.expected === "Answer" ? "accent" : "pause"}>{e.expected}</Pill>
                </td>
                <td className="border-b border-line p-3 group-hover:bg-surface-2">
                  <Pill tone={e.decision === "Answered" ? "accent" : "pause"}>{e.decision}</Pill>
                </td>
                <td className="tnum border-b border-line p-3 group-hover:bg-surface-2">{e.confidence}%</td>
                <td className={cn("border-b border-line p-3 font-semibold group-hover:bg-surface-2", e.correct ? "text-ok" : "text-bad")}>
                  {e.correct ? "Yes" : "No"}
                </td>
                <td className="border-b border-line p-3 group-hover:bg-surface-2">
                  <Pill>{e.category}</Pill>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={6} className="p-3 text-muted">
                  No questions in this category.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Sheet open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <SheetContent>
          {selected && (
            <>
              <SheetTitle className="mb-1 mt-12 font-display text-[21px] font-semibold leading-tight">{selected.question}</SheetTitle>
              <SheetDescription asChild>
                <div>
                  <Pill>{selected.category}</Pill>
                </div>
              </SheetDescription>
              <dl className="my-[18px] grid grid-cols-[130px_1fr] gap-x-3.5 gap-y-2.5 text-sm">
                <dt className="text-muted">Expected</dt>
                <dd>{selected.expected}</dd>
                <dt className="text-muted">Agent decision</dt>
                <dd>{selected.decision}</dd>
                <dt className="text-muted">Confidence</dt>
                <dd className="tnum">
                  {selected.confidence}% <span className="text-faint">(threshold {threshold}%)</span>
                </dd>
                <dt className="text-muted">Result</dt>
                <dd className={cn("font-semibold", selected.correct ? "text-ok" : "text-bad")}>
                  {selected.correct ? "Correct" : "Incorrect"}
                </dd>
              </dl>
              <Callout label="Agent output">{selected.agentOutput}</Callout>
              <Callout label="Reference">{selected.reference}</Callout>
              <Callout label="Analysis">{selected.analysis}</Callout>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
