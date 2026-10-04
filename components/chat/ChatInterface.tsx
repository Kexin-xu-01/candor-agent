"use client";

import { useEffect, useRef } from "react";
import { EXAMPLE_QUESTIONS } from "@/data/agent";
import { useConversations } from "@/components/providers/ConversationProvider";
import { ChatInput } from "./ChatInput";
import { ChatMessage } from "./ChatMessage";
import { LoadingIndicator } from "./LoadingIndicator";

export function ChatInterface() {
  const { activeConversation, isLoading, sendMessage, updateFeedback } = useConversations();
  const bottomRef = useRef<HTMLDivElement>(null);
  const messages = activeConversation?.messages ?? [];

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages.length, isLoading]);

  return (
    <>
      <div className="min-h-0 flex-1 overflow-auto">
        <div className="mx-auto max-w-[760px] px-5 pb-3 pt-7">
          {messages.length === 0 ? (
            <section className="pb-5 pt-[9vh]">
              <h1 className="text-[clamp(34px,6vw,52px)] font-bold">Ask the Agent</h1>
              <p className="mt-3 max-w-[46ch] text-[17px] text-muted">
                An AI agent that knows when to answer and when to say “I don’t know.”
              </p>
              <div className="mt-8 grid gap-2.5 sm:grid-cols-2">
                {EXAMPLE_QUESTIONS.map((e) => (
                  <button
                    key={e.id}
                    onClick={() => sendMessage(e.question)}
                    className="flex flex-col gap-1.5 rounded-[14px] border border-line bg-surface px-4 py-3.5 text-left transition-colors hover:border-accent-line"
                  >
                    <small className="text-[12.5px] text-faint">{e.category}</small>
                    <span className="font-medium">{e.question}</span>
                  </button>
                ))}
              </div>
            </section>
          ) : (
            messages.map((m) => <ChatMessage key={m.id} message={m} onFeedback={updateFeedback} />)
          )}
          {isLoading && <LoadingIndicator />}
          <div ref={bottomRef} />
        </div>
      </div>
      <ChatInput onSend={sendMessage} disabled={isLoading} />
    </>
  );
}
