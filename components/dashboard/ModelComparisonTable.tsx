import type { ModelComparisonRow } from "@/types";
import { cn } from "@/lib/utils";

const th = "whitespace-nowrap border-b border-line px-3 py-2.5 text-left text-[13px] font-medium text-muted";

export function ModelComparisonTable({ rows }: { rows: ModelComparisonRow[] }) {
  return (
    <div className="-mx-1 overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr>
            <th className={th}>Model</th>
            <th className={th}>Accuracy</th>
            <th className={th}>Unsupported Answer Rate</th>
            <th className={th}>Correct Abstention</th>
            <th className={th}>Calibration Error</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.model} className={cn(r.highlight && "font-semibold")}>
              {[
                <>
                  {r.model}
                  {r.highlight && (
                    <span className="ml-2 rounded-full bg-accent px-2 py-0.5 align-[1px] text-[11px] font-semibold text-accent-foreground">
                      Final agent
                    </span>
                  )}
                </>,
                r.accuracy,
                r.unsupportedAnswerRate,
                r.correctAbstention,
                r.calibrationError,
              ].map((cell, i, arr) => (
                <td
                  key={i}
                  className={cn(
                    "tnum border-b border-line p-3 last:border-b-0",
                    r.highlight && "border-b-0 bg-accent-soft",
                    r.highlight && i === 0 && "rounded-l-[10px] shadow-[inset_3px_0_0_var(--accent)]",
                    r.highlight && i === arr.length - 1 && "rounded-r-[10px]",
                  )}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
