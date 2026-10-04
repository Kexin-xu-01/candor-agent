import type { Metadata } from "next";
import { getEvaluationReport } from "@/services/evaluation";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { AccuracyCoverageChart } from "@/components/dashboard/AccuracyCoverageChart";
import { CalibrationChart } from "@/components/dashboard/CalibrationChart";
import { DecisionMatrix } from "@/components/dashboard/DecisionMatrix";
import { ResultDistributionChart } from "@/components/dashboard/ResultDistributionChart";
import { ModelComparisonTable } from "@/components/dashboard/ModelComparisonTable";
import { EvaluationTable } from "@/components/dashboard/EvaluationTable";
import { Panel } from "@/components/dashboard/Panel";

export const metadata: Metadata = { title: "Agent Evaluation – Candor" };

export default async function DashboardPage() {
  const report = await getEvaluationReport();

  return (
    <div className="min-h-0 flex-1 overflow-auto">
      <div className="mx-auto max-w-[1180px] px-4 pb-14 pt-8 sm:px-6">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-[clamp(30px,4.5vw,42px)] font-bold">Agent Evaluation</h1>
            <p className="mt-2 text-muted">Measuring accuracy, uncertainty and abstention behaviour</p>
          </div>
          <span className="rounded-full border border-line-strong bg-surface px-3 py-1 text-[12.5px] text-muted">
            Mock data · {report.sampleSize.toLocaleString()} questions
          </span>
        </header>

        <section aria-label="Main metrics" className="mt-6 grid grid-cols-2 gap-3 min-[620px]:grid-cols-3 lg:grid-cols-5">
          {report.headline.map((m, i) => (
            <MetricCard key={m.label} metric={m} variant={i === 0 ? "primary" : "default"} />
          ))}
        </section>

        <section
          aria-label="Additional metrics"
          className="mt-3 grid grid-cols-2 overflow-hidden rounded-card border border-line bg-surface min-[520px]:grid-cols-3 xl:grid-cols-9"
        >
          {report.additional.map((m) => (
            <MetricCard key={m.label} metric={m} variant="compact" />
          ))}
        </section>

        <div className="mt-3 grid gap-3 lg:grid-cols-[1.25fr_1fr]">
          <Panel
            title="Accuracy vs coverage"
            description="Raising the confidence threshold makes the agent answer fewer questions, and those answers become more reliable."
          >
            <AccuracyCoverageChart points={report.thresholdCurve} initialIndex={report.defaultThresholdIndex} />
          </Panel>
          <Panel
            title="Confidence calibration"
            description="When the agent says 80% sure, is it right about 80% of the time? Closer to the dashed line is better."
          >
            <CalibrationChart points={report.calibration} />
          </Panel>
        </div>

        <div className="mt-3 grid gap-3 lg:grid-cols-2">
          <Panel title="Decision matrix" description="What the agent did against what it should have done.">
            <DecisionMatrix data={report.matrix} />
          </Panel>
          <Panel title="Result distribution" description="Every outcome, including abstentions the agent got wrong.">
            <ResultDistributionChart items={report.distribution} total={report.sampleSize} />
          </Panel>
        </div>

        <Panel
          className="mt-3"
          title="Model comparison"
          description="The uncertainty-aware agent answers less often than it could, and is wrong far less."
        >
          <ModelComparisonTable rows={report.models} />
        </Panel>

        <Panel className="mt-3" title="Evaluation examples" description="Select a row to see why the agent decided as it did.">
          <EvaluationTable examples={report.examples} threshold={60} />
        </Panel>
      </div>
    </div>
  );
}
