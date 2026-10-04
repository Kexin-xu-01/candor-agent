import type { Conversation } from "@/types";
import { EXAMPLE_QUESTIONS, KNOWLEDGE } from "@/data/agent";

const q = (id: string) => EXAMPLE_QUESTIONS.find((e) => e.id === id)!.question;

/** Sample history so the sidebar is not empty on first load. */
export const SEED_CONVERSATIONS: Conversation[] = [
  {
    id: "seed-1",
    title: "Boiling point of water",
    messages: [
      { id: "s1-u", role: "user", text: q("boiling") },
      { id: "s1-a", role: "agent", response: KNOWLEDGE.boiling },
    ],
  },
  {
    id: "seed-2",
    title: "S&P 500 next Friday",
    messages: [
      { id: "s2-u", role: "user", text: q("market") },
      { id: "s2-a", role: "agent", response: KNOWLEDGE.market },
    ],
  },
];
