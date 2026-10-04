import type { MetricDefinition } from "@/types";
import { InfoTip } from "@/components/ui/info-tip";
import { cn } from "@/lib/utils";

interface Props {
  metric: MetricDefinition;
  /** primary = filled accent card, default = standard card, compact = dense cell in the secondary strip */
  variant?: "primary" | "default" | "compact";
}

export function MetricCard({ metric, variant = "default" }: Props) {
  if (variant === "compact") {
    return (
      <div className="-mb-px -mr-px min-w-0 border-b border-r border-line px-4 py-3.5">
        <div className="flex items-center gap-1.5 whitespace-nowrap text-[12.5px] text-muted">
          {metric.label}
          <InfoTip text={metric.tooltip} />
        </div>
        <div className="tnum mt-0.5 font-display text-[21px] font-semibold tracking-tight">{metric.value}</div>
      </div>
    );
  }

  const primary = variant === "primary";
  return (
    <div
      className={cn(
        "flex min-w-0 flex-col gap-1 rounded-card border px-[18px] py-4",
        primary ? "border-accent bg-accent text-accent-foreground" : "border-line bg-surface",
      )}
    >
      <div className={cn("flex items-center gap-1.5 text-[13.5px]", primary ? "opacity-85" : "text-muted")}>
        {metric.label}
        <InfoTip text={metric.tooltip} />
      </div>
      <div className="tnum font-display text-[32px] font-bold tracking-tighter">{metric.value}</div>
      {metric.description && (
        <div className={cn("text-[12.5px]", primary ? "opacity-80" : "text-faint")}>{metric.description}</div>
      )}
    </div>
  );
}
