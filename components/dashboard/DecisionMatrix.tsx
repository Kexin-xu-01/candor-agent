import type { DecisionMatrixData } from "@/types";
import { cn } from "@/lib/utils";

function Cell({ value, title, hint, good }: { value: number; title: string; hint: string; good?: boolean }) {
  return (
    <div
      className={cn(
        "flex min-h-[112px] flex-col gap-1 rounded-[14px] border p-4",
        good ? "border-accent-line bg-accent-soft" : "border-dashed border-line-strong bg-surface-2",
      )}
    >
      <b className={cn("tnum font-display text-[30px] leading-none tracking-tighter", good ? "text-accent" : "text-foreground")}>
        {value}
      </b>
      <span className="text-sm font-semibold">{title}</span>
      <small className="text-[12.5px] text-muted">{hint}</small>
    </div>
  );
}

export function DecisionMatrix({ data }: { data: DecisionMatrixData }) {
  const head = "self-end px-1 text-center text-[13px] font-medium text-muted";
  const side = "justify-self-center text-center text-[13px] font-medium text-muted [writing-mode:vertical-rl] rotate-180";
  return (
    <div className="grid grid-cols-[auto_1fr_1fr] gap-2">
      <span />
      <span className={head}>Should answer</span>
      <span className={head}>Should abstain</span>

      <span className={side}>Agent answered</span>
      <Cell good value={data.answeredShouldAnswer} title="Correct answer decision" hint="Answered, and an answer was warranted" />
      <Cell value={data.answeredShouldAbstain} title="Incorrect answer decision" hint="Answered without enough evidence" />

      <span className={side}>Agent abstained</span>
      <Cell value={data.abstainedShouldAnswer} title="False abstention" hint="Said “I don’t know” but could answer" />
      <Cell good value={data.abstainedShouldAbstain} title="Correct abstention" hint="Declined when evidence was insufficient" />
    </div>
  );
}
