"use client";

import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { CalibrationPoint } from "@/types";

const tick = { fill: "var(--muted)", fontSize: 12 };
const pct = (v: number) => `${Math.round(v * 100)}%`;

interface Row {
  x: number;
  ideal: number;
  observed?: number;
}

export function CalibrationChart({ points }: { points: CalibrationPoint[] }) {
  const data: Row[] = [
    { x: 0, ideal: 0 },
    ...points.map((p) => ({ x: p.predicted, ideal: p.predicted, observed: p.observed })),
    { x: 1, ideal: 1 },
  ];

  return (
    <div>
      <div className="h-[300px]" role="img" aria-label="Calibration curve close to the ideal diagonal">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 16, bottom: 24, left: 4 }}>
            <CartesianGrid stroke="var(--line)" />
            <XAxis
              dataKey="x"
              type="number"
              domain={[0, 1]}
              ticks={[0, 0.25, 0.5, 0.75, 1]}
              tickFormatter={pct}
              tick={tick}
              tickLine={false}
              axisLine={{ stroke: "var(--line-strong)" }}
              label={{ value: "Predicted confidence", position: "insideBottom", offset: -14, fill: "var(--muted)", fontSize: 12 }}
            />
            <YAxis
              domain={[0, 1]}
              ticks={[0, 0.25, 0.5, 0.75, 1]}
              tickFormatter={pct}
              tick={tick}
              tickLine={false}
              axisLine={false}
              width={46}
              label={{ value: "Observed accuracy", angle: -90, position: "insideLeft", offset: 10, fill: "var(--muted)", fontSize: 12, style: { textAnchor: "middle" } }}
            />
            <Tooltip
              content={({ active, payload }) => {
                const p = payload?.find((i) => i.dataKey === "observed")?.payload as Row | undefined;
                if (!active || !p || p.observed === undefined) return null;
                return (
                  <div className="rounded-lg border border-line bg-surface px-3 py-2 text-[12.5px] shadow-sm">
                    <div className="font-semibold">Predicted {pct(p.x)}</div>
                    <div className="text-muted">Observed {pct(p.observed)}</div>
                  </div>
                );
              }}
            />
            <Line dataKey="ideal" stroke="var(--faint)" strokeWidth={1.6} strokeDasharray="5 5" dot={false} activeDot={false} isAnimationActive={false} />
            <Line
              dataKey="observed"
              stroke="var(--accent)"
              strokeWidth={2.5}
              connectNulls
              dot={{ r: 3.4, fill: "var(--surface)", stroke: "var(--accent)", strokeWidth: 1.8 }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-2 flex flex-wrap gap-4 text-[12.5px] text-muted">
        <span className="inline-flex items-center gap-1.5">
          <i className="inline-block w-4 border-t-2 border-accent" /> Agent
        </span>
        <span className="inline-flex items-center gap-1.5">
          <i className="inline-block w-4 border-t-2 border-dashed border-faint" /> Ideal calibration
        </span>
      </div>
    </div>
  );
}
