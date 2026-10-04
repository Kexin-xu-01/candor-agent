import type { AgentResponse } from "@/types";
import { ABSTAIN_TEXT, ANSWER_THRESHOLD, KEYWORD_ROUTES, KNOWLEDGE } from "@/data/agent";
import { uid } from "@/lib/utils";

/** Deterministic-ish simulation of the agent. Safe to run on server or client. */
export function mockAgent(question: string): AgentResponse {
  const hit = KEYWORD_ROUTES.find(([re]) => re.test(question));
  if (hit) return { ...KNOWLEDGE[hit[1]], id: uid() };

  const tooShort = question.trim().split(/\s+/).length < 3;
  return {
    id: uid(),
    kind: "abstain",
    confidence: tooShort ? 18 : Math.round(10 + Math.random() * 20),
    threshold: ANSWER_THRESHOLD,
    text: ABSTAIN_TEXT,
    reason: tooShort
      ? "The question is too short to tell what is being asked. A clearer question would help."
      : "This topic is outside what the agent’s knowledge sources cover, so no supporting evidence was found.",
    evidence: [],
    factors: [
      { positive: false, label: tooShort ? "Question is ambiguous" : "No relevant documents retrieved" },
      { positive: false, label: `Confidence below the ${ANSWER_THRESHOLD}% answer threshold` },
    ],
  };
}
