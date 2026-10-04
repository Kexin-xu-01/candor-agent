import type { AgentResponse, Feedback } from "@/types";
import { mockAgent } from "@/lib/mock-agent";

/**
 * THE seam for going live.
 *
 * Set NEXT_PUBLIC_AGENT_API_URL and this function will POST { question } and
 * expect an AgentResponse (see types/index.ts) back. With no URL set it uses
 * the simulated agent, including a short delay so the loading state is visible.
 */
export async function askAgent(question: string, signal?: AbortSignal): Promise<AgentResponse> {
  const url = process.env.NEXT_PUBLIC_AGENT_API_URL;

  if (url) {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question }),
      signal,
    });
    if (!res.ok) throw new Error(`Agent request failed (${res.status})`);
    return (await res.json()) as AgentResponse;
  }

  await new Promise((r) => setTimeout(r, 1300 + Math.random() * 500));
  return mockAgent(question);
}

/** Wire this to your feedback endpoint. Currently logs only. */
export async function submitFeedback(responseId: string, feedback: Feedback): Promise<void> {
  if (process.env.NODE_ENV !== "production") {
    console.info("[feedback]", responseId, feedback);
  }
}
