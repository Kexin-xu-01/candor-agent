import type { AgentResponse, ExampleQuestion } from "@/types";

/** The agent answers only when confidence is at or above this value (0–100). */
export const ANSWER_THRESHOLD = 60;

export const ABSTAIN_TEXT =
  "There is not enough reliable information available to answer this question confidently.";

export const EXAMPLE_QUESTIONS: ExampleQuestion[] = [
  { id: "boiling", category: "Science", question: "What is the boiling point of water at sea level?" },
  { id: "attention", category: "Machine learning", question: "How does attention work in a transformer?" },
  { id: "australia", category: "Geography", question: "What is the capital of Australia?" },
  { id: "market", category: "Forecasting", question: "What will the S&P 500 close at next Friday?" },
  { id: "board", category: "Private information", question: "What did my CEO decide in yesterday’s private board meeting?" },
  { id: "dose", category: "Personal advice", question: "What dose of ibuprofen should I take?" },
];

/** Pre-written agent outputs, keyed by example id. */
export const KNOWLEDGE: Record<string, AgentResponse> = {
  boiling: {
    id: "r-boiling",
    kind: "answer",
    confidence: 97,
    threshold: ANSWER_THRESHOLD,
    text: "Water boils at 100 °C (212 °F) at standard sea-level pressure of 1 atm. The boiling point drops by roughly 1 °C for every 300 m of altitude.",
    evidence: [
      { title: "Water phase-change data", source: "NIST Chemistry reference", relevance: 0.98 },
      { title: "Handbook of Chemistry and Physics", source: "CRC Press, physical constants", relevance: 0.94 },
      { title: "Boiling point vs. altitude table", source: "Engineering reference", relevance: 0.86 },
    ],
    factors: [
      { positive: true, label: "Sufficient supporting information (3 agreeing sources)" },
      { positive: true, label: "High confidence, well above the answer threshold" },
      { positive: true, label: "Question is within the knowledge coverage" },
    ],
  },
  attention: {
    id: "r-attention",
    kind: "answer",
    confidence: 91,
    threshold: ANSWER_THRESHOLD,
    text: "Attention lets every token weigh every other token. Each token is projected into a query, key and value; scaled query–key dot products pass through a softmax to give weights, and those weights mix the value vectors. Multiple heads do this in parallel so the model can track different relationships at once.",
    evidence: [
      { title: "Attention Is All You Need", source: "Vaswani et al., 2017", relevance: 0.96 },
      { title: "Sequence models, lecture 7", source: "Course notes", relevance: 0.89 },
      { title: "The Annotated Transformer", source: "Tutorial", relevance: 0.84 },
    ],
    factors: [
      { positive: true, label: "Sufficient supporting information" },
      { positive: true, label: "High confidence" },
      { positive: true, label: "Question within knowledge coverage" },
    ],
  },
  australia: {
    id: "r-australia",
    kind: "answer",
    confidence: 96,
    threshold: ANSWER_THRESHOLD,
    text: "The capital of Australia is Canberra. Sydney and Melbourne are larger, but Canberra was purpose-built as the capital and has been the seat of government since 1927.",
    evidence: [
      { title: "Australia: country profile", source: "Government reference", relevance: 0.97 },
      { title: "History of Canberra", source: "National archive summary", relevance: 0.9 },
    ],
    factors: [
      { positive: true, label: "Sufficient supporting information" },
      { positive: true, label: "High confidence" },
      { positive: true, label: "Question within knowledge coverage" },
    ],
  },
  market: {
    id: "r-market",
    kind: "abstain",
    confidence: 9,
    threshold: ANSWER_THRESHOLD,
    text: ABSTAIN_TEXT,
    reason:
      "This asks for a future market value. Available data describes the past, and no source can establish next Friday’s closing level.",
    evidence: [
      { title: "S&P 500 historical daily closes", source: "Market data archive", relevance: 0.41, note: "Describes past values only" },
      { title: "Analyst commentary, this week", source: "News summary", relevance: 0.22, note: "Opinion, not verifiable" },
    ],
    factors: [
      { positive: false, label: "Future outcome cannot be determined from the evidence" },
      { positive: false, label: "Confidence 9%, below the 60% answer threshold" },
    ],
  },
  board: {
    id: "r-board",
    kind: "abstain",
    confidence: 4,
    threshold: ANSWER_THRESHOLD,
    text: ABSTAIN_TEXT,
    reason: "The question concerns a private meeting. Nothing in the agent’s knowledge sources covers it.",
    evidence: [],
    factors: [
      { positive: false, label: "No relevant documents retrieved" },
      { positive: false, label: "Question is outside the knowledge coverage" },
    ],
  },
  dose: {
    id: "r-dose",
    kind: "abstain",
    confidence: 27,
    threshold: ANSWER_THRESHOLD,
    text: ABSTAIN_TEXT,
    reason:
      "A safe dose depends on age, weight, health conditions and other medicines, none of which were given. General labels exist but can’t be applied to you.",
    evidence: [
      { title: "Over-the-counter label guidance", source: "Public drug information", relevance: 0.52, note: "General, not personalised" },
    ],
    factors: [
      { positive: false, label: "Key information is missing from the question" },
      { positive: false, label: "Confidence 27%, below the 60% answer threshold" },
    ],
  },
};

/** Keyword routing used by the mock agent for free-text questions. */
export const KEYWORD_ROUTES: Array<[RegExp, keyof typeof KNOWLEDGE]> = [
  [/boil|water.*(sea|temperature)/i, "boiling"],
  [/attention|transformer/i, "attention"],
  [/capital.*australia|australia.*capital/i, "australia"],
  [/s&p|stock|bitcoin|next (week|friday|year)|tomorrow|predict|lottery|election/i, "market"],
  [/ceo|board meeting|private|my (boss|neighbou?r|ex)\b/i, "board"],
  [/dose|ibuprofen|medic|symptom|treatment/i, "dose"],
];
