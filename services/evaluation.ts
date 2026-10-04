import type { EvaluationReport } from "@/types";
import { EVALUATION_REPORT } from "@/data/evaluation";

/** Swap for a fetch() to your evaluation backend when you have real results. */
export async function getEvaluationReport(): Promise<EvaluationReport> {
  return EVALUATION_REPORT;
}
