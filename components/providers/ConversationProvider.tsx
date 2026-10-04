"use client";

import { createContext, useCallback, useContext, useMemo, useRef, useState, type ReactNode } from "react";
import type { ChatMessageModel, Conversation, Feedback } from "@/types";
import { SEED_CONVERSATIONS } from "@/data/conversations";
import { askAgent, submitFeedback } from "@/services/agent";
import { truncate, uid } from "@/lib/utils";

interface ConversationContextValue {
  conversations: Conversation[];
  activeId: string | null;
  activeConversation: Conversation | null;
  isLoading: boolean;
  newConversation: () => void;
  selectConversation: (id: string) => void;
  sendMessage: (text: string) => Promise<void>;
  updateFeedback: (messageId: string, patch: Partial<Feedback>) => void;
}

const ConversationContext = createContext<ConversationContextValue | null>(null);

export function ConversationProvider({ children }: { children: ReactNode }) {
  const [conversations, setConversations] = useState<Conversation[]>(SEED_CONVERSATIONS);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const loadingRef = useRef(false);

  const activeConversation = useMemo(
    () => conversations.find((c) => c.id === activeId) ?? null,
    [conversations, activeId],
  );

  const appendMessage = useCallback((convId: string, message: ChatMessageModel) => {
    setConversations((cs) => cs.map((c) => (c.id === convId ? { ...c, messages: [...c.messages, message] } : c)));
  }, []);

  const sendMessage = useCallback(
    async (text: string) => {
      const question = text.trim();
      if (!question || loadingRef.current) return;

      const userMessage: ChatMessageModel = { id: uid(), role: "user", text: question };
      let convId = activeId;

      if (!convId) {
        convId = uid();
        const created: Conversation = { id: convId, title: truncate(question), messages: [userMessage] };
        setConversations((cs) => [...cs, created]);
        setActiveId(convId);
      } else {
        appendMessage(convId, userMessage);
      }

      loadingRef.current = true;
      setIsLoading(true);
      try {
        const response = await askAgent(question);
        appendMessage(convId, { id: uid(), role: "agent", response });
      } catch (err) {
        appendMessage(convId, {
          id: uid(),
          role: "agent",
          error: err instanceof Error ? err.message : "The agent could not be reached.",
        });
      } finally {
        loadingRef.current = false;
        setIsLoading(false);
      }
    },
    [activeId, appendMessage],
  );

  const updateFeedback = useCallback(
    (messageId: string, patch: Partial<Feedback>) => {
      let responseId: string | undefined;
      let next: Feedback = {};
      setConversations((cs) =>
        cs.map((c) => ({
          ...c,
          messages: c.messages.map((m) => {
            if (m.id !== messageId) return m;
            responseId = m.response?.id;
            next = { ...m.feedback, ...patch };
            return { ...m, feedback: next };
          }),
        })),
      );
      queueMicrotask(() => {
        if (responseId) void submitFeedback(responseId, next);
      });
    },
    [],
  );

  const value = useMemo<ConversationContextValue>(
    () => ({
      conversations,
      activeId,
      activeConversation,
      isLoading,
      newConversation: () => setActiveId(null),
      selectConversation: setActiveId,
      sendMessage,
      updateFeedback,
    }),
    [conversations, activeId, activeConversation, isLoading, sendMessage, updateFeedback],
  );

  return <ConversationContext.Provider value={value}>{children}</ConversationContext.Provider>;
}

export function useConversations() {
  const ctx = useContext(ConversationContext);
  if (!ctx) throw new Error("useConversations must be used inside <ConversationProvider>");
  return ctx;
}
