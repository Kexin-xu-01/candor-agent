import { NextResponse } from "next/server";
import { mockAgent } from "@/lib/mock-agent";

/**
 * Placeholder backend. Set NEXT_PUBLIC_AGENT_API_URL=/api/agent to route the UI
 * through here, then replace the body with a call to your real model / retriever.
 */
export async function POST(request: Request) {
  const { question } = (await request.json()) as { question?: string };
  if (!question?.trim()) {
    return NextResponse.json({ error: "Missing question" }, { status: 400 });
  }
  return NextResponse.json(mockAgent(question));
}
