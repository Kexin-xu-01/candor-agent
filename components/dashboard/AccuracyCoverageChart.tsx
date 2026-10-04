"use client";

import { useMemo, useState } from "react";
import { Area, AreaChart, CartesianGrid, ReferenceDot, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { ThresholdPoint } from "@/types";

const tick = { fill: "var(--muted)", fontSize: 12 };

export function AccuracyCoverageChart({ points, initialIndex }: { points: ThresholdPoint[]; initialIndex: number }) {
  const [index, setIndex] = useState(initialIndex);
  const current = points[index];
  const data = useMemo(() => [...points].sort((a, b) => a.coverage - b.coverage), [points]);

  const summary =
    current.threshold < 0.3
      ? "Answers almost everything, so more mistakes."
      : current.threshold < 0.7
        ? "Balanced: answers when reasonably sure."
        : "Very selective: abstains often, rarely wrong.";

  return (
    <div>
      <div className="h-[300px]" role="img" aria-label="Accuracy rises as coverage falls">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 18, bottom: 24, left: 4 }}>
            <defs>
              <linearGradient id="acFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--accent)" stopOpacity={0.18} />
                <stop offset="100%" stopColor="var(--accent)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="var(--line)" />
            <XAxis
              dataKey="coverage"
              type="number"
              domain={[10, 100]}
              ticks={[10, 25, 50, 75, 100]}
              tickFormatter={(v) => `${v}%`}
              tick={tick}
              tickLine={false}
              axisLine={{ stroke: "var(--line-strong)" }}
              label={{ value: "Coverage % (questions answered)", position: "insideBottom", offset: -14, fill: "var(--muted)", fontSize: 12 }}
            />
            <YAxis
              domain={[70, 100]}
              ticks={[70, 80, 90, 100]}
              tickFormatter={(v) => `${v}%`}
              tick={tick}
              tickLine={false}
              axisLine={false}
              width={46}
              label={{ value: "Accuracy %", angle: -90, position: "insideLeft", offset: 10, fill: "var(--muted)", fontSize: 12, style: { textAnchor: "middle" } }}
            />
            <Tooltip
              cursor={{ stroke: "var(--line-strong)" }}
              content={({ active, payload }) => {
                const p = payload?.[0]?.payload as ThresholdPoint | undefined;
                if (!active || !p) return null;
                return (
                  <div className="rounded-lg border border-line bg-surface px-3 py-2 text-[12.5px] shadow-sm">
                    <div className="font-semibold">Threshold {p.threshold.toFixed(2)}</div>
                    <div className="text-muted">Coverage {p.coverage}% · Accuracy {p.accuracy}%</div>
                  </div>
                );
              }}
            />
            <Area
              dataKey="accuracy"
              type="monotone"
              stroke="var(--accent)"
              strokeWidth={2.5}
              fill="url(#acFill)"
              dot={{ r: 3, fill: "var(--surface)", stroke: "var(--accent)", strokeWidth: 1.8 }}
              activeDot={{ r: 5 }}
            />
            <ReferenceDot x={current.coverage} y={current.accuracy} r={7} fill="var(--accent)" stroke="var(--surface)" strokeWidth={3} ifOverflow="visible" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-3.5">
        <label htmlFor="threshold" className="whitespace-nowrap text-[13.5px] text-muted">
          Confidence threshold
        </label>
        <input
          id="threshold"
          type="range"
          min={0}
          max={points.length - 1}
          step={1}
          value={index}
          onChange={(e) => setIndex(Number(e.target.value))}
          className="min-w-[140px] flex-1 accent-accent"
        />
        <b className="tnum w-10 text-right font-display">{current.threshold.toFixed(2)}</b>
      </div>

      <div className="mt-3 flex flex-wrap gap-x-[18px] gap-y-1 rounded-xl bg-accent-soft px-3.5 py-3 text-sm">
        <span>
          Answers <b className="tnum font-display text-lg text-accent">{current.coverage}%</b> of questions
        </span>
        <span>
          At <b className="tnum font-display text-lg text-accent">{current.accuracy}%</b> accuracy
        </span>
        <span className="text-muted">{summary}</span>
      </div>
    </div>
  );
}
