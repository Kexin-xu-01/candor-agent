"use client";

import { Bar, BarChart, Cell, LabelList, ResponsiveContainer, XAxis, YAxis } from "recharts";
import type { ResultDistributionItem, Tone } from "@/types";

const TONE: Record<Tone, string> = {
  accent: "var(--accent)",
  bad: "var(--bad)",
  pause: "var(--pause)",
  faint: "var(--faint)",
};

export function ResultDistributionChart({ items, total }: { items: ResultDistributionItem[]; total: number }) {
  return (
    <div>
      <div className="h-[250px]" role="img" aria-label="Distribution of correct and incorrect answers and abstentions">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={items} layout="vertical" margin={{ top: 4, right: 44, bottom: 4, left: 0 }}>
            <XAxis type="number" hide domain={[0, "dataMax"]} />
            <YAxis
              type="category"
              dataKey="label"
              width={140}
              tickLine={false}
              axisLine={false}
              tick={{ fill: "var(--foreground)", fontSize: 13 }}
            />
            <Bar dataKey="value" barSize={22} radius={6} background={{ fill: "var(--surface-2)", radius: 6 }}>
              {items.map((d) => (
                <Cell key={d.label} fill={TONE[d.tone]} />
              ))}
              <LabelList dataKey="value" position="right" fill="var(--foreground)" fontSize={13} fontWeight={600} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p className="mt-2 text-sm text-muted">{total.toLocaleString()} evaluated questions.</p>
    </div>
  );
}
