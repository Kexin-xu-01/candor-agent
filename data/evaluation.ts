import type { EvaluationReport } from "@/types";

/** Mock evaluation results. Replace with the output of your real evaluation run. */
export const EVALUATION_REPORT: EvaluationReport = {
  sampleSize: 1000,

  headline: [
    { label: "Overall Accuracy", value: "82.4%", description: "Correct decisions across all questions", tooltip: "Share of all questions where the agent made the right call: answered correctly or rightly abstained." },
    { label: "Answer Accuracy", value: "91.2%", description: "When it answers, it is right", tooltip: "Of the questions the agent answered, the share answered correctly." },
    { label: "Correct Abstention Rate", value: "86.7%", description: "Abstained when it should", tooltip: "How often “I don’t know” was the right output when the evidence was insufficient." },
    { label: "Unsupported Answer Rate", value: "7.3%", description: "Answers without enough evidence", tooltip: "Share of answers given when the available evidence did not justify one." },
    { label: "Coverage", value: "68%", description: "Questions the agent chose to answer", tooltip: "Percentage of questions the system decided to answer rather than abstain." },
  ],

  additional: [
    { label: "Precision", value: "0.912", tooltip: "Of the answers given, the fraction that were correct." },
    { label: "Recall", value: "0.842", tooltip: "Of the questions that deserved an answer, the fraction the agent answered correctly." },
    { label: "F1 Score", value: "0.876", tooltip: "Harmonic mean of precision and recall." },
    { label: "Brier Score", value: "0.071", tooltip: "Mean squared gap between stated confidence and the actual outcome. Lower is better; 0 is perfect." },
    { label: "Exp. Calibration Error", value: "0.042", tooltip: "Average gap between predicted confidence and observed accuracy across confidence bins. Lower is better." },
    { label: "AUROC", value: "0.93", tooltip: "How well confidence separates correct from incorrect answers. 0.5 is chance, 1.0 is perfect." },
    { label: "False Answer Rate", value: "8.8%", tooltip: "Share of answers that should not have been given or were wrong." },
    { label: "False Abstention Rate", value: "11.6%", tooltip: "Share of questions where the agent said “I don’t know” though it could have answered." },
    { label: "Selective Accuracy", value: "91.2%", tooltip: "Accuracy measured only on the questions the agent chose to answer." },
  ],

  thresholdCurve: [
    { threshold: 0, coverage: 100, accuracy: 74.0 },
    { threshold: 0.1, coverage: 97, accuracy: 75.5 },
    { threshold: 0.2, coverage: 92, accuracy: 78.2 },
    { threshold: 0.3, coverage: 86, accuracy: 81.9 },
    { threshold: 0.4, coverage: 79, accuracy: 86.1 },
    { threshold: 0.5, coverage: 73, accuracy: 89.0 },
    { threshold: 0.6, coverage: 68, accuracy: 91.2 },
    { threshold: 0.7, coverage: 58, accuracy: 93.8 },
    { threshold: 0.8, coverage: 46, accuracy: 96.0 },
    { threshold: 0.9, coverage: 31, accuracy: 97.9 },
    { threshold: 0.95, coverage: 19, accuracy: 98.9 },
  ],
  defaultThresholdIndex: 6,

  calibration: [
    { predicted: 0.05, observed: 0.07 },
    { predicted: 0.15, observed: 0.13 },
    { predicted: 0.25, observed: 0.26 },
    { predicted: 0.35, observed: 0.34 },
    { predicted: 0.45, observed: 0.47 },
    { predicted: 0.55, observed: 0.58 },
    { predicted: 0.65, observed: 0.69 },
    { predicted: 0.75, observed: 0.77 },
    { predicted: 0.85, observed: 0.86 },
    { predicted: 0.95, observed: 0.93 },
  ],

  matrix: {
    answeredShouldAnswer: 620,
    answeredShouldAbstain: 60,
    abstainedShouldAnswer: 116,
    abstainedShouldAbstain: 204,
  },

  distribution: [
    { label: "Correct answers", value: 620, tone: "accent" },
    { label: "Incorrect answers", value: 60, tone: "bad" },
    { label: "Correct abstentions", value: 204, tone: "pause" },
    { label: "Incorrect abstentions", value: 116, tone: "faint" },
  ],

  models: [
    { model: "Baseline Model", accuracy: "72%", unsupportedAnswerRate: "23%", correctAbstention: "41%", calibrationError: "0.19" },
    { model: "Prompted Model", accuracy: "77%", unsupportedAnswerRate: "16%", correctAbstention: "58%", calibrationError: "0.13" },
    { model: "Uncertainty-Aware Agent", accuracy: "82%", unsupportedAnswerRate: "7%", correctAbstention: "87%", calibrationError: "0.06", highlight: true },
  ],

  examples: [
    { id: "e1", question: "What is the capital of Australia?", expected: "Answer", decision: "Answered", confidence: 96, correct: true, category: "Correct answer", agentOutput: "Canberra", reference: "Canberra", analysis: "Three agreeing sources and a confidence far above threshold." },
    { id: "e2", question: "What was the attendance at the 1987 Hallam village fête?", expected: "Abstain", decision: "Abstained", confidence: 8, correct: true, category: "Insufficient information", agentOutput: "I don’t know", reference: "No reliable record exists", analysis: "No source records this figure. The agent correctly declined to guess." },
    { id: "e3", question: "Who won the 2018 FIFA World Cup?", expected: "Answer", decision: "Answered", confidence: 94, correct: true, category: "Correct answer", agentOutput: "France", reference: "France", analysis: "Widely documented fact with consistent evidence." },
    { id: "e4", question: "When was the Treaty of Westphalia signed?", expected: "Answer", decision: "Answered", confidence: 83, correct: false, category: "Incorrect answer", agentOutput: "1658", reference: "1648", analysis: "Confident but wrong: two sources conflicted and the agent did not flag it. A calibration miss to investigate." },
    { id: "e5", question: "What will Bitcoin cost on 1 March?", expected: "Abstain", decision: "Abstained", confidence: 11, correct: true, category: "Correct abstention", agentOutput: "I don’t know", reference: "Unknowable", analysis: "Future price; no evidence can settle it." },
    { id: "e6", question: "What’s the best treatment for it?", expected: "Abstain", decision: "Abstained", confidence: 19, correct: true, category: "Ambiguous question", agentOutput: "I don’t know", reference: "Needs clarification", analysis: "“It” has no referent. Abstaining invites a clearer question." },
    { id: "e7", question: "What is the half-life of carbon-14?", expected: "Answer", decision: "Abstained", confidence: 54, correct: false, category: "False abstention", agentOutput: "I don’t know", reference: "About 5,730 years", analysis: "Evidence was available but retrieval ranked it low, pushing confidence under the 60% threshold." },
    { id: "e8", question: "Summarise our Q3 internal roadmap.", expected: "Abstain", decision: "Answered", confidence: 71, correct: false, category: "Incorrect answer", agentOutput: "A generic roadmap summary", reference: "Not in knowledge base", analysis: "Answered from a similar public document; the internal roadmap was never in the knowledge base. An unsupported answer." },
    { id: "e9", question: "Which of my neighbours owns a blue car?", expected: "Abstain", decision: "Abstained", confidence: 3, correct: true, category: "Outside knowledge coverage", agentOutput: "I don’t know", reference: "Not available", analysis: "Personal information the agent has no access to." },
    { id: "e10", question: "Is it safe to take those two together?", expected: "Abstain", decision: "Abstained", confidence: 22, correct: true, category: "Ambiguous question", agentOutput: "I don’t know", reference: "Needs clarification", analysis: "Unclear which two items, and safety depends on context." },
    { id: "e11", question: "What does HTTP status 418 mean?", expected: "Answer", decision: "Answered", confidence: 89, correct: true, category: "Correct answer", agentOutput: "“I’m a teapot”", reference: "“I’m a teapot”", analysis: "Defined in an RFC and consistently documented." },
    { id: "e12", question: "What is the population of the hamlet of Tarn Hows?", expected: "Abstain", decision: "Abstained", confidence: 17, correct: true, category: "Insufficient information", agentOutput: "I don’t know", reference: "No reliable figure", analysis: "No census-level figure available for this location." },
    { id: "e13", question: "How many moons does Saturn have?", expected: "Answer", decision: "Abstained", confidence: 48, correct: false, category: "False abstention", agentOutput: "I don’t know", reference: "Check current catalogue", analysis: "The count changes with new discoveries and sources disagreed, so confidence was low. Arguably a defensible abstention." },
  ],
};
