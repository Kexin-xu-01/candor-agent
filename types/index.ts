/* ---------- Agent contract (replace the mock with a backend returning this shape) ---------- */

export type DecisionKind = "answer" | "abstain";

export interface EvidenceItem {
  title: string;
  source: string;
  /** 0–1 relevance of this document to the question */
  relevance: number;
  note?: string;
}

export interface DecisionFactor {
  label: string;
  /** true = supports answering, false = supports abstaining */
  positive: boolean;
}

export interface AgentResponse {
  id: string;
  kind: DecisionKind;
  /** Answer text, or the standard abstention statement */
  text: string;
  /** Confidence (answer) or answerability score (abstain), 0–100 */
  confidence: number;
  /** The agent answers only when confidence >= threshold, 0–100 */
  threshold: number;
  evidence: EvidenceItem[];
  factors: DecisionFactor[];
  /** Why the agent abstained (abstain only) */
  reason?: string;
}

/* ---------- Chat ---------- */

export interface Feedback {
  rating?: "correct" | "incorrect";
  /** Only asked after an abstention */
  shouldHaveAnswered?: boolean;
}

export interface ChatMessageModel {
  id: string;
  role: "user" | "agent";
  text?: string;
  response?: AgentResponse;
  /** A genuine failure (network etc.). Not the same thing as an abstention. */
  error?: string;
  feedback?: Feedback;
}

export interface Conversation {
  id: string;
  title: string;
  messages: ChatMessageModel[];
}

export interface ExampleQuestion {
  id: string;
  category: string;
  question: string;
}

/* ---------- Evaluation ---------- */

export interface MetricDefinition {
  label: string;
  value: string;
  description?: string;
  /** Explains unfamiliar metrics in a tooltip */
  tooltip: string;
}

export interface ThresholdPoint {
  threshold: number;
  /** % of questions answered */
  coverage: number;
  /** % of answered questions that were correct */
  accuracy: number;
}

export interface CalibrationPoint {
  predicted: number;
  observed: number;
}

export interface DecisionMatrixData {
  answeredShouldAnswer: number;
  answeredShouldAbstain: number;
  abstainedShouldAnswer: number;
  abstainedShouldAbstain: number;
}

export type Tone = "accent" | "bad" | "pause" | "faint";

export interface ResultDistributionItem {
  label: string;
  value: number;
  tone: Tone;
}

export interface ModelComparisonRow {
  model: string;
  accuracy: string;
  unsupportedAnswerRate: string;
  correctAbstention: string;
  calibrationError: string;
  highlight?: boolean;
}

export type EvaluationCategory =
  | "Correct answer"
  | "Correct abstention"
  | "Incorrect answer"
  | "False abstention"
  | "Insufficient information"
  | "Ambiguous question"
  | "Outside knowledge coverage";

export interface EvaluationExample {
  id: string;
  question: string;
  expected: "Answer" | "Abstain";
  decision: "Answered" | "Abstained";
  confidence: number;
  correct: boolean;
  category: EvaluationCategory;
  agentOutput: string;
  reference: string;
  analysis: string;
}

export interface EvaluationReport {
  sampleSize: number;
  headline: MetricDefinition[];
  additional: MetricDefinition[];
  thresholdCurve: ThresholdPoint[];
  defaultThresholdIndex: number;
  calibration: CalibrationPoint[];
  matrix: DecisionMatrixData;
  distribution: ResultDistributionItem[];
  models: ModelComparisonRow[];
  examples: EvaluationExample[];
}
